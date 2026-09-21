# snake.io

Verified 2026-08-22, driving the DevTools-MCP Chrome for the xbox-snake rig (dev/xbox-snake).

- The MCP-driven Chrome profile does NOT have the user's unpacked "Xbox Snake Rig" extension —
  `window.__snakeRigLoaded` is false on a fresh snake.io load. Inject `extension/content.js`
  manually (evaluate_script or initScript).
- `navigate_page` initScript runs **before `document.documentElement` exists** — DOM-touching
  code crashes after setting its guard flag, which then blocks later injection. Wrap the payload:
  defer to `DOMContentLoaded`, and inside the deferral run `__snakeApp?.destroy?.()` +
  `delete window.__snakeRigLoaded` before injecting.
- initScripts **persist across navigations and accumulate** across registrations in one session
  (an old registration re-runs on every user refresh). The destroy-first wrapper makes the last
  registration win.
- **Serve the build over `http://127.0.0.1` and fetch it from the page — do NOT paste source
  through `evaluate_script`.** Verified 2026-08-23: an earlier note here claimed mixed-content
  blocking prevented this. That was wrong. `http://127.0.0.1` is a *potentially trustworthy*
  origin, so Chrome does not treat it as mixed content on an https page; only CORS applies, and
  a one-line `Access-Control-Allow-Origin: *` static server fixes that. So:
  `(0,eval)(await (await fetch('http://127.0.0.1:PORT/content.js',{cache:'no-store'})).text())`
  hot-reloads a 60KB build for ~0 context, which makes measure→edit→re-measure loops practical.
- **Anything hooking WebGL texture upload (e.g. `skinfire.js`) must arrive at document_start**, so
  hot-eval cannot install it — the atlas is already uploaded. Use `navigate_page`'s `initScript`
  with a **synchronous XHR** (`x.open(...,false)`) and eval the response: blocking is desirable
  here, it guarantees the hook is in place before Unity boots. Guard with `if (window.top !== window) return;`.
- MCP Chrome is launched with `--disable-extensions` and `--remote-debugging-pipe` (no TCP port),
  so there is no `http://localhost:9222/json` endpoint to drive and the unpacked extension can
  never load there. `evaluate_script` + the localhost fetch above is the whole toolkit.
- Talk to the player via the rig's banner: `window.__claudeSay('msg')` (rig must be loaded).
- The player keeps playing while you work: they press LB/Y and change the look and truck state
  under you. Read `__skinFire.lookId` / `__snakeApp.truck` rather than assuming your last call stuck.
- Testing with a fake `navigator.getGamepads` override **steals the user's real controller**
  ("controller keeps losing connection"). Always save `__origGetGamepads` and restore immediately
  after the screenshot.
- Game is Unity WebGL (`unityInstance` global), `preserveDrawingBuffer:false` — no reliable canvas
  pixel readback; enemy worm positions are not reachable from the DOM. `canvas.captureStream()` ->
  video -> 2D drawImage DOES yield live pixels (the optical-flow workaround, verified 2026-08-22).
- DOM differs per build: main build wraps the game in `#main > .main-content > #webglContainer`;
  the CrazyGames build (`/crazygames/`, Unity 1.2.0) is `body > #unity-container > #unity-canvas`.
  Any hide-everything CSS must whitelist BOTH `#main` and `#unity-container` or the game goes blank.
- Multiplayer: matchmaking via POST api.kooappsservers.com/kooappsCDN/getGameServer.php (geo-assigned,
  e.g. NYC1/US-EAST, websocket port 9094; no room/region request params). The CrazyGames build's menu
  DOES expose a "Best Server" dropdown and an "Any Room" text field — typing a custom room name gives
  a near-empty room, and two people entering the same name share a room.
