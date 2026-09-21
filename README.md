# 🐍 Xbox Snake — snake.io with a controller (v2.3)

Play [snake.io](https://snake.io/crazygames/) with an Xbox controller, full-screen and
ad-free. One console script — no install, no admin, no browser extension.

Built and tuned in a single session on a locked-down corporate laptop, where the
Microsoft Store, Gaming Services, and Docker were all dead ends. Best score went from
**243 → 10,655** along the way.

---

## Easiest way to play: desktop shortcut + auto-loading extension

One-time setup (~1 minute, no admin needed):

1. Open Chrome → go to `chrome://extensions`
2. Toggle **Developer mode** on (top-right)
3. Click **Load unpacked** → select the folder `dev\xbox-snake\extension`
4. Done. From now on, the rig **auto-loads on any snake.io page** — no console, no pasting.

Then just double-click **"Snake Game"** on the Desktop (opens Chrome at snake.io, the
extension boots the game and arms the rig automatically) → press **A** on the pad → play.

Notes: Chrome may show a "developer mode extensions" notice on startup — dismiss it, it's
normal for unpacked extensions. The extension works on both builds (`snake.io` and
`snake.io/crazygames/`). To disable: chrome://extensions → toggle off.

## Manual setup (console paste — the original way)

1. Open **one of the two builds** in Chrome (each keeps its own name/score/skins save):
   - **https://snake.io/** — the newest build (3.0.10, current version). Has ad rails;
     the script strips them.
   - **https://snake.io/crazygames/** — older portal build (1.2.0) with a **wider
     camera** (~1.5–2× more visible map) and no ads natively.

   Pick per mood: *visibility* → crazygames · *latest version* → main. Neither has the
   mobile presents/meta (see below).
2. In the game, set control mode to **Mouse** — not Keyboard. ← *the #1 thing that breaks*
3. **F12** → **Console**. First time only, type `allow pasting` and Enter.
4. Paste all of **`snake-app-mode.js`** → Enter.
5. Press **A** on the controller. **F11** for true fullscreen.

**Turn it off:** `__snakeApp.destroy()` in the console (or reload the page).

---

## Controls

| Control | Action |
|---|---|
| **Either stick** | Steer — the two sticks are **blended** by how hard each is pushed, so control flows to whichever thumb is driving. Push both and the lighter one fine-tunes the aim. The HUD shows a live `L···●···R` dominance bar. |
| **A** / **RT** | Boost (HUD shows 🚀, aim dot turns red) |
| **B** | ☕ Auto-circle break — any stick or boost instantly takes back over |
| **Hold RB** | Menu cursor: sticks move it, **D-pad snaps** to PLAY/NEXT/Name/Skins/Settings, **A** clicks |
| **X** | 🎬 Revive mode — allows ads 2 min so "watch a video to revive" can play; auto re-arms |
| **Menu (Start)** | Pause steering (hands the mouse back to you) |

---

## Haptics 🎮

Rumble on game events, like the native iPad app:

| Event | Feel |
|---|---|
| Ate a candy/pellet | firm tick (0.75 weak + 0.12 strong, 80 ms) |
| Boosting | soft hum (0.06) — pauses briefly around ticks |

Mute any time with `__haptics.on = false` (or `__haptics.test()` to feel a pulse).

**How it knows what happened:** the score and collisions live inside the game canvas,
where no script can read them. So the script hooks the game's **Web Audio** — the candy
blip is a short (~0.18 s) sound, and any sound ≤ 0.6 s fires the tick. Sound becomes the
event bus the game never exposed.

**Hard-won calibration notes (v2.2):**
- The original 38 ms / 0.26-magnitude tick was *below the weak motor's perception
  threshold* — it "didn't work" while firing perfectly. Feel needs ≥ ~70 ms and ≥ ~0.5.
- `playEffect` calls **replace** each other, so a repeating boost hum masks ticks —
  the hum must defer (200 ms) around ticks.
- There is deliberately **no death rumble**: the game has 4+ distinct long sounds
  (music stingers, ambient, other snakes) and none proved unique to death. A strong
  rumble firing on the wrong event is worse than none.

---

## How the steering works

There are **no presets to pick**. One `intensity` value (0–1) tracks how hectic play is
— stick activity plus boosting — and slides every parameter between a calm end and a
combat end. It rises fast (fights get response instantly) and decays slowly (won't drop
you mid-scrap). The HUD shows it live: `AUTO ███░░░░ 42%`.

| Parameter | Calm | Combat |
|---|---|---|
| `DEAD` (deadzone) | 0.155 | 0.115 |
| `AIM_MIN/MAX` (turn reach) | 0.12 / 0.30 | 0.18 / 0.42 |
| `SMOOTH` (easing) | 0.30 | 0.55 |

Layered on top:

- **Adaptive low-pass** (One-Euro style) — heavy filtering on slow stick moves for silky
  holds, light on fast moves so flicks land with no lag. `FILT_MIN/MAX/GAIN`
- **Urgency turns** — whipping the stick kicks the aim up to 45% further out, so a panic
  dodge bites harder, then relaxes. `URG_K`, `URG_BOOST`
- **Blended dual-stick steering** (v2.2) — each stick's influence is its
  push-magnitude^`BLEND_P`, summed. No primary/trim roles, no mode switching: control
  flows to whichever thumb drives, and pushing both gives coarse+fine control at
  whatever ratio your thumbs choose. This replaced three failed designs (left-primary,
  right-primary, auto-switching) — the 20-min validation study showed the player keeps
  BOTH sticks active 78% of the time with a dominance histogram centered at 0.4–0.6:
  there was never a "primary stick" to pick. Corrections fell to **2.8/min**, the best
  of the whole project (prior best 8.4, project start 20.7).

---

## Tuning data (~75 min of instrumented play)

Every number above came from recorded sessions, not guesswork.

| Config | Corrections/min |
|---|---|
| Fixed-filter presets (Chill, main build) | 20.7 |
| Fixed-filter presets (Chill, CrazyGames build) | 16.0 |
| Auto-sensitivity, first attempt (over-eager) | 18.2 |
| Auto-sensitivity, calibrated | 8.4 |
| Left=steer + right=trim, weight 0.13 (re-tested day 2) | 11.7 – 20.9 |
| Left=steer + right=trim, weight 0.35 ("boosted trim" A/B) | 22.7 |
| Auto-sensitivity + blended dual-stick (v2.2, day 2) | 2.8 |
| **Blend after 3 days of play (day-3 validation, 16.5 min)** | **0.97** ✅ (0.5 in the final stretch) |

Day-2 postscript: the steer+trim layout was re-tried twice by preference and A/B-tested
with tripled trim authority — every variant measured 4–8× worse than the blend, with the
right stick busy 55–77% of the time regardless of how little authority it had. The blend
is the final answer; the "maybe I'd learn one stick" hypothesis was tested and retired.

Day-3 validation: after three days on the blend, corrections fell to **0.97/min**
(0.5/min in the final stretch), both-sticks usage hit 96–99%, dominance sat 88% in the
50/50 band, and eating rate rose ~40% over all earlier sessions. Player and controls
fully converged — from 20.7 to sub-1 corrections/min across the project, a 21× change.

Day-3 phase study (small-vs-large, 25 min planned): the player survived the ENTIRE
26.8-minute session as one unbroken round — zero deaths — so the round-vs-round design
collapsed into a single-round arc. Within it: small phase = 100% two-stick, 6% boost,
alert (0.49 intensity); mid = peak fight (0.57, 16% boost); large/late = relaxed
cruising (0.35, one thumb often resting). The auto-sensitivity tracked the whole arc
with no mode switches. Tuning verdict: no changes — nothing that survives 27 straight
minutes needs fixing.

The first auto attempt (`INT_GAIN 7`, boost `0.35`, release `0.012`) saturated instantly
and sat at 80–100% "combat" permanently — worse than the presets it replaced. Recalibrated
to `2.6 / 0.15 / 0.045` it actually breathes (37% calm, 48% combat) and beat everything.

**Build comparison** (same rig and player, 25 min each): the CrazyGames build's wider
camera cut corrections 23%, flicks 18%, and turn speed 20% *at equal aggression* — seeing
threats earlier turns reactive corrections into deliberate lines.

---

## ⚠️ Troubleshooting

**Nothing responds — no steering, no boost, right stick dead, B dead?**

Do this first, before assuming the script is broken:

1. Run `__snakeApp.destroy()` to turn the script off.
2. Try steering with your **actual mouse**.
   - **Mouse doesn't work either** → the **game** is in Keyboard control mode (or wedged).
     Fix it in the game's own settings, or reload the page. No script can steer a game
     that ignores the mouse.
   - **Mouse works fine** → re-paste the file; the page state was stale.

**Why it looks like four bugs at once:** the script drives the game by synthesizing mouse
events every frame. If the game stops listening to the mouse, every controller feature
dies simultaneously.

**Your real mouse can't steer while the script runs** — it emits a mousemove every frame,
so the two fight. Turn the script off to test with the mouse.

**Small snake won't boost** — that's the game's own rule, not a bug.

---

## Known limitations (by design)

- **Score, your name, and the leaderboard are painted inside the game canvas**, so no
  script can hide them. To drop your name: at the menu, click it and type a single space.
  (Covering the leaderboard with a panel was tried and looked worse — abandoned.)
- **No 2× zoom.** A `devicePixelRatio` override was tested properly at the menu screen
  (no snake, nothing to confound): hexagons and UI are **identical** at 1× and 2×. It only
  raises render resolution, it does **not** show more map — and it changes canvas
  coordinate mapping, a real source of input bugs. Removed. The wider view comes from the
  `/crazygames/` build itself.

---

## Presents & platforms (day-2 research, verified)

The iPad's "presents" are **Boost Cubes** (coin-activated random 19 s buffs) plus
live-event pickups and pass rewards — and they are **app-only by design**:

- **Web builds ship without the mobile meta entirely** — no coins, shop, cubes, quests,
  passes, or events. Verified empirically by playing the web build and by Kooapps' own
  event pages listing every platform *except* web. The BoostCube code strings in the web
  bundle are dead weight. **No amount of play unlocks presents on web.**
- Ways to actually get the presents experience:
  - **iPad/Android app** (the original) — or ad-free via **Netflix Games** if the
    household subscription includes games (phone/tablet only).
  - **Snake.io+ on Apple Arcade** (iOS/iPadOS/**macOS**/tvOS) — no ads/IAP/coin gates,
    native controller support; opponents are bots (async leaderboards, no live PvP).
  - **Xbox Cloud Gaming** — the Xbox port streams to a PC browser at
    [xbox.com/play](https://www.xbox.com/en-us/play/games/snake.io/9nkvc0g99gpq) with
    native controller support and *no install* (works on locked-down machines; the page
    passes this corp filter). Costs $9.99 + a Game Pass tier. Full-circle note: this is
    the same MSIXVC package that could never be *installed* here — streaming bypasses
    Gaming Services, admin rights, and the Store GPO entirely. Microsoft is testing a
    free ad-supported cloud tier (mid-2026, Insider-only) — recheck later.
- **Ruled out:** now.gg (doesn't host it), Google Play Games in browser (retired
  Dec 2025), Amazon Luna (not in catalog), any iPad-app-in-browser streaming (doesn't
  exist). Cloud-Android phone services (Redfinger etc.) technically work but are paid,
  gray-market-adjacent, and likely web-filtered.

## Game features (dug out of the Unity `.data` bundle)

Public docs are thin, so these came from grepping the game's own 20 MB data bundle:

- **Boost Cubes** — arena pickups giving a random 19 s buff: **Magnet**, **Speed**,
  **3× Multiplier**, **Health**. The 3× is the score-maker: grab it, then eat a big
  death pile.
  Their config gates explain why you may never see them:
  `IS_FEATURE_ENABLED`, `REQUIRED_GAMES` (minimum games played — resets on a fresh build
  save), `COIN_PRICE`, and **`HIDE_IF_USER_HAS_NOT_ENOUGH_COIN`** — with no coins they
  aren't rendered at all. Values come from Unity Remote Config, server-side.
- **Treasure Chest / Pet Treat / NOS Bottle** — an event-gated pickup family.
- **Battle Royale** and **Boss Fights** are real modes in the build
  (`BossSpawnStateData`, `BossHitData`, `BossDefeatedData`, boss skins, timers) — both
  **live-event gated**, can't be enabled client-side.
- **Daily Quests** (6/day, 24 h reset) pay stars/coins toward the **Snake Pass**.

---

## Are the controls adaptive, or static?

**Both — depending on the timescale.** Worth knowing exactly which:

**Adaptive in the moment ✅** — recomputed every frame from how you're playing *right now*:
- `intensity` (0–1) → slides deadzone, turn reach and smoothing between calm and combat
- filter strength → loosens the instant the stick moves fast
- urgency kick → scales with how hard you whip

**Static across time ❌** — these never change on their own:
- the calm/combat endpoints, `INT_GAIN`, `INT_ATTACK` / `INT_RELEASE`, the filter and
  urgency constants

Those were tuned **once**, offline, from recorded sessions. The script does not learn, and
`intensity` resets to 0 on every paste — **zero memory** between rounds or sessions. It
reads the moment well, but it will play the same next month as it does today.

---

## 🔭 Backlog — v2.1 idea: controls that learn over time

Make the tuning itself adaptive, not just the moment-to-moment response.

**Concept:** keep rolling stats in `localStorage` and self-tune toward a target
distribution — e.g. aim for roughly **35% calm / 45% combat** — nudging `INT_GAIN` a
little at the end of each session. Over a week it converges on the player's actual hands
with no manual measurement.

**Possible extensions:**
- If corrections/min stay low, push the combat endpoints further (player is handling
  sharper response); if they climb, back off.
- Persist the learned values, with a `__snakeApp.resetTuning()` escape hatch.
- Keep a small session history so a single bad night can't skew it.

**Deliberate design constraints:**
- Adapt **slowly** — fast self-tuning feels unstable and untrustworthy under the hands.
- Always keep the hand-calibrated v2.0 values as the fallback floor.
- Log what it changed and why, so the behaviour stays explainable (that principle is
  what made the v2.0 tuning trustworthy in the first place).

Rough size: ~30 lines on top of the existing loop.

---

*v2.3 — 2026-08-17. Files: `snake-app-mode.js`, `README.md`. Standalone folder, not in any git repo.*


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