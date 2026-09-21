# RECOVERY — what this tree is, and what it is not

Recovered **2026-09-20** from Claude Code session transcripts after the original
working folder was lost. Read this before trusting any file here.

## What happened

The rig was built 2026-08-16 → 2026-08-26 at `C:\Users\<user>\dev\xbox-snake`,
reaching tag `v4.1.0-dream`. It had its own git repo from 2026-08-24.

The whole `dev\` tree is gone from the machine. Searched and ruled out: every depth
under the user profile, both user profiles, OneDrive (both roots), the recycle bin,
`V:\`, Chrome's installed-extension store, and any `.crx`/`.pem` packed build.
Cause is most likely the ~2026-08-29 machine migration, which has a written
inventory of what survived and what was reinstalled — `dev\` is in neither list.

Nothing here came off a backup. It was reconstructed from two session transcripts
totalling 86 MB:

- `08abcf4f-f359-465f-ace7-cf61943c735d.jsonl` (2026-08-16 →)
- `88fb0b96-1d38-4d66-ab8c-ad3209bd87d6.jsonl` (2026-08-22 →, 65 MB)

## Provenance — read the column before you trust the file

| File | State | Source |
|---|---|---|
| `README.md` | **COMPLETE** — v2.3 → v4.0.0 | base Write + 14 verbatim heredoc appends |
| `extension/skinfire.js` | **AUTHENTIC** | last full Write; zero later edits — hash-verified |
| `extension/lanecheck.js` | **AUTHENTIC** (v4.0-era) | verbatim heredoc |
| `launch-snake.ps1` / `.cmd` | **AUTHENTIC** | verbatim heredoc |
| `extension/manifest.json` | **AUTHENTIC @ v2.7** | last full Write |
| `gamepad-mouse.js` | **AUTHENTIC** | full Write, never edited |
| `snake-app-mode.js` | **AUTHENTIC** | full Write |
| `extension/.study-rec.js`, `.serve.js` | **AUTHENTIC** | full Write / heredoc |
| `extension/content.v2.7-pristine.js` | **AUTHENTIC but old** | last full Write, 2026-08-22 20:00, 33,138 b |
| `extension/content.replayed-hybrid.js` | ⚠ **NOT A REAL BUILD** | see below |
| `recovered-history/shell-history.md` | **COMPLETE** | 248 commands, 2026-08-16 → 08-26 |

Every `.js` here passes `node --check`. `manifest.json` parses.

## ⚠ The one file you must not trust

`extension/content.replayed-hybrid.js` was produced by replaying 170 `Edit`
operations onto the last full `Write`. **29 edits failed to anchor** — their
`old_string` no longer matched, because after v2.7 `content.js` was mostly rewritten
by shell heredocs and Python patch scripts that the Edit chain never saw.

So that file is a state which **never existed on disk**. It is syntactically valid,
which makes it dangerously plausible. It is kept only as salvage material.

`content.v2.7-pristine.js` is the newest genuinely authentic `content.js`.

## What is permanently lost

- **`extension/geometry.js`** — the v4.0.0 GPU-vertex-stream engine, the headline
  feature. Built by a subagent inside worktree `agent-af014be101b91d379`, which was
  then `git worktree remove --force`'d. Only greps of it appear in the parent
  transcript; its source never does.
- `STUDY.md`, `BRANCH-REPORT.md`, `SPIKE-geometry.md`, `PRIOR-ART.md`, `.geoserve.py`
  — referenced, never written through a logged tool call.
- The original git history and its tags: `v2.5-backup`, `v3.9.1`–`v3.9.5`,
  `v3.9.3-rocket`, `golden-confirmed`, `v4.0.0`, `v4.0.1`, `v4.1.0-dream`.

**`README.md` documents v4.0.0 in full prose even though its code is gone** — the
design, the vertex layout (stride 68, `f12@byte48` is a per-quad corner scale), the
mis-lock defenses and the fallback behaviour are all described well enough to rebuild
from.

## Rebuilding forward

`recovered-history/shell-history.md` is the real asset for anything past v2.7: 248
chronological commands containing the actual v2.8 → v4.0 patch scripts. Combined with
the README's version sections, the path from `content.v2.7-pristine.js` to a working
v3.9 is readable, if manual.

To load what exists now: `chrome://extensions` → Developer mode → **Load unpacked** →
select `extension/`. Note `manifest.json` lists `skinfire.js` and `content.js`; you
will need to supply a `content.js` (copy one of the two variants) and, if you re-add
`lanecheck.js`, register it.

## Credits

Built by **James and his dad**, 2026-08-16 → 2026-08-26, with AI.

James came aboard on 2026-08-22 and shaped it from there. His feedback drove the flame
rework — wider, longer, more opaque and gap-free, *"so it doesn't break in the middle"* —
and the monster-truck look he asked to have for himself. They played together in a
private arena, sharing a custom room name so they had the map to themselves.

This is the ancestor of [Monster Skyway](https://jamesgarage.github.io/): the same idea —
make the thing you drive a monster truck, and give it flames — a few weeks before it
became a game of its own.
