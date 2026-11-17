# Build plan

Five phases. Do exactly one per session. Each phase lists its goal, the work, acceptance criteria, and what Marcin checks himself (the agent cannot check those for him).

---

## Phase 1 - Project skeleton and first deploy

**Goal:** an empty but healthy app, already online.

Work:
1. The repo is not empty (it already has `CLAUDE.md`, `docs/`, `.claude/`), so scaffold Vite (React + TypeScript template) into a temporary sibling folder and move the files in without overwriting existing ones. Merge `.gitignore`. Delete the temp folder.
2. Add Tailwind, ESLint, Vitest, `tsx`. Scripts: `dev`, `build`, `lint`, `typecheck`, `test`.
3. Placeholder page in Polish: title "Rymoskop", one sentence about what it will do, an empty text area.
4. One unit test so the runner is proven.
5. GitHub Actions `.github/workflows/ci.yml`: on push and pull request, Node LTS, `npm ci`, lint, typecheck, test, build.
6. Walk Marcin through deploying to Vercel (import the GitHub repo, framework preset Vite, no environment variables). Marcin clicks.

Acceptance:
- `npm run lint`, `typecheck`, `test`, `build` pass; CI is green on GitHub.
- The placeholder is live on a public Vercel URL.

Marcin checks:
- Opens the Vercel URL on his phone.
- Pushes a small change and sees Vercel redeploy it automatically.

---

## Phase 2 - Phonetics

**Goal:** every Polish word gets IPA, syllables and stress, proven by an approved gold set.

Work:
1. `src/lib/text/tokenize.ts`: text -> stanzas, lines, tokens. Detect label lines (`[Refren]`, `Zwrotka 1:`). Keep original text and position of every token. Unit tests.
2. `src/lib/phonetics/`: implement SPEC section 4 step by step (graphemes, softening, nasals, voicing, syllables, stress, exceptions). One test file per rule group; every test names its rule.
3. Draft `tests/gold/phonetics.json` with about 60 words that cover every rule, including tricky ones (nie, miasto, przy, krzak, wódka, prośba, ząb, ręka, idę, wziął, chleb, dziecko, zima, marzenie, pszczoła). **Show the list to Marcin as a table (word, IPA, syllables, stressed syllable) and wait for his corrections before saving it as approved.**
4. A test that runs the whole gold set and prints mismatches.
5. `scripts/ipa.ts` (`npm run ipa -- "<text>"`): prints each word with IPA, syllables (dot separated) and the stressed syllable.

Acceptance:
- At least 90% of the approved gold words match exactly; every mismatch is listed in the DEVLOG with a reason (rule missing, or accepted simplification).
- All tests pass.

Marcin checks:
- Reviews the gold table word by word; he is the authority on pronunciation.
- Runs `npm run ipa` on 2 lines of his own lyrics and reads the output aloud: does it match how he says it?

---

## Phase 3 - Rhymes and statistics

**Goal:** the whole analysis works in the terminal.

Work:
1. `src/lib/rhymes/`: rhyme part, comparison (exact, near, assonance, none), stopword list, end rhymes and scheme, multisyllabic rhymes, internal rhymes, families (union-find). Exactly as SPEC section 5.
2. `src/lib/stats/`: every stat in SPEC section 6.
3. `src/lib/analyze.ts`: the single entry point `analyze(text): Analysis`.
4. Draft `tests/gold/rhymes.json` with about 60 pairs (exact, near, assonance, clear negatives, a few repetitions). **Show it to Marcin as a table and wait for his approval.**
5. Unit tests for each module plus the gold set; one test with a short text where the expected scheme, multis and stats are written by hand.
6. `scripts/analyze.ts` (`npm run analyze -- <file.txt>`): prints lines with scheme letters and syllable counts, the links grouped by family, multis, and the stats.
7. Add 2 public-domain poem fragments to `eval/poems/` with headers (author, title, source, expected scheme) so there is something real to run on.

Acceptance:
- Gold rhyme pairs: at least 85% correct type; mismatches listed in the DEVLOG.
- The two poems get the expected end-rhyme scheme.
- `analyze()` on a 100-line text finishes in under 100 ms (measure in a test or script).

Marcin checks:
- Runs `npm run analyze` on 8-16 lines he wrote himself. Are the rhymes he intended found? Is anything marked that clearly does not rhyme?
- Notes 3 concrete misses or false alarms in the DEVLOG; these become fixes now or later.

---

## Phase 4 - Interface

**Goal:** the page a recruiter will open.

Work:
1. Layout: header (name, one-line description, link to GitHub), editor on the left, analysis on the right on wide screens, stacked on narrow ones.
2. Editor: textarea, analysis updates as you type (debounced), "Wczytaj przykład" (a fragment written by Marcin or a public-domain poem), "Wyczyść". Last text kept in `localStorage`.
3. Analysis view: each line with its scheme letter and syllable count; words in rhyme families coloured from an accessible palette and also marked with the family letter as a small superscript; repetitions styled differently; labels shown greyed out.
4. "Fonetyka" toggle: IPA under each word.
5. Word tooltip on hover and keyboard focus: IPA, syllables with the stressed one bold, rhyme part, rhyme partners with type.
6. Stats panel with every stat from SPEC section 6; the per-line syllable counts as a small bar list.
7. Legend explaining colours, letters and rhyme types in plain Polish.
8. Responsive down to 360 px, keyboard usable, visible focus, colour never the only signal.

Acceptance:
- Pasting 40 lines updates without visible lag.
- Lint, typecheck, test, build pass; the new version is live on Vercel.

Marcin checks:
- His own 16 lines on desktop and in phone view (DevTools device toolbar).
- Tabs through words with the keyboard only; tooltips appear.
- Turns on a greyscale filter (DevTools rendering panel, "emulate vision deficiencies") and checks families are still distinguishable by letters.

---

## Phase 5 - Quality and presentation

**Goal:** numbers that prove the tool works, and a README that explains it in one minute.

Work:
1. Complete `eval/poems/` to 5-8 public-domain fragments with expected schemes (Marcin confirms each scheme).
2. `scripts/eval.ts` (`npm run eval`): the metrics from SPEC section 7, a confusion table for rhyme types, the list of failures; writes `eval/results.md` with the date.
3. Run it, save the baseline in the DEVLOG, pick the weakest metric, propose 2-3 fixes, apply one, re-run, record before and after.
4. `README.md` in English with a 2-3 sentence summary in Polish at the top: what it is (one line, demo link, screenshot or GIF), features, how it works (the mermaid diagram and the phonetic rules in short), quality (metrics table from `eval/results.md`), limitations (approximate pronunciation, no cross-word assimilation, loanwords), how it was built with AI (Claude Code workflow, what Marcin verified by hand, 2-3 real bugs from the DEVLOG), run locally.
5. Badges: CI status, live demo link. Final cleanup: unused code and dependencies, commands table current.

Acceptance:
- `eval/results.md` exists with baseline and improved numbers.
- README renders on GitHub and every link works.

Marcin checks:
- Records a 20-30 second GIF: paste a verse, colours appear, toggle phonetics, hover a word (ScreenToGif on Windows).
- Sets the repo description, topics (react, typescript, nlp, phonetics, polish, rap, poetry) and the demo URL in GitHub's "About" box; pins the repo on his profile.
- Asks a friend to open the demo cold and say what it does.
