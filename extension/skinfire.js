/* Xbox Snake Rig — SKIN FIRE v4 (2026-08-22)
   Your worm becomes the game's REAL fire snake art, ANIMATED, drawn by the game.

   Two ideas, both from his dad:
   1) "there's a fire snake, copy that guy" — the build ships Firefang's art in
      FireSkinAtlas (512x256, fingerprint db489690: flame tail / body / head
      sprites). We decode it and blit its body+head sprites into the cells of the
      equipped basic skin, so the worm wears the game's own flame art.
   2) "make it animated" — we own the texture the game samples, so after the
      initial paint we keep re-uploading JUST those two 216x216 cells every frame
      (texSubImage2D) with a scrolling/flickering flame modulation. The body is
      therefore animated fire that the GAME draws: perfectly aligned, correct tail
      length and growth, no overlay to keep in sync. This is what finally solved
      the "fire is off" problem for good.

   Why texture-level at all: the worm body is the game's own sprite chain, so
   length/growth/curvature come free. See README §v2.5-§v2.8.

   MUST run at document_start (atlas uploads happen during Unity boot).

   Live handles: window.__skinFire
     .base/.fireArt  did we find each atlas
     .anim           false to freeze the animation
     .speed/.amp     animation rate and contrast
     .fps            upload rate cap (default 30)
     .off()          restore the GL functions (does not un-paint) */
(function () {
  'use strict';
  if (window.__skinFireLoaded) return;
  window.__skinFireLoaded = true;

  var DXT5 = 0x83F3, RGBA8 = 0x8058, RGBA = 0x1908, UBYTE = 0x1401;
  var BASE_DIMS = '2048x1024', FIRE_DIMS = '512x256';
  var FIRE_HASH = 'db489690';          // FireSkinAtlas (confirmed visually 2026-08-22)

  /* BaseSkinAtlas cells — mapped EMPIRICALLY from the running game (the shipped
     sprite-rect table does not match runtime packing; see README §v2.7). */
  var CELL = {
    body: { x: 440, y: 220, w: 216, h: 216 },   // equipped blue skin, body ball
    head: { x: 220, y: 440, w: 216, h: 216 },   // equipped blue skin, head
    sig_red:    { x: 440, y: 440, w: 216, h: 216 },
    sig_orange: { x: 220, y: 0,   w: 216, h: 216 },
    sig_purple: { x: 660, y: 660, w: 216, h: 216 }
  };

  var api = (window.__skinFire = {
    base: false, fireArt: false, anim: true, speed: 1, amp: 1, fps: 30,
    frames: 0, errors: [], sig: null, sprites: null
  });

  var pending = new WeakMap(), replaced = new WeakSet(), bound = {};
  var origStorage = null, origSubImage = null;
  var gl = null, baseTex = null;                 // captured so we can animate later
  var artBody = null, artHead = null;            // fire art resampled into cell size (RGBA)
  var outBody = null, outHead = null;            // reused upload buffers

  /* ---------- helpers ---------- */
  function fnv1a(b) { var h = 0x811c9dc5, n = Math.min(b.length, 4096); for (var i = 0; i < n; i++) { h ^= b[i]; h = (h * 0x01000193) >>> 0; } return ('00000000' + h.toString(16)).slice(-8); }
  function bytesOf(a, i) {
    var d = a[i]; if (!d) return null;
    var off = (typeof a[i + 1] === 'number') ? a[i + 1] : 0, lo = (typeof a[i + 2] === 'number') ? a[i + 2] : 0, u;
    if (d instanceof Uint8Array) u = d;
    else if (ArrayBuffer.isView(d)) u = new Uint8Array(d.buffer, d.byteOffset, d.byteLength);
    else if (d instanceof ArrayBuffer) u = new Uint8Array(d);
    else return null;
    var bpe = d.BYTES_PER_ELEMENT || 1, s = off * bpe, len = lo ? lo * bpe : (u.byteLength - s);
    if (s < 0 || len <= 0 || s + len > u.byteLength) return null;
    return u.subarray(s, s + len);
  }
  function decodeDXT5(data, w, h) {
    var out = new Uint8Array(w * h * 4), bw = Math.max(1, w >> 2), bh = Math.max(1, h >> 2), off = 0;
    var al = new Array(8), c = [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]];
    for (var by = 0; by < bh; by++) for (var bx = 0; bx < bw; bx++) {
      if (off + 16 > data.length) break;
      var a0 = data[off], a1 = data[off + 1];
      var alo = data[off + 2] | (data[off + 3] << 8) | (data[off + 4] << 16);
      var ahi = data[off + 5] | (data[off + 6] << 8) | (data[off + 7] << 16);
      al[0] = a0; al[1] = a1;
      if (a0 > a1) { for (var i = 1; i <= 5; i++) al[i + 1] = Math.round(((6 - i) * a0 + i * a1) / 6); }
      else { for (var j = 1; j <= 3; j++) al[j + 1] = Math.round(((4 - j) * a0 + j * a1) / 4); al[6] = 0; al[7] = 255; }
      var c0 = data[off + 8] | (data[off + 9] << 8), c1 = data[off + 10] | (data[off + 11] << 8);
      var r0 = ((c0 >> 11) & 31) * 8.2258, g0 = ((c0 >> 5) & 63) * 4.0476, b0 = (c0 & 31) * 8.2258;
      var r1 = ((c1 >> 11) & 31) * 8.2258, g1 = ((c1 >> 5) & 63) * 4.0476, b1 = (c1 & 31) * 8.2258;
      c[0][0] = r0; c[0][1] = g0; c[0][2] = b0; c[1][0] = r1; c[1][1] = g1; c[1][2] = b1;
      c[2][0] = (2 * r0 + r1) / 3; c[2][1] = (2 * g0 + g1) / 3; c[2][2] = (2 * b0 + b1) / 3;
      c[3][0] = (r0 + 2 * r1) / 3; c[3][1] = (g0 + 2 * g1) / 3; c[3][2] = (b0 + 2 * b1) / 3;
      var cb = (data[off + 12] | (data[off + 13] << 8) | (data[off + 14] << 16) | (data[off + 15] << 24)) >>> 0;
      for (var py = 0; py < 4; py++) for (var px = 0; px < 4; px++) {
        var x = bx * 4 + px, y = by * 4 + py;
        if (x >= w || y >= h) continue;
        var pi = py * 4 + px;
        var ai = pi < 8 ? ((alo >> (3 * pi)) & 7) : ((ahi >> (3 * (pi - 8))) & 7);
        var col = c[(cb >>> (2 * pi)) & 3];
        var o = (y * w + x) * 4;
        out[o] = col[0]; out[o + 1] = col[1]; out[o + 2] = col[2]; out[o + 3] = al[ai];
      }
      off += 16;
    }
    return out;
  }
  function cellHue(px, w, cell) {
    var n = 0, sr = 0, sg = 0, sb = 0;
    for (var y = cell.y; y < cell.y + cell.h; y += 3) for (var x = cell.x; x < cell.x + cell.w; x += 3) {
      var o = (y * w + x) * 4;
      if (px[o + 3] < 200) continue;
      sr += px[o]; sg += px[o + 1]; sb += px[o + 2]; n++;
    }
    if (!n) return null;
    var r = sr / n, g = sg / n, b = sb / n, mx = Math.max(r, g, b), mn = Math.min(r, g, b);
    if (mx < 30) return { hue: -1 };
    var hue;
    if (mx === mn) hue = -1;
    else if (mx === r) hue = 60 * (((g - b) / (mx - mn)) % 6);
    else if (mx === g) hue = 60 * ((b - r) / (mx - mn) + 2);
    else hue = 60 * ((r - g) / (mx - mn) + 4);
    if (hue < 0) hue += 360;
    return { hue: Math.round(hue) };
  }
  function near(h, t, tol) { if (!h || h.hue < 0) return false; var d = Math.abs(h.hue - t); return Math.min(d, 360 - d) <= tol; }
  function isBase(px, w) {
    var b = cellHue(px, w, CELL.body), r = cellHue(px, w, CELL.sig_red),
        o = cellHue(px, w, CELL.sig_orange), p = cellHue(px, w, CELL.sig_purple);
    var score = (near(b, 189, 18) ? 1 : 0) + (near(r, 356, 18) ? 1 : 0) + (near(o, 36, 18) ? 1 : 0) + (near(p, 286, 20) ? 1 : 0);
    api.sig = { blue: b, red: r, orange: o, purple: p, score: score };
    return score >= 3;
  }

  /* split the fire atlas into its sprites by scanning for empty columns */
  function findSprites(px, w, h) {
    var colHas = new Uint8Array(w);
    for (var x = 0; x < w; x++) {
      for (var y = 0; y < h; y += 2) { if (px[(y * w + x) * 4 + 3] > 24) { colHas[x] = 1; break; } }
    }
    var runs = [], start = -1;
    for (var i = 0; i <= w; i++) {
      if (i < w && colHas[i]) { if (start < 0) start = i; }
      else if (start >= 0) { if (i - start > 24) runs.push([start, i - 1]); start = -1; }
    }
    return runs.map(function (r) {
      var y0 = h, y1 = -1;
      for (var y = 0; y < h; y++) {
        for (var x = r[0]; x <= r[1]; x += 2) {
          if (px[(y * w + x) * 4 + 3] > 24) { if (y < y0) y0 = y; if (y > y1) y1 = y; break; }
        }
      }
      return { x: r[0], y: y0, w: r[1] - r[0] + 1, h: Math.max(1, y1 - y0 + 1) };
    });
  }

  /* stretch a sprite region into a cell-sized RGBA buffer (bilinear) */
  function resample(src, sw, rect, dw, dh) {
    var out = new Uint8Array(dw * dh * 4);
    for (var y = 0; y < dh; y++) {
      var sy = rect.y + (y + 0.5) * rect.h / dh - 0.5;
      var y0 = Math.max(rect.y, Math.min(rect.y + rect.h - 1, Math.floor(sy))), fy = Math.max(0, Math.min(1, sy - y0));
      var y1 = Math.min(rect.y + rect.h - 1, y0 + 1);
      for (var x = 0; x < dw; x++) {
        var sx = rect.x + (x + 0.5) * rect.w / dw - 0.5;
        var x0 = Math.max(rect.x, Math.min(rect.x + rect.w - 1, Math.floor(sx))), fx = Math.max(0, Math.min(1, sx - x0));
        var x1 = Math.min(rect.x + rect.w - 1, x0 + 1);
        var o = (y * dw + x) * 4;
        var iA = (y0 * sw + x0) * 4, iB = (y0 * sw + x1) * 4, iC = (y1 * sw + x0) * 4, iD = (y1 * sw + x1) * 4;
        for (var k = 0; k < 4; k++) {
          var top = src[iA + k] + (src[iB + k] - src[iA + k]) * fx;
          var bot = src[iC + k] + (src[iD + k] - src[iC + k]) * fx;
          out[o + k] = top + (bot - top) * fy;
        }
      }
    }
    return out;
  }

  /* animated flame modulation: vertical licks scroll along the sprite plus a
     global flicker; alpha untouched so the silhouette stays exactly the art's */
  function animate(src, dst, dw, dh, t, seed) {
    var amp = 0.30 * api.amp;
    for (var y = 0; y < dh; y++) {
      var wave = Math.sin(y * 0.075 - t * 2.6 + seed) + 0.6 * Math.sin(y * 0.19 + t * 1.7 + seed * 2);
      for (var x = 0; x < dw; x++) {
        var o = (y * dw + x) * 4;
        var a = src[o + 3];
        dst[o + 3] = a;
        if (!a) { dst[o] = 0; dst[o + 1] = 0; dst[o + 2] = 0; continue; }
        var lick = wave + 0.9 * Math.sin(x * 0.11 + t * 1.9 + seed);
        var m = 1 + amp * Math.max(-1, Math.min(1, lick * 0.7));
        var r = src[o] * m, g = src[o + 1] * m * 0.985, b = src[o + 2] * m * 0.94;   // hotter = shifts toward yellow-white
        dst[o] = r > 255 ? 255 : r;
        dst[o + 1] = g > 255 ? 255 : g;
        dst[o + 2] = b > 255 ? 255 : b;
      }
    }
  }

  /* ---------- animation loop: re-upload only the two cells ---------- */
  var lastUp = 0;
  function tick(now) {
    if (!gl || !baseTex || !artBody) return requestAnimationFrame(tick);
    if (!api.anim) return requestAnimationFrame(tick);
    var minDt = 1000 / Math.max(5, Math.min(60, api.fps));
    if (now - lastUp < minDt) return requestAnimationFrame(tick);
    lastUp = now;
    var t = now / 1000 * api.speed;
    try {
      animate(artBody, outBody, CELL.body.w, CELL.body.h, t, 0);
      animate(artHead, outHead, CELL.head.w, CELL.head.h, t, 1.7);
      var prevTex = gl.getParameter(gl.TEXTURE_BINDING_2D);
      var prevFlip = gl.getParameter(gl.UNPACK_FLIP_Y_WEBGL);
      var prevPre = gl.getParameter(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
      gl.bindTexture(gl.TEXTURE_2D, baseTex);
      origSubImage.call(gl, gl.TEXTURE_2D, 0, CELL.body.x, CELL.body.y, CELL.body.w, CELL.body.h, RGBA, UBYTE, outBody);
      origSubImage.call(gl, gl.TEXTURE_2D, 0, CELL.head.x, CELL.head.y, CELL.head.w, CELL.head.h, RGBA, UBYTE, outHead);
      gl.bindTexture(gl.TEXTURE_2D, prevTex);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, prevFlip);
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, prevPre);
      api.frames++;
    } catch (e) {
      if (api.errors.length < 5) api.errors.push('anim ' + String(e).slice(0, 90));
      api.anim = false;
    }
    requestAnimationFrame(tick);
  }

  /* ---------- GL hooks ---------- */
  var saved = [];
  function patch(proto, name, wrap) { if (!proto || !proto[name]) return; var orig = proto[name]; saved.push([proto, name, orig]); proto[name] = wrap(orig); }

  var proto = typeof WebGL2RenderingContext !== 'undefined' ? WebGL2RenderingContext.prototype : null;
  if (proto) {
    origStorage = proto.texStorage2D; origSubImage = proto.texSubImage2D;
    patch(proto, 'bindTexture', function (orig) {
      return function (target, tex) { bound[target] = tex; return orig.apply(this, arguments); };
    });
    patch(proto, 'texStorage2D', function (orig) {
      return function (target, levels, ifmt, w, h) {
        var tex = bound[target], dims = w + 'x' + h;
        if (tex && ifmt === DXT5 && (dims === BASE_DIMS || dims === FIRE_DIMS)) {
          pending.set(tex, { levels: levels, ifmt: ifmt, w: w, h: h }); return;
        }
        return orig.apply(this, arguments);
      };
    });
    patch(proto, 'compressedTexSubImage2D', function (orig) {
      return function (target, level, xo, yo, w, h, fmt) {
        var tex = bound[target];
        if (tex && replaced.has(tex)) return;                 // swallow mips of a repainted atlas
        var rec = tex && pending.get(tex);
        if (!rec) return orig.apply(this, arguments);
        if (level !== 0) return;
        var data = bytesOf(arguments, 7);
        var dims = rec.w + 'x' + rec.h;

        // (a) the fire snake's atlas: keep its body+head art for our cells
        if (data && fmt === DXT5 && dims === FIRE_DIMS && !api.fireArt && fnv1a(data) === FIRE_HASH) {
          try {
            var fpx = decodeDXT5(data, rec.w, rec.h);
            var sp = findSprites(fpx, rec.w, rec.h);
            api.sprites = sp;
            if (sp.length >= 3) {
              // sprites left-to-right are tail, body, head (shipped sprite table)
              artBody = resample(fpx, rec.w, sp[1], CELL.body.w, CELL.body.h);
              artHead = resample(fpx, rec.w, sp[2], CELL.head.w, CELL.head.h);
              outBody = new Uint8Array(artBody.length);
              outHead = new Uint8Array(artHead.length);
              api.fireArt = true;
              console.log('%c[skinfire] captured the fire snake art', 'color:#ff7a00;font-weight:bold');
            }
          } catch (e) { api.errors.push('fireart ' + String(e).slice(0, 90)); }
          try { origStorage.call(this, target, rec.levels, rec.ifmt, rec.w, rec.h); } catch (_) {}
          pending.delete(tex);
          return orig.apply(this, arguments);
        }

        // (b) the atlas holding our equipped skin: paste the fire art in, then animate it
        if (data && fmt === DXT5 && dims === BASE_DIMS && !api.base) {
          try {
            var px = decodeDXT5(data, rec.w, rec.h);
            if (isBase(px, rec.w)) {
              if (artBody) { blit(px, rec.w, artBody, CELL.body); blit(px, rec.w, artHead, CELL.head); }
              origStorage.call(this, target, 1, RGBA8, rec.w, rec.h);
              origSubImage.call(this, target, 0, 0, 0, rec.w, rec.h, RGBA, UBYTE, px);
              replaced.add(tex); pending.delete(tex);
              api.base = true;
              gl = this; baseTex = tex;                       // for the animation loop
              if (artBody) requestAnimationFrame(tick);
              console.log('%c[skinfire] fire snake skin installed' + (artBody ? ' (animated)' : ' (art missing — static)'), 'color:#ff7a00;font-weight:bold');
              return;
            }
          } catch (e) { api.errors.push('base ' + String(e).slice(0, 90)); }
        }

        try { origStorage.call(this, target, rec.levels, rec.ifmt, rec.w, rec.h); } catch (e) { api.errors.push('replay ' + String(e).slice(0, 60)); }
        pending.delete(tex);
        return orig.apply(this, arguments);
      };
    });
  }

  function blit(dst, dw, src, cell) {
    for (var y = 0; y < cell.h; y++) {
      var d = ((cell.y + y) * dw + cell.x) * 4, s = y * cell.w * 4;
      for (var i = 0; i < cell.w * 4; i++) dst[d + i] = src[s + i];
    }
  }

  api.off = function () { saved.forEach(function (s) { s[0][s[1]] = s[2]; }); saved.length = 0; api.anim = false; };
  console.log('[skinfire v4] armed');
})();
