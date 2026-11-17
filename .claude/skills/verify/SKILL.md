---
name: verify
description: Run the project's quality checks (lint, typecheck, tests, optionally build) and report results. Use after code changes, before saying something works, or when the user types /verify.
---

# Verify the project

1. Run, in order: `npm run lint`, `npm run typecheck`, `npm run test`. If the user passed `build` as an argument, or the change touched pages, routes or config, also run `npm run build`.
2. Report in Polish, briefly: one line per command with pass or fail, then details only for failures.
3. If something fails because of changes made in this session, find the root cause, explain it in 1-2 sentences, and fix it. Re-run the failing command.
4. Never weaken, skip or delete a test to make it pass. If a test looks wrong, explain why and ask Marcin first.
5. If a command does not exist yet (early phases), say so instead of inventing a replacement.
