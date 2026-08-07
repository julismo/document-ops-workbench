# Document Ops Workbench and GitHub Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a secure, English-first public portfolio showcase and curate the `julismo` GitHub profile around it.

**Architecture:** A local-only Vite + React + TypeScript workbench holds pure domain rules separately from synthetic fixtures and UI panels. GitHub presentation work happens only after the showcase has passed local quality, provenance, and security gates.

**Tech Stack:** Vite, React, TypeScript, Tailwind CSS, Vitest, React Testing Library, GitHub Actions.

## Global Constraints

- Never copy Suite Trion Scale source, tests, commits, customer names, domains, secrets, or data; independently implement generic behavior from the approved design.
- All product text, repository metadata, README content, and UI copy are English.
- The application is local-only: no auth, backend, network requests, analytics, stored uploads, external APIs, or real `.env` file.
- Domain functions have no React, browser, database, API, or environment dependencies.
- Use synthetic fixtures only; all mutable demo state resets on browser refresh.
- Do not push any repository public until local checks, security/provenance scans, and CI pass.

---

### Task 1: Bootstrap the isolated showcase application

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `src/main.tsx`, `src/styles.css`, `src/app/App.tsx`, `src/test/setup.ts`, `src/app/App.test.tsx`
- Modify: `.gitignore`

**Interfaces:**
- Produces an `App` component that renders the product title, the local-only notice, and navigation placeholders for `Document review`, `Quote builder`, and `Finance lens`.
- Provides package commands `dev`, `build`, `lint`, `typecheck`, and `test`.

- [ ] Create the Vite React TypeScript project with Tailwind and Vitest/Testing Library configured.
- [ ] Write `src/app/App.test.tsx` first; it must expect the title `Document Ops Workbench` and the three navigation labels.
- [ ] Run the focused test and record the expected red failure before `App` exists.
- [ ] Implement the minimal application shell, accessibility landmarks, and responsive base styles.
- [ ] Run the focused test, then `npm run lint`, `npm run typecheck`, `npm run test`, and `npm run build`.
- [ ] Commit with `chore: bootstrap document ops workbench`.

### Task 2: Implement pure document, quote, and finance domain rules

**Files:**
- Create: `src/domain/documents.ts`, `src/domain/quotes.ts`, `src/domain/finance.ts`, `src/domain/documents.test.ts`, `src/domain/quotes.test.ts`, `src/domain/finance.test.ts`

**Interfaces:**
- `reviewDocument(input)` returns normalized fields, a financial direction (`income`, `expense`, or `unknown`), a numeric confidence score, rationale strings, and explicit changed-field records.
- `calculateQuote(input)` returns calculation line items, calculated total, optional manual override, and a `finalTotal` that exposes the override rather than replacing the calculated total silently.
- `summarizeFinance(entries)` returns realized income, realized expense, realized balance, pipeline amount, pending-action count, and trend insight strings.

- [ ] Write one failing unit test per public function for a normal flow before implementing it.
- [ ] Add failing edge-case tests for missing tax identifiers, ambiguous financial direction, manual quote override, and pipeline amounts that must not affect realized balance.
- [ ] Implement the smallest pure functions that make each test green; avoid third-party dependencies and Suite imports.
- [ ] Run the three domain test files together, then the full quality command set.
- [ ] Commit with `feat: add transparent operations domain rules`.

### Task 3: Build the three interactive showcase flows

**Files:**
- Create: `src/fixtures/scenarios.ts`, `src/features/document-review/DocumentReviewPanel.tsx`, `src/features/quote-builder/QuoteBuilderPanel.tsx`, `src/features/finance-lens/FinanceLensPanel.tsx`, `src/features/workbench.test.tsx`
- Modify: `src/app/App.tsx`, `src/styles.css`

**Interfaces:**
- `DocumentReviewPanel` accepts a synthetic document scenario and displays normalized values, rationale, confidence, and a human correction diff.
- `QuoteBuilderPanel` accepts generic quantity, distance, duration, and rate inputs; it renders all calculation line items and marks an override.
- `FinanceLensPanel` accepts synthetic ledger entries and shows realized cash flow, separate pipeline, pending actions, and insight cards.

- [ ] Write three failing interaction tests: correcting a document field updates the diff, applying a quote override retains the calculated total, and finance UI keeps pipeline outside realized balance.
- [ ] Build synthetic scenarios with generic names and no real identifiers.
- [ ] Implement panels with keyboard-accessible controls, visible error/recovery states for invalid form values, and responsive layout.
- [ ] Wire the panels into the app shell without network requests or persistence.
- [ ] Run focused interaction tests, all unit tests, lint, typecheck, and build.
- [ ] Commit with `feat: add interactive operations showcase flows`.

### Task 4: Add release-grade documentation, CI, and security controls

**Files:**
- Create: `README.md`, `ARCHITECTURE.md`, `SECURITY.md`, `LICENSE`, `.github/workflows/ci.yml`, `.github/dependabot.yml`
- Modify: `package.json`, `.gitignore`

**Interfaces:**
- CI runs `npm run lint`, `npm run typecheck`, `npm run test`, and `npm run build` on pull requests and pushes to `main`.
- README explains the product problem, the three flows, synthetic-data boundary, architecture, local setup, quality commands, and project trade-offs.

- [ ] Add the MIT license only after confirming all source files are independently authored in this repository.
- [ ] Write English documentation that lets a reviewer understand the project within two minutes.
- [ ] Configure CI and Dependabot without committing any secret or deployment configuration.
- [ ] Run a local identifier scan for Suite/client terms and a secret scan; resolve every finding before commit.
- [ ] Run the full quality command set and commit with `docs: prepare showcase for release`.

### Task 5: Publish the verified showcase safely

**Files:**
- Modify: GitHub repository settings for `julismo/document-ops-workbench`

**Interfaces:**
- The repository begins private and is made public only after all gates pass.
- Public metadata is exactly:
  - Description: `A local-first TypeScript workbench for transparent document review, deterministic quoting, and cash-flow insights.`
  - Topics: `typescript`, `react`, `vite`, `vitest`, `business-automation`, `document-processing`.

- [ ] Verify `gh auth status` is authenticated as `julismo`.
- [ ] Create the GitHub repository privately, set the remote, push `main` and the feature branch, and verify the remote commit.
- [ ] Enable available Dependabot alerts, secret scanning, push protection, and code scanning for the repository.
- [ ] Review the GitHub Actions result; fix any failed check before release.
- [ ] Make the repository public, set metadata, and verify its public visibility, README, topics, and CI status.

### Task 6: Migrate and polish the public profile

**Files:**
- Create: fresh public `julismo/julismo` repository with root `README.md`
- Modify: GitHub profile fields, repository pins, and `julismo/Trion-Site` metadata

**Interfaces:**
- Profile bio: `Building reliable AI-assisted operations software.`
- Profile README links only to `document-ops-workbench` and `Trion-Site`, explains the three engineering focus areas, and has one contact link.
- Initial pins, in order: `document-ops-workbench`, `Trion-Site`.

- [ ] Rename the existing private `julismo/julismo` repository to `julismo-profile-private-archive`; verify it stays private.
- [ ] Create a fresh public `julismo/julismo` repository and add the English profile README without copying private history.
- [ ] Set the bio and company `Trion Scale`; leave location blank and set a website only after its HTTPS endpoint is confirmed.
- [ ] Update `Trion-Site` with an English description and relevant topics; do not add a license without company authorization.
- [ ] Pin the two verified projects and confirm that the profile README renders publicly.

### Task 7: Contain exposed legacy repositories

**Files:**
- Modify: GitHub visibility and metadata for legacy repositories

**Interfaces:**
- `client-sim-mate` and `Pricing-Money-Masters` are private only after their exposed credentials are revoked or rotated.
- `val-r-ia-`, `Voice_AI_System`, `Tratamento-de-Erros---Python`, `Bento_Jesus_Caraca-Frontend`, and `bento-jesus-caraca-website` are private.
- `Trion-Site`, `document-ops-workbench`, and `julismo` remain the only public portfolio-facing repositories.

- [ ] Identify the provider and rotation owner for each non-empty sensitive variable in the two exposed `.env` files without exposing values in logs.
- [ ] Revoke or rotate every affected credential, record only completion state, then make the two repositories private.
- [ ] Make the five uncurated repositories private and verify their visibility individually.
- [ ] Re-list public repositories and verify the final public surface exactly matches the interface above.
