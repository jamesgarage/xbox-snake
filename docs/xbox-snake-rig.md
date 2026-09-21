---
name: xbox-snake-rig
description: "his dad + James's snake.io Xbox-controller browser rig, dev/xbox-snake — LOST 2026-08-29, partly recovered 2026-09-20; the golden 'rocket' flame, the pipeline traps, and the studies"
metadata: 
  node_type: memory
  type: project
  originSessionId: 08abcf4f-f359-465f-ace7-cf61943c735d
  modified: 2026-09-20T23:30:00.000Z
---

**[!] 2026-09-20 — THE ORIGINAL FOLDER WAS LOST AND PARTLY RECOVERED. Read this first.**
The whole `C:\Users\<user>\dev\` tree is gone (most likely the ~2026-08-29 machine
migration; ruled out: both user profiles, OneDrive, recycle bin, V:, Chrome's extension store,
any `.crx`/`.pem`). Rebuilt 2026-09-20 from the two session transcripts into a fresh git repo at
the same path — per-file provenance in `dev\xbox-snake\RECOVERY.md`. Three things to carry:
- **AUTHENTIC:** `README.md` (v2.3→v4.0.0 prose, complete), `skinfire.js` (hash-verified),
  `lanecheck.js`, `launch-snake.ps1/.cmd`, `manifest.json` (v2.7), `gamepad-mouse.js`,
  `snake-app-mode.js`, `content.v2.7-pristine.js`.
- **`content.replayed-hybrid.js` IS NOT A REAL BUILD** — 29 of 199 replayed edits failed to
  anchor, because post-v2.7 work went through shell heredocs and Python patch scripts the Edit
  chain never saw. It passes `node --check`, which makes it dangerously plausible. Salvage only.
- **`geometry.js` (the v4.0.0 engine) IS GONE** — built by a subagent in worktree
  `agent-af014be101b91d379`, which was `git worktree remove --force`'d, so its source never
  passed through the parent transcript. The README still describes the design in full, and
  `recovered-history/shell-history.md` (248 commands) holds the v2.8→v4.0 patch scripts.

**Generalisable lesson: a Claude Code transcript is only a backup for work done through the
Write/Edit tools.** Development via shell heredocs, Python patch scripts, or a subagent worktree
leaves no recoverable file content. This project did all three, which is exactly why the
headline feature is the part that could not be recovered.

**Second lesson, from the recovery itself:** joining an absolute path with `pathlib`'s `/`
DISCARDS the base (`Path('out') / 'C:/x'` == `Path('C:/x')`). A replay script built that way
overwrote this very memory file instead of writing to its scratchpad. Derive a relative key and
assert it is relative before writing.

**James co-built it** (joined 2026-08-22) — not a solo project, as this note used to say. His
feedback drove the flame rework (wider, longer, more opaque, gap-free "so it doesn't break in
the middle") and the "utilize it for james monster truck" look; they shared a private arena via
the custom-room-name trick.

Built 2026-08-16/17. Standalone folder `C:\Users\<user>\dev\xbox-snake`
(git repo since 2026-08-24, tags mark milestones): `snake-app-mode.js` (paste into browser console) + `README.md`
(full docs: controls, tuning studies, troubleshooting, platform research).

v3.2 (2026-08-23). Four things, all measured not guessed — full write-up in
README §v3.2, read it before touching steering or the tail:
1. **Steering was chasing the wrong signal.** It followed optical flow, which lags the
   stick 3–5 frames. Now the nose is DEAD-RECKONED from the stick (clamped to the worm's
   real turn cap) with flow only as a slow correction. Nose-vs-travel error 21.9°→5.1°
   mean, lag 3 frames→0 (r=0.81), wheel sign 76%→99.4% vs the request. Front wheels come
   off the RAW aim, never the truck's own lagging yaw.
2. **Flow's impossible 180° flips** (3.14 rad/frame vs a 0.12 cap) come from the hex
   background aliasing — a block match one tile over scores nearly as well. My first
   hypothesis (latency comp) was tested and REFUTED. Fixed by ratio test + plausibility
   gate + a temporal outlier filter that only ever corrects toward the mean of the last
   12 agreeing samples. The old snap logic was backwards: a BIGGER disagreement snapped
   FASTER (3 frames). Also: the plausibility gate must compare against the last ACCEPTED
   vector over time-since-that-vector; using time-since-last-frame mixed time bases and
   rejected 79% of good matches (flow lock 24%→92%).
3. **Pseudo-3D truck**: ground / 46%-height wheels / full-height chassis, body silhouette
   also at ground + half height so its flank shows. The height offset MUST be
   counter-rotated by (dirRef+beta) every frame — bake it into the art and it rotates with
   the truck and reads as a sideways smear. Same for the specular sheen.
4. **The flame tail is a PATH SPINE, not an ember cloud.** Clouds can't corner. Nodes are
   world-anchored, sampled by ARC LENGTH, and its length is MEASURED by walking the spine
   through the captured video frame to find where body pixels stop (`__tailLen()`, shown in
   HUD) — His dad needs it to match the real hitbox "so we know who we're hitting", so it errs
   short. Do NOT stamp the game's flame sprite along it: that art has spiky tendrils and
   combs out into a hairy caterpillar. Three smooth passes (wide dim glow / hot body /
   white core) with a travelling radius wave is what reads as fire.

v4.0.0 (2026-08-25, CURRENT, tag v4.0.0) - GEOMETRY ENGINE, his dad's idea ("the same thing
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

v3.9.3 (2026-08-24). GIT NOW EXISTS (dev/xbox-snake, tags v2.5-backup / v3.9.1 /
v3.9.2 / v3.9.3-rocket) - commit every change. STUDY.md at repo root = the full forensic
history (golden states, 11 regression mechanisms ranked); read it before big changes.
- **LAUNCH = dev/xbox-snake/launch-snake.cmd (or .ps1)** - both his shortcuts (Desktop +
  Start Menu "Snake.io Monster Truck") now run it: closes the Snake window, fully stops the
  normal-profile Chrome ONLY if no other windows would be lost (never touches the MCP
  --user-data-dir Chrome), relaunches --app. Every launch = extension fresh from disk.
- 'rocket' since v3.9.4 = coals body (other players visible, length MEASURED -> ember life =
  targetLen/speed, capped [30,300]); 'firesnake' (v3.9.5) = Firefang art full-bright + rocket
  flame - "get the fire snake" without the unlock. LB: carfire, allfire, vanish, rocket,
  firesnake, white.
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
- **'rocket' = THE golden look, CONFIRMED by his dad 2026-08-25**: "ah i see this is it... it's a
  little worse than i thought, but yes this is the flame!" (memory had embellished it - the
  reconstruction is right; git tag `golden-confirmed`). Original ask: "there was no tail it was a straight
  flame that followed the head". Free-ember cloud off the truck, v2.5 numbers (sparkLife 110,
  sparkR 0.42, rate 5, grow 1.2/1.7), warm=1 white-gold, body alpha 0, riders OFF
  (FLAME.mode='off'). Applied/restored in content.js when lookId changes; look flag
  `rocket:true` in skinfire LOOKS. LB order: carfire, allfire, vanish, rocket, white.

v3.9 (2026-08-24) - RIDERS ON THE BODY, from a 12-agent adversarial pass. Read
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

v3.8 (2026-08-23) - "the entire trail has to move with the car". The trail was
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

v3.7 (2026-08-23) - THE FLAME THAT WORKED. The premium fire skin is LOCKED on the
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

v3.6 (2026-08-23) - DUMP THE ATLASES BEFORE THEORISING. The texStorage2D gate only
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

v3.5 (2026-08-23) - THE CRUX, and it invalidates a lot of v3.4 effort:
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

v3.4b - "not as long as the worm". Four things, all wrong ASSUMPTIONS not tuning:
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

v3.4 (2026-08-23) - FOUR bugs behind "the fire looks wrong". Read README §v3.4
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

v3.3 TRIMMED TO 3 LOOKS (LB): `firewrm` (game's animated flame art draws the body = "the
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

Robustness: `frame()` is now a try/catch wrapper around `frameInner()` that re-schedules
on error. A throw used to kill the rAF chain forever, which the player reports as
"the controller doesn't work" — a one-line typo did exactly that this session.
Measure from `window.__tel` (published inside the render) — the old recorder re-derived
heading from DOM transforms and scored a signal the render never used.

v3.0 (2026-08-23): truck GROWS with the worm + flames exactly on the body. Worm size
is unreachable from JS, so it's MEASURED from the captured video: warm-pixel count (fire art is
orange, arena teal → R>B+26) in a 132px box on the head → disc area → diameter, EMA 0.05, held
while transparent looks make it unmeasurable (`window.__size`, HUD shows size NNpx). Drives truck
scale + ember radius + lateral spread + spawn offset. Also: chassis squat/dive from the measured
speed derivative, engine shake, speed-sensitive steer lock. 7th look 'notail' = truck alone.
EXTENSION IS LOADED in his dad's normal Chrome now (Load unpacked) — no more injection needed;
after editing files: click ⟳ on the extension card at chrome://extensions, then reload the page.
App-mode shortcut "Snake.io Monster Truck" exists on Desktop + Start Menu (chrome --app=...).

v2.9 (2026-08-22): LB on the pad cycles 6 body looks — blaze (default), snake
(Firefang's real flame art), fish, ghost (30% alpha shimmer), ember (alpha follows the flame,
only tongues visible), off (invisible body; rig auto-grows its overlay trail). One LOOKS row
adds a look; no new atlas needed. Truck: steering front wheels + rolling tread + lean + slide.

v2.8 (2026-08-22): body = the game's OWN fire art, ANIMATED. skinfire.js captures 3 atlases
by fingerprint (blaze 17e8769c = big flame, DEFAULT; snake db489690 = Firefang; fish 7c4c8ef3),
resamples their sprites into the equipped skin's cells, then re-uploads just those two 216px cells
~30fps via texSubImage2D with a scrolling flame — animated fire the GAME draws. Live switch:
`__skinFire.use('blaze'|'snake'|'fish')`. Truck has vehicle feel (`__truck`): spring yaw, steering
front wheels, rolling tread lugs, lean, rear slide. Verified in play, 0 errors, others unaffected.

v2.7 (2026-08-22) WAS THE BREAKTHROUGH — **repaint the game's own skin texture, don't overlay**.
`extension/skinfire.js` (run_at document_start) hooks Unity's DXT5 atlas upload, decodes it,
remaps the equipped skin's sprite cells through a fire ramp (alpha preserved), uploads RGBA8.
Body is game-drawn ⇒ tail length/growth/curve correct for free; no tracking, no alignment bugs.
Overlay trail cut to a 0.4s exhaust puff. Read README §v2.7 BEFORE touching this — it holds the
6 gotchas that cost hours (replay must use the UNPATCHED texStorage2D or the scene goes black;
the shipped sprite-rect table does NOT match runtime packing and the y-flip is wrong — cells were
mapped empirically; basic skins share BaseSkinAtlas 2048x1024 with UI atlases so identify by
content signature; the menu preview cycles demo skins and misleads identification).

v2.5/v2.6 (superseded for the body, still live for the truck head): OPTICAL-FLOW fire trail —
camera motion is MEASURED (captureStream(60) → rVFC → block-match 6 mid-field patches,
moving-cluster consensus) so the fire traces the real driven path; worm body hidden under it.
Y toggles truck/worm; headlight beam = true travel direction; smoke fade ending; burns out
on death. Study (README §v2.5): old aim-model erred 279 px/s mean / 628 worst; flow locks
97.5% of frames after 3 fixes (mid-field patches — screen-fixed UI fakes zero motion;
flat-gate 2.5 for zoomed-in blur; 60Hz + ±17 search + edge-reject for boost). Fallback
turnCap 0.12 = measured p95 turn rate. All gotchas written up in README §v2.5 — read it
before touching the fire/flow code. snake-app-mode.js NOT yet synced with any of this.
Crazygames build menu has server + custom-room pickers (same room name = play together,
near-empty arena). MCP Chrome profile lacks the unpacked extension — see use-my-browser
site-pattern snake.io.md for injection gotchas (initScript pre-DOM crash, destroy-first
re-arm, fake-gamepad steals the real controller, per-build DOM differences).

Facts that took real effort — don't re-derive:
- **Blended dual-stick steering is the settled answer** (2.8 corrections/min vs
  11.7–22.7 for every steer/trim role split, across 4 instrumented studies). His dad's
  hands use both sticks ~50/50; any "primary stick" design measures 4–8× worse. The
  "maybe I'd learn one stick" hypothesis was A/B-tested and retired.
- **Game must be in MOUSE control mode** — in Keyboard mode it ignores all synthetic
  mouse input and every rig feature "breaks at once". First debugging step always:
  script off, test with real mouse.
- Two web builds, separate saves: `snake.io` (newest, 3.0.10, ads — script strips) and
  `snake.io/crazygames/` (older 1.2.0, ~1.5–2× wider camera, no ads). `/beta/` just
  redirects to main. No web zoom lever works (density/aspect/browser-zoom all tested dead).
- **Presents/Boost Cubes are app-only by design** — web builds ship without the mobile
  meta (verified empirically). Paths that work: iPad/Android app, Netflix Games edition
  (phone/tablet), Snake.io+ on Apple Arcade (incl. macOS, controller-native, bots-only),
  or Xbox Cloud Gaming in browser ($9.99 + Game Pass; xbox.com/play passes the corp
  filter — streaming bypasses the MSIXVC/no-admin walls that blocked local install).
- Haptics via Web Audio hook (candy blip ≤0.6 s → tick); ticks need ≥70 ms / ≥0.5
  magnitude to be feelable; no reliable death sound exists (no death rumble).
- DevTools-MCP gotcha that caused real bugs: `new_page`/navigation silently switches the
  selected tab — always `list_pages` + `select_page` before `evaluate_script`.

Related: [[no-admin-store-blocked]]
