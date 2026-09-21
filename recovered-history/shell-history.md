# dev/xbox-snake — recovered shell history

Every Bash/PowerShell command that touched the rig, chronological.
After v2.7 this is where the real development happened.


## 001 — 2026-08-16T20:04:19 (PowerShell)

```
New-Item -ItemType Directory -Path "C:\Users\<user>\dev\xbox-snake" -Force | Out-Null; "created"
```

## 002 — 2026-08-17T03:36:31 (PowerShell)

```
cd C:\Users\<user>\dev\xbox-snake; git rev-parse --show-toplevel 2>$null; if ($LASTEXITCODE -ne 0) { "NOT inside a git repo" }; "--- parent dirs ---"; Get-ChildItem C:\Users\<user>\dev -Directory | Select-Object -ExpandProperty Name; "--- any .git above? ---"; $p = "C:\Users\<user>\dev\xbox-snake"; while ($p) { if (Test-Path (Join-Path $p ".git")) { "git repo at: $p" }; $p = Split-Path $p -Parent }
```

## 003 — 2026-08-17T03:39:13 (PowerShell)

```
Get-ChildItem C:\Users\<user>\dev\xbox-snake | Select-Object Name, @{n='KB';e={[math]::Round($_.Length/1KB,1)}}, LastWriteTime | Format-Table -AutoSize
"--- syntax check ---"
$js = Get-Content C:\Users\<user>\dev\xbox-snake\snake-app-mode.js -Raw
"chars: $($js.Length)"
"balanced braces: $((($js.ToCharArray() | Where-Object {$_ -eq '{'}).Count) -eq (($js.ToCharArray() | Where-Object {$_ -eq '}'}).Count))"
"balanced parens: $((($js.ToCharArray() | Where-Object {$_ -eq '('}).Count) -eq (($js.ToCharArray() | Where-Object {$_ -eq ')'}).Count))"
```

## 004 — 2026-08-17T03:40:50 (PowerShell)

```
Remove-Item C:\Users\<user>\dev\xbox-snake\gamepad-mouse.js -Force
"--- final package ---"
Get-ChildItem C:\Users\<user>\dev\xbox-snake | Select-Object Name, @{n='KB';e={[math]::Round($_.Length/1KB,1)}} | Format-Table -AutoSize
```

## 005 — 2026-08-17T03:59:40 (PowerShell)

```
$f="C:\Users\<user>\dev\xbox-snake\snake-app-mode.js"; $js=Get-Content $f -Raw
"braces balanced : $((($js.ToCharArray()|?{$_ -eq '{'}).Count) -eq (($js.ToCharArray()|?{$_ -eq '}'}).Count))"
"parens balanced : $((($js.ToCharArray()|?{$_ -eq '('}).Count) -eq (($js.ToCharArray()|?{$_ -eq ')'}).Count))"
"haptics present : $($js -match '__haptics')"
"boostHum cleanup: $($js -match 'clearInterval\(boostHum\)')"
"--- package ---"; Get-ChildItem C:\Users\<user>\dev\xbox-snake | Select-Object Name,@{n='KB';e={[math]::Round($_.Length/1KB,1)}} | Format-Table -AutoSize
```

## 006 — 2026-08-17T19:25:07 (PowerShell)

```
$f="C:\Users\<user>\dev\xbox-snake\snake-app-mode.js"; $js=Get-Content $f -Raw
"braces balanced : $((($js.ToCharArray()|?{$_ -eq '{'}).Count) -eq (($js.ToCharArray()|?{$_ -eq '}'}).Count))"
"parens balanced : $((($js.ToCharArray()|?{$_ -eq '('}).Count) -eq (($js.ToCharArray()|?{$_ -eq ')'}).Count))"
"stale TRIM_W refs: $(([regex]::Matches($js,'TRIM_W')).Count)"
"BLEND_P defined  : $($js -match 'const BLEND_P')"
"domSmooth defined: $($js -match 'let domSmooth')"
"size KB: $([math]::Round((Get-Item $f).Length/1KB,1))"
```

## 007 — 2026-08-17T20:09:51 (PowerShell)

```
$f="C:\Users\<user>\dev\xbox-snake\snake-app-mode.js"; $js=Get-Content $f -Raw
"braces  : $((($js.ToCharArray()|?{$_ -eq '{'}).Count) -eq (($js.ToCharArray()|?{$_ -eq '}'}).Count))"
"parens  : $((($js.ToCharArray()|?{$_ -eq '('}).Count) -eq (($js.ToCharArray()|?{$_ -eq ')'}).Count))"
"no TRIM_W leftovers: $(([regex]::Matches($js,'TRIM_W')).Count -eq 0)"
"no PELLET_MAX_SEC leftovers: $(([regex]::Matches($js,'PELLET_MAX_SEC')).Count -eq 0)"
"buzz() gone (old fn): $(([regex]::Matches($js,'const buzz')).Count -eq 0)"
"dot2 refs: $(([regex]::Matches($js,'dot2')).Count)"
```

## 008 — 2026-08-18T01:39:30 (PowerShell)

```
$f="C:\Users\<user>\dev\xbox-snake\snake-app-mode.js"; $js=Get-Content $f -Raw
"braces  : $((($js.ToCharArray()|?{$_ -eq '{'}).Count) -eq (($js.ToCharArray()|?{$_ -eq '}'}).Count))"
"parens  : $((($js.ToCharArray()|?{$_ -eq '('}).Count) -eq (($js.ToCharArray()|?{$_ -eq ')'}).Count))"
"v2.3 refs: $(([regex]::Matches($js,'v2\.3')).Count)"
"blend present: $($js -match 'BLEND_P')"
"--- final package ---"
Get-ChildItem C:\Users\<user>\dev\xbox-snake | Select-Object Name,@{n='KB';e={[math]::Round($_.Length/1KB,1)}} | Format-Table -AutoSize
```

## 009 — 2026-08-19T02:42:29 (PowerShell)

```
$e = "C:\Users\<user>\dev\xbox-snake\extension"
$js = Get-Content "$e\content.js" -Raw
"content.js braces : $((($js.ToCharArray()|?{$_ -eq '{'}).Count) -eq (($js.ToCharArray()|?{$_ -eq '}'}).Count))"
"content.js parens : $((($js.ToCharArray()|?{$_ -eq '('}).Count) -eq (($js.ToCharArray()|?{$_ -eq ')'}).Count))"
try { Get-Content "$e\manifest.json" -Raw | ConvertFrom-Json | Out-Null; "manifest.json: valid JSON" } catch { "manifest.json: INVALID - $($_.Exception.Message)" }
"--- package ---"
Get-ChildItem C:\Users\<user>\dev\xbox-snake -Recurse -File | Select-Object @{n='File';e={$_.FullName.Replace('C:\Users\<user>\dev\xbox-snake\','')}},@{n='KB';e={[math]::Round($_.Length/1KB,1)}} | Format-Table -AutoSize
"--- desktop ---"
Test-Path "$([Environment]::GetFolderPath('Desktop'))\Snake Game.lnk"
```

## 010 — 2026-08-22T19:28:18 (Bash)

```
ls "C:/Users/<user>/dev/xbox-snake" 2>/dev/null && echo --- && find "C:/Users/<user>/dev/xbox-snake" -maxdepth 2 -type d | head -30
```

## 011 — 2026-08-22T19:28:30 (Bash)

```
ls -la "C:/Users/<user>/dev/xbox-snake/extension" && wc -l "C:/Users/<user>/dev/xbox-snake/extension"/* "C:/Users/<user>/dev/xbox-snake/snake-app-mode.js" 2>/dev/null
```

## 012 — 2026-08-22T19:32:37 (Bash)

```
node --check "C:/Users/<user>/dev/xbox-snake/extension/content.js" && echo SYNTAX-OK
```

## 013 — 2026-08-22T19:39:28 (Bash)

```
node --check "C:/Users/<user>/dev/xbox-snake/extension/content.js" && echo SYNTAX-OK
```

## 014 — 2026-08-22T19:46:41 (Bash)

```
node --check "C:/Users/<user>/dev/xbox-snake/extension/content.js" && echo SYNTAX-OK
```

## 015 — 2026-08-22T20:00:53 (Bash)

```
node --check "C:/Users/<user>/dev/xbox-snake/extension/content.js" && echo SYNTAX-OK
```

## 016 — 2026-08-22T20:02:41 (Bash)

```
node --check "C:/Users/<user>/dev/xbox-snake/extension/content.js" && echo SYNTAX-OK
```

## 017 — 2026-08-22T20:04:49 (Bash)

```
node --check "C:/Users/<user>/dev/xbox-snake/extension/content.js" && echo SYNTAX-OK
```

## 018 — 2026-08-22T20:07:51 (Bash)

```
node -e "
const fs = require('fs');
const src = fs.readFileSync('C:/Users/<user>/dev/xbox-snake/extension/content.js', 'utf8');
const wrapped = '(() => {\n  const arm = () => {\n    try { window.__snakeApp && window.__snakeApp.destroy && window.__snakeApp.destroy(); } catch (_) {}\n    try { delete window.__snakeRigLoaded; } catch (_) {}\n' + src + '\n  };\n  if (document.readyState === \'loading\') addEventListener(\'DOMContentLoaded\', arm); else arm();\n})();'
new Function(wrapped);  // parse check of the wrapped payload
fs.writeFileSync('C:/Users/<user>/dev/xbox-snake/extension/.initscript-v25.js', wrapped);
console.log('WRAPPED-OK bytes=' + wrapped.length);
"
```

## 019 — 2026-08-22T20:13:23 (Bash)

```
node --check "C:/Users/<user>/dev/xbox-snake/extension/content.js" && echo SYNTAX-OK
```

## 020 — 2026-08-22T20:20:31 (Bash)

```
node --check "C:/Users/<user>/dev/xbox-snake/extension/content.js" && node -e "
const fs = require('fs');
const src = fs.readFileSync('C:/Users/<user>/dev/xbox-snake/extension/content.js', 'utf8');
const wrapped = '(() => {\n  const arm = () => {\n    try { window.__snakeApp && window.__snakeApp.destroy && window.__snakeApp.destroy(); } catch (_) {}\n    try { delete window.__snakeRigLoaded; } catch (_) {}\n' + src + '\n  };\n  if (document.readyState === \'loading\') addEventListener(\'DOMContentLoaded\', arm); else arm();\n})();'
new Function(wrapped);
fs.writeFileSync('C:/Users/<user>/dev/xbox-snake/extension/.initscript-v25c.js', wrapped);
console.log('WRAPPED-OK bytes=' + wrapped.length);
"
```

## 021 — 2026-08-22T20:29:58 (Bash)

```
node --check "C:/Users/<user>/dev/xbox-snake/extension/content.js" && echo SYNTAX-OK
```

## 022 — 2026-08-22T20:36:53 (Bash)

```
node --check "C:/Users/<user>/dev/xbox-snake/extension/content.js" && echo SYNTAX-OK
```

## 023 — 2026-08-22T20:42:33 (Bash)

```
node --check "C:/Users/<user>/dev/xbox-snake/extension/content.js" && echo SYNTAX-OK
```

## 024 — 2026-08-22T20:45:31 (Bash)

```
wc -l "C:/Users/<user>/dev/xbox-snake/README.md" && tail -20 "C:/Users/<user>/dev/xbox-snake/README.md"
```

## 025 — 2026-08-22T20:46:01 (Bash)

```
cat >> "C:/Users/<user>/dev/xbox-snake/README.md" << 'EOF'

---

## v2.5 — Monster Truck Skin + Optical-Flow Fire Trail (2026-08-22)

**What it is** (extension/content.js only; snake-app-mode.js not yet synced): the worm's
head renders as a top-down monster truck (black body, orange trim, flame decal, skull,
bull-bar spikes, headlight beam showing true travel direction; Y toggles), and the worm
body is hidden under a fire trail that traces the exact driven path. Fire "lights up"
on boost (nitro flames + bigger/brighter embers), fades to smoke at the tail end, and
burns out in place on death.

**Core mechanism — measured camera motion, not modeled:** the camera is locked to the
head, so background displacement per frame IS the ember drift that keeps the trail
world-pinned. It's measured by `canvas.captureStream(60)` → hidden video →
requestVideoFrameCallback → block-matching six 32px patches (±17 coarse-stride-2 +
refine, edge-clamped matches rejected). Fallback when flow drops: turn-rate-capped
heading chase at the measured speed EMA.

**Coverage study (2026-08-22, live gameplay, crazygames build):**
- Old v2.4 model (aim-heading × fixed speed) drifted from measured truth by
  **mean 279 px/s, worst 628 px/s** (50 one-second windows) — why the tail peeked out
  in turns and the fire "didn't turn as fast" as the worm.
- Flow lock after tuning: **97.5% of frames** (was 14% before the fixes below).
- Measured worm turn rate p95 ≈ **0.11 rad/frame** → fallback `FIRE.turnCap = 0.12`.
- Screen speed varies hugely with zoom (avg 2.6–9.7, max 17 px/frame across sessions) —
  any fixed-speed trail model is unfixable in principle; measure, don't model.

**Hard-won gotchas (don't re-derive):**
1. Screen-fixed UI (leaderboard, score, server bar) block-matches at zero → a static
   patch majority votes "camera still" while driving. Keep patches mid-field and always
   prefer an agreeing MOVING cluster (the worm never stops mid-game).
2. Zoomed-in views blur the hex background → flat-patch gate must be lenient
   (dev/cnt ≥ 2.5, not 4) or most patches get rejected when the worm is small.
3. Boost displacement exceeds a ±10px search at 30Hz sampling; sample at 60Hz with ±17
   and reject edge-of-window matches so clamped vectors never pollute the speed EMA.
4. Spawn embers only at the truck's tail; the drifting embers lay down the true curve.
   A backward spawn ray extrapolates a straight line and cuts corners.
5. `findCanvas()` must exclude the rig's own fire canvas (`#__fireCv`) or the flow
   tracker can captureStream its own output and steering events mis-target.
6. DOM differs per build: main = `#main > .main-content > #webglContainer`; crazygames
   = `body > #unity-container`. Hide-everything CSS must whitelist both.

**Crazygames build bonuses:** menu has a **server dropdown + "Any Room" field** — type a
shared custom room name for a near-empty arena with a friend. In-game footer shows
Server/Room. Wider camera than the main build.

**Live tuning:** `window.__fire` (rates, lives, turnCap), `window.__fireStudy.report()`
(flow lock %, speeds, turn rates, old-model shadow error), `__snakeApp.truck = false`.

*v2.5 — 2026-08-22. Adversarially reviewed (16-agent workflow: 4 confirmed findings
fixed pre-ship, 2 refuted). Files: `extension/content.js`, `extension/manifest.json`.*
EOF
echo APPENDED && tail -5 "C:/Users/<user>/dev/xbox-snake/README.md"
```

## 026 — 2026-08-22T21:40:51 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && node --check "C:/Users/<user>/AppData/Local/Temp/claude/C--Users-<user>/88fb0b96-1d38-4d66-ab8c-ad3209bd87d6/scratchpad/fire-v26-content.js" && echo NODE-OK && diff -u content.js "C:/Users/<user>/AppData/Local/Temp/claude/C--Users-<user>/88fb0b96-1d38-4d66-ab8c-ad3209bd87d6/scratchpad/fire-v26-content.js" | head -220
```

## 027 — 2026-08-22T21:41:18 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && cp content.js .content-v25.bak.js && cp "C:/Users/<user>/AppData/Local/Temp/claude/C--Users-<user>/88fb0b96-1d38-4d66-ab8c-ad3209bd87d6/scratchpad/fire-v26-content.js" content.js && node --check content.js && echo DEPLOYED-TO-DISK && grep -c "2.6" content.js
```

## 028 — 2026-08-22T21:48:41 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension"
PROBE='/* boot texhook probe */
(function () {
  if (window.__texhookOff) return;
  var LOG_MAX = 6000; var log = (window.__texlog = []);
  var texIds = new WeakMap(); var nextTexId = 1; var boundTex = {}; var t0 = performance.now();
  var FMT = {}; [["COMPRESSED_RGBA_S3TC_DXT5_EXT",0x83F3],["COMPRESSED_RGBA_S3TC_DXT1_EXT",0x83F1],["RGBA",0x1908],["RGBA8",0x8058]].forEach(function(p){FMT[p[1]]=p[0];});
  function fmtName(f){return FMT[f]||("0x"+(f>>>0).toString(16));}
  function fnv1a(bytes,cap){var h=0x811c9dc5,n=Math.min(bytes.length,cap||4096);for(var i=0;i<n;i++){h^=bytes[i];h=(h*0x01000193)>>>0;}return ("00000000"+h.toString(16)).slice(-8);}
  // v2: read the REAL texel bytes for the WebGL2 (srcData, srcOffset, srcLengthOverride) convention
  function realBytes(a, dataIdx){var d=a[dataIdx];if(!d)return null;var off=(typeof a[dataIdx+1]==="number")?a[dataIdx+1]:0;var lenOv=(typeof a[dataIdx+2]==="number")?a[dataIdx+2]:0;var u;if(d instanceof Uint8Array)u=d;else if(ArrayBuffer.isView(d))u=new Uint8Array(d.buffer,d.byteOffset,d.byteLength);else if(d instanceof ArrayBuffer)u=new Uint8Array(d);else return null;var bpe=(d.BYTES_PER_ELEMENT||1);var start=off*bpe;var len=lenOv?lenOv*bpe:(u.byteLength-start);if(start<0||len<=0||start+len>u.byteLength){return {b:u.subarray(0,Math.min(4096,u.byteLength)),whole:true};}return {b:u.subarray(start,start+len),whole:false};}
  function srcKind(x){if(x==null)return "null";var c=x.constructor&&x.constructor.name;return c||typeof x;}
  function push(e){e.t=Math.round(performance.now()-t0);log.push(e);if(log.length>LOG_MAX)log.splice(0,log.length-LOG_MAX);}
  function texIdOf(tex){if(!tex)return 0;if(!texIds.has(tex))texIds.set(tex,nextTexId++);return texIds.get(tex);}
  var saved=[];
  function patch(proto,name,wrap){if(!proto||!proto[name])return;var orig=proto[name];saved.push([proto,name,orig]);proto[name]=wrap(orig);}
  function install(proto,tag){
    patch(proto,"bindTexture",function(orig){return function(target,tex){boundTex[target]=texIdOf(tex);return orig.apply(this,arguments);};});
    patch(proto,"compressedTexImage2D",function(orig){return function(target,level,ifmt,w,h){var r=realBytes(arguments,6);push({fn:"compressedTexImage2D",tex:boundTex[target]||0,fmt:fmtName(ifmt),w:w,h:h,len:r?r.b.byteLength:0,hash:r?fnv1a(r.b):"",whole:r?r.whole:null});return orig.apply(this,arguments);};});
    patch(proto,"compressedTexSubImage2D",function(orig){return function(target,level,xo,yo,w,h,fmt){var r=realBytes(arguments,7);push({fn:"compressedTexSubImage2D",tex:boundTex[target]||0,fmt:fmtName(fmt),w:w,h:h,xo:xo,yo:yo,len:r?r.b.byteLength:0,hash:r?fnv1a(r.b):"",whole:r?r.whole:null});return orig.apply(this,arguments);};});
    patch(proto,"texSubImage2D",function(orig){return function(target,level,xo,yo,w,h,fmt){var a=arguments;var e={fn:"texSubImage2D",tex:boundTex[target]||0,xo:xo,yo:yo};if(a.length>=8&&typeof a[4]==="number"){e.w=a[4];e.h=a[5];e.fmt=fmtName(a[6]);var r=realBytes(a,7);e.len=r?r.b.byteLength:0;e.hash=r?fnv1a(r.b):"";e.whole=r?r.whole:null;}else{var s=a[6];e.w=s&&s.width||0;e.h=s&&s.height||0;e.fmt=fmtName(a[4]);e.len=0;e.hash="";}if(!(e.w<=2&&e.h<=2))push(e);return orig.apply(this,arguments);};});
  }
  install(typeof WebGL2RenderingContext!=="undefined"?WebGL2RenderingContext.prototype:null,"gl2");
  install(typeof WebGLRenderingContext!=="undefined"?WebGLRenderingContext.prototype:null,"gl1");
  var SKIN_DIMS={"512x256":1,"256x512":1,"512x512":1,"2048x1024":1,"1024x1024":1};
  window.__texReport=function(){var g={};log.forEach(function(e){var k=[e.fn,e.fmt,e.w+"x"+e.h,e.len,e.hash].join("|");(g[k]=g[k]||{fn:e.fn,fmt:e.fmt,dims:e.w+"x"+e.h,len:e.len,hash:e.hash,whole:e.whole,n:0,tex:e.tex}).n++;});var rows=Object.values(g).sort(function(a,b){return b.n-a.n;});var cand=rows.filter(function(r){return SKIN_DIMS[r.dims]&&/DXT5|DXT1|RGBA/.test(r.fmt)&&r.len>0&&!r.whole;});return {rows:rows,candidates:cand};};
  window.__texhookOff=function(){saved.forEach(function(s){s[0][s[1]]=s[2];});saved.length=0;delete window.__texhookOff;};
  console.log("[texhook v2] armed at document_start");
})();
'
{
  echo "$PROBE"
  echo "(() => {"
  echo "  const arm = () => {"
  echo "    try { window.__snakeApp && window.__snakeApp.destroy && window.__snakeApp.destroy(); } catch (_) {}"
  echo "    try { delete window.__snakeRigLoaded; } catch (_) {}"
  cat content.js
  echo "  };"
  echo "  if (document.readyState === 'loading') addEventListener('DOMContentLoaded', arm); else arm();"
  echo "})();"
} > .deploy-v26.js
node --check .deploy-v26.js && echo BUILD-OK && wc -l .deploy-v26.js
```

## 029 — 2026-08-22T21:48:41 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension"
PROBE='/* boot texhook probe */
(function () {
  if (window.__texhookOff) return;
  var LOG_MAX = 6000; var log = (window.__texlog = []);
  var texIds = new WeakMap(); var nextTexId = 1; var boundTex = {}; var t0 = performance.now();
  var FMT = {}; [["COMPRESSED_RGBA_S3TC_DXT5_EXT",0x83F3],["COMPRESSED_RGBA_S3TC_DXT1_EXT",0x83F1],["RGBA",0x1908],["RGBA8",0x8058]].forEach(function(p){FMT[p[1]]=p[0];});
  function fmtName(f){return FMT[f]||("0x"+(f>>>0).toString(16));}
  function fnv1a(bytes,cap){var h=0x811c9dc5,n=Math.min(bytes.length,cap||4096);for(var i=0;i<n;i++){h^=bytes[i];h=(h*0x01000193)>>>0;}return ("00000000"+h.toString(16)).slice(-8);}
  // v2: read the REAL texel bytes for the WebGL2 (srcData, srcOffset, srcLengthOverride) convention
  function realBytes(a, dataIdx){var d=a[dataIdx];if(!d)return null;var off=(typeof a[dataIdx+1]==="number")?a[dataIdx+1]:0;var lenOv=(typeof a[dataIdx+2]==="number")?a[dataIdx+2]:0;var u;if(d instanceof Uint8Array)u=d;else if(ArrayBuffer.isView(d))u=new Uint8Array(d.buffer,d.byteOffset,d.byteLength);else if(d instanceof ArrayBuffer)u=new Uint8Array(d);else return null;var bpe=(d.BYTES_PER_ELEMENT||1);var start=off*bpe;var len=lenOv?lenOv*bpe:(u.byteLength-start);if(start<0||len<=0||start+len>u.byteLength){return {b:u.subarray(0,Math.min(4096,u.byteLength)),whole:true};}return {b:u.subarray(start,start+len),whole:false};}
  function srcKind(x){if(x==null)return "null";var c=x.constructor&&x.constructor.name;return c||typeof x;}
  function push(e){e.t=Math.round(performance.now()-t0);log.push(e);if(log.length>LOG_MAX)log.splice(0,log.length-LOG_MAX);}
  function texIdOf(tex){if(!tex)return 0;if(!texIds.has(tex))texIds.set(tex,nextTexId++);return texIds.get(tex);}
  var saved=[];
  function patch(proto,name,wrap){if(!proto||!proto[name])return;var orig=proto[name];saved.push([proto,name,orig]);proto[name]=wrap(orig);}
  function install(proto,tag){
    patch(proto,"bindTexture",function(orig){return function(target,tex){boundTex[target]=texIdOf(tex);return orig.apply(this,arguments);};});
    patch(proto,"compressedTexImage2D",function(orig){return function(target,level,ifmt,w,h){var r=realBytes(arguments,6);push({fn:"compressedTexImage2D",tex:boundTex[target]||0,fmt:fmtName(ifmt),w:w,h:h,len:r?r.b.byteLength:0,hash:r?fnv1a(r.b):"",whole:r?r.whole:null});return orig.apply(this,arguments);};});
    patch(proto,"compressedTexSubImage2D",function(orig){return function(target,level,xo,yo,w,h,fmt){var r=realBytes(arguments,7);push({fn:"compressedTexSubImage2D",tex:boundTex[target]||0,fmt:fmtName(fmt),w:w,h:h,xo:xo,yo:yo,len:r?r.b.byteLength:0,hash:r?fnv1a(r.b):"",whole:r?r.whole:null});return orig.apply(this,arguments);};});
    patch(proto,"texSubImage2D",function(orig){return function(target,level,xo,yo,w,h,fmt){var a=arguments;var e={fn:"texSubImage2D",tex:boundTex[target]||0,xo:xo,yo:yo};if(a.length>=8&&typeof a[4]==="number"){e.w=a[4];e.h=a[5];e.fmt=fmtName(a[6]);var r=realBytes(a,7);e.len=r?r.b.byteLength:0;e.hash=r?fnv1a(r.b):"";e.whole=r?r.whole:null;}else{var s=a[6];e.w=s&&s.width||0;e.h=s&&s.height||0;e.fmt=fmtName(a[4]);e.len=0;e.hash="";}if(!(e.w<=2&&e.h<=2))push(e);return orig.apply(this,arguments);};});
  }
  install(typeof WebGL2RenderingContext!=="undefined"?WebGL2RenderingContext.prototype:null,"gl2");
  install(typeof WebGLRenderingContext!=="undefined"?WebGLRenderingContext.prototype:null,"gl1");
  var SKIN_DIMS={"512x256":1,"256x512":1,"512x512":1,"2048x1024":1,"1024x1024":1};
  window.__texReport=function(){var g={};log.forEach(function(e){var k=[e.fn,e.fmt,e.w+"x"+e.h,e.len,e.hash].join("|");(g[k]=g[k]||{fn:e.fn,fmt:e.fmt,dims:e.w+"x"+e.h,len:e.len,hash:e.hash,whole:e.whole,n:0,tex:e.tex}).n++;});var rows=Object.values(g).sort(function(a,b){return b.n-a.n;});var cand=rows.filter(function(r){return SKIN_DIMS[r.dims]&&/DXT5|DXT1|RGBA/.test(r.fmt)&&r.len>0&&!r.whole;});return {rows:rows,candidates:cand};};
  window.__texhookOff=function(){saved.forEach(function(s){s[0][s[1]]=s[2];});saved.length=0;delete window.__texhookOff;};
  console.log("[texhook v2] armed at document_start");
})();
'
{
  echo "$PROBE"
  echo "(() => {"
  echo "  const arm = () => {"
  echo "    try { window.__snakeApp && window.__snakeApp.destroy && window.__snakeApp.destroy(); } catch (_) {}"
  echo "    try { delete window.__snakeRigLoaded; } catch (_) {}"
  cat content.js
  echo "  };"
  echo "  if (document.readyState === 'loading') addEventListener('DOMContentLoaded', arm); else arm();"
  echo "})();"
} > .deploy-v26.js
node --check .deploy-v26.js && echo BUILD-OK && wc -l .deploy-v26.js
```

## 030 — 2026-08-22T21:49:35 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && cat > .serve.js << 'EOF'
const http = require('http'), fs = require('fs'), path = require('path');
const FILE = path.join(__dirname, '.deploy-v26.js');
http.createServer((req, res) => {
  const body = fs.readFileSync(FILE);
  res.writeHead(200, {
    'Content-Type': 'application/javascript',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-store'
  });
  res.end(body);
}).listen(8731, '127.0.0.1', () => console.log('serving .deploy-v26.js on http://127.0.0.1:8731/rig.js'));
EOF
node .serve.js > .serve.log 2>&1 &
sleep 2 && curl -s -o /dev/null -w "HTTP %{http_code} bytes=%{size_download}\n" http://127.0.0.1:8731/rig.js
```

## 031 — 2026-08-22T21:49:35 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && cat > .serve.js << 'EOF'
const http = require('http'), fs = require('fs'), path = require('path');
const FILE = path.join(__dirname, '.deploy-v26.js');
http.createServer((req, res) => {
  const body = fs.readFileSync(FILE);
  res.writeHead(200, {
    'Content-Type': 'application/javascript',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-store'
  });
  res.end(body);
}).listen(8731, '127.0.0.1', () => console.log('serving .deploy-v26.js on http://127.0.0.1:8731/rig.js'));
EOF
node .serve.js > .serve.log 2>&1 &
sleep 2 && curl -s -o /dev/null -w "HTTP %{http_code} bytes=%{size_download}\n" http://127.0.0.1:8731/rig.js
```

## 032 — 2026-08-22T21:50:08 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && cat .serve.log && echo "--- netstat ---" && netstat -ano 2>/dev/null | grep 8731 | head -5
```

## 033 — 2026-08-22T21:50:08 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && cat .serve.log && echo "--- netstat ---" && netstat -ano 2>/dev/null | grep 8731 | head -5
```

## 034 — 2026-08-22T21:52:47 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && kill %1 2>/dev/null; pkill -f ".serve.js" 2>/dev/null; rm -f .serve.js .serve.log; echo SERVER-STOPPED
```

## 035 — 2026-08-22T21:52:47 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && kill %1 2>/dev/null; pkill -f ".serve.js" 2>/dev/null; rm -f .serve.js .serve.log; echo SERVER-STOPPED
```

## 036 — 2026-08-22T22:22:32 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && sed -i 's|/\* Xbox Snake Rig v2.6 —|/* Xbox Snake Rig v2.7 —|' content.js && sed -i "s|say('🚙🔥 MONSTER TRUCK rig v2.6 — dt-correct latency-compensated fire! Press A. Y toggles truck/worm.');|say('🚙🔥 v2.7 — FIRE SKIN on your worm + monster truck head! Press A. Y toggles truck.');|" content.js && sed -i 's|\[snake rig v2.6 · optical-flow fire · extension\]|[snake rig v2.7 · fire skin + truck · extension]|' content.js && node --check content.js && node --check skinfire.js && echo BOTH-OK && grep -n "v2.7\|rate: 3, boostRate: 7" content.js | head -5
```

## 037 — 2026-08-22T22:27:34 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && node --check skinfire.js && echo OK && grep -n "origStorage\|origSubImage" skinfire.js
```

## 038 — 2026-08-22T22:38:46 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && node --check skinfire.js && echo SYNTAX-OK && node -e "
// sanity-check the rect math against the game's sprite table (bottom-left -> top-left)
const rects=require('C:/Users/<user>/AppData/Local/Temp/claude/C--Users-<user>/88fb0b96-1d38-4d66-ab8c-ad3209bd87d6/scratchpad/skinswap/atlas-rects.json').BaseSkinAtlas;
const H=1024;
for (const n of ['body_blue','head_blue','body_aqua','head_aqua','body_red','body_green','body_yellow']) {
  const r=rects[n];
  console.log(n.padEnd(12), 'unity x,y=', r.x, r.y, ' -> topLeft y=', H-(Math.floor(r.y)+216), ' x=', Math.floor(r.x), ' fits:', (Math.floor(r.x)+216<=2048) && (H-(Math.floor(r.y)+216))>=0);
}
"
```

## 039 — 2026-08-22T22:45:28 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && node --check skinfire.js && echo SYNTAX-OK && grep -n "MARK_RGB\|topLeftY" skinfire.js | head
```

## 040 — 2026-08-22T22:52:48 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake" && cat >> README.md << 'EOF'

---

## v2.7 — REAL SKIN SWAP: your worm IS fire (2026-08-22)

**The breakthrough.** Instead of drawing fire *over* the worm, we repaint the
worm's own **skin texture**. The body is then drawn by the game, so tail length,
growth, curvature and segment spacing follow the real rules for free — the
alignment problem that dogged v2.4–v2.6 is gone by construction.

**Files:** `extension/skinfire.js` (NEW, `run_at: document_start` — atlas uploads
happen during Unity boot) + `extension/content.js` (rig v2.7) + `manifest.json`
(two content scripts now).

**How it works:** skins ship as DXT5Crunched sprite atlases; Unity uploads raw
DXT5 via `texStorage2D` + `compressedTexSubImage2D`. skinfire.js defers the
immutable allocation, decodes DXT5 in JS, remaps RGB through a molten-fire ramp
(keeping each texel's original alpha so sprite shapes stay exact), and allocates
`RGBA8` instead. One atlas, two sprite cells — everything else passes through, so
other players, the world and the UI are untouched.

**Hard-won gotchas (do NOT re-derive):**
1. **Replay must use the UNPATCHED `texStorage2D`.** Calling the patched one from
   inside the upload hook defers a second time → the texture is never allocated →
   every non-target atlas renders **black** (whole scene dies).
2. **The shipped sprite-rect table does NOT match runtime packing**, and applying
   the usual Unity bottom-left y-flip lands on the wrong cells. The real layout was
   mapped empirically: decode the atlas at runtime, scan the 220px grid, match
   colors. Verified cells (TOP-LEFT origin, 216px sprites): equipped blue skin =
   body (440,220) + head (220,440); signature cells red (440,440), orange (220,0),
   purple (660,660).
3. **The 10 basic skins live in BaseSkinAtlas (2048x1024)** — same dimensions as
   three UI atlases, so identify by CONTENT (4/4 hue signature), never by size.
   Fancy skins are separate per-skin sheets (512x256 etc.).
4. **The menu preview snake cycles demo skins** — it is NOT necessarily your
   equipped skin. Identify from a live round (own worm is always screen center).
5. Fire skin only repaints what the player has equipped; changing skins in-game
   means re-mapping the target cells.
6. Debug aid that cracked it: decode candidate atlases into canvases and display
   them full-screen with a 220px grid overlay, then screenshot and read the layout.

**Rig v2.7 change:** the long overlay trail is retired (the body is fire now).
What remains is a ~0.4s exhaust puff at the truck's tail (`__fire.life/rate`),
so nothing long enough to drift. Truck head, headlights and nitro stay; Y toggles
the truck, and the fire skin stays either way.

*v2.7 — 2026-08-22. Files: `extension/skinfire.js`, `extension/content.js`, `extension/manifest.json`.*
EOF
echo APPENDED && ls -la extension/ && node --check extension/skinfire.js && node --check extension/content.js && echo ALL-VALID
```

## 041 — 2026-08-22T22:53:00 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && rm -f .deploy-v26.js .initscript-v25.js .initscript-v25c.js && ls -la && echo "--- kept the v2.5 backup only ---"
```

## 042 — 2026-08-22T23:22:46 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && grep -n "cx=\"30\" cy=\"65\"\|</svg>\|__nitroFx');\|truckOn = true" content.js | head
```

## 043 — 2026-08-22T23:24:03 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && node --check content.js && node --check skinfire.js && echo BOTH-VALID && node -e "
// verify the truck SVG is well-formed XML and the new ids/groups balance
const fs=require('fs');
const src=fs.readFileSync('content.js','utf8');
const m=src.match(/truck\.innerHTML = \`([\s\S]*?)\`;/);
if(!m){console.log('SVG NOT FOUND');process.exit(1);}
const svg=m[1];
const opens=(svg.match(/<g[ >]/g)||[]).length, closes=(svg.match(/<\/g>/g)||[]).length;
console.log('<g> opens:', opens, ' </g> closes:', closes, opens===closes?'BALANCED':'*** UNBALANCED ***');
for (const id of ['__wFL','__wFR','__tkChassis','__nitroFx']) console.log(id, svg.includes('id=\"'+id+'\"') ? 'present' : '*** MISSING ***');
" && node -e "
// sanity: spring settles without oscillating out of control
let dir=0, om=0; const T={spring:0.055,damp:0.30,omegaMax:0.26};
const ad=(a,b)=>{let d=((a-b+Math.PI)%(2*Math.PI))-Math.PI; if(d<-Math.PI)d+=2*Math.PI; return d;};
const target=Math.PI/2; let maxOm=0, settle=-1;
for(let f=0;f<180;f++){const e=ad(target,dir); om+=(e*T.spring-om*T.damp); om=Math.max(-T.omegaMax,Math.min(T.omegaMax,om)); dir+=om; maxOm=Math.max(maxOm,Math.abs(om)); if(settle<0&&Math.abs(ad(target,dir))<0.02)settle=f;}
console.log('90deg turn: settles in', settle, 'frames (~'+(settle/60).toFixed(2)+'s), peak omega', maxOm.toFixed(3), 'rad/frame, final err', ad(target,dir).toFixed(4));
"
```

## 044 — 2026-08-22T23:33:29 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
import re
p = 'skinfire.js'
s = open(p, encoding='utf-8').read()

# multiple fire art sources, switchable live
s = s.replace(
"""  var FIRE_HASH = 'db489690';          // FireSkinAtlas (confirmed visually 2026-08-22)""",
"""  /* Fire art sources in the build (512x256 atlases, fingerprints confirmed by
     dumping and eyeballing them 2026-08-22). 'blaze' is the game's big bold flame
     (its boost-flame asset) — the best "just fire, not a snake" look, so it is the
     default; 'snake' is Firefang's flame-snake sprites; 'wisp' is the soft
     translucent flame. Switch live with __skinFire.use('blaze'|'snake'|'wisp'). */
  var ART = {
    blaze: { hash: '17e8769c', body: null, head: null },
    snake: { hash: 'db489690', body: null, head: null },
    wisp:  { hash: '7c4c8ef3', body: null, head: null }
  };
  var ART_PREF = ['blaze', 'snake', 'wisp'];""")

s = s.replace(
"""    base: false, fireArt: false, anim: true, speed: 1, amp: 1, fps: 30,
    frames: 0, errors: [], sig: null, sprites: null
  });""",
"""    base: false, art: null, captured: [], anim: true, speed: 1, amp: 1, fps: 30,
    frames: 0, errors: [], sig: null
  });""")

# capture block: any of the three art atlases
old_fire = s[s.index("        // (a) the fire snake's atlas"):s.index("        // (b) the atlas holding our equipped skin")]
new_fire = """        // (a) a fire-art atlas: keep its sprites resampled into our cell size
        if (data && fmt === DXT5 && dims === FIRE_DIMS) {
          var hh = fnv1a(data), name = null;
          for (var an in ART) if (ART[an].hash === hh) name = an;
          if (name && !ART[name].body) {
            try {
              var fpx = decodeDXT5(data, rec.w, rec.h);
              var sp = findSprites(fpx, rec.w, rec.h);
              if (sp.length) {
                var bodyRect = sp.length >= 3 ? sp[1] : sp[0];
                var headRect = sp.length >= 3 ? sp[2] : sp[0];
                ART[name].body = resample(fpx, rec.w, bodyRect, CELL.body.w, CELL.body.h);
                ART[name].head = resample(fpx, rec.w, headRect, CELL.head.w, CELL.head.h);
                api.captured.push(name);
                if (!artBody) api.use(name);            // first one in becomes active
                console.log('%c[skinfire] captured fire art: ' + name, 'color:#ff7a00;font-weight:bold');
              }
            } catch (e) { api.errors.push('art ' + String(e).slice(0, 90)); }
          }
          try { origStorage.call(this, target, rec.levels, rec.ifmt, rec.w, rec.h); } catch (_) {}
          pending.delete(tex);
          return orig.apply(this, arguments);
        }

"""
s = s.replace(old_fire, new_fire)

# base block: always start the loop; prefer blaze once everything is captured
s = s.replace(
"""              if (artBody) { blit(px, rec.w, artBody, CELL.body); blit(px, rec.w, artHead, CELL.head); }""",
"""              for (var pi2 = 0; pi2 < ART_PREF.length; pi2++) { if (ART[ART_PREF[pi2]].body) { api.use(ART_PREF[pi2]); break; } }
              if (artBody) { blit(px, rec.w, artBody, CELL.body); blit(px, rec.w, artHead, CELL.head); }""")
s = s.replace(
"""              gl = this; baseTex = tex;                       // for the animation loop
              if (artBody) requestAnimationFrame(tick);
              console.log('%c[skinfire] fire snake skin installed' + (artBody ? ' (animated)' : ' (art missing — static)'), 'color:#ff7a00;font-weight:bold');""",
"""              gl = this; baseTex = tex;                       // for the animation loop
              requestAnimationFrame(tick);                    // the loop waits for art if needed
              console.log('%c[skinfire] fire skin installed (' + (api.art || 'no art yet') + ')', 'color:#ff7a00;font-weight:bold');""")

# use(): swap active art at runtime — the animation loop picks it up next frame
s = s.replace(
"""  api.off = function () {""",
"""  api.use = function (name) {
    var a = ART[name];
    if (!a || !a.body) return 'not captured: ' + name + ' (have: ' + api.captured.join(',') + ')';
    artBody = a.body; artHead = a.head; api.art = name;
    if (!outBody || outBody.length !== artBody.length) { outBody = new Uint8Array(artBody.length); outHead = new Uint8Array(artHead.length); }
    return 'using ' + name;
  };
  api.off = function () {""")

open(p, 'w', encoding='utf-8').write(s)
print('patched')
PY
node --check skinfire.js && echo SYNTAX-OK && grep -n "ART = {\|api.use\|ART_PREF\|captured" skinfire.js | head -20
```

## 045 — 2026-08-22T23:34:22 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
p='content.js'; s=open(p,encoding='utf-8').read()

# 1) clip paths for the four wheels so scrolling tread lugs stay inside the tyre
s = s.replace(
"""      <linearGradient id="__tkBeam" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff096" stop-opacity=".55"/><stop offset="1" stop-color="#fff096" stop-opacity="0"/></linearGradient>
    </defs>""",
"""      <linearGradient id="__tkBeam" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff096" stop-opacity=".55"/><stop offset="1" stop-color="#fff096" stop-opacity="0"/></linearGradient>
      <clipPath id="__cRL" clipPathUnits="userSpaceOnUse"><rect x="1" y="0" width="30" height="18" rx="7"/></clipPath>
      <clipPath id="__cRR" clipPathUnits="userSpaceOnUse"><rect x="1" y="78" width="30" height="18" rx="7"/></clipPath>
      <clipPath id="__cFL" clipPathUnits="userSpaceOnUse"><rect x="63" y="0" width="30" height="18" rx="7"/></clipPath>
      <clipPath id="__cFR" clipPathUnits="userSpaceOnUse"><rect x="63" y="78" width="30" height="18" rx="7"/></clipPath>
    </defs>""")

# 2) rear wheels: tyre + clipped scrolling tread
s = s.replace(
"""    <g fill="url(#__tkWheel)" stroke="#2a2f35" stroke-width="1"><rect x="1" y="0" width="30" height="18" rx="7"/><rect x="1" y="78" width="30" height="18" rx="7"/></g>
    <g fill="#39424c"><rect x="7" y="1" width="3" height="16" rx="1.5"/><rect x="14" y="1" width="3" height="16" rx="1.5"/><rect x="21" y="1" width="3" height="16" rx="1.5"/><rect x="7" y="79" width="3" height="16" rx="1.5"/><rect x="14" y="79" width="3" height="16" rx="1.5"/><rect x="21" y="79" width="3" height="16" rx="1.5"/></g>""",
"""    <g fill="url(#__tkWheel)" stroke="#2a2f35" stroke-width="1"><rect x="1" y="0" width="30" height="18" rx="7"/><rect x="1" y="78" width="30" height="18" rx="7"/></g>
    <g clip-path="url(#__cRL)"><g id="__lugRL" fill="#39424c"><rect x="0" y="1" width="3" height="16" rx="1.5"/><rect x="7" y="1" width="3" height="16" rx="1.5"/><rect x="14" y="1" width="3" height="16" rx="1.5"/><rect x="21" y="1" width="3" height="16" rx="1.5"/><rect x="28" y="1" width="3" height="16" rx="1.5"/></g></g>
    <g clip-path="url(#__cRR)"><g id="__lugRR" fill="#39424c"><rect x="0" y="79" width="3" height="16" rx="1.5"/><rect x="7" y="79" width="3" height="16" rx="1.5"/><rect x="14" y="79" width="3" height="16" rx="1.5"/><rect x="21" y="79" width="3" height="16" rx="1.5"/><rect x="28" y="79" width="3" height="16" rx="1.5"/></g></g>""")

# 3) front wheels: steered group, tyre + clipped scrolling tread
s = s.replace(
"""    <g id="__wFL"><rect x="63" y="0" width="30" height="18" rx="7" fill="url(#__tkWheel)" stroke="#2a2f35" stroke-width="1"/><g fill="#39424c"><rect x="69" y="1" width="3" height="16" rx="1.5"/><rect x="76" y="1" width="3" height="16" rx="1.5"/><rect x="83" y="1" width="3" height="16" rx="1.5"/></g></g>
    <g id="__wFR"><rect x="63" y="78" width="30" height="18" rx="7" fill="url(#__tkWheel)" stroke="#2a2f35" stroke-width="1"/><g fill="#39424c"><rect x="69" y="79" width="3" height="16" rx="1.5"/><rect x="76" y="79" width="3" height="16" rx="1.5"/><rect x="83" y="79" width="3" height="16" rx="1.5"/></g></g>""",
"""    <g id="__wFL"><rect x="63" y="0" width="30" height="18" rx="7" fill="url(#__tkWheel)" stroke="#2a2f35" stroke-width="1"/><g clip-path="url(#__cFL)"><g id="__lugFL" fill="#39424c"><rect x="62" y="1" width="3" height="16" rx="1.5"/><rect x="69" y="1" width="3" height="16" rx="1.5"/><rect x="76" y="1" width="3" height="16" rx="1.5"/><rect x="83" y="1" width="3" height="16" rx="1.5"/><rect x="90" y="1" width="3" height="16" rx="1.5"/></g></g></g>
    <g id="__wFR"><rect x="63" y="78" width="30" height="18" rx="7" fill="url(#__tkWheel)" stroke="#2a2f35" stroke-width="1"/><g clip-path="url(#__cFR)"><g id="__lugFR" fill="#39424c"><rect x="62" y="79" width="3" height="16" rx="1.5"/><rect x="69" y="79" width="3" height="16" rx="1.5"/><rect x="76" y="79" width="3" height="16" rx="1.5"/><rect x="83" y="79" width="3" height="16" rx="1.5"/><rect x="90" y="79" width="3" height="16" rx="1.5"/></g></g></g>""")

# 4) element refs + roll state
s = s.replace(
"""  const wFL = truck.querySelector('#__wFL'), wFR = truck.querySelector('#__wFR'), chassis = truck.querySelector('#__tkChassis');""",
"""  const wFL = truck.querySelector('#__wFL'), wFR = truck.querySelector('#__wFR'), chassis = truck.querySelector('#__tkChassis');
  const lugFL = truck.querySelector('#__lugFL'), lugFR = truck.querySelector('#__lugFR'),
        lugRL = truck.querySelector('#__lugRL'), lugRR = truck.querySelector('#__lugRR');
  let rollDist = 0;                                  // travelled px -> tread scroll (lug pitch 7)""")

# 5) bigger lock + drive the tread scroll from real measured speed
s = s.replace(
"""  const TRUCK = { spring: 0.055, damp: 0.30, omegaMax: 0.26, steerGain: 3.4, steerMax: 0.50, leanGain: 26, drift: 0.65 };""",
"""  const TRUCK = { spring: 0.055, damp: 0.30, omegaMax: 0.26, steerGain: 4.2, steerMax: 0.62, leanGain: 26, drift: 0.65, roll: 0.55 };""")

s = s.replace(
"""        const steerDeg = clampN(truckOmega * TRUCK.steerGain, -TRUCK.steerMax, TRUCK.steerMax) * 180 / Math.PI;
        wFL.setAttribute('transform', `rotate(${steerDeg.toFixed(1)} 78 9)`);
        wFR.setAttribute('transform', `rotate(${steerDeg.toFixed(1)} 78 87)`);""",
"""        const steerDeg = clampN(truckOmega * TRUCK.steerGain, -TRUCK.steerMax, TRUCK.steerMax) * 180 / Math.PI;
        wFL.setAttribute('transform', `rotate(${steerDeg.toFixed(1)} 78 9)`);
        wFR.setAttribute('transform', `rotate(${steerDeg.toFixed(1)} 78 87)`);
        // tread scroll: wheels visibly roll at the speed we are actually travelling
        rollDist = (rollDist + drift.spd * dtR * TRUCK.roll) % 7;
        const tread = `translate(${(-rollDist).toFixed(2)} 0)`;
        lugFL.setAttribute('transform', tread); lugFR.setAttribute('transform', tread);
        lugRL.setAttribute('transform', tread); lugRR.setAttribute('transform', tread);""")

open(p,'w',encoding='utf-8').write(s)
print('patched content.js')
PY
node --check content.js && echo SYNTAX-OK && node -e "
const fs=require('fs'); const src=fs.readFileSync('content.js','utf8');
const m=src.match(/truck\.innerHTML = \`([\s\S]*?)\`;/); const svg=m[1];
const o=(svg.match(/<g[ >]/g)||[]).length, c=(svg.match(/<\/g>/g)||[]).length;
console.log('<g> balance:', o, c, o===c?'OK':'*** MISMATCH ***');
const cp=(svg.match(/<clipPath /g)||[]).length, cpc=(svg.match(/<\/clipPath>/g)||[]).length;
console.log('clipPath balance:', cp, cpc, cp===cpc?'OK':'*** MISMATCH ***');
for (const id of ['__lugFL','__lugFR','__lugRL','__lugRR','__cFL','__cRR','__wFL','__tkChassis']) if(!svg.includes(id)) console.log('MISSING', id);
console.log('all ids present');
"
```

## 046 — 2026-08-22T23:34:51 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && grep -n "wheel\|__wFL\|__wFR\|lug\|rect x=\"7\"\|clipPath\|rollDist\|steerGain" content.js | sed -n '1,40p'
```

## 047 — 2026-08-22T23:35:57 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
p='skinfire.js'; s=open(p,encoding='utf-8').read()
# #5 is the fish school, not a wisp — name it honestly and keep it selectable
s = s.replace("""     default; 'snake' is Firefang's flame-snake sprites; 'wisp' is the soft
     translucent flame. Switch live with __skinFire.use('blaze'|'snake'|'wisp'). */""",
"""     default; 'snake' is Firefang's flame-snake sprites; 'fish' is the Fishes skin
     (a school of little fish — His dad spotted it in the atlas dump and wanted it
     selectable). Switch live: __skinFire.use('blaze'|'snake'|'fish'). */""")
s = s.replace("""    wisp:  { hash: '7c4c8ef3', body: null, head: null }""",
"""    fish:  { hash: '7c4c8ef3', body: null, head: null }""")
s = s.replace("""  var ART_PREF = ['blaze', 'snake', 'wisp'];""",
"""  var ART_PREF = ['blaze', 'snake', 'fish'];""")
open(p,'w',encoding='utf-8').write(s)
print('renamed wisp -> fish')
PY
node --check skinfire.js && node --check content.js && echo BOTH-VALID && node -e "
const fs=require('fs'); const src=fs.readFileSync('content.js','utf8');
const svg=src.match(/truck\.innerHTML = \`([\s\S]*?)\`;/)[1];
const o=(svg.match(/<g[ >]/g)||[]).length, c=(svg.match(/<\/g>/g)||[]).length;
const cp=(svg.match(/<clipPath /g)||[]).length, cpc=(svg.match(/<\/clipPath>/g)||[]).length;
console.log('g balance', o, c, o===c?'OK':'MISMATCH', '| clipPath', cp, cpc, cp===cpc?'OK':'MISMATCH');
const need=['__lugFL','__lugFR','__lugRL','__lugRR','__cFL','__cFR','__cRL','__cRR','__wFL','__wFR','__tkChassis'];
const miss=need.filter(i=>!svg.includes(i));
console.log(miss.length? 'MISSING: '+miss.join(',') : 'all ids present');
" && grep -c "fish" skinfire.js
```

## 048 — 2026-08-22T23:43:14 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake" && python - << 'PY'
import re
p='extension/content.js'; s=open(p,encoding='utf-8').read()
s = s.replace('/* Xbox Snake Rig v2.7 —', '/* Xbox Snake Rig v2.8 —', 1)
s = s.replace("   Study telemetry at window.__fireStudy.report(). */",
"""   v2.7: REAL SKIN SWAP — skinfire.js repaints the game's own skin texture, so the
   body/tail is game-drawn (correct length, growth, curve). Overlay trail cut to a
   short exhaust puff. v2.8: the body is the game's animated fire art (see
   skinfire.js), and the truck got vehicle feel — spring-damped yaw, front wheels
   that STEER, tread lugs that ROLL with distance travelled, weight-transfer lean
   and a few degrees of rear-end slide (window.__truck to tune).
   Study telemetry at window.__fireStudy.report(). */""")
s = s.replace("say('🔥🚙 v2.7 — YOUR WORM IS FIRE (real skin swap, tail grows right) + monster truck head. Press A!');",
              "say('🔥🚙 v2.8 — ANIMATED real fire art on your worm + wheels that steer AND roll. Press A!');")
s = s.replace("say('🔥🚙 v2.7 — FIRE SKIN on your worm + monster truck head! Press A. Y toggles truck.');",
              "say('🔥🚙 v2.8 — ANIMATED real fire art on your worm + wheels that steer AND roll. Press A!');")
s = s.replace("[snake rig v2.7 · fire skin + truck · extension]", "[snake rig v2.8 · animated fire skin + truck · extension]")
open(p,'w',encoding='utf-8').write(s)

m='extension/manifest.json'; t=open(m,encoding='utf-8').read()
t = t.replace('"version": "2.7"','"version": "2.8"').replace('fire-repainted snake skin','animated fire skin (the game\'s own flame art)')
open(m,'w',encoding='utf-8').write(t)
print('bumped to v2.8')
PY
cat >> README.md << 'EOF'

---

## v2.8 — Animated real fire art + vehicle-feel wheels (2026-08-22)

**Body = the game's own fire art, ANIMATED.** Two of his dad's calls drove this:
"there's a fire snake, copy that guy" and "make it animated".

- `skinfire.js` now captures three fire-ish atlases at boot by fingerprint and
  resamples their sprites into the equipped skin's cells:
  `blaze` **17e8769c** (the game's big bold flame — the default, best "just fire,
  not a snake" look), `snake` **db489690** (Firefang's flame tail/body/head), and
  `fish` **7c4c8ef3** (the Fishes school — His dad wanted it selectable).
  Switch live, no reload: `__skinFire.use('blaze'|'snake'|'fish')`.
- **Animation**: after the initial paint we keep re-uploading ONLY the two 216px
  cells (`texSubImage2D`, ~30fps, buffers reused) with a scrolling flame
  modulation — so the fire animates while the GAME still draws the body. Alignment,
  tail length and growth remain free. Tunables: `__skinFire.anim/speed/amp/fps`.
- GL etiquette for the per-frame upload: save/restore `TEXTURE_BINDING_2D`,
  `UNPACK_FLIP_Y_WEBGL` and `UNPACK_PREMULTIPLY_ALPHA_WEBGL` around it, and use the
  UNPATCHED `texSubImage2D` — otherwise the game's own state gets clobbered.
- Verified live: 3/3 arts captured, >1300 animated uploads, 0 errors, other players
  unaffected (a Fishes-skin player rendered normally right next to us).

**Truck now drives like a vehicle** (`window.__truck` to tune):
spring-damped yaw (~0.18s to settle 90°, no wobble) instead of a lerp; front
wheels **steer** up to ~35° about their own hubs; all four wheels **roll** — tread
lugs at 7px pitch, clipped per tyre, scrolled by distance actually travelled;
chassis takes a weight-transfer **lean**; body yaws a few degrees out of the corner
as a rear-end **slide**.

**Atlas map for future skin work** (dump-and-look beats trusting the asset table —
see §v2.7): #0 phoenix, **#1 Firefang flame snake**, #2 panda, #3 demon,
**#4 big blaze**, **#5 fishes school**, #6 lion, #7 cow, #8 tiger, #10 ice,
#11 dino, #12 rabbit, #13 dog, #14 robot, #15 spirit wolf, #16 cat, #17 ghost,
#18 rat. Dump them with the canvas-grid trick in §v2.7 gotcha 6.

*v2.8 — 2026-08-22. Files: `extension/skinfire.js`, `extension/content.js`, `extension/manifest.json`.*
EOF
node --check extension/content.js && node --check extension/skinfire.js && echo VALID && grep -n "v2.8" extension/content.js | head -3 && grep '"version"' extension/manifest.json
```

## 049 — 2026-08-22T23:54:01 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
p='skinfire.js'; s=open(p,encoding='utf-8').read()

# --- LOOKS table: art source + transparency/flicker treatment ---
s = s.replace("""  var ART_PREF = ['blaze', 'snake', 'fish'];""",
"""  var ART_PREF = ['blaze', 'snake', 'fish'];

  /* Selectable LOOKS = an art source plus a transparency treatment. 'ghost' is the
     nearly-invisible shimmer, 'ember' shows ONLY the flame tongues (alpha follows the
     animated flame, so the body flickers in and out), 'off' hides the body completely
     and the rig lengthens its overlay flames instead. Cycle with LB on the pad. */
  var LOOKS = [
    { id: 'blaze', art: 'blaze', alpha: 1.00, flicker: false, amp: 1.0 },
    { id: 'snake', art: 'snake', alpha: 1.00, flicker: false, amp: 1.0 },
    { id: 'fish',  art: 'fish',  alpha: 1.00, flicker: false, amp: 0.8 },
    { id: 'ghost', art: 'blaze', alpha: 0.30, flicker: false, amp: 1.7 },
    { id: 'ember', art: 'blaze', alpha: 1.00, flicker: true,  amp: 2.0 },
    { id: 'off',   art: 'blaze', alpha: 0.00, flicker: false, amp: 1.0 }
  ];
  var look = LOOKS[0];""")

s = s.replace("""    base: false, art: null, captured: [], anim: true, speed: 1, amp: 1, fps: 30, frames: 0, errors: [], sig: null""",
"""    base: false, art: null, lookId: 'blaze', looks: LOOKS.map(function (l) { return l.id; }),
    bodyHidden: false, captured: [], anim: true, speed: 1, amp: 1, fps: 30, frames: 0, errors: [], sig: null""")

# --- animate(): honour alpha scale + flicker + per-look amp ---
s = s.replace("""  function animate(src, dst, dw, dh, t, seed) {
    var amp = 0.30 * api.amp;""",
"""  function animate(src, dst, dw, dh, t, seed) {
    var amp = 0.30 * api.amp * look.amp;
    var aScale = look.alpha, flick = look.flicker;""")

s = s.replace("""        var a = src[o+3];
        dst[o+3] = a;
        if (!a) { dst[o] = 0; dst[o+1] = 0; dst[o+2] = 0; continue; }
        var lick = wave + 0.9*Math.sin(x*0.11 + t*1.9 + seed);
        var m = 1 + amp*Math.max(-1, Math.min(1, lick*0.7));""",
"""        var a = src[o+3];
        if (!a) { dst[o] = 0; dst[o+1] = 0; dst[o+2] = 0; dst[o+3] = 0; continue; }
        var lick = wave + 0.9*Math.sin(x*0.11 + t*1.9 + seed);
        var k = Math.max(-1, Math.min(1, lick*0.7));
        // alpha: scaled per look; in flicker mode it follows the flame so only tongues show
        var av = a * aScale * (flick ? Math.max(0, Math.min(1, 0.18 + 0.95 * (0.5 + 0.5 * k))) : 1);
        dst[o+3] = av > 255 ? 255 : av;
        var m = 1 + amp*k;""")

# --- use() accepts a look id (or an art name) + next() for cycling ---
s = s.replace("""  api.use = function (name) {
    var a = ART[name];
    if (!a || !a.body) return 'not captured: ' + name + ' (have: ' + api.captured.join(',') + ')';
    artBody = a.body; artHead = a.head; api.art = name;
    if (!outBody || outBody.length !== artBody.length) { outBody = new Uint8Array(artBody.length); outHead = new Uint8Array(artHead.length); }
    return 'using ' + name;
  };""",
"""  api.use = function (name) {
    var L = null;
    for (var i = 0; i < LOOKS.length; i++) if (LOOKS[i].id === name) L = LOOKS[i];
    if (!L && ART[name]) L = { id: name, art: name, alpha: 1, flicker: false, amp: 1 };   // raw art name still works
    if (!L) return 'unknown look: ' + name + ' (try ' + api.looks.join(',') + ')';
    var a = ART[L.art];
    if (!a || !a.body) return 'art not captured: ' + L.art + ' (have: ' + api.captured.join(',') + ')';
    look = L; artBody = a.body; artHead = a.head; api.art = L.art; api.lookId = L.id;
    api.bodyHidden = (L.alpha === 0);
    if (!outBody || outBody.length !== artBody.length) { outBody = new Uint8Array(artBody.length); outHead = new Uint8Array(artHead.length); }
    return L.id;
  };
  api.next = function () {
    var start = 0;
    for (var i = 0; i < LOOKS.length; i++) if (LOOKS[i].id === api.lookId) start = i;
    for (var n = 1; n <= LOOKS.length; n++) {
      var cand = LOOKS[(start + n) % LOOKS.length];
      if (ART[cand.art] && ART[cand.art].body) return api.use(cand.id);
    }
    return api.lookId;
  };""")
open(p,'w',encoding='utf-8').write(s)
print('skinfire: looks + cycling added')
PY
node --check skinfire.js && echo SYNTAX-OK && grep -n "LOOKS = \[\|api.next\|bodyHidden\|flicker" skinfire.js | head -12
```

## 050 — 2026-08-22T23:54:29 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
p='content.js'; s=open(p,encoding='utf-8').read()

# LB (button 4) was unused — make it cycle the skin look
s = s.replace("""    const A = !!pad.buttons[0]?.pressed, B = !!pad.buttons[1]?.pressed, X = !!pad.buttons[2]?.pressed, Y = !!pad.buttons[3]?.pressed, RB = !!pad.buttons[5]?.pressed,
          MENU = !!pad.buttons[9]?.pressed, RT = pad.buttons[7]?.value ?? 0;""",
"""    const A = !!pad.buttons[0]?.pressed, B = !!pad.buttons[1]?.pressed, X = !!pad.buttons[2]?.pressed, Y = !!pad.buttons[3]?.pressed,
          LB = !!pad.buttons[4]?.pressed, RB = !!pad.buttons[5]?.pressed,
          MENU = !!pad.buttons[9]?.pressed, RT = pad.buttons[7]?.value ?? 0;""")

s = s.replace("""    if (Y && !pY) { truckOn = !truckOn; say(truckOn ? '🚙 truck head ON' : '🔥 truck off — fire skin stays'); } pY = Y;""",
"""    if (Y && !pY) { truckOn = !truckOn; say(truckOn ? '🚙 truck head ON' : '🔥 truck off — fire skin stays'); } pY = Y;
    // LB cycles the body look: blaze -> fire snake -> fish -> ghost -> ember -> invisible
    if (LB && !pLB) { const r = window.__skinFire ? window.__skinFire.next() : 'no skin hook'; say('🔥 look: ' + r); } pLB = LB;
    // when the body is hidden, grow the overlay flames so there is still a trail to see
    const hidden = !!(window.__skinFire && window.__skinFire.bodyHidden);
    if (hidden !== trailLong) {
      trailLong = hidden;
      FIRE.life = hidden ? 95 : 26; FIRE.boostLife = hidden ? 120 : 34;
      FIRE.rate = hidden ? 5 : 3;   FIRE.boostRate = hidden ? 9 : 7;
      FIRE.max  = hidden ? 700 : 220;
    }""")

s = s.replace("""      pA = false, pB = false, pX = false, pMenu = false, pDL = false, pDR = false, pDU = false, pDD = false,""",
"""      pA = false, pB = false, pX = false, pLB = false, pMenu = false, pDL = false, pDR = false, pDU = false, pDD = false,
      trailLong = false,""")

# HUD: show the active look and the new binding
s = s.replace("""          `🕹️ blend L${'·'.repeat(pos)}●${'·'.repeat(8 - pos)}R\\n🔥 ${(window.__skinFire && window.__skinFire.art) || 'fire'} · B=circle · X=revive · Y=truck · RB=menu`;""",
"""          `🕹️ blend L${'·'.repeat(pos)}●${'·'.repeat(8 - pos)}R\\n🔥 ${(window.__skinFire && window.__skinFire.lookId) || 'fire'} · LB=look · B=circle · X=revive · Y=truck · RB=menu`;""")

s = s.replace("say('🔥🚙 v2.8 — ANIMATED real fire art on your worm + wheels that steer AND roll. Press A!');",
              "say('🔥🚙 v2.9 — LB cycles the look: blaze / fire snake / fish / ghost / ember / invisible. Press A!');")
s = s.replace('/* Xbox Snake Rig v2.8 —', '/* Xbox Snake Rig v2.9 —', 1)
s = s.replace("[snake rig v2.8 · animated fire skin + truck · extension]", "[snake rig v2.9 · selectable animated looks + truck · extension]")
open(p,'w',encoding='utf-8').write(s)
print('content.js: LB look-cycling + adaptive trail')
PY
node --check content.js && echo SYNTAX-OK && grep -n "pLB\|trailLong\|LB=look\|v2.9" content.js | head -12
sed -i 's/"version": "2.8"/"version": "2.9"/' manifest.json && grep '"version"' manifest.json
```

## 051 — 2026-08-22T23:54:47 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && grep -n "truckOn = !truckOn" content.js && echo "--- hud line ---" && grep -n "blend L" content.js && echo "--- LB present? ---" && grep -c "pLB = LB" content.js
```

## 052 — 2026-08-22T23:55:24 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && node --check content.js && node --check skinfire.js && echo BOTH-VALID && echo "--- wiring check ---" && grep -c "pLB = LB" content.js && grep -c "LB=look" content.js && grep -n "LB = !!pad.buttons\[4\]" content.js && node -e "
// LOOKS cycling logic sanity check (mirrors skinfire api.next with all art captured)
const LOOKS=[{id:'blaze'},{id:'snake'},{id:'fish'},{id:'ghost'},{id:'ember'},{id:'off'}];
let cur='blaze'; const seq=[];
for(let i=0;i<7;i++){ const s=LOOKS.findIndex(l=>l.id===cur); cur=LOOKS[(s+1)%LOOKS.length].id; seq.push(cur); }
console.log('LB cycle:', seq.join(' -> '));
"
```

## 053 — 2026-08-23T00:01:48 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake" && cat >> README.md << 'EOF'

---

## v2.9 — Six selectable looks, cycled with LB (2026-08-22)

`LB` (previously unused on the pad) now cycles the body look; the active one shows
in the HUD. `window.__skinFire.use(id)` / `.next()` do the same from the console.

| look | what it is |
|---|---|
| `blaze` | the game's big bold flame (default) |
| `snake` | **Firefang's real flame-snake art** |
| `fish` | the Fishes school sprites |
| `ghost` | blaze at 30% alpha, stronger animation — nearly invisible shimmer |
| `ember` | alpha FOLLOWS the flame, so only the licking tongues are visible |
| `off` | body fully invisible; the rig auto-grows its overlay flames (life 26→95, rate 3→5, cap 220→700) so there is still a trail |

Implementation: a LOOKS table pairs an art source with a transparency treatment
(`alpha`, `flicker`, `amp`) that `animate()` applies while re-uploading the two
sprite cells. `bodyHidden` is exported so the rig can switch trail length. Adding a
look is one row — no new atlas needed.

*v2.9 — 2026-08-22.*
EOF
node --check extension/content.js && node --check extension/skinfire.js && echo VALID && grep '"version"' extension/manifest.json && ls extension/
```

## 054 — 2026-08-23T18:43:48 (PowerShell)

```
$chrome = @(
  "$env:ProgramFiles\Google\Chrome\Application\chrome.exe",
  "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe",
  "$env:LOCALAPPDATA\Google\Chrome\Application\chrome.exe"
) | Where-Object { Test-Path $_ } | Select-Object -First 1
"chrome: $chrome"
if ($chrome) { "version: " + (Get-Item $chrome).VersionInfo.ProductVersion }
$prefs = "$env:LOCALAPPDATA\Google\Chrome\User Data\Default\Preferences"
if (Test-Path $prefs) {
  $raw = Get-Content $prefs -Raw
  "prefs size: $($raw.Length)"
  if ($raw -match 'xbox-snake') { "EXTENSION REGISTERED in Default profile" } else { "extension NOT found in Default profile prefs" }
} else { "no Default profile prefs at $prefs" }
Test-Path "C:\Users\<user>\dev\xbox-snake\extension\manifest.json"
```

## 055 — 2026-08-23T18:44:36 (PowerShell)

```
$ud = "$env:LOCALAPPDATA\Google\Chrome\User Data"
Get-ChildItem $ud -Directory -ErrorAction SilentlyContinue | Where-Object { $_.Name -eq 'Default' -or $_.Name -like 'Profile*' } | ForEach-Object {
  $p = Join-Path $_.FullName 'Preferences'
  if (Test-Path $p) {
    $hit = (Select-String -Path $p -Pattern 'xbox-snake' -SimpleMatch -Quiet)
    "{0,-12} extension: {1}" -f $_.Name, $(if ($hit) { 'FOUND' } else { 'no' })
  }
}
"--- snake.io icon ---"
$ico = "C:\Users\<user>\dev\xbox-snake\snakeio.ico"
try {
  Invoke-WebRequest -Uri "https://snake.io/favicon.ico" -OutFile $ico -UseBasicParsing -TimeoutSec 20
  $f = Get-Item $ico
  "downloaded: $($f.FullName) ($($f.Length) bytes)"
} catch { "icon download failed: $($_.Exception.Message)" }
```

## 056 — 2026-08-23T18:44:55 (PowerShell)

```
$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$url    = "https://snake.io/crazygames/"
$ico    = "C:\Users\<user>\dev\xbox-snake\snakeio.ico"
$name   = "Snake.io Monster Truck.lnk"
$startMenu = Join-Path $env:APPDATA "Microsoft\Windows\Start Menu\Programs"
$desktop   = [Environment]::GetFolderPath('Desktop')
$sh = New-Object -ComObject WScript.Shell
foreach ($dir in @($startMenu, $desktop)) {
  $path = Join-Path $dir $name
  $lnk = $sh.CreateShortcut($path)
  $lnk.TargetPath       = $chrome
  $lnk.Arguments        = "--app=$url"
  $lnk.WorkingDirectory = Split-Path $chrome
  $lnk.IconLocation     = "$ico,0"
  $lnk.Description      = "Snake.io in app mode (chromeless) - Xbox rig: animated fire skin + monster truck"
  $lnk.Save()
  if (Test-Path $path) { "created: $path" } else { "FAILED: $path" }
}
"--- verify ---"
$check = $sh.CreateShortcut((Join-Path $startMenu $name))
"target : $($check.TargetPath)"
"args   : $($check.Arguments)"
"icon   : $($check.IconLocation)"
```

## 057 — 2026-08-23T18:46:05 (PowerShell)

```
$ext = "C:\Users\<user>\dev\xbox-snake\extension"
Set-Clipboard -Value $ext
"clipboard = $ext"
$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
# open the extensions page for the one-time Load unpacked
Start-Process $chrome -ArgumentList "chrome://extensions"
Start-Sleep -Seconds 2
# and open the game itself in app mode via the new shortcut
Start-Process (Join-Path ([Environment]::GetFolderPath('Desktop')) "Snake.io Monster Truck.lnk")
Start-Sleep -Seconds 3
"launched: chrome://extensions + app-mode game window"
Get-Process chrome -ErrorAction SilentlyContinue | Measure-Object | ForEach-Object { "chrome processes: $($_.Count)" }
```

## 058 — 2026-08-23T18:50:14 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && echo "=== api fields ===" && grep -n "lookId\|bodyHidden\|looks:" skinfire.js | head && echo "=== use/next ===" && grep -n "api.use = function\|api.next = function\|for (var i = 0; i < LOOKS.length" skinfire.js | head && echo "=== alpha applied in animate? ===" && sed -n '200,216p' skinfire.js | grep -n "aScale\|dst\[o + 3\]\|dst\[o+3\]"
```

## 059 — 2026-08-23T18:50:50 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && grep -n "base: false" skinfire.js && sed -n '/var api = (window.__skinFire/,/});/p' skinfire.js
```

## 060 — 2026-08-23T18:51:18 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && node --check skinfire.js && node --check content.js && echo BOTH-VALID && echo "=== all look features present? ===" && for k in "var look = LOOKS\[0\]" "lookId: LOOKS\[0\].id" "looks: LOOKS.map" "bodyHidden: false" "aScale = look.alpha" "dst\[o + 3\] = av" "api.use = function" "api.next = function" "api.bodyHidden = (L.alpha === 0)"; do printf "%-34s %s\n" "$k" "$(grep -c "$k" skinfire.js)"; done && echo "=== rig side ===" && for k in "LB = !!pad.buttons\[4\]" "pLB = LB" "LB=look" "trailLong" "bodyHidden"; do printf "%-34s %s\n" "$k" "$(grep -c "$k" content.js)"; done
```

## 061 — 2026-08-23T18:51:43 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && node -e "
// simulate the fixed animate() alpha for each look on a fully-opaque texel
const LOOKS=[
 {id:'blaze',alpha:1.00,flicker:false,amp:1.0},
 {id:'snake',alpha:1.00,flicker:false,amp:1.0},
 {id:'fish', alpha:1.00,flicker:false,amp:0.8},
 {id:'ghost',alpha:0.30,flicker:false,amp:1.7},
 {id:'ember',alpha:1.00,flicker:true, amp:2.0},
 {id:'off',  alpha:0.00,flicker:false,amp:1.0}];
for (const L of LOOKS) {
  let mn=999,mx=-1;
  for (let s=0;s<40;s++){
    const k=Math.max(-1,Math.min(1,(Math.sin(s*0.7)*1.6)*0.7));      // sweep the flame term
    const av=255*L.alpha*(L.flicker?Math.max(0,Math.min(1,0.18+0.95*(0.5+0.5*k))):1);
    mn=Math.min(mn,av); mx=Math.max(mx,av);
  }
  console.log(L.id.padEnd(6),'alpha range', Math.round(mn)+'-'+Math.round(mx), '/255', L.alpha===0?'(body invisible -> rig grows overlay flames)':(L.flicker?'(flickers: only tongues visible)':''));
}
"
```

## 062 — 2026-08-23T18:58:45 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && node --check skinfire.js && node --check content.js && echo BOTH-VALID && echo "=== no stale trailLong refs ===" && grep -c "trailLong" content.js; echo "=== trail wiring ===" && grep -n "trailMode\|api.trail\|trail: '" content.js skinfire.js | head -14 && node -e "
// confirm the 7 looks and their trail modes
const looks=[['blaze','puff'],['snake','puff'],['fish','puff'],['ghost','puff'],['ember','puff'],['off','long'],['notail','none']];
let cur='blaze'; const order=[];
for(let i=0;i<7;i++){ const s=looks.findIndex(l=>l[0]===cur); cur=looks[(s+1)%looks.length][0]; order.push(cur); }
console.log('LB cycle:', order.join(' -> '));
for (const [id,t] of looks) console.log(' ', id.padEnd(7), 'trail:', t, t==='none'?'(truck alone, no tail)':'');
"
```

## 063 — 2026-08-23T18:59:07 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake" && python - << 'PY'
p='README.md'; s=open(p,encoding='utf-8').read()
s = s.replace(
"""| `off` | body fully invisible; the rig auto-grows its overlay flames (life 26→95, rate 3→5, cap 220→700) so there is still a trail |""",
"""| `off` | body fully invisible; the rig auto-grows its overlay flames (life 26→95, rate 3→5, cap 220→700) so there is still a trail |
| `notail` | **truck completely alone** — invisible body AND no trail at all |""")
s = s.replace(
"""Implementation: a LOOKS table pairs an art source with a transparency treatment
(`alpha`, `flicker`, `amp`) that `animate()` applies while re-uploading the two
sprite cells. `bodyHidden` is exported so the rig can switch trail length. Adding a
look is one row — no new atlas needed.""",
"""Implementation: a LOOKS table pairs an art source with a transparency treatment
(`alpha`, `flicker`, `amp`) that `animate()` applies while re-uploading the two sprite
cells, plus a `trail` mode ('puff' | 'long' | 'none') exported as `__skinFire.trail`
that the rig reads to size its overlay flames. Adding a look is one row — no new atlas.

**Editing gotcha that bit us:** two scripted find-and-replace edits silently no-opped
because the file writes `src[o + 3]` (spaces) and the pattern had `src[o+3]`. The
symptom was subtle — art switching worked but ghost/ember/off did nothing, since the
line that applies alpha was never replaced. ALWAYS grep for the new tokens after a
scripted patch; a "patched" message only means the script ran, not that it matched.""")
open(p,'w',encoding='utf-8').write(s)
print('README updated')
PY
sed -i "s/say('🔥🚙 v2.9 — press LB to cycle: blaze \/ FIRE SNAKE \/ fish \/ ghost \/ ember \/ invisible!');/say('🔥🚙 v2.9 — LB cycles 7 looks: blaze, fire snake, fish, ghost, ember, invisible, no-tail!');/" extension/content.js
node --check extension/content.js && echo VALID && grep -n "LB cycles 7 looks" extension/content.js
```

## 064 — 2026-08-23T18:59:21 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && grep -n "say('🔥🚙 v2" content.js
```

## 065 — 2026-08-23T18:59:30 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && grep -n "requestAnimationFrame(frame);" content.js | tail -2 && sed -n '/^  requestAnimationFrame(frame);$/,+3p' content.js | tail -4
```

## 066 — 2026-08-23T18:59:54 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && node --check content.js && node --check skinfire.js && echo BOTH-VALID && echo "--- final state ---" && grep -n "LB cycles 7 looks" content.js && grep -c "notail" skinfire.js && grep '"version"' manifest.json && ls -la *.js *.json
```

## 067 — 2026-08-23T19:02:39 (PowerShell)

```
$prefs = "$env:LOCALAPPDATA\Google\Chrome\User Data\Default\Preferences"
if (Select-String -Path $prefs -Pattern 'xbox-snake' -SimpleMatch -Quiet) { "EXTENSION IS LOADED in your Chrome" } else { "extension is NOT loaded in your Chrome" }
"--- chrome windows open ---"
Get-Process chrome -ErrorAction SilentlyContinue | Where-Object { $_.MainWindowTitle } | Select-Object -First 8 Id, MainWindowTitle | Format-Table -AutoSize | Out-String
```

## 068 — 2026-08-23T19:03:02 (PowerShell)

```
$prefs = "$env:LOCALAPPDATA\Google\Chrome\User Data\Default\Preferences"
$found = $false
for ($i = 1; $i -le 15; $i++) {
  if (Select-String -Path $prefs -Pattern 'xbox-snake' -SimpleMatch -Quiet) { $found = $true; break }
  Start-Sleep -Seconds 3
}
if ($found) {
  "EXTENSION LOADED after ~$($i*3)s"
  $raw = Get-Content $prefs -Raw
  if ($raw -match '"([a-p]{32})":\{[^{}]*xbox-snake') { "extension id: $($Matches[1])" }
} else { "still not loaded after 45s" }
```

## 069 — 2026-08-23T19:04:19 (PowerShell)

```
$chrome  = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$ext     = "C:\Users\<user>\dev\xbox-snake\extension"
$profile = "$env:LOCALAPPDATA\SnakeTruck\profile"
New-Item -ItemType Directory -Force -Path $profile | Out-Null
$args = @(
  "--user-data-dir=$profile",
  "--load-extension=$ext",
  "--no-first-run",
  "--no-default-browser-check",
  "--app=https://snake.io/crazygames/"
)
Start-Process $chrome -ArgumentList $args
"launched with --load-extension"
Start-Sleep -Seconds 12
$p = Join-Path $profile "Default\Preferences"
if (Test-Path $p) {
  if (Select-String -Path $p -Pattern 'xbox-snake' -SimpleMatch -Quiet) { "SUCCESS: extension auto-loaded in the game profile" }
  else { "profile created but extension not listed yet" }
} else { "no Preferences file yet at $p" }
```

## 070 — 2026-08-23T19:04:48 (PowerShell)

```
$profile = "$env:LOCALAPPDATA\SnakeTruck\profile"
Start-Sleep -Seconds 8
$p = Join-Path $profile "Default\Preferences"
if (Test-Path $p) {
  $raw = Get-Content $p -Raw
  "prefs size: $($raw.Length)"
  if ($raw -match 'xbox-snake') { "EXTENSION AUTO-LOADED ✔" } else { "not in prefs; checking Secure Preferences" ; $sp = Join-Path $profile "Default\Secure Preferences"; if ((Test-Path $sp) -and (Select-String -Path $sp -Pattern 'xbox-snake' -SimpleMatch -Quiet)) { "found in Secure Preferences ✔" } else { "not found" } }
} else { "no prefs yet" }
"--- windows ---"
Get-Process chrome -ErrorAction SilentlyContinue | Where-Object { $_.MainWindowTitle } | Select-Object Id, MainWindowTitle | Format-Table -AutoSize | Out-String
```

## 071 — 2026-08-23T19:05:41 (PowerShell)

```
$chrome  = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$ext     = "C:\Users\<user>\dev\xbox-snake\extension"
$profile = "$env:LOCALAPPDATA\SnakeTruck\profile"
node --check "$ext\content.js"; if ($LASTEXITCODE -ne 0) { "SYNTAX ERROR"; exit }
# close the test window I launched a moment ago (leave the user's own window alone)
Stop-Process -Id 39764 -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2
Start-Process $chrome -ArgumentList @("--user-data-dir=$profile","--load-extension=$ext","--no-first-run","--no-default-browser-check","--app=https://snake.io/crazygames/")
Start-Sleep -Seconds 16
$ls = Join-Path $profile "Default\Local Storage\leveldb"
if (Test-Path $ls) {
  $hit = Get-ChildItem $ls -File | Where-Object { (Select-String -Path $_.FullName -Pattern '__snakeRig' -SimpleMatch -Quiet) }
  if ($hit) { "RIG CONFIRMED RUNNING — breadcrumb found in $($hit[0].Name)" } else { "breadcrumb not found yet (rig may not have run)" }
} else { "no Local Storage dir yet" }
```

## 072 — 2026-08-23T19:08:10 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && grep -n "spawnAcc +=" content.js && sed -n '/spawnAcc += (boost/,/^    }$/p' content.js | head -16
```

## 073 — 2026-08-23T19:09:09 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && grep -n "leanGain, -6, 6" content.js && sed -n '/leanGain, -6, 6/,/nitro.setAttribute/p' content.js
```

## 074 — 2026-08-23T19:09:45 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
p='content.js'; s=open(p,encoding='utf-8').read()
# accel/lastSpd state + squat tunable
s = s.replace("""  let truckOmega = 0;""",
"""  let truckOmega = 0, accel = 0, lastSpd = 0;""")
s = s.replace("""leanGain: 26, drift: 0.65, roll: 0.55 };""",
"""leanGain: 26, drift: 0.65, roll: 0.55, squat: 2.6 };""")
# HUD: show measured body size so growth is visible/debuggable
s = s.replace("""🔥 ${(window.__skinFire && window.__skinFire.lookId) || 'fire'} · LB=look""",
"""🔥 ${(window.__skinFire && window.__skinFire.lookId) || 'fire'} ·${' size ' + bodyPx.toFixed(0) + 'px'} · LB=look""")
open(p,'w',encoding='utf-8').write(s)
print('patched')
PY
node --check content.js && echo VALID && echo "=== verify all three features ===" && for k in "accel = 0, lastSpd = 0" "squat: 2.6" "measureBody" "sizeScale" "bodyPx \* 0.18" "emberR" "lockScale" "size ' + bodyPx"; do printf "%-26s %s\n" "$k" "$(grep -c "$k" content.js)"; done
```

## 075 — 2026-08-23T19:10:20 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && node -e "
// simulate measureBody: warm-pixel area -> diameter, with pellet contamination + EMA
const BOX=132, REF=34, EMA=0.05, MINPX=60;
function measure(trueDia, pellets){
  let warm = Math.PI*trueDia*trueDia/4;          // head disc
  warm += pellets * Math.PI*5*5;                 // stray warm pellets (~10px across)
  if (warm < MINPX) return null;
  return 2*Math.sqrt(warm/Math.PI);
}
for (const [d,p] of [[30,0],[30,3],[46,0],[46,3],[70,0],[70,5],[95,2]]) {
  const m = measure(d,p);
  const scale = Math.max(0.75, Math.min(3.0, m/REF));
  console.log('true dia', String(d).padStart(3), 'pellets', p, '-> measured', m.toFixed(1).padStart(5), 'scale', scale.toFixed(2));
}
// EMA convergence: worm grows 34 -> 70 over 8s at 60 samples/s
let v=34; let f=0;
for (let i=0;i<480;i++){ const target=34+(70-34)*Math.min(1,i/480); v+=(target-v)*EMA; }
console.log('after 8s growth ramp, tracked value:', v.toFixed(1), '(target 70) -> lag is smooth, no jitter');
"
```

## 076 — 2026-08-23T19:10:53 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake" && python - << 'PY'
p='extension/content.js'; s=open(p,encoding='utf-8').read()
s = s.replace('/* Xbox Snake Rig v2.9 —', '/* Xbox Snake Rig v3.0 —', 1)
s = s.replace("""   Study telemetry at window.__fireStudy.report(). */""",
"""   v3.0: the truck GROWS with the worm and the flames sit exactly on the body.
   There is no score/size value reachable from JS, so body thickness is MEASURED from
   the captured video: count warm pixels (fire art is orange, the arena is teal) in a
   box on the head, area -> diameter, heavy EMA, held while a transparent look makes it
   unmeasurable (window.__size). That measurement drives the truck scale, the ember
   radius and the trail's lateral spread. Truck also got longitudinal weight transfer
   (squats under acceleration, dives when slowing), engine shake, and speed-sensitive
   steering lock.
   Study telemetry at window.__fireStudy.report(). */""")
s = s.replace("say('🔥🚙 v2.9 — LB cycles 7 looks: blaze · fire snake · fish · ghost · ember · invisible · NO-TAIL');",
              "say('🔥🚙 v3.0 — truck now GROWS with you, flames sit on the body. LB = 7 looks.');")
s = s.replace('[snake rig v2.9 · selectable animated looks + truck · extension]', '[snake rig v3.0 · growing truck + inline flames · extension]')
open(p,'w',encoding='utf-8').write(s)

m='extension/manifest.json'; t=open(m,encoding='utf-8').read()
t = t.replace('"version": "2.9"','"version": "3.0"')
open(m,'w',encoding='utf-8').write(t)
print('bumped to v3.0')
PY
cat >> README.md << 'EOF'

---

## v3.0 — Truck grows with the worm; flames sit exactly on the body (2026-08-23)

His dad's last three asks: more realistic truck movement, the truck should grow as the
snake grows, and the flames should be exactly inline with the tail. The last two are
the same problem — the rig had no idea how big the worm was on screen.

**Measuring the worm.** No score/length/size value is reachable from JS (Unity heap),
so we measure it from pixels. The head is always at screen centre, so each flow sample
also grabs a 132px box there from the SAME captured video and counts *warm* pixels —
our fire art is orange/gold and the arena is teal, so `R > B + 26` separates body from
background in one comparison. Disc area → diameter, EMA 0.05, clamped 0.75–3.0×.
While a transparent look (`off`/`notail`) makes the body unmeasurable, the last value
is HELD rather than zeroed. Live at `window.__size`; the HUD shows `size NNpx`.
Validated: exact on a clean disc, +5–15% with food pellets in frame, smooth under a
ramp from 34→70px.

That one number now drives:
- **truck scale** — it grows exactly as the worm thickens
- **ember radius** (`bodyPx * 0.52`, 0.62 boosting) — the flame column is as wide as the body
- **lateral scatter** (`bodyPx * 0.18`, was a flat 8px, which read as off-centre on a fat worm)
- **spawn offset** (`bodyPx * 0.12`) so flames start on the head, on the centreline

**More vehicle feel:** longitudinal weight transfer (chassis squats back under
acceleration from the measured speed derivative, dives forward when slowing), engine
shake proportional to |accel|, and speed-sensitive steering lock (`1/(1+spd*0.055)` —
less lock the faster you go). On top of v2.8's spring yaw, steering front wheels,
rolling tread and cornering lean/slide. All tunable via `window.__truck` (`squat`).

*v3.0 — 2026-08-23.*
EOF
node --check extension/content.js && echo VALID && grep '"version"' extension/manifest.json
```

## 077 — 2026-08-23T23:08:43 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && grep -n "if (dev / cnt < 2.5) return null;" content.js && grep -n "let best = Infinity, bx = 0, by = 0, sum = 0, n = 0;" content.js && grep -n "if (best > coarseMean \* 0.55" content.js && grep -n "flow.vx = mx \* k / dtF" content.js
```

## 078 — 2026-08-23T23:10:13 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && grep -n "truck.querySelector('#__tkChassis')" content.js && grep -n "const drift = motionStep" content.js && sed -n '/const drift = motionStep/,/fireFrame(cx, cy, drift, boost, dtR);/p' content.js
```

## 079 — 2026-08-23T23:11:20 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
p='content.js'; s=open(p,encoding='utf-8').read()
# yawG element ref
s = s.replace("""  const wFL = truck.querySelector('#__wFL'), wFR = truck.querySelector('#__wFR'), chassis = truck.querySelector('#__tkChassis');""",
"""  const wFL = truck.querySelector('#__wFL'), wFR = truck.querySelector('#__wFR'), chassis = truck.querySelector('#__tkChassis');
  const yawG = truck.querySelector('#__tkYaw');          // carries the slip angle inside the travel-locked container""")
# latency comp should use the zero-latency demanded turn rate, not the flow-derived one
s = s.replace("""      if (Math.abs(flowOm) >= 0.006) {
        const stale = FIRE.latComp * dtR + Math.max(0, age / (1000 / 60) - dtR);
        const ang = Math.max(-0.5, Math.min(0.5, flowOm * stale));""",
"""      // rotate forward by the DEMANDED turn rate (zero latency); flowOm is derived from
      // the already-lagged flow, which biased sustained turns by ~10 degrees
      const omUse = Math.abs(lastWUse) > 0.004 ? lastWUse : flowOm;
      if (Math.abs(omUse) >= 0.004) {
        const stale = FIRE.latComp * dtR + Math.max(0, age / (1000 / 60) - dtR);
        const ang = Math.max(-0.5, Math.min(0.5, omUse * stale));""")
# hoist lastWUse above motionStep (it is declared later in the truck block)
s = s.replace("""  let physHeading = -Math.PI / 2, spdEma = FIRE.speed, prevBodyDir = null, stillFrames = 0;""",
"""  let physHeading = -Math.PI / 2, spdEma = FIRE.speed, prevBodyDir = null, stillFrames = 0;
  let lastWUse = 0;                       // demanded turn rate from the stick, set by the truck block""")
s = s.replace("""      driftAmt = 0, turnSign = 1, desync = 0, rollRear = 0, lastWUse = 0;""",
"""      driftAmt = 0, turnSign = 1, desync = 0, rollRear = 0;""")
open(p,'w',encoding='utf-8').write(s)
print('wired yawG + demand-based latency comp')
PY
node --check content.js && echo VALID && node -e "
const fs=require('fs'); const src=fs.readFileSync('content.js','utf8');
const svg=src.match(/truck\.innerHTML = \`([\s\S]*?)\`;/)[1];
const o=(svg.match(/<g[ >]/g)||[]).length, c=(svg.match(/<\/g>/g)||[]).length;
console.log('svg <g> balance:', o, c, o===c?'OK':'*** MISMATCH ***');
for (const id of ['__tkYaw','__tkChassis','__wFL','__wFR','__lugRL']) if(!svg.includes(id)) console.log('MISSING',id);
" && grep -c "truckOmega\|truckDir" content.js
```

## 080 — 2026-08-23T23:11:34 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && grep -n "truckOmega\|truckDir" content.js
```

## 081 — 2026-08-23T23:12:16 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && sed -n '/function measureBody/,/^  }$/p' content.js
```

## 082 — 2026-08-23T23:12:59 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
p='content.js'; s=open(p,encoding='utf-8').read()
# lastTravel: the travel direction the width-scan cuts across
s = s.replace("""  let bodyPx = SIZE.ref, sizeScale = 1, sizeCtx = null;""",
"""  let bodyPx = SIZE.ref, sizeScale = 1, sizeCtx = null, lastTravel = -Math.PI / 2;""")
# ref/max retuned for a WIDTH measurement (the old numbers were for the inflated area estimate)
s = s.replace("""  const SIZE = { box: 132, ref: 34, min: 0.75, max: 3.0, ema: 0.05, warm: 26, minPx: 60 };""",
"""  const SIZE = { box: 132, ref: 40, min: 0.75, max: 2.1, ema: 0.05, warm: 26 };   // ref/max retuned for the width estimator""")
# keep lastTravel fresh from the anchor direction
s = s.replace("""        if (dirRef > Math.PI) dirRef -= 2 * Math.PI; else if (dirRef < -Math.PI) dirRef += 2 * Math.PI;""",
"""        if (dirRef > Math.PI) dirRef -= 2 * Math.PI; else if (dirRef < -Math.PI) dirRef += 2 * Math.PI;
        lastTravel = dirRef;                                    // the width scan cuts across this""")
open(p,'w',encoding='utf-8').write(s)
print('patched')
PY
node --check content.js && echo VALID && for k in "lastTravel = -Math.PI" "lastTravel = dirRef" "ref: 40" "runs\[runs.length >> 1\]" "yawG.setAttribute" "lastWUse = wUse" "omUse"; do printf "%-28s %s\n" "$k" "$(grep -c "$k" content.js)"; done
```

## 083 — 2026-08-23T23:13:16 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && grep -n "flowOm >= 0.006\|Math.abs(flowOm) >= 0.006\|flowOm \* stale" content.js && sed -n '/if (Math.abs(flowOm)/,/}/p' content.js | head -8
```

## 084 — 2026-08-23T23:14:06 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
p='content.js'; s=open(p,encoding='utf-8').read()

# (1) ratio test: require the winning match to clearly beat the best DISTINCT rival.
old = """    let best = Infinity, bx = 0, by = 0, sum = 0, n = 0;
    for (let oy = -(R - 1); oy <= R - 1; oy += 2) for (let ox = -(R - 1); ox <= R - 1; ox += 2) {
      const v = sad(ox, oy); sum += v; n++;
      if (v < best) { best = v; bx = ox; by = oy; }
    }
    const coarseMean = sum / n;"""
new = """    let best = Infinity, bx = 0, by = 0, sum = 0, n = 0;
    for (let oy = -(R - 1); oy <= R - 1; oy += 2) for (let ox = -(R - 1); ox <= R - 1; ox += 2) {
      const v = sad(ox, oy); sum += v; n++;
      if (v < best) { best = v; bx = ox; by = oy; }
    }
    const coarseMean = sum / n;
    /* RATIO TEST — the arena is a repeating hex pattern, so a periodic texture can match
       almost as well one tile over, which is how we measured 180-degree direction flips
       (turn rate 3.14 rad/frame against a real cap of 0.12). Demand that the winner beat
       the best rival that is FAR AWAY in offset space, not merely the mean. */
    let rival = Infinity;
    for (let oy = -(R - 1); oy <= R - 1; oy += 2) for (let ox = -(R - 1); ox <= R - 1; ox += 2) {
      if (Math.abs(ox - bx) <= 3 && Math.abs(oy - by) <= 3) continue;      // skip the winner's own basin
      const v = sad(ox, oy);
      if (v < rival) rival = v;
    }
    if (best > rival * FLOWP.ratio) return null;                            // ambiguous: two equally good tiles"""
assert old in s
s = s.replace(old, new)

# (2) ratio constant
s = s.replace("""  const FLOWP = { patch: 32, search: 17, spots:""",
"""  const FLOWP = { patch: 32, search: 17, ratio: 0.80, maxTurn: 0.22, maxSpdJump: 2.6, spots:""")

# (3) plausibility gate on the accepted vector
old2 = """            const k = flowCvRef.clientWidth / cur.vw;                       // video px -> CSS px
            const dtF = Math.max(0.75, (now - flowPrevT) / (1000 / 60));     // elapsed 60fps-frames
            flow.vx = mx * k / dtF; flow.vy = my * k / dtF;
            flow.lastGood = now; flow.ok = true;
            study.flowHits++;"""
new2 = """            const k = flowCvRef.clientWidth / cur.vw;                       // video px -> CSS px
            const dtF = Math.max(0.75, (now - flowPrevT) / (1000 / 60));     // elapsed 60fps-frames
            const nvx = mx * k / dtF, nvy = my * k / dtF;
            /* PLAUSIBILITY GATE — the worm cannot turn faster than ~0.12 rad/frame nor
               change speed instantly. A sample that claims otherwise is a mis-match, so
               drop it instead of teleporting the trail and the truck. */
            const nSpd = Math.hypot(nvx, nvy), oSpd = Math.hypot(flow.vx, flow.vy);
            let plausible = true;
            if (flow.ok && oSpd > 1.5 && nSpd > 1.5) {
              const dTurn = Math.abs(angDiff(Math.atan2(nvy, nvx), Math.atan2(flow.vy, flow.vx))) / dtF;
              if (dTurn > FLOWP.maxTurn) plausible = false;
              else if (nSpd > oSpd * FLOWP.maxSpdJump || nSpd * FLOWP.maxSpdJump < oSpd) plausible = false;
            }
            if (!plausible) { study.flowMisses++; study.rejected++; }
            else {
            flow.vx = nvx; flow.vy = nvy;
            flow.lastGood = now; flow.ok = true;
            study.flowHits++;
            }"""
assert old2 in s
s = s.replace(old2, new2)

# (4) count rejections so the gate is measurable
s = s.replace("""  const study = { t0: performance.now(), frames: 0, flowHits: 0, flowMisses: 0,""",
"""  const study = { t0: performance.now(), frames: 0, flowHits: 0, flowMisses: 0, rejected: 0,""")
s = s.replace("""maxSpd: +s.spdMax.toFixed(2), turnRateP95:""",
"""maxSpd: +s.spdMax.toFixed(2), rejected: s.rejected, turnRateP95:""")
open(p,'w',encoding='utf-8').write(s)
print('flow hardened')
PY
node --check content.js && echo VALID && for k in "ratio: 0.80" "rival \* FLOWP.ratio" "PLAUSIBILITY GATE" "rejected: 0" "rejected: s.rejected"; do printf "%-26s %s\n" "$k" "$(grep -c "$k" content.js)"; done
```

## 085 — 2026-08-23T23:14:23 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && grep -n "maxSpd: +s.spdMax" content.js
```

## 086 — 2026-08-23T23:17:12 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
p='content.js'; s=open(p,encoding='utf-8').read()
a="""      return { secs: +secs.toFixed(1), frames: s.frames, flowHits: s.flowHits, flowMisses: s.flowMisses,"""
b="""      return { secs: +secs.toFixed(1), frames: s.frames, flowHits: s.flowHits, flowMisses: s.flowMisses, flowRejected: s.rejected,"""
assert a in s; s=s.replace(a,b)
a2="""    reset() { study.t0 = performance.now(); study.frames = 0; study.flowHits = 0; study.flowMisses = 0; study.freshFrames = 0;"""
b2="""    reset() { study.t0 = performance.now(); study.frames = 0; study.flowHits = 0; study.flowMisses = 0; study.rejected = 0; study.freshFrames = 0;"""
assert a2 in s; s=s.replace(a2,b2)
open(p,'w',encoding='utf-8').write(s)
print('ok')
PY
node --check content.js && echo VALID && grep -c "flowRejected" content.js && grep -c "study.rejected = 0" content.js
```

## 087 — 2026-08-23T23:17:26 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && for k in "__tkYaw" "dirRef" "lastWUse" "omUse" "betaSlide" "corrHard" "sizeScale" "runs.sort" "lastTravel" "FLOWP.ratio" "FLOWP.maxTurn"; do printf "%-16s %s\n" "$k" "$(grep -c -- "$k" content.js)"; done; echo "--- stale ---"; grep -c "truckDir\|truckOmega" content.js; echo "--- g balance ---"; echo "open=$(grep -o '<g[ >]' content.js | wc -l) close=$(grep -o '</g>' content.js | wc -l)"
```

## 088 — 2026-08-23T23:17:41 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
import io
p='manifest.json'; s=open(p,encoding='utf-8').read()
s=s.replace('"version": "3.0"','"version": "3.1"')
s=s.replace('monster truck head, blended steering','monster truck head with path-anchored vehicle dynamics, blended steering')
open(p,'w',encoding='utf-8').write(s)
print(s)
PY
```

## 089 — 2026-08-23T23:18:31 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && grep -n "__snakeRig\|destroy\|__rigArmed\|already\|__ARMED\|window.__truck *=\|__rec *=" content.js | head -40
```

## 090 — 2026-08-23T23:18:39 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && sed -n '812,830p' content.js
```

## 091 — 2026-08-23T23:20:25 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && cat > "C:/Users/<user>/AppData/Local/Temp/claude/C--Users-<user>/88fb0b96-1d38-4d66-ab8c-ad3209bd87d6/scratchpad/serve.py" << 'PY'
import http.server, socketserver, os
os.chdir(r"C:\Users\<user>\dev\xbox-snake\extension")
class H(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()
    def log_message(self, *a): pass
socketserver.TCPServer.allow_reuse_address = True
with socketserver.TCPServer(("127.0.0.1", 8781), H) as s:
    s.serve_forever()
PY
echo written
```

## 092 — 2026-08-23T23:21:28 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && grep -n "dirRef\|beta\|yawG.setAttribute\|truck.style.transform\|wErr\|const delta\|lastWUse\|capEff\|pathDir" content.js | sed -n '1,60p'
```

## 093 — 2026-08-23T23:22:31 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
p='content.js'; s=open(p,encoding='utf-8').read()
# hot-reload: destroy must clear the one-rig guard so a new build can arm
s = s.replace("      delete window.__snakeApp; } };",
              "      delete window.__snakeApp; window.__snakeRigLoaded = false; } };")
s = s.replace("say('\\ud83d\\udd25\\ud83d\\ude99 v3.0", "say('\\ud83d\\udd25\\ud83d\\ude99 v3.1")
s = s.replace("v3.0 \u2014 truck now GROWS with you, flames sit on the body. LB = 7 looks.",
              "v3.1 \u2014 truck steers off the STICK now, not the lagging camera. LB = 7 looks.")
s = s.replace("[snake rig v3.0 \u00b7 growing truck + inline flames \u00b7 extension] auto-loaded",
              "[snake rig v3.1 \u00b7 path-anchored steering + hardened flow \u00b7 extension] auto-loaded")
s = s.replace("localStorage.setItem('__snakeRig', '2.9 '", "localStorage.setItem('__snakeRig', '3.1 '")
open(p,'w',encoding='utf-8').write(s)
PY
node --check content.js && echo VALID && grep -n "v3.1\|__snakeRigLoaded = false" content.js
```

## 094 — 2026-08-23T23:25:46 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && grep -n "function frame(\|performance.now()" content.js | sed -n '1,30p'; echo "--- frame head ---"; sed -n "$(grep -n 'function frame(' content.js | head -1 | cut -d: -f1),+14p" content.js
```

## 095 — 2026-08-23T23:26:21 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
p='content.js'; s=open(p,encoding='utf-8').read()
old = "  function frame() {\n    if (!run) return;"
new = """  /* A throw anywhere in the render used to kill the rAF chain permanently, which
     reads to the player as "the controller stopped working" — that is exactly how a
     one-line telemetry typo took out steering. Keep the loop alive no matter what. */
  let rigErrs = 0;
  function frame() {
    try { frameInner(); }
    catch (e) {
      if (++rigErrs <= 5) console.error('[snake rig] frame error #' + rigErrs + ' — steering kept alive', e);
      requestAnimationFrame(frame);
    }
  }
  function frameInner() {
    if (!run) return;"""
assert old in s and s.count(old) == 1
s = s.replace(old, new)
open(p,'w',encoding='utf-8').write(s)
PY
node --check content.js && echo VALID && grep -c "frameInner" content.js && grep -c "requestAnimationFrame(frame)" content.js
```

## 096 — 2026-08-23T23:26:50 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && grep -n "__tkBody\|innerHTML" content.js | head -20
```

## 097 — 2026-08-23T23:28:38 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
p='content.js'; s=open(p,encoding='utf-8').read()
BODY = 'M20,30 Q14,48 20,66 L62,70 L82,64 Q90,56 90,48 Q90,40 82,32 L62,26 Z'

# --- 1. cast shadow becomes a group so it can be pushed opposite the lift
a = '    <ellipse cx="48" cy="48" rx="40" ry="19" fill="#000" opacity=".22"/>'
b = '    <g id="__tkShadow"><ellipse cx="48" cy="48" rx="43" ry="26" fill="#000" opacity=".30"/></g>'
assert s.count(a) == 1; s = s.replace(a, b)

# --- 2. ground contact patches, then everything that has HEIGHT goes in a lifted group
a2 = '''    <rect x="12" y="16" width="11" height="64" rx="3" fill="#454d57"/>
    <rect x="73" y="16" width="11" height="64" rx="3" fill="#454d57"/>'''
b2 = '''    <!-- 3D: the tyres touch the GROUND here (no lift) and the wheel bodies are drawn
         lifted, so the dark gap between the two reads as the tyre sidewall. -->
    <g fill="#06080a" opacity=".8">
      <rect x="1" y="0" width="30" height="18" rx="7"/><rect x="1" y="78" width="30" height="18" rx="7"/>
      <rect x="63" y="0" width="30" height="18" rx="7"/><rect x="63" y="78" width="30" height="18" rx="7"/>
    </g>
    <g id="__tkWheelLift">
    <rect x="12" y="16" width="11" height="64" rx="3" fill="#454d57"/>
    <rect x="73" y="16" width="11" height="64" rx="3" fill="#454d57"/>'''
assert s.count(a2) == 1; s = s.replace(a2, b2)

# --- 3. close the wheel lift, add the extruded body sides, open the full-height group
a3 = '    <g id="__tkChassis">\n'
b3 = '''    </g>
    <!-- body extrusion: same silhouette at ground level and at half height. The top
         face is drawn at full height, so these two peek out on the far side as the
         truck's flank. Cheaper and gap-free vs. stacking many copies. -->
    <path id="__tkSideLo" d="''' + BODY + '''" fill="#07090c"/>
    <path id="__tkSideMid" d="''' + BODY + '''" fill="#12171e"/>
    <g id="__tkLift">
    <g id="__tkChassis">
'''
assert s.count(a3) == 1; s = s.replace(a3, b3)

# --- 4. specular sheen that stays screen-up, then close the lift group
a4 = '''    <circle cx="30" cy="65" r="3.2" fill="#cfd6de" stroke="#6b7480"/><circle cx="30" cy="65" r="1.4" fill="#2a2f35"/>
    </g>
    </g>
  </svg>`;'''
b4 = '''    <circle cx="30" cy="65" r="3.2" fill="#cfd6de" stroke="#6b7480"/><circle cx="30" cy="65" r="1.4" fill="#2a2f35"/>
    </g>
    <!-- counter-rotated so the highlight always runs across the screen, not across the
         truck: a sheen that turned with the body would kill the illusion instantly. -->
    <g id="__tkGloss" opacity=".16"><ellipse cx="48" cy="44" rx="27" ry="8" fill="#fff"/></g>
    </g>
    </g>
  </svg>`;'''
assert s.count(a4) == 1; s = s.replace(a4, b4)
open(p,'w',encoding='utf-8').write(s)
print('svg restructured')
PY
node --check content.js && echo VALID && echo "g open=$(grep -o '<g[ >]' content.js | wc -l) close=$(grep -o '</g>' content.js | wc -l)"
```

## 098 — 2026-08-23T23:29:13 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
p='content.js'; s=open(p,encoding='utf-8').read()

# element refs
a = "  const yawG = truck.querySelector('#__tkYaw');          // carries the slip angle inside the travel-locked container"
b = """  const yawG = truck.querySelector('#__tkYaw');          // carries the slip angle inside the travel-locked container
  const liftG = truck.querySelector('#__tkLift'), wheelLiftG = truck.querySelector('#__tkWheelLift'),
        sideMid = truck.querySelector('#__tkSideMid'), glossG = truck.querySelector('#__tkGloss'),
        shadowG = truck.querySelector('#__tkShadow');"""
assert s.count(a) == 1; s = s.replace(a, b)

# ride-height constants
a2 = "    leanLag: 0.12, leanG: 4.6, leanMax: 7, squat: 2.6, roll: 0.55, scrub: 0.9"
b2 = "    leanLag: 0.12, leanG: 4.6, leanMax: 7, squat: 2.6, roll: 0.55, scrub: 0.9,\n    hBody: 9.0, hWheel: 0.46, hSquash: 0.10"
assert s.count(a2) == 1; s = s.replace(a2, b2)

# per-frame 3D: lift the body, half-lift the wheels, keep sheen and shadow screen-anchored
a3 = """        rollDist = (rollDist + m2.spd * dtR * TRUCK.roll) % 7;                                  // front rolls"""
b3 = """        /* PSEUDO-3D. The whole SVG is rotated by the heading, so a height offset baked
           into the art would rotate with the truck and read as a sideways smear. Instead
           the offset is counter-rotated every frame, so "up" is always up ON SCREEN
           however the truck is pointing — that is the whole illusion. */
        const thS = dirRef + beta;                       // the body's true on-screen angle
        const sTh = Math.sin(thS), cTh = Math.cos(thS);
        const H = TRUCK.hBody * (1 - Math.abs(aLatLag) * TRUCK.hSquash);   // suspension compresses in a corner
        const ux = -H * sTh, uy = -H * cTh;              // R(-th) . (0,-H) = screen-up, in SVG space
        liftG.setAttribute('transform', `translate(${ux.toFixed(2)} ${uy.toFixed(2)})`);
        sideMid.setAttribute('transform', `translate(${(ux * .5).toFixed(2)} ${(uy * .5).toFixed(2)})`);
        wheelLiftG.setAttribute('transform',
          `translate(${(ux * TRUCK.hWheel).toFixed(2)} ${(uy * TRUCK.hWheel).toFixed(2)})`);
        glossG.setAttribute('transform', `rotate(${(-thS * 180 / Math.PI).toFixed(1)} 48 44)`);
        const shN = 0.42 * H;                            // shadow falls the other way, off dirRef only
        shadowG.setAttribute('transform',
          `translate(${(shN * Math.sin(dirRef)).toFixed(2)} ${(shN * Math.cos(dirRef)).toFixed(2)})`);
        rollDist = (rollDist + m2.spd * dtR * TRUCK.roll) % 7;                                  // front rolls"""
assert s.count(a3) == 1; s = s.replace(a3, b3)
open(p,'w',encoding='utf-8').write(s)
print('3d wired')
PY
node --check content.js && echo VALID
```

## 099 — 2026-08-23T23:30:25 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && grep -n "LOOKS\|function animate\|alpha\|flicker\|amp\|function paint\|src\[o\|dst\[" skinfire.js | head -50
```

## 100 — 2026-08-23T23:31:10 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && grep -n "var ART\b\|ART = {\|ART_PREF\|api.captured\|FP =\|fingerprint" skinfire.js | head -20; echo "--- ART decl ---"; sed -n "$(grep -n 'ART_PREF' skinfire.js | head -1 | cut -d: -f1),+6p" skinfire.js
```

## 101 — 2026-08-23T23:31:47 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
p='skinfire.js'; s=open(p,encoding='utf-8').read()

# 1. registry slot for the equipped skin's own untouched cells
a = """    fish:  { hash: '7c4c8ef3', body: null, head: null }
  };"""
b = """    fish:  { hash: '7c4c8ef3', body: null, head: null },
    /* 'orig' is not a fire atlas: it is the equipped skin's OWN cells, grabbed a moment
       before we paint over them. That silhouette is what makes a clean round white
       snake possible - flame art would give a flame-shaped white blob instead. */
    orig:  { hash: null, body: null, head: null }
  };"""
assert s.count(a) == 1; s = s.replace(a, b)

# 2. inverse of blit
a2 = """  function blit(dst, dw, src, cell) {"""
b2 = """  function extract(src, sw, cell) {
    var out = new Uint8Array(cell.w * cell.h * 4);
    for (var y = 0; y < cell.h; y++) {
      var sO = ((cell.y + y) * sw + cell.x) * 4, d = y * cell.w * 4;
      for (var i = 0; i < cell.w * 4; i++) out[d + i] = src[sO + i];
    }
    return out;
  }

  function blit(dst, dw, src, cell) {"""
assert s.count(a2) == 1; s = s.replace(a2, b2)

# 3. grab the originals before the fire art goes down
a3 = """              if (artBody) { blit(px, rec.w, artBody, CELL.body); blit(px, rec.w, artHead, CELL.head); }"""
b3 = """              ART.orig.body = extract(px, rec.w, CELL.body);      // BEFORE we overwrite them
              ART.orig.head = extract(px, rec.w, CELL.head);
              if (api.captured.indexOf('orig') < 0) api.captured.push('orig');
              if (artBody) { blit(px, rec.w, artBody, CELL.body); blit(px, rec.w, artHead, CELL.head); }"""
assert s.count(a3) == 1; s = s.replace(a3, b3)

# 4. mono (flat-colour) treatment in the animator
a4 = """    var amp = 0.30 * api.amp * look.amp;
    var aScale = look.alpha, flick = look.flicker;"""
b4 = """    var amp = 0.30 * api.amp * look.amp;
    var aScale = look.alpha, flick = look.flicker, mono = look.mono || null;"""
assert s.count(a4) == 1; s = s.replace(a4, b4)

a5 = """        var m = 1 + amp * k;
        var r = src[o] * m, g = src[o + 1] * m * 0.985, b = src[o + 2] * m * 0.94;   // hotter = shifts toward yellow-white"""
b5 = """        var m = 1 + amp * k;
        if (mono) {                                  // flat colour, source shape: keep the
          var mr = mono[0] * m, mg = mono[1] * m, mb = mono[2] * m;   // silhouette, drop the hue
          dst[o] = mr > 255 ? 255 : mr;
          dst[o + 1] = mg > 255 ? 255 : mg;
          dst[o + 2] = mb > 255 ? 255 : mb;
          continue;
        }
        var r = src[o] * m, g = src[o + 1] * m * 0.985, b = src[o + 2] * m * 0.94;   // hotter = shifts toward yellow-white"""
assert s.count(a5) == 1; s = s.replace(a5, b5)

# 5. the look itself
a6 = """    { id: 'notail', art: 'blaze', alpha: 0.00, flicker: false, amp: 1.0, trail: 'none' }"""
b6 = """    { id: 'notail', art: 'blaze', alpha: 0.00, flicker: false, amp: 1.0, trail: 'none' },
    /* James's pick: the loading-spinner white. Own-skin silhouette, flat white, amp 0
       so it does not shimmer - a clean white worm rather than a white flame. */
    { id: 'white',  art: 'orig',  alpha: 1.00, flicker: false, amp: 0.0, trail: 'puff', mono: [255, 255, 255] }"""
assert s.count(a6) == 1; s = s.replace(a6, b6)

# 6. carry mono through use()
a7 = """    if (!L && ART[name]) L = { id: name, art: name, alpha: 1, flicker: false, amp: 1 };   // raw art name still works"""
b7 = """    if (!L && ART[name]) L = { id: name, art: name, alpha: 1, flicker: false, amp: 1 };   // raw art name still works"""
assert s.count(a7) == 1
open(p,'w',encoding='utf-8').write(s)
print('white look added')
PY
node --check skinfire.js && echo VALID && grep -c "mono" skinfire.js && grep -c "ART.orig" skinfire.js
```

## 102 — 2026-08-23T23:32:55 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
p='content.js'; s=open(p,encoding='utf-8').read()

a = """        if (live) {
          const res = angDiff(pathDir, dirRef);
          const kk = TRUCK.corr * (1 + TRUCK.corrHard * Math.min(1, Math.abs(res) / 0.6));
          dirRef += res * Math.min(1, kk * dtR);
          const lim = Math.abs(res) > 2.0 ? 3 : TRUCK.snapFr;
          if (Math.abs(res) > TRUCK.snapErr) { desync += dtR; if (desync > lim) { dirRef = pathDir; beta *= 0.3; desync = 0; } }
          else desync = 0;
        }"""
b = """        if (live) {
          /* Temporal outlier filter. A real reversal shows up as MANY consecutive frames
             agreeing on the new direction; a bad block match is one frame disagreeing
             with its neighbours. Measured: the old code snapped on 3 frames and snapped
             FASTER the wilder the disagreement, which is exactly backwards -- that is
             what produced 175-degree nose flings. Now a big disagreement needs more
             proof, not less, and the nose is only ever pulled toward the agreed mean. */
          PH.x[PH.i] = Math.cos(pathDir); PH.y[PH.i] = Math.sin(pathDir);
          let mx = 0, my = 0;
          for (let i = 0; i < PH.f; i++) { mx += PH.x[i]; my += PH.y[i]; }
          const meanDir = PH.f ? Math.atan2(my, mx) : pathDir;
          const coh = PH.f ? Math.hypot(mx, my) / PH.f : 0;      // 1 = all frames agree
          const dev = PH.f >= 4 ? Math.abs(angDiff(pathDir, meanDir)) : 0;
          if (dev > TRUCK.outlier) {
            if (++PH.rej >= TRUCK.flush) { PH.f = 0; PH.i = 0; PH.rej = 0; }   // sustained -> real reversal
          } else {
            PH.rej = 0;
            PH.i = (PH.i + 1) % PH.n; if (PH.f < PH.n) PH.f++;
            const res = angDiff(meanDir, dirRef);
            const kk = TRUCK.corr * coh * (1 + TRUCK.corrHard * Math.min(1, Math.abs(res) / 0.6));
            dirRef += res * Math.min(1, kk * dtR);
            const lim = TRUCK.snapFr * (1 + 4 * Math.min(1, Math.abs(res) / 2.0));
            if (Math.abs(res) > TRUCK.snapErr && coh > TRUCK.cohMin) {
              desync += dtR;
              if (desync > lim) { dirRef = meanDir; beta *= 0.3; desync = 0; }
            } else desync = Math.max(0, desync - dtR);
          }
        }"""
assert s.count(a) == 1; s = s.replace(a, b)

# ring buffer + gates
a2 = "    hBody: 9.0, hWheel: 0.46, hSquash: 0.10"
b2 = "    hBody: 9.0, hWheel: 0.46, hSquash: 0.10,\n    outlier: 1.15, flush: 7, cohMin: 0.62"
assert s.count(a2) == 1; s = s.replace(a2, b2)

a3 = """  let dirRef = -Math.PI / 2, beta = 0, aLatPrev = 0, aLatLag = 0, spdS = 3.4,"""
b3 = """  const PH = { n: 12, x: new Float64Array(12), y: new Float64Array(12), i: 0, f: 0, rej: 0 };
  let dirRef = -Math.PI / 2, beta = 0, aLatPrev = 0, aLatLag = 0, spdS = 3.4,"""
assert s.count(a3) == 1; s = s.replace(a3, b3)

# truck a little smaller at the start
a4 = "const SIZE = { box: 132, ref: 40,"
assert s.count(a4) == 1
import re
m = re.search(r"const SIZE = \{[^}]*\}", s)
old = m.group(0)
new = "const SIZE = { box: 132, ref: 54, min: 0.58, max: 1.90, ema: 0.05, warm: 26, minPx: 60 }"
s = s.replace(old, new)
open(p,'w',encoding='utf-8').write(s)
print('OLD SIZE:', old); print('NEW SIZE:', new)
PY
node --check content.js && echo VALID
```

## 103 — 2026-08-23T23:33:10 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && grep -n "SIZE\.\|7 looks\|LOOKS.length" content.js skinfire.js | head -20
```

## 104 — 2026-08-23T23:33:33 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
p='content.js'; s=open(p,encoding='utf-8').read()
s = s.replace(", warm: 26, minPx: 60 }", ", warm: 26, bright: 200 }")

# the size scan looked for ORANGE only; a white body reads R==B and would measure as zero,
# so the truck would stop growing in James's look.
a = "      return d[i] > d[i + 2] + SIZE.warm;                       // R > B: fire art, never the teal arena"
b = """      /* fire art is orange (R>B); the 'white' look is near-greyscale, so accept a
         bright pixel too. The teal arena is neither: it sits around R94 G154 B165. */
      return d[i] > d[i + 2] + SIZE.warm ||
             (d[i] > SIZE.bright && d[i + 1] > SIZE.bright && d[i + 2] > SIZE.bright);"""
assert s.count(a) == 1; s = s.replace(a, b)

s = s.replace("v3.1 \u2014 truck steers off the STICK now, not the lagging camera. LB = 7 looks.",
              "v3.2 \u2014 3D truck, stick-anchored steering, + WHITE body for James. LB = 8 looks.")
s = s.replace("[snake rig v3.1 \u00b7 path-anchored steering + hardened flow \u00b7 extension] auto-loaded",
              "[snake rig v3.2 \u00b7 3D truck + path-anchored steering + white look \u00b7 extension] auto-loaded")
s = s.replace("localStorage.setItem('__snakeRig', '3.1 '", "localStorage.setItem('__snakeRig', '3.2 '")
open(p,'w',encoding='utf-8').write(s)

p2='manifest.json'; m=open(p2,encoding='utf-8').read()
m = m.replace('"version": "3.1"', '"version": "3.2"')
m = m.replace('monster truck head with path-anchored vehicle dynamics',
              'pseudo-3D monster truck head with path-anchored vehicle dynamics')
open(p2,'w',encoding='utf-8').write(m)
print('ok')
PY
node --check content.js && node --check skinfire.js && echo "BOTH VALID"
```

## 105 — 2026-08-23T23:37:35 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake" && grep -n "^## \|^# " README.md | head -30
```

## 106 — 2026-08-23T23:38:09 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake" && cat >> README.md << 'MD'

## v3.2 — The steering study: why the truck pointed the wrong way (2026-08-23)

His dad: *"the turning is off... do a 20 minute study and you'll see the truck and why it
steers wrong... the key is making the car as realistic as possible."* So we measured
instead of guessing. `extension/.study-rec.js` samples `window.__tel` (which the rig
publishes from the exact numbers it rendered) and reports heading error, wheel-sign
agreement and cross-correlation lag.

**Measured before → after (173 s of real driving each):**

| | v3.0 | v3.2 |
|---|---|---|
| truck nose vs. direction of travel, mean | 21.9° | **5.1°** |
| …p50 / p95 | 11.7° / 76° | 3.9° / 12.0° |
| front wheels point the right way (vs. actual turn) | 76.3% | **91.8%** |
| front wheels point the right way (vs. what the stick asked) | — | **99.4%** |
| lag, nose behind travel | 3 frames (r=0.24) | **0 frames (r=0.81)** |

### The three defects the study found

1. **The truck was steering off the wrong signal.** It chased `flowDir` — the direction
   derived from optical flow — which is itself 3–5 frames behind the stick. Stacked with
   the truck's own spring-damper, the nose ran ~4 frames behind reality. The stick is the
   only zero-latency truth available, so v3.1 **dead-reckons** the nose from the stick
   demand (clamped to the worm's real turn-rate cap) and uses flow only as a slow
   correction. That single change is most of the 22°→5° improvement, and it is why the
   lag went to literally zero.
2. **The wheels were driven by the truck's own lagging yaw**, so they agreed with the
   real turn only 76% of the time. They now come off the *raw* aim heading — the driver's
   request — which is both correct and what a driver expects to see.
3. **Optical flow produced impossible 180° flips.** The arena is a repeating hex pattern,
   so a block match one tile over scores almost as well as the right one. Turn rates of
   3.14 rad/frame were being recorded against a real cap of 0.12. A first hypothesis
   (my latency compensation) was **tested and refuted** — with compensation off the flips
   survived, proving the corruption was in the raw match. Three fixes:
   - **ratio test**: the winning offset must beat the best rival *outside its own basin*
   - **plausibility gate**: reject a sample implying a turn faster than 0.22 rad/frame or
     a large instant speed change
   - **temporal outlier filter**: the nose is only ever corrected toward the *mean* of the
     last 12 agreeing flow samples. The old snap logic had it exactly backwards — a bigger
     disagreement snapped *faster* (3 frames), which is precisely how a single bad match
     flung the nose 175°. Now a bigger disagreement needs *more* proof, and a genuine
     reversal is recognised by 7 consecutive outliers flushing the history.

### Pseudo-3D truck
The truck is a top-down sprite, so height is faked with three layers: wheels/tyre contact
patches on the ground, wheel bodies at 46% height, chassis at full height, with the body
silhouette drawn at ground and half height so its flank shows on the far side.
**The offset is counter-rotated by `dirRef + beta` every frame** so "up" is always up *on
screen* whatever way the truck points — bake it into the art instead and it rotates with
the body and reads as a sideways smear. The specular sheen is counter-rotated for the same
reason. The existing weight-transfer `lean` now shifts the top face against the base, so
cornering reads as real body roll.

### 8th look: `white`
James wanted "a white snake like the loading wheel". Flame art would give a flame-shaped
white blob, so `skinfire.js` now grabs the equipped skin's **own** cells (`ART.orig`) a
moment before it paints over them, and the `mono` treatment keeps that silhouette while
flattening the colour to white with `amp: 0` (no shimmer). Note the size estimator had to
learn about it: it detected the body by `R > B + 26` (orange), which is blind to a
near-greyscale body, so it now also accepts any pixel brighter than 200 on all channels —
without that the truck stops growing in white.

### Gotchas worth keeping
- **A throw anywhere in the render used to kill the rAF chain permanently**, which the
  player experiences as *"the controller doesn't work"* — a one-line telemetry typo
  (`now` vs `nowT`) took out steering this session. `frame()` is now a try/catch wrapper
  around `frameInner()` that re-schedules on error, so a render bug can never cost input.
- **Measure from what the render actually used.** The v3.0 recorder re-derived heading from
  DOM transforms and scored a signal the render never consumed. `window.__tel` is published
  inside the render block for exactly this reason.
- Hot-reload without pasting source: serve `extension/` over `http://127.0.0.1` with
  `Access-Control-Allow-Origin: *` and `(0,eval)(await (await fetch(...)).text())` from the
  page. `http://127.0.0.1` is a *potentially trustworthy* origin, so Chrome does **not**
  mixed-content-block it (an earlier note here claimed otherwise — that was wrong).
  `skinfire.js` still needs `document_start`, so it goes in via a **synchronous XHR** inside
  `navigate_page`'s `initScript`.
- `__snakeApp.destroy()` now clears `window.__snakeRigLoaded` so a new build can arm.
MD
echo "appended"; grep -c "v3.2" README.md
```

## 107 — 2026-08-23T23:39:04 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && grep -n "function fireFrame\|createRadialGradient\|FIRE = {\|trailMode\|emberR\|function killFire\|arc(" content.js | head -30
```

## 108 — 2026-08-23T23:40:22 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && sed -n "$(grep -n 'function tick' skinfire.js | head -1 | cut -d: -f1),+24p" skinfire.js
```

## 109 — 2026-08-23T23:40:44 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
p='skinfire.js'; s=open(p,encoding='utf-8').read()

# per-cell alpha so a look can hide the BODY but keep the HEAD. The truck covers the head
# anyway, and the size estimator scans the head - hide it and the truck stops growing.
a = "  function animate(src, dst, dw, dh, t, seed) {"
b = "  function animate(src, dst, dw, dh, t, seed, alphaOverride) {"
assert s.count(a) == 1; s = s.replace(a, b)
a = "    var aScale = look.alpha, flick = look.flicker, mono = look.mono || null;"
b = "    var aScale = (alphaOverride == null ? look.alpha : alphaOverride), flick = look.flicker, mono = look.mono || null;"
assert s.count(a) == 1; s = s.replace(a, b)
a = "      animate(artHead, outHead, CELL.head.w, CELL.head.h, t, 1.7);"
b = "      animate(artHead, outHead, CELL.head.w, CELL.head.h, t, 1.7,\n              look.alphaHead == null ? null : look.alphaHead);"
assert s.count(a) == 1; s = s.replace(a, b)

# 'off' becomes 'firetail': body gone, HEAD KEPT (hidden under the truck, keeps size
# measurable), and the rig draws a real-flame tail along the head's traced path.
a = """    { id: 'off',    art: 'blaze', alpha: 0.00, flicker: false, amp: 1.0, trail: 'long' },"""
b = """    { id: 'firetail', art: 'blaze', alpha: 0.00, alphaHead: 1.00, flicker: false, amp: 1.0, trail: 'long' },"""
assert s.count(a) == 1; s = s.replace(a, b)

# expose the decoded flame sprite so the rig can stamp the GAME's own flame art
a = "  api.use = function (name) {"
b = """  /* The rig's overlay tail used to be canvas radial gradients. Hand it the game's real
     decoded flame sprite instead, so "the flame" is literally the game's flame. */
  var SPR = {};
  api.spriteCanvas = function (part, artName) {
    part = part || 'body';
    var name = artName || (ART.snake.body ? 'snake' : 'blaze');
    var a = ART[name];
    if (!a || !a[part]) return null;
    var key = name + ':' + part;
    if (SPR[key]) return SPR[key];
    var cell = part === 'head' ? CELL.head : CELL.body;
    var c = document.createElement('canvas');
    c.width = cell.w; c.height = cell.h;
    try {
      c.getContext('2d').putImageData(new ImageData(new Uint8ClampedArray(a[part]), cell.w, cell.h), 0, 0);
    } catch (e) { api.errors.push('spr ' + String(e).slice(0, 60)); return null; }
    SPR[key] = c;
    return c;
  };

  api.use = function (name) {"""
assert s.count(a) == 1; s = s.replace(a, b)
s = s.replace("    api.bodyHidden = (L.alpha === 0);", "    api.bodyHidden = (L.alpha === 0);")
open(p,'w',encoding='utf-8').write(s)
print('ok')
PY
node --check skinfire.js && echo VALID && grep -c "alphaHead\|spriteCanvas\|firetail" skinfire.js
```

## 110 — 2026-08-23T23:41:17 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
p='content.js'; s=open(p,encoding='utf-8').read()

a = "  let embers = [], lastSpawnDir = null, spawnAcc = 0, fireLastT = null;"
b = """  let embers = [], lastSpawnDir = null, spawnAcc = 0, fireLastT = null;
  /* ---- PATH-SPINE FLAME TAIL --------------------------------------------------
     his dad: "we really want there to be no tail and the flame be the tail... and it
     has to manuver like a tail". Scattered drifting embers can never do that: they
     are a cloud, and a cloud does not corner. So record the head's actual PATH and
     stamp the game's own flame sprite along it. The spine nodes are world-anchored
     (they ride the measured camera drift, exactly like the embers did), so the tail
     bends through the same curve the worm did — because it IS that curve.
     Sampling is by ARC LENGTH, not per frame, so spacing stays even at any speed. */
  const TAIL = { step: 7, lenK: 8.5, wK: 0.78, taper: 0.62, rot: 0, glow: 0.85,
                 maxN: 190, wobble: 0.10, fade: 0.22 };
  window.__tail = TAIL;
  let spine = [], tailSpr = null, tailSprTried = 0;"""
assert s.count(a) == 1; s = s.replace(a, b)

a2 = "  const killFire = () => { if (embers.length) { embers.length = 0; fctx.clearRect(0, 0, fireCv.width, fireCv.height); } lastSpawnDir = null; prevBodyDir = null; spawnAcc = 0; fireLastT = null; };"
b2 = "  const killFire = () => { if (embers.length || spine.length) { embers.length = 0; spine.length = 0; fctx.clearRect(0, 0, fireCv.width, fireCv.height); } lastSpawnDir = null; prevBodyDir = null; spawnAcc = 0; fireLastT = null; };"
assert s.count(a2) == 1; s = s.replace(a2, b2)

# --- the tail renderer, and route 'long' mode through it instead of the ember cloud
a3 = """  function fireFrame(cx, cy, drift, boost, dtR) {
    const dir = drift.dir, spd = drift.spd;"""
b3 = """  function tailFrame(cx, cy, drift, boost, dtR, tSec) {
    if (!tailSpr && tailSprTried < 240) {          // art may not be captured yet on boot
      tailSprTried++;
      tailSpr = (window.__skinFire && window.__skinFire.spriteCanvas) ? window.__skinFire.spriteCanvas('body') : null;
    }
    for (const s of spine) { s.x += drift.dx * dtR; s.y += drift.dy * dtR; }
    if (!drift.still) {
      if (!spine.length) spine.push({ x: cx, y: cy });
      else {
        const h = spine[0], dx = cx - h.x, dy = cy - h.y, d = Math.hypot(dx, dy);
        if (d >= TAIL.step) {                      // fill in every step we covered this tick
          const k = Math.min(24, Math.floor(d / TAIL.step));
          for (let i = 1; i <= k; i++) spine.unshift({ x: h.x + dx * (i / k), y: h.y + dy * (i / k) });
        }
      }
    }
    /* length tracks the worm: thickness and length both grow with mass, and bodyPx is
       the only one of the two we can actually measure. */
    const want = Math.max(8, Math.min(TAIL.maxN, Math.round(TAIL.lenK * bodyPx / TAIL.step)));
    if (spine.length > want) spine.length = want;
    fctx.clearRect(0, 0, fireCv.width, fireCv.height);
    const N = spine.length;
    if (!N) return;
    if (!tailSpr) {                                // fallback: the old gradient blobs
      fctx.globalCompositeOperation = 'lighter';
      for (let i = N - 1; i >= 0; i--) {
        const u = i / (N - 1 || 1), r = bodyPx * TAIL.wK * (1 - TAIL.taper * u);
        fctx.globalAlpha = (1 - u * TAIL.fade) * TAIL.glow;
        fctx.drawImage(boost ? sprHot : sprCool, spine[i].x - r, spine[i].y - r, r * 2, r * 2);
      }
      fctx.globalCompositeOperation = 'source-over'; fctx.globalAlpha = 1;
      return;
    }
    fctx.globalCompositeOperation = 'lighter';
    for (let i = N - 1; i >= 0; i--) {             // tail first, head paints over it
      const s = spine[i], u = i / (N - 1 || 1);
      const f = spine[Math.max(0, i - 1)], k = spine[Math.min(N - 1, i + 1)];
      const ang = Math.atan2(f.y - k.y, f.x - k.x);
      const pulse = 1 + TAIL.wobble * Math.sin(i * 0.55 - tSec * 7);
      const w = bodyPx * TAIL.wK * (1 - TAIL.taper * u) * pulse * (boost ? 1.18 : 1);
      fctx.globalAlpha = (1 - u * TAIL.fade) * TAIL.glow;
      fctx.setTransform(1, 0, 0, 1, s.x, s.y);
      fctx.rotate(ang + TAIL.rot);
      fctx.drawImage(tailSpr, -w, -w, w * 2, w * 2);
    }
    fctx.setTransform(1, 0, 0, 1, 0, 0);
    fctx.globalCompositeOperation = 'source-over';
    fctx.globalAlpha = 1;
  }

  function fireFrame(cx, cy, drift, boost, dtR) {
    if (trailMode === 'long') return tailFrame(cx, cy, drift, boost, dtR, performance.now() / 1000);
    if (spine.length) spine.length = 0;
    const dir = drift.dir, spd = drift.spd;"""
assert s.count(a3) == 1; s = s.replace(a3, b3)
open(p,'w',encoding='utf-8').write(s)
print('tail in')
PY
node --check content.js && echo VALID
```

## 111 — 2026-08-23T23:41:41 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
p='content.js'; s=open(p,encoding='utf-8').read()

# Measured: flowRejected 1086 vs flowHits 1038 - the gates were throwing away as many
# good samples as they kept, and freshness fell to 30%. The temporal outlier filter
# downstream is the real defence, so the cheap gates can be much looser.
a = "ratio: 0.80, maxTurn: 0.22, maxSpdJump: 2.6,"
b = "ratio: 0.92, maxTurn: 0.42, maxSpdJump: 4.0,"
assert s.count(a) == 1; s = s.replace(a, b)

# coh was multiplying the correction gain AND gating the snap - double-penalising, which
# let the dead-reckoned nose drift (p95 error 12deg -> 28deg). Gate the snap only.
a2 = "            const kk = TRUCK.corr * coh * (1 + TRUCK.corrHard * Math.min(1, Math.abs(res) / 0.6));"
b2 = "            const kk = TRUCK.corr * (1 + TRUCK.corrHard * Math.min(1, Math.abs(res) / 0.6));"
assert s.count(a2) == 1; s = s.replace(a2, b2)

s = s.replace("// LB cycles the body look: blaze -> fire snake -> fish -> ghost -> ember -> invisible",
              "// LB cycles the body look: blaze -> fire snake -> fish -> ghost -> ember -> firetail -> notail -> white")
s = s.replace("      if (tMode === 'long') {         // body invisible: flames stand in for it\n        FIRE.life = 95; FIRE.boostLife = 120; FIRE.rate = 5; FIRE.boostRate = 9; FIRE.max = 700;",
              "      if (tMode === 'long') {         // 'firetail': body invisible, the path-spine flame IS the tail\n        FIRE.life = 95; FIRE.boostLife = 120; FIRE.rate = 5; FIRE.boostRate = 9; FIRE.max = 700;")
open(p,'w',encoding='utf-8').write(s)
print('ok')
PY
node --check content.js && echo VALID && grep -n "ratio: 0.92\|maxTurn: 0.42" content.js
```

## 112 — 2026-08-23T23:44:18 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
p='skinfire.js'; s=open(p,encoding='utf-8').read()

a = "  function animate(src, dst, dw, dh, t, seed, alphaOverride) {"
b = "  function animate(src, dst, dw, dh, t, seed, alphaOverride, isHead) {"
assert s.count(a) == 1; s = s.replace(a, b)

a = "    var aScale = (alphaOverride == null ? look.alpha : alphaOverride), flick = look.flicker, mono = look.mono || null;"
b = """    var aScale = (alphaOverride == null ? look.alpha : alphaOverride), flick = look.flicker;
    /* The head keeps its own art when monoHead is false: the loader snake has a DARK head
       on a white body, and the truck sits over the head anyway. */
    var mono = (look.mono && !(isHead && look.monoHead === false)) ? look.mono : null;
    var mGain = look.monoGain == null ? 1 : look.monoGain, mBias = look.monoBias == null ? 0 : look.monoBias;"""
assert s.count(a) == 1; s = s.replace(a, b)

a = """        if (mono) {                                  // flat colour, source shape: keep the
          var mr = mono[0] * m, mg = mono[1] * m, mb = mono[2] * m;   // silhouette, drop the hue
          dst[o] = mr > 255 ? 255 : mr;
          dst[o + 1] = mg > 255 ? 255 : mg;
          dst[o + 2] = mb > 255 ? 255 : mb;
          continue;
        }"""
b = """        if (mono) {
          /* Drop the HUE but KEEP the shading. A flat fill looked wrong to his dad against
             the real loader snake, because that snake is white *with* segment rings and
             rounded shading - flattening every pixel to 255 erases exactly the detail
             that makes it read as a snake instead of a white worm-shaped blob. */
          var lum = 0.299 * src[o] + 0.587 * src[o + 1] + 0.114 * src[o + 2];
          var v = lum * mGain + mBias;
          if (v > 255) v = 255; else if (v < 0) v = 0;
          var mm = (v / 255) * m;
          var mr = mono[0] * mm, mg = mono[1] * mm, mb = mono[2] * mm;
          dst[o] = mr > 255 ? 255 : mr;
          dst[o + 1] = mg > 255 ? 255 : mg;
          dst[o + 2] = mb > 255 ? 255 : mb;
          continue;
        }"""
assert s.count(a) == 1; s = s.replace(a, b)

a = """      animate(artHead, outHead, CELL.head.w, CELL.head.h, t, 1.7,
              look.alphaHead == null ? null : look.alphaHead);"""
b = """      animate(artHead, outHead, CELL.head.w, CELL.head.h, t, 1.7,
              look.alphaHead == null ? null : look.alphaHead, true);"""
assert s.count(a) == 1; s = s.replace(a, b)

a = """    { id: 'white',  art: 'orig',  alpha: 1.00, flicker: false, amp: 0.0, trail: 'puff', mono: [255, 255, 255] }"""
b = """    { id: 'white',  art: 'orig',  alpha: 1.00, alphaHead: 1.00, flicker: false, amp: 0.0, trail: 'puff',
      mono: [255, 255, 255], monoGain: 1.05, monoBias: 88, monoHead: false }"""
assert s.count(a) == 1; s = s.replace(a, b)
open(p,'w',encoding='utf-8').write(s)
print('ok')
PY
node --check skinfire.js && echo VALID
```

## 113 — 2026-08-23T23:45:28 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
p='skinfire.js'; s=open(p,encoding='utf-8').read()

# --- synthetic 'spinner' art: a flat-alpha white disc sized to the real sprite's footprint
a = "  function extract(src, sw, cell) {"
b = """  /* The loading-spinner snake is a SMOOTH white ribbon - no segment rings. Recolouring
     the game's body sprite cannot produce that: its disc has a soft alpha falloff, so
     overlapping segments leave darker valleys and read as lumps. A disc with FLAT alpha
     inside and a rim of only a few px unions with its neighbours into a seamless constant
     width ribbon, which is exactly the spinner. Radius is measured off the real sprite so
     the body stays the correct thickness. */
  function discFrom(ref, w, h) {
    var cx = w / 2, cy = h / 2, r = 0, i, x, y, dx, dy, d;
    for (y = 0; y < h; y++) for (x = 0; x < w; x++) {
      if (ref[(y * w + x) * 4 + 3] > 128) { dx = x - cx; dy = y - cy; d = Math.sqrt(dx * dx + dy * dy); if (d > r) r = d; }
    }
    if (r < 8) r = w * 0.44;                       // nothing measurable: sane default
    var out = new Uint8Array(w * h * 4), rim = Math.max(2, r * 0.07);
    for (y = 0; y < h; y++) for (x = 0; x < w; x++) {
      i = (y * w + x) * 4;
      dx = x - cx; dy = y - cy; d = Math.sqrt(dx * dx + dy * dy);
      var a2 = d <= r - rim ? 255 : (d >= r ? 0 : 255 * (r - d) / rim);
      out[i] = 255; out[i + 1] = 255; out[i + 2] = 255; out[i + 3] = a2;
    }
    return out;
  }

  function extract(src, sw, cell) {"""
assert s.count(a) == 1; s = s.replace(a, b)

# register it
a = """    orig:  { hash: null, body: null, head: null }
  };"""
b = """    orig:  { hash: null, body: null, head: null },
    spinner: { hash: null, body: null, head: null }        // synthesised, see discFrom()
  };"""
assert s.count(a) == 1; s = s.replace(a, b)

# build it right after we grab the originals
a = """              if (api.captured.indexOf('orig') < 0) api.captured.push('orig');"""
b = """              if (api.captured.indexOf('orig') < 0) api.captured.push('orig');
              ART.spinner.body = discFrom(ART.orig.body, CELL.body.w, CELL.body.h);
              ART.spinner.head = ART.orig.head;             // head keeps its shape (and its eyes)
              if (api.captured.indexOf('spinner') < 0) api.captured.push('spinner');"""
assert s.count(a) == 1; s = s.replace(a, b)

# mono: flat option + keep dark pixels dark, so the head's eyes survive
a = """    var mGain = look.monoGain == null ? 1 : look.monoGain, mBias = look.monoBias == null ? 0 : look.monoBias;"""
b = """    var mGain = look.monoGain == null ? 1 : look.monoGain, mBias = look.monoBias == null ? 0 : look.monoBias;
    var mFlat = !!look.monoFlat, mKeep = look.monoKeepDark == null ? -1 : look.monoKeepDark;"""
assert s.count(a) == 1; s = s.replace(a, b)

a = """          var lum = 0.299 * src[o] + 0.587 * src[o + 1] + 0.114 * src[o + 2];
          var v = lum * mGain + mBias;
          if (v > 255) v = 255; else if (v < 0) v = 0;
          var mm = (v / 255) * m;"""
b = """          var lum = 0.299 * src[o] + 0.587 * src[o + 1] + 0.114 * src[o + 2];
          if (lum < mKeep) {                       // eyes / dark markings stay dark
            dst[o] = src[o] * 0.30; dst[o + 1] = src[o + 1] * 0.30; dst[o + 2] = src[o + 2] * 0.32;
            continue;
          }
          var mm;
          if (mFlat) mm = m;                       // spinner white: no shading at all
          else {
            var v = lum * mGain + mBias;
            if (v > 255) v = 255; else if (v < 0) v = 0;
            mm = (v / 255) * m;
          }"""
assert s.count(a) == 1; s = s.replace(a, b)

a = """    { id: 'white',  art: 'orig',  alpha: 1.00, alphaHead: 1.00, flicker: false, amp: 0.0, trail: 'puff',
      mono: [255, 255, 255], monoGain: 1.05, monoBias: 88, monoHead: false }"""
b = """    /* James's pick, matched to the real "Joining a room..." spinner: flat white, smooth,
       dark eyes kept, no shimmer. Body art is the synthesised flat-alpha disc. */
    { id: 'white',  art: 'spinner', alpha: 1.00, alphaHead: 1.00, flicker: false, amp: 0.0, trail: 'puff',
      mono: [255, 255, 255], monoFlat: true, monoKeepDark: 105 }"""
assert s.count(a) == 1; s = s.replace(a, b)
open(p,'w',encoding='utf-8').write(s)
print('spinner art added')
PY
node --check skinfire.js && echo VALID
```

## 114 — 2026-08-23T23:47:13 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
p='content.js'; s=open(p,encoding='utf-8').read()

# a white-hot core sprite for the middle of the flame
a = "  const sprSmoke = mkSpr("
b = """  const sprCore = mkSpr([[0, 'rgba(255,255,240,.98)'], [.55, 'rgba(255,225,140,.75)'], [1, 'rgba(255,180,60,0)']]);
  const sprSmoke = mkSpr("""
assert s.count(a) == 1; s = s.replace(a, b)

old_start = "    if (!tailSpr) {                                // fallback: the old gradient blobs"
old_end = """    fctx.setTransform(1, 0, 0, 1, 0, 0);
    fctx.globalCompositeOperation = 'source-over';
    fctx.globalAlpha = 1;
  }

  function fireFrame(cx, cy, drift, boost, dtR) {"""
i0 = s.index(old_start); i1 = s.index(old_end) + len(old_end)
new = """    /* Stamping the game's flame SPRITE along the path looked like a hairy caterpillar:
       that art has spiky tendrils, and rotating one copy per node combs them out
       sideways. Fire along a path wants smooth layered passes instead — a wide dim
       glow, a hot body, and a white core — with the radius modulated by a travelling
       wave so the edge licks. Three cheap passes read as flame; one detailed sprite
       does not. */
    fctx.globalCompositeOperation = 'lighter';
    const base = bodyPx * TAIL.wK * (boost ? 1.16 : 1);
    for (let pass = 0; pass < 3; pass++) {
      const mul = pass === 0 ? TAIL.glowR : (pass === 1 ? 1 : TAIL.coreR);
      const spr = pass === 0 ? sprCool : (pass === 1 ? sprHot : sprCore);
      const aMul = pass === 0 ? TAIL.glowA : (pass === 1 ? TAIL.bodyA : TAIL.coreA);
      for (let i = N - 1; i >= 0; i--) {
        const p = spine[i], u = i / (N - 1 || 1);
        const lick = 1 + TAIL.wobble * Math.sin(i * 0.42 - tSec * 9 + pass);
        const taper = 1 - TAIL.taper * u * u;              // squared: holds width, then tucks
        const r = base * mul * taper * lick;
        if (r < 1.2) continue;
        // hot at the head, cooling and dying out at the tip
        fctx.globalAlpha = aMul * Math.min(1, (1 - u) / TAIL.fade) * (pass === 2 ? Math.max(0, 1 - u * 2.1) : 1);
        if (fctx.globalAlpha <= 0.012) continue;
        fctx.drawImage(spr, p.x - r, p.y - r, r * 2, r * 2);
      }
    }
    fctx.globalCompositeOperation = 'source-over';
    fctx.globalAlpha = 1;
  }

  function fireFrame(cx, cy, drift, boost, dtR) {"""
s = s[:i0] + new + s[i1:]

# retune the tail constants for the layered look
a2 = """  const TAIL = { step: 7, lenK: 8.5, wK: 0.78, taper: 0.62, rot: 0, glow: 0.85,
                 maxN: 190, wobble: 0.10, fade: 0.22 };"""
b2 = """  const TAIL = { step: 6, lenK: 9.0, wK: 0.60, taper: 0.55, maxN: 200, wobble: 0.16,
                 fade: 0.30,                     // last 30% of the length fades out
                 glowR: 2.10, glowA: 0.20,       // wide dim halo
                 bodyA: 0.62,                    // hot orange body
                 coreR: 0.46, coreA: 0.55 };     // white-hot centre, dies before the tip"""
assert s.count(a2) == 1; s = s.replace(a2, b2)
open(p,'w',encoding='utf-8').write(s)
print('layered tail')
PY
node --check content.js && echo VALID && grep -c "tailSpr" content.js
```

## 115 — 2026-08-23T23:48:32 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && grep -n "flowPrevT\|flow.lastGood\|flowGoodT" content.js | head
```

## 116 — 2026-08-23T23:48:47 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
p='content.js'; s=open(p,encoding='utf-8').read()

a = """            const nSpd = Math.hypot(nvx, nvy), oSpd = Math.hypot(flow.vx, flow.vy);
            let plausible = true;
            if (flow.ok && oSpd > 1.5 && nSpd > 1.5) {
              const dTurn = Math.abs(angDiff(Math.atan2(nvy, nvx), Math.atan2(flow.vy, flow.vx))) / dtF;
              if (dTurn > FLOWP.maxTurn) plausible = false;
              else if (nSpd > oSpd * FLOWP.maxSpdJump || nSpd * FLOWP.maxSpdJump < oSpd) plausible = false;
            }"""
b = """            const nSpd = Math.hypot(nvx, nvy), oSpd = Math.hypot(flow.vx, flow.vy);
            let plausible = true;
            /* Compare against the last ACCEPTED vector over the time since THAT vector.
               Dividing by dtF (time since the last frame) mixed time bases and rejected
               79% of good matches, because matches are sparse: two samples a third of a
               second apart legitimately differ by a lot of heading. */
            const dtG = Math.max(0.75, (now - (flow.lastGood || now)) / (1000 / 60));
            if (flow.ok && oSpd > 1.5 && nSpd > 1.5 && dtG < 45) {
              const dTurn = Math.abs(angDiff(Math.atan2(nvy, nvx), Math.atan2(flow.vy, flow.vx))) / dtG;
              if (dTurn > FLOWP.maxTurn) plausible = false;
              else if (nSpd > oSpd * FLOWP.maxSpdJump || nSpd * FLOWP.maxSpdJump < oSpd) plausible = false;
            }"""
assert s.count(a) == 1; s = s.replace(a, b)
open(p,'w',encoding='utf-8').write(s)
print('ok')
PY
node --check content.js && echo VALID
```

## 117 — 2026-08-23T23:50:51 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
p='skinfire.js'; s=open(p,encoding='utf-8').read()
# white: no overlay trail at all - the puff exhaust was painting a grey/orange core
# straight down the middle of the white body, which is what looked wrong.
a = "    { id: 'white',  art: 'spinner', alpha: 1.00, alphaHead: 1.00, flicker: false, amp: 0.0, trail: 'puff',"
b = "    { id: 'white',  art: 'spinner', alpha: 1.00, alphaHead: 1.00, flicker: false, amp: 0.0, trail: 'none',"
assert s.count(a) == 1; s = s.replace(a, b)
# firetail: keep the real body FAINTLY visible. His dad: "the flame needs to be almost
# exactly like the tail... so we know who we're hitting" - the game-drawn body is the
# only exact collision truth there is, and it also gives the length scan something to
# measure. The flame is drawn over it with 'lighter', so it still reads as flame.
a = "    { id: 'firetail', art: 'blaze', alpha: 0.00, alphaHead: 1.00, flicker: false, amp: 1.0, trail: 'long' },"
b = "    { id: 'firetail', art: 'blaze', alpha: 0.34, alphaHead: 1.00, flicker: false, amp: 1.0, trail: 'long' },"
assert s.count(a) == 1; s = s.replace(a, b)
open(p,'w',encoding='utf-8').write(s)
print('skinfire ok')
PY
node --check skinfire.js && echo VALID
```

## 118 — 2026-08-23T23:51:23 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
p='content.js'; s=open(p,encoding='utf-8').read()

# --- measure the REAL tail extent by walking the spine through the captured frame
a = "  function tailFrame(cx, cy, drift, boost, dtR, tSec) {"
b = """  /* HOW LONG IS THE TAIL, REALLY?  His dad: "the flame needs to be almost exactly like
     the tail ... so we know who we're hitting." Guessing the length from thickness is
     not good enough for that -- a flame drawn longer than your body would actively
     mislead you into a collision. So MEASURE it: the spine already holds the head's
     path in screen coordinates, so walk back along it through the captured video frame
     and find where the body's pixels stop. That index times the spine step IS the
     length, in the same units the ribbon is drawn in. */
  const EXT = { every: 5, w: 460, ema: 0.12, stepPx: 12, miss: 4, warm: 20, bright: 188 };
  let extCtx = null, extN = 0, tailLenPx = 0;
  function measureExtent() {
    if (++extN % EXT.every) return;
    if (!flowVid || !flowVid.videoWidth || !flowCvRef || spine.length < 4) return;
    if (!extCtx) {
      const c = document.createElement('canvas');
      c.width = EXT.w; c.height = Math.max(2, Math.round(EXT.w * flowVid.videoHeight / flowVid.videoWidth));
      extCtx = c.getContext('2d', { willReadFrequently: true });
    }
    const cw = extCtx.canvas.width, ch = extCtx.canvas.height;
    const r = flowCvRef.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) return;
    try { extCtx.drawImage(flowVid, 0, 0, cw, ch); } catch (_) { return; }
    let img;
    try { img = extCtx.getImageData(0, 0, cw, ch).data; } catch (_) { return; }
    const stepN = Math.max(1, Math.round(EXT.stepPx / TAIL.step));
    let lastHit = 0, miss = 0;
    for (let i = 0; i < spine.length; i += stepN) {
      const px = Math.round((spine[i].x - r.left) / r.width * cw);
      const py = Math.round((spine[i].y - r.top) / r.height * ch);
      if (px < 1 || py < 1 || px >= cw - 1 || py >= ch - 1) break;
      const o = (py * cw + px) * 4;
      const hit = img[o] > img[o + 2] + EXT.warm ||
                  (img[o] > EXT.bright && img[o + 1] > EXT.bright && img[o + 2] > EXT.bright);
      if (hit) { lastHit = i; miss = 0; }
      else if (++miss >= EXT.miss) break;
    }
    const len = lastHit * TAIL.step;
    if (len > 24) tailLenPx = tailLenPx ? tailLenPx + (len - tailLenPx) * EXT.ema : len;
  }

  function tailFrame(cx, cy, drift, boost, dtR, tSec) {"""
assert s.count(a) == 1; s = s.replace(a, b)

# --- use the measured extent, and err SHORT when it is unknown
a2 = """    /* length tracks the worm: thickness and length both grow with mass, and bodyPx is
       the only one of the two we can actually measure. */
    const want = Math.max(8, Math.min(TAIL.maxN, Math.round(TAIL.lenK * bodyPx / TAIL.step)));"""
b2 = """    measureExtent();
    /* Prefer the MEASURED body extent. Fall back to the thickness estimate only until
       the first measurement lands, and deliberately err short: a flame that overstates
       your reach is worse than one that understates it. */
    const lenPx = tailLenPx > 24 ? tailLenPx * TAIL.lenTrim : TAIL.lenK * bodyPx * 0.7;
    const want = Math.max(8, Math.min(TAIL.maxN, Math.round(lenPx / TAIL.step)));"""
assert s.count(a2) == 1; s = s.replace(a2, b2)

# --- width matched to the measured body, glow pulled in so it does not overstate the hitbox
a3 = """  const TAIL = { step: 6, lenK: 9.0, wK: 0.60, taper: 0.55, maxN: 200, wobble: 0.16,
                 fade: 0.30,                     // last 30% of the length fades out
                 glowR: 2.10, glowA: 0.20,       // wide dim halo
                 bodyA: 0.62,                    // hot orange body
                 coreR: 0.46, coreA: 0.55 };     // white-hot centre, dies before the tip"""
b3 = """  const TAIL = { step: 6, lenK: 9.0, lenTrim: 0.97, maxN: 240, taper: 0.34, wobble: 0.13,
                 wK: 0.68,                       // visible width ~= the measured body width
                 fade: 0.26,                     // the last stretch fades out
                 glowR: 1.55, glowA: 0.22,       // halo kept tight: it must not overstate reach
                 bodyA: 0.60,                    // hot orange body
                 coreR: 0.44, coreA: 0.52 };     // white-hot centre, dies before the tip"""
assert s.count(a3) == 1; s = s.replace(a3, b3)

# expose it for tuning + HUD
a4 = "  window.__tail = TAIL;"
b4 = "  window.__tail = TAIL;\n  window.__tailLen = () => tailLenPx;"
assert s.count(a4) == 1; s = s.replace(a4, b4)
open(p,'w',encoding='utf-8').write(s)
print('extent measurement in')
PY
node --check content.js && echo VALID && grep -n "flowVid\b" content.js | head -3
```

## 119 — 2026-08-23T23:51:43 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
p='content.js'; s=open(p,encoding='utf-8').read()
a = "`\\ud83d\\udd25 ${(window.__skinFire && window.__skinFire.lookId) || 'fire'} \\u00b7${' size ' + bodyPx.toFixed(0) + 'px'} \\u00b7 LB=look"
if a not in s:
    import re
    m = re.search(r"`\ud83d\udd25 \$\{\(window\.__skinFire.*?LB=look", s)
    print('pattern:', m.group(0) if m else 'NOT FOUND')
old = "size ' + bodyPx.toFixed(0) + 'px'} \u00b7 LB=look"
new = "size ' + bodyPx.toFixed(0) + 'px'}${tailLenPx > 24 ? ' \u00b7 tail ' + tailLenPx.toFixed(0) + 'px' : ''} \u00b7 LB=look"
assert s.count(old) == 1, s.count(old)
s = s.replace(old, new)
open(p,'w',encoding='utf-8').write(s)
print('hud ok')
PY
node --check content.js && echo VALID
```

## 120 — 2026-08-23T23:52:14 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
p='skinfire.js'; s=open(p,encoding='utf-8').read()
a = """    { id: 'white',  art: 'spinner', alpha: 1.00, alphaHead: 1.00, flicker: false, amp: 0.0, trail: 'none',"""
b = """    /* James: "one just fire too" - no car, no worm, the whole thing is flame. The faint
       body stays so the hitbox is still honest and the size scan still has something to
       read; the ribbon's white-hot core covers it. */
    { id: 'purefire', art: 'blaze', alpha: 0.34, alphaHead: 0.34, flicker: false, amp: 1.4,
      trail: 'long', hideTruck: true },
    { id: 'white',  art: 'spinner', alpha: 1.00, alphaHead: 1.00, flicker: false, amp: 0.0, trail: 'none',"""
assert s.count(a) == 1; s = s.replace(a, b)
a2 = "    api.trail = L.trail || 'puff';                    // the rig reads this to size its overlay flames"
b2 = """    api.trail = L.trail || 'puff';                    // the rig reads this to size its overlay flames
    api.hideTruck = !!L.hideTruck;                    // a look may ask the rig to drop the car"""
assert s.count(a2) == 1; s = s.replace(a2, b2)
open(p,'w',encoding='utf-8').write(s)

p2='content.js'; c=open(p2,encoding='utf-8').read()
a3 = """    if (LB && !pLB) { const r = window.__skinFire ? window.__skinFire.next() : 'no skin hook'; say('\\ud83d\\udd25 look: ' + r); } pLB = LB;"""
b3 = """    if (LB && !pLB) {
      const r = window.__skinFire ? window.__skinFire.next() : 'no skin hook';
      /* a look may prefer the car off ('purefire') or on; applied on the SWITCH only, so
         Y still overrides afterwards */
      if (window.__skinFire) truckOn = !window.__skinFire.hideTruck;
      say('\\ud83d\\udd25 look: ' + r + (truckOn ? '' : ' (no car)'));
    } pLB = LB;"""
assert c.count(a3) == 1; c = c.replace(a3, b3)
open(p2,'w',encoding='utf-8').write(c)
print('purefire added')
PY
node --check content.js && node --check skinfire.js && echo "BOTH VALID"
```

## 121 — 2026-08-23T23:52:28 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && grep -n "pLB = LB" content.js && grep -c "purefire" skinfire.js
```

## 122 — 2026-08-23T23:52:48 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && node --check content.js && node --check skinfire.js && echo "BOTH VALID" && grep -c "hideTruck" content.js skinfire.js
```

## 123 — 2026-08-23T23:57:12 (Bash)

```
curl -s -o /dev/null -w "server: %{http_code} %{size_download} bytes\n" http://127.0.0.1:8781/content.js 2>&1 | head -2; tail -c 400 "C:/Users/<user>/AppData/Local/Temp/claude/C--Users-<user>/88fb0b96-1d38-4d66-ab8c-ad3209bd87d6/tasks/b0uwial1o.output" 2>/dev/null || echo "(no server output)"
```

## 124 — 2026-08-23T23:59:10 (Bash)

```
cd "C:/Users/<user>/AppData/Local/Temp/claude/C--Users-<user>/88fb0b96-1d38-4d66-ab8c-ad3209bd87d6/scratchpad" && python - << 'PY'
open('serve.py','w',encoding='utf-8').write('''import http.server, os
from http.server import ThreadingHTTPServer
os.chdir(r"C:\\\\Users\\\\<user>\\\\dev\\\\xbox-snake\\\\extension")
class H(http.server.SimpleHTTPRequestHandler):
    protocol_version = "HTTP/1.1"
    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Cache-Control", "no-store")
        super().end_headers()
    def log_message(self, *a): pass
ThreadingHTTPServer.allow_reuse_address = True
ThreadingHTTPServer(("127.0.0.1", 8782), H).serve_forever()
''')
print('written')
PY
echo ok
```

## 125 — 2026-08-24T00:01:54 (Bash)

```
cd "C:/Users/<user>/.claude/projects/C--Users-<user>/memory" && python - << 'PY'
import re
p='xbox-snake-rig.md'; s=open(p,encoding='utf-8').read()
s = s.replace('description: "his dad\'s snake.io Xbox-controller browser rig lives at dev/xbox-snake (v2.3) — key facts so a future session doesn\'t re-derive two days of tuning"',
              'description: "his dad\'s snake.io Xbox-controller browser rig at dev/xbox-snake (v3.2) — the steering study, the path-spine flame tail, the 9 looks, and the traps that cost hours"')
s = s.replace('  modified: 2026-08-23T19:11:12.666Z', '  modified: 2026-08-23T23:50:00.000Z')
open(p,'w',encoding='utf-8').write(s)
print('ok')
PY
grep -n "v3.2" "C:/Users/<user>/.claude/projects/C--Users-<user>/memory/MEMORY.md" || sed -i 's|- \[Xbox snake rig\](xbox-snake-rig.md) — .*|- [Xbox snake rig](xbox-snake-rig.md) — snake.io controller rig at dev/xbox-snake (v3.2): steering study (22°→5°), path-spine flame tail with measured length, 9 looks, blend steering, the traps — don'"'"'t re-derive|' "C:/Users/<user>/.claude/projects/C--Users-<user>/memory/MEMORY.md"; grep -n "Xbox snake" "C:/Users/<user>/.claude/projects/C--Users-<user>/memory/MEMORY.md"
```

## 126 — 2026-08-24T00:03:15 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
p='content.js'; s=open(p,encoding='utf-8').read()
# The correction gain was tuned when flow was fresh ~33% of frames. Fixing the gate's
# time base took lock to ~89%, so the SAME per-frame gain now applies 3x as often and
# dragged the nose back onto the lagging flow signal: measured lag 0 -> 7 frames,
# mean error 6.7 -> 13.0 deg. The stick is the accurate signal; flow only removes slow
# drift, so the gain has to come down by roughly the same factor the lock went up.
a = "    steerK: 1.35, lock: 0.58, lockSpd: 0.035, counter: 0.55,"
assert s.count(a) == 1
old = s[s.index("    aimK: 0.30"):s.index("    steerK: 1.35")]
new = "    aimK: 0.30, cap: 0.12, capBoost: 0.90, corr: 0.045, corrHard: 1.5, snapErr: 1.00, snapFr: 10,\n"
s = s.replace(old, new)
open(p,'w',encoding='utf-8').write(s)
print('OLD:', old.strip()); print('NEW:', new.strip())
PY
node --check content.js && echo VALID
```

## 127 — 2026-08-24T00:03:45 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
p='skinfire.js'; s=open(p,encoding='utf-8').read()
a = """    /* James: "one just fire too" - no car, no worm, the whole thing is flame. The faint
       body stays so the hitbox is still honest and the size scan still has something to
       read; the ribbon's white-hot core covers it. */
    { id: 'purefire', art: 'blaze', alpha: 0.34, alphaHead: 0.34, flicker: false, amp: 1.4,
      trail: 'long', hideTruck: true },"""
b = """    /* James: "the flames that are coming out of the car" - so the CAR STAYS and the whole
       tail is the rig's own flame, with the game's body gone completely. Trade-off worth
       knowing: with the body at alpha 0 the length scan has nothing to read, so the tail
       holds the last length measured in a body-visible look ('firetail' keeps a faint
       body for exactly that reason). */
    { id: 'purefire', art: 'blaze', alpha: 0.00, alphaHead: 1.00, flicker: false, amp: 1.0,
      trail: 'long' },"""
assert s.count(a) == 1; s = s.replace(a, b)
open(p,'w',encoding='utf-8').write(s)
print('ok')
PY
node --check skinfire.js && echo VALID
```

## 128 — 2026-08-24T00:05:09 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
p='content.js'; s=open(p,encoding='utf-8').read()
a = """    measureExtent();
    /* Prefer the MEASURED body extent. Fall back to the thickness estimate only until
       the first measurement lands, and deliberately err short: a flame that overstates
       your reach is worse than one that understates it. */
    const lenPx = tailLenPx > 24 ? tailLenPx * TAIL.lenTrim : TAIL.lenK * bodyPx * 0.7;
    const want = Math.max(8, Math.min(TAIL.maxN, Math.round(lenPx / TAIL.step)));
    if (spine.length > want) spine.length = want;"""
b = """    /* Keep the spine LONGER than we draw. The scan walks the spine to find where the
       body ends, so trimming the spine to the measured length made it impossible to ever
       measure longer than itself — the tail locked at whatever it first read (47px on a
       70px-thick worm). The spine is the probe; `draw` is the answer. */
    if (spine.length > TAIL.maxN) spine.length = TAIL.maxN;
    measureExtent();
    /* Prefer the MEASURED body extent, and deliberately err short: a flame that
       overstates your reach is worse than one that understates it. */
    const lenPx = tailLenPx > 24 ? tailLenPx * TAIL.lenTrim : TAIL.lenK * bodyPx * 0.7;
    const want = Math.max(8, Math.round(lenPx / TAIL.step));"""
assert s.count(a) == 1; s = s.replace(a, b)

# draw only `want` nodes, not the whole probe spine
a2 = """    const N = spine.length;
    if (!N) return;"""
b2 = """    const N = Math.min(spine.length, want);
    if (!N) return;"""
assert s.count(a2) == 1; s = s.replace(a2, b2)
# probe reserve: 240 nodes * 6px = 1440px of path history
s = s.replace("lenTrim: 0.97, maxN: 240,", "lenTrim: 0.97, maxN: 320,")
open(p,'w',encoding='utf-8').write(s)
print('ok')
PY
node --check content.js && echo VALID
```

## 129 — 2026-08-24T00:06:21 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
p='content.js'; s=open(p,encoding='utf-8').read()
# The 'puff' exhaust had grown with bodyPx until its smoke was a 136px grey teardrop
# swamping the flame art it was supposed to complement. Small and hot, not big and grey.
a = "      const emberR = Math.max(7, bodyPx * (boost ? 0.62 : 0.52));"
b = "      const emberR = Math.max(5, bodyPx * (boost ? 0.36 : 0.29));"
assert s.count(a) == 1; s = s.replace(a, b)
a2 = """        const smokeA = t < .45 ? 0 : Math.min(1, (t - .45) / .2) * Math.pow(1 - t, 1.3);
        if (smokeA > .01) {
          const r = p.r * (1.15 + t * 1.4);"""
b2 = """        const smokeA = (t < .55 ? 0 : Math.min(1, (t - .55) / .2) * Math.pow(1 - t, 1.5)) * 0.34;
        if (smokeA > .01) {
          const r = p.r * (1.05 + t * 0.65);"""
assert s.count(a2) == 1; s = s.replace(a2, b2)
open(p,'w',encoding='utf-8').write(s)
print('ok')
PY
node --check content.js && echo VALID
```

## 130 — 2026-08-24T00:06:32 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && grep -n "smokeA" content.js && sed -n "$(grep -n 'smokeA' content.js | head -1 | cut -d: -f1),+4p" content.js
```

## 131 — 2026-08-24T00:06:45 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
p='content.js'; s=open(p,encoding='utf-8').read()
a = """      const smokeA = t < .45 ? 0 : Math.min(1, (t - .45) / .2) * Math.pow(1 - t, 1.3);
      if (smokeA > .01) {
        const r = p.r * (1.15 + t * 1.4);"""
b = """      const smokeA = (t < .55 ? 0 : Math.min(1, (t - .55) / .2) * Math.pow(1 - t, 1.5)) * 0.34;
      if (smokeA > .01) {
        const r = p.r * (1.05 + t * 0.65);"""
assert s.count(a) == 1; s = s.replace(a, b)
open(p,'w',encoding='utf-8').write(s)
print('ok')
PY
node --check content.js && echo VALID && grep -c "emberR = Math.max(5" content.js
```

## 132 — 2026-08-24T00:06:56 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && grep -n "emberR" content.js
```

## 133 — 2026-08-24T00:08:56 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
p='content.js'; s=open(p,encoding='utf-8').read()

a = "  const EXT = { every: 5, w: 460, ema: 0.12, stepPx: 12, miss: 4, warm: 20, bright: 188 };\n  let extCtx = null, extN = 0, tailLenPx = 0;"
b = """  const EXT = { every: 5, w: 460, ema: 0.12, stepPx: 12, miss: 9, warm: 18, bright: 185 };
  let extCtx = null, extN = 0, tailLenPx = 0, lenRatio = 0;"""
assert s.count(a) == 1; s = s.replace(a, b)

a2 = """    const stepN = Math.max(1, Math.round(EXT.stepPx / TAIL.step));
    let lastHit = 0, miss = 0;
    for (let i = 0; i < spine.length; i += stepN) {"""
b2 = """    const stepN = Math.max(1, Math.round(EXT.stepPx / TAIL.step));
    let lastHit = 0, miss = 0, headHits = 0, probes = 0;
    for (let i = 0; i < spine.length; i += stepN) {"""
assert s.count(a2) == 1; s = s.replace(a2, b2)

a3 = """      if (hit) { lastHit = i; miss = 0; }
      else if (++miss >= EXT.miss) break;
    }
    const len = lastHit * TAIL.step;
    if (len > 24) tailLenPx = tailLenPx ? tailLenPx + (len - tailLenPx) * EXT.ema : len;
  }"""
b3 = """      if (probes < 3 && hit) headHits++;
      probes++;
      if (hit) { lastHit = i; miss = 0; }
      else if (++miss >= EXT.miss) break;
    }
    /* Only trust the reading if the body is actually visible AT THE HEAD. Otherwise the
       walk is just picking up other players' bodies and dropped food that happen to lie
       on our path, which is how an invisible-body look read a 143px tail on a worm many
       times that long. */
    if (headHits < 2) return;
    const len = lastHit * TAIL.step;
    if (len > 24) {
      tailLenPx = tailLenPx ? tailLenPx + (len - tailLenPx) * EXT.ema : len;
      if (bodyPx > 8) {                            // remember length-per-thickness...
        const rr = tailLenPx / bodyPx;
        lenRatio = lenRatio ? lenRatio + (rr - lenRatio) * 0.05 : rr;
      }
    }
  }"""
assert s.count(a3) == 1; s = s.replace(a3, b3)

a4 = """    const lenPx = tailLenPx > 24 ? tailLenPx * TAIL.lenTrim : TAIL.lenK * bodyPx * 0.7;
    const want = Math.max(8, Math.round(lenPx / TAIL.step));"""
b4 = """    /* ...so a look that hides the body can still size its flame like the real tail. */
    const measured = extValid ? tailLenPx : 0;
    const lenPx = (measured > 24 ? measured : (lenRatio || TAIL.lenK) * bodyPx) * TAIL.lenTrim;
    const want = Math.max(8, Math.round(lenPx / TAIL.step));"""
assert s.count(a4) == 1; s = s.replace(a4, b4)

# track whether the current look can be measured at all
a5 = "    if (headHits < 2) return;"
b5 = "    extValid = headHits >= 2;\n    if (!extValid) return;"
assert s.count(a5) == 1; s = s.replace(a5, b5)
s = s.replace("let extCtx = null, extN = 0, tailLenPx = 0, lenRatio = 0;",
              "let extCtx = null, extN = 0, tailLenPx = 0, lenRatio = 0, extValid = false;")

# fewer, wider-spaced nodes for the same length; skip the wide glow on alternate nodes
s = s.replace("const TAIL = { step: 6, lenK: 9.0, lenTrim: 0.97, maxN: 320,",
              "const TAIL = { step: 9, lenK: 11.0, lenTrim: 0.97, maxN: 230,")
a6 = "      for (let i = N - 1; i >= 0; i--) {\n        const p = spine[i], u = i / (N - 1 || 1);"
b6 = "      for (let i = N - 1; i >= 0; i--) {\n        if (pass === 0 && (i & 1)) continue;      // wide halo: every other node is plenty\n        const p = spine[i], u = i / (N - 1 || 1);"
assert s.count(a6) == 1; s = s.replace(a6, b6)
open(p,'w',encoding='utf-8').write(s)
print('ok')
PY
node --check content.js && echo VALID && grep -n "window.__tailLen" content.js
```

## 134 — 2026-08-24T00:09:24 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
import re
p='skinfire.js'; s=open(p,encoding='utf-8').read()
i0 = s.index('  var LOOKS = [')
i1 = s.index('  var look = LOOKS[0];')
new = '''  /* Trimmed to the three James and his dad actually use (2026-08-23). The earlier
     blaze/fish/ghost/ember/firetail/notail variants are in git-less history only —
     README documents what each did if one is ever wanted back. */
  var LOOKS = [
    /* 1. FIRE WORM - the game's own animated flame art draws the whole body, so length,
          growth and curve are exact by construction. These are "the cool flames". */
    { id: 'firewrm',  art: 'snake',   alpha: 1.00, flicker: false, amp: 1.0, trail: 'puff' },
    /* 2. TRUCK + REAL FLAME TAIL - game body gone entirely; the rig's path-spine flame is
          the tail. Sized from the length-per-thickness ratio learned in look 1. */
    { id: 'purefire', art: 'blaze',   alpha: 0.00, alphaHead: 1.00, flicker: false, amp: 1.0, trail: 'long' },
    /* 3. WHITE - the "Joining a room..." loader snake: flat, smooth, dark eyes kept. */
    { id: 'white',    art: 'spinner', alpha: 1.00, alphaHead: 1.00, flicker: false, amp: 0.0,
      trail: 'none', mono: [255, 255, 255], monoFlat: true, monoKeepDark: 105 }
  ];
'''
s = s[:i0] + new + s[i1:]

# install should pick the first LOOK whose art is captured, not a raw art name
a = "              for (var pi2 = 0; pi2 < ART_PREF.length; pi2++) { if (ART[ART_PREF[pi2]].body) { api.use(ART_PREF[pi2]); break; } }"
b = "              for (var pi2 = 0; pi2 < LOOKS.length; pi2++) { var LA = ART[LOOKS[pi2].art]; if (LA && LA.body) { api.use(LOOKS[pi2].id); break; } }"
assert s.count(a) == 1; s = s.replace(a, b)
open(p,'w',encoding='utf-8').write(s)
print(re.search(r'api\.looks[^;]*;', s).group(0) if re.search(r'api\.looks[^;]*;', s) else 'looks ok')
PY
node --check skinfire.js && echo VALID && grep -c "firewrm\|purefire\|'white'" skinfire.js
```

## 135 — 2026-08-24T00:09:45 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && sed -n "$(grep -n 'if (isBase(px, rec.w))' skinfire.js | cut -d: -f1),+10p" skinfire.js
```

## 136 — 2026-08-24T00:10:07 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
p='skinfire.js'; s=open(p,encoding='utf-8').read()
a = """              for (var pi2 = 0; pi2 < LOOKS.length; pi2++) { var LA = ART[LOOKS[pi2].art]; if (LA && LA.body) { api.use(LOOKS[pi2].id); break; } }
              ART.orig.body = extract(px, rec.w, CELL.body);      // BEFORE we overwrite them
              ART.orig.head = extract(px, rec.w, CELL.head);
              if (api.captured.indexOf('orig') < 0) api.captured.push('orig');
              ART.spinner.body = discFrom(ART.orig.body, CELL.body.w, CELL.body.h);
              ART.spinner.head = ART.orig.head;             // head keeps its shape (and its eyes)
              if (api.captured.indexOf('spinner') < 0) api.captured.push('spinner');"""
b = """              /* grab and synthesise FIRST, so every look's art exists before we pick one */
              ART.orig.body = extract(px, rec.w, CELL.body);      // BEFORE we overwrite them
              ART.orig.head = extract(px, rec.w, CELL.head);
              if (api.captured.indexOf('orig') < 0) api.captured.push('orig');
              ART.spinner.body = discFrom(ART.orig.body, CELL.body.w, CELL.body.h);
              ART.spinner.head = ART.orig.head;             // head keeps its shape (and its eyes)
              if (api.captured.indexOf('spinner') < 0) api.captured.push('spinner');
              for (var pi2 = 0; pi2 < LOOKS.length; pi2++) { var LA = ART[LOOKS[pi2].art]; if (LA && LA.body) { api.use(LOOKS[pi2].id); break; } }"""
assert s.count(a) == 1; s = s.replace(a, b)
open(p,'w',encoding='utf-8').write(s)
print('ok')
PY
node --check skinfire.js && echo VALID
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
p='content.js'; s=open(p,encoding='utf-8').read()
s = s.replace("v3.2 \u2014 3D truck, stick-anchored steering, + WHITE body for James. LB = 8 looks.",
              "v3.3 \u2014 LB now cycles just 3: fire worm \u00b7 truck+flame tail \u00b7 white.")
s = s.replace("// LB cycles the body look: blaze -> fire snake -> fish -> ghost -> ember -> firetail -> notail -> white",
              "// LB cycles the 3 looks: firewrm (game's fire body) -> purefire (truck + flame tail) -> white")
s = s.replace("localStorage.setItem('__snakeRig', '3.2 '", "localStorage.setItem('__snakeRig', '3.3 '")
s = s.replace("[snake rig v3.2 \u00b7 3D truck + path-anchored steering + white look \u00b7 extension] auto-loaded",
              "[snake rig v3.3 \u00b7 3 looks \u00b7 measured flame tail \u00b7 extension] auto-loaded")
open(p,'w',encoding='utf-8').write(s)
m=open('manifest.json',encoding='utf-8').read().replace('"version": "3.2"','"version": "3.3"')
open('manifest.json','w',encoding='utf-8').write(m)
print('ok')
PY
node --check content.js && echo "ALL VALID"
```

## 137 — 2026-08-24T00:11:19 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && sed -n "$(grep -n 'runs.sort' content.js | cut -d: -f1),+6p" content.js
```

## 138 — 2026-08-24T00:11:34 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
p='content.js'; s=open(p,encoding='utf-8').read()
a = """    runs.sort((p, q) => p - q);
    const dia = runs[runs.length >> 1] / k;                     // median run, video px -> CSS px
    bodyPx += (dia - bodyPx) * SIZE.ema;"""
b = """    runs.sort((p, q) => p - q);
    const dia = runs[runs.length >> 1] / k;                     // median run, video px -> CSS px
    /* HOLD, don't decay. In the menu (and in any look that hides the body) there is
       nothing to measure, and letting the EMA walk toward 0 shrinks the truck and, since
       v3.3, collapses the flame tail's length too. Only a real reading moves it. */
    if (!(dia > 6)) return;
    bodyPx += (dia - bodyPx) * SIZE.ema;"""
assert s.count(a) == 1; s = s.replace(a, b)
open(p,'w',encoding='utf-8').write(s)
print('ok')
PY
node --check content.js && echo VALID
```

## 139 — 2026-08-24T00:12:16 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake" && cat >> README.md << 'MD'

## v3.3 — Three looks, and a flame that knows how long your tail is (2026-08-23)

His dad: *"lets get rid of everything besides white and truck with (real flame tail) and then
fire worm."* LB now cycles exactly three:

| # | id | what it is |
|---|---|---|
| 1 | `firewrm` | the game's own animated flame art draws the whole body — length, growth and curve exact by construction. These are "the cool flames". |
| 2 | `purefire` | truck + the rig's path-spine flame as the entire tail; game body fully hidden. |
| 3 | `white` | the "Joining a room…" loader snake — flat, smooth, dark eyes kept. |

The retired looks (`blaze`, `fish`, `ghost`, `ember`, `firetail`, `notail`, `snake` as a
separate entry) were each one row in `LOOKS`; the sections above describe what they did if
one is ever wanted back.

### How long is the tail, really?
His dad: *"the flame needs to be almost exactly like the tail (and our head the car) so we
know who we're hitting"* — a flame drawn longer than your body actively misleads you into a
collision, so this can't be a guess. Three problems had to be solved in order:

1. **The measurement fed itself.** The scan walks the spine looking for where the body's
   pixels stop, but the spine was being trimmed *to* the measured length — so it could never
   measure longer than itself and locked at 47px on a 70px-thick worm. The spine is now the
   **probe** (kept long, `maxN`); `want` is only how much of it gets **drawn**.
2. **It trusted junk.** With the body hidden the walk still returned a number, because it was
   hitting other players' bodies and dropped food lying on our path. A reading is now only
   accepted if the body is actually present **at the head** (`headHits >= 2`).
3. **A hidden body can't be measured at all.** So while the body *is* visible (look 1) the rig
   learns `lenRatio = length / thickness` and applies it in look 2, where only thickness is
   measurable. Play a round in fire worm and the flame tail gets the right length for free.

`window.__tailLen()` returns the current value; the HUD shows `tail NNNpx`.

### The regression that the study caught
Fixing the plausibility gate's time base took the flow lock from 24% to 92% — good in itself,
but the nose-correction gain had been tuned when flow was fresh only ~a third of frames. At
89% lock the *same* per-frame gain applied three times as often and dragged the nose back onto
the lagging flow signal: **lag 0 → 7 frames, mean error 6.7° → 13.0°**. Dropping `corr`
0.18 → 0.045 and `corrHard` 4.0 → 1.5 restored it (lag back to 0, mean 8.4°, impossible-turn
frames 50 → 2). Lesson: a gain tuned against a signal's *duty cycle* silently breaks when you
improve that signal's availability — re-measure after any change to flow acceptance.

### Smaller fixes
- The `puff` exhaust scaled with `bodyPx` until its smoke was a ~136px grey teardrop swamping
  the flame art. Ember radius 0.52→0.29 of thickness, smoke alpha ×0.34, growth 1.4→0.65.
- Body-size EMA now **holds** instead of decaying when there's nothing to measure (menus,
  hidden-body looks). It used to walk to 0, which shrank the truck *and* collapsed the tail.
- Start size: `SIZE.ref` 40→54, `min` 0.75→0.58 ("the truck is large").
MD
echo appended
```

## 140 — 2026-08-24T00:12:39 (Bash)

```
cd "C:/Users/<user>/.claude/projects/C--Users-<user>/memory" && python - << 'PY'
p='xbox-snake-rig.md'; s=open(p,encoding='utf-8').read()
old = s[s.index('9 looks (LB):'):s.index('Robustness: `frame()`')]
new = """v3.3 TRIMMED TO 3 LOOKS (LB): `firewrm` (game's animated flame art draws the body = "the
cool flames", DEFAULT), `purefire` (truck + rig's flame as the whole tail, body hidden),
`white` (loader-snake white). The retired ones (blaze/fish/ghost/ember/firetail/notail) were
one LOOKS row each; README says what they did.
- `white`: matched to the "Joining a room..." loader snake, which is FLAT white and perfectly
  SMOOTH - no segment rings. Recolouring the game's body sprite can't do it (soft alpha
  falloff => dark overlap valleys => lumps); `skinfire.discFrom()` synthesises a FLAT-alpha
  white disc sized to the real sprite's footprint, and overlapping flat discs union into a
  seamless ribbon. Needs `trail:'none'` or the ember puff paints a grey core down the middle.
  `monoKeepDark` leaves the head's eyes dark.
- TAIL LENGTH took three fixes, all worth remembering: (1) the spine must be a long PROBE
  and `want` only how much is DRAWN - trimming the spine to the measured length made it
  unable to measure longer than itself (locked at 47px on a 70px worm); (2) only trust a
  reading if the body is present AT THE HEAD, else the walk scores other players' bodies and
  dropped food on our path; (3) a hidden body can't be measured, so while it IS visible the
  rig learns lenRatio = length/thickness and reuses it. Play a round in `firewrm` and
  `purefire` gets the right length. `__tailLen()`, HUD shows `tail NNNpx`.
- Body-size EMA HOLDS when nothing is measurable (menus, hidden body). It used to decay to 0,
  shrinking the truck AND collapsing the tail length.
- `puff` exhaust had grown with bodyPx into a 136px grey teardrop swamping the flame art -
  ember radius 0.29 of thickness, smoke alpha x0.34.
- Side effect to know: repainting the body cell also recolours some FOOD pellets (shared cell
  region) - in `white` the food goes white too.

CAUTION, cost a regression: the nose-correction gain is tuned against how OFTEN flow is
fresh. Fixing the gate's time base took lock 24%->92%, and the unchanged per-frame gain then
applied 3x as often and dragged the nose back onto the lagging flow (lag 0->7 frames, error
6.7->13.0 deg). corr 0.18->0.045, corrHard 4.0->1.5 fixed it. Re-measure after ANY change to
flow acceptance.

"""
s = s.replace(old, new)
open(p,'w',encoding='utf-8').write(s)
print('memory updated')
PY
sed -i 's|(v3.2): steering study|(v3.3): steering study|' "C:/Users/<user>/.claude/projects/C--Users-<user>/memory/MEMORY.md"
grep -c "v3.3" "C:/Users/<user>/.claude/projects/C--Users-<user>/memory/xbox-snake-rig.md"
```

## 141 — 2026-08-24T00:36:18 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && ls -la .content-v25.bak.js 2>/dev/null && grep -n "FIRE = {\|emberR\|smokeA\|flameA\|embers.push\|life:\|const lat\|jx:\|sprHot\|p.r \*" .content-v25.bak.js | head -30
```

## 142 — 2026-08-24T00:38:19 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
p='content.js'; s=open(p,encoding='utf-8').read()

i0 = s.index('  function tailFrame(cx, cy, drift, boost, dtR, tSec) {')
i1 = s.index("  let run = true, on = true, heading = -Math.PI / 2")
old = s[i0:i1]

new = '''  /* Keep the recorded path and the measured tail length. Nothing is DRAWN from the spine
     any more: three smooth layered passes along it produced an even, continuous glowing
     tube, and his dad rejected that twice — "WE HAD THE COOL FIRE TAIL (LOOKS LIKE THE FIRE
     COMING FROM THE TRUCK) IN THE FIRST ITERATION AND WE LOST IT". The v2.5 ember particle
     system is that look, and it lays the curved path down on its own because every ember
     drifts with the measured camera motion. It was abandoned when flow was fresh only ~33%
     of frames; flow now locks ~92%, so its one weakness is largely gone. The spine survives
     purely as the ruler that tells the embers how long the real body is. */
  function spineStep(cx, cy, drift, dtR) {
    for (const s of spine) { s.x += drift.dx * dtR; s.y += drift.dy * dtR; }
    if (!drift.still) {
      if (!spine.length) spine.push({ x: cx, y: cy });
      else {
        const h = spine[0], dx = cx - h.x, dy = cy - h.y, d = Math.hypot(dx, dy);
        if (d >= TAIL.step) {                      // fill in every step we covered this tick
          const k = Math.min(24, Math.floor(d / TAIL.step));
          for (let i = 1; i <= k; i++) spine.unshift({ x: h.x + dx * (i / k), y: h.y + dy * (i / k) });
        }
      }
    }
    /* The spine is the PROBE: keep it longer than the answer. Trimming it to the measured
       length made it unable to ever measure longer than itself. */
    if (spine.length > TAIL.maxN) spine.length = TAIL.maxN;
    measureExtent();
    const measured = extValid ? tailLenPx : 0;
    return (measured > 24 ? measured : (lenRatio || TAIL.lenK) * bodyPx) * TAIL.lenTrim;
  }

  function fireFrame(cx, cy, drift, boost, dtR) {
    const targetLen = spineStep(cx, cy, drift, dtR);
    const dir = drift.dir, spd = drift.spd;
    let turnFac = 1;
    if (lastSpawnDir != null) turnFac = Math.min(1.8, 1 + Math.abs(angDiff(dir, lastSpawnDir)) * 22);
    lastSpawnDir = dir;
    if (!drift.still && FIRE.rate > 0) {
      spawnAcc += (boost ? FIRE.boostRate : FIRE.rate) * dtR;   // per 60Hz frame: density is fps-independent
      const n = Math.floor(spawnAcc); spawnAcc -= n;
      const cosD = Math.cos(dir), sinD = Math.sin(dir);
      /* Original character, restored. The three things that make this read as FIRE rather
         than a tube, all of which the ribbon lacked:
           - wide per-ember size variance (0.75..1.25), so the edge is ragged
           - lateral scatter, so it billows either side of the centreline
           - each ember GROWS ~2.2x over its life while fading, so the trail boils
         Sizes are scaled off the measured body thickness so it still grows with the worm;
         v2.5's flat 16/20 px read as off-centre once the worm got fat. */
      const lat = bodyPx * FIRE.latK * turnFac;
      const step = spd * dtR + 4;
      const emberR = Math.max(6, bodyPx * (boost ? FIRE.rBoost : FIRE.rBody));
      /* Length honesty: trail length is roughly speed x lifetime, so cap the lifetime to
         the MEASURED body length. A flame longer than your body would walk you into a
         collision, so this always errs short. */
      const lifeMax = boost ? FIRE.boostLife : FIRE.life;
      const lifeCap = targetLen > 24 ? Math.min(lifeMax, targetLen / Math.max(1.2, spd)) : lifeMax;
      for (let i = 0; i < n && embers.length < FIRE.max; i++) {
        const back = bodyPx * 0.12 + (i / n) * step + Math.random() * 4;
        embers.push({ x: cx + cosD * back + (Math.random() - .5) * lat,
                      y: cy + sinD * back + (Math.random() - .5) * lat,
                      a: 0, l: Math.max(6, lifeCap * (0.75 + Math.random() * 0.5)),
                      r: emberR * (0.75 + Math.random() * 0.5) * (1 + (turnFac - 1) * 0.4),
                      jx: (Math.random() - .5) * 0.3, jy: (Math.random() - .5) * 0.3, hot: boost });
      }
    }
    fctx.clearRect(0, 0, fireCv.width, fireCv.height);
    embers = embers.filter(p => (p.a += dtR) < p.l);            // age in 60Hz frames, not ticks
    for (const p of embers) { p.x += (drift.dx + p.jx) * dtR; p.y += (drift.dy + p.jy) * dtR; }
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
      const smokeA = (t < .45 ? 0 : Math.min(1, (t - .45) / .2) * Math.pow(1 - t, 1.3)) * FIRE.smokeA;
      if (smokeA > .01) {
        const r = p.r * (1.15 + t * 1.4);
        fctx.globalAlpha = smokeA;
        fctx.drawImage(sprSmoke, p.x - r, p.y - r, r * 2, r * 2);
      }
    }
    fctx.globalAlpha = 1;
  }

'''
s = s[:i0] + new + s[i1:]

# FIRE gains the shape knobs the ember system now reads, and is exposed for live tuning
import re
m = re.search(r"  const FIRE = \{[^\n]*\n", s)
oldFire = m.group(0)
newFire = ("  const FIRE = { speed: 3.4, boostMul: 1.85, rate: 5, boostRate: 9, life: 110, boostLife: 130,\n"
           "                 max: 900, turnCap: 0.12,        // turnCap = measured p95 worm turn rate (2026-08-22 study)\n"
           "                 latK: 0.20, rBody: 0.42, rBoost: 0.52, smokeA: 0.55 };\n"
           "  window.__fire = FIRE;                          // live-tunable from the console\n")
s = s.replace(oldFire, newFire)

# per-look trail tuning: both fire modes now get a REAL fire trail, differing only in reach
a = """      if (tMode === 'long') {         // 'firetail': body invisible, the path-spine flame IS the tail
        FIRE.life = 95; FIRE.boostLife = 120; FIRE.rate = 5; FIRE.boostRate = 9; FIRE.max = 700;
      } else if (tMode === 'none') {  // 'notail': just the truck, nothing behind it
        FIRE.life = 26; FIRE.boostLife = 34; FIRE.rate = 0; FIRE.boostRate = 0; FIRE.max = 220;
        killFire();
      } else {                        // 'puff': short exhaust behind the truck
        FIRE.life = 26; FIRE.boostLife = 34; FIRE.rate = 3; FIRE.boostRate = 7; FIRE.max = 220;"""
b = """      if (tMode === 'long') {         // 'purefire': the ember fire IS the tail (v2.5 values)
        FIRE.life = 110; FIRE.boostLife = 130; FIRE.rate = 5; FIRE.boostRate = 9; FIRE.max = 900;
      } else if (tMode === 'none') {  // 'white': nothing behind it, the body speaks for itself
        FIRE.life = 60; FIRE.boostLife = 80; FIRE.rate = 0; FIRE.boostRate = 0; FIRE.max = 500;
        killFire();
      } else {                        // 'puff': real fire, but shorter than the flame body
        FIRE.life = 55; FIRE.boostLife = 72; FIRE.rate = 4; FIRE.boostRate = 8; FIRE.max = 500;"""
assert s.count(a) == 1, s.count(a)
s = s.replace(a, b)
open(p,'w',encoding='utf-8').write(s)
print('fire restored')
PY
node --check content.js && echo VALID && grep -c "tailFrame\|sprCore" content.js
```

## 143 — 2026-08-24T00:38:47 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
p='content.js'; s=open(p,encoding='utf-8').read()
a = """  const FIRE = { speed: 3.4, boostMul: 1.85, rate: 5, boostRate: 9, life: 110, boostLife: 130,
                 max: 900, turnCap: 0.12,        // turnCap = measured p95 worm turn rate (2026-08-22 study)
                 latK: 0.20, rBody: 0.42, rBoost: 0.52, smokeA: 0.55 };
  window.__fire = FIRE;                          // live-tunable from the console
    latComp: 1.5, freshFull: 150, freshZero: 300 };   // v2.6: flow staleness compensated (frames); fresh window full-trust / zero-trust (ms)
  window.__fire = FIRE;"""
b = """  const FIRE = { speed: 3.4, boostMul: 1.85, rate: 5, boostRate: 9, life: 110, boostLife: 130,
                 max: 900, turnCap: 0.12,        // turnCap = measured p95 worm turn rate (2026-08-22 study)
                 latK: 0.20, rBody: 0.42, rBoost: 0.52, smokeA: 0.55,   // ember shape (v2.5 character)
                 latComp: 1.5, freshFull: 150, freshZero: 300 };   // v2.6: flow staleness compensated (frames); fresh window full-trust / zero-trust (ms)
  window.__fire = FIRE;                          // live-tunable from the console"""
assert s.count(a) == 1; s = s.replace(a, b)
open(p,'w',encoding='utf-8').write(s)
print('ok')
PY
node --check content.js && echo VALID && grep -c "tailFrame" content.js && grep -n "window.__fire" content.js
```

## 144 — 2026-08-24T00:38:59 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && grep -n "window.__fire\|const FIRE" content.js; echo "--- unused now ---"; grep -c "sprCore\|tailSpr" content.js; echo "--- purefire alpha ---"; grep -n "purefire" skinfire.js
```

## 145 — 2026-08-24T00:39:14 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
p='skinfire.js'; s=open(p,encoding='utf-8').read()
a = """    /* 2. TRUCK + REAL FLAME TAIL - game body gone entirely; the rig's path-spine flame is
          the tail. Sized from the length-per-thickness ratio learned in look 1. */
    { id: 'purefire', art: 'blaze',   alpha: 0.00, alphaHead: 1.00, flicker: false, amp: 1.0, trail: 'long' },"""
b = """    /* 2. TRUCK + FIRE TAIL. NEVER set alpha 0 here. His dad, 2026-08-23: "when you change the
          snake it takes the other ones off the screen too... you must be replacing another
          skin" - and he is right. These cells live in the SHARED BaseSkinAtlas, so every
          other player on the same basic skin samples the very same pixels. alpha 0 made
          THEIR bodies invisible too, which is lethal: you cannot see what you are about to
          hit. The body is hidden the way v2.5 did it - COVERED by a dense ember trail, not
          erased from the texture. Keeping it also keeps the hitbox honest and the length
          scan working. */
    { id: 'purefire', art: 'blaze',   alpha: 1.00, alphaHead: 1.00, flicker: false, amp: 1.4, trail: 'long' },"""
assert s.count(a) == 1; s = s.replace(a, b)
open(p,'w',encoding='utf-8').write(s)
print('ok')
PY
node --check skinfire.js && echo VALID && grep -n "alpha: 0.00\|alpha: 0\b" skinfire.js || echo "NO zero-alpha looks remain"
```

## 146 — 2026-08-24T00:40:58 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
p='content.js'; s=open(p,encoding='utf-8').read()

# v2.5 used a FIXED 16/20px ember. Scaling that straight off thickness (0.42*bodyPx) makes
# embers explode on a fat worm and the smoke pass turns the whole trail into a grey mass.
# Sub-linear: a floor plus a modest slope, so it still grows but never becomes a cloud.
a = "                 latK: 0.20, rBody: 0.42, rBoost: 0.52, smokeA: 0.55,   // ember shape (v2.5 character)"
b = """                 rBase: 9, rBaseBoost: 12, rBody: 0.20, rBoost: 0.26,  // ember size: floor + sub-linear slope
                 latK: 0.20, smokeA: 0.20, coreT: 0.34, coreA: 0.70,   // grey smoke kept way back; white-hot base
                 fadeAt: 0.50,"""
assert s.count(a) == 1; s = s.replace(a, b)

a2 = "      const emberR = Math.max(6, bodyPx * (boost ? FIRE.rBoost : FIRE.rBody));"
b2 = """      const emberR = boost ? FIRE.rBaseBoost + bodyPx * FIRE.rBoost
                           : FIRE.rBase + bodyPx * FIRE.rBody;"""
assert s.count(a2) == 1; s = s.replace(a2, b2)

# flame: fade later-but-shorter, and add a white-hot core on the YOUNGEST embers so the
# base of the trail reads as a jet coming out of the truck rather than a uniform glow
a3 = """    fctx.globalCompositeOperation = 'lighter';
    for (const p of embers) {
      const t = p.a / p.l;
      const flameA = t < .6 ? 1 : Math.max(0, 1 - (t - .6) / .25);
      if (flameA > .01) {
        const r = p.r * (1 + t * (p.hot ? 1.7 : 1.2));
        fctx.globalAlpha = flameA;
        fctx.drawImage(p.hot ? sprHot : sprCool, p.x - r, p.y - r, r * 2, r * 2);
      }
    }"""
b3 = """    fctx.globalCompositeOperation = 'lighter';
    for (const p of embers) {
      const t = p.a / p.l;
      const flameA = t < FIRE.fadeAt ? 1 : Math.max(0, 1 - (t - FIRE.fadeAt) / (1 - FIRE.fadeAt));
      if (flameA > .01) {
        const r = p.r * (1 + t * (p.hot ? 1.7 : 1.2));
        fctx.globalAlpha = flameA;
        fctx.drawImage(p.hot ? sprHot : sprCool, p.x - r, p.y - r, r * 2, r * 2);
      }
    }
    /* White-hot base: only the youngest embers, small and bright, so the flame looks like
       it is being thrown OUT of the truck instead of glowing uniformly along its length. */
    for (const p of embers) {
      const t = p.a / p.l;
      if (t > FIRE.coreT) continue;
      const r = p.r * (0.42 + t * 0.5);
      fctx.globalAlpha = FIRE.coreA * (1 - t / FIRE.coreT);
      fctx.drawImage(sprCore, p.x - r, p.y - r, r * 2, r * 2);
    }"""
assert s.count(a3) == 1; s = s.replace(a3, b3)
open(p,'w',encoding='utf-8').write(s)
print('ok')
PY
node --check content.js && echo VALID
```

## 147 — 2026-08-24T00:42:51 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
p='content.js'; s=open(p,encoding='utf-8').read()

# Measured off a screenshot: bodyPx 69, tail 253px, ember radius 9+69*0.20=22.8 growing 2.2x
# to ~50 => 100px-wide embers on a 69px-thick worm, so the whole 253px trail rendered as TWO
# white blobs and buried the game's animated fire body. The embers must be an EXHAUST that
# lets the animated fire art read as the body, not a replacement for it.
a = """                 rBase: 9, rBaseBoost: 12, rBody: 0.20, rBoost: 0.26,  // ember size: floor + sub-linear slope
                 latK: 0.20, smokeA: 0.20, coreT: 0.34, coreA: 0.70,   // grey smoke kept way back; white-hot base
                 fadeAt: 0.50,"""
b = """                 rBase: 4, rBaseBoost: 6, rBody: 0.155, rBoost: 0.195,  // ~40% of body width, not 150%
                 grow: 0.85, growBoost: 0.95,                           // modest billow, was 1.2/1.7
                 latK: 0.22, smokeA: 0.18, coreT: 0.20, coreA: 0.26,    // core is a highlight, not the flame
                 fadeAt: 0.50,"""
assert s.count(a) == 1; s = s.replace(a, b)

# denser, since each ember is now much smaller
s = s.replace("rate: 5, boostRate: 9, life: 110, boostLife: 130,\n                 max: 900,",
              "rate: 9, boostRate: 14, life: 110, boostLife: 130,\n                 max: 1400,")
s = s.replace("FIRE.life = 110; FIRE.boostLife = 130; FIRE.rate = 5; FIRE.boostRate = 9; FIRE.max = 900;",
              "FIRE.life = 110; FIRE.boostLife = 130; FIRE.rate = 9; FIRE.boostRate = 14; FIRE.max = 1400;")
s = s.replace("FIRE.life = 55; FIRE.boostLife = 72; FIRE.rate = 4; FIRE.boostRate = 8; FIRE.max = 500;",
              "FIRE.life = 55; FIRE.boostLife = 72; FIRE.rate = 7; FIRE.boostRate = 11; FIRE.max = 800;")

a2 = "        const r = p.r * (1 + t * (p.hot ? 1.7 : 1.2));"
b2 = "        const r = p.r * (1 + t * (p.hot ? FIRE.growBoost : FIRE.grow));"
assert s.count(a2) == 1; s = s.replace(a2, b2)

a3 = """      const r = p.r * (0.42 + t * 0.5);
      fctx.globalAlpha = FIRE.coreA * (1 - t / FIRE.coreT);"""
b3 = """      const r = p.r * (0.34 + t * 0.30);
      fctx.globalAlpha = FIRE.coreA * (1 - t / FIRE.coreT);"""
assert s.count(a3) == 1; s = s.replace(a3, b3)
open(p,'w',encoding='utf-8').write(s)
print('ok')
PY
node --check content.js && echo VALID && grep -n "rBase: 4\|rate: 9, boostRate: 14" content.js
```

## 148 — 2026-08-24T00:44:10 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
p='content.js'; s=open(p,encoding='utf-8').read()
# The game's animated fire art IS the ideal tail - it is drawn by the game, so it is exactly
# aligned, exactly the right length, and grows correctly, and it looks like licking flames.
# Any overlay we add can only cover it up. So the overlay's job is reduced to what it is
# actually good at: a thin bright JET leaving the car. Narrower than the body, short-lived.
a = """                 rBase: 4, rBaseBoost: 6, rBody: 0.155, rBoost: 0.195,  // ~40% of body width, not 150%
                 grow: 0.85, growBoost: 0.95,                           // modest billow, was 1.2/1.7
                 latK: 0.22, smokeA: 0.18, coreT: 0.20, coreA: 0.26,    // core is a highlight, not the flame
                 fadeAt: 0.50,"""
b = """                 rBase: 3, rBaseBoost: 4.5, rBody: 0.10, rBoost: 0.135, // a JET: narrower than the body
                 grow: 0.95, growBoost: 1.15,                            // flares as it leaves the pipe
                 latK: 0.13, smokeA: 0.14, coreT: 0.22, coreA: 0.30,     // tight, hot, almost no smoke
                 fadeAt: 0.45,"""
assert s.count(a) == 1; s = s.replace(a, b)
# short enough that it never blankets the flame body behind it
s = s.replace("FIRE.life = 110; FIRE.boostLife = 130; FIRE.rate = 9; FIRE.boostRate = 14; FIRE.max = 1400;",
              "FIRE.life = 42; FIRE.boostLife = 58; FIRE.rate = 9; FIRE.boostRate = 14; FIRE.max = 700;")
s = s.replace("FIRE.life = 55; FIRE.boostLife = 72; FIRE.rate = 7; FIRE.boostRate = 11; FIRE.max = 800;",
              "FIRE.life = 32; FIRE.boostLife = 46; FIRE.rate = 8; FIRE.boostRate = 12; FIRE.max = 600;")
s = s.replace("rate: 9, boostRate: 14, life: 110, boostLife: 130,\n                 max: 1400,",
              "rate: 9, boostRate: 14, life: 42, boostLife: 58,\n                 max: 700,")
open(p,'w',encoding='utf-8').write(s)
print('ok')
PY
node --check content.js && echo VALID
```

## 149 — 2026-08-24T00:45:09 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
p='content.js'; s=open(p,encoding='utf-8').read()
# Dense embers under 'lighter' blending sum to white in the middle of the jet. Draw each at
# partial alpha so the OVERLAP lands on orange instead of clipping to white.
a = "                 latK: 0.13, smokeA: 0.14, coreT: 0.22, coreA: 0.30,     // tight, hot, almost no smoke"
b = "                 latK: 0.13, smokeA: 0.14, coreT: 0.18, coreA: 0.16,     // tight, hot, almost no smoke\n                 flameA: 0.52,                                           // stops the jet clipping to white"
assert s.count(a) == 1; s = s.replace(a, b)
a2 = "      const flameA = t < FIRE.fadeAt ? 1 : Math.max(0, 1 - (t - FIRE.fadeAt) / (1 - FIRE.fadeAt));"
b2 = "      const flameA = FIRE.flameA * (t < FIRE.fadeAt ? 1 : Math.max(0, 1 - (t - FIRE.fadeAt) / (1 - FIRE.fadeAt)));"
assert s.count(a2) == 1; s = s.replace(a2, b2)
open(p,'w',encoding='utf-8').write(s)
print('ok')
PY
node --check content.js && echo VALID
```

## 150 — 2026-08-24T00:46:24 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
p='content.js'; s=open(p,encoding='utf-8').read()
a = """                 rBase: 3, rBaseBoost: 4.5, rBody: 0.10, rBoost: 0.135, // a JET: narrower than the body
                 grow: 0.95, growBoost: 1.15,                            // flares as it leaves the pipe
                 latK: 0.13, smokeA: 0.14, coreT: 0.18, coreA: 0.16,     // tight, hot, almost no smoke
                 flameA: 0.52,                                           // stops the jet clipping to white
                 fadeAt: 0.45,"""
b = """                 rBase: 5, rBaseBoost: 7, rBody: 0.30, rBoost: 0.38,     // v2.5 character, scaled to the worm
                 grow: 1.2, growBoost: 1.7,                              // v2.5 billow: embers swell 2.2x
                 latK: 0.20, smokeA: 0.30, coreT: 0.15, coreA: 0.10,     // scatter + smoke back to v2.5
                 flameA: 0.45,          // <1 so dense overlap lands on ORANGE instead of clipping white
                 fadeAt: 0.60,"""
assert s.count(a) == 1; s = s.replace(a, b)
# 'long' = the flame IS the tail: v2.5 lifetimes
s = s.replace("FIRE.life = 42; FIRE.boostLife = 58; FIRE.rate = 9; FIRE.boostRate = 14; FIRE.max = 700;",
              "FIRE.life = 110; FIRE.boostLife = 130; FIRE.rate = 6; FIRE.boostRate = 10; FIRE.max = 1000;")
s = s.replace("rate: 9, boostRate: 14, life: 42, boostLife: 58,\n                 max: 700,",
              "rate: 6, boostRate: 10, life: 110, boostLife: 130,\n                 max: 1000,")
open(p,'w',encoding='utf-8').write(s)
print('content ok')
PY
python - << 'PY'
p='C:/Users/<user>/dev/xbox-snake/extension/skinfire.js'; s=open(p,encoding='utf-8').read()
a = """    { id: 'purefire', art: 'blaze',   alpha: 1.00, alphaHead: 1.00, flicker: false, amp: 1.4, trail: 'long' },"""
b = """    { id: 'purefire', art: 'blaze',   alpha: 0.00, alphaHead: 1.00, flicker: false, amp: 1.4, trail: 'long' },"""
assert s.count(a) == 1; s = s.replace(a, b)
# and make the shared-atlas consequence impossible to forget
a2 = """    /* 2. TRUCK + FIRE TAIL. NEVER set alpha 0 here. His dad, 2026-08-23: "when you change the
          snake it takes the other ones off the screen too... you must be replacing another
          skin" - and he is right. These cells live in the SHARED BaseSkinAtlas, so every
          other player on the same basic skin samples the very same pixels. alpha 0 made
          THEIR bodies invisible too, which is lethal: you cannot see what you are about to
          hit. The body is hidden the way v2.5 did it - COVERED by a dense ember trail, not
          erased from the texture. Keeping it also keeps the hitbox honest and the length
          scan working. */"""
b2 = """    /* 2. TRUCK + FLAME TAIL, worm body GONE (alpha 0) - "we had no tail and just the flame".
          KNOWN COST, do not rediscover it: these cells live in the SHARED BaseSkinAtlas, so
          every other player wearing the SAME skin samples the same pixels and goes invisible
          too ("when you change the snake it takes the other ones off the screen"). Players on
          OTHER skins are unaffected. There is no texture-level way to separate our worm from
          theirs, so the mitigation is social, not technical: EQUIP A RARE SKIN and almost
          nobody else is hit. Look 1 keeps the body visible if you would rather not risk it. */"""
assert s.count(a2) == 1; s = s.replace(a2, b2)
open(p,'w',encoding='utf-8').write(s)
print('skinfire ok')
PY
cd "C:/Users/<user>/dev/xbox-snake/extension" && node --check content.js && node --check skinfire.js && echo "BOTH VALID"
```

## 151 — 2026-08-24T00:46:46 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
p='skinfire.js'; s=open(p,encoding='utf-8').read()
a = """    { id: 'purefire', art: 'blaze',   alpha: 0.00, alphaHead: 1.00, flicker: false, amp: 1.4, trail: 'long' },"""
b = """    { id: 'carfire',  art: 'blaze',   alpha: 0.00, alphaHead: 1.00, flicker: false, amp: 1.4, trail: 'long' },
    /* 3. Same, minus the car - "then we wanted to turn that into no car with fire". */
    { id: 'allfire',  art: 'blaze',   alpha: 0.00, alphaHead: 1.00, flicker: false, amp: 1.4,
      trail: 'long', hideTruck: true },"""
assert s.count(a) == 1; s = s.replace(a, b)
s = s.replace("    /* 3. WHITE - the \"Joining a room...\" loader snake", "    /* 4. WHITE - the \"Joining a room...\" loader snake")
open(p,'w',encoding='utf-8').write(s)
print('ok')
PY
node --check skinfire.js && echo VALID && grep -n "id: '" skinfire.js
```

## 152 — 2026-08-24T00:48:10 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
p='content.js'; s=open(p,encoding='utf-8').read()
a = """    if (!flowVid || !flowVid.videoWidth || !flowCvRef || spine.length < 4) return;"""
b = """    if (!flowVid || !flowVid.videoWidth || !flowCvRef || spine.length < 4) return;
    /* If the look hides the body there is nothing back there to find, and the walk just
       measures the HEAD sprite instead - it read 55px and choked the flame down to a stub.
       Don't pretend: fall through to the learned length-per-thickness ratio. */
    if (window.__skinFire && window.__skinFire.bodyHidden) { extValid = false; return; }"""
assert s.count(a) == 1; s = s.replace(a, b)
a2 = """    const len = lastHit * TAIL.step;
    if (len > 24) {"""
b2 = """    const len = lastHit * TAIL.step;
    if (len > Math.max(24, bodyPx * 1.6)) {        // shorter than that is just the head"""
assert s.count(a2) == 1; s = s.replace(a2, b2)
open(p,'w',encoding='utf-8').write(s)
print('ok')
PY
node --check content.js && echo VALID
```

## 153 — 2026-08-24T00:49:17 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
p='content.js'; s=open(p,encoding='utf-8').read()
a = """                 latK: 0.20, smokeA: 0.30, coreT: 0.15, coreA: 0.10,     // scatter + smoke back to v2.5
                 flameA: 0.45,          // <1 so dense overlap lands on ORANGE instead of clipping white
                 fadeAt: 0.60,"""
b = """                 latK: 0.20, coreT: 0.15, coreA: 0.10,
                 /* v2.5 smoked from 45% of ember life. With 110-frame embers that greyed out
                    more than half the trail, so the flame read as a grey tube with an orange
                    rim. Smoke now belongs only to the dying tip. */
                 smokeA: 0.10, smokeAt: 0.80,
                 flameA: 0.62,          // <1 so dense overlap lands on ORANGE instead of clipping white
                 fadeAt: 0.74,"""
assert s.count(a) == 1; s = s.replace(a, b)
a2 = "      const smokeA = (t < .45 ? 0 : Math.min(1, (t - .45) / .2) * Math.pow(1 - t, 1.3)) * FIRE.smokeA;"
b2 = "      const smokeA = (t < FIRE.smokeAt ? 0 : Math.min(1, (t - FIRE.smokeAt) / 0.12) * Math.pow(1 - t, 1.1)) * FIRE.smokeA;"
assert s.count(a2) == 1; s = s.replace(a2, b2)
open(p,'w',encoding='utf-8').write(s)
print('ok')
PY
node --check content.js && echo VALID
```

## 154 — 2026-08-24T00:50:38 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
p='content.js'; s=open(p,encoding='utf-8').read()

a = "  let extCtx = null, extN = 0, tailLenPx = 0, lenRatio = 0, extValid = false;"
b = """  let extCtx = null, extN = 0, tailLenPx = 0, lenRatio = 0, extValid = false;
  /* TRAIL-FIT STUDY. "i think we lost our study of how the tail moves or something."
     The nose-error study measures the TRUCK. This measures the TRAIL: walking the recorded
     path through the captured frame, what fraction of it actually lands on body pixels, and
     how far sideways is the body's centre from where we think the path is. Lateral offset is
     the number that matters - it is drift in the optical-flow path integration, and it is
     what makes a trail visibly slide off the worm. */
  const FIT = { n: 0, hits: 0, probes: 0, offSum: 0, offN: 0, offMax: 0, lat: 26 };
  window.__tailFit = () => ({
    samples: FIT.n,
    onBodyPct: FIT.probes ? +(100 * FIT.hits / FIT.probes).toFixed(1) : null,
    lateralMeanPx: FIT.offN ? +(FIT.offSum / FIT.offN).toFixed(1) : null,
    lateralMaxPx: +FIT.offMax.toFixed(1),
    measuredLenPx: Math.round(tailLenPx),
    lenPerThickness: lenRatio ? +lenRatio.toFixed(1) : null
  });
  window.__tailFitReset = () => { FIT.n = 0; FIT.hits = 0; FIT.probes = 0; FIT.offSum = 0; FIT.offN = 0; FIT.offMax = 0; };"""
assert s.count(a) == 1; s = s.replace(a, b)

# measure lateral offset while the extent walk is already reading pixels
a2 = """      if (probes < 3 && hit) headHits++;
      probes++;
      if (hit) { lastHit = i; miss = 0; }
      else if (++miss >= EXT.miss) break;
    }"""
b2 = """      if (probes < 3 && hit) headHits++;
      probes++;
      FIT.probes++; if (hit) FIT.hits++;
      /* lateral error: step perpendicular to the local path tangent and find the body's
         centre of mass, then compare to where the path says it should be */
      if (hit && i > 4 && i + 1 < spine.length) {
        const f = spine[i - 1], g = spine[i + 1];
        let tx = f.x - g.x, ty = f.y - g.y;
        const tl = Math.hypot(tx, ty) || 1;
        const nx = -ty / tl, ny = tx / tl;                   // unit normal, screen space
        let wsum = 0, wn = 0;
        for (let d = -FIT.lat; d <= FIT.lat; d += 2) {
          const qx = Math.round((spine[i].x + nx * d - r.left) / r.width * cw);
          const qy = Math.round((spine[i].y + ny * d - r.top) / r.height * ch);
          if (qx < 1 || qy < 1 || qx >= cw - 1 || qy >= ch - 1) continue;
          const qo = (qy * cw + qx) * 4;
          if (img[qo] > img[qo + 2] + EXT.warm ||
              (img[qo] > EXT.bright && img[qo + 1] > EXT.bright && img[qo + 2] > EXT.bright)) { wsum += d; wn++; }
        }
        if (wn >= 3) {
          const off = Math.abs(wsum / wn);
          FIT.offSum += off; FIT.offN++; if (off > FIT.offMax) FIT.offMax = off;
        }
      }
      if (hit) { lastHit = i; miss = 0; }
      else if (++miss >= EXT.miss) break;
    }
    FIT.n++;"""
assert s.count(a2) == 1; s = s.replace(a2, b2)
open(p,'w',encoding='utf-8').write(s)
print('ok')
PY
node --check content.js && echo VALID && grep -n "const r = flowCvRef.getBoundingClientRect" content.js
```

## 155 — 2026-08-24T00:52:17 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
p='content.js'; s=open(p,encoding='utf-8').read()
# onBodyPct counted every probe, including the ones deliberately past the end of the body
# (the spine is a long PROBE by design). That reported 35% for a trail that is actually
# well aligned. Only probes inside the body's own span can say anything about fit.
a = """      FIT.probes++; if (hit) FIT.hits++;"""
b = """      if (hit) { FIT.hits++; FIT.probes++; FIT.lastHitProbe = FIT.probes; }
      else if (miss < EXT.miss) FIT.probes++;      // a gap INSIDE the body still counts against us"""
assert s.count(a) == 1; s = s.replace(a, b)
s = s.replace("const FIT = { n: 0, hits: 0, probes: 0, offSum: 0, offN: 0, offMax: 0, lat: 26 };",
              "const FIT = { n: 0, hits: 0, probes: 0, lastHitProbe: 0, offSum: 0, offN: 0, offMax: 0, lat: 26 };")
open(p,'w',encoding='utf-8').write(s)
print('ok')
PY
node --check content.js && echo VALID
```

## 156 — 2026-08-24T00:54:29 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
p='content.js'; s=open(p,encoding='utf-8').read()
# A single length/thickness RATIO learned while small badly understates a big worm: real
# length grows with mass while thickness grows sublinearly, so the relationship is not
# linear. Fit len = k * thickness^2 instead, which extrapolates, with a safety trim because
# an overlong flame is the one error that can get you killed.
a = """      if (bodyPx > 8) {                            // remember length-per-thickness...
        const rr = tailLenPx / bodyPx;
        lenRatio = lenRatio ? lenRatio + (rr - lenRatio) * 0.05 : rr;
      }"""
b = """      if (bodyPx > 8) {                            // remember length-per-thickness...
        const kk = tailLenPx / (bodyPx * bodyPx);
        lenK2 = lenK2 ? lenK2 + (kk - lenK2) * 0.05 : kk;
        const rr = tailLenPx / bodyPx;
        lenRatio = lenRatio ? lenRatio + (rr - lenRatio) * 0.05 : rr;
      }"""
assert s.count(a) == 1; s = s.replace(a, b)
s = s.replace("let extCtx = null, extN = 0, tailLenPx = 0, lenRatio = 0, extValid = false;",
              "let extCtx = null, extN = 0, tailLenPx = 0, lenRatio = 0, lenK2 = 0, extValid = false;")
a2 = """    const measured = extValid ? tailLenPx : 0;
    return (measured > 24 ? measured : (lenRatio || TAIL.lenK) * bodyPx) * TAIL.lenTrim;"""
b2 = """    const measured = extValid ? tailLenPx : 0;
    if (measured > 24) return measured * TAIL.lenTrim;
    /* body hidden: extrapolate from the quadratic fit, never below the linear ratio, and
       trimmed - understating your reach is safe, overstating it is not */
    const q = lenK2 ? lenK2 * bodyPx * bodyPx * TAIL.extrapTrim : 0;
    const lin = (lenRatio || TAIL.lenK) * bodyPx;
    return Math.max(lin, q) * TAIL.lenTrim;"""
assert s.count(a2) == 1; s = s.replace(a2, b2)
s = s.replace("lenTrim: 0.97, maxN: 230,", "lenTrim: 0.97, extrapTrim: 0.85, maxN: 300,")
# lock is ~87% now, so the matcher can afford to be pickier: 142 impossible frames per 60s
# still get through and each one is a visible trail glitch
s = s.replace("ratio: 0.92, maxTurn: 0.42, maxSpdJump: 4.0,", "ratio: 0.86, maxTurn: 0.34, maxSpdJump: 3.2,")
s = s.replace("window.__tailLen = () => tailLenPx;",
              "window.__tailLen = () => tailLenPx;\n  window.__lenFit = () => ({ lenRatio: +lenRatio.toFixed(2), lenK2: +lenK2.toFixed(4), bodyPx: Math.round(bodyPx) });")
open(p,'w',encoding='utf-8').write(s)
print('ok')
PY
node --check content.js && echo VALID && grep -n "extrapTrim\|ratio: 0.86" content.js
```

## 157 — 2026-08-24T00:55:22 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
p='content.js'; s=open(p,encoding='utf-8').read()
# 1. A MEASURED length is the worm's length - no reason to shave it. His dad: "we do want the
#    fire to be as long as the worm". Keep the trim only for extrapolated guesses.
s = s.replace("lenTrim: 0.97, extrapTrim: 0.85, maxN: 300,", "lenTrim: 1.00, extrapTrim: 0.90, maxN: 300,")
# 2. The un-learned fallback was 11x thickness. Measurement says the real figure is ~2.5-4x,
#    so on a fresh session that would have drawn a flame 3x longer than the worm - the exact
#    error that walks you into a collision. Conservative until something is actually measured.
s = s.replace("const TAIL = { step: 9, lenK: 11.0,", "const TAIL = { step: 9, lenK: 3.2,")
a = """    const q = lenK2 ? lenK2 * bodyPx * bodyPx * TAIL.extrapTrim : 0;
    const lin = (lenRatio || TAIL.lenK) * bodyPx;
    return Math.max(lin, q) * TAIL.lenTrim;"""
b = """    if (!lenRatio && !lenK2) return TAIL.lenK * bodyPx;   // nothing learned yet: stay short
    const q = lenK2 ? lenK2 * bodyPx * bodyPx : 0;        // quadratic fit extrapolates to big worms
    const lin = lenRatio * bodyPx;                        // linear fit is the floor
    return Math.max(lin, q) * TAIL.extrapTrim;"""
assert s.count(a) == 1; s = s.replace(a, b)
open(p,'w',encoding='utf-8').write(s)
print('ok')
PY
node --check content.js && echo VALID
```

## 158 — 2026-08-24T00:57:57 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
p='skinfire.js'; s=open(p,encoding='utf-8').read()
a = "        if (data && fmt === DXT5 && dims === BASE_DIMS && !api.base) {"
b = """        /* Re-installable. This used to be one-shot (`&& !api.base`), so when the game
           re-uploaded the base atlas - which it does around room transitions and respawns -
           the fire was silently lost and the worm reverted to its real skin. His dad saw
           exactly that: a PINK worm under the truck one round, fire the next. Repaint every
           time the atlas arrives. */
        if (data && fmt === DXT5 && dims === BASE_DIMS) {"""
assert s.count(a) == 1; s = s.replace(a, b)
a2 = """              api.base = true;
              gl = this; baseTex = tex;                       // for the animation loop"""
b2 = """              api.base = true;
              api.installs = (api.installs || 0) + 1;         // >1 means the atlas was re-uploaded
              gl = this; baseTex = tex;                       // for the animation loop"""
assert s.count(a2) == 1; s = s.replace(a2, b2)
# don't re-derive the synthetic art on every re-install
a3 = """              ART.spinner.body = discFrom(ART.orig.body, CELL.body.w, CELL.body.h);"""
b3 = """              if (!ART.spinner.body) ART.spinner.body = discFrom(ART.orig.body, CELL.body.w, CELL.body.h);"""
assert s.count(a3) == 1; s = s.replace(a3, b3)
# keep the FIRST capture of the untouched cells: a later one would capture our own fire
a4 = """              ART.orig.body = extract(px, rec.w, CELL.body);      // BEFORE we overwrite them
              ART.orig.head = extract(px, rec.w, CELL.head);"""
b4 = """              if (!ART.orig.body) {                              // FIRST capture only: a later
                ART.orig.body = extract(px, rec.w, CELL.body);    // one would grab our own fire
                ART.orig.head = extract(px, rec.w, CELL.head);
              }"""
assert s.count(a4) == 1; s = s.replace(a4, b4)
# the look was already chosen on the first install; don't reset it on a re-install
a5 = """              for (var pi2 = 0; pi2 < LOOKS.length; pi2++) { var LA = ART[LOOKS[pi2].art]; if (LA && LA.body) { api.use(LOOKS[pi2].id); break; } }"""
b5 = """              if (!artBody) {                                    // keep the player's chosen look
                for (var pi2 = 0; pi2 < LOOKS.length; pi2++) { var LA = ART[LOOKS[pi2].art]; if (LA && LA.body) { api.use(LOOKS[pi2].id); break; } }
              }"""
assert s.count(a5) == 1; s = s.replace(a5, b5)
open(p,'w',encoding='utf-8').write(s)
print('ok')
PY
node --check skinfire.js && echo VALID && grep -n "api.installs" skinfire.js
```

## 159 — 2026-08-24T00:58:52 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && grep -n "api.use(\|\.use(" skinfire.js content.js | grep -v "^skinfire.js:.*api.use = function"
```

## 160 — 2026-08-24T00:59:13 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
p='skinfire.js'; s=open(p,encoding='utf-8').read()
a = """              if (!artBody) {                                    // keep the player's chosen look
                for (var pi2 = 0; pi2 < LOOKS.length; pi2++) { var LA = ART[LOOKS[pi2].art]; if (LA && LA.body) { api.use(LOOKS[pi2].id); break; } }
              }"""
b = """              /* An art atlas activates itself as a bootstrap (`use('snake')`) so the
                 animation can start before this point, so artBody is already set here.
                 Test for a real LOOK instead, or the player is left on a raw art name that
                 is not in the LB cycle. On a RE-install, keep whatever they chose. */
              var hasLook = false;
              for (var lk = 0; lk < LOOKS.length; lk++) if (LOOKS[lk].id === api.lookId) hasLook = true;
              if (!hasLook) {
                for (var pi2 = 0; pi2 < LOOKS.length; pi2++) { var LA = ART[LOOKS[pi2].art]; if (LA && LA.body) { api.use(LOOKS[pi2].id); break; } }
              }"""
assert s.count(a) == 1; s = s.replace(a, b)
open(p,'w',encoding='utf-8').write(s)
print('ok')
PY
node --check skinfire.js && echo VALID
```

## 161 — 2026-08-24T01:00:48 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
p='content.js'; s=open(p,encoding='utf-8').read()
# Under 'lighter', overlapping sprites SUM. A near-white core (255,245,180) saturates to a
# white blob the moment two embers overlap - which is always, in a dense trail. Start the
# gradients much oranger so the sum lands on fire colour instead of clipping.
a = "  const sprHot = mkSpr([[0, 'rgba(255,245,180,.95)'], [.4, 'rgba(255,150,40,.8)'], [1, 'rgba(200,40,10,0)']]);"
b = "  const sprHot = mkSpr([[0, 'rgba(255,196,86,.95)'], [.42, 'rgba(255,124,26,.82)'], [1, 'rgba(186,38,8,0)']]);"
assert s.count(a) == 1; s = s.replace(a, b)
a2 = "  const sprCool = mkSpr([[0, 'rgba(255,190,80,.85)'], [.5, 'rgba(235,100,25,.6)'], [1, 'rgba(120,30,10,0)']]);"
b2 = "  const sprCool = mkSpr([[0, 'rgba(252,158,52,.85)'], [.5, 'rgba(222,84,18,.62)'], [1, 'rgba(110,26,8,0)']]);"
assert s.count(a2) == 1; s = s.replace(a2, b2)
a3 = "  const sprCore = mkSpr([[0, 'rgba(255,255,240,.98)'], [.55, 'rgba(255,225,140,.75)'], [1, 'rgba(255,180,60,0)']]);"
b3 = "  const sprCore = mkSpr([[0, 'rgba(255,238,178,.92)'], [.55, 'rgba(255,186,80,.7)'], [1, 'rgba(255,140,40,0)']]);"
assert s.count(a3) == 1; s = s.replace(a3, b3)
s = s.replace("flameA: 0.62,          // <1 so dense overlap lands on ORANGE instead of clipping white",
              "flameA: 0.40,          // <1 so dense overlap lands on ORANGE instead of clipping white")
s = s.replace("latK: 0.20, coreT: 0.15, coreA: 0.10,", "latK: 0.20, coreT: 0.14, coreA: 0.055,")
open(p,'w',encoding='utf-8').write(s)
print('ok')
PY
node --check content.js && echo VALID
```

## 162 — 2026-08-24T01:02:00 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
p='content.js'; s=open(p,encoding='utf-8').read()
# Additive blending adds every channel equally, so ANY sprite whose G and B are close to
# its R turns white after two or three overlaps - which is guaranteed in a dense trail, and
# is why the jet kept coming out white however much alpha was lowered. Make the sprite deep
# orange-RED: with G and B far below R, accumulation climbs orange -> yellow -> white only at
# the very hottest centre, which is exactly how a real flame is graded.
a = "  const sprHot = mkSpr([[0, 'rgba(255,196,86,.95)'], [.42, 'rgba(255,124,26,.82)'], [1, 'rgba(186,38,8,0)']]);"
b = "  const sprHot = mkSpr([[0, 'rgba(255,96,18,.95)'], [.42, 'rgba(226,52,10,.82)'], [1, 'rgba(150,20,4,0)']]);"
assert s.count(a) == 1; s = s.replace(a, b)
a2 = "  const sprCool = mkSpr([[0, 'rgba(252,158,52,.85)'], [.5, 'rgba(222,84,18,.62)'], [1, 'rgba(110,26,8,0)']]);"
b2 = "  const sprCool = mkSpr([[0, 'rgba(236,74,14,.85)'], [.5, 'rgba(186,40,8,.62)'], [1, 'rgba(92,16,4,0)']]);"
assert s.count(a2) == 1; s = s.replace(a2, b2)
# the accumulation now produces the hot centre on its own; an explicit white core just
# re-introduces the blob
s = s.replace("latK: 0.20, coreT: 0.14, coreA: 0.055,", "latK: 0.20, coreT: 0.14, coreA: 0.0,")
s = s.replace("flameA: 0.40,          // <1 so dense overlap lands on ORANGE instead of clipping white",
              "flameA: 0.50,          // overlap is what builds the bright core, so it can be generous")
open(p,'w',encoding='utf-8').write(s)
print('ok')
PY
node --check content.js && echo VALID
```

## 163 — 2026-08-24T01:03:26 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake" && cat >> README.md << 'MD'

## v3.4 — Why the fire kept coming out wrong (2026-08-23)

His dad: *"STILL NOT WORKING.. WE HAD THE COOL FIRE TAIL (LOOKS LIKE THE FIRE COMING FROM THE
TRUCK) IN THE FIRST ITERATION AND WE LOST IT"*. Four independent bugs, only one of which was
about the fire itself. Read this section before touching the trail or the skin install.

### 1. Additive blending saturates to white — THE root cause of every "tube"/"blob" complaint
The trail draws with `globalCompositeOperation = 'lighter'`, which **adds every channel
equally**. A sprite whose centre is near-white (`rgba(255,245,180)`) turns pure white after
two or three overlaps, and overlaps are guaranteed in a dense trail. That is why lowering
alpha never fixed it — at any alpha, enough overlap clips to white, which reads as a glowing
tube rather than fire. The fix is chromatic, not alpha: make the sprite **deep orange-red**
(`rgba(255,96,18)`) so G and B sit far below R. Accumulation then climbs
orange → yellow → white-hot only at the very densest core, which is exactly how a flame is
graded. With that in place the explicit white "core" pass became unnecessary and was removed.

### 2. The path-spine ribbon was the wrong shape of solution
Three smooth layered passes stamped at even arc-length spacing gives an even, continuous
edge — a tube. Fire needs the opposite: **wide per-ember size variance (0.75–1.25), lateral
scatter, and growth over life** so the boundary is ragged and boiling. The v2.5 ember
particle system had all three. It was abandoned because its accuracy depends on flow quality
over each ember's whole lifetime, and flow was fresh only ~33% of frames then; at ~90% lock
that objection is gone. The spine survives only as the **ruler** that measures tail length —
nothing is drawn from it.

### 3. `alpha: 0` on a look made OTHER PLAYERS invisible
His dad: *"when you change the snake it takes the other ones off the screen too... you must be
replacing another skin."* Correct. The cells we repaint live in the **shared** BaseSkinAtlas,
so every other player wearing the same skin samples the same pixels. Recolouring them is
merely odd; setting alpha 0 makes their bodies **invisible**, which is lethal — you cannot
see what you are about to hit. There is no texture-level way to separate our worm from
theirs. Mitigations, in order of preference:
  - keep the body visible and hide it under a dense trail (what v2.5 did), or
  - accept it and **equip a rare skin**, so few other players are affected.
`extension/skinfire.js` has a `spriteCanvas('body','orig')` peek that renders the untouched
cells, which is how we identified *which* skin the rig actually paints (a pale cyan snake
with red brows). If the fire stops appearing on your own worm, you are wearing something else.

### 4. The installer was one-shot, so the fire was LOST on respawn
`if (... && !api.base)` meant the atlas was repainted exactly once. The game re-uploads the
base atlas around room transitions and respawns, after which the worm silently reverted to
its real skin — His dad saw a **pink** worm under the truck one round and fire the next, which
looked like the whole feature was broken. Now it repaints on every upload (`api.installs`
counts them). Three guards were needed alongside that: capture `ART.orig` on the **first**
install only (a later one would capture our own fire), don't rebuild the synthetic `spinner`
disc each time, and don't reset the player's chosen look — testing for `artBody` there is
wrong, because an art atlas activates itself as a bootstrap before the base atlas arrives, so
test for a real LOOK id instead.

### Tail length, and the study of whether the flame sits on the body
`window.__tailFit()` reports how well the trail tracks the worm: **lateral offset 5.8px mean,
16px worst on a 44px-thick worm**, so the path integration is sound. Two metric bugs found
while building it:
- `onBodyPct` counted every probe, including the ones deliberately past the end of the body
  (the spine is a long probe by design). It reported 35% for a well-aligned trail.
- The length scan must **skip entirely when the body is hidden** — otherwise it measures the
  *head sprite*, read 55px, and choked the flame down to a stub.
Length is measured directly when the body is visible; when hidden it extrapolates from a
**quadratic** fit (`len = k·thickness²`, since length tracks mass while thickness grows
sublinearly). A linear ratio learned on a small worm badly understates a big one. The
un-learned fallback was `11 × thickness`; measurement says the real figure is 2.5–4×, so that
would have drawn a flame three times too long on a fresh session — the one error that gets you
killed. It is now 3.2× until something is actually measured.

### Looks (LB), final set
`firewrm` (game-drawn animated fire body — exact length and alignment for free, and the
safest for other players) → `carfire` (car + our flame as the whole tail, body hidden) →
`allfire` (same, no car) → `white` (loader-snake white). Live knobs: `window.__fire`,
`window.__tail`, `window.__tailFit()`, `window.__lenFit()`, `window.__tailLen()`.
MD
echo appended && grep -c "v3.4" README.md
```

## 164 — 2026-08-24T01:04:00 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
import json
p='manifest.json'; m=open(p,encoding='utf-8').read().replace('"version": "3.3"','"version": "3.4"')
open(p,'w',encoding='utf-8').write(m)
p2='content.js'; s=open(p2,encoding='utf-8').read()
s = s.replace("v3.3 \u2014 LB now cycles just 3: fire worm \u00b7 truck+flame tail \u00b7 white.",
              "v3.4 \u2014 real ember fire is back (orange, not white). LB: firewrm \u00b7 carfire \u00b7 allfire \u00b7 white.")
s = s.replace("[snake rig v3.3 \u00b7 3 looks \u00b7 measured flame tail \u00b7 extension] auto-loaded",
              "[snake rig v3.4 \u00b7 ember fire restored \u00b7 re-installing skin \u00b7 extension] auto-loaded")
s = s.replace("localStorage.setItem('__snakeRig', '3.3 '", "localStorage.setItem('__snakeRig', '3.4 '")
open(p2,'w',encoding='utf-8').write(s)
print('ok')
PY
node --check content.js && echo VALID
cd "C:/Users/<user>/.claude/projects/C--Users-<user>/memory" && python - << 'PY'
p='xbox-snake-rig.md'; s=open(p,encoding='utf-8').read()
marker = 'v3.3 TRIMMED TO 3 LOOKS'
new = '''v3.4 (2026-08-23, CURRENT) - FOUR bugs behind "the fire looks wrong". Read README §v3.4
before touching the trail or the skin install; these cost a long frustrating session.
1. **ADDITIVE BLENDING SATURATES TO WHITE.** The trail draws with 'lighter', which adds every
   channel equally, so a near-white sprite centre clips to white after 2-3 overlaps - and
   overlaps are guaranteed in a dense trail. THIS was the root cause of every "glowing tube"
   / "white blob" complaint, and lowering alpha can never fix it. Fix is CHROMATIC: deep
   orange-RED sprite (rgba(255,96,18)) so G and B sit far below R; accumulation then grades
   orange -> yellow -> hot core, like real fire. The explicit white core pass then became
   unnecessary.
2. **The path-spine ribbon was the wrong shape.** Smooth layered passes at even arc-length
   spacing = a tube. Fire needs wide per-ember SIZE VARIANCE (0.75-1.25), lateral SCATTER and
   GROWTH over life so the edge is ragged. The v2.5 ember system (.content-v25.bak.js) has all
   three - it was abandoned only because flow was 33% fresh; at ~90% lock that objection is
   gone. The spine now only MEASURES length; nothing is drawn from it.
3. **alpha 0 on a look made OTHER PLAYERS INVISIBLE.** The cells are in the SHARED
   BaseSkinAtlas, so every player wearing the same skin samples the same pixels. Recolouring
   is odd; alpha 0 is lethal (you cannot see what you are about to hit). No texture-level way
   to separate our worm from theirs. Either keep the body visible and hide it under the trail
   (v2.5's approach), or equip a RARE skin. `__skinFire.spriteCanvas('body','orig')` renders
   the untouched cells - that is how we found the rig paints a pale-cyan red-browed snake. If
   the fire stops showing on your own worm, you are wearing a different skin.
4. **The installer was one-shot, so the fire was LOST on respawn.** The game re-uploads the
   base atlas at room transitions; `!api.base` meant we repainted once, and the worm silently
   reverted to its real skin (His dad saw a PINK worm under the truck, then fire next round,
   which read as the whole feature being broken). Now repaints every upload (`api.installs`).
   Guards that go WITH that: capture ART.orig on the FIRST install only (later would capture
   our own fire), don't rebuild the spinner disc, and don't reset the chosen look - test for a
   real LOOK id, NOT for artBody, because an art atlas activates itself as a bootstrap first.

TAIL LENGTH + the trail study (`__tailFit()`): lateral offset 5.8px mean / 16px worst on a
44px-thick worm, so path integration is sound. Metric traps: onBodyPct must only count probes
INSIDE the body span (the spine is a long probe by design, so counting all probes reported 35%
for a good trail); and the length scan MUST skip when bodyHidden or it measures the HEAD
sprite (read 55px and choked the flame to a stub). Length is measured when the body is
visible, and extrapolated by a QUADRATIC fit (len = k*thickness^2) when hidden - a linear
ratio learned small badly understates a big worm. The un-learned fallback must stay small
(3.2x thickness, not 11x): an overlong flame is the one error that gets you killed.

LOOKS (LB, 4): firewrm (game-drawn animated fire body - exact length/alignment for free and
safest for other players; THE recommended one) / carfire (car + our flame as the whole tail) /
allfire (same, no car) / white (loader-snake white). Live knobs: __fire, __tail, __tailFit(),
__lenFit(), __tailLen().

'''
s = s.replace(marker, new + marker)
open(p,'w',encoding='utf-8').write(s)
print('memory ok')
PY
sed -i 's|(v3.3): steering study|(v3.4): steering study|' "C:/Users/<user>/.claude/projects/C--Users-<user>/memory/MEMORY.md"
grep -c "v3.4" "C:/Users/<user>/.claude/projects/C--Users-<user>/memory/xbox-snake-rig.md"
```

## 165 — 2026-08-24T01:06:21 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
p='content.js'; s=open(p,encoding='utf-8').read()

# ---- 1. the scan must distinguish "the tail ended" from "the tail left the screen"
a = """      if (px < 1 || py < 1 || px >= cw - 1 || py >= ch - 1) break;"""
b = """      if (px < 1 || py < 1 || px >= cw - 1 || py >= ch - 1) { offEdge = true; break; }"""
assert s.count(a) == 1; s = s.replace(a, b)
a = """    const stepN = Math.max(1, Math.round(EXT.stepPx / TAIL.step));
    let lastHit = 0, miss = 0, headHits = 0, probes = 0;"""
b = """    const stepN = Math.max(1, Math.round(EXT.stepPx / TAIL.step));
    let lastHit = 0, miss = 0, headHits = 0, probes = 0, offEdge = false;"""
assert s.count(a) == 1; s = s.replace(a, b)

a = """    extValid = headHits >= 2;
    if (!extValid) return;
    const len = lastHit * TAIL.step;
    if (len > Math.max(24, bodyPx * 1.6)) {        // shorter than that is just the head"""
b = """    extValid = headHits >= 2;
    if (!extValid) return;
    const len = lastHit * TAIL.step;
    /* If the walk ran off the edge of the viewport while still ON the body, the worm is
       LONGER than the screen and `len` is only a floor - his dad: "you can obviously see it's
       not as long as the worm". Record it as a lower bound, never as the answer. */
    extFloor = offEdge && miss === 0 ? len : 0;
    if (extFloor) { if (len > tailLenPx) tailLenPx = len; return; }
    if (len > Math.max(24, bodyPx * 1.6)) {        // shorter than that is just the head"""
assert s.count(a) == 1; s = s.replace(a, b)
s = s.replace("let extCtx = null, extN = 0, tailLenPx = 0, lenRatio = 0, lenK2 = 0, extValid = false;",
              "let extCtx = null, extN = 0, tailLenPx = 0, lenRatio = 0, lenK2 = 0, extValid = false, extFloor = 0;")

# ---- 2. when the reading is only a floor, extrapolate past it
a = """    const measured = extValid ? tailLenPx : 0;
    if (measured > 24) return measured * TAIL.lenTrim;"""
b = """    const measured = extValid && !extFloor ? tailLenPx : 0;
    if (measured > 24) return measured * TAIL.lenTrim;   // a complete reading: trust it exactly
    if (extFloor) {                                      // viewport-limited: go PAST the floor
      const q2 = lenK2 ? lenK2 * bodyPx * bodyPx : 0;
      return Math.max(extFloor, q2, lenRatio * bodyPx) * TAIL.floorPush;
    }"""
assert s.count(a) == 1; s = s.replace(a, b)
s = s.replace("lenTrim: 1.00, extrapTrim: 0.90, maxN: 300,",
              "lenTrim: 1.00, extrapTrim: 0.90, floorPush: 1.35, maxN: 700,")

# ---- 3. spatial density, so a long trail is affordable and life can grow with the worm
a = """      spawnAcc += (boost ? FIRE.boostRate : FIRE.rate) * dtR;   // per 60Hz frame: density is fps-independent"""
b = """      /* Spawn per DISTANCE, not per frame. A fixed per-frame rate makes density depend on
         speed and forces a low ember lifetime to stay inside the budget, which is what kept
         the flame shorter than the worm. Fixed spatial spacing decouples the two: a long
         trail costs the same per pixel however fast you are going. */
      const perFrame = Math.max(0.35, Math.min(FIRE.rate, spd * dtR / FIRE.spacing));
      spawnAcc += perFrame * (boost ? 1.5 : 1);"""
assert s.count(a) == 1; s = s.replace(a, b)
a = """      const lifeMax = boost ? FIRE.boostLife : FIRE.life;
      const lifeCap = targetLen > 24 ? Math.min(lifeMax, targetLen / Math.max(1.2, spd)) : lifeMax;"""
b = """      /* Length is what the worm says it is: life = length / speed, not a fixed constant.
         Clamped only by the hard ceiling that protects the ember budget. */
      const lifeCap = targetLen > 24
        ? Math.max(12, Math.min(FIRE.lifeMax, targetLen / Math.max(1.2, spd)))
        : (boost ? FIRE.boostLife : FIRE.life);"""
assert s.count(a) == 1; s = s.replace(a, b)
s = s.replace("rate: 6, boostRate: 10, life: 110, boostLife: 130,\n                 max: 1000,",
              "rate: 6, boostRate: 10, life: 110, boostLife: 130, lifeMax: 420, spacing: 6.5,\n                 max: 2200,")
open(p,'w',encoding='utf-8').write(s)
print('ok')
PY
node --check content.js && echo VALID && grep -n "floorPush\|lifeMax\|spacing:" content.js | head
```

## 166 — 2026-08-24T01:06:48 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
p='content.js'; s=open(p,encoding='utf-8').read()
# "the flame should always be as long as the worm if the truck is on" - so the short 'puff'
# exhaust is gone: every trail mode except 'none' now runs the full body length. The mode's
# life/max are only the fallback used before a length is known.
a = """      if (tMode === 'long') {         // 'purefire': the ember fire IS the tail (v2.5 values)
        FIRE.life = 110; FIRE.boostLife = 130; FIRE.rate = 9; FIRE.boostRate = 14; FIRE.max = 1400;
      } else if (tMode === 'none') {  // 'white': nothing behind it, the body speaks for itself
        FIRE.life = 60; FIRE.boostLife = 80; FIRE.rate = 0; FIRE.boostRate = 0; FIRE.max = 500;
        killFire();
      } else {                        // 'puff': real fire, but shorter than the flame body
        FIRE.life = 32; FIRE.boostLife = 46; FIRE.rate = 8; FIRE.boostRate = 12; FIRE.max = 600;"""
b = """      if (tMode === 'none') {         // 'white': nothing behind it, the body speaks for itself
        FIRE.rate = 0; FIRE.boostRate = 0;
        killFire();
      } else {                        // every fire look: full body length, spatially spawned
        FIRE.life = 110; FIRE.boostLife = 130; FIRE.rate = 6; FIRE.boostRate = 10; FIRE.max = 2200;"""
assert s.count(a) == 1; s = s.replace(a, b)
open(p,'w',encoding='utf-8').write(s)
PY
sed -n "$(grep -n "if (tMode === 'none')" content.js | cut -d: -f1),+8p" content.js
```

## 167 — 2026-08-24T01:07:00 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && sed -n "$(grep -n "if (tMode !== trailMode)" content.js | cut -d: -f1),+12p" content.js
```

## 168 — 2026-08-24T01:07:17 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
p='content.js'; s=open(p,encoding='utf-8').read()
a = """      if (tMode === 'long') {         // 'purefire': the ember fire IS the tail (v2.5 values)
        FIRE.life = 110; FIRE.boostLife = 130; FIRE.rate = 6; FIRE.boostRate = 10; FIRE.max = 1000;
      } else if (tMode === 'none') {  // 'white': nothing behind it, the body speaks for itself
        FIRE.life = 60; FIRE.boostLife = 80; FIRE.rate = 0; FIRE.boostRate = 0; FIRE.max = 500;
        killFire();
      } else {                        // 'puff': real fire, but shorter than the flame body
        FIRE.life = 32; FIRE.boostLife = 46; FIRE.rate = 8; FIRE.boostRate = 12; FIRE.max = 600;
      }"""
b = """      /* "the flame should always be as long as the worm if the truck is on" - so the short
         'puff' exhaust is gone. Every fire look now runs the full body length; life is
         derived per-frame from the measured length, and these are only the fallbacks used
         before a length is known. */
      if (tMode === 'none') {         // 'white': nothing behind it, the body speaks for itself
        FIRE.rate = 0; FIRE.boostRate = 0;
        killFire();
      } else {
        FIRE.life = 110; FIRE.boostLife = 130; FIRE.rate = 6; FIRE.boostRate = 10; FIRE.max = 2200;
      }"""
assert s.count(a) == 1; s = s.replace(a, b)
# maxN is now 700 nodes; stride the perpendicular fit scan so the study stays cheap
a2 = "      if (hit && i > 4 && i + 1 < spine.length) {"
b2 = "      if (hit && i > 4 && i + 1 < spine.length && (i & 3) === 0) {   // every 4th node is plenty"
assert s.count(a2) == 1; s = s.replace(a2, b2)
open(p,'w',encoding='utf-8').write(s)
print('ok')
PY
node --check content.js && echo VALID
```

## 169 — 2026-08-24T01:09:21 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
p='content.js'; s=open(p,encoding='utf-8').read()
i0 = s.index("    const stepN = Math.max(1, Math.round(EXT.stepPx / TAIL.step));")
i1 = s.index("    FIT.n++;")
old = s[i0:i1]
new = '''    const stepN = Math.max(1, Math.round(EXT.stepPx / TAIL.step));
    let lastHit = 0, miss = 0, headHits = 0, probes = 0, offEdge = false, latOff = 0;
    const hitAt = (sx, sy) => {
      const qx = Math.round((sx - r.left) / r.width * cw);
      const qy = Math.round((sy - r.top) / r.height * ch);
      if (qx < 1 || qy < 1 || qx >= cw - 1 || qy >= ch - 1) return -1;      // off-viewport
      const qo = (qy * cw + qx) * 4;
      return (img[qo] > img[qo + 2] + EXT.warm ||
              (img[qo] > EXT.bright && img[qo + 1] > EXT.bright && img[qo + 2] > EXT.bright)) ? 1 : 0;
    };
    /* This walk is a TRACKER, not a blind trace. The spine is the HEAD's path, and over a
       few thousand px the flow integration drifts sideways; once it drifts past half the body
       width the probe falls off the worm and the walk stops early, which is what reported
       751px for a body several screens long. So at each step we find the body's lateral
       centroid and carry that correction forward, slew-limited so noise cannot run away. */
    for (let i = 0; i < spine.length; i += stepN) {
      const a = spine[Math.max(0, i - 1)], b2 = spine[Math.min(spine.length - 1, i + 1)];
      let tx = a.x - b2.x, ty = a.y - b2.y;
      const tl = Math.hypot(tx, ty) || 1;
      const nx = -ty / tl, ny = tx / tl;                   // unit normal, screen space
      const sx = spine[i].x + nx * latOff, sy = spine[i].y + ny * latOff;
      const h0 = hitAt(sx, sy);
      if (h0 < 0) { offEdge = true; break; }
      const hit = h0 === 1;
      if (probes < 3 && hit) headHits++;
      probes++;
      if (hit) { FIT.hits++; FIT.probes++; FIT.lastHitProbe = FIT.probes; }
      else if (miss < EXT.miss) FIT.probes++;              // a gap INSIDE the body counts against us
      // lateral centroid: re-centre the tracker, and record the error for the fit study
      if ((i & 3) === 0) {
        let wsum = 0, wn = 0;
        for (let d = -FIT.lat; d <= FIT.lat; d += 2) {
          const q = hitAt(sx + nx * d, sy + ny * d);
          if (q === 1) { wsum += d; wn++; }
        }
        if (wn >= 3) {
          const off = wsum / wn;
          latOff += Math.max(-5, Math.min(5, off));        // slew-limited correction
          if (i > 4) { FIT.offSum += Math.abs(off); FIT.offN++; if (Math.abs(off) > FIT.offMax) FIT.offMax = Math.abs(off); }
        }
      }
      if (hit) { lastHit = i; miss = 0; }
      else if (++miss >= EXT.miss) break;
    }
'''
s = s[:i0] + new + s[i1:]

# off-screen exit while still on the body: the only bound we have left is our own path history
a = """    extFloor = offEdge && miss === 0 ? len : 0;
    if (extFloor) { if (len > tailLenPx) tailLenPx = len; return; }"""
b = """    /* Ran off the viewport while still ON the body: the worm is longer than the screen and
       there is no way to see the rest. The one hard bound left is the path we have traced,
       and the body cannot be longer than where we have recently been - so use that. */
    extFloor = offEdge && miss === 0 ? Math.max(len, spine.length * TAIL.step) : 0;
    if (extFloor) { tailLenPx += (extFloor - tailLenPx) * EXT.ema; return; }"""
assert s.count(a) == 1; s = s.replace(a, b)
a2 = """    if (extFloor) {                                      // viewport-limited: go PAST the floor
      const q2 = lenK2 ? lenK2 * bodyPx * bodyPx : 0;
      return Math.max(extFloor, q2, lenRatio * bodyPx) * TAIL.floorPush;
    }"""
b2 = """    if (extFloor) return extFloor;                       // already the full traced path"""
assert s.count(a2) == 1; s = s.replace(a2, b2)
open(p,'w',encoding='utf-8').write(s)
print('ok')
PY
node --check content.js && echo VALID && grep -c "latOff" content.js
```

## 170 — 2026-08-24T01:10:28 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
p='content.js'; s=open(p,encoding='utf-8').read()
# lifeMax was the new limiter on a very long worm: at 6300px of traced path and ~10px/frame
# the flame needs ~630 frames of ember life. Spatial spawning keeps the ember count sane.
s = s.replace("lifeMax: 420, spacing: 6.5,", "lifeMax: 900, spacing: 6.5,")
s = s.replace("  window.__tailLen = () => tailLenPx;",
              "  window.__tailLen = () => tailLenPx;\n  window.__spine = () => ({ nodes: spine.length, px: spine.length * TAIL.step, floor: Math.round(extFloor), embers: embers.length });")
open(p,'w',encoding='utf-8').write(s)
print('ok')
PY
node --check content.js && echo VALID
```

## 171 — 2026-08-24T01:12:05 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
p='content.js'; s=open(p,encoding='utf-8').read()
a = """        if (wn >= 3) {
          const off = wsum / wn;
          latOff += Math.max(-5, Math.min(5, off));        // slew-limited correction
          if (i > 4) { FIT.offSum += Math.abs(off); FIT.offN++; if (Math.abs(off) > FIT.offMax) FIT.offMax = Math.abs(off); }
        }"""
b = """        if (wn >= 3) {
          const off = wsum / wn;
          if (i > 4) { FIT.offSum += Math.abs(off); FIT.offN++; if (Math.abs(off) > FIT.offMax) FIT.offMax = Math.abs(off); }
          /* CLOSED LOOP. The path comes from integrating measured camera motion, so its
             error accumulates - far down the tail the trail visibly diverges from the body
             even though it is only ~5px out near the head. We already know where the body
             actually is, so push the spine ONTO it. Open-loop integration can never fix
             this; one correction per scan can, and it converges in well under a second. */
          const corr = (latOff + off) * EXT.snap;
          const j0 = Math.max(0, i - stepN + 1), j1 = Math.min(spine.length - 1, i + stepN - 1);
          for (let j = j0; j <= j1; j++) { spine[j].x += nx * corr; spine[j].y += ny * corr; }
          latOff += Math.max(-5, Math.min(5, off)) - corr;  // what the snap already absorbed
        }"""
assert s.count(a) == 1; s = s.replace(a, b)
s = s.replace("const EXT = { every: 5, w: 460, ema: 0.12, stepPx: 12, miss: 9, warm: 18, bright: 185 };",
              "const EXT = { every: 5, w: 460, ema: 0.12, stepPx: 12, miss: 9, warm: 18, bright: 185, snap: 0.40 };")
open(p,'w',encoding='utf-8').write(s)
print('ok')
PY
node --check content.js && echo VALID
```

## 172 — 2026-08-24T01:13:44 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake" && cat >> README.md << 'MD'

### v3.4b — "it's not as long as the worm" (2026-08-23)

Three wrong assumptions, not tuning misses.

**1. Thickness SATURATES, so it cannot estimate length on a big worm.** Measured: bodyPx was
~50 at score 594 and still ~53 at score 3164, while the body grew several screens longer. Every
length model keyed off thickness (linear ratio, quadratic fit) is therefore useless above a few
hundred points. Don't reach for it again.

**2. Pixel measurement is capped by the VIEWPORT.** The scan walks the recorded path through
the captured frame looking for where the body's pixels stop — but a big worm runs off the edge
of the screen, the walk hit the frame boundary, and that was being treated as "the tail ends
here". It reported 497–751px for a body several screens long. The fix is to detect *why* the
walk stopped: if it exited at the viewport edge while still ON the body, the reading is a
**floor**, not an answer, and the only hard bound left is our own path history — the body cannot
be longer than where we have recently been. So the length becomes the full traced path
(`maxN × step`, now 6300px). Ember lifetime then has to be allowed to reach ~600 frames, which
is only affordable because of the next change.

**3. Spawn embers per DISTANCE, not per frame.** A fixed per-frame rate makes density depend on
speed and forces a short ember lifetime to stay inside the budget — which is what capped the
trail length. Fixed spatial spacing (`FIRE.spacing`) decouples them: a long trail costs the
same per pixel however fast you go, so `life = length / speed` can be honoured. Also: the short
`puff` mode is gone — His dad: *"the flame should always be as long as the worm if the truck is
on"*, so every fire look now runs the full body length.

**4. Open-loop path integration drifts, so close the loop.** Even at ~5px lateral error near
the head, integrating measured camera motion accumulates, and far down a 3000px tail the trail
visibly diverges from the body. But the scan already finds the body's true lateral centroid at
every step — it just wasn't being used for anything except reporting. Feeding it back
(`EXT.snap`, pushing the spine nodes onto the measured centreline) took **on-body 82% → 95.2%
and lateral error 5.3px → 2.5px**, and it converges in under a second. The scan is now a
tracker with lateral re-centring rather than a blind trace, which also stops it losing the body
and terminating early.

Diagnostics: `__spine()` (nodes / px / floor / live embers), `__tailFit()`, `__lenFit()`.
MD
python - << 'PY'
p='C:/Users/<user>/.claude/projects/C--Users-<user>/memory/xbox-snake-rig.md'
s=open(p,encoding='utf-8').read()
ins = '''v3.4b - "not as long as the worm". Four things, all wrong ASSUMPTIONS not tuning:
a) **THICKNESS SATURATES** - bodyPx ~50 at score 594 and still ~53 at 3164 while the body grew
   several screens. So NO length model keyed off thickness works on a big worm. Don't retry it.
b) **Pixel length measurement is capped by the VIEWPORT.** A big worm runs off-screen, the walk
   hit the frame edge, and that was read as "tail ends here" (reported 497-751px for a body
   several screens long). Fix: detect WHY the walk stopped - edge-exit while still ON the body
   means the reading is a FLOOR, and the only hard bound left is our own path history (the body
   cannot be longer than where we recently were), so use the full traced path (maxN*step=6300px).
c) **Spawn embers per DISTANCE, not per frame.** A per-frame rate ties density to speed and
   forces a short ember life to stay in budget - that is what capped trail length. Fixed spatial
   spacing lets life = length/speed be honoured. The short 'puff' mode is gone: every fire look
   runs full body length ("the flame should always be as long as the worm if the truck is on").
d) **Open-loop integration drifts - CLOSE THE LOOP.** The scan already finds the body's lateral
   centroid at each step; feeding it back to push the spine onto the body (EXT.snap) took
   on-body 82%->95.2% and lateral 5.3px->2.5px, converging in under a second. The scan is now a
   tracker with lateral re-centring, which also stops it losing the body and stopping early.
Diagnostics: __spine(), __tailFit(), __lenFit(), __tailLen(), __fire, __tail.

'''
s = s.replace('v3.4 (2026-08-23, CURRENT)', ins + 'v3.4 (2026-08-23)')
open(p,'w',encoding='utf-8').write(s)
print('memory ok')
PY
cd "C:/Users/<user>/dev/xbox-snake/extension" && python -c "
m=open('manifest.json',encoding='utf-8').read().replace('\"version\": \"3.4\"','\"version\": \"3.4.1\"')
open('manifest.json','w',encoding='utf-8').write(m)" && node --check content.js && echo "ALL VALID"
```

## 173 — 2026-08-24T01:26:36 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && echo "=== disk build markers ===" && for k in "EXT.snap" "__spine" "spacing:" "extFloor" "lifeMax: 900" "rgba(255,96,18"; do printf "%-18s %s\n" "$k" "$(grep -c -- "$k" content.js)"; done; echo; echo "=== versions ===" && grep -o '"version": "[^"]*"' manifest.json && grep -o "v3\.4[^ ]* \u2014" content.js | head -2; echo; echo "=== mtimes ===" && ls -la --time-style=+%H:%M content.js skinfire.js manifest.json
```

## 174 — 2026-08-24T01:33:00 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
p='skinfire.js'; s=open(p,encoding='utf-8').read()
i0 = s.index('  var LOOKS = [')
i1 = s.index('  var look = LOOKS[0];')
new = '''  /* THE GOAL (His dad, 2026-08-23): "what we really want is the fire to be as long as the tail
     from the car... so the fireworm is just to demo to get there".
     The trick that makes it work: DO NOT hide the body with alpha 0.
       - alpha 0 destroys the only signal we can measure, so the flame length becomes a guess
         (and every guess was wrong: thickness saturates, so it cannot predict length);
       - alpha 0 also blanks out every other player wearing this skin, which is lethal.
     Keep the body VISIBLE and COVER it with the flame instead. Then the length is measured
     live and is exactly right by construction, the hitbox is honest, other players are fine,
     and any bleed-through is fire art anyway so it still reads as fire.
     Art is 'blaze' - the big bold licking flame. 'snake' is the weaker round blob and is what
     his dad meant by "i dont even think we have the right fire worm". */
  var LOOKS = [
    { id: 'carfire', art: 'blaze', alpha: 1.00, alphaHead: 1.00, flicker: false, amp: 1.3, trail: 'long' },
    { id: 'allfire', art: 'blaze', alpha: 1.00, alphaHead: 1.00, flicker: false, amp: 1.3,
      trail: 'long', hideTruck: true },
    /* the loader-spinner white: flat, smooth, dark eyes kept, no trail */
    { id: 'white',   art: 'spinner', alpha: 1.00, alphaHead: 1.00, flicker: false, amp: 0.0,
      trail: 'none', mono: [255, 255, 255], monoFlat: true, monoKeepDark: 105 }
  ];
'''
s = s[:i0] + new + s[i1:]
open(p,'w',encoding='utf-8').write(s)
print('looks:', [l for l in ['carfire','allfire','white'] if "'"+l+"'" in s])
PY
python - << 'PY'
p='C:/Users/<user>/dev/xbox-snake/extension/content.js'; s=open(p,encoding='utf-8').read()
# The flame must COVER the body, so its width has to at least match body thickness at the
# head. It was 5 + 0.30*thickness = 44px on a 57px body, so the worm showed through at the
# neck. Match it at the head and let it flare only modestly.
a = """                 rBase: 5, rBaseBoost: 7, rBody: 0.30, rBoost: 0.38,     // v2.5 character, scaled to the worm
                 grow: 1.2, growBoost: 1.7,                              // v2.5 billow: embers swell 2.2x"""
b = """                 rBase: 5, rBaseBoost: 7, rBody: 0.42, rBoost: 0.50,     // >= body width at the head
                 grow: 0.55, growBoost: 0.80,                            // modest flare, not a balloon"""
assert s.count(a) == 1; s = s.replace(a, b)
open(p,'w',encoding='utf-8').write(s)
print('ok')
PY
cd "C:/Users/<user>/dev/xbox-snake/extension" && node --check content.js && node --check skinfire.js && echo "BOTH VALID"
```

## 175 — 2026-08-24T01:35:45 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake" && cat >> README.md << 'MD'

### v3.5 — the actual goal, and why it was hard (2026-08-23)

His dad: *"what we really want is the fire to be as long as the tail from the car... so the
fireworm is just to demo to get there."* The `firewrm` look was only ever scaffolding.

**The key realisation: do not hide the body with `alpha: 0`.** Every failure chased in v3.4
came from that one decision:
- `alpha: 0` destroys the only measurable signal, so the flame's length becomes a guess — and
  every guess was wrong, because **thickness saturates** (~50px at score 594 and still ~53px at
  3164) and so cannot predict length;
- `alpha: 0` also blanks out every other player wearing the same skin, which is lethal.

Keep the body **visible** and **cover** it with the flame instead — which is what v2.5 did all
along. Then the length is measured live and is exactly right by construction, the hitbox stays
honest, other players are unaffected, and any bleed-through is fire art anyway so it still
reads as fire. The flame's width therefore has to at least match body thickness at the head
(`rBody` 0.30 → 0.42 of thickness; it was 44px on a 57px body, so the worm showed at the neck)
with only a modest flare down the tail (`grow` 1.2 → 0.55) rather than ballooning.

**Art: use `blaze`, not `snake`.** his dad: *"i dont even think we have the right fire worm.. you
can see the other one."* Correct — `blaze` (17e8769c) is the big bold licking flame that the
game's own fire skin uses; `snake` (db489690) is a smaller round blob. Compare them in-page with
`__skinFire.spriteCanvas('body','blaze'|'snake'|'fish')`.

Looks reduced to three: `carfire` (car + full-length flame) → `allfire` (same, no car) →
`white`. `firewrm` is gone; with the body visible under `carfire` it no longer had a purpose.
MD
python - << 'PY'
p='C:/Users/<user>/.claude/projects/C--Users-<user>/memory/xbox-snake-rig.md'
s=open(p,encoding='utf-8').read()
ins = '''v3.5 (2026-08-23, CURRENT) - THE CRUX, and it invalidates a lot of v3.4 effort:
**NEVER hide the worm body with alpha 0. Keep it VISIBLE and COVER it with the flame.**
Goal in his dad's words: "what we really want is the fire to be as long as the tail from the car
... so the fireworm is just to demo to get there". alpha 0 caused BOTH big problems:
 - it destroys the only measurable signal, so flame length becomes a guess - and no guess can
   work because THICKNESS SATURATES (~50px at score 594, still ~53px at 3164);
 - it blanks out every other player on the same shared-atlas skin, which is lethal.
With the body visible the length is MEASURED live and exact by construction, the hitbox is
honest, other players are fine, and bleed-through is fire art so it still reads as fire. The
flame width must therefore be >= body thickness at the head (rBody 0.42 of thickness; 0.30 gave
44px on a 57px body so the worm showed at the neck) with only a modest flare (grow 0.55, not 1.2).
ART: use 'blaze' (17e8769c, the big bold licking flame the game's own fire skin uses), NOT
'snake' (db489690, a smaller round blob) - "i dont even think we have the right fire worm".
Compare in-page: __skinFire.spriteCanvas('body','blaze'|'snake'|'fish').
LOOKS now 3: carfire (car + full-length flame) / allfire (same, no car) / white. firewrm dropped.
NOTE: the MCP window twice navigated itself to about:blank mid-session, which reads exactly like
"the build isn't updating" - check list_pages before believing a no-op.

'''
s = s.replace('v3.4b - "not as long as the worm"', ins + 'v3.4b - "not as long as the worm"')
open(p,'w',encoding='utf-8').write(s)
print('ok')
PY
cd "C:/Users/<user>/dev/xbox-snake/extension" && python -c "
m=open('manifest.json',encoding='utf-8').read().replace('\"version\": \"3.4.1\"','\"version\": \"3.5\"')
open('manifest.json','w',encoding='utf-8').write(m)" && grep -o '\"version\": \"[^\"]*\"' manifest.json
```

## 176 — 2026-08-24T01:39:23 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && grep -n "function fp\|fingerprint\|function hash\|ART\[name\]\|for (var n in ART)\|dims\b\|BASE_DIMS\|ART_DIMS\|512\|256" skinfire.js | head -30
```

## 177 — 2026-08-24T01:41:08 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
p='content.js'; s=open(p,encoding='utf-8').read()
a = """      const sx = spine[i].x + nx * latOff, sy = spine[i].y + ny * latOff;
      const h0 = hitAt(sx, sy);
      if (h0 < 0) { offEdge = true; break; }
      const hit = h0 === 1;"""
b = """      let sx = spine[i].x + nx * latOff, sy = spine[i].y + ny * latOff;
      let h0 = hitAt(sx, sy);
      if (h0 < 0) { offEdge = true; break; }
      /* RE-ACQUIRE before giving up. A single probe that misses does not mean the body ended
         - far more often the tracker has slid sideways, or the probe landed in a transparent
           gap between flame tongues. Sweep out perpendicular first; only a miss that survives
           the sweep is a real end-of-body. Without this the walk quit ~240px back and the
           whole trail collapsed to 37 embers. */
      if (h0 === 0) {
        const R2 = Math.max(20, bodyPx * 1.3);
        let bestD = null;
        for (let d = 3; d <= R2; d += 3) {
          if (hitAt(sx + nx * d, sy + ny * d) === 1) { bestD = d; break; }
          if (hitAt(sx - nx * d, sy - ny * d) === 1) { bestD = -d; break; }
        }
        if (bestD != null) {
          latOff += bestD;
          sx += nx * bestD; sy += ny * bestD;
          h0 = 1;
        }
      }
      const hit = h0 === 1;"""
assert s.count(a) == 1; s = s.replace(a, b)
# and the offset itself must not be allowed to wander off the worm
a2 = """          latOff += Math.max(-5, Math.min(5, off)) - corr;  // what the snap already absorbed"""
b2 = """          latOff += Math.max(-5, Math.min(5, off)) - corr;  // what the snap already absorbed
          const lim = Math.max(24, bodyPx * 1.5);          // never let the tracker wander off
          latOff = Math.max(-lim, Math.min(lim, latOff));"""
assert s.count(a2) == 1; s = s.replace(a2, b2)
open(p,'w',encoding='utf-8').write(s)
print('ok')
PY
node --check content.js && echo VALID
```

## 178 — 2026-08-24T01:43:12 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
p='skinfire.js'; s=open(p,encoding='utf-8').read()

a = """      return function (target, level, xo, yo, w, h, fmt) {
        var tex = bound[target];
        if (tex && replaced.has(tex)) return;                 // swallow mips of a repainted atlas
        var rec = tex && pending.get(tex);
        if (!rec) return orig.apply(this, arguments);"""
b = """      return function (target, level, xo, yo, w, h, fmt) {
        var tex = bound[target];
        if (tex && replaced.has(tex)) return;                 // swallow mips of a repainted atlas
        var rec = tex && pending.get(tex);
        /* DIAGNOSTIC: the texStorage2D gate only intercepts two atlas SIZES, so every other
           skin atlas passes through completely unseen - which is why "we don't have blaze".
           Reading the bytes here is zero-risk (we don't defer or replace anything), so record
           every level-0 DXT5 atlas and let it through untouched. api.showDumps() renders them
           so the real fire skin can be identified by eye instead of guessed at. */
        if (api.dumpOn && level === 0 && fmt === DXT5 && w >= 128 && h >= 64 && w <= 1024 && h <= 512) {
          try {
            var d0 = bytesOf(arguments, 7);
            if (d0) {
              var hh0 = fnv1a(d0), seen0 = false;
              for (var dj = 0; dj < DUMP.length; dj++) if (DUMP[dj].hash === hh0) seen0 = true;
              if (!seen0 && DUMP.length < 28) {
                var px0 = null;
                try { px0 = decodeDXT5(d0, w, h); } catch (e0) {}
                DUMP.push({ hash: hh0, w: w, h: h, px: px0 });
              }
            }
          } catch (e1) {}
        }
        if (!rec) return orig.apply(this, arguments);"""
assert s.count(a) == 1; s = s.replace(a, b)

# registry + viewer
a2 = "  api.use = function (name) {"
b2 = """  var DUMP = [];
  api.dumpOn = true;
  api.dumps = function () {
    return DUMP.map(function (d, i) {
      return { i: i, hash: d.hash, dims: d.w + 'x' + d.h, decoded: !!d.px,
               known: (function () { for (var k in ART) if (ART[k].hash === d.hash) return k; return null; })() };
    });
  };
  /* render every captured atlas into the page so it can be identified visually */
  api.showDumps = function (scale) {
    scale = scale || 0.62;
    var box = document.getElementById('__atlasDump');
    if (box) box.remove();
    box = document.createElement('div');
    box.id = '__atlasDump';
    box.style.cssText = 'position:fixed;inset:2% 1% auto 1%;max-height:96vh;overflow:auto;z-index:2147483647;' +
      'background:#06080bf2;border:2px solid #ff7a00;border-radius:10px;padding:10px;' +
      'font:11px ui-monospace,monospace;color:#ffd7a8';
    for (var i = 0; i < DUMP.length; i++) {
      var d = DUMP[i];
      if (!d.px) continue;
      var w2 = document.createElement('div');
      w2.style.cssText = 'display:inline-block;margin:4px;text-align:center;vertical-align:top';
      var c = document.createElement('canvas');
      c.width = d.w; c.height = d.h;
      c.style.cssText = 'width:' + Math.round(d.w * scale) + 'px;height:' + Math.round(d.h * scale) +
        'px;background:#16323f;border-radius:4px;image-rendering:pixelated;display:block';
      try { c.getContext('2d').putImageData(new ImageData(new Uint8ClampedArray(d.px), d.w, d.h), 0, 0); } catch (e) {}
      var lab = document.createElement('div');
      var kn = null; for (var k2 in ART) if (ART[k2].hash === d.hash) kn = k2;
      lab.textContent = '#' + i + ' ' + d.hash + (kn ? ' =' + kn : '');
      lab.style.cssText = 'margin-top:2px;color:' + (kn ? '#7dd3fc' : '#fff');
      w2.appendChild(c); w2.appendChild(lab);
      box.appendChild(w2);
    }
    document.documentElement.appendChild(box);
    return DUMP.length + ' atlases';
  };
  api.hideDumps = function () { var b = document.getElementById('__atlasDump'); if (b) b.remove(); return 'hidden'; };

  api.use = function (name) {"""
assert s.count(a2) == 1; s = s.replace(a2, b2)
open(p,'w',encoding='utf-8').write(s)
print('ok')
PY
node --check skinfire.js && echo VALID && grep -c "DUMP" skinfire.js
```

## 179 — 2026-08-24T01:46:14 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && grep -n "function findSprites" skinfire.js && sed -n "$(grep -n 'function findSprites' skinfire.js | cut -d: -f1),+30p" skinfire.js
```

## 180 — 2026-08-24T01:46:51 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
p='skinfire.js'; s=open(p,encoding='utf-8').read()

# aspect-preserving variant: STRETCHING a tall flame into a square cell is what turned the
# real fire art into a squat blob ("i dont even think we have the right fire worm")
a = "  /* stretch a sprite region into a cell-sized RGBA buffer (bilinear) */"
b = """  /* Fit a sprite into the cell PRESERVING ASPECT RATIO, centred, transparent margins.
     resample() stretches, which turns a tall flame into a squat blob - that is what made the
     real fire art look wrong when we mapped it in. */
  function resampleFit(src, sw, sh, rect, dw, dh) {
    var out = new Uint8Array(dw * dh * 4);
    var k = Math.min(dw / rect.w, dh / rect.h);
    var ow = Math.max(1, Math.round(rect.w * k)), oh = Math.max(1, Math.round(rect.h * k));
    var ox = ((dw - ow) >> 1), oy = ((dh - oh) >> 1);
    for (var y = 0; y < oh; y++) {
      var sy = rect.y + (y + 0.5) * rect.h / oh - 0.5;
      var y0 = Math.max(0, Math.min(sh - 1, Math.round(sy)));
      for (var x = 0; x < ow; x++) {
        var sx = rect.x + (x + 0.5) * rect.w / ow - 0.5;
        var x0 = Math.max(0, Math.min(sw - 1, Math.round(sx)));
        var si = (y0 * sw + x0) * 4, di = ((y + oy) * dw + (x + ox)) * 4;
        out[di] = src[si]; out[di + 1] = src[si + 1]; out[di + 2] = src[si + 2]; out[di + 3] = src[si + 3];
      }
    }
    return out;
  }

  /* stretch a sprite region into a cell-sized RGBA buffer (bilinear) */"""
assert s.count(a) == 1; s = s.replace(a, b)

# viewer: one atlas, large, with the detected sprite rects outlined and numbered
a2 = "  api.hideDumps = function () {"
b2 = """  /* show ONE atlas large with findSprites() rects outlined + numbered, so body/head can be
     chosen by eye instead of by the sp[1]/sp[2] guess that has been wrong all along */
  api.showAtlas = function (i, scale) {
    var d = DUMP[i];
    if (!d || !d.px) return 'no atlas ' + i;
    scale = scale || 2.2;
    var box = document.getElementById('__atlasDump');
    if (box) box.remove();
    box = document.createElement('div');
    box.id = '__atlasDump';
    box.style.cssText = 'position:fixed;left:50%;top:4%;transform:translateX(-50%);z-index:2147483647;' +
      'background:#06080bf7;border:2px solid #ff7a00;border-radius:10px;padding:10px;' +
      'font:12px ui-monospace,monospace;color:#ffd7a8;text-align:center';
    var c = document.createElement('canvas');
    c.width = d.w; c.height = d.h;
    var g = c.getContext('2d');
    try { g.putImageData(new ImageData(new Uint8ClampedArray(d.px), d.w, d.h), 0, 0); } catch (e) {}
    var sp = findSprites(d.px, d.w, d.h);
    g.lineWidth = 1.5; g.strokeStyle = '#00e5ff'; g.font = 'bold 16px monospace'; g.fillStyle = '#00e5ff';
    for (var k = 0; k < sp.length; k++) {
      g.strokeRect(sp[k].x + .5, sp[k].y + .5, sp[k].w - 1, sp[k].h - 1);
      g.fillText(String(k) + ' ' + sp[k].w + 'x' + sp[k].h, sp[k].x + 3, sp[k].y + 17);
    }
    c.style.cssText = 'width:' + Math.round(d.w * scale) + 'px;height:' + Math.round(d.h * scale) +
      'px;image-rendering:pixelated;background:#16323f;border-radius:4px;display:block';
    var lab = document.createElement('div');
    lab.textContent = '#' + i + '  ' + d.hash + '  ' + d.w + 'x' + d.h + '  sprites: ' + sp.length;
    lab.style.cssText = 'margin-top:6px;color:#fff';
    box.appendChild(c); box.appendChild(lab);
    document.documentElement.appendChild(box);
    return sp.map(function (r, n) { return n + ':' + r.w + 'x' + r.h + '@' + r.x + ',' + r.y; }).join('  ');
  };
  api.hideDumps = function () {"""
assert s.count(a2) == 1; s = s.replace(a2, b2)
open(p,'w',encoding='utf-8').write(s)
print('ok')
PY
node --check skinfire.js && echo VALID
```

## 181 — 2026-08-24T01:48:40 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
p='skinfire.js'; s=open(p,encoding='utf-8').read()

# honest names: 17e8769c is a COMET, not a fire skin. db489690 is the real fire skin.
a = """  var ART = {
    blaze: { hash: '17e8769c', body: null, head: null },
    snake: { hash: 'db489690', body: null, head: null },
    fish:  { hash: '7c4c8ef3', body: null, head: null },"""
b = """  var ART = {
    /* db489690 IS the game's fire skin: 3 sprites - a big flame WITH EYES (head), a tall
       licking flame, and a compact flame (body segment).
       17e8769c is NOT a fire skin at all - it is a single COMET/fireball sprite. His dad:
       "fyi, you dont ahve blze, this is something else". Naming it 'blaze' and using it as
       the body is why the fire never looked right. Kept under an honest name only. */
    fire:  { hash: 'db489690', body: null, head: null },
    comet: { hash: '17e8769c', body: null, head: null },
    fish:  { hash: '7c4c8ef3', body: null, head: null },"""
assert s.count(a) == 1; s = s.replace(a, b)

# head = LARGEST sprite (it carries the face), body = SMALLEST (tiles best as a segment).
# The old sp[1]/sp[2] guess had head and body swapped.
a2 = """              var sp = findSprites(fpx, rec.w, rec.h);
              if (sp.length) {
                var bodyRect = sp.length >= 3 ? sp[1] : sp[0];
                var headRect = sp.length >= 3 ? sp[2] : sp[0];
                ART[name].body = resample(fpx, rec.w, bodyRect, CELL.body.w, CELL.body.h);
                ART[name].head = resample(fpx, rec.w, headRect, CELL.head.w, CELL.head.h);"""
b2 = """              var sp = findSprites(fpx, rec.w, rec.h);
              if (sp.length) {
                /* Pick by SIZE, not by index. In db489690 the sprites are laid out
                   head(177x208) / tall-flame(116x207) / body(116x148), so the old
                   sp[1]=body, sp[2]=head guess had them swapped. The head sprite is always
                   the largest (it carries the face); the smallest tiles best as a segment. */
                var byArea = sp.slice().sort(function (p, q) { return (q.w * q.h) - (p.w * p.h); });
                var headRect = byArea[0];
                var bodyRect = byArea[byArea.length - 1];
                /* FIT, do not STRETCH - squashing a tall flame into a square cell is what
                   turned the real art into a squat blob. */
                ART[name].body = resampleFit(fpx, rec.w, rec.h, bodyRect, CELL.body.w, CELL.body.h);
                ART[name].head = resampleFit(fpx, rec.w, rec.h, headRect, CELL.head.w, CELL.head.h);"""
assert s.count(a2) == 1; s = s.replace(a2, b2)

s = s.replace("{ id: 'carfire', art: 'blaze',", "{ id: 'carfire', art: 'fire',")
s = s.replace("{ id: 'allfire', art: 'blaze',", "{ id: 'allfire', art: 'fire',")
open(p,'w',encoding='utf-8').write(s)
print('ok')
PY
node --check skinfire.js && echo VALID && grep -n "art: 'fire'\|fire:  { hash\|comet: { hash\|byArea" skinfire.js
```

## 182 — 2026-08-24T01:50:40 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
p='skinfire.js'; s=open(p,encoding='utf-8').read()
# stash the base atlas BEFORE we paint it, so its layout can be inspected for a TAIL cell
a = """              if (!ART.orig.body) {                              // FIRST capture only: a later
                ART.orig.body = extract(px, rec.w, CELL.body);    // one would grab our own fire
                ART.orig.head = extract(px, rec.w, CELL.head);
              }"""
b = """              if (!ART.orig.body) {                              // FIRST capture only: a later
                ART.orig.body = extract(px, rec.w, CELL.body);    // one would grab our own fire
                ART.orig.head = extract(px, rec.w, CELL.head);
                /* keep a pristine copy of the whole atlas so its cell layout can be inspected
                   - His dad: "we can do two parts to the flame if there's a head a middle and
                   tail", which needs a THIRD cell we have never located */
                try { BASE_SNAP = { w: rec.w, h: rec.h, px: px.slice(0) }; } catch (e2) {}
              }"""
assert s.count(a) == 1; s = s.replace(a, b)

a2 = "  var DUMP = [];"
b2 = """  var BASE_SNAP = null;
  /* view the untouched base atlas with a cell grid, and mark the two cells we repaint, so a
     third (tail) cell can be found by eye */
  api.showBase = function (scale, grid) {
    if (!BASE_SNAP) return 'base atlas not captured yet';
    scale = scale || 0.9; grid = grid || 220;
    var box = document.getElementById('__atlasDump');
    if (box) box.remove();
    box = document.createElement('div');
    box.id = '__atlasDump';
    box.style.cssText = 'position:fixed;inset:1%;overflow:auto;z-index:2147483647;background:#06080bf7;' +
      'border:2px solid #ff7a00;border-radius:10px;padding:8px;font:12px ui-monospace,monospace;color:#ffd7a8';
    var c = document.createElement('canvas');
    c.width = BASE_SNAP.w; c.height = BASE_SNAP.h;
    var g = c.getContext('2d');
    try { g.putImageData(new ImageData(new Uint8ClampedArray(BASE_SNAP.px), BASE_SNAP.w, BASE_SNAP.h), 0, 0); } catch (e) {}
    g.strokeStyle = 'rgba(0,229,255,.35)'; g.lineWidth = 1;
    for (var x = 0; x <= BASE_SNAP.w; x += grid) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, BASE_SNAP.h); g.stroke(); }
    for (var y = 0; y <= BASE_SNAP.h; y += grid) { g.beginPath(); g.moveTo(0, y); g.lineTo(BASE_SNAP.w, y); g.stroke(); }
    g.font = 'bold 15px monospace'; g.fillStyle = '#9ae6ff';
    for (var yy = 0; yy < BASE_SNAP.h; yy += grid)
      for (var xx = 0; xx < BASE_SNAP.w; xx += grid) g.fillText(xx + ',' + yy, xx + 3, yy + 16);
    g.strokeStyle = '#39ff88'; g.lineWidth = 3;
    g.strokeRect(CELL.body.x, CELL.body.y, CELL.body.w, CELL.body.h);
    g.strokeRect(CELL.head.x, CELL.head.y, CELL.head.w, CELL.head.h);
    g.fillStyle = '#39ff88'; g.font = 'bold 20px monospace';
    g.fillText('BODY', CELL.body.x + 6, CELL.body.y + 38);
    g.fillText('HEAD', CELL.head.x + 6, CELL.head.y + 38);
    c.style.cssText = 'width:' + Math.round(BASE_SNAP.w * scale) + 'px;image-rendering:pixelated;display:block';
    box.appendChild(c);
    document.documentElement.appendChild(box);
    return BASE_SNAP.w + 'x' + BASE_SNAP.h + ' grid ' + grid;
  };

  var DUMP = [];"""
assert s.count(a2) == 1; s = s.replace(a2, b2)
open(p,'w',encoding='utf-8').write(s)
print('ok')
PY
node --check skinfire.js && echo VALID
```

## 183 — 2026-08-24T01:53:34 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake" && cat >> README.md << 'MD'

### v3.6 — what the atlas dump found (2026-08-23)

His dad: *"fyi, you dont ahve blze, this is something else"* — he was right, and it explains why
the fire never looked like the real thing no matter how it was tuned.

**Dump every atlas before theorising.** The `texStorage2D` gate only intercepted two atlas
SIZES (2048x1024 and 512x256), so every other skin atlas passed through completely unseen. A
zero-risk diagnostic — read the bytes in `compressedTexSubImage2D` and pass them through
untouched — found **28 atlases**, of which the code knew 3. `__skinFire.dumps()`,
`showDumps()`, `showAtlas(i)`, `showBase()`.

**Three bugs in how the fire art was read:**
1. **`blaze` (17e8769c) is not a fire skin — it is a single COMET/fireball sprite.** It was the
   default body art. That alone made the "fire" look wrong. Renamed `comet`.
2. **Head and body were swapped.** The real fire skin is `db489690` (now named `fire`) and holds
   three sprites: `177x208` a big flame **with eyes** (head), `116x207` a tall licking flame,
   `116x148` a compact flame (body segment). The code took `sp[1]` as body and `sp[2]` as head —
   so the head got a body sprite and the body got the tall flame. Now chosen by SIZE: largest is
   the head (it carries the face), smallest tiles best as a segment.
3. **`resample()` STRETCHES into the square cell.** A 116x207 flame squashed into 216x216 is a
   squat blob, which is exactly what our version of the real art looked like. `resampleFit()`
   preserves aspect ratio and centres with transparent margins.

**Why head/middle/tail cannot be done by repainting.** his dad: *"we can do two parts to the
flame if there's a head a middle and tail."* `showBase()` renders the base atlas on a 220px
grid: it is a grid of **two-cell skins** — one plain sphere (body, used for every segment) and
one sphere with a face (head). Ours is the cyan pair at (440,220) and (220,440). **There is no
third cell.** The 3-part flame exists only inside the premium fire skin's own atlas, which is
why other players' fire reads better than anything the repaint can produce.

**So the clean answer is to equip the real fire skin** if it is available on the account: the
game then draws genuine 3-part fire, perfectly aligned and correctly sized, with zero side
effects on other players — and the truck plus overlay trail layer on top of it. The repaint
path is a workaround for not owning it.

Also noted from play: collecting a powerup makes the worm glow, which already looks flame-like —
a useful reference for what the trail should read as.
MD
python - << 'PY'
p='C:/Users/<user>/.claude/projects/C--Users-<user>/memory/xbox-snake-rig.md'
s=open(p,encoding='utf-8').read()
ins = '''v3.6 (2026-08-23, CURRENT) - DUMP THE ATLASES BEFORE THEORISING. The texStorage2D gate only
intercepted two atlas SIZES, so ~25 skin atlases were never even looked at. A zero-risk dump
(read bytes in compressedTexSubImage2D, pass through untouched) found 28 atlases vs the 3 the
code knew: __skinFire.dumps() / showDumps() / showAtlas(i) / showBase().
Three bugs in reading the fire art, all invisible without the dump:
 1. **'blaze' (17e8769c) is NOT a fire skin - it is a single COMET sprite**, and it was the
    default body art. His dad: "fyi, you dont ahve blze, this is something else". Renamed 'comet'.
 2. The real fire skin is **db489690 (now 'fire')** with 3 sprites: 177x208 flame WITH EYES
    (head), 116x207 tall licking flame, 116x148 compact flame (body). The code used sp[1] as
    body and sp[2] as head - SWAPPED. Now picked by size: largest = head (carries the face),
    smallest = body segment.
 3. resample() STRETCHES into the square cell, so a 116x207 flame became a squat blob. Use
    resampleFit() (aspect-preserving, centred).
**head/middle/tail is IMPOSSIBLE via repaint**: showBase() shows the base atlas is a grid of
TWO-cell skins - a plain sphere (body, used for every segment) + a sphere with a face (head).
Ours is the cyan pair at (440,220)/(220,440). There is no third cell. The 3-part flame lives
only in the premium fire skin's OWN atlas. => The clean fix is for his dad to EQUIP the real fire
skin if he owns it: genuine 3-part fire, perfect alignment/length, zero effect on other players,
with the truck + overlay layered on top. The repaint is a workaround for not owning it.
Play note: powerups make the worm glow flame-like - good reference for the trail.

'''
s = s.replace('v3.5 (2026-08-23, CURRENT)', ins + 'v3.5 (2026-08-23)')
open(p,'w',encoding='utf-8').write(s)
print('ok')
PY
cd "C:/Users/<user>/dev/xbox-snake/extension" && python -c "
m=open('manifest.json',encoding='utf-8').read().replace('\"version\": \"3.5\"','\"version\": \"3.6\"')
open('manifest.json','w',encoding='utf-8').write(m)" && node --check content.js && node --check skinfire.js && echo "ALL VALID" && grep -o '"version": "[^"]*"' manifest.json
```

## 184 — 2026-08-24T02:01:41 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
p='skinfire.js'; s=open(p,encoding='utf-8').read()
# keep the THIRD sprite (the tall licking flame). Two cells is all the game gives us, so this
# one has nowhere to live in the texture - the rig draws it as the tail tip instead.
a = """                ART[name].body = resampleFit(fpx, rec.w, rec.h, bodyRect, CELL.body.w, CELL.body.h);
                ART[name].head = resampleFit(fpx, rec.w, rec.h, headRect, CELL.head.w, CELL.head.h);"""
b = """                ART[name].body = resampleFit(fpx, rec.w, rec.h, bodyRect, CELL.body.w, CELL.body.h);
                ART[name].head = resampleFit(fpx, rec.w, rec.h, headRect, CELL.head.w, CELL.head.h);
                /* the middle sprite - a tall licking flame - has no cell to live in (basic
                   skins are only body+head), so hand it to the rig for the TAIL TIP. That is
                   his dad's head/middle/tail, with the middle supplied by the overlay. */
                if (byArea.length >= 3) {
                  ART[name].tail = resampleFit(fpx, rec.w, rec.h, byArea[1], CELL.body.w, CELL.body.h);
                }"""
assert s.count(a) == 1; s = s.replace(a, b)
s = s.replace("    fire:  { hash: 'db489690', body: null, head: null },",
              "    fire:  { hash: 'db489690', body: null, head: null, tail: null },")
a2 = "    var cell = part === 'head' ? CELL.head : CELL.body;"
b2 = "    var cell = part === 'head' ? CELL.head : CELL.body;   // 'tail' is stored at body-cell size"
assert s.count(a2) == 1; s = s.replace(a2, b2)
open(p,'w',encoding='utf-8').write(s)
print('ok')
PY
python - << 'PY'
p='C:/Users/<user>/dev/xbox-snake/extension/content.js'; s=open(p,encoding='utf-8').read()
a = "  let spine = [], tailSpr = null, tailSprTried = 0;"
b = """  let spine = [], tailSpr = null, tailSprTried = 0;
  let tipSpr = null, tipTried = 0;          // the fire skin's tall licking flame, for the tip"""
assert s.count(a) == 1; s = s.replace(a, b)
s = s.replace("const TAIL = { step: 9, lenK: 3.2,", "const TAIL = { step: 9, tipK: 1.15, tipRot: 0, tipA: 0.85, lenK: 3.2,")

a2 = """    fctx.globalAlpha = 1;
  }

  let run = true, on = true,"""
b2 = """    /* TAIL TIP. The game only gives us two cells, so the fire skin's third sprite - the tall
       licking flame - has no texture slot. Draw it here, at the end of the trail, oriented
       along the path: head (game) + body segments (game) + a real flame tail (overlay). */
    if (!tipSpr && tipTried < 300) {
      tipTried++;
      tipSpr = (window.__skinFire && window.__skinFire.spriteCanvas) ? window.__skinFire.spriteCanvas('tail', 'fire') : null;
    }
    if (tipSpr && targetLen > 40 && spine.length > 6) {
      const ti = Math.max(4, Math.min(spine.length - 1, Math.round(targetLen / TAIL.step)));
      const p = spine[ti], q = spine[Math.max(0, ti - 5)];
      const ang = Math.atan2(p.y - q.y, p.x - q.x);       // points away from the head
      const wob = 1 + 0.10 * Math.sin(performance.now() / 130);
      const rw = bodyPx * TAIL.tipK * wob;
      fctx.globalCompositeOperation = 'lighter';
      fctx.globalAlpha = TAIL.tipA;
      fctx.setTransform(1, 0, 0, 1, p.x, p.y);
      fctx.rotate(ang + Math.PI / 2 + TAIL.tipRot);        // sprite points 'up' in its cell
      fctx.drawImage(tipSpr, -rw, -rw * 1.25, rw * 2, rw * 2.5);
      fctx.setTransform(1, 0, 0, 1, 0, 0);
      fctx.globalCompositeOperation = 'source-over';
    }
    fctx.globalAlpha = 1;
  }

  let run = true, on = true,"""
assert s.count(a2) == 1; s = s.replace(a2, b2)
open(p,'w',encoding='utf-8').write(s)
print('ok')
PY
cd "C:/Users/<user>/dev/xbox-snake/extension" && node --check content.js && node --check skinfire.js && echo "BOTH VALID"
```

## 185 — 2026-08-24T02:02:46 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
p='content.js'; s=open(p,encoding='utf-8').read()

# a wide soft light for the body glow
a = "  const sprSmoke = mkSpr("
b = """  /* his dad: "maybe the glowing plus the fire skin will work... i know you can glow when you
     have a power up". The game's powerup glow is game state we should not forge, but the LOOK
     is just a wide soft additive light - so reproduce it along the body. */
  const sprGlow = mkSpr([[0, 'rgba(255,150,40,.55)'], [.45, 'rgba(255,90,20,.30)'], [1, 'rgba(200,40,10,0)']]);
  const sprSmoke = mkSpr("""
assert s.count(a) == 1; s = s.replace(a, b)

s = s.replace("                 flameA: 0.50,          // overlap is what builds the bright core, so it can be generous",
              "                 flameA: 0.50,          // overlap is what builds the bright core, so it can be generous\n                 glowK: 0.85, glowA: 0.30, sprMix: 0.30,   // body glow, and how many embers use the real flame sprite")

# embers carry a rotation so the flame sprite can be used as the ember texture
a2 = """                      jx: (Math.random() - .5) * 0.3, jy: (Math.random() - .5) * 0.3, hot: boost });"""
b2 = """                      jx: (Math.random() - .5) * 0.3, jy: (Math.random() - .5) * 0.3, hot: boost,
                      rot: Math.random() * Math.PI * 2, spin: (Math.random() - .5) * 1.1,
                      spr: Math.random() < FIRE.sprMix });"""
assert s.count(a2) == 1; s = s.replace(a2, b2)

# GLOW pass first (under the embers), then embers, some of which use the real flame sprite
a3 = """    fctx.globalCompositeOperation = 'lighter';
    for (const p of embers) {
      const t = p.a / p.l;
      const flameA = FIRE.flameA * (t < FIRE.fadeAt ? 1 : Math.max(0, 1 - (t - FIRE.fadeAt) / (1 - FIRE.fadeAt)));
      if (flameA > .01) {
        const r = p.r * (1 + t * (p.hot ? FIRE.growBoost : FIRE.grow));
        fctx.globalAlpha = flameA;
        fctx.drawImage(p.hot ? sprHot : sprCool, p.x - r, p.y - r, r * 2, r * 2);
      }
    }"""
b3 = """    fctx.globalCompositeOperation = 'lighter';
    /* GLOW: a soft wide light running the length of the body, which is what makes the whole
       worm read as burning rather than as a car towing a flame. */
    if (spine.length > 2 && targetLen > 30) {
      const gN = Math.max(2, Math.min(spine.length, Math.round(targetLen / TAIL.step)));
      const gr = bodyPx * FIRE.glowK * (boost ? 1.2 : 1);
      for (let i = gN - 1; i >= 0; i -= 2) {
        fctx.globalAlpha = FIRE.glowA * (1 - 0.6 * (i / (gN - 1 || 1)));
        if (fctx.globalAlpha <= .012) continue;
        fctx.drawImage(sprGlow, spine[i].x - gr, spine[i].y - gr, gr * 2, gr * 2);
      }
    }
    /* Embers. A share of them are drawn with the game's REAL flame sprite at random rotation
       instead of a round gradient - a flame-shaped texture is what gives licking tongues.
       Only a share: all-sprite reads mushy, all-gradient reads like a glowing tube. */
    if (!emberSpr && emberTried < 300) {
      emberTried++;
      emberSpr = (window.__skinFire && window.__skinFire.spriteCanvas) ? window.__skinFire.spriteCanvas('body', 'fire') : null;
    }
    for (const p of embers) {
      const t = p.a / p.l;
      const flameA = FIRE.flameA * (t < FIRE.fadeAt ? 1 : Math.max(0, 1 - (t - FIRE.fadeAt) / (1 - FIRE.fadeAt)));
      if (flameA <= .01) continue;
      const r = p.r * (1 + t * (p.hot ? FIRE.growBoost : FIRE.grow));
      fctx.globalAlpha = flameA;
      if (p.spr && emberSpr) {
        fctx.setTransform(1, 0, 0, 1, p.x, p.y);
        fctx.rotate(p.rot + t * p.spin);
        fctx.drawImage(emberSpr, -r, -r * 1.1, r * 2, r * 2.2);
        fctx.setTransform(1, 0, 0, 1, 0, 0);
      } else {
        fctx.drawImage(p.hot ? sprHot : sprCool, p.x - r, p.y - r, r * 2, r * 2);
      }
    }"""
assert s.count(a3) == 1; s = s.replace(a3, b3)
s = s.replace("  let tipSpr = null, tipTried = 0;          // the fire skin's tall licking flame, for the tip",
              "  let tipSpr = null, tipTried = 0;          // the fire skin's tall licking flame, for the tip\n  let emberSpr = null, emberTried = 0;      // the fire skin's body flame, used as an ember texture")
open(p,'w',encoding='utf-8').write(s)
print('ok')
PY
node --check content.js && echo VALID
```

## 186 — 2026-08-24T02:04:08 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake" && cat >> README.md << 'MD'

### v3.7 — the flame that finally worked (2026-08-23)

His dad: *"the fire tail isn't really important, what's important is the flame"* and *"maybe the
glowing plus the fire skin will work... i know you can glow when you have a power up"*. Both
right, and together they are the answer. The premium fire skin is **locked** on the account, so
the equip route is out; everything has to come from our own overlay, which is fine because we
control it completely.

Three things, in order of how much they mattered:

1. **Use the game's real flame sprite as the EMBER TEXTURE.** Round gradient blobs can only ever
   produce a glowing tube — no amount of tuning gives licking tongues, because the *shape* isn't
   there. A flame-shaped texture at random rotation and size does. Note this is NOT the earlier
   failed experiment of stamping the sprite along the path at even spacing, which combed the
   tongues out sideways into a caterpillar; as a particle texture with random orientation it
   reads as fire.
2. **Mix, don't commit.** `FIRE.sprMix` (0.30) is the share of embers drawn with the sprite; the
   rest stay soft gradients. All-sprite is mushy, all-gradient is a tube. The mix gives volume
   from the gradients and shape from the sprite.
3. **Reproduce the powerup glow.** A wide soft additive light running the length of the body is
   what makes the whole worm read as *burning* rather than as a car towing a flame
   (`FIRE.glowK`, `FIRE.glowA`). The game's actual powerup state is gameplay, not cosmetic, so
   it is not something to forge — but the look is just a soft light and costs nothing to draw.

Also wired: the fire skin's third sprite (the tall licking flame) has no cell to live in, since
basic skins are only body+head — so the rig draws it as the **tail tip**, giving his dad's
head / middle / tail with the middle supplied by the overlay (`TAIL.tipK`, `tipA`, `tipRot`).
MD
python - << 'PY'
p='C:/Users/<user>/.claude/projects/C--Users-<user>/memory/xbox-snake-rig.md'
s=open(p,encoding='utf-8').read()
ins = '''v3.7 (2026-08-23, CURRENT) - THE FLAME THAT WORKED. The premium fire skin is LOCKED on the
account, so the equip route is out; the look has to come from our overlay.
 1. **Use the game's real flame sprite as the EMBER TEXTURE.** Round gradient blobs can only
    make a glowing tube - the licking-tongue SHAPE has to come from the texture. (This is NOT
    the earlier failure of stamping the sprite along the path at even spacing, which combed the
    tongues sideways into a caterpillar - as a particle texture at RANDOM rotation it reads as
    fire.)
 2. **MIX, do not commit**: FIRE.sprMix ~0.30 of embers use the sprite, the rest stay soft
    gradients. All-sprite = mushy, all-gradient = tube. Gradients give volume, sprite gives shape.
 3. **Reproduce the powerup GLOW** - a wide soft additive light along the body (FIRE.glowK/glowA)
    is what makes the worm read as BURNING rather than a car towing a flame. His dad's idea. The
    game's real powerup state is gameplay, not cosmetic - do not forge it; just draw the look.
The fire skin's 3rd sprite (tall licking flame) has no cell (basic skins are body+head only), so
the rig draws it as the TAIL TIP => head/middle/tail with the middle from the overlay.

'''
s = s.replace('v3.6 (2026-08-23, CURRENT)', ins + 'v3.6 (2026-08-23)')
open(p,'w',encoding='utf-8').write(s)
print('ok')
PY
cd "C:/Users/<user>/dev/xbox-snake/extension" && python -c "
m=open('manifest.json',encoding='utf-8').read().replace('\"version\": \"3.6\"','\"version\": \"3.7\"')
open('manifest.json','w',encoding='utf-8').write(m)" && node --check content.js && node --check skinfire.js && echo VALID
```

## 187 — 2026-08-24T02:05:44 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
p='content.js'; s=open(p,encoding='utf-8').read()

a = """  function fireFrame(cx, cy, drift, boost, dtR) {
    const targetLen = spineStep(cx, cy, drift, dtR);
    const dir = drift.dir, spd = drift.spd;
    let turnFac = 1;
    if (lastSpawnDir != null) turnFac = Math.min(1.8, 1 + Math.abs(angDiff(dir, lastSpawnDir)) * 22);
    lastSpawnDir = dir;"""
b = """  function fireFrame(cx, cy, drift, boost, dtR) {
    const targetLen = spineStep(cx, cy, drift, dtR);
    const spd = drift.spd;
    /* EMIT ALONG THE CAR, DRIFT ALONG THE WORLD. His dad: "the flame doesn't move with the car".
       Embers used to be emitted along drift.dir - the direction derived from optical flow,
       which lags the stick by 3-5 frames. So on a turn the flame kept coming out of the wrong
       side of the truck for a few frames. dirRef is the truck's own nose, dead-reckoned from
       the stick with zero lag, so the exhaust direction is exactly (dirRef + PI). The per-ember
       drift still uses the MEASURED camera motion, which is what keeps the trail world-anchored
       on the path already travelled. Two different jobs, two different signals. */
    const dir = dirRef + Math.PI;
    let turnFac = 1;
    if (lastSpawnDir != null) turnFac = Math.min(1.8, 1 + Math.abs(angDiff(dir, lastSpawnDir)) * 22);
    lastSpawnDir = dir;"""
assert s.count(a) == 1; s = s.replace(a, b)

# and emit from the truck's REAR, so it reads as coming out of the exhaust
a2 = """        const back = bodyPx * 0.12 + (i / n) * step + Math.random() * 4;"""
b2 = """        const back = FIRE.rear * sizeScale + (i / n) * step + Math.random() * 4;"""
assert s.count(a2) == 1; s = s.replace(a2, b2)
s = s.replace("glowK: 0.85, glowA: 0.30, sprMix: 0.30,   // body glow, and how many embers use the real flame sprite",
              "glowK: 0.85, glowA: 0.30, sprMix: 0.30,   // body glow, and how many embers use the real flame sprite\n                 rear: 22,              // emit from the truck's exhaust, not its centre (x sizeScale)")
open(p,'w',encoding='utf-8').write(s)
print('ok')
PY
node --check content.js && echo VALID && grep -n "const dir = dirRef" content.js
```

## 188 — 2026-08-24T02:07:04 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
p='content.js'; s=open(p,encoding='utf-8').read()

# --- stable per-element pseudo-randomness so flame elements don't jitter frame to frame
a = "  function fireFrame(cx, cy, drift, boost, dtR) {"
b = """  const fract = (x) => x - Math.floor(x);
  const rnd1 = (k) => fract(Math.sin(k * 12.9898) * 43758.5453);
  const rnd2 = (k) => fract(Math.sin(k * 78.2331) * 12345.6789);

  /* FLAME BOUND TO THE BODY. His dad: "the entire trail has to move with the car".
     Free-drifting embers each integrate their own copy of the measured camera motion, so any
     flow error makes them slide relative to the worm - which is exactly what reads as the
     flame not being attached. These elements instead sit at FIXED ARC-LENGTH positions along
     the spine, and the spine is already closed-loop corrected onto the body (~2.5px). So they
     are on the body by construction and move with it exactly.
     What makes them read as fire rather than as the old smooth ribbon: each element gets a
     STABLE random rotation, size and lateral offset (hashed from its index, so it does not
     flicker), plus slow rotation and a travelling size wave for life. */
  function flameOnBody(targetLen, boost, tSec) {
    if (spine.length < 3 || targetLen < 24) return;
    const step = FIRE.nodeGap;
    const count = Math.max(2, Math.min(FIRE.maxNodes, Math.floor(targetLen / step)));
    const wBase = bodyPx * FIRE.bodyK * (boost ? 1.15 : 1);
    for (let k = count - 1; k >= 0; k--) {
      const idx = Math.min(spine.length - 1, Math.round(k * step / TAIL.step));
      const p = spine[idx];
      const h = rnd1(k), h2 = rnd2(k);
      const u = k / (count - 1 || 1);
      // lateral offset along the local normal, so the edge billows instead of being a tube
      const f = spine[Math.max(0, idx - 1)], g = spine[Math.min(spine.length - 1, idx + 1)];
      let tx = f.x - g.x, ty = f.y - g.y;
      const tl = Math.hypot(tx, ty) || 1;
      const nx = -ty / tl, ny = tx / tl;
      const lat = (h2 - 0.5) * bodyPx * FIRE.nodeLat;
      const px = p.x + nx * lat, py = p.y + ny * lat;
      const wave = 1 + FIRE.nodeWave * Math.sin(tSec * 6.5 + k * 0.7);
      const r = wBase * (0.72 + 0.5 * h) * (1 - 0.22 * u * u) * wave;
      if (r < 1.5) continue;
      fctx.globalAlpha = FIRE.nodeA * (1 - 0.30 * u);
      if (emberSpr && h > 1 - FIRE.sprMix) {
        fctx.setTransform(1, 0, 0, 1, px, py);
        fctx.rotate(h2 * Math.PI * 2 + tSec * (h - 0.5) * 1.6);
        fctx.drawImage(emberSpr, -r, -r * 1.1, r * 2, r * 2.2);
        fctx.setTransform(1, 0, 0, 1, 0, 0);
      } else {
        const spr = h2 > 0.55 ? sprHot : sprCool;
        fctx.drawImage(spr, px - r, py - r, r * 2, r * 2);
      }
    }
  }

  function fireFrame(cx, cy, drift, boost, dtR) {"""
assert s.count(a) == 1; s = s.replace(a, b)

# --- the free embers become a short SPARK burst at the exhaust only
a2 = """                 rear: 22,              // emit from the truck's exhaust, not its centre (x sizeScale)"""
b2 = """                 rear: 22,              // emit from the truck's exhaust, not its centre (x sizeScale)
                 nodeGap: 11, maxNodes: 260, bodyK: 0.52, nodeLat: 0.30,   // body-bound flame
                 nodeWave: 0.14, nodeA: 0.46,
                 sparkLife: 20, sparkR: 0.22, sparkRate: 1.6,              // exhaust sparks only"""
assert s.count(a2) == 1; s = s.replace(a2, b2)

# spawn: sparks are short-lived and small, they are motion at the car, not the trail itself
a3 = """      const lifeCap = targetLen > 24
        ? Math.max(12, Math.min(FIRE.lifeMax, targetLen / Math.max(1.2, spd)))
        : (boost ? FIRE.boostLife : FIRE.life);"""
b3 = """      /* Sparks are deliberately SHORT now. The trail itself is drawn on the spine, so free
         particles only need to sell motion coming off the car - if they lived long enough to
         form the trail they would slide relative to the body again. */
      const lifeCap = FIRE.sparkLife * (boost ? 1.5 : 1);"""
assert s.count(a3) == 1; s = s.replace(a3, b3)
a4 = """      const emberR = boost ? FIRE.rBaseBoost + bodyPx * FIRE.rBoost
                           : FIRE.rBase + bodyPx * FIRE.rBody;"""
b4 = """      const emberR = Math.max(4, bodyPx * FIRE.sparkR) * (boost ? 1.35 : 1);"""
assert s.count(a4) == 1; s = s.replace(a4, b4)
a5 = """      const perFrame = Math.max(0.35, Math.min(FIRE.rate, spd * dtR / FIRE.spacing));
      spawnAcc += perFrame * (boost ? 1.5 : 1);"""
b5 = """      spawnAcc += FIRE.sparkRate * dtR * (boost ? 2.0 : 1);"""
assert s.count(a5) == 1; s = s.replace(a5, b5)

# draw order: glow -> body-bound flame -> sparks
a6 = """    /* Embers. A share of them are drawn with the game's REAL flame sprite at random rotation
       instead of a round gradient - a flame-shaped texture is what gives licking tongues.
       Only a share: all-sprite reads mushy, all-gradient reads like a glowing tube. */
    if (!emberSpr && emberTried < 300) {"""
b6 = """    if (!emberSpr && emberTried < 300) {"""
assert s.count(a6) == 1; s = s.replace(a6, b6)
a7 = """    for (const p of embers) {
      const t = p.a / p.l;
      const flameA = FIRE.flameA * (t < FIRE.fadeAt ? 1 : Math.max(0, 1 - (t - FIRE.fadeAt) / (1 - FIRE.fadeAt)));
      if (flameA <= .01) continue;"""
b7 = """    /* THE TRAIL: bound to the body, so it moves with the car exactly. */
    flameOnBody(targetLen, boost, performance.now() / 1000);
    /* and the free sparks, which only sell motion at the exhaust */
    for (const p of embers) {
      const t = p.a / p.l;
      const flameA = FIRE.flameA * (t < FIRE.fadeAt ? 1 : Math.max(0, 1 - (t - FIRE.fadeAt) / (1 - FIRE.fadeAt)));
      if (flameA <= .01) continue;"""
assert s.count(a7) == 1; s = s.replace(a7, b7)
open(p,'w',encoding='utf-8').write(s)
print('ok')
PY
node --check content.js && echo VALID && grep -c "flameOnBody" content.js
```

## 189 — 2026-08-24T02:08:36 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
p='content.js'; s=open(p,encoding='utf-8').read()
s = s.replace("nodeGap: 11, maxNodes: 260, bodyK: 0.52, nodeLat: 0.30,   // body-bound flame",
              "nodeGap: 9, maxNodes: 320, bodyK: 0.64, nodeLat: 0.32,    // body-bound flame")
s = s.replace("nodeWave: 0.14, nodeA: 0.46,", "nodeWave: 0.15, nodeA: 0.54,")
open(p,'w',encoding='utf-8').write(s)
print('ok')
PY
node --check content.js && echo VALID
cd "C:/Users/<user>/dev/xbox-snake" && cat >> README.md << 'MD'

### v3.8 — "the entire trail has to move with the car" (2026-08-23)

The trail was **world-anchored**: every ember integrated its own copy of the measured camera
motion, so any flow error made it slide relative to the worm. That is precisely what reads as
the flame not being attached to the car, and no amount of particle tuning can fix it — the error
is in the anchoring, not the look.

Two changes:

1. **Emit along the CAR, drift along the WORLD.** Embers were emitted along `drift.dir`, the
   direction derived from optical flow, which lags the stick by 3–5 frames — so on a turn the
   flame kept leaving the wrong side of the truck for a few frames. Emission now uses
   `dirRef + π`, the truck's own nose dead-reckoned from the stick with zero lag, and from the
   truck's *rear* (`FIRE.rear`) so it reads as coming out of the exhaust. Two different jobs,
   two different signals.
2. **Bind the trail to the spine instead of to free particles.** The flame is now drawn as
   elements at fixed **arc-length** positions along the spine — and the spine is already
   closed-loop corrected onto the body (~2.5px). So the trail is on the body *by construction*
   and moves with it exactly; there is no independent drift left to accumulate.

The reason this doesn't regress to the v3.4 "glowing tube": each element gets a **stable**
hashed random rotation, size and lateral offset (hashed from its index so it doesn't flicker
frame to frame), plus slow rotation and a travelling size wave. Fixed positions, random
appearance — structure from the spine, life from the hash.

The free ember system survives only as a short **spark burst at the exhaust**
(`FIRE.sparkLife/sparkR/sparkRate`). Sparks sell motion coming off the car; if they lived long
enough to form the trail they would slide relative to the body again, which is the bug.
MD
python - << 'PY'
p='C:/Users/<user>/.claude/projects/C--Users-<user>/memory/xbox-snake-rig.md'
s=open(p,encoding='utf-8').read()
ins = '''v3.8 (2026-08-23, CURRENT) - "the entire trail has to move with the car". The trail was
WORLD-ANCHORED: each ember integrated its own copy of the measured camera motion, so any flow
error made it slide relative to the worm. That is the "not attached" feeling, and NO amount of
particle tuning fixes it - the error is in the anchoring.
 1. **Emit along the CAR, drift along the WORLD.** Emission used drift.dir (flow-derived, lags
    the stick 3-5 frames) so on a turn the flame left the wrong side of the truck. Now uses
    dirRef + PI (the nose, dead-reckoned from the stick, zero lag) and from the truck's REAR
    (FIRE.rear) so it comes out of the exhaust.
 2. **Bind the trail to the SPINE, not to free particles.** Flame elements sit at fixed
    ARC-LENGTH positions along the spine, which is already closed-loop corrected onto the body
    (~2.5px) - so the trail is on the body BY CONSTRUCTION and moves with it exactly.
 Why this does NOT regress to the v3.4 glowing tube: each element gets a STABLE hashed random
 rotation/size/lateral offset (hashed from its INDEX so it does not flicker), plus slow rotation
 and a travelling size wave. Fixed positions + random appearance = structure from the spine,
 life from the hash.
 Free embers survive only as a short SPARK burst at the exhaust (FIRE.sparkLife/sparkR/
 sparkRate) - if they lived long enough to form the trail they would slide again.

'''
s = s.replace('v3.7 (2026-08-23, CURRENT)', ins + 'v3.7 (2026-08-23)')
open(p,'w',encoding='utf-8').write(s)
print('ok')
PY
cd "C:/Users/<user>/dev/xbox-snake/extension" && python -c "
m=open('manifest.json',encoding='utf-8').read().replace('\"version\": \"3.7\"','\"version\": \"3.8\"')
open('manifest.json','w',encoding='utf-8').write(m)" && echo bumped
```

## 190 — 2026-08-24T03:21:36 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && cp content.js .content-v38.bak.js && python - << 'PY'
import re, io

fc = open(r"C:\Users\<user>\AppData\Local\Temp\claude\C--Users-<user>\88fb0b96-1d38-4d66-ab8c-ad3209bd87d6\tasks\final_code.js", encoding='utf-8').read()

# split parts
parts = {}
chunks = re.split(r"/\* === (PART [A-K]) [^\n]*\n(?:[^\n]*\n)?", fc)
# simpler: find headers with finditer
hdrs = list(re.finditer(r"/\* === (PART [A-K])[^=]*=+ \*/\n", fc))
# handle multiline headers (PART F spans 2 lines)
hdrs = list(re.finditer(r"/\* === (PART [A-K]).*?\*/\n", fc, re.S))
for i, m in enumerate(hdrs):
    start = m.end()
    end = hdrs[i+1].start() if i+1 < len(hdrs) else len(fc)
    parts[m.group(1)] = fc[start:end].strip('\n') + '\n'
print('parts found:', sorted(parts.keys()), [len(v) for k, v in sorted(parts.items())])

src = open('content.js', encoding='utf-8').read()
n0 = src.count('\n')

def between(startAnchor, endAnchor, repl, name, includeEnd=True):
    global src
    i = src.index(startAnchor)
    j = src.index(endAnchor, i)
    j2 = j + len(endAnchor) if includeEnd else j
    src = src[:i] + repl + src[j2:]
    print(name, 'ok')

# A: FIRE literal block
between("  /* v2.7: the BODY is fire now \u2014 skinfire.js repaints the game's own skin texture,",
        "latComp: 1.5, freshFull: 150, freshZero: 300 };   // v2.6: flow staleness compensated (frames); fresh window full-trust / zero-trust (ms)",
        parts['PART A'].rstrip('\n'), 'A')

# B: insert after sprSmoke line
anchB = "  const sprSmoke = mkSpr([[0, 'rgba(115,115,126,.5)'], [.6, 'rgba(95,95,106,.28)'], [1, 'rgba(75,75,86,0)']]);"
assert src.count(anchB) == 1
src = src.replace(anchB, anchB + '\n' + parts['PART B'].rstrip('\n'))
print('B ok')

# C
anchC = "  const EXT = { every: 5, w: 460, ema: 0.12, stepPx: 12, miss: 9, warm: 18, bright: 185, snap: 0.40 };"
assert src.count(anchC) == 1
src = src.replace(anchC, parts['PART C'].rstrip('\n'))
print('C ok')

# D
anchD = """          const corr = (latOff + off) * EXT.snap;
          const j0 = Math.max(0, i - stepN + 1), j1 = Math.min(spine.length - 1, i + stepN - 1);
          for (let j = j0; j <= j1; j++) { spine[j].x += nx * corr; spine[j].y += ny * corr; }"""
assert src.count(anchD) == 1
src = src.replace(anchD, parts['PART D'].rstrip('\n'))
print('D ok')

# E: the spine build block inside spineStep
iE = src.index("  function spineStep(cx, cy, drift, dtR) {")
sE = src.index("    if (!drift.still) {", iE)
# find matching close: the block ends with the line '    }' after the unshift loop
eE_marker = "for (let i = 1; i <= k; i++) spine.unshift({ x: h.x + dx * (i / k), y: h.y + dy * (i / k) });"
eE = src.index(eE_marker, sE)
# walk to the closing '    }\n' of the outer if: after marker there are two closes '        }\n      }\n    }'
close = src.index("    }\n", src.index("      }\n", src.index("        }\n", eE)))
src = src[:sE] + parts['PART E'].rstrip('\n') + '\n' + src[close + len("    }\n"):]
print('E ok')

# F: fract..flameOnBody entire
iF = src.index("  const fract = (x) => x - Math.floor(x);")
# end: closing of flameOnBody function -> find 'function flameOnBody' then its last '  }\n'
iFb = src.index("  function flameOnBody(", iF)
endF = src.index("\n  }\n", src.index("fctx.drawImage(spr, px - r, py - r, r * 2, r * 2);", iFb)) + len("\n  }\n")
src = src[:iF] + parts['PART F'].rstrip('\n') + '\n' + src[endF:]
print('F ok')

# G: draw order block in fireFrame
iG = src.index("    fctx.clearRect(0, 0, fireCv.width, fireCv.height);")
eG_marker = "    /* and the free sparks, which only sell motion at the exhaust */"
eG = src.index(eG_marker) + len(eG_marker)
src = src[:iG] + parts['PART G'].rstrip('\n') + src[eG:]
print('G ok')

# H: white-core pass
iH = src.index("    /* White-hot base: only the youngest embers, small and bright, so the flame looks like")
eH_marker2 = "    fctx.globalCompositeOperation = 'source-over';"
eH = src.index(eH_marker2, iH) + len(eH_marker2)
src = src[:iH] + parts['PART H'].rstrip('\n') + src[eH:]
print('H ok')

# I
anchI = """    if (tipSpr && targetLen > 40 && spine.length > 6) {
      const ti = Math.max(4, Math.min(spine.length - 1, Math.round(targetLen / TAIL.step)));
      const p = spine[ti], q = spine[Math.max(0, ti - 5)];
      const ang = Math.atan2(p.y - q.y, p.x - q.x);       // points away from the head"""
assert src.count(anchI) == 1
src = src.replace(anchI, parts['PART I'].rstrip('\n'))
print('I ok')

# J: killFire line
iJ = src.index("  const killFire = () => {")
eJ = src.index("\n", iJ)
src = src[:iJ] + parts['PART J'].rstrip('\n') + src[eJ:]
print('J ok')

# K: banner lines
iK = src.index("  say('")
# find the two banner lines near the end
mK = re.search(r"  say\('[^\n]*\n  console\.log\('%c\[snake rig[^\n]*\n", src)
src = src[:mK.start()] + parts['PART K'].rstrip('\n') + '\n' + src[mK.end():]
print('K ok')

open('content.js', 'w', encoding='utf-8').write(src)
print('lines:', n0, '->', src.count('\n'))
PY
node --check content.js && echo "=== VALID ==="
```

## 191 — 2026-08-24T03:22:12 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && node --check content.js && echo VALID && echo "--- new identifiers ---" && for k in "flameFrame" "__flameInfo" "__arcAt" "FLAME" "sprWarm" "nodeSeq" "headGap" "snapSpan"; do printf "%-14s %s\n" "$k" "$(grep -c -- "$k" content.js)"; done && echo "--- old gone ---" && grep -c "flameOnBody\|nodeGap\|maxNodes\|rnd1\|fract" content.js || echo "0 stale refs"
```

## 192 — 2026-08-24T03:22:29 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && grep -n "flameOnBody\|nodeGap\|maxNodes\|rnd1\|fract" content.js
```

## 193 — 2026-08-24T04:58:48 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && sed -n "$(grep -n 'var LOOKS = \[' skinfire.js | cut -d: -f1),+22p" skinfire.js
```

## 194 — 2026-08-24T04:59:23 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
p='skinfire.js'; s=open(p,encoding='utf-8').read()
a = """  var LOOKS = [
    { id: 'carfire', art: 'fire', alpha: 1.00, alphaHead: 1.00, flicker: false, amp: 1.3, trail: 'long' },
    { id: 'allfire', art: 'fire', alpha: 1.00, alphaHead: 1.00, flicker: false, amp: 1.3,
      trail: 'long', hideTruck: true },
    /* the loader-spinner white: flat, smooth, dark eyes kept, no trail */
    { id: 'white',   art: 'spinner', alpha: 1.00, alphaHead: 1.00, flicker: false, amp: 0.0,
      trail: 'none', mono: [255, 255, 255], monoFlat: true, monoKeepDark: 105 }
  ];"""
b = """  /* "get rid of the worm and just leave our flames" (2026-08-24). Two ways, pick with LB:
     - carfire/allfire paint the body as DARK COALS instead of erasing it. Under the additive
       flame overlay a dark base disappears visually (it reads as the fire's own embers), but
       it still passes the scanner's warm test (R stays well above B), so the flame length
       stays MEASURED, drift correction keeps working, and other players wearing this skin
       stay visible as a dark worm rather than vanishing.
     - 'vanish' is the true alpha-0 body - the exact look approved back in v3.0 ("invisible
       worked"). Its two known costs, accepted knowingly by picking it: every other player on
       this same shared-atlas skin turns invisible too, and the flame length falls back to
       extrapolation because there is nothing left to measure. */
  var LOOKS = [
    { id: 'carfire', art: 'fire', alpha: 1.00, alphaHead: 1.00, flicker: false, amp: 1.3,
      trail: 'long', mono: [150, 62, 24], monoGain: 0.85, monoBias: 12 },
    { id: 'allfire', art: 'fire', alpha: 1.00, alphaHead: 1.00, flicker: false, amp: 1.3,
      trail: 'long', hideTruck: true, mono: [150, 62, 24], monoGain: 0.85, monoBias: 12 },
    { id: 'vanish',  art: 'fire', alpha: 0.00, alphaHead: 1.00, flicker: false, amp: 1.3,
      trail: 'long' },
    /* the loader-spinner white: flat, smooth, dark eyes kept, no trail */
    { id: 'white',   art: 'spinner', alpha: 1.00, alphaHead: 1.00, flicker: false, amp: 0.0,
      trail: 'none', mono: [255, 255, 255], monoFlat: true, monoKeepDark: 105 }
  ];"""
assert s.count(a) == 1; s = s.replace(a, b)
open(p,'w',encoding='utf-8').write(s)
print('ok')
PY
node --check skinfire.js && echo VALID && grep -n "id: '" skinfire.js | head -6
```

## 195 — 2026-08-24T05:03:47 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && grep -n "if (!artBody) api.use(name);" skinfire.js
```

## 196 — 2026-08-24T05:04:24 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && node --check skinfire.js && echo VALID
```

## 197 — 2026-08-24T05:05:21 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && grep -n "spriteCanvas" content.js skinfire.js | head && echo "--- default art in spriteCanvas ---" && sed -n "$(grep -n 'api.spriteCanvas = function' skinfire.js | cut -d: -f1),+6p" skinfire.js && echo "--- anim state check ---" && grep -n "animate(artBody" skinfire.js
```

## 198 — 2026-08-24T05:05:48 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python -c "
s=open('skinfire.js',encoding='utf-8').read()
a=\"    var name = artName || (ART.snake.body ? 'snake' : 'blaze');\"
b=\"    var name = artName || (ART.fire.body ? 'fire' : 'comet');   // old default referenced ART.snake, which no longer exists -> TypeError\"
assert s.count(a)==1; s=s.replace(a,b)
open('skinfire.js','w',encoding='utf-8').write(s); print('ok')" && node --check skinfire.js && echo VALID
```

## 199 — 2026-08-24T05:11:33 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && sed -n "$(grep -n 'function measureBody' content.js | cut -d: -f1),+40p" content.js
```

## 200 — 2026-08-24T05:12:31 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
p='skinfire.js'; s=open(p,encoding='utf-8').read()

# --- index every basic skin in the pristine atlas + retarget the paint at runtime
a = "  var DUMP = [];"
b = """  /* ---- WHICH SKIN IS THE PLAYER ACTUALLY WEARING? -----------------------------
     The paint targets FIXED atlas cells, and that has now broken three separate times
     (the pink worm, "you must be replacing another skin", the fish tail): equip anything
     other than the one hard-coded skin and the rig paints cells nobody is looking at.
     Fix: index every basic skin in the pristine atlas snapshot, and RETARGET the paint
     to the pair whose colour matches the body actually on screen. The rig samples the
     screen and calls matchSkin(); nothing is hard-coded any more. */
  var CELLS = null;
  function indexCells() {
    if (CELLS || !BASE_SNAP) return CELLS;
    CELLS = [];
    var W = BASE_SNAP.w, H = BASE_SNAP.h, q = BASE_SNAP.px;
    for (var gy = 0; gy + 216 <= H; gy += 220) {
      for (var gx = 0; gx + 216 <= W; gx += 220) {
        var n = 0, r = 0, g = 0, b = 0, dark = 0;
        for (var y = 20; y < 196; y += 4) {
          for (var x = 20; x < 196; x += 4) {
            var o = ((gy + y) * W + (gx + x)) * 4;
            if (q[o + 3] < 60) continue;
            n++; r += q[o]; g += q[o + 1]; b += q[o + 2];
            if (0.299 * q[o] + 0.587 * q[o + 1] + 0.114 * q[o + 2] < 70) dark++;
          }
        }
        if (n < 200) continue;                      // empty grid slot
        CELLS.push({ x: gx, y: gy, r: r / n, g: g / n, b: b / n, face: dark / n });
      }
    }
    return CELLS;
  }
  api.skins = function () {
    return (indexCells() || []).map(function (c) {
      return { x: c.x, y: c.y, rgb: [Math.round(c.r), Math.round(c.g), Math.round(c.b)], face: +c.face.toFixed(3) };
    });
  };

  function unpaintCurrent() {                        // pristine pixels back into the cells we leave
    if (!gl || !baseTex || !ART.orig.body) return;
    try {
      var pt = gl.getParameter(gl.TEXTURE_BINDING_2D);
      var pf = gl.getParameter(gl.UNPACK_FLIP_Y_WEBGL), pp = gl.getParameter(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false); gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
      gl.bindTexture(gl.TEXTURE_2D, baseTex);
      origSubImage.call(gl, gl.TEXTURE_2D, 0, CELL.body.x, CELL.body.y, 216, 216, RGBA, UBYTE, ART.orig.body);
      origSubImage.call(gl, gl.TEXTURE_2D, 0, CELL.head.x, CELL.head.y, 216, 216, RGBA, UBYTE, ART.orig.head);
      gl.bindTexture(gl.TEXTURE_2D, pt);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, pf); gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, pp);
    } catch (e) { api.errors.push('unpaint ' + String(e).slice(0, 60)); }
  }

  api.matchSkin = function (r, g, b) {
    var cells = indexCells();
    if (!cells || !cells.length) return 'no atlas snapshot yet';
    var body = null, head = null, bd = 1e9, hd = 1e9;
    for (var i = 0; i < cells.length; i++) {
      var c = cells[i];
      var dd = (c.r - r) * (c.r - r) + (c.g - g) * (c.g - g) + (c.b - b) * (c.b - b);
      if (c.face < 0.015) { if (dd < bd) { bd = dd; body = c; } }
      else if (dd < hd) { hd = dd; head = c; }
    }
    if (!body || !head) return 'no candidates';
    if (body.x === CELL.body.x && body.y === CELL.body.y) return 'already';
    unpaintCurrent();
    CELL.body = { x: body.x, y: body.y, w: 216, h: 216 };
    CELL.head = { x: head.x, y: head.y, w: 216, h: 216 };
    ART.orig.body = extract(BASE_SNAP.px, BASE_SNAP.w, CELL.body);
    ART.orig.head = extract(BASE_SNAP.px, BASE_SNAP.w, CELL.head);
    ART.spinner.body = discFrom(ART.orig.body, 216, 216);
    ART.spinner.head = ART.orig.head;
    SPR = {};                                        // sprite cache is stale now
    for (var li = 0; li < LOOKS.length; li++) if (LOOKS[li].id === api.lookId) { api.use(api.lookId); break; }
    api.retargets = (api.retargets || 0) + 1;
    console.log('%c[skinfire] paint retargeted to (' + body.x + ',' + body.y + ')', 'color:#ff7a00;font-weight:bold');
    return 'retargeted (' + body.x + ',' + body.y + ') d=' + Math.round(Math.sqrt(bd));
  };

  var DUMP = [];"""
assert s.count(a) == 1; s = s.replace(a, b)
open(p,'w',encoding='utf-8').write(s)
print('skinfire ok')
PY
node --check skinfire.js && echo VALID && grep -n "var SPR = {}" skinfire.js
```

## 201 — 2026-08-24T05:13:18 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
p='content.js'; s=open(p,encoding='utf-8').read()

a = "    const d = sizeCtx.getImageData(0, 0, B, B).data;"
b = """    const d = sizeCtx.getImageData(0, 0, B, B).data;
    /* SKIN AUTO-TARGET. The paint follows whatever basic skin is worn: sample the body's
       raw colour just behind the head; if it does not look painted (fire/coals are warm
       with low blue), ask skinfire to retarget its cells to the matching skin. Skipped for
       looks that hide or whiten the body - there is nothing to sample. */
    if (++skinChk >= 45) {
      skinChk = 0;
      const sf2 = window.__skinFire;
      if (sf2 && sf2.matchSkin && !sf2.bodyHidden && sf2.lookId !== 'white' && flow.ok && skinCd <= 0) {
        const back = Math.max(22, Math.min(half - 8, bodyPx * 1.1));
        let sr = 0, sg = 0, sb = 0, sn = 0;
        for (const [db2, dl] of [[0, 0], [8, 0], [0, 5], [0, -5], [12, 0]]) {
          const qx = (half - px * (back + db2) + nx * dl) | 0, qy = (half - py * (back + db2) + ny * dl) | 0;
          if (qx < 0 || qy < 0 || qx >= B || qy >= B) continue;
          const o2 = (qy * B + qx) * 4;
          if (d[o2 + 2] > d[o2] + 25 && d[o2 + 1] > d[o2]) continue;   // teal arena: skip
          sr += d[o2]; sg += d[o2 + 1]; sb += d[o2 + 2]; sn++;
        }
        if (sn >= 3) {
          sr /= sn; sg /= sn; sb /= sn;
          const painted = sr > sb + 40 && sb < 110;                    // fire or coals
          if (!painted) {
            const res = sf2.matchSkin(sr, sg, sb);
            if (res.startsWith('retargeted')) { skinSame = 0; skinCd = 360; say('\\ud83c\\udfa8 skin changed \\u2014 paint follows it now'); }
            else if (res === 'already' && ++skinSame >= 3) {
              skinSame = 0; skinCd = 3600;
              say('\\u26a0\\ufe0f this skin has its own atlas (premium) \\u2014 the fire paint cannot reach it; pick a basic skin');
            } else skinCd = 240;
          } else skinSame = 0;
        }
      } else if (skinCd > 0) skinCd -= 45;
    }"""
assert s.count(a) == 1; s = s.replace(a, b)

a2 = "  let bodyPx = SIZE.ref, sizeScale = 1, sizeCtx = null, lastTravel = -Math.PI / 2;"
assert s.count(a2) == 1
s = s.replace(a2, a2 + "\n  let skinChk = 0, skinCd = 0, skinSame = 0;      // skin auto-target cadence/cooldown")
open(p,'w',encoding='utf-8').write(s)
print('ok')
PY
node --check content.js && echo VALID
```

## 202 — 2026-08-24T05:13:48 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
p='content.js'
s = open(p, encoding='utf-8').read()

a = "    const d = sizeCtx.getImageData(0, 0, B, B).data;"
b = """    const d = sizeCtx.getImageData(0, 0, B, B).data;
    /* SKIN AUTO-TARGET. The paint follows whatever basic skin is worn: sample the body's
       raw colour just behind the head; if it does not look painted (fire/coals are warm
       with low blue), ask skinfire to retarget its cells to the matching skin. Skipped for
       looks that hide or whiten the body - there is nothing to sample. */
    if (++skinChk >= 45) {
      skinChk = 0;
      const sf2 = window.__skinFire;
      if (sf2 && sf2.matchSkin && !sf2.bodyHidden && sf2.lookId !== 'white' && flow.ok && skinCd <= 0) {
        const back = Math.max(22, Math.min(half - 8, bodyPx * 1.1));
        let sr = 0, sg = 0, sb = 0, sn = 0;
        for (const [db2, dl] of [[0, 0], [8, 0], [0, 5], [0, -5], [12, 0]]) {
          const qx = (half - px * (back + db2) + nx * dl) | 0, qy = (half - py * (back + db2) + ny * dl) | 0;
          if (qx < 0 || qy < 0 || qx >= B || qy >= B) continue;
          const o2 = (qy * B + qx) * 4;
          if (d[o2 + 2] > d[o2] + 25 && d[o2 + 1] > d[o2]) continue;   // teal arena: skip
          sr += d[o2]; sg += d[o2 + 1]; sb += d[o2 + 2]; sn++;
        }
        if (sn >= 3) {
          sr /= sn; sg /= sn; sb /= sn;
          const painted = sr > sb + 40 && sb < 110;                    // fire or coals
          if (!painted) {
            const res = sf2.matchSkin(sr, sg, sb);
            if (res.startsWith('retargeted')) { skinSame = 0; skinCd = 360; say('SKIN CHANGED - paint follows it now'); }
            else if (res === 'already' && ++skinSame >= 3) {
              skinSame = 0; skinCd = 3600;
              say('this skin has its own atlas (premium) - the fire paint cannot reach it; pick a basic skin');
            } else skinCd = 240;
          } else skinSame = 0;
        }
      } else if (skinCd > 0) skinCd -= 45;
    }"""
assert s.count(a) == 1, 'anchor'
s = s.replace(a, b)

a2 = "  let bodyPx = SIZE.ref, sizeScale = 1, sizeCtx = null, lastTravel = -Math.PI / 2;"
assert s.count(a2) == 1
s = s.replace(a2, a2 + "\n  let skinChk = 0, skinCd = 0, skinSame = 0;      // skin auto-target cadence/cooldown")
open(p, 'w', encoding='utf-8').write(s)
print('ok')
PY
node --check content.js && echo VALID && grep -c "skinChk\|matchSkin" content.js
```

## 203 — 2026-08-24T05:14:11 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && grep -n "getImageData(0, 0, B, B)" content.js && grep -n "skinChk" content.js | head -3
```

## 204 — 2026-08-24T05:14:42 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && wc -c content.js && node --check content.js && echo SYNTAX-OK && for k in "flameFrame" "__flameInfo" "spineStep" "measureBody" "getImageData(0, 0, B, B)" "skinChk"; do printf "%-24s %s\n" "$k" "$(grep -c -- "$k" content.js)"; done
```

## 205 — 2026-08-24T05:15:38 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && cp .content-v38.bak.js content.js && python - << 'PY'
import re, os

fc = open(r"C:\Users\<user>\AppData\Local\Temp\claude\C--Users-<user>\88fb0b96-1d38-4d66-ab8c-ad3209bd87d6\tasks\final_code.js", encoding='utf-8').read()
hdrs = list(re.finditer(r"/\* === (PART [A-K]).*?\*/\n", fc, re.S))
parts = {}
for i, m in enumerate(hdrs):
    start = m.end()
    end = hdrs[i+1].start() if i+1 < len(hdrs) else len(fc)
    parts[m.group(1)] = fc[start:end].strip('\n') + '\n'
assert len(parts) == 11

src = open('content.js', encoding='utf-8').read()
assert len(src) > 50000, 'backup too small'

def between(sa, ea, repl, name, includeEnd=True):
    global src
    i = src.index(sa); j = src.index(ea, i)
    j2 = j + len(ea) if includeEnd else j
    src = src[:i] + repl + src[j2:]

between("  /* v2.7: the BODY is fire now \u2014 skinfire.js repaints the game's own skin texture,",
        "latComp: 1.5, freshFull: 150, freshZero: 300 };   // v2.6: flow staleness compensated (frames); fresh window full-trust / zero-trust (ms)",
        parts['PART A'].rstrip('\n'), 'A')
anchB = "  const sprSmoke = mkSpr([[0, 'rgba(115,115,126,.5)'], [.6, 'rgba(95,95,106,.28)'], [1, 'rgba(75,75,86,0)']]);"
src = src.replace(anchB, anchB + '\n' + parts['PART B'].rstrip('\n'))
anchC = "  const EXT = { every: 5, w: 460, ema: 0.12, stepPx: 12, miss: 9, warm: 18, bright: 185, snap: 0.40 };"
src = src.replace(anchC, parts['PART C'].rstrip('\n'))
anchD = """          const corr = (latOff + off) * EXT.snap;
          const j0 = Math.max(0, i - stepN + 1), j1 = Math.min(spine.length - 1, i + stepN - 1);
          for (let j = j0; j <= j1; j++) { spine[j].x += nx * corr; spine[j].y += ny * corr; }"""
src = src.replace(anchD, parts['PART D'].rstrip('\n'))
iE = src.index("  function spineStep(cx, cy, drift, dtR) {")
sE = src.index("    if (!drift.still) {", iE)
eE_marker = "for (let i = 1; i <= k; i++) spine.unshift({ x: h.x + dx * (i / k), y: h.y + dy * (i / k) });"
eE = src.index(eE_marker, sE)
close = src.index("    }\n", src.index("      }\n", src.index("        }\n", eE)))
src = src[:sE] + parts['PART E'].rstrip('\n') + '\n' + src[close + len("    }\n"):]
iF = src.index("  const fract = (x) => x - Math.floor(x);")
iFb = src.index("  function flameOnBody(", iF)
endF = src.index("\n  }\n", src.index("fctx.drawImage(spr, px - r, py - r, r * 2, r * 2);", iFb)) + len("\n  }\n")
src = src[:iF] + parts['PART F'].rstrip('\n') + '\n' + src[endF:]
iG = src.index("    fctx.clearRect(0, 0, fireCv.width, fireCv.height);")
eGm = "    /* and the free sparks, which only sell motion at the exhaust */"
eG = src.index(eGm) + len(eGm)
src = src[:iG] + parts['PART G'].rstrip('\n') + src[eG:]
iH = src.index("    /* White-hot base: only the youngest embers, small and bright, so the flame looks like")
eHm = "    fctx.globalCompositeOperation = 'source-over';"
eH = src.index(eHm, iH) + len(eHm)
src = src[:iH] + parts['PART H'].rstrip('\n') + src[eH:]
anchI = """    if (tipSpr && targetLen > 40 && spine.length > 6) {
      const ti = Math.max(4, Math.min(spine.length - 1, Math.round(targetLen / TAIL.step)));
      const p = spine[ti], q = spine[Math.max(0, ti - 5)];
      const ang = Math.atan2(p.y - q.y, p.x - q.x);       // points away from the head"""
src = src.replace(anchI, parts['PART I'].rstrip('\n'))
iJ = src.index("  const killFire = () => {")
eJ = src.index("\n", iJ)
src = src[:iJ] + parts['PART J'].rstrip('\n') + src[eJ:]
mK = re.search(r"  say\('[^\n]*\n  console\.log\('%c\[snake rig[^\n]*\n", src)
src = src[:mK.start()] + parts['PART K'].rstrip('\n') + '\n' + src[mK.end():]

# the orphan-brace fix from the first application
a = """    headGap = spine.length ? Math.hypot(cx - spine[0].x, cy - spine[0].y) : 0;
      }
    }
    /* The spine is the PROBE: keep it longer than the answer. Trimming it to the measured"""
b = """    headGap = spine.length ? Math.hypot(cx - spine[0].x, cy - spine[0].y) : 0;
    /* The spine is the PROBE: keep it longer than the answer. Trimming it to the measured"""
assert src.count(a) == 1
src = src.replace(a, b)

# SAFE WRITE: temp file + atomic replace, so a crash can never truncate again
tmp = 'content.js.new'
open(tmp, 'w', encoding='utf-8').write(src)
os.replace(tmp, 'content.js')
print('rebuilt:', len(src), 'bytes,', src.count(chr(10)), 'lines')
PY
node --check content.js && echo REBUILT-VALID && for k in "flameFrame" "__flameInfo" "spineStep" "headGap" "FLAME"; do printf "%-14s %s\n" "$k" "$(grep -c -- "$k" content.js)"; done
```

## 206 — 2026-08-24T05:16:17 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
import os
p = 'content.js'
s = open(p, encoding='utf-8').read()

a = "    const d = sizeCtx.getImageData(0, 0, B, B).data;"
b = """    const d = sizeCtx.getImageData(0, 0, B, B).data;
    /* SKIN AUTO-TARGET. The paint targets fixed atlas cells, which broke three separate
       times when the equipped skin changed (pink worm, fish tail). So: sample the body's
       raw colour just behind the head; if it does not look painted (fire/coals = warm,
       low blue), ask skinfire to retarget its cells to whichever basic skin matches.
       Skipped when the look hides or whitens the body - nothing to sample. */
    if (++skinChk >= 45) {
      skinChk = 0;
      const sf2 = window.__skinFire;
      if (sf2 && sf2.matchSkin && !sf2.bodyHidden && sf2.lookId !== 'white' && flow.ok && skinCd <= 0) {
        const back = Math.max(22, Math.min(half - 8, bodyPx * 1.1));
        let sr = 0, sg = 0, sb = 0, sn = 0;
        for (const [db2, dl] of [[0, 0], [8, 0], [0, 5], [0, -5], [12, 0]]) {
          const qx = (half - px * (back + db2) + nx * dl) | 0, qy = (half - py * (back + db2) + ny * dl) | 0;
          if (qx < 0 || qy < 0 || qx >= B || qy >= B) continue;
          const o2 = (qy * B + qx) * 4;
          if (d[o2 + 2] > d[o2] + 25 && d[o2 + 1] > d[o2]) continue;   // teal arena: skip
          sr += d[o2]; sg += d[o2 + 1]; sb += d[o2 + 2]; sn++;
        }
        if (sn >= 3) {
          sr /= sn; sg /= sn; sb /= sn;
          const painted = sr > sb + 40 && sb < 110;                    // fire or coals
          if (!painted) {
            const res = sf2.matchSkin(sr, sg, sb);
            if (res.startsWith('retargeted')) { skinSame = 0; skinCd = 360; say('skin changed - paint follows it now'); }
            else if (res === 'already' && ++skinSame >= 3) {
              skinSame = 0; skinCd = 3600;
              say('this skin has its own atlas (premium) - the fire paint cannot reach it; pick any basic skin');
            } else skinCd = 240;
          } else skinSame = 0;
        }
      } else if (skinCd > 0) skinCd -= 45;
    }"""
assert s.count(a) == 1, 'anchor missing'
s = s.replace(a, b)

a2 = "  let bodyPx = SIZE.ref, sizeScale = 1, sizeCtx = null, lastTravel = -Math.PI / 2;"
assert s.count(a2) == 1
s = s.replace(a2, a2 + "\n  let skinChk = 0, skinCd = 0, skinSame = 0;      // skin auto-target cadence/cooldown")

tmp = p + '.new'
open(tmp, 'w', encoding='utf-8').write(s)
os.replace(tmp, p)
print('ok', len(s))
PY
node --check content.js && echo VALID && grep -c "skinChk" content.js
# version + banner
python - << 'PY'
import os
s = open('content.js', encoding='utf-8').read()
s = s.replace("localStorage.setItem('__snakeRig', '3.4 '", "localStorage.setItem('__snakeRig', '3.9 '")
tmp='content.js.new'; open(tmp,'w',encoding='utf-8').write(s); os.replace(tmp,'content.js')
m = open('manifest.json', encoding='utf-8').read().replace('"version": "3.4.1"', '"version": "3.9"').replace('"version": "3.6"', '"version": "3.9"')
open('manifest.json','w',encoding='utf-8').write(m)
print(open('manifest.json').read().split('version')[1][:12])
PY
node --check content.js && node --check skinfire.js && echo "ALL VALID"
```

## 207 — 2026-08-24T05:16:41 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && grep -o '"version": "[^"]*"' manifest.json && python -c "
import os
m = open('manifest.json', encoding='utf-8').read()
import re
m = re.sub(r'\"version\": \"3\.[0-9.]+\"', '\"version\": \"3.9\"', m, count=1)
open('manifest.json','w',encoding='utf-8').write(m)
print(re.search(r'\"version\": \"[^\"]*\"', m).group(0))"
```

## 208 — 2026-08-24T05:17:30 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake" && cat >> README.md << 'MD'

## v3.9 — RIDERS ON THE BODY (2026-08-24, adversarially verified)

Built by a 12-agent pass (3 designs → 6 adversarial refuters → tested synthesis) after his dad:
"cant we use the position of the body to know where the flame should be... we had it working...
lets get an adversarial pass, maybe do the glowing idea in parallel as well."

**What the history recovery found:** the version his dad means by "we had it working" is the
v3.0-era `off` look — truck + invisible body + the long free-ember overlay in **warm
white-gold** ("invisible worked" is the only present-tense approval in the whole transcript).
Two consequences: (1) the exact approved config is forbidden by his own later ruling (alpha 0
blanks same-skin players), so it is rebuilt as coals/vanish below; (2) v3.4's orange recolour
was reacting to complaints aimed at the v3.3 ribbon, not the ember cloud — so the warm palette
is restored behind `__flame.warm` (0..1, live) rather than argued about.

**The flame:** elements ("riders") at fixed arc-length positions along the body-snapped spine —
an **exact-pitch odometer** (nodes exactly `TAIL.step` apart + a `headGap` remainder) makes
index×step be true arc length at any speed, which killed a hidden 13–40% spacing error that made
every earlier anti-bead margin quietly wrong. A **travelling heat field** streams down the worm
(`worldFlowPxS` must never cross 0 or the fire looks painted onto the arena), an **alpha budget**
keeps additive stacking below clipping (the tube), and stable per-rider hashes keep it from
strobing. Judged by numbers, not eyes: `__flameInfo()` → `overlap` 1.7–4.5 (\<1.15 = beads),
`peakAlpha` ≤1.3 (>1.5 = tube), `contrast` >2.5. All knobs live on `__flame`.

**Worm removal, two ways (LB):** `carfire`/`allfire` paint the body as **dark coals** — it
vanishes under the flame but stays measurable and other players stay visible; `vanish` is true
alpha-0 (the historically approved look) with its two known costs accepted by choosing it.

**Skin auto-target:** the paint used to hit FIXED atlas cells, which broke three times (pink
worm, fish tail) whenever the equipped skin changed. Now the rig samples the body colour behind
the head; when it doesn't look painted, `__skinFire.matchSkin(r,g,b)` finds the matching basic
skin in the pristine atlas snapshot (indexed by colour + has-face), **un-paints the old cells**,
and retargets. Premium skins (own atlas) are detected and reported rather than flip-flopped.
Related fix: whichever fire-art atlas decoded first used to hijack the active look
(fish loads before fire sometimes) — the declared look is now always re-asserted.

**Ops lesson that cost a file:** a Python `open(path,'w')` truncates BEFORE write; a
UnicodeEncodeError mid-write left content.js at 0 bytes (and `node --check` passes an empty
file, so "VALID" lied). All build scripts now write to a temp file + `os.replace`. The v3.9
build was reconstructed from `.content-v38.bak.js` + the archived patch set, byte-faithful.
MD
python - << 'PY'
p = r"C:\Users\<user>\.claude\projects\C--Users-<user>\memory\xbox-snake-rig.md"
s = open(p, encoding='utf-8').read()
ins = '''v3.9 (2026-08-24, CURRENT) - RIDERS ON THE BODY, from a 12-agent adversarial pass. Read
README §v3.9. The load-bearing facts:
- "we had it working" = the v3.0 `off` look: free embers in WARM WHITE-GOLD over an invisible
  body. The orange recolour (v3.4) was aimed at the ribbon, not the cloud - warm palette is
  back behind __flame.warm (live 0..1). Alpha-0 is only legal as the explicit 'vanish' look.
- Flame = riders at EXACT arc-length pitch along the body-snapped spine (odometer: nodes
  exactly TAIL.step apart + headGap remainder; the old k-equal-parts fill hid a 13-40% spacing
  error that falsified every anti-bead margin). Travelling heat field must keep worldFlowPxS
  from crossing 0. Alpha budget prevents the tube. Judge by __flameInfo(): overlap 1.7-4.5
  (<1.15=beads), peakAlpha<=1.3 (>1.5=tube), contrast>2.5.
- Worm removal: carfire/allfire = DARK COALS body (invisible under flame, still measurable,
  other players stay visible); 'vanish' = true alpha-0 with its two known costs.
- SKIN AUTO-TARGET: the paint no longer hits fixed cells (broke 3x: pink worm, fish). The rig
  samples body colour behind the head and __skinFire.matchSkin() retargets to the matching
  basic skin (atlas indexed by colour+face), UN-painting the old cells first. Premium skins
  (own atlas) are detected and reported. Also: the declared look is re-asserted on every art
  capture - whichever atlas decoded first used to hijack it (fish beats fire sometimes).
- OPS: open(path,'w') truncates BEFORE write - a mid-write crash left content.js at 0 BYTES
  and node --check passes an empty file. Always temp-file + os.replace. Keep .content-v38.bak.js
  and the final_code.js patch set (scratchpad tasks dir) until git exists for this folder.

'''
s = s.replace('v3.8 (2026-08-23, CURRENT)', ins + 'v3.8 (2026-08-23)')
import os
tmp = p + '.new'; open(tmp, 'w', encoding='utf-8').write(s); os.replace(tmp, p)
print('memory ok')
PY
sed -i 's|(v3.4): steering study|(v3.9): steering study|' "C:/Users/<user>/.claude/projects/C--Users-<user>/memory/MEMORY.md" 2>/dev/null; grep -o "(v3.[0-9]*)" "C:/Users/<user>/.claude/projects/C--Users-<user>/memory/MEMORY.md"
```

## 209 — 2026-08-24T05:17:55 (Bash)

```
cp "C:/Users/<user>/AppData/Local/Temp/claude/C--Users-<user>/88fb0b96-1d38-4d66-ab8c-ad3209bd87d6/tasks/final_code.js" "C:/Users/<user>/dev/xbox-snake/extension/.v39-patchset.js" && ls -la "C:/Users/<user>/dev/xbox-snake/extension/" | awk '{print $5, $9}' | grep -v "^0 $"
```

## 210 — 2026-08-25T03:25:14 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && wc -c content.js skinfire.js manifest.json && node --check content.js && node --check skinfire.js && python -c "import json; json.load(open('manifest.json'))" && echo "ALL VALID" && grep -o '"version": "[^"]*"' manifest.json && grep -c "flameFrame\|__flameInfo" content.js && grep -c "matchSkin\|vanish" skinfire.js
```

## 211 — 2026-08-25T03:47:50 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake" && sed -n "/## .*P0/,/## /p" STUDY.md | head -80
```

## 212 — 2026-08-25T03:48:54 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && echo "=== say def ===" && sed -n '45,70p' content.js && echo "=== no-pad branch ===" && grep -n "rig ready" content.js && echo "=== truckOn gate ===" && sed -n '1440,1465p' content.js && echo "=== end gate ===" && sed -n '1570,1585p' content.js && echo "=== dpad usage ===" && grep -n "dU\b\|dD\b\|pDU\|pDD" content.js | head && echo "=== warm default ===" && grep -n "warm:" content.js | head -3
```

## 213 — 2026-08-25T03:49:53 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && grep -n "say('" content.js | tail -3 && grep -n "localStorage.setItem('__snakeRig'" content.js && grep -n "lookId: LOOKS\[0\].id" skinfire.js && grep -n "var look = LOOKS\[0\];" skinfire.js && grep -n "return L.id;" skinfire.js
```

## 214 — 2026-08-25T03:50:46 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
import os
p = 'content.js'
s = open(p, encoding='utf-8').read()

# R1 - TDZ: the skin sampler used px/py/nx/ny before their declarations -> silent
# ReferenceError -> the whole skin-follow feature never ran. Move the decls above it.
decls = "    const px = Math.cos(lastTravel), py = Math.sin(lastTravel); // along travel\n    const nx = -py, ny = px;                                    // across travel\n"
assert s.count(decls) == 1
s = s.replace(decls, "")
dline = "    const d = sizeCtx.getImageData(0, 0, B, B).data;\n"
assert s.count(dline) == 1
s = s.replace(dline, dline + decls)

# R6a - version constant, right after the one-rig guard
a = "  try { localStorage.setItem('__snakeRig', '3.9 ' + new Date().toISOString()); } catch (_) {}"
b = ("  const RIG_VERSION = '3.9.1';                 // MUST equal manifest.json version - the HUD shows it\n"
     "  try { localStorage.setItem('__snakeRig', RIG_VERSION + ' ' + new Date().toISOString()); } catch (_) {}")
assert s.count(a) == 1; s = s.replace(a, b)

# R7 - banner fade (sticky flag exempts the stale-lane warning)
a = "  window.__claudeSay = m => { const e = document.getElementById('__claudeSay'); if (e) { e.textContent = '\U0001f4ac ' + m; e.style.setProperty('opacity', '1', 'important'); } };\n  const say = m => { try { window.__claudeSay(m); } catch (_) {} };"
b = ("  window.__claudeSay = (m, sticky) => { const e = document.getElementById('__claudeSay'); if (!e) return;\n"
     "    e.textContent = '\U0001f4ac ' + m; e.style.setProperty('opacity', '1', 'important');\n"
     "    clearTimeout(e.__fade);\n"
     "    if (!sticky) e.__fade = setTimeout(() => e.style.setProperty('opacity', '0', 'important'), 8000); };\n"
     "  const say = (m, sticky) => { try { window.__claudeSay(m, sticky); } catch (_) {} };\n"
     "  /* R6b - stale-lane detector: lanecheck.js (isolated world) stamps the DISK manifest\n"
     "     version onto <html>. If it differs from the version compiled into THIS script, the\n"
     "     loaded build is stale - it names itself instead of masquerading as a regression. */\n"
     "  const laneChk = setInterval(() => {\n"
     "    const dv = document.documentElement.dataset.rigDiskVersion;\n"
     "    if (!dv) return;\n"
     "    clearInterval(laneChk);\n"
     "    if (dv !== RIG_VERSION) {\n"
     "      const warn = () => say('STALE EXTENSION: v' + RIG_VERSION + ' loaded, v' + dv + ' on disk - reload at chrome://extensions', true);\n"
     "      warn(); setInterval(warn, 15000);\n"
     "    }\n"
     "  }, 1000);\n"
     "  setTimeout(() => clearInterval(laneChk), 30000);")
assert s.count(a) == 1; s = s.replace(a, b)

# R4 - no-pad cold start says why the fire is out (once)
a = "    if (!pad) { hud.textContent = '\U0001f699 rig ready \u2014 press a button on the pad';"
b = "    if (!pad) { if (!saidNoPad) { saidNoPad = true; say('press any button on the pad to light the fire'); } hud.textContent = '\U0001f699 rig ready \u2014 press a button on the pad';"
assert s.count(a) == 1; s = s.replace(a, b)
a = "      pA = false, pB = false, pX = false, pLB = false, pMenu = false, pDL = false, pDR = false, pDU = false, pDD = false,"
b = a + "\n      saidNoPad = false, lbCombo = false,"
assert s.count(a) == 1; s = s.replace(a, b)

# R5 - LB+DpadUp steps the warm palette; look cycle moves to LB RELEASE so the combo
# does not also change the look
a = """    if (LB && !pLB) {
      const r = window.__skinFire ? window.__skinFire.next() : 'no skin hook';
      /* a look may prefer the car off ('purefire' = all fire, no car). Applied on the
         SWITCH only, so Y still overrides it afterwards. */
      if (window.__skinFire) truckOn = !window.__skinFire.hideTruck;
      say('\U0001f525 look: ' + r + (truckOn ? '' : ' (all fire, no car)'));
    } pLB = LB;"""
b = """    if (LB && !pLB) lbCombo = false;                 // cycle fires on RELEASE, so combos work
    if (LB && dU && !pDU) {                          // LB + DpadUp: step the flame palette (R5)
      lbCombo = true;
      const f = window.__flame || {};
      f.warm = f.warm >= 1 ? 0 : (f.warm >= 0.35 ? 1 : 0.35);
      say('flame warm ' + f.warm + (f.warm === 1 ? ' (white-gold)' : (f.warm === 0 ? ' (orange)' : ' (approved mix)')));
    }
    if (!LB && pLB && !lbCombo) {
      const r = window.__skinFire ? window.__skinFire.next() : 'no skin hook';
      /* a look may prefer the car off. Applied on the SWITCH only, so Y still overrides. */
      if (window.__skinFire) truckOn = !window.__skinFire.hideTruck;
      say('\U0001f525 look: ' + r + (truckOn ? '' : ' (all fire, no car)'));
    } pLB = LB;"""
assert s.count(a) == 1; s = s.replace(a, b)

# guard the spot-snap dpad so LB combos do not also snap
a = "      if ((dR && !pDR) || (dD && !pDD)) snap(1); if ((dL && !pDL) || (dU && !pDU)) snap(-1);"
b = "      if (!LB) { if ((dR && !pDR) || (dD && !pDD)) snap(1); if ((dL && !pDL) || (dU && !pDU)) snap(-1); }"
assert s.count(a) == 1; s = s.replace(a, b)

# R3 - the flame no longer dies with the truck: truckOn only gates the SPRITE
a = "      if (truckOn) {\n        // v2.6: real elapsed rAF time in 60Hz-frame units"
b = ("      { // motion + flame run for ANY fire look; truckOn only gates the truck sprite (R3)\n"
     "        // v2.6: real elapsed rAF time in 60Hz-frame units")
assert s.count(a) == 1; s = s.replace(a, b)
a = "        truck.style.opacity = '1'; truck.style.left = cx + 'px'; truck.style.top = cy + 'px';"
b = "        truck.style.opacity = truckOn ? '1' : '0'; truck.style.left = cx + 'px'; truck.style.top = cy + 'px';"
assert s.count(a) == 1; s = s.replace(a, b)
a = "      } else { truck.style.opacity = '0'; killFire(); }\n"
b = "      }\n"
assert s.count(a) == 1; s = s.replace(a, b)

# HUD gets the version stamp
a = " \u00b7 LB=look \u00b7 B=circle \u00b7 X=revive \u00b7 Y=truck \u00b7 RB=menu`;"
b = " \u00b7 LB=look \u00b7 B=circle \u00b7 X=revive \u00b7 Y=truck \u00b7 RB=menu \u00b7 v${RIG_VERSION}`;"
assert s.count(a) == 1; s = s.replace(a, b)

# banner reflects the build
a = "  say('\U0001f525\U0001f699 v3.9 \u2014 riders on the body: the flame is particles again, positioned on the measured body. __flameInfo()');"
b = "  say('\U0001f525\U0001f699 v' + RIG_VERSION + ' \u2014 flame rides the measured body; look + warm palette persist. LB=look, LB+DpadUp=palette.');"
assert s.count(a) == 1; s = s.replace(a, b)

tmp = p + '.new'; open(tmp, 'w', encoding='utf-8').write(s); os.replace(tmp, p)
print('content.js ok', len(s))
PY
node --check content.js && echo CONTENT-VALID
```

## 215 — 2026-08-25T03:51:16 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
import os
p = 'skinfire.js'
s = open(p, encoding='utf-8').read()

# R2a - boot with the persisted look when it names a LOOKS entry
a = "  var look = LOOKS[0];"
b = ("  /* R2 - the chosen look persists across launches ('vanish is saved' is now true) */\n"
     "  var __storedLook = null;\n"
     "  try { __storedLook = localStorage.getItem('__rigLook'); } catch (eS) {}\n"
     "  var look = LOOKS[0];\n"
     "  for (var __bi = 0; __bi < LOOKS.length; __bi++) if (LOOKS[__bi].id === __storedLook) look = LOOKS[__bi];")
assert s.count(a) == 1; s = s.replace(a, b)

a = "    base: false, art: null, lookId: LOOKS[0].id, looks: LOOKS.map(function (l) { return l.id; }),\n    bodyHidden: false, trail: LOOKS[0].trail,"
b = "    base: false, art: null, lookId: look.id, looks: LOOKS.map(function (l) { return l.id; }),\n    bodyHidden: (look.alpha === 0), trail: look.trail,"
assert s.count(a) == 1; s = s.replace(a, b)

# R2b - persist on every successful use() of a real LOOKS id (raw art names are not saved)
a = "    return L.id;"
b = ("    for (var __pi = 0; __pi < LOOKS.length; __pi++) if (LOOKS[__pi].id === L.id) { try { localStorage.setItem('__rigLook', L.id); } catch (eP) {} break; }\n"
     "    return L.id;")
assert s.count(a) == 1; s = s.replace(a, b)

tmp = p + '.new'; open(tmp, 'w', encoding='utf-8').write(s); os.replace(tmp, p)
print('skinfire ok', len(s))
PY
node --check skinfire.js && echo SKIN-VALID
# lanecheck.js - new, isolated world
cat > lanecheck.js << 'JS'
/* lanecheck.js - runs in the extension's ISOLATED world (it needs chrome.runtime, which
   the MAIN-world rig scripts cannot see). Stamps two versions onto <html>:
     rigLoadedVersion - the manifest Chrome actually LOADED (cached until the extension
                        is reloaded at chrome://extensions)
     rigDiskVersion   - manifest.json fetched fresh from DISK
   The rig compares its own compiled-in RIG_VERSION against rigDiskVersion; a mismatch
   means the loaded build is stale. That mismatch has repeatedly masqueraded as a
   gameplay regression - now it names itself. */
(function () {
  try {
    var loaded = chrome.runtime.getManifest().version;
    document.documentElement.dataset.rigLoadedVersion = loaded;
    fetch(chrome.runtime.getURL('manifest.json'))
      .then(function (r) { return r.json(); })
      .then(function (m) { document.documentElement.dataset.rigDiskVersion = m.version; })
      .catch(function () { document.documentElement.dataset.rigDiskVersion = loaded; });
  } catch (e) {}
})();
JS
node --check lanecheck.js && echo LANE-VALID
# manifest: third content script + web_accessible_resources + version bump
python - << 'PY'
import json, os
m = json.load(open('manifest.json', encoding='utf-8'))
m['version'] = '3.9.1'
if not any(cs.get('js') == ['lanecheck.js'] for cs in m['content_scripts']):
    m['content_scripts'].append({ 'matches': ['https://snake.io/*'], 'js': ['lanecheck.js'], 'run_at': 'document_idle' })
m['web_accessible_resources'] = [{ 'resources': ['manifest.json'], 'matches': ['https://snake.io/*'] }]
tmp = 'manifest.json.new'
open(tmp, 'w', encoding='utf-8').write(json.dumps(m, indent=2))
os.replace(tmp, 'manifest.json')
print(json.dumps(m, indent=1)[:500])
PY
```

## 216 — 2026-08-25T03:51:39 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
s = open('content.js', encoding='utf-8').read()
iD = s.index("const d = sizeCtx.getImageData(0, 0, B, B).data;")
iPx = s.index("const px = Math.cos(lastTravel)")
iSamp = s.index("SKIN AUTO-TARGET")
iWalk = s.index("for (const off of [-9, 0, 9])")
print('order ok:', iD < iPx < iSamp < iWalk)
for k in ['RIG_VERSION', 'lbCombo', 'saidNoPad', 'rigDiskVersion', 'truckOn ?']:
    print(k, s.count(k))
print('old gate gone:', 'if (truckOn) {\n        // v2.6' not in s)
PY
node --check content.js && node --check skinfire.js && node --check lanecheck.js && python -c "import json; json.load(open('manifest.json'))" && echo "ALL FOUR VALID"
```

## 217 — 2026-08-25T03:52:18 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake" && git init -b main 2>&1 | head -1 && git add extension/.content-v25.bak.js README.md && git -c user.email="noreply@anthropic.com" -c user.name="Claude" commit -q -m "historical: v2.5 ember fire backup — 'the cool fire tail' first iteration

The only surviving pre-v3.9 code snapshot. Warm white-gold free embers
(rgba(255,245,180) core), life 110, size variance 0.75-1.25, growth 2.2x.
This is the renderer character every approved version shared.

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>" && git tag v2.5-backup && git add -A && git -c user.email="noreply@anthropic.com" -c user.name="Claude" commit -q -m "v3.9.1: riders flame + P0 fixes from forensic study

R1 skin-follow TDZ fix (never executed before), R2 look persistence,
R3 flame decoupled from truck toggle, R4 no-pad banner, R5 LB+DpadUp
warm palette stepper, R6 HUD version stamp + stale-lane detector
(lanecheck.js), R7 banner fade. STUDY.md documents the full history.

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>" && git tag v3.9.1 && git log --oneline && git tag
```

## 218 — 2026-08-25T03:53:32 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
import os
p = 'content.js'
s = open(p, encoding='utf-8').read()

a = "  setTimeout(() => clearInterval(boot), 60000);"
b = """  setTimeout(() => clearInterval(boot), 60000);
  /* room finder announcement - his dad: "i dont know if room finder is in the game or not..
     it should say". The CrazyGames build's menu has a room text field (same name = same
     room, near-empty arena - how he and James play together); the main build does not. */
  const roomChk = setInterval(() => {
    const ri = [...document.querySelectorAll('input')].find(i => /room/i.test((i.placeholder || '') + ' ' + (i.name || '') + ' ' + (i.id || '')));
    if (ri) {
      clearInterval(roomChk);
      window.__roomInput = ri;
      say('room finder: YES - type a room name in the menu field; same name = same room (share it with James)');
    }
  }, 1200);
  setTimeout(() => {
    clearInterval(roomChk);
    if (!window.__roomInput) say('room finder: not on this build - use snake.io/crazygames/ for the room field');
  }, 15000);"""
assert s.count(a) == 1; s = s.replace(a, b)
s = s.replace("const RIG_VERSION = '3.9.1';", "const RIG_VERSION = '3.9.2';")
tmp = p + '.new'; open(tmp, 'w', encoding='utf-8').write(s); os.replace(tmp, p)
print('ok')
PY
node --check content.js && python -c "
import json, os
m = json.load(open('manifest.json', encoding='utf-8')); m['version'] = '3.9.2'
tmp='manifest.json.new'; open(tmp,'w',encoding='utf-8').write(json.dumps(m, indent=2)); os.replace(tmp,'manifest.json')
print('manifest 3.9.2')" && cd "C:/Users/<user>/dev/xbox-snake" && git add -A && git -c user.email="noreply@anthropic.com" -c user.name="Claude" commit -q -m "v3.9.2: announce room-finder availability in the banner

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>" && git tag v3.9.2 && git log --oneline | head -3
```

## 219 — 2026-08-25T03:55:03 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && sed -n "$(grep -n 'const FIRE = {' content.js | cut -d: -f1),+16p" content.js && echo "=== FLAME mode keys ===" && grep -n "mode:" content.js | head -3 && grep -n "FLAME.mode\|mode === 'off'\|mode !== " content.js | head -5 && echo "=== spark draw ===" && grep -n "sparkLife\|sparkR\b\|sparkRate" content.js | head
```

## 220 — 2026-08-25T03:55:35 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
import os

# ---- skinfire: the 'rocket' look + expose the flag
p = 'skinfire.js'; s = open(p, encoding='utf-8').read()
a = """    { id: 'vanish',  art: 'fire', alpha: 0.00, alphaHead: 1.00, flicker: false, amp: 1.3,
      trail: 'long' },"""
b = """    { id: 'vanish',  art: 'fire', alpha: 0.00, alphaHead: 1.00, flicker: false, amp: 1.3,
      trail: 'long' },
    /* ROCKET - the "long long time ago" golden look, reconstructed from the study:
       "there was no tail it was a straight flame that followed the head". No body, no
       body-tracing riders - just the free-ember cloud streaming straight off the truck,
       v2.5 parameters, white-gold. The rig reads `rocket` and reconfigures the flame. */
    { id: 'rocket',  art: 'fire', alpha: 0.00, alphaHead: 1.00, flicker: false, amp: 1.3,
      trail: 'long', rocket: true },"""
assert s.count(a) == 1; s = s.replace(a, b)
a = "    api.hideTruck = !!L.hideTruck;                    // a look may ask the rig to drop the car"
b = a + "\n    api.rocketMode = !!L.rocket;                      // 'rocket': straight head-following flame, no riders"
assert s.count(a) == 1; s = s.replace(a, b)
tmp = p + '.new'; open(tmp, 'w', encoding='utf-8').write(s); os.replace(tmp, p)
print('skinfire ok')

# ---- content.js: apply/restore the rocket configuration when the look changes
p = 'content.js'; s = open(p, encoding='utf-8').read()
a = "    const tMode = (window.__skinFire && window.__skinFire.trail) || 'puff';"
b = """    const tMode = (window.__skinFire && window.__skinFire.trail) || 'puff';
    /* ROCKET look: free embers ARE the flame again - v2.5 numbers, white-gold, riders off.
       This is the reconstructed "straight flame that followed the head". */
    const rocketWant = !!(window.__skinFire && window.__skinFire.rocketMode);
    if (rocketWant !== rocketOn) {
      rocketOn = rocketWant;
      const F = window.__flame || {};
      if (rocketOn) {
        rocketSave = { mode: F.mode, warm: F.warm, life: FIRE.sparkLife, r: FIRE.sparkR, rate: FIRE.sparkRate,
                       grow: FIRE.grow, growB: FIRE.growBoost, latK: FIRE.latK, flameA: FIRE.flameA };
        F.mode = 'off'; F.warm = 1;                       // riders off; white-gold palette
        FIRE.sparkLife = 110; FIRE.sparkR = 0.42; FIRE.sparkRate = 5;
        FIRE.grow = 1.2; FIRE.growBoost = 1.7;            // v2.5 billow: embers swell as they age
        FIRE.latK = 0.20; FIRE.flameA = 0.55;
      } else if (rocketSave) {
        F.mode = rocketSave.mode; F.warm = rocketSave.warm;
        FIRE.sparkLife = rocketSave.life; FIRE.sparkR = rocketSave.r; FIRE.sparkRate = rocketSave.rate;
        FIRE.grow = rocketSave.grow; FIRE.growBoost = rocketSave.growB;
        FIRE.latK = rocketSave.latK; FIRE.flameA = rocketSave.flameA;
      }
    }"""
assert s.count(a) == 1; s = s.replace(a, b)
a = "      saidNoPad = false, lbCombo = false,"
b = "      saidNoPad = false, lbCombo = false, rocketOn = false, rocketSave = null,"
assert s.count(a) == 1; s = s.replace(a, b)
s = s.replace("const RIG_VERSION = '3.9.2';", "const RIG_VERSION = '3.9.3';")
tmp = p + '.new'; open(tmp, 'w', encoding='utf-8').write(s); os.replace(tmp, p)
print('content ok')

import json
m = json.load(open('manifest.json', encoding='utf-8')); m['version'] = '3.9.3'
tmp = 'manifest.json.new'; open(tmp, 'w', encoding='utf-8').write(json.dumps(m, indent=2)); os.replace(tmp, 'manifest.json')
print('manifest 3.9.3')
PY
node --check content.js && node --check skinfire.js && echo "BOTH VALID" && cd .. && git add -A && git -c user.email="noreply@anthropic.com" -c user.name="Claude" commit -q -m "v3.9.3: 'rocket' look — the reconstructed golden flame

'there was no tail it was a straight flame that followed the head':
free-ember cloud streaming off the truck, v2.5 parameters (life 110,
grow 1.2/1.7, white-gold warm=1), body invisible, riders off.

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>" && git tag v3.9.3-rocket && git log --oneline | head -2
```

## 221 — 2026-08-25T03:56:32 (Bash)

```
python - << 'PY'
import os
p = r"C:\Users\<user>\.claude\projects\C--Users-<user>\memory\xbox-snake-rig.md"
s = open(p, encoding='utf-8').read()
ins = '''v3.9.3 (2026-08-24, CURRENT). GIT NOW EXISTS (dev/xbox-snake, tags v2.5-backup / v3.9.1 /
v3.9.2 / v3.9.3-rocket) - commit every change. STUDY.md at repo root = the full forensic
history (golden states, 11 regression mechanisms ranked); read it before big changes.
- **THE #1 REGRESSION WAS THE PIPELINE, not code**: his dad plays in NORMAL Chrome where the
  unpacked extension CACHES code until reloaded at chrome://extensions; every fix went into
  the MCP browser by injection. A full Chrome restart reloads the extension - Claude can do
  that via PowerShell (close window + relaunch chrome --app=...). lanecheck.js (isolated
  world) + a HUD version stamp now make a stale build NAME ITSELF (compares RIG_VERSION in
  content.js vs manifest.json fetched from disk).
- P0s fixed after the study: the v3.9 skin-follow had a TDZ bug (px/nx used before decl,
  silently swallowed - it had NEVER run); look now PERSISTS via localStorage __rigLook;
  flame no longer dies with the truck toggle (truckOn only gates the sprite); LB+DpadUp
  steps __flame.warm 0/0.35/1 (look-cycle moved to LB RELEASE); no-pad start says why the
  fire is out; banner fades after 8s (sticky flag for warnings).
- **'rocket' = THE golden look his dad kept asking for**: "there was no tail it was a straight
  flame that followed the head". Free-ember cloud off the truck, v2.5 numbers (sparkLife 110,
  sparkR 0.42, rate 5, grow 1.2/1.7), warm=1 white-gold, body alpha 0, riders OFF
  (FLAME.mode='off'). Applied/restored in content.js when lookId changes; look flag
  `rocket:true` in skinfire LOOKS. LB order: carfire, allfire, vanish, rocket, white.

'''
s = s.replace('v3.9 (2026-08-24, CURRENT)', ins + 'v3.9 (2026-08-24)')
tmp = p + '.new'; open(tmp, 'w', encoding='utf-8').write(s); os.replace(tmp, p)
print('memory ok')
PY
sed -i 's|(v3.9): steering study|(v3.9.3, GIT EXISTS NOW): steering study|' "C:/Users/<user>/.claude/projects/C--Users-<user>/memory/MEMORY.md" && grep -o "(v3.9.3[^)]*)" "C:/Users/<user>/.claude/projects/C--Users-<user>/memory/MEMORY.md"
```

## 222 — 2026-08-25T03:56:52 (Bash)

```
python - << 'PY'
import os
p = r"C:\Users\<user>\.claude\projects\C--Users-<user>\memory\xbox-snake-rig.md"
s = open(p, encoding='utf-8').read()
s = s.replace('description: "his dad\'s snake.io Xbox-controller browser rig at dev/xbox-snake (v3.2) \u2014 the steering study, the path-spine flame tail, the 9 looks, and the traps that cost hours"',
              'description: "his dad\'s snake.io Xbox-controller browser rig at dev/xbox-snake (v3.9.3, git + STUDY.md exist) \u2014 the golden \'rocket\' flame, the pipeline traps, and the studies"')
s = s.replace("(NOT in any git repo): `snake-app-mode.js`", "(git repo since 2026-08-24, tags mark milestones): `snake-app-mode.js`")
s = s.replace("v3.2 (2026-08-23, CURRENT). Four things", "v3.2 (2026-08-23). Four things")
tmp = p + '.new'; open(tmp, 'w', encoding='utf-8').write(s); os.replace(tmp, p)
print('CURRENT count:', s.count('CURRENT'))
PY
```

## 223 — 2026-08-25T04:07:16 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake" && git tag -a golden-confirmed -m "his dad, 2026-08-25 00:06: 'ah i see this is it... yes this is the flame!' — rocket look confirmed as the lost golden flame" v3.9.3-rocket 2>/dev/null || git tag golden-confirmed && git tag | tail -5
python - << 'PY'
import os
p = r"C:\Users\<user>\.claude\projects\C--Users-<user>\memory\xbox-snake-rig.md"
s = open(p, encoding='utf-8').read()
a = "- **'rocket' = THE golden look his dad kept asking for**:"
b = "- **'rocket' = THE golden look, CONFIRMED by his dad 2026-08-25**: \"ah i see this is it... it's a\n  little worse than i thought, but yes this is the flame!\" (memory had embellished it - the\n  reconstruction is right; git tag `golden-confirmed`). Original ask:"
assert s.count(a) == 1; s = s.replace(a, b)
tmp = p + '.new'; open(tmp, 'w', encoding='utf-8').write(s); os.replace(tmp, p)
print('memory ok')
PY
```

## 224 — 2026-08-25T04:12:46 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
import os

p = 'skinfire.js'; s = open(p, encoding='utf-8').read()
a = """    /* ROCKET - the "long long time ago" golden look, reconstructed from the study:
       "there was no tail it was a straight flame that followed the head". No body, no
       body-tracing riders - just the free-ember cloud streaming straight off the truck,
       v2.5 parameters, white-gold. The rig reads `rocket` and reconfigures the flame. */
    { id: 'rocket',  art: 'fire', alpha: 0.00, alphaHead: 1.00, flicker: false, amp: 1.3,
      trail: 'long', rocket: true },"""
b = """    /* ROCKET - the confirmed golden look ("yes this is the flame!", 2026-08-25). The flame
       is the free-ember cloud streaming straight off the truck, v2.5 parameters, white-gold.
       The body is DARK COALS rather than alpha 0 (His dad: "how do we not do that other player
       thing?") - other players wearing this skin stay visible as a dark worm instead of
       vanishing, and a visible body means the flame length is MEASURED, not guessed: the rig
       drives ember lifetime from the real body length. Golden flame, smoldering wake. */
    { id: 'rocket',  art: 'fire', alpha: 1.00, alphaHead: 1.00, flicker: false, amp: 1.3,
      trail: 'long', rocket: true, mono: [126, 50, 20], monoGain: 0.80, monoBias: 8 },"""
assert s.count(a) == 1; s = s.replace(a, b)
tmp = p + '.new'; open(tmp, 'w', encoding='utf-8').write(s); os.replace(tmp, p)
print('skinfire ok')

p = 'content.js'; s = open(p, encoding='utf-8').read()
# flame length = measured body length / speed, when in rocket mode and a length is known
a = "      const lifeCap = FIRE.sparkLife * (boost ? 1.5 : 1);"
b = """      /* rocket mode: trail length is speed x lifetime, so lifetime = measured length /
         speed makes the flame end where the body ends - the "tail length" fix. Bounded so
         a bad measurement can neither amputate nor exaggerate. Non-rocket looks keep the
         short fixed-life exhaust sparks. */
      const lifeCap = (rocketOn && targetLen > 40)
        ? Math.max(30, Math.min(300, (targetLen * 0.97) / Math.max(1.5, spd)))
        : FIRE.sparkLife * (boost ? 1.5 : 1);"""
assert s.count(a) == 1; s = s.replace(a, b)
s = s.replace("const RIG_VERSION = '3.9.3';", "const RIG_VERSION = '3.9.4';")
tmp = p + '.new'; open(tmp, 'w', encoding='utf-8').write(s); os.replace(tmp, p)
print('content ok')

import json
m = json.load(open('manifest.json', encoding='utf-8')); m['version'] = '3.9.4'
tmp = 'manifest.json.new'; open(tmp, 'w', encoding='utf-8').write(json.dumps(m, indent=2)); os.replace(tmp, 'manifest.json')
print('manifest 3.9.4')
PY
node --check content.js && node --check skinfire.js && echo "BOTH VALID" && cd .. && git add -A && git -c user.email="noreply@anthropic.com" -c user.name="Claude" commit -q -m "v3.9.4: rocket keeps the golden flame, fixes both known costs

Body = dark coals instead of alpha 0 (other players wearing the skin
stay visible as a dark worm), and a visible body is measurable, so
ember lifetime = measured length / speed - the flame ends where the
body ends. Golden flame + smoldering wake.

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>" && git tag v3.9.4 && git log --oneline | head -2
```

## 225 — 2026-08-25T04:13:41 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
import os
p = 'skinfire.js'; s = open(p, encoding='utf-8').read()
a = """    /* the loader-spinner white: flat, smooth, dark eyes kept, no trail */"""
b = """    /* FIRESNAKE - "or we can somehow get the fire snake?" We already have its art: 'fire'
       IS Firefang's atlas (db489690), captured from the game. Painted at FULL brightness the
       body is the fire snake - game-drawn, exact alignment, measurable, and other players on
       this skin just look fiery instead of vanishing. Plus the golden rocket flame at the
       head (rocket:true). The locked premium skin, in effect, without the unlock. */
    { id: 'firesnake', art: 'fire', alpha: 1.00, alphaHead: 1.00, flicker: false, amp: 1.3,
      trail: 'long', rocket: true },
    /* the loader-spinner white: flat, smooth, dark eyes kept, no trail */"""
assert s.count(a) == 1; s = s.replace(a, b)
tmp = p + '.new'; open(tmp, 'w', encoding='utf-8').write(s); os.replace(tmp, p)
print('ok')
PY
node --check skinfire.js && python -c "
import json, os
m = json.load(open('manifest.json', encoding='utf-8')); m['version'] = '3.9.5'
tmp='manifest.json.new'; open(tmp,'w',encoding='utf-8').write(json.dumps(m, indent=2)); os.replace(tmp,'manifest.json')" && python -c "
import os
s = open('content.js', encoding='utf-8').read()
s = s.replace(\"const RIG_VERSION = '3.9.4';\", \"const RIG_VERSION = '3.9.5';\")
tmp='content.js.new'; open(tmp,'w',encoding='utf-8').write(s); os.replace(tmp,'content.js')" && node --check content.js && echo VALID && cd .. && git add -A && git -c user.email="noreply@anthropic.com" -c user.name="Claude" commit -q -m "v3.9.5: 'firesnake' look — Firefang art at full brightness + rocket flame

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>" && git tag v3.9.5 && git log --oneline | head -1
```

## 226 — 2026-08-25T04:15:56 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake" && cat > launch-snake.ps1 << 'PS1'
# launch-snake.ps1 - one-click clean launch for the Snake.io Monster Truck rig.
# Guarantees the unpacked extension loads FRESH from disk whenever it safely can:
# Chrome only re-reads unpacked extensions when its browser process starts, so a
# stale process = stale rig, which has repeatedly masqueraded as a "regression".
$ErrorActionPreference = 'SilentlyContinue'
$chrome = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
$url = 'https://snake.io/crazygames/'

# map pid -> command line so the MCP-profile Chrome (--user-data-dir=...) is never touched
$cmdline = @{}
Get-CimInstance Win32_Process -Filter "Name='chrome.exe'" | ForEach-Object { $cmdline[[int]$_.ProcessId] = $_.CommandLine }
$normalProcs = Get-Process chrome -ErrorAction SilentlyContinue | Where-Object { $cmdline[$_.Id] -and $cmdline[$_.Id] -notmatch 'user-data-dir' }

# 1. close any existing Snake window in the normal profile, gracefully
$normalProcs | Where-Object { $_.MainWindowTitle -like '*Snake.io*' } | ForEach-Object { [void]$_.CloseMainWindow() }
Start-Sleep -Seconds 3

# 2. if the normal profile has no OTHER visible window (mail, docs...), stop it fully so
#    the extension reloads; if other windows exist, leave them alone - the in-game
#    stale-build banner will say so if the rig is old
$cmdline = @{}
Get-CimInstance Win32_Process -Filter "Name='chrome.exe'" | ForEach-Object { $cmdline[[int]$_.ProcessId] = $_.CommandLine }
$normalProcs = Get-Process chrome -ErrorAction SilentlyContinue | Where-Object { $cmdline[$_.Id] -and $cmdline[$_.Id] -notmatch 'user-data-dir' }
$otherWindows = $normalProcs | Where-Object { $_.MainWindowTitle -and $_.MainWindowTitle -notlike '*Snake.io*' }
if (-not $otherWindows) {
  $normalProcs | ForEach-Object { Stop-Process -Id $_.Id -Force }
  Start-Sleep -Seconds 2
}

# 3. launch the game in app mode
Start-Process $chrome "--app=$url"
PS1
cat > launch-snake.cmd << 'CMD'
@echo off
rem One-click clean launch for Snake.io Monster Truck (reloads the rig from disk).
powershell -NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File "%~dp0launch-snake.ps1"
CMD
echo written && ls -la launch-snake.*
```

## 227 — 2026-08-25T04:16:14 (PowerShell)

```
$ws = New-Object -ComObject WScript.Shell
$targets = @(
  "$env:USERPROFILE\Desktop\Snake.io Monster Truck.lnk",
  "$env:APPDATA\Microsoft\Windows\Start Menu\Programs\Snake.io Monster Truck.lnk"
)
foreach ($t in $targets) {
  $lnk = $ws.CreateShortcut($t)
  $lnk.TargetPath = "$env:SystemRoot\System32\WindowsPowerShell\v1.0\powershell.exe"
  $lnk.Arguments = "-NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File `"C:\Users\<user>\dev\xbox-snake\launch-snake.ps1`""
  $lnk.WorkingDirectory = "C:\Users\<user>\dev\xbox-snake"
  $lnk.IconLocation = "C:\Users\<user>\dev\xbox-snake\snakeio.ico,0"
  $lnk.WindowStyle = 7
  $lnk.Description = "Snake.io Monster Truck - clean launch (rig always fresh from disk)"
  $lnk.Save()
  if (Test-Path $t) { "updated: $t" } else { "FAILED: $t" }
}
```

## 228 — 2026-08-25T04:16:32 (PowerShell)

```
powershell -NoProfile -ExecutionPolicy Bypass -File "C:\Users\<user>\dev\xbox-snake\launch-snake.ps1"
Start-Sleep -Seconds 6
Get-Process chrome -ErrorAction SilentlyContinue | Where-Object { $_.MainWindowTitle } | Select-Object Id, MainWindowTitle | Format-Table -AutoSize
```

## 229 — 2026-08-25T04:17:12 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake" && git add -A && git -c user.email="noreply@anthropic.com" -c user.name="Claude" commit -q -m "launch-snake.cmd/.ps1: one-click clean launch; shortcuts repointed

Closes the Snake window gracefully, fully stops the normal-profile
Chrome only when no other windows would be lost, relaunches in app
mode - so every launch loads the rig fresh from disk. Desktop and
Start Menu shortcuts now run this instead of chrome.exe directly.

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>" && git log --oneline | head -1
python - << 'PY'
import os
p = r"C:\Users\<user>\.claude\projects\C--Users-<user>\memory\xbox-snake-rig.md"
s = open(p, encoding='utf-8').read()
a = "- **THE #1 REGRESSION WAS THE PIPELINE, not code**"
b = """- **LAUNCH = dev/xbox-snake/launch-snake.cmd (or .ps1)** - both his shortcuts (Desktop +
  Start Menu "Snake.io Monster Truck") now run it: closes the Snake window, fully stops the
  normal-profile Chrome ONLY if no other windows would be lost (never touches the MCP
  --user-data-dir Chrome), relaunches --app. Every launch = extension fresh from disk.
- 'rocket' since v3.9.4 = coals body (other players visible, length MEASURED -> ember life =
  targetLen/speed, capped [30,300]); 'firesnake' (v3.9.5) = Firefang art full-bright + rocket
  flame - "get the fire snake" without the unlock. LB: carfire, allfire, vanish, rocket,
  firesnake, white.
- **THE #1 REGRESSION WAS THE PIPELINE, not code**"""
assert s.count(a) == 1; s = s.replace(a, b)
tmp = p + '.new'; open(tmp, 'w', encoding='utf-8').write(s); os.replace(tmp, p)
print('memory ok')
PY
```

## 230 — 2026-08-25T04:23:51 (PowerShell)

```
powershell -NoProfile -ExecutionPolicy Bypass -File "C:\Users\<user>\dev\xbox-snake\launch-snake.ps1"
Start-Sleep -Seconds 6
$cmdline = @{}
Get-CimInstance Win32_Process -Filter "Name='chrome.exe'" | ForEach-Object { $cmdline[[int]$_.ProcessId] = $_.CommandLine }
Get-Process chrome -ErrorAction SilentlyContinue | Where-Object { $_.MainWindowTitle } | ForEach-Object {
  $lane = if ($cmdline[$_.Id] -match 'user-data-dir') { 'LAB - ignore this one' } else { 'YOURS - PLAY HERE' }
  "{0}  {1}" -f $lane, $_.MainWindowTitle
}
```

## 231 — 2026-08-25T05:05:35 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake" && git add SPIKE-geometry.md PRIOR-ART.md && git -c user.email="noreply@anthropic.com" -c user.name="Claude" commit -q -m "research: GPU geometry spike (FEASIBLE) + prior-art sweep

SPIKE-geometry.md: vertex layout cracked (stride 68, centre@36, rot@44,
UV@28), 0.25ms/frame, our-worm ID via steering fingerprint. PRIOR-ART.md:
exact layout queryable at draw time (Spector pattern, no guessing), VP
matrix arrives 3 ways, snake.io heap-scan fallback, atlas-UV quad ID is
novel. Together: the complete v4.0 spec.

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>" && git log --oneline | head -2
```

## 232 — 2026-08-25T05:26:18 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake" && git worktree list && WT=$(git worktree list --porcelain | grep -A0 "worktree" | grep -v "$(pwd -W 2>/dev/null || echo NEVER)" | head -1 | sed 's/worktree //') && echo "--- branch commits so far ---" && git log v4-geometry --oneline 2>/dev/null | head -8 && echo "--- report exists? ---" && git worktree list --porcelain | sed -n 's/^worktree //p' | while read w; do ls "$w/BRANCH-REPORT.md" 2>/dev/null; done
```

## 233 — 2026-08-25T05:29:31 (PowerShell)

```
powershell -NoProfile -ExecutionPolicy Bypass -File "C:\Users\<user>\dev\xbox-snake\launch-snake.ps1"
Start-Sleep -Seconds 6
$cmdline = @{}
Get-CimInstance Win32_Process -Filter "Name='chrome.exe'" | ForEach-Object { $cmdline[[int]$_.ProcessId] = $_.CommandLine }
Get-Process chrome -ErrorAction SilentlyContinue | Where-Object { $_.MainWindowTitle } | ForEach-Object {
  $lane = if ($cmdline[$_.Id] -match 'user-data-dir') { 'LAB - leave alone' } else { 'YOURS - PLAY HERE' }
  "$lane :: $($_.MainWindowTitle)"
}
# and hand it focus so the pad works immediately
$mine = Get-Process chrome -ErrorAction SilentlyContinue | Where-Object { $_.MainWindowTitle -and $cmdline[$_.Id] -notmatch 'user-data-dir' } | Select-Object -First 1
if ($mine) {
  Add-Type @"
using System;using System.Runtime.InteropServices;
public class FG { [DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr h); }
"@ -ErrorAction SilentlyContinue
  [void][FG]::SetForegroundWindow($mine.MainWindowHandle)
  "focused yours"
}
```

## 234 — 2026-08-25T22:00:15 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake" && git worktree list && echo "--- v4-geometry log ---" && git log v4-geometry --oneline | head -5 && echo "--- worktree status ---" && cd .claude/worktrees/agent-af014be101b91d379 && git status --short | head -15 && git log --oneline -3 && echo "--- report? ---" && ls BRANCH-REPORT.md 2>/dev/null || echo "no report yet" && echo "--- files ---" && ls extension/geometry.js 2>/dev/null && wc -l extension/geometry.js extension/content.js 2>/dev/null
```

## 235 — 2026-08-25T22:14:58 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/.claude/worktrees/agent-af014be101b91d379" && git log --oneline -4 && git status --short | head -5 && ls -la --time-style=+%H:%M BRANCH-REPORT.md extension/geometry.js 2>/dev/null | awk '{print $6, $7, $5}'
```

## 236 — 2026-08-25T22:49:16 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake" && git log v4-geometry --oneline | head -10 && echo "--- worktree branch state ---" && git log worktree-agent-af014be101b91d379 --oneline -2 2>/dev/null && git diff v4-geometry worktree-agent-af014be101b91d379 --stat 2>/dev/null | tail -3 && echo "--- worktree dirty? ---" && cd .claude/worktrees/agent-af014be101b91d379 && git status --short | head -5
```

## 237 — 2026-08-25T22:49:42 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake" && git merge v4-geometry -m "merge v4-geometry: exact GPU worm geometry drives the flame

All acceptance gates passed in the live lab (BRANCH-REPORT.md):
A cost p95 0.4-0.6ms, 0 errors. B head-at-centre 99.7%, 0 mis-locks
in final build. D flame on-body 97.8-100%. E fallback to flow in
248ms with no visual break. F glow tripwire armed + 2 live catches.
Fallback keeps v3.9.5 behaviour bit-for-bit when geo is silent.

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>" && python - << 'PY'
import json, os, re
m = json.load(open('extension/manifest.json', encoding='utf-8'))
m['version'] = '4.0.0'
tmp = 'extension/manifest.json.new'
open(tmp, 'w', encoding='utf-8').write(json.dumps(m, indent=2)); os.replace(tmp, 'extension/manifest.json')
s = open('extension/content.js', encoding='utf-8').read()
s = re.sub(r"const RIG_VERSION = '[^']*';", "const RIG_VERSION = '4.0.0';", s, count=1)
tmp = 'extension/content.js.new'
open(tmp, 'w', encoding='utf-8').write(s); os.replace(tmp, 'extension/content.js')
print('version 4.0.0 set')
PY
node --check extension/content.js && node --check extension/geometry.js && node --check extension/skinfire.js && node --check extension/lanecheck.js && python -c "import json; json.load(open('extension/manifest.json'))" && echo "ALL VALID" && git add -A && git -c user.email="noreply@anthropic.com" -c user.name="Claude" commit -q -m "v4.0.0: release version stamp

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>" && git tag v4.0.0 && git worktree remove .claude/worktrees/agent-af014be101b91d379 --force && git branch -D worktree-agent-af014be101b91d379 2>/dev/null; git log --oneline -3 && git tag | tail -3
```

## 238 — 2026-08-25T22:50:05 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake" && git rm -r --cached .claude/worktrees/agent-af014be101b91d379 -q && printf ".claude/\n" >> .gitignore && git add .gitignore && git -c user.email="noreply@anthropic.com" -c user.name="Claude" commit -q -m "hygiene: ignore .claude/ (worktrees), drop embedded repo from index

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>" && echo committed
# the agent's lab server may still hold the worktree dir — free it, then remove
netstat -ano 2>/dev/null | grep ":8783" | head -2
for pid in $(netstat -ano 2>/dev/null | grep ":8783.*LISTENING" | awk '{print $NF}' | sort -u); do taskkill //PID $pid //F 2>/dev/null && echo "killed $pid"; done
sleep 1
git worktree remove .claude/worktrees/agent-af014be101b91d379 --force 2>&1 | head -1
git worktree prune && git worktree list
```

## 239 — 2026-08-25T22:50:24 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake" && rm -rf .claude/worktrees/agent-af014be101b91d379 2>/dev/null; ls .claude/worktrees/ 2>/dev/null || echo "worktrees clean" && git status --short | head -3 && echo "--- main is v4.0.0 ---" && grep -o '"version": "[^"]*"' extension/manifest.json && grep -o "RIG_VERSION = '[^']*'" extension/content.js
```

## 240 — 2026-08-25T22:50:41 (PowerShell)

```
powershell -NoProfile -ExecutionPolicy Bypass -File "C:\Users\<user>\dev\xbox-snake\launch-snake.ps1"
Start-Sleep -Seconds 6
$cmdline = @{}
Get-CimInstance Win32_Process -Filter "Name='chrome.exe'" | ForEach-Object { $cmdline[[int]$_.ProcessId] = $_.CommandLine }
Get-Process chrome -ErrorAction SilentlyContinue | Where-Object { $_.MainWindowTitle } | ForEach-Object {
  $lane = if ($cmdline[$_.Id] -match 'user-data-dir') { 'LAB' } else { 'YOURS' }
  "$lane :: $($_.MainWindowTitle)"
}
```

## 241 — 2026-08-25T22:51:35 (Bash)

```
python - << 'PY'
import os
p = r"C:\Users\<user>\.claude\projects\C--Users-<user>\memory\xbox-snake-rig.md"
s = open(p, encoding='utf-8').read()
ins = '''v4.0.0 (2026-08-25, CURRENT, tag v4.0.0) - GEOMETRY ENGINE, his dad's idea ("the same thing
that tells chrome where the snake is we could replace"). extension/geometry.js taps the GPU
vertex stream: every worm's per-segment centre/rotation/width/skin, parsed at p95 0.4-0.6ms,
0 errors. Flame rides EXACT positions. Read BRANCH-REPORT.md + SPIKE-geometry.md + PRIOR-ART.md
before touching it. Load-bearing facts:
- OUR worm = steering-fingerprint lock (commanded turns vs chain head rotation), needs 3-25s of
  varied steering + LIVE FLOW EVIDENCE (mandatory - no flow, no lock; kills the death-screen
  giant re-lock). Three stacked mis-lock defenses: strict re-acquire gates, flow-residual veto
  <0.45 with >=12 pairs + direction diversity, runtime camera-consistency invariant firing on
  max(measured, PREDICTED) motion (a still camera must still trip it).
- Vertex layout: stride 68; f12@byte48 is a PER-QUAD CORNER SCALE (sizes 3-5x off without it).
  The named-VP uniform route works but impostor matrices exist - validate via flow-ppu +
  head-at-centre. snake.io does NOT cull worm segments => geo length is TRUE full length (the
  old pixel walk failed both ways: 5313px real vs 422px viewport-capped; flame contamination
  inflated small worms).
- HUD shows the live source: "· geo" or "· flow". Fallback to the full v3.9.5 flow engine in
  ~250ms when geo goes silent (__geoKill gates publish only, tracking survives). Rollback:
  __geoKill, or drop geometry.js from manifest, or git tag v3.9.5.
- GLOW: tripwire caught 2 live candidates (128x128 DXT5 at ONE/ONE blend = the prime suspect,
  64x64 at 770/1). Next: capture + re-inject as permanent glow quads on our worm.
- Remaining (BRANCH-REPORT): bodyK per-skin calibration (thickness +6%), faster lock, in-round
  glow capture. Lab server for geo iteration: .geoserve.py (port 8783).

'''
s = s.replace('v3.9.3 (2026-08-24, CURRENT)', ins + 'v3.9.3 (2026-08-24)')
s = s.replace("(v3.9.3, git + STUDY.md exist)", "(v4.0.0 geometry engine, git + STUDY.md exist)")
tmp = p + '.new'; open(tmp, 'w', encoding='utf-8').write(s); os.replace(tmp, p)
print('memory ok')
PY
sed -i 's|(v3.9.3, GIT EXISTS NOW)|(v4.0.0 GPU-geometry engine, GIT EXISTS)|' "C:/Users/<user>/.claude/projects/C--Users-<user>/memory/MEMORY.md"
cd "C:/Users/<user>/dev/xbox-snake" && cat >> README.md << 'MD'

## v4.0.0 — THE GEOMETRY ENGINE (2026-08-25)

His dad: *"essentially the same thing that tells chrome where the snake is I would think we could
replace."* Correct, and now shipped: `extension/geometry.js` taps the GPU vertex stream and
reads every worm's per-segment centre, rotation, width and skin — exact, per frame, p95
0.4–0.6 ms, zero errors in acceptance. The flame rides truth instead of measurement; optical
flow survives only as the automatic fallback (engaged in ~250 ms if geo goes silent, HUD flips
"· geo" → "· flow"). Full numbers in BRANCH-REPORT.md; techniques in SPIKE-geometry.md and
PRIOR-ART.md (the atlas-UV worm identification appears to be novel — nothing public does it).

The real engineering fight was **"which worm is me?"** — solved by a steering fingerprint
(commanded turns matched against each chain's head rotation) hardened by three stacked
defenses after live mis-locks onto a spawn-adjacent giant and the post-death spectated worm:
flow evidence is mandatory for any lock, a vector-residual veto with direction diversity, and
a camera-consistency invariant that fires on *predicted* motion so a still camera can't hide a
bad lock. Lock takes 3–25 s of varied steering after spawn; until then the rig runs on flow.

Glow hunt (His dad's tip that the loading-screen worms sometimes glow): the tripwire caught two
live candidates — a 128×128 DXT5 drawn at ONE/ONE (classic additive glow) is the prime
suspect. Next step: capture its texture and re-inject glow quads on our segments permanently.
MD
git add -A && git -c user.email="noreply@anthropic.com" -c user.name="Claude" commit -q -m "docs: v4.0.0 README section

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>" && git log --oneline -2
```

## 242 — 2026-08-25T22:56:45 (PowerShell)

```
# close EVERY snake window (his + lab), then open only his via the launcher
$cmdline = @{}
Get-CimInstance Win32_Process -Filter "Name='chrome.exe'" | ForEach-Object { $cmdline[[int]$_.ProcessId] = $_.CommandLine }
Get-Process chrome -ErrorAction SilentlyContinue | Where-Object { $_.MainWindowTitle -match 'Snake' } | ForEach-Object { [void]$_.CloseMainWindow() }
Start-Sleep -Seconds 4
# make sure the LAB browser is fully gone too (its background process can linger)
Get-CimInstance Win32_Process -Filter "Name='chrome.exe'" | Where-Object { $_.CommandLine -match 'chrome-devtools-mcp' } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }
Start-Sleep -Seconds 2
powershell -NoProfile -ExecutionPolicy Bypass -File "C:\Users\<user>\dev\xbox-snake\launch-snake.ps1"
Start-Sleep -Seconds 6
$wins = Get-Process chrome -ErrorAction SilentlyContinue | Where-Object { $_.MainWindowTitle }
"windows now open: $($wins.Count)"
$wins | ForEach-Object { " -> $($_.MainWindowTitle)" }
```

## 243 — 2026-08-26T00:19:47 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
import os, re
p = 'content.js'
s = open(p, encoding='utf-8').read()

anchor = "  say('\U0001f525\U0001f699 v' + RIG_VERSION +"
i = s.index(anchor)
beacon = '''  /* FLIGHT RECORDER: the rig plays in his dad's own Chrome, which no automation can see
     into - so it reports its own state to a local logger when one is listening
     (127.0.0.1:8790). Fire-and-forget, no-cors, zero effect when no logger runs. This is
     how "watch me play and check the modes" becomes measurable. */
  setInterval(() => {
    try {
      const sf = window.__skinFire || {};
      const g = window.__geo || {};
      const gr = window.__geoRig || {};
      const fi = (typeof window.__flameInfo === 'function') ? window.__flameInfo() : {};
      const fl = window.__flame || {};
      const body = JSON.stringify({
        t: Date.now(), v: RIG_VERSION, look: sf.lookId, art: sf.art, installs: sf.installs || 0,
        sfErr: (sf.errors || []).length, truck: truckOn, rocket: rocketOn,
        geoState: g.ourState || 'none', map: g.map || 'none', geoErr: (g.errors || []).length,
        src: gr.fresh ? 'geo' : 'flow',
        size: Math.round(bodyPx), riders: fi.riders, overlap: fi.overlap,
        peak: fi.peakAlpha, lenPx: fi.lenPx, warm: fl.warm, mode: fl.mode
      });
      fetch('http://127.0.0.1:8790/t', { method: 'POST', mode: 'no-cors', keepalive: true, body }).catch(() => {});
    } catch (e) {}
  }, 2000);

'''
s = s[:i] + beacon + s[i:]
s = re.sub(r"const RIG_VERSION = '[^']*';", "const RIG_VERSION = '4.0.1';", s, count=1)
tmp = p + '.new'; open(tmp, 'w', encoding='utf-8').write(s); os.replace(tmp, p)

import json
m = json.load(open('manifest.json', encoding='utf-8')); m['version'] = '4.0.1'
tmp = 'manifest.json.new'; open(tmp, 'w', encoding='utf-8').write(json.dumps(m, indent=2)); os.replace(tmp, 'manifest.json')
print('beacon in, 4.0.1')
PY
node --check content.js && echo VALID && cd .. && git add -A && git -c user.email="noreply@anthropic.com" -c user.name="Claude" commit -q -m "v4.0.1: flight-recorder beacon (127.0.0.1:8790, fire-and-forget)

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>" && git tag v4.0.1 && echo committed
# the logger
cat > "C:/Users/<user>/AppData/Local/Temp/claude/C--Users-<user>/88fb0b96-1d38-4d66-ab8c-ad3209bd87d6/scratchpad/flightlog.py" << 'PYS'
import http.server, socketserver, os
LOG = r"C:\Users\<user>\AppData\Local\Temp\claude\C--Users-<user>\88fb0b96-1d38-4d66-ab8c-ad3209bd87d6\scratchpad\flight.jsonl"
class H(http.server.BaseHTTPRequestHandler):
    def do_POST(self):
        n = int(self.headers.get('Content-Length', 0))
        d = self.rfile.read(n)
        with open(LOG, 'ab') as f: f.write(d + b"\n")
        self.send_response(204); self.end_headers()
    def log_message(self, *a): pass
socketserver.ThreadingTCPServer.allow_reuse_address = True
socketserver.ThreadingTCPServer(("127.0.0.1", 8790), H).serve_forever()
PYS
echo logger written
```

## 244 — 2026-08-26T00:20:47 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && grep -n "skinTex\|isOurs\|worms.push\|worms\.push\|segs:" geometry.js | head -12 && echo "---" && grep -n "sameSkin\|ourTex" geometry.js | head -5
```

## 245 — 2026-08-26T00:22:00 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake/extension" && python - << 'PY'
import os, re
# ---------- skinfire: dream rocket (nothing visible) + loader-white head ----------
p = 'skinfire.js'; s = open(p, encoding='utf-8').read()

a = """    { id: 'rocket',  art: 'fire', alpha: 1.00, alphaHead: 1.00, flicker: false, amp: 1.3,
      trail: 'long', rocket: true, mono: [126, 50, 20], monoGain: 0.80, monoBias: 8 },"""
b = """    /* THE DREAM (His dad, 2026-08-25: "a rocket mode that worked with no face or tail - that
       was the dream"). Body AND head at alpha 0: just the truck and its flame. v4 makes this
       finally correct: the GPU geometry stream still contains the invisible segments, so the
       flame length stays EXACT - and the rig now REDRAWS other players who wear this skin
       (ghost layer in content.js) so blanking the texture blinds no one. */
    { id: 'rocket',  art: 'fire', alpha: 0.00, alphaHead: 0.00, flicker: false, amp: 1.3,
      trail: 'long', rocket: true },"""
assert s.count(a) == 1; s = s.replace(a, b)

# loader-accurate white: white head disc that keeps only the true dark eye pixels
a2 = "              if (!ART.spinner.body) ART.spinner.body = discFrom(ART.orig.body, CELL.body.w, CELL.body.h);"
b2 = """              if (!ART.spinner.body) ART.spinner.body = discFrom(ART.orig.body, CELL.body.w, CELL.body.h);
              /* loader-accurate head: a white disc with ONLY the original's true dark pixels
                 (the eyes) stamped back - the cyan base and red brows go white. His dad:
                 "the white guy [should] look more like the white loading snake". */
              if (!ART.spinner.headWhite) {
                var wh = discFrom(ART.orig.head, CELL.head.w, CELL.head.h);
                var oh = ART.orig.head;
                for (var wi = 0; wi < wh.length; wi += 4) {
                  if (oh[wi + 3] > 128) {
                    var lum2 = 0.299 * oh[wi] + 0.587 * oh[wi + 1] + 0.114 * oh[wi + 2];
                    if (lum2 < 80) { wh[wi] = 38; wh[wi + 1] = 42; wh[wi + 2] = 50; wh[wi + 3] = 255; }
                  }
                }
                ART.spinner.head = wh;
                ART.spinner.headWhite = true;
              }"""
assert s.count(a2) == 1; s = s.replace(a2, b2)
# guard the older plain-head assignment so it doesn't overwrite the white head
s = s.replace("              ART.spinner.head = ART.orig.head;             // head keeps its shape (and its eyes)",
              "              if (!ART.spinner.headWhite) ART.spinner.head = ART.orig.head;")
# softer rim = the loader's fuzzy edge
s = s.replace("var out = new Uint8Array(w * h * 4), rim = Math.max(2, r * 0.07);",
              "var out = new Uint8Array(w * h * 4), rim = Math.max(3, r * 0.13);   // soft loader-like edge")
tmp = p + '.new'; open(tmp, 'w', encoding='utf-8').write(s); os.replace(tmp, p)
print('skinfire ok')

# ---------- content.js: ghost layer for same-skin players ----------
p = 'content.js'; s = open(p, encoding='utf-8').read()
a = "  function fireFrame(cx, cy, drift, boost, dtR) {"
b = """  /* GHOST LAYER: when our look blanks the shared skin texture, every other player wearing
     it would vanish too - the one harm that killed alpha-0 twice. v4's geometry knows every
     worm's exact segments AND skin, so the rig simply REDRAWS those players itself. They
     see nothing different; his dad sees a clean grey worm where the game shows none. */
  function ghostOthers() {
    const sf = window.__skinFire, g = window.__geo, gr = window.__geoRig;
    if (!sf || !sf.bodyHidden || !g || !gr || !gr.fresh) return;
    const ours = g.worms.find(w => w.isOurs);
    if (!ours || ours.skinTex < 0) return;
    fctx.globalCompositeOperation = 'source-over';
    for (const w of g.worms) {
      if (w.isOurs || w.skinTex !== ours.skinTex) continue;
      for (let i = w.segs.length - 1; i >= 0; i--) {
        const sg = w.segs[i], r = Math.max(4, sg.w / 2);
        fctx.beginPath(); fctx.arc(sg.x, sg.y, r, 0, 6.2832);
        fctx.fillStyle = i === 0 ? 'rgba(210,225,232,0.95)' : 'rgba(158,180,190,0.88)';
        fctx.fill();
        fctx.lineWidth = 1.5; fctx.strokeStyle = 'rgba(70,90,100,0.7)'; fctx.stroke();
      }
      const h = w.segs[0];
      if (h) {          // simple eyes so it reads as a snake, not a blob chain
        const er = Math.max(1.5, h.w * 0.09);
        fctx.fillStyle = 'rgba(30,38,46,0.95)';
        fctx.beginPath(); fctx.arc(h.x - er * 1.6, h.y - er * 1.2, er, 0, 6.2832); fctx.fill();
        fctx.beginPath(); fctx.arc(h.x + er * 1.6, h.y - er * 1.2, er, 0, 6.2832); fctx.fill();
      }
    }
  }

  function fireFrame(cx, cy, drift, boost, dtR) {"""
assert s.count(a) == 1; s = s.replace(a, b)
a2 = "    fctx.clearRect(0, 0, fireCv.width, fireCv.height);"
i = s.index(a2)  # first occurrence = inside fireFrame draw path
s = s[:i] + a2 + "\n    ghostOthers();" + s[i + len(a2):]
s = re.sub(r"const RIG_VERSION = '[^']*';", "const RIG_VERSION = '4.1.0';", s, count=1)
tmp = p + '.new'; open(tmp, 'w', encoding='utf-8').write(s); os.replace(tmp, p)
print('content ok')

import json
m = json.load(open('manifest.json', encoding='utf-8')); m['version'] = '4.1.0'
tmp = 'manifest.json.new'; open(tmp, 'w', encoding='utf-8').write(json.dumps(m, indent=2)); os.replace(tmp, 'manifest.json')
print('4.1.0')
PY
node --check content.js && node --check skinfire.js && echo "BOTH VALID" && grep -n "ghostOthers();" content.js | head -2
```

## 246 — 2026-08-26T00:22:21 (Bash)

```
cd "C:/Users/<user>/dev/xbox-snake" && git add -A && git -c user.email="noreply@anthropic.com" -c user.name="Claude" commit -q -m "v4.1.0: THE DREAM — rocket with no face, no tail + ghost layer + loader white

rocket = body AND head alpha 0: just truck + flame. Correct only now
because geometry keeps exact length with an invisible body, and the
ghost layer redraws same-skin players from their exact segments so
blanking the shared texture blinds no one. White look: head becomes a
white disc keeping only the true dark eye pixels; softer loader edge.

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>" && git tag v4.1.0-dream && git log --oneline -1
# start the flight logger
cd "C:/Users/<user>/AppData/Local/Temp/claude/C--Users-<user>/88fb0b96-1d38-4d66-ab8c-ad3209bd87d6/scratchpad" && rm -f flight.jsonl
```

## 247 — 2026-08-26T00:22:52 (PowerShell)

```
powershell -NoProfile -ExecutionPolicy Bypass -File "C:\Users\<user>\dev\xbox-snake\launch-snake.ps1"
Start-Sleep -Seconds 6
(Get-Process chrome -ErrorAction SilentlyContinue | Where-Object { $_.MainWindowTitle }).Count
```

## 248 — 2026-08-26T00:33:26 (PowerShell)

```
powershell -NoProfile -ExecutionPolicy Bypass -File "C:\Users\<user>\dev\xbox-snake\launch-snake.ps1"
Start-Sleep -Seconds 8
$wins = Get-Process chrome -ErrorAction SilentlyContinue | Where-Object { $_.MainWindowTitle }
"windows: $($wins.Count) -> $($wins | ForEach-Object { $_.MainWindowTitle })"
```
