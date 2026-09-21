/* ============================================================================
 * Xbox controller -> mouse steering for snake.io (and other mouse-aimed
 * browser games like slither.io, agar.io).
 *
 * WHY THIS WORKS: snake.io is a Unity WebGL game that steers the snake toward
 * the mouse cursor's screen position. It has no gamepad support of its own.
 * But the browser CAN read your controller via the Gamepad API, so we read the
 * left stick and synthesize the mouse events the game is already listening for.
 *
 * AIMING MODEL: this uses ABSOLUTE aiming, not mouse-style relative movement.
 * Push the stick right, the cursor snaps to the right of your snake and it
 * turns right. Release the stick and it holds its last heading. That is the
 * natural feel for a stick; accumulating position like a real mouse drifts and
 * fights you.
 *
 * USAGE: open https://snake.io, press F12 -> Console, paste this, hit Enter,
 * then press any button on the controller so the browser reveals it.
 *
 * CONTROLS
 *   Left stick (or D-pad)  steer
 *   A  /  Right trigger    boost
 *   Menu (Start)           toggle this script on/off
 * ==========================================================================*/

(() => {
  'use strict';

  // Re-running should replace the old instance, not stack a second loop on top.
  if (window.__xboxSnake) {
    window.__xboxSnake.destroy();
  }

  const DEADZONE = 0.20;   // ignore stick noise near center
  const TRIGGER_THRESHOLD = 0.35;
  const AIM_RADIUS_FACTOR = 0.30; // cursor distance from center, as a fraction of the smaller viewport side

  // --------------------------------------------------------------- target ---
  // Unity renders into a <canvas>. Prefer the biggest one on the page; some
  // sites keep small offscreen canvases around for compositing or ads.
  function findCanvas() {
    const canvases = [...document.querySelectorAll('canvas')];
    if (!canvases.length) return null;
    return canvases.sort((a, b) =>
      (b.clientWidth * b.clientHeight) - (a.clientWidth * a.clientHeight))[0];
  }

  let canvas = findCanvas();

  // ------------------------------------------------------------------ HUD ---
  const hud = document.createElement('div');
  hud.style.cssText = [
    'position:fixed', 'left:12px', 'bottom:12px', 'z-index:2147483647',
    'font:12px/1.45 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace',
    'background:rgba(9,12,20,.86)', 'color:#e6edf6', 'padding:9px 12px',
    'border:1px solid rgba(120,200,255,.28)', 'border-radius:8px',
    'pointer-events:none', 'white-space:pre', 'letter-spacing:.02em',
    'box-shadow:0 4px 18px rgba(0,0,0,.45)',
  ].join(';');
  document.body.appendChild(hud);

  // Visible aim indicator, so you can see where the game thinks you're pointing.
  const dot = document.createElement('div');
  dot.style.cssText = [
    'position:fixed', 'z-index:2147483646', 'width:16px', 'height:16px',
    'margin:-8px 0 0 -8px', 'border-radius:50%', 'pointer-events:none',
    'border:2px solid rgba(120,220,255,.95)',
    'background:radial-gradient(circle,rgba(120,220,255,.55),transparent 70%)',
    'transition:opacity .15s', 'opacity:0',
  ].join(';');
  document.body.appendChild(dot);

  // ---------------------------------------------------------------- state ---
  let enabled = true;
  let running = true;
  let padIndex = null;
  let heading = -Math.PI / 2;  // start aiming up
  let boosting = false;
  let prevMenu = false;
  let vx = window.innerWidth / 2;
  let vy = window.innerHeight / 2;

  // ------------------------------------------------------- event synthesis ---
  // Unity WebGL attaches ordinary DOM listeners, and DOM listeners fire for
  // synthetic events regardless of isTrusted. We emit both the pointer* and
  // mouse* families because different Unity versions bind different ones.
  function emit(types, x, y, extra = {}) {
    const target = canvas || document.body;
    const rect = target.getBoundingClientRect
      ? target.getBoundingClientRect()
      : { left: 0, top: 0 };

    for (const type of types) {
      const isPointer = type.startsWith('pointer');
      const Ctor = isPointer ? PointerEvent : MouseEvent;
      const init = {
        bubbles: true,
        cancelable: true,
        composed: true,
        view: window,
        clientX: x,
        clientY: y,
        screenX: x,
        screenY: y,
        offsetX: x - rect.left,
        offsetY: y - rect.top,
        button: 0,
        buttons: extra.buttons ?? 0,
        ...extra,
      };
      if (isPointer) {
        init.pointerId = 1;
        init.pointerType = 'mouse';
        init.isPrimary = true;
      }
      try {
        target.dispatchEvent(new Ctor(type, init));
      } catch (_) { /* older engines may reject a family; the other still lands */ }
    }
  }

  // ----------------------------------------------------------------- loop ---
  function frame() {
    if (!running) return;

    const pads = navigator.getGamepads ? navigator.getGamepads() : [];
    let pad = padIndex !== null ? pads[padIndex] : null;

    if (!pad) {
      // Pick the first connected pad. Chrome hides pads until a button press.
      for (let i = 0; i < pads.length; i++) {
        if (pads[i] && pads[i].connected) { padIndex = i; pad = pads[i]; break; }
      }
    }

    if (!pad) {
      hud.textContent =
        'xbox-snake  ·  waiting for controller\npress any button on the pad';
      dot.style.opacity = '0';
      return requestAnimationFrame(frame);
    }

    // Menu/Start toggles the whole thing, so you can hand the mouse back.
    const menu = !!(pad.buttons[9] && pad.buttons[9].pressed);
    if (menu && !prevMenu) {
      enabled = !enabled;
      if (!enabled && boosting) {
        emit(['pointerup', 'mouseup'], vx, vy, { buttons: 0 });
        boosting = false;
      }
    }
    prevMenu = menu;

    if (!enabled) {
      hud.textContent = 'xbox-snake  ·  PAUSED\npress Menu to re-enable';
      dot.style.opacity = '0';
      return requestAnimationFrame(frame);
    }

    // Canvas can be swapped out when the game restarts.
    if (!canvas || !canvas.isConnected) canvas = findCanvas();

    // ---- steering ----
    let ax = pad.axes[0] || 0;
    let ay = pad.axes[1] || 0;

    // D-pad as a fallback for players who prefer it (standard mapping 12-15).
    const dpad = [
      pad.buttons[14] && pad.buttons[14].pressed ? -1 : 0, // left
      pad.buttons[15] && pad.buttons[15].pressed ? 1 : 0,  // right
      pad.buttons[12] && pad.buttons[12].pressed ? -1 : 0, // up
      pad.buttons[13] && pad.buttons[13].pressed ? 1 : 0,  // down
    ];
    if (dpad[0] || dpad[1] || dpad[2] || dpad[3]) {
      ax = dpad[0] + dpad[1];
      ay = dpad[2] + dpad[3];
    }

    const mag = Math.hypot(ax, ay);
    if (mag > DEADZONE) heading = Math.atan2(ay, ax); // else: hold last heading

    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const R = Math.min(window.innerWidth, window.innerHeight) * AIM_RADIUS_FACTOR;
    vx = cx + Math.cos(heading) * R;
    vy = cy + Math.sin(heading) * R;

    emit(['pointermove', 'mousemove'], vx, vy, { buttons: boosting ? 1 : 0 });

    dot.style.opacity = '1';
    dot.style.left = vx + 'px';
    dot.style.top = vy + 'px';

    // ---- boost (A button or right trigger) ----
    const a = !!(pad.buttons[0] && pad.buttons[0].pressed);
    const rt = pad.buttons[7]
      ? (pad.buttons[7].value ?? (pad.buttons[7].pressed ? 1 : 0))
      : 0;
    const wantBoost = a || rt > TRIGGER_THRESHOLD;

    if (wantBoost !== boosting) {
      boosting = wantBoost;
      emit(
        boosting ? ['pointerdown', 'mousedown'] : ['pointerup', 'mouseup'],
        vx, vy,
        { buttons: boosting ? 1 : 0 }
      );
    }

    hud.textContent =
      `xbox-snake  ·  ${pad.id.slice(0, 34)}\n` +
      `aim ${((heading * 180 / Math.PI + 450) % 360).toFixed(0).padStart(3)}°   ` +
      `boost ${boosting ? 'ON ' : 'off'}   ` +
      `canvas ${canvas ? 'ok' : 'MISSING'}\n` +
      `Menu = pause`;

    requestAnimationFrame(frame);
  }

  window.addEventListener('gamepadconnected', (e) => { padIndex = e.gamepad.index; });
  window.addEventListener('gamepaddisconnected', () => { padIndex = null; });

  window.__xboxSnake = {
    destroy() {
      running = false;
      if (boosting) emit(['pointerup', 'mouseup'], vx, vy, { buttons: 0 });
      hud.remove();
      dot.remove();
      delete window.__xboxSnake;
      console.log('[xbox-snake] stopped');
    },
    get enabled() { return enabled; },
    set enabled(v) { enabled = !!v; },
  };

  requestAnimationFrame(frame);
  console.log(
    '%c[xbox-snake] active%c  press a button on the controller.  ' +
    'Stop with: __xboxSnake.destroy()',
    'color:#67e8f9;font-weight:bold', 'color:inherit'
  );
})();
