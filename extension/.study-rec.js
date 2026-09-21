/* v3.1 study recorder — samples window.__tel, which the rig publishes from the
   SAME numbers it rendered. The v3.0 recorder re-derived heading from DOM
   transforms and ended up scoring a signal the render never used.
   Fields per sample (9 floats): t, aim, travel, nose, beta, steer, spd, wUse, fresh */
(function () {
  if (window.__rec2) { window.__rec2.stop(); }
  const W = 9, CAP = 200000;
  const R = { buf: new Float64Array(CAP * W), n: 0, on: true, t0: performance.now() };
  const ang = (a, b) => { let d = a - b; while (d > Math.PI) d -= 2 * Math.PI; while (d < -Math.PI) d += 2 * Math.PI; return d; };
  let lastN = -1;
  function tick() {
    if (!R.on) return;
    const T = window.__tel;
    if (T && T.n !== lastN) {                       // one sample per rendered frame, no dupes
      lastN = T.n;
      if (R.n < CAP) {
        const o = R.n * W;
        R.buf[o] = T.t; R.buf[o + 1] = T.aim; R.buf[o + 2] = T.travel; R.buf[o + 3] = T.nose;
        R.buf[o + 4] = T.beta; R.buf[o + 5] = T.steer; R.buf[o + 6] = T.spd;
        R.buf[o + 7] = T.wUse; R.buf[o + 8] = T.fresh;
        R.n++;
      }
    }
    requestAnimationFrame(tick);
  }
  function corrLag(a, b, maxLag) {
    let best = 0, bestR = -2;
    for (let L = 0; L <= maxLag; L++) {
      let sa = 0, sb = 0, n = 0;
      for (let i = 0; i + L < a.length; i++) { sa += a[i]; sb += b[i + L]; n++; }
      if (n < 30) break;
      const ma = sa / n, mb = sb / n;
      let num = 0, da = 0, db = 0;
      for (let i = 0; i + L < a.length; i++) { const x = a[i] - ma, y = b[i + L] - mb; num += x * y; da += x * x; db += y * y; }
      const r = num / (Math.sqrt(da * db) || 1);
      if (r > bestR) { bestR = r; best = L; }
    }
    return { lag: best, r: +bestR.toFixed(3) };
  }
  R.report = function () {
    const b = R.buf, n = R.n;
    if (n < 240) return { samples: n, note: 'not enough data — drive around' };
    const noseErr = [], aimErr = [], turnTravel = [], turnNose = [], steer = [], aimRel = [], slip = [];
    let moving = 0, freshN = 0;
    for (let i = 1; i < n; i++) {
      const o = i * W, p = (i - 1) * W;
      if (b[o + 8] > 0.5) freshN++;
      if (b[o + 6] < 1.2) continue;
      moving++;
      noseErr.push(Math.abs(ang(b[o + 3], b[o + 2])) * 180 / Math.PI);
      aimErr.push(Math.abs(ang(b[o + 1], b[o + 2])) * 180 / Math.PI);
      turnTravel.push(ang(b[o + 2], b[p + 2]));
      turnNose.push(ang(b[o + 3], b[p + 3]));
      steer.push(b[o + 5]);
      aimRel.push(ang(b[o + 1], b[o + 3]));
      slip.push(Math.abs(b[o + 4]) * 180 / Math.PI);
    }
    if (noseErr.length < 120) return { samples: n, moving, note: 'mostly idle/dead — need driving' };
    const pct = (a, p) => { const s = [...a].sort((x, y) => x - y); return +s[Math.min(s.length - 1, Math.floor(p * s.length))].toFixed(2); };
    const mean = a => +(a.reduce((x, y) => x + y, 0) / a.length).toFixed(2);
    const mx = a => +Math.max(...a).toFixed(2);
    /* wheels should point where the driver is ASKING to go, so score them against
       the requested turn, and separately against the turn that actually happened */
    let sOkAsk = 0, nAsk = 0, sOkReal = 0, nReal = 0;
    for (let i = 0; i < steer.length; i++) {
      if (Math.abs(aimRel[i]) > 0.02) { nAsk++; if (Math.sign(steer[i]) === Math.sign(aimRel[i])) sOkAsk++; }
      if (Math.abs(turnTravel[i]) > 0.01) { nReal++; if (Math.sign(steer[i]) === Math.sign(turnTravel[i])) sOkReal++; }
    }
    const absT = turnTravel.map(Math.abs), absN = turnNose.map(Math.abs);
    return {
      samples: n, movingSamples: moving, seconds: +((b[(n - 1) * W] - b[0]) / 1000).toFixed(1),
      flowFreshPct: +(100 * freshN / (n - 1)).toFixed(1),
      noseVsTravelDeg: { mean: mean(noseErr), p50: pct(noseErr, .5), p95: pct(noseErr, .95), max: mx(noseErr) },
      aimVsTravelDeg: { mean: mean(aimErr), p95: pct(aimErr, .95) },
      wheelSignVsRequestPct: nAsk ? +(100 * sOkAsk / nAsk).toFixed(1) : null,
      wheelSignVsActualPct: nReal ? +(100 * sOkReal / nReal).toFixed(1) : null,
      slipDeg: { mean: mean(slip), p95: pct(slip, .95), max: mx(slip) },
      lag_noseBehindTravel: corrLag(turnTravel, turnNose, 25),
      lag_travelBehindAim: corrLag(aimRel, turnTravel, 25),
      travelTurnRate: { p95: pct(absT, .95), max: mx(absT) },
      noseTurnRate: { p95: pct(absN, .95), max: mx(absN) },
      impossibleTravelFrames: absT.filter(v => v > 0.30).length,
      impossibleNoseFrames: absN.filter(v => v > 0.30).length
    };
  };
  R.reset = function () { R.n = 0; R.t0 = performance.now(); lastN = -1; };
  R.stop = function () { R.on = false; };
  window.__rec2 = R;
  requestAnimationFrame(tick);
  return 'rec2 armed';
})();
