# Rymoskop

A small web app for Polish lyrics and poems: paste a text, get a phonetic transcription (IPA) with syllables and stress for every word, coloured rhyme families, the rhyme scheme, internal and multisyllabic rhymes, and statistics. Everything runs in the browser. Portfolio project built with AI-assisted coding.

- Product and rules: `docs/SPEC.md`
- Build plan, one phase at a time, with acceptance criteria: `docs/PHASES.md`
- Running log of what was done and learned: `docs/DEVLOG.md`

**Hard constraints:** no backend, no API keys, no paid services, no AI calls at runtime. The project costs 0 PLN.

## How to work with the user

- The user is Marcin, a junior developer (React + TypeScript background) and a native Polish speaker. **Talk to him in Polish.** Code, comments, commit messages and docs stay in English.
- When you introduce a concept he may not know (IPA symbols, voicing assimilation, union-find...), explain it in 1-2 plain sentences.
- Work on **one phase from `docs/PHASES.md` at a time**. Never start the next phase on your own.
- Plan before coding. In plan mode, present: files to create or change, the order of steps, risks, and open questions.
- Ask when something is ambiguous instead of guessing. Prefer the simplest solution that meets the acceptance criteria.
- Marcin is the authority on how Polish words sound. **Never mark gold-set data as verified yourself**: propose entries, he approves or corrects them.
- Never say something works unless you ran it. After code changes run the checks (see `/verify`). If you could not run something, say so plainly.
- At the end of a phase: list what Marcin should check himself, append an entry to `docs/DEVLOG.md`, and propose a commit message. Marcin commits himself unless he asks you to.

## Commands

| Command | What it does | Available from |
| --- | --- | --- |
| `npm run dev` | Local dev server | phase 1 |
| `npm run lint` | ESLint | phase 1 |
| `npm run typecheck` | `tsc -b` (all tsconfig projects, no emit) | phase 1 |
| `npm run test` | Vitest, single run | phase 1 |
| `npm run build` | Production build | phase 1 |
| `npm run preview` | Serve the production build locally | phase 1 |
| `npm run ipa -- "<text>"` | Print IPA, syllables and stress for each word | phase 2 |
| `npm run analyze -- <file.txt>` | Print rhymes, scheme and stats for a text file | phase 3 |
| `npm run eval` | Accuracy against the gold sets and poems, writes `eval/results.md` | phase 5 |

Keep this table up to date when scripts change.

## Technical rules

- Vite + React + TypeScript (strict, no `any`) + Tailwind. Tests with Vitest. TypeScript is pinned to `~6.0` because `typescript-eslint` does not support TS 7 yet; do not upgrade it until that changes. Scripts in `scripts/` run with `tsx` and must work on Windows.
- **The analysis engine is pure TypeScript in `src/lib/`** with no React and no DOM imports, so it is fully unit-testable and usable from scripts. React components only render its output.
- Data flow: `text -> tokenize -> phonetics (per word) -> rhymes (per text) -> stats`. Each step is a pure function with typed input and output (see SPEC section 3).
- Keep functions small. Every phonetic rule has at least one test that names the rule.
- Performance target: a 100-line text analyses in under 100 ms in the browser.
- UI text in Polish. Accessible: colour is never the only signal (rhyme families also get a letter or underline style), keyboard usable, visible focus, labelled controls.
- `localStorage` may keep the last pasted text; wrap reads and writes in `try/catch`.

## Copyright

- The app may analyse any text the user pastes, but **never commit lyrics of existing songs** to the repo: not in tests, fixtures, examples, README or screenshots.
- Test and demo texts are either written by Marcin or are public-domain Polish poetry (author died more than 70 years ago, e.g. Mickiewicz, Słowacki, Kochanowski, Konopnicka, Asnyk). Record the author and source of each poem in its file header.

## Definition of done (every phase)

1. Acceptance criteria from `docs/PHASES.md` are met.
2. `npm run lint`, `npm run typecheck` and `npm run test` pass.
3. The commands table above is current.
4. `docs/DEVLOG.md` has an entry for the phase.
