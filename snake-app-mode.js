/* ============================================================================
 * snake.io  —  Xbox controller + app mode + haptics                    v2.3
 *
 * Play snake.io with an Xbox controller, in a clean full-screen window.
 * One console script. No install, no admin, no browser extension.
 *
 * ---------------------------------------------------------------------------
 * SETUP  (30 seconds)
 *   1. Open ONE of the two builds in Chrome (each keeps its own save):
 *        https://snake.io/             newest build (3.0.10); has ad rails,
 *                                      which this script strips
 *        https://snake.io/crazygames/  older portal build (1.2.0) with a
 *                                      WIDER CAMERA (~1.5-2x more map), no ads
 *      Pick per mood: visibility -> crazygames · latest version -> main.
 *      Presents/Boost Cubes exist on NEITHER - all web builds ship without
 *      the mobile meta entirely (verified). See README "Presents & platforms".
 *   2. In the game, make sure control mode is MOUSE, not keyboard.
 *      *** THIS IS THE #1 THING THAT BREAKS. See TROUBLESHOOTING. ***
 *   3. F12 -> Console. First time only, type:  allow pasting
 *   4. Paste this whole file -> Enter.
 *   5. Press A on the controller to wake it up. F11 for true fullscreen.
 *
 * ---------------------------------------------------------------------------
 * CONTROLS
 *   EITHER stick    steer - the two are blended by how hard each is pushed, so
 *                   control flows to whichever thumb is driving. Push both and
 *                   the lighter one nudges the aim (trim emerges from the blend).
 *   A / RT          boost            (HUD shows a rocket + the dot turns red)
 *   B               auto-circle "break" - any stick or boost takes back over
 *   Hold RB         menu cursor: sticks move it, D-pad snaps to buttons,
 *                   A clicks. Release RB to go back to steering.
 *   Menu (Start)    pause steering (hands the mouse back to you)
 *   X               revive mode: allows ads for 2 min so the "watch a video to
 *                   revive" offer can actually play. Auto re-arms after.
 *
 * OFF:  __snakeApp.destroy()
 *
 * HAPTICS (like the iPad version)
 *   firm tick   = ate a candy/pellet
 *   soft hum    = while boosting (pauses briefly around ticks)
 *   Toggle at any time:  __haptics.on = false   ·   feel one: __haptics.test()
 *
 *   How it knows: the score is painted inside the canvas, so no script can
 *   read it. Instead we hook the game's Web Audio - short blips are eating.
 *   Sound is the event bus the game never exposed. (There is deliberately no
 *   death rumble: no game sound proved unique to death.)
 *
 * ---------------------------------------------------------------------------
 * TROUBLESHOOTING  (learned the hard way, 2026-08-16)
 *
 *   Nothing responds - no steering, no boost, right stick dead, B dead?
 *   Do this FIRST, before assuming the script is broken:
 *
 *     1. Run  __snakeApp.destroy()  to turn the script off.
 *     2. Try steering with your actual MOUSE.
 *        - Mouse doesn't work either  ->  the GAME is in Keyboard control
 *          mode (or wedged). Fix it in the game's own settings, or reload
 *          the page. No script can steer a game that ignores the mouse.
 *        - Mouse works fine  ->  re-paste this file; the page state was stale.
 *
 *   Why it presents as "everything broke at once": this script drives the game
 *   by synthesizing mouse events every frame. If the game stops listening to
 *   the mouse, every controller feature dies simultaneously, which looks like
 *   four separate bugs but is one cause.
 *
 *   Also note: the script emits a mousemove every frame, so while it is
 *   running your real mouse cannot steer - the two fight. Turn the script off
 *   to test with the mouse.
 *
 *   Small snake can't boost - that's the game's own rule, not a bug.
 *
 * ---------------------------------------------------------------------------
 * ADAPTIVE, BUT NOT LEARNING
 *   The response adapts every frame (intensity, filter strength, urgency kick).
 *   The tuning constants below do NOT change - they were calibrated once from
 *   recorded play, and `intensity` resets to 0 on every paste. No memory
 *   between sessions. See the v2.1 backlog note in README.md for the idea of
 *   making the tuning itself learn over time via localStorage.
 *
 * DELIBERATELY NOT INCLUDED
 *   devicePixelRatio override ("2x zoom"). Tested properly at the menu screen
 *   with no snake to confound it: hexagons and UI are identical at 1x and 2x.
 *   It only raises render resolution, it does NOT show more map - and it
 *   changes canvas coordinate mapping, which is a real source of input bugs.
 *   The wider view you want comes from the /crazygames/ build itself.
 * ==========================================================================*/

(() => {
  'use strict';

  /* ---------- on-screen message bar (survives rig restarts) -------------- */
  let bn = document.getElementById('__claudeSay');
  if (!bn) { bn = document.createElement('div'); bn.id = '__claudeSay'; document.documentElement.appendChild(bn); }
  bn.style.cssText = 'position:fixed;top:10px;left:50%;transform:translateX(-50%);z-index:2147483647;max-width:80vw;font:600 15px/1.35 ui-sans-serif,system-ui,Segoe UI,sans-serif;background:linear-gradient(135deg,rgba(103,232,249,.98),rgba(90,140,255,.98));color:#06121f;padding:9px 18px;border-radius:0 0 14px 14px;box-shadow:0 6px 24px rgba(0,0,0,.55);pointer-events:none;text-align:center;opacity:0';
  window.__claudeSay = (msg) => { const e = document.getElementById('__claudeSay'); if (!e) return; e.textContent = '💬 ' + msg; e.style.setProperty('opacity', '1', 'important'); };
  const say = (m) => { try { window.__claudeSay(m); } catch (_) {} };

  if (window.__snakeApp) { try { window.__snakeApp.destroy(); } catch (_) {} }

  /* ------------------------------- haptics -------------------------------
     Rumble on game events, the way the native iPad app does.
     The game exposes no score/collision API (it's all inside the canvas), so
     we hook Web Audio and fire on sound events instead.

     v2.2 lessons baked in:
     - Ticks fire on ANY short sound (<=0.60s). The candy blip measures 0.177s
       but exact-matching proved brittle; broad matching is reliable.
     - NO death thump: the game has 4+ distinct long sounds, none rare enough
       to be death. A strong rumble firing on the wrong event is worse than
       none, so long sounds are ignored.
     - Tick is 80ms at 0.75 weak + 0.12 strong: the original 38ms/0.26 was
       below the weak motor's perception threshold ("rumble doesn't work").
     - The boost hum DEFERS to ticks (200ms) so eating stays feelable while
       boosting; playEffect calls replace each other, so overlap = masking.  */
  const TICK_MAX_SEC = 0.60;
  const getPad = () => { const ps = navigator.getGamepads ? navigator.getGamepads() : []; for (const p of ps) if (p && p.connected) return p; return null; };
  let lastTick = 0, lastHum = 0;
  const play = (strong, weak, ms) => {
    const pad = getPad(), act = pad && pad.vibrationActuator;
    if (!act || typeof act.playEffect !== 'function') return;
    try { act.playEffect('dual-rumble', { duration: ms, strongMagnitude: strong, weakMagnitude: weak }); } catch (_) {}
  };
  const onGameSound = (dur) => {
    if (!window.__hapticsOn || dur === null || dur === undefined) return;
    if (dur <= TICK_MAX_SEC) {                                 // ate a candy
      const now = performance.now();
      if (now - lastTick < 90) return;                         // keep ticks distinct
      lastTick = now; play(0.12, 0.75, 80);
    }
  };
  window.__hapticsOnSound = onGameSound;
  if (!window.__audioHooked) {                                // hook once per page
    window.__audioHooked = true;
    const origStart = AudioBufferSourceNode.prototype.start;
    AudioBufferSourceNode.prototype.start = function (...args) {
      try { window.__hapticsOnSound && window.__hapticsOnSound(this.buffer ? this.buffer.duration : null); } catch (_) {}
      return origStart.apply(this, args);
    };
  }
  window.__hapticsOn = true;
  const boostHum = setInterval(() => {
    if (!window.__hapticsOn) return;
    const pad = getPad(); if (!pad) return;
    const now = performance.now();
    if (now - lastTick < 200) return;                          // hum defers to ticks
    if ((!!pad.buttons[0]?.pressed || (pad.buttons[7]?.value ?? 0) > 0.3) && now - lastHum > 160) {
      lastHum = now; play(0, 0.06, 140);
    }
  }, 80);
  window.__haptics = {
    get on() { return window.__hapticsOn; },
    set on(v) { window.__hapticsOn = !!v; },
    test() { play(0.12, 0.75, 80); }
  };

  /* ------------------------------ app mode ------------------------------- */
  const css = document.createElement('style'); css.id = '__snakeApp_css';
  css.textContent = `
    #otherKooApps, #snakeContainer, #otherGamesContainer, .app-icon, .app-icon-link,
    .app-icon-cross-promo, #comicsBanner { display:none !important; }
    body > *:not(#main) { display:none !important; }
    #main > *:not(.main-content) { display:none !important; }
    .main-content > *:not(#webglContainer) { display:none !important; }
    html, body { margin:0 !important; padding:0 !important; overflow:hidden !important; background:#0b1420 !important; }
    #webglContainer, .webgl-section, #webgl-mount, #unity-container, #unity-canvas-container {
      position:fixed !important; inset:0 !important; width:100vw !important; height:100vh !important;
      max-width:none !important; max-height:none !important; margin:0 !important; padding:0 !important;
      display:block !important; transform:none !important; top:0 !important; left:0 !important; }
    #unity-canvas { width:100% !important; height:100% !important; display:block !important;
      position:absolute !important; top:0 !important; left:0 !important; transform:none !important; }
  `;
  document.documentElement.appendChild(css);

  /* ad rules live in their own sheet so Revive mode (X) can suspend them */
  const adCss = document.createElement('style'); adCss.id = '__snakeApp_adCss';
  adCss.textContent = `iframe, ins.adsbygoogle, .adsbygoogle, [id^="google_ads"], [id^="aswift"],
    [class*="ad-"], [class*="-ad"] { display:none !important; }`;
  document.documentElement.appendChild(adCss);

  let adsAllowed = false, adTimer = null;
  const allowAds = (onFlag) => {
    adsAllowed = onFlag; adCss.disabled = onFlag;
    if (onFlag) {
      for (const n of document.body.children) if (n.style.display === 'none' && n.id !== '__claudeSay') n.style.removeProperty('display');
      clearTimeout(adTimer);
      adTimer = setTimeout(() => { if (adsAllowed) { allowAds(false); say('Revive window closed — ad-blocking re-armed.'); } }, 120000);
      say('🎬 REVIVE MODE: ads allowed 2 min. Hold RB, point at REVIVE, press A.');
    } else { clearTimeout(adTimer); say('🛡️ Ad-blocking back on.'); }
  };

  const mo = new MutationObserver(() => { if (adsAllowed) return;
    for (const n of document.body.children)
      if (n.id !== 'main' && n.id !== '__claudeSay' && n.tagName !== 'STYLE' && n.tagName !== 'SCRIPT' && n.style.display !== 'none')
        n.style.setProperty('display', 'none', 'important'); });
  mo.observe(document.body, { childList: true });

  const relayout = () => { scrollTo(0, 0); window.dispatchEvent(new Event('resize')); };
  relayout(); const relayoutTimer = setInterval(relayout, 1500);
  const adKiller = setInterval(() => {
    if (adsAllowed) return;
    if (location.hash.includes('goog_fullscreen_ad')) { try { history.back(); } catch (_) {} }
    for (const e of document.querySelectorAll('div,span,button,a')) {
      const t = (e.innerText || '').trim().toLowerCase();
      if ((t === 'close' || t === 'x' || t === 'skip ad' || t === 'skip') && e.offsetWidth > 0 && e.offsetWidth < 200) { try { e.click(); } catch (_) {} }
    }
  }, 700);

  /* --------------------------- steering tuning --------------------------- */
  // No presets. One "intensity" value (0..1) tracks how hectic play is and
  // slides every parameter between a calm end and a combat end. It rises fast
  // (fights get response instantly) and falls slowly (won't drop you mid-scrap).
  // Calibrated from ~75 min of recorded play: these values measured 8.4
  // corrections/min vs 18.2 for the first over-eager attempt, and beat both of
  // the old hand-picked Chill/Chiller presets.
  const CALM   = { DEAD: 0.155, AIM_MIN: 0.12, AIM_MAX: 0.30, SMOOTH: 0.30 };
  const COMBAT = { DEAD: 0.115, AIM_MIN: 0.18, AIM_MAX: 0.42, SMOOTH: 0.55 };
  const INT_GAIN = 2.6, INT_BOOST = 0.15, INT_ATTACK = 0.14, INT_RELEASE = 0.045;

  const TRIG = 0.30;                                   // trigger pull = boost
  const BLEND_P = 2.0;                                 // stick-blend exponent (higher = dominant stick wins harder)
  const FILT_MIN = 0.14, FILT_MAX = 0.75, FILT_GAIN = 6.0;  // adaptive low-pass
  const URG_K = 5.0, URG_BOOST = 0.45;                 // urgency dodge kick
  const CIRCLE_SPEED = 0.16, CIRCLE_R = 0.06;          // tight break-circle

  const mix = (a, b, t) => a + (b - a) * t;
  let intensity = 0;
  let domSmooth = 0.5;                                 // 0 = left stick dominant, 1 = right (HUD display only)

  /* menu hotspots, measured from a real 1920-wide menu screenshot */
  const SPOTS = [
    { n: 'PLAY',     fx: 0.495, fy: 0.487 },
    { n: 'NEXT',     fx: 0.500, fy: 0.820 },
    { n: 'Name',     fx: 0.499, fy: 0.205 },
    { n: 'Skins',    fx: 0.054, fy: 0.111 },
    { n: 'Settings', fx: 0.054, fy: 0.847 },
  ];
  let spotIdx = 0;

  /* ------------------------------ overlays ------------------------------- */
  const findCanvas = () => { const cs = [...document.querySelectorAll('canvas')];
    return cs.length ? cs.sort((a, b) => b.clientWidth * b.clientHeight - a.clientWidth * a.clientHeight)[0] : null; };
  let cv = findCanvas();
  const hud = document.createElement('div');
  hud.style.cssText = 'position:fixed;left:12px;bottom:12px;z-index:2147483647;font:12px/1.4 ui-monospace,Consolas,monospace;background:rgba(9,12,20,.85);color:#e6edf6;padding:8px 11px;border:1px solid rgba(120,200,255,.3);border-radius:8px;pointer-events:none;white-space:pre';
  document.documentElement.appendChild(hud);
  const dot = document.createElement('div');          // aim indicator
  dot.style.cssText = 'position:fixed;z-index:2147483646;width:16px;height:16px;margin:-8px 0 0 -8px;border-radius:50%;pointer-events:none;border:2px solid rgba(120,220,255,.95);background:radial-gradient(circle,rgba(120,220,255,.5),transparent 70%);opacity:0';
  document.documentElement.appendChild(dot);
  const dot2 = document.createElement('div');         // right-stick trim
  dot2.style.cssText = 'position:fixed;z-index:2147483646;width:11px;height:11px;margin:-5.5px 0 0 -5.5px;border-radius:50%;pointer-events:none;border:2px solid rgba(255,160,220,.95);opacity:0';
  document.documentElement.appendChild(dot2);
  const cur = document.createElement('div');          // menu cursor
  cur.style.cssText = 'position:fixed;z-index:2147483646;width:34px;height:34px;margin:-17px 0 0 -17px;border-radius:50%;pointer-events:none;border:3px solid rgba(255,210,90,.95);box-shadow:0 0 14px rgba(255,210,90,.6);opacity:0';
  document.documentElement.appendChild(cur);

  /* ------------------------------- state --------------------------------- */
  let run = true, on = true, heading = -Math.PI / 2, aimHeading = -Math.PI / 2, mag = 0, boost = false,
      pA = false, pB = false, pX = false, pMenu = false, pDL = false, pDR = false, pDU = false, pDD = false,
      circle = false, circAng = 0,
      fx = 0, fy = 0, plx = 0, ply = 0,
      vx = innerWidth / 2, vy = innerHeight / 2, mx = innerWidth / 2, my = innerHeight / 2;

  const angDiff = (a, b) => { let d = ((a - b + Math.PI) % (2 * Math.PI)) - Math.PI; if (d < -Math.PI) d += 2 * Math.PI; return d; };
  const lerpA = (a, b, t) => a + angDiff(b, a) * t;

  function emit(types, x, y, buttons) {
    const t = cv || document.body, r = t.getBoundingClientRect();
    for (const ty of types) {
      const P = ty.startsWith('pointer'), C = P ? PointerEvent : MouseEvent;
      const i = { bubbles: true, cancelable: true, composed: true, view: window,
        clientX: x, clientY: y, screenX: x, screenY: y,
        offsetX: x - r.left, offsetY: y - r.top, button: 0, buttons };
      if (P) { i.pointerId = 1; i.pointerType = 'mouse'; i.isPrimary = true; }
      try { t.dispatchEvent(new C(ty, i)); } catch (_) {}
    }
  }

  /* -------------------------------- loop --------------------------------- */
  function frame() {
    if (!run) return;
    const pads = navigator.getGamepads ? navigator.getGamepads() : [];
    let pad = null; for (const p of pads) { if (p && p.connected) { pad = p; break; } }
    if (!pad) { hud.textContent = 'press a button on the pad'; dot.style.opacity = '0'; cur.style.opacity = '0'; return requestAnimationFrame(frame); }

    const A = !!pad.buttons[0]?.pressed, B = !!pad.buttons[1]?.pressed, X = !!pad.buttons[2]?.pressed,
          RB = !!pad.buttons[5]?.pressed, MENU = !!pad.buttons[9]?.pressed,
          RT = pad.buttons[7]?.value ?? 0;
    const dU = !!pad.buttons[12]?.pressed, dD = !!pad.buttons[13]?.pressed,
          dL = !!pad.buttons[14]?.pressed, dR = !!pad.buttons[15]?.pressed;
    const lx = pad.axes[0] || 0, ly = pad.axes[1] || 0, rx = pad.axes[2] || 0, ry = pad.axes[3] || 0;
    const lMag = Math.hypot(lx, ly), rMag = Math.hypot(rx, ry);

    if (MENU && !pMenu) { on = !on; if (!on && boost) { emit(['pointerup', 'mouseup'], vx, vy, 0); boost = false; } say(on ? 'Steering ON' : 'PAUSED — your mouse works again'); } pMenu = MENU;
    if (!on) { hud.textContent = 'PAUSED — Menu btn to resume'; dot.style.opacity = '0'; cur.style.opacity = '0'; return requestAnimationFrame(frame); }
    if (X && !pX) allowAds(!adsAllowed); pX = X;

    if (!cv || !cv.isConnected) cv = findCanvas();
    const cx = innerWidth / 2, cy = innerHeight / 2;
    const r = (cv || document.body).getBoundingClientRect();

    if (RB) {
      /* ---- MENU CURSOR (hold RB — deliberately not a toggle, so it can
              never latch on and silently swallow every other control) ---- */
      const sx = Math.abs(rx) > Math.abs(lx) ? rx : lx, sy = Math.abs(ry) > Math.abs(ly) ? ry : ly;
      const mg = Math.hypot(sx, sy);
      if (mg > 0.15) { const sp = 3 + 19 * mg * mg; mx += sx * sp; my += sy * sp; }  // velocity cursor
      mx = Math.max(6, Math.min(innerWidth - 6, mx)); my = Math.max(6, Math.min(innerHeight - 6, my));
      const snap = d => { spotIdx = (spotIdx + d + SPOTS.length) % SPOTS.length; const s = SPOTS[spotIdx];
        mx = r.left + r.width * s.fx; my = r.top + r.height * s.fy; say('▸ ' + s.n + ' — press A'); };
      if ((dR && !pDR) || (dD && !pDD)) snap(1);
      if ((dL && !pDL) || (dU && !pDU)) snap(-1);
      emit(['pointermove', 'mousemove'], mx, my, 0);
      if (A && !pA) { emit(['pointerdown', 'mousedown'], mx, my, 1); emit(['pointerup', 'mouseup', 'click'], mx, my, 0); }
      cur.style.opacity = '1'; cur.style.left = mx + 'px'; cur.style.top = my + 'px';
      dot.style.opacity = '0'; dot2.style.opacity = '0';
      hud.textContent = `🖱️ MENU (hold RB) · ${SPOTS[spotIdx].n}\nD-pad=snap · A=click · release=game`;
    } else {
      cur.style.opacity = '0';
      if (B && !pB) { circle = !circle; if (circle) { circAng = heading; say('☕ auto-circle'); } else say('back to you'); } pB = B;
      // any real input cancels the circle — it must never swallow your controls
      if (circle && (lMag > 0.10 || rMag > 0.10 || A || RT > TRIG)) circle = false;

      if (circle) {
        circAng += CIRCLE_SPEED; heading = circAng;
        const R = Math.min(innerWidth, innerHeight) * CIRCLE_R;
        vx = cx + Math.cos(circAng) * R; vy = cy + Math.sin(circAng) * R;
        emit(['pointermove', 'mousemove'], vx, vy, 0); dot2.style.opacity = '0';
        hud.textContent = '☕ AUTO-CIRCLE\nstick or boost to take over';
      } else {
        /* ============ BLENDED DUAL-STICK STEERING ============
           No primary/trim roles and no mode switching. Each stick's influence
           is its magnitude^BLEND_P, so whichever thumb is driving dominates and
           control flows smoothly between them. Push both and the lighter one
           nudges the aim — "trim" emerges from the blend rather than being a
           separate feature with its own weight.
           Replaces the old left=steer / right=trim split, which forced the
           player to fight the assignment if they preferred the right stick. */
        const wl = Math.pow(lMag, BLEND_P), wr = Math.pow(rMag, BLEND_P);
        const wsum = wl + wr;
        let ax = 0, ay = 0;
        if (wsum > 1e-6) {
          ax = (lx * wl + rx * wr) / wsum;
          ay = (ly * wl + ry * wr) / wsum;
          // rescale to the stronger stick's push so blending never weakens input
          const pushMag = Math.max(lMag, rMag);
          const n = Math.hypot(ax, ay) || 1;
          ax = ax / n * pushMag; ay = ay / n * pushMag;
        }
        const ddx = (dR ? 1 : 0) - (dL ? 1 : 0), ddy = (dD ? 1 : 0) - (dU ? 1 : 0);
        if (ddx || ddy) { ax = ddx; ay = ddy; }                      // d-pad fallback
        // smoothed dominance, for the HUD blend bar only
        domSmooth += ((wsum > 1e-6 ? wr / wsum : 0.5) - domSmooth) * 0.12;
        const spd = Math.hypot(ax - plx, ay - ply); plx = ax; ply = ay;

        // auto-sensitivity
        const act = Math.min(1, spd * INT_GAIN + ((A || RT > TRIG) ? INT_BOOST : 0));
        intensity += (act - intensity) * (act > intensity ? INT_ATTACK : INT_RELEASE);
        const DEAD    = mix(CALM.DEAD,    COMBAT.DEAD,    intensity);
        const AIM_MIN = mix(CALM.AIM_MIN, COMBAT.AIM_MIN, intensity);
        const AIM_MAX = mix(CALM.AIM_MAX, COMBAT.AIM_MAX, intensity);
        const SMOOTH  = mix(CALM.SMOOTH,  COMBAT.SMOOTH,  intensity);

        // adaptive low-pass: silky on slow moves, near-instant on fast flicks
        const alpha = Math.min(FILT_MAX, FILT_MIN + spd * FILT_GAIN * (FILT_MAX - FILT_MIN));
        fx += (ax - fx) * alpha; fy += (ay - fy) * alpha;

        const m = Math.hypot(fx, fy);
        if (m > DEAD) { aimHeading = Math.atan2(fy, fx); mag = Math.min(1, (m - DEAD) / (1 - DEAD)); }

        // (no separate trim step — it is part of the blend above)
        dot2.style.opacity = '0';

        heading = lerpA(heading, aimHeading, Math.min(1, SMOOTH + 0.30));

        // urgency: a fast whip kicks the aim further out so the dodge bites
        const urg = Math.min(1, spd * URG_K);
        let R = Math.min(innerWidth, innerHeight) * (AIM_MIN + (AIM_MAX - AIM_MIN) * mag);
        R *= (1 + urg * URG_BOOST);
        vx = cx + Math.cos(heading) * R; vy = cy + Math.sin(heading) * R;

        const want = A || RT > TRIG;
        emit(['pointermove', 'mousemove'], vx, vy, want ? 1 : 0);
        if (want !== boost) { boost = want; emit(boost ? ['pointerdown', 'mousedown'] : ['pointerup', 'mouseup'], vx, vy, boost ? 1 : 0); }

        const lvl = Math.min(7, Math.round(intensity * 7));
        const domPos = Math.round(domSmooth * 8);
        hud.textContent = (adsAllowed ? '🎬 REVIVE MODE · X=re-arm\n' : '') +
          `AUTO ${'█'.repeat(lvl)}${'░'.repeat(7 - lvl)} ${(intensity * 100).toFixed(0)}%${boost ? '  🚀' : ''}\n` +
          `🕹️ blend L${'·'.repeat(domPos)}●${'·'.repeat(8 - domPos)}R\n` +
          `B=circle · hold RB=menu · X=revive · Menu=pause`;
      }
      dot.style.opacity = '1'; dot.style.left = vx + 'px'; dot.style.top = vy + 'px';
      dot.style.borderColor = circle ? 'rgba(180,255,140,.95)' : (boost ? 'rgba(255,110,110,.98)' : 'rgba(120,220,255,.95)');
    }
    pA = A; pDL = dL; pDR = dR; pDU = dU; pDD = dD;
    requestAnimationFrame(frame);
  }

  window.__snakeApp = {
    get intensity() { return intensity; },
    allowAds,
    destroy() {
      run = false;
      clearInterval(relayoutTimer); clearInterval(adKiller); clearTimeout(adTimer);
      clearInterval(boostHum); window.__hapticsOn = false;
      mo.disconnect();
      if (boost) emit(['pointerup', 'mouseup'], vx, vy, 0);
      css.remove(); adCss.remove(); hud.remove(); dot.remove(); dot2.remove(); cur.remove();
      delete window.__snakeApp;
      console.log('[snake app] off — your real mouse controls the game again');
    }
  };
  requestAnimationFrame(frame);
  say('✅ v2.3 ready — press A. Either stick steers (blended). Hold RB for menus. __haptics.on=false to mute.');
  console.log('%c[snake app v2.3] on. Controls + troubleshooting in the file header. Stop: __snakeApp.destroy()', 'color:#67e8f9;font-weight:bold');
})();
