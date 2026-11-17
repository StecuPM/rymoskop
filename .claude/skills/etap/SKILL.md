---
name: etap
description: Run one phase of the Rymoskop build plan from docs/PHASES.md. Use when the user types /etap followed by a phase number, or asks to start a phase.
---

# Run one build phase

The phase number is: $ARGUMENTS

1. Read `CLAUDE.md`, `docs/SPEC.md`, the section for this phase in `docs/PHASES.md`, and the latest entries in `docs/DEVLOG.md`.
2. Check that the previous phase's acceptance criteria are met (files exist, `npm run test` passes). If not, stop and tell Marcin what is missing.
3. Present the plan in Polish:
   - what this phase builds, in 2-3 sentences,
   - the files you will create or change,
   - the steps in order,
   - new libraries and why each is needed,
   - risks and open questions for Marcin.
   Wait for his approval before changing anything.
4. Implement in small steps. After each step that touches code, run the relevant checks. Explain any new concept in 1-2 sentences.
5. Run the full check (`npm run lint`, `npm run typecheck`, `npm run test`; `npm run build` when the phase changes the app). Fix what you broke. Never weaken or delete a test to make it pass.
6. Finish with, in Polish:
   - a short summary of what now works and how you verified it,
   - the "Marcin checks" list from the phase, as a checklist he can tick,
   - anything you could not verify yourself,
   - a proposed commit message (English, imperative, e.g. `Add Polish grapheme-to-phoneme rules`).
7. Append an entry for this phase to `docs/DEVLOG.md` using its template. Include at least one real problem you hit and how it was solved.
8. Stop. Do not start the next phase.
