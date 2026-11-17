# Devlog

What was built, what went wrong, how it was fixed. One entry per phase, newest at the bottom. Written by Claude Code, reviewed and corrected by Marcin.

Template:

```
## Phase N - <name> (YYYY-MM-DD)

- Built: ...
- Problem: ...
- How we found it: ...
- Fix: ...
- What I checked by hand: ...
- Lesson: ...
```

---

## Phase 1 - Project skeleton and first deploy (2026-11-17)

- Built: Vite 8 + React 19 + TypeScript 6.0 (strict) + Tailwind 4 skeleton, scaffolded in a temp sibling folder and copied in without overwriting existing files. ESLint 10 (flat config, `no-explicit-any` as error), Vitest 5 with one smoke test, `tsx` for future scripts. Polish placeholder page (title, one sentence, labelled textarea with visible focus). GitHub Actions CI: `npm ci`, lint, typecheck, test, build on Node LTS. Moved the two example texts from `examples/` to `eval/poems/` (Tetmajer, public domain) and `eval/own/` (Marcin's own verse), each with a header.
- Problem: the current Vite template ships oxlint and TypeScript 7, but `typescript-eslint` 8.73 declares `typescript >=4.8.4 <6.1.0` as a peer, so `npm install` failed with ERESOLVE.
- How we found it: the install of the ESLint stack failed; `npm view typescript-eslint peerDependencies` confirmed the range.
- Fix: Marcin chose to keep ESLint (as CLAUDE.md requires) and pin `typescript@~6.0` instead of forcing the install with `--legacy-peer-deps`. Noted in CLAUDE.md so nobody upgrades TS by accident.
- Also: the template's `tsconfig.app.json` had no explicit `strict`; added `"strict": true` to both app and node configs. npm 11 skips `esbuild`'s postinstall script (not in `allowScripts`); checked that `tsx` still runs a TS file.
- What I checked by hand: (Claude) lint, typecheck, test, build pass after a clean `npm ci`; ESLint reports an error on a probe file with `any`; built CSS contains the Tailwind classes; dev server serves the page with `lang="pl"` and the Polish text. (Marcin) CI green on GitHub; placeholder live on Vercel and opened on his phone; pushed a small change and Vercel redeployed it automatically.
- Lesson: "latest template" moves faster than the plan; check peer dependencies before assuming the documented toolchain still fits together.
