# AGENTS.md

Guidance for autonomous coding agents working in this repository.

## Project Snapshot

- Stack: Vue 3 + TypeScript + Vite + Pinia + Tailwind CSS.
- Package manager: Yarn is preferred (`yarn.lock` is present).
- App purpose: browser new-tab page with terminal-style command input and link categories.
- Entry point: `src/main.ts`.
- Main view: `src/views/Index.vue`.
- Terminal command system: `src/scripts/terminal.ts` + `src/scripts/commands/*.ts`.
- State management: Pinia stores in `src/store/` with localStorage persistence.

## Cursor / Copilot Rules

- No Cursor rules were found in `.cursor/rules/` or `.cursorrules`.
- No GitHub Copilot rules were found in `.github/copilot-instructions.md`.
- Treat this file as the primary in-repo instructions for coding agents.

## Setup Commands

- Install dependencies: `yarn install`
- Start dev server: `yarn dev`
- Build for production: `yarn build`
- Preview production build: `yarn preview`
- Enable git hooks after install (auto-run via prepare): `yarn prepare`

## Build / Lint / Test Commands

### Build

- Full build (includes type-check): `yarn build`
- What it runs: `vue-tsc --noEmit && vite build`
- Use this as the main CI-style verification command.

### Lint / Formatting

- There is no ESLint configuration in this repository.
- Formatting is enforced through Prettier via `lint-staged` in pre-commit hook.
- Pre-commit hook executes: `npx lint-staged`
- lint-staged config executes: `prettier --write --ignore-unknown` on staged files.
- Format all tracked source files manually (safe default):
  - `npx prettier --write .`
- Check formatting without writing changes:
  - `npx prettier --check .`
- Format one file:
  - `npx prettier --write src/store/category.ts`

### Tests

- No test framework is currently configured.
- `package.json` has no `test` script.
- There are no committed `*.test.*` / `*.spec.*` files at the time of writing.
- Single-test command: not applicable right now.
- If tests are added later, prefer exposing both:
  - `yarn test` (full suite)
  - `yarn test path/to/file.test.ts -t "test name"` (single test)

## Recommended Verification Sequence for Agents

- For any code change, a successful `yarn build` is required before considering the task complete.
- For code changes, run formatting first: `npx prettier --write .` (or changed files).
- Then run type/build check: `yarn build`.
- If you changed only docs/markdown, build is optional.
- Since no tests exist, treat successful build as primary correctness gate.

## Codebase Architecture Notes

- `src/main.ts` wires app creation, router, Pinia, and global CSS.
- Routing is simple and currently centered around `/` in `src/router/index.ts`.
- `src/store/index.ts` persists Pinia state into `localStorage` under `piniaState`.
- `src/store/category.ts` owns categorized links and category CRUD behavior.
- `src/store/terminal.ts` owns terminal prompt state/history and command submission flow.
- `src/scripts/terminal.ts` parses command/subcommand and dispatches command handlers.
- Command handlers are plain exported objects in `src/scripts/commands/*.ts`.
- UI is implemented with Vue SFCs under `src/components/`, `src/layouts/`, `src/views/`.

## Style Guidelines

### Language and Framework

- Use TypeScript for all new logic under `src/`.
- Use Vue 3 Composition API and `<script setup lang="ts">` in SFCs.
- Keep component logic small and move reusable logic to `src/composables/`.

### Imports

- Prefer external packages first, then internal imports.
- Prefer `@/` alias for `src` paths where it already exists in the file.
- If a file already uses relative imports, keep style consistent inside that file.
- Avoid mixing default and named imports unless needed by module exports.
- Keep one import per line (current convention).

### Formatting

- Prettier is the source of truth for formatting.
- Current formatting reflects Prettier defaults (double quotes, semicolons, trailing commas).
- Do not hand-format against Prettier output.
- Keep files Prettier-clean to avoid pre-commit churn.

### TypeScript and Types

- `tsconfig.json` has `strict: true`; preserve type safety when editing.
- `noImplicitAny` is currently `false`, but avoid introducing new implicit `any`.
- Prefer explicit parameter and return types for exported functions and store actions.
- Use narrow object shapes/types instead of `{}` or overly broad records.
- Reuse shared types when command/store contracts repeat.

### Naming Conventions

- Vue components: PascalCase filenames (e.g., `LinkTree.vue`, `Terminal.vue`).
- Stores/composables: camelCase file names, exported `useXStore` / `useX` functions.
- Variables/functions: camelCase.
- Types/interfaces: PascalCase.
- Command identifiers exposed to terminal input should remain lowercase.

### Store and State Patterns

- Keep Pinia state serializable (it is persisted to `localStorage`).
- Add state mutations through store actions instead of ad-hoc direct writes.
- When reading persisted state, guard for missing keys with optional chaining/defaults.
- Maintain backward compatibility of persisted state shape when possible.

### Command System Conventions

- Command modules should export an object with:
  - `action(query, subcommand?)`
  - `description`
  - `subcommands`
- Keep command side effects inside `action`.
- Validate input early and return quickly on invalid usage.
- Keep parsing behavior aligned with `parseCommand`/`parseSubcommand` semantics.

### Error Handling and Logging

- Prefer explicit guards and early returns over deep nesting.
- For user-input parsing (JSON, command args), wrap unsafe operations in `try/catch`.
- Avoid noisy `console.log` in stable paths; use it only for temporary debugging.
- For user-facing failures, prefer a path that can be surfaced in terminal UI state.

### Vue Template and UI Patterns

- Favor declarative bindings (`v-if`, `v-for`, `v-model`) over manual DOM ops.
- Keep templates readable; extract repeated logic into computed/store helpers when needed.
- When adding list rendering, provide stable keys where practical.
- Preserve existing Tailwind + Gruvbox visual language unless task requires redesign.

### CSS / Tailwind

- Use Tailwind utility classes as the default styling approach.
- Reuse configured theme colors (`gruvbox-dark-*`) instead of introducing arbitrary hex values.
- Keep global CSS minimal; prefer scoped component styles or utility classes.

## Operational Guidance for Agents

- Make focused, minimal diffs that follow nearby patterns.
- Do not introduce new tooling (ESLint, test runner, formatter plugins) unless requested.
- If adding scripts, update `package.json` and this file in the same change.
- If adding tests in the future, document exact single-test command here.
- If Cursor/Copilot rule files are added later, update this file to mirror them.

<!-- BEGIN BEADS INTEGRATION v:1 profile:minimal hash:ca08a54f -->
## Beads Issue Tracker

This project uses **bd (beads)** for issue tracking. Run `bd prime` to see full workflow context and commands.

### Quick Reference

```bash
bd ready              # Find available work
bd show <id>          # View issue details
bd update <id> --claim  # Claim work
bd close <id>         # Complete work
```

### Rules

- Use `bd` for ALL task tracking — do NOT use TodoWrite, TaskCreate, or markdown TODO lists
- Run `bd prime` for detailed command reference and session close protocol
- Use `bd remember` for persistent knowledge — do NOT use MEMORY.md files

## Session Completion

**When ending a work session**, you MUST complete ALL steps below. Work is NOT complete until `git push` succeeds.

**MANDATORY WORKFLOW:**

1. **File issues for remaining work** - Create issues for anything that needs follow-up
2. **Run quality gates** (if code changed) - Tests, linters, builds
3. **Update issue status** - Close finished work, update in-progress items
4. **PUSH TO REMOTE** - This is MANDATORY:
   ```bash
   git pull --rebase
   bd dolt push
   git push
   git status  # MUST show "up to date with origin"
   ```
5. **Clean up** - Clear stashes, prune remote branches
6. **Verify** - All changes committed AND pushed
7. **Hand off** - Provide context for next session

**CRITICAL RULES:**
- Work is NOT complete until `git push` succeeds
- NEVER stop before pushing - that leaves work stranded locally
- NEVER say "ready to push when you are" - YOU must push
- If push fails, resolve and retry until it succeeds
<!-- END BEADS INTEGRATION -->
