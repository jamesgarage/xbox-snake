/* Xbox Snake Rig v2.5 — auto-injected by the extension on snake.io pages.
   Same rig as ../snake-app-mode.js, plus: auto-clicks the "click to play"
   facade so the game boots without touching the mouse.
   v2.4: MONSTER TRUCK skin — top-down truck overlay pinned to the worm's
   head (always screen center), fire trail hides the worm body. Y toggles.
   v2.5: OPTICAL-FLOW trail — camera motion is MEASURED (captureStream +
   block matching on background patches), so the fire follows the real
   driven path through turns instead of the aimed heading. Monstery truck
   redesign, smoke fade-out trail ending, fire burns out on death.
   Study telemetry at window.__fireStudy.report(). */
(() => {
  'use strict';
  if (window.__snakeRigLoaded) return;   // one rig per page, ever
  window.__snakeRigLoaded = true;

  /* ---------- auto-boot: dismiss the facade so Unity loads ---------- */
  const boot = setInterval(() => {
    const facade = document.querySelector('#webgl-facade');
    const playEl = [...document.querySelectorAll('button,a,div')]
      .find(e => (e.innerText || '').trim().toLowerCase() === 'play' && e.offsetWidth > 0 && e.offsetWidth < 400);
    if (facade) { facade.click(); playEl?.click(); }
    if (document.querySelector('canvas')?.clientWidth > 200) clearInterval(boot);
  }, 800);
  setTimeout(() => clearInterval(boot), 60000);

  /* ---------- message banner ---------- */
  let bn = document.getElementById('__claudeSay');
  if (!bn) { bn = document.createElement('div'); bn.id = '__claudeSay'; document.documentElement.appendChild(bn); }
  bn.style.cssText = 'position:fixed;top:10px;left:50%;transform:translateX(-50%);z-index:2147483647;max-width:80vw;font:600 15px/1.35 ui-sans-serif,system-ui,Segoe UI,sans-serif;background:linear-gradient(135deg,rgba(103,232,249,.98),rgba(90,140,255,.98));color:#06121f;padding:9px 18px;border-radius:0 0 14px 14px;box-shadow:0 6px 24px rgba(0,0,0,.55);pointer-events:none;text-align:center;opacity:0';
  window.__claudeSay = m => { const e = document.getElementById('__claudeSay'); if (e) { e.textContent = '💬 ' + m; e.style.setProperty('opacity', '1', 'important'); } };
  const say = m => { try { window.__claudeSay(m); } catch (_) {} };

  /* ---------- audio hook + haptics (candy tick + deferring hum) ---------- */
  if (!window.__audioHooked) {
    window.__audioHooked = true;
    const orig = AudioBufferSourceNode.prototype.start;
    AudioBufferSourceNode.prototype.start = function (...args) {
      try { if (window.__onGameSound) window.__onGameSound(this.buffer ? this.buffer.duration : null); } catch (_) {}
      return orig.apply(this, args);
    };
  }
  const getPad = () => { const ps = navigator.getGamepads ? navigator.getGamepads() : []; for (const p of ps) if (p && p.connected) return p; return null; };
  let lastTick = 0, lastHum = 0;
  const rumble = (s, w, ms) => { const pad = getPad(), act = pad && pad.vibrationActuator;
    if (!act) return; try { act.playEffect('dual-rumble', { duration: ms, strongMagnitude: s, weakMagnitude: w }); } catch (_) {} };
  window.__onGameSound = (dur) => {
    if (!window.__hapticsOn || dur == null) return;
    if (dur <= 0.60) { const now = performance.now(); if (now - lastTick < 90) return; lastTick = now; rumble(0.12, 0.75, 80); }
  };
  setInterval(() => {
    if (!window.__hapticsOn) return; const pad = getPad(); if (!pad) return;
    const now = performance.now();
    if (now - lastTick < 200) return;
    if ((!!pad.buttons[0]?.pressed || (pad.buttons[7]?.value ?? 0) > 0.3) && now - lastHum > 160) { lastHum = now; rumble(0, 0.06, 140); }
  }, 80);
  window.__hapticsOn = true;
  window.__haptics = { get on() { return window.__hapticsOn; }, set on(v) { window.__hapticsOn = !!v; }, test() { rumble(0.12, 0.75, 80); } };

  /* ---------- app mode css + ad handling ---------- */
  const css = document.createElement('style'); css.id = '__snakeApp_css';
  css.textContent = `
    #otherKooApps,#snakeContainer,#otherGamesContainer,.app-icon,.app-icon-link,.app-icon-cross-promo,#comicsBanner{display:none!important}
    body > *:not(#main){display:none!important}
    #main > *:not(.main-content){display:none!important}
    .main-content > *:not(#webglContainer){display:none!important}
    html,body{margin:0!important;padding:0!important;overflow:hidden!important;background:#0b1420!important}
    #webglContainer,.webgl-section,#webgl-mount,#unity-container,#unity-canvas-container{position:fixed!important;inset:0!important;width:100vw!important;height:100vh!important;max-width:none!important;max-height:none!important;margin:0!important;padding:0!important;display:block!important;transform:none!important;top:0!important;left:0!important}
    #unity-canvas{width:100%!important;height:100%!important;display:block!important;position:absolute!important;top:0!important;left:0!important;transform:none!important}`;
  document.documentElement.appendChild(css);
  const adCss = document.createElement('style'); adCss.id = '__snakeApp_adCss';
  adCss.textContent = `iframe,ins.adsbygoogle,.adsbygoogle,[id^="google_ads"],[id^="aswift"],[class*="ad-"],[class*="-ad"]{display:none!important}`;
  document.documentElement.appendChild(adCss);
  let adsAllowed = false, adTimer = null;
  const allowAds = (onF) => { adsAllowed = onF; adCss.disabled = onF;
    if (onF) { for (const n of document.body.children) if (n.style.display === 'none' && n.id !== '__claudeSay') n.style.removeProperty('display');
      clearTimeout(adTimer); adTimer = setTimeout(() => { if (adsAllowed) { allowAds(false); say('Ad-blocking re-armed.'); } }, 120000);
      say('🎬 REVIVE MODE: ads allowed 2 min.'); }
    else { clearTimeout(adTimer); say('🛡️ Ad-blocking on.'); } };
  const mo = new MutationObserver(() => { if (adsAllowed) return;
    for (const n of document.body.children)
      if (n.id !== 'main' && n.id !== '__claudeSay' && n.tagName !== 'STYLE' && n.tagName !== 'SCRIPT' && n.style.display !== 'none') n.style.setProperty('display', 'none', 'important'); });
  const moStart = () => { if (document.body) mo.observe(document.body, { childList: true }); else setTimeout(moStart, 500); };
  moStart();
  setInterval(() => { scrollTo(0, 0); window.dispatchEvent(new Event('resize')); }, 1500);
  setInterval(() => { if (adsAllowed) return;
    if (location.hash.includes('goog_fullscreen_ad')) { try { history.back(); } catch (_) {} }
    for (const e of document.querySelectorAll('div,span,button,a')) { const t = (e.innerText || '').trim().toLowerCase();
      if ((t === 'close' || t === 'x' || t === 'skip ad' || t === 'skip') && e.offsetWidth > 0 && e.offsetWidth < 200) { try { e.click(); } catch (_) {} } } }, 700);

  /* ---------- blended dual-stick steering + auto-sensitivity ---------- */
  const CALM = { DEAD: 0.145, AIM_MIN: 0.12, AIM_MAX: 0.30, SMOOTH: 0.30 };
  const COMBAT = { DEAD: 0.110, AIM_MIN: 0.18, AIM_MAX: 0.42, SMOOTH: 0.55 };
  const INT_GAIN = 2.6, INT_BOOST = 0.15, INT_ATTACK = 0.14, INT_RELEASE = 0.045;
  const TRIG = 0.30, FILT_MIN = 0.14, FILT_MAX = 0.75, FILT_GAIN = 6.0, URG_K = 5.0, URG_BOOST = 0.45;
  const CIRCLE_SPEED = 0.16, CIRCLE_R = 0.06, BLEND_P = 2.0;
  const mix = (a, b, t) => a + (b - a) * t;
  let intensity = 0, domSmooth = 0.5;
  const SPOTS = [{ n: 'PLAY', fx: 0.495, fy: 0.487 }, { n: 'NEXT', fx: 0.500, fy: 0.820 }, { n: 'Name', fx: 0.499, fy: 0.205 }, { n: 'Skins', fx: 0.054, fy: 0.111 }, { n: 'Settings', fx: 0.054, fy: 0.847 }];
  let spotIdx = 0;
  const findCanvas = () => { const cs = [...document.querySelectorAll('canvas')]; return cs.length ? cs.sort((a, b) => b.clientWidth * b.clientHeight - a.clientWidth * a.clientHeight)[0] : null; };
  let cv = findCanvas();
  const hud = document.createElement('div');
  hud.style.cssText = 'position:fixed;left:12px;bottom:12px;z-index:2147483647;font:12px/1.4 ui-monospace,Consolas,monospace;background:rgba(9,12,20,.85);color:#e6edf6;padding:8px 11px;border:1px solid rgba(120,200,255,.3);border-radius:8px;pointer-events:none;white-space:pre';
  document.documentElement.appendChild(hud);
  const dot = document.createElement('div');
  dot.style.cssText = 'position:fixed;z-index:2147483646;width:16px;height:16px;margin:-8px 0 0 -8px;border-radius:50%;pointer-events:none;border:2px solid rgba(120,220,255,.95);background:radial-gradient(circle,rgba(120,220,255,.5),transparent 70%);opacity:0';
  document.documentElement.appendChild(dot);
  const cur = document.createElement('div');
  cur.style.cssText = 'position:fixed;z-index:2147483646;width:34px;height:34px;margin:-17px 0 0 -17px;border-radius:50%;pointer-events:none;border:3px solid rgba(255,210,90,.95);box-shadow:0 0 14px rgba(255,210,90,.6);opacity:0';
  document.documentElement.appendChild(cur);

  /* ---------- MONSTER TRUCK skin v2 ("monstery"): black body, orange trim,
     flame decal, bull-bar spikes, skull roof, light bar, huge lugged wheels.
     Faces +x; pinned to screen center (camera locks the head there). ---------- */
  const truck = document.createElement('div');
  truck.style.cssText = 'position:fixed;z-index:2147483645;width:96px;height:96px;margin:-48px 0 0 -48px;pointer-events:none;opacity:0;will-change:transform;filter:drop-shadow(0 6px 9px rgba(0,0,0,.6))';
  truck.innerHTML = `<svg viewBox="0 0 96 96" width="96" height="96" style="overflow:visible">
    <defs>
      <linearGradient id="__tkBody" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#23272f"/><stop offset=".5" stop-color="#101318"/><stop offset="1" stop-color="#1c2027"/>
      </linearGradient>
      <linearGradient id="__tkWheel" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#0b0d10"/><stop offset=".5" stop-color="#181c21"/><stop offset="1" stop-color="#0b0d10"/>
      </linearGradient>
    </defs>
    <g id="__nitroFx" opacity="0">
      <polygon points="14,34 -16,48 14,62" fill="#ff9a1f"/>
      <polygon points="14,41 -4,48 14,55" fill="#ffe27a"/>
    </g>
    <rect x="12" y="16" width="11" height="64" rx="3" fill="#454d57"/>
    <rect x="73" y="16" width="11" height="64" rx="3" fill="#454d57"/>
    <g fill="url(#__tkWheel)" stroke="#2a2f35" stroke-width="1">
      <rect x="1"  y="0"  width="30" height="18" rx="7"/>
      <rect x="63" y="0"  width="30" height="18" rx="7"/>
      <rect x="1"  y="78" width="30" height="18" rx="7"/>
      <rect x="63" y="78" width="30" height="18" rx="7"/>
    </g>
    <g fill="#39424c">
      <rect x="7"  y="1" width="3" height="16" rx="1.5"/><rect x="14" y="1" width="3" height="16" rx="1.5"/><rect x="21" y="1" width="3" height="16" rx="1.5"/>
      <rect x="69" y="1" width="3" height="16" rx="1.5"/><rect x="76" y="1" width="3" height="16" rx="1.5"/><rect x="83" y="1" width="3" height="16" rx="1.5"/>
      <rect x="7"  y="79" width="3" height="16" rx="1.5"/><rect x="14" y="79" width="3" height="16" rx="1.5"/><rect x="21" y="79" width="3" height="16" rx="1.5"/>
      <rect x="69" y="79" width="3" height="16" rx="1.5"/><rect x="76" y="79" width="3" height="16" rx="1.5"/><rect x="83" y="79" width="3" height="16" rx="1.5"/>
    </g>
    <path d="M20,30 Q14,48 20,66 L62,70 L82,64 Q90,56 90,48 Q90,40 82,32 L62,26 Z" fill="url(#__tkBody)" stroke="#ff5a1f" stroke-width="1.6"/>
    <polygon points="48,38 60,34 56,40 68,37 62,44 76,42 66,48 76,54 62,52 68,59 56,56 60,62 48,58 52,48" fill="#ff7a00"/>
    <polygon points="52,42 60,40 58,44 66,44 60,48 66,52 58,52 60,56 52,54 54,48" fill="#ffd23f"/>
    <rect x="33" y="34" width="19" height="28" rx="5" fill="#14171c" stroke="#ff5a1f" stroke-width="1.2"/>
    <circle cx="42" cy="48" r="4.6" fill="#e8edf2"/>
    <circle cx="40.6" cy="46.8" r="1.1" fill="#0b0d10"/><circle cx="43.4" cy="46.8" r="1.1" fill="#0b0d10"/>
    <rect x="40" y="50" width="4" height="2" rx="1" fill="#0b0d10"/>
    <circle cx="51" cy="38.5" r="1.7" fill="#ffe27a"/><circle cx="51" cy="43" r="1.7" fill="#ffe27a"/>
    <circle cx="51" cy="53" r="1.7" fill="#ffe27a"/><circle cx="51" cy="57.5" r="1.7" fill="#ffe27a"/>
    <rect x="56" y="38" width="7" height="20" rx="2" fill="#8fd4ff" opacity=".85"/>
    <path d="M87,36 Q94,48 87,60" stroke="#c9d2dc" stroke-width="3.4" fill="none" stroke-linecap="round"/>
    <polygon points="90,39 97,42.5 90,46" fill="#c9d2dc"/>
    <polygon points="90,45 98,48 90,51" fill="#c9d2dc"/>
    <polygon points="90,50 97,53.5 90,57" fill="#c9d2dc"/>
    <circle cx="30" cy="31" r="3.2" fill="#cfd6de" stroke="#6b7480"/><circle cx="30" cy="31" r="1.4" fill="#2a2f35"/>
    <circle cx="30" cy="65" r="3.2" fill="#cfd6de" stroke="#6b7480"/><circle cx="30" cy="65" r="1.4" fill="#2a2f35"/>
  </svg>`;
  document.documentElement.appendChild(truck);
  const nitro = truck.querySelector('#__nitroFx');
  let truckOn = true, pY = false, truckDir = -Math.PI / 2;

  /* ---------- optical-flow camera tracker: the camera moves exactly with the
     worm head, so measured background displacement per frame IS the ember
     drift that keeps the trail pinned to the world (i.e. on the driven path,
     which is where the worm body is). Measured via captureStream -> video ->
     block matching of small patches (works despite preserveDrawingBuffer:false). */
  const FLOWP = { patch: 32, search: 10, spots: [[.16, .30], [.84, .30], [.16, .76], [.84, .76], [.50, .14], [.50, .86]] };
  const FLOW_W = FLOWP.patch + 2 * FLOWP.search;   // 52
  const flow = { vx: 0, vy: 0, ok: false, lastGood: 0 };
  let flowVid = null, flowStream = null, flowCtx = null, flowCvRef = null;
  let flowPrevG = null, flowCurG = null, flowPrevT = 0, flowAlive = false;
  function flowSetup(canvas) {
    try {
      if (flowStream) flowStream.getTracks().forEach(t => t.stop());
      flowStream = canvas.captureStream(30);
      flowVid = document.createElement('video');
      flowVid.muted = true; flowVid.playsInline = true; flowVid.srcObject = flowStream;
      const fc = document.createElement('canvas');
      fc.width = FLOW_W; fc.height = FLOW_W * FLOWP.spots.length;
      flowCtx = fc.getContext('2d', { willReadFrequently: true });
      flowCvRef = canvas; flowPrevG = null; flowPrevT = 0;
      flowVid.play().then(() => {
        if (!flowAlive && flowVid.requestVideoFrameCallback) { flowAlive = true; flowVid.requestVideoFrameCallback(flowSample); }
      }).catch(() => {});
    } catch (_) { flowVid = null; }
  }
  function grabGray() {
    const vw = flowVid.videoWidth, vh = flowVid.videoHeight;
    if (!vw || !vh) return null;
    for (let s = 0; s < FLOWP.spots.length; s++) {
      const px = Math.max(0, Math.min(vw - FLOW_W, FLOWP.spots[s][0] * vw - FLOW_W / 2));
      const py = Math.max(0, Math.min(vh - FLOW_W, FLOWP.spots[s][1] * vh - FLOW_W / 2));
      flowCtx.drawImage(flowVid, px, py, FLOW_W, FLOW_W, 0, s * FLOW_W, FLOW_W, FLOW_W);
    }
    const img = flowCtx.getImageData(0, 0, FLOW_W, FLOW_W * FLOWP.spots.length).data;
    if (!flowCurG || flowCurG.length !== FLOW_W * FLOW_W * FLOWP.spots.length) flowCurG = new Uint8ClampedArray(FLOW_W * FLOW_W * FLOWP.spots.length);
    const g = flowCurG;
    for (let i = 0, j = 0; j < g.length; i += 4, j++) g[j] = (img[i] * 3 + img[i + 1] * 4 + img[i + 2]) >> 3;
    return { g, vw };
  }
  function matchSpot(prevG, curG, s) {
    const P = FLOWP.patch, R = FLOWP.search, W = FLOW_W, base = s * W * W;
    let mean = 0, cnt = 0;
    for (let y = 0; y < P; y += 4) for (let x = 0; x < P; x += 4) { mean += prevG[base + (R + y) * W + R + x]; cnt++; }
    mean /= cnt;
    let dev = 0;
    for (let y = 0; y < P; y += 4) for (let x = 0; x < P; x += 4) dev += Math.abs(prevG[base + (R + y) * W + R + x] - mean);
    if (dev / cnt < 4) return null;                       // flat patch — nothing to match
    let best = Infinity, bx = 0, by = 0, sum = 0, n = 0;
    for (let oy = -R; oy <= R; oy++) for (let ox = -R; ox <= R; ox++) {
      let sad = 0;
      for (let y = 0; y < P; y += 2) {
        let pi = base + (R + y) * W + R, ci = base + (R + y + oy) * W + R + ox;
        for (let x = 0; x < P; x++) sad += Math.abs(prevG[pi + x] - curG[ci + x]);
      }
      sum += sad; n++;
      if (sad < best) { best = sad; bx = ox; by = oy; }
    }
    if (best > (sum / n) * 0.55 || best / (P * P / 2) > 26) return null;   // ambiguous / poor match
    return { x: bx, y: by };
  }
  function flowSample(now) {
    if (!run) { flowAlive = false; return; }
    try {
      const cur = grabGray();
      if (cur) {
        if (flowPrevG) {
          const vecs = [];
          for (let s = 0; s < FLOWP.spots.length; s++) { const m = matchSpot(flowPrevG, cur.g, s); if (m) vecs.push(m); }
          let bestC = null;
          for (const v of vecs) {
            const c = vecs.filter(u => Math.hypot(u.x - v.x, u.y - v.y) <= 2.5);
            if (!bestC || c.length > bestC.length ||
                (c.length === bestC.length && Math.hypot(v.x, v.y) > 0.9 && Math.hypot(bestC[0].x, bestC[0].y) <= 0.9)) bestC = c;
          }
          if (bestC && bestC.length >= 2) {
            let mx = 0, my = 0; for (const u of bestC) { mx += u.x; my += u.y; }
            mx /= bestC.length; my /= bestC.length;
            const k = flowCvRef.clientWidth / cur.vw;                       // video px -> CSS px
            const dtF = Math.max(0.5, (now - flowPrevT) / (1000 / 60));     // elapsed 60fps-frames
            flow.vx = mx * k / dtF; flow.vy = my * k / dtF;
            flow.lastGood = now; flow.ok = true;
            study.flowHits++;
          } else study.flowMisses++;
        }
        const tmp = flowPrevG; flowPrevG = cur.g; flowCurG = tmp;           // swap buffers
        flowPrevT = now;
      }
    } catch (_) {}
    if (flowVid && flowVid.requestVideoFrameCallback) flowVid.requestVideoFrameCallback(flowSample);
    else flowAlive = false;
  }

  /* ---------- motion model: measured flow when fresh; turn-rate-capped
     heading chase as fallback. Also logs study telemetry incl. a shadow of
     the old v2.4 model (aim-heading drift) vs measured truth. ---------- */
  const FIRE = { speed: 3.4, boostMul: 1.85, rate: 5, boostRate: 9, life: 110, boostLife: 130, max: 900, turnCap: 0.05 };
  window.__fire = FIRE;
  const study = { t0: performance.now(), frames: 0, flowHits: 0, flowMisses: 0, freshFrames: 0,
    spdSum: 0, spdN: 0, spdMax: 0, turnRates: [], aimVsTravel: [], winX: 0, winY: 0, winN: 0, oldErr1s: [] };
  let physHeading = -Math.PI / 2, spdEma = FIRE.speed, prevBodyDir = null, stillFrames = 0;
  const angDiff = (a, b) => { let d = ((a - b + Math.PI) % (2 * Math.PI)) - Math.PI; if (d < -Math.PI) d += 2 * Math.PI; return d; };
  function motionStep(aimHeading, boost) {
    study.frames++;
    const fresh = flow.ok && (performance.now() - flow.lastGood) < 350;
    let dx, dy;
    if (fresh) {
      study.freshFrames++;
      dx = flow.vx; dy = flow.vy;
      const spd = Math.hypot(dx, dy);
      if (spd > 0.8) {
        stillFrames = 0;
        const bodyDir = Math.atan2(dy, dx);
        physHeading = bodyDir + Math.PI;
        spdEma += (spd - spdEma) * 0.05;
        study.spdSum += spd; study.spdN++; if (spd > study.spdMax) study.spdMax = spd;
        if (prevBodyDir != null && study.turnRates.length < 20000) study.turnRates.push(Math.abs(angDiff(bodyDir, prevBodyDir)));
        prevBodyDir = bodyDir;
        if (study.aimVsTravel.length < 20000) study.aimVsTravel.push(Math.abs(angDiff(aimHeading, bodyDir + Math.PI)) * 180 / Math.PI);
        const om = FIRE.speed * (boost ? FIRE.boostMul : 1);
        study.winX += dx - (-Math.cos(aimHeading) * om); study.winY += dy - (-Math.sin(aimHeading) * om); study.winN++;
        if (study.winN >= 60) { study.oldErr1s.push(Math.hypot(study.winX, study.winY)); study.winX = 0; study.winY = 0; study.winN = 0; }
      } else { stillFrames++; prevBodyDir = null; }
    } else {
      const d = angDiff(aimHeading, physHeading);
      physHeading += Math.max(-FIRE.turnCap, Math.min(FIRE.turnCap, d));
      const spd = spdEma * (boost ? FIRE.boostMul : 1);
      dx = -Math.cos(physHeading) * spd; dy = -Math.sin(physHeading) * spd;
      stillFrames = 0;
    }
    return { dx, dy, spd: Math.hypot(dx, dy), dir: Math.atan2(dy, dx), fresh, still: fresh && stillFrames > 20 };
  }
  const pct = (arr, p) => { if (!arr.length) return 0; const a = [...arr].sort((x, y) => x - y); return a[Math.min(a.length - 1, Math.floor(p * a.length))]; };
  window.__fireStudy = {
    report() {
      const s = study, secs = (performance.now() - s.t0) / 1000;
      return { secs: +secs.toFixed(1), frames: s.frames, flowHits: s.flowHits, flowMisses: s.flowMisses,
        freshPct: s.frames ? +(100 * s.freshFrames / s.frames).toFixed(1) : 0,
        avgSpd: s.spdN ? +(s.spdSum / s.spdN).toFixed(2) : 0, maxSpd: +s.spdMax.toFixed(2),
        turnRateP95: +pct(s.turnRates, .95).toFixed(4), turnRateMax: s.turnRates.length ? +Math.max(...s.turnRates).toFixed(4) : 0,
        aimVsTravelMeanDeg: s.aimVsTravel.length ? +(s.aimVsTravel.reduce((a, b) => a + b, 0) / s.aimVsTravel.length).toFixed(1) : 0,
        aimVsTravelP95Deg: +pct(s.aimVsTravel, .95).toFixed(1),
        oldModelErrPxPerSec: { mean: s.oldErr1s.length ? +(s.oldErr1s.reduce((a, b) => a + b, 0) / s.oldErr1s.length).toFixed(1) : 0, worst: s.oldErr1s.length ? +Math.max(...s.oldErr1s).toFixed(1) : 0, windows: s.oldErr1s.length } };
    },
    reset() { study.t0 = performance.now(); study.frames = 0; study.flowHits = 0; study.flowMisses = 0; study.freshFrames = 0;
      study.spdSum = 0; study.spdN = 0; study.spdMax = 0; study.turnRates = []; study.aimVsTravel = [];
      study.winX = 0; study.winY = 0; study.winN = 0; study.oldErr1s = []; }
  };

  /* ---------- fire trail: embers drift by MEASURED camera motion, so the
     trail hugs the real body path in turns. Lifecycle: flame -> smoke fade
     (no popping at the end); on death the camera stops, spawning pauses and
     the fire burns out in place. ---------- */
  const fireCv = document.createElement('canvas');
  fireCv.style.cssText = 'position:fixed;inset:0;z-index:2147483644;pointer-events:none';
  document.documentElement.appendChild(fireCv);
  const fctx = fireCv.getContext('2d');
  const fitFire = () => { fireCv.width = innerWidth; fireCv.height = innerHeight; };
  fitFire(); addEventListener('resize', fitFire);
  const mkSpr = (stops) => { const c = document.createElement('canvas'); c.width = c.height = 64; const x = c.getContext('2d');
    const g = x.createRadialGradient(32, 32, 0, 32, 32, 32);
    for (const [o, col] of stops) g.addColorStop(o, col);
    x.fillStyle = g; x.fillRect(0, 0, 64, 64); return c; };
  const sprHot = mkSpr([[0, 'rgba(255,245,180,.95)'], [.4, 'rgba(255,150,40,.8)'], [1, 'rgba(200,40,10,0)']]);
  const sprCool = mkSpr([[0, 'rgba(255,190,80,.85)'], [.5, 'rgba(235,100,25,.6)'], [1, 'rgba(120,30,10,0)']]);
  const sprSmoke = mkSpr([[0, 'rgba(115,115,126,.5)'], [.6, 'rgba(95,95,106,.28)'], [1, 'rgba(75,75,86,0)']]);
  let embers = [], lastSpawnDir = null;
  const killFire = () => { if (embers.length) { embers.length = 0; fctx.clearRect(0, 0, fireCv.width, fireCv.height); } lastSpawnDir = null; };
  function fireFrame(cx, cy, drift, boost) {
    const dir = drift.dir, spd = drift.spd;
    let turnFac = 1;
    if (lastSpawnDir != null) turnFac = Math.min(1.8, 1 + Math.abs(angDiff(dir, lastSpawnDir)) * 22);
    lastSpawnDir = dir;
    if (!drift.still) {
      const n = boost ? FIRE.boostRate : FIRE.rate;
      const cosD = Math.cos(dir), sinD = Math.sin(dir), lat = 10 * turnFac;
      for (let i = 0; i < n && embers.length < FIRE.max; i++) {
        const back = 8 + (i / n) * (spd * 2 + 30) + Math.random() * 6;
        embers.push({ x: cx + cosD * back + (Math.random() - .5) * lat,
                      y: cy + sinD * back + (Math.random() - .5) * lat,
                      a: 0, l: (boost ? FIRE.boostLife : FIRE.life) * (0.75 + Math.random() * 0.5),
                      r: (boost ? 20 : 16) * (0.75 + Math.random() * 0.5) * (1 + (turnFac - 1) * 0.4),
                      jx: (Math.random() - .5) * 0.3, jy: (Math.random() - .5) * 0.3, hot: boost });
      }
    }
    fctx.clearRect(0, 0, fireCv.width, fireCv.height);
    embers = embers.filter(p => (p.a += 1) < p.l);
    for (const p of embers) { p.x += drift.dx + p.jx; p.y += drift.dy + p.jy; }
    fctx.globalCompositeOperation = 'lighter';
    for (const p of embers) {
      const t = p.a / p.l;
      const flameA = t < .6 ? 1 : Math.max(0, 1 - (t - .6) / .25);
      if (flameA > .01) {
        const r = p.r * (1 + t * (p.hot ? 1.7 : 1.2));
        fctx.globalAlpha = flameA;
        fctx.drawImage(p.hot ? sprHot : sprCool, p.x - r, p.y - r, r * 2, r * 2);
      }
    }
    fctx.globalCompositeOperation = 'source-over';
    for (const p of embers) {
      const t = p.a / p.l;
      const smokeA = t < .45 ? 0 : Math.min(1, (t - .45) / .2) * Math.pow(1 - t, 1.3);
      if (smokeA > .01) {
        const r = p.r * (1.15 + t * 1.4);
        fctx.globalAlpha = smokeA;
        fctx.drawImage(sprSmoke, p.x - r, p.y - r, r * 2, r * 2);
      }
    }
    fctx.globalAlpha = 1;
  }

  let run = true, on = true, heading = -Math.PI / 2, aimHeading = -Math.PI / 2, mag = 0, boost = false,
      pA = false, pB = false, pX = false, pMenu = false, pDL = false, pDR = false, pDU = false, pDD = false,
      circle = false, circAng = 0,
      fx = 0, fy = 0, plx = 0, ply = 0, vx = innerWidth / 2, vy = innerHeight / 2, mx = innerWidth / 2, my = innerHeight / 2;
  const lerpA = (a, b, t) => a + angDiff(b, a) * t;
  function emit(types, x, y, buttons) {
    const t = cv || document.body, r = t.getBoundingClientRect();
    for (const ty of types) {
      const P = ty.startsWith('pointer'), C = P ? PointerEvent : MouseEvent;
      const i = { bubbles: true, cancelable: true, composed: true, view: window, clientX: x, clientY: y, screenX: x, screenY: y, offsetX: x - r.left, offsetY: y - r.top, button: 0, buttons };
      if (P) { i.pointerId = 1; i.pointerType = 'mouse'; i.isPrimary = true; }
      try { t.dispatchEvent(new C(ty, i)); } catch (_) {}
    }
  }

  function frame() {
    if (!run) return;
    const pads = navigator.getGamepads ? navigator.getGamepads() : [];
    let pad = null; for (const p of pads) { if (p && p.connected) { pad = p; break; } }
    if (!pad) { hud.textContent = '🚙 rig ready — press a button on the pad'; dot.style.opacity = '0'; cur.style.opacity = '0'; truck.style.opacity = '0'; killFire(); return requestAnimationFrame(frame); }
    const A = !!pad.buttons[0]?.pressed, B = !!pad.buttons[1]?.pressed, X = !!pad.buttons[2]?.pressed, Y = !!pad.buttons[3]?.pressed, RB = !!pad.buttons[5]?.pressed,
          MENU = !!pad.buttons[9]?.pressed, RT = pad.buttons[7]?.value ?? 0;
    const dU = !!pad.buttons[12]?.pressed, dD = !!pad.buttons[13]?.pressed, dL = !!pad.buttons[14]?.pressed, dR = !!pad.buttons[15]?.pressed;
    const lx = pad.axes[0] || 0, ly = pad.axes[1] || 0, rx = pad.axes[2] || 0, ry = pad.axes[3] || 0;
    const lMag = Math.hypot(lx, ly), rMag = Math.hypot(rx, ry);
    if (MENU && !pMenu) { on = !on; if (!on && boost) { emit(['pointerup', 'mouseup'], vx, vy, 0); boost = false; } say(on ? 'Steering ON' : 'PAUSED — your mouse works'); } pMenu = MENU;
    if (!on) { hud.textContent = 'PAUSED — Menu to resume'; dot.style.opacity = '0'; cur.style.opacity = '0'; truck.style.opacity = '0'; killFire(); return requestAnimationFrame(frame); }
    if (X && !pX) allowAds(!adsAllowed); pX = X;
    if (Y && !pY) { truckOn = !truckOn; say(truckOn ? '🚙 MONSTER TRUCK skin on' : '🐍 back to plain worm'); } pY = Y;
    if (!cv || !cv.isConnected) cv = findCanvas();
    if (cv && cv !== flowCvRef) flowSetup(cv);
    const cx = innerWidth / 2, cy = innerHeight / 2, r = (cv || document.body).getBoundingClientRect();

    if (RB) {
      const sx = Math.abs(rx) > Math.abs(lx) ? rx : lx, sy = Math.abs(ry) > Math.abs(ly) ? ry : ly, mg = Math.hypot(sx, sy);
      if (mg > 0.15) { const sp = 3 + 19 * mg * mg; mx += sx * sp; my += sy * sp; }
      mx = Math.max(6, Math.min(innerWidth - 6, mx)); my = Math.max(6, Math.min(innerHeight - 6, my));
      const snap = d => { spotIdx = (spotIdx + d + SPOTS.length) % SPOTS.length; const s = SPOTS[spotIdx]; mx = r.left + r.width * s.fx; my = r.top + r.height * s.fy; say('▸ ' + s.n); };
      if ((dR && !pDR) || (dD && !pDD)) snap(1); if ((dL && !pDL) || (dU && !pDU)) snap(-1);
      emit(['pointermove', 'mousemove'], mx, my, 0);
      if (A && !pA) { emit(['pointerdown', 'mousedown'], mx, my, 1); emit(['pointerup', 'mouseup', 'click'], mx, my, 0); }
      cur.style.opacity = '1'; cur.style.left = mx + 'px'; cur.style.top = my + 'px'; dot.style.opacity = '0'; truck.style.opacity = '0'; killFire();
      hud.textContent = `🖱️ MENU (hold RB) · ${SPOTS[spotIdx].n}\nD-pad=snap · A=click`;
    } else {
      cur.style.opacity = '0';
      if (B && !pB) { circle = !circle; if (circle) circAng = heading; } pB = B;
      if (circle && (lMag > 0.10 || rMag > 0.10 || A || RT > TRIG)) circle = false;
      if (circle) {
        circAng += CIRCLE_SPEED; heading = circAng;
        const R = Math.min(innerWidth, innerHeight) * CIRCLE_R;
        vx = cx + Math.cos(circAng) * R; vy = cy + Math.sin(circAng) * R;
        emit(['pointermove', 'mousemove'], vx, vy, 0);
        hud.textContent = '☕ AUTO-CIRCLE\nstick or boost to take over';
      } else {
        const wl = Math.pow(lMag, BLEND_P), wr = Math.pow(rMag, BLEND_P), wsum = wl + wr;
        let ax = 0, ay = 0;
        if (wsum > 1e-6) {
          ax = (lx * wl + rx * wr) / wsum; ay = (ly * wl + ry * wr) / wsum;
          const pushMag = Math.max(lMag, rMag), n = Math.hypot(ax, ay) || 1;
          ax = ax / n * pushMag; ay = ay / n * pushMag;
        }
        const ddx = (dR ? 1 : 0) - (dL ? 1 : 0), ddy = (dD ? 1 : 0) - (dU ? 1 : 0);
        if (ddx || ddy) { ax = ddx; ay = ddy; }
        domSmooth += ((wsum > 1e-6 ? wr / wsum : 0.5) - domSmooth) * 0.12;
        const spd = Math.hypot(ax - plx, ay - ply); plx = ax; ply = ay;
        const act = Math.min(1, spd * INT_GAIN + ((A || RT > TRIG) ? INT_BOOST : 0));
        intensity += (act - intensity) * (act > intensity ? INT_ATTACK : INT_RELEASE);
        const DEAD = mix(CALM.DEAD, COMBAT.DEAD, intensity), AIM_MIN = mix(CALM.AIM_MIN, COMBAT.AIM_MIN, intensity),
              AIM_MAX = mix(CALM.AIM_MAX, COMBAT.AIM_MAX, intensity), SMOOTH = mix(CALM.SMOOTH, COMBAT.SMOOTH, intensity);
        const alpha = Math.min(FILT_MAX, FILT_MIN + spd * FILT_GAIN * (FILT_MAX - FILT_MIN));
        fx += (ax - fx) * alpha; fy += (ay - fy) * alpha;
        const m = Math.hypot(fx, fy);
        if (m > DEAD) { aimHeading = Math.atan2(fy, fx); mag = Math.min(1, (m - DEAD) / (1 - DEAD)); }
        heading = lerpA(heading, aimHeading, Math.min(1, SMOOTH + 0.30));
        const urg = Math.min(1, spd * URG_K);
        let R = Math.min(innerWidth, innerHeight) * (AIM_MIN + (AIM_MAX - AIM_MIN) * mag);
        R *= (1 + urg * URG_BOOST);
        vx = cx + Math.cos(heading) * R; vy = cy + Math.sin(heading) * R;
        const want = A || RT > TRIG;
        emit(['pointermove', 'mousemove'], vx, vy, want ? 1 : 0);
        if (want !== boost) { boost = want; emit(boost ? ['pointerdown', 'mousedown'] : ['pointerup', 'mouseup'], vx, vy, boost ? 1 : 0); }
        const lvl = Math.min(7, Math.round(intensity * 7));
        const pos = Math.round(domSmooth * 8);
        hud.textContent = `AUTO ${'█'.repeat(lvl)}${'░'.repeat(7 - lvl)} ${(intensity * 100).toFixed(0)}%${boost ? '  🚀' : ''}\n` +
          `🕹️ blend L${'·'.repeat(pos)}●${'·'.repeat(8 - pos)}R\nB=circle · X=revive · Y=truck · RB=menu · Menu=pause`;
      }
      if (truckOn) {
        const drift = motionStep(heading, boost);
        const faceTarget = (drift.fresh && drift.spd > 0.9 && !drift.still) ? drift.dir + Math.PI : heading;
        truckDir = lerpA(truckDir, faceTarget, 0.22);
        const bob = 1 + 0.04 * Math.sin(performance.now() / 85);
        truck.style.opacity = '1'; truck.style.left = cx + 'px'; truck.style.top = cy + 'px';
        truck.style.transform = `rotate(${truckDir}rad) scale(${bob.toFixed(3)})`;
        nitro.setAttribute('opacity', boost ? '1' : '0');
        fireFrame(cx, cy, drift, boost);
      } else { truck.style.opacity = '0'; killFire(); }
      dot.style.opacity = '1'; dot.style.left = vx + 'px'; dot.style.top = vy + 'px';
      dot.style.borderColor = circle ? 'rgba(180,255,140,.95)' : (boost ? 'rgba(255,110,110,.98)' : 'rgba(120,220,255,.95)');
    }
    pA = A; pDL = dL; pDR = dR; pDU = dU; pDD = dD;
    requestAnimationFrame(frame);
  }
  window.__snakeApp = { allowAds, get truck() { return truckOn; }, set truck(v) { truckOn = !!v; },
    destroy() { run = false; css.remove(); adCss.remove(); hud.remove(); dot.remove(); cur.remove(); truck.remove(); fireCv.remove();
      removeEventListener('resize', fitFire);
      try { if (flowStream) flowStream.getTracks().forEach(t => t.stop()); if (flowVid) flowVid.srcObject = null; } catch (_) {}
      delete window.__snakeApp; } };
  requestAnimationFrame(frame);
  say('🚙🔥 MONSTER TRUCK rig v2.5 — flow-tracked fire! Press A. Y toggles truck/worm.');
  console.log('%c[snake rig v2.5 · optical-flow fire · extension] auto-loaded', 'color:#67e8f9;font-weight:bold');
})();
