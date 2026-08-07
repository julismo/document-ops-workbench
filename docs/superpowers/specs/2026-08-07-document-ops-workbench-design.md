# Document Ops Workbench — Design Specification

**Status:** Approved for specification and implementation planning on 2026-08-07.

## Purpose

`document-ops-workbench` is a public, self-contained portfolio application
that demonstrates sound TypeScript and product-engineering practices through
three realistic business-operation workflows. It is inspired by problem
patterns explored in Suite Trion Scale, but it must not contain Suite source
history, client names, customer data, credentials, proprietary integrations,
or copied production code.

The project is intended to communicate two things at once:

- to prospective clients, that the author can turn a back-office process into
  a clear, reviewable operational tool; and
- to technical reviewers, that the author can model domain rules, isolate
  business logic, test it, and ship a maintainable user experience.

## Product Scope

The workbench contains three connected but independently understandable
experiences, all powered by synthetic fixture data.

1. **Document review**
   - A user chooses a synthetic invoice-like document.
   - The app normalizes fields, proposes a financial direction, exposes a
     confidence explanation, and compares original and edited values.
   - The user can accept or correct the result. No document leaves the
     browser and no approval is automatic.
2. **Quote calculation**
   - A user provides generic service variables such as distance, quantity,
     duration, and selected rate.
   - A deterministic rules engine returns a transparent price breakdown.
   - A manual override is visibly marked and never silently replaces the
     calculated value.
3. **Finance lens**
   - The app summarizes a synthetic ledger into cash-flow, pending-action,
     and trend insights.
   - Realized amounts and unconfirmed pipeline amounts are always displayed
     separately.

## Explicit Non-Goals

- No real OCR, LLM, Gmail, WhatsApp, Supabase, authentication, payments, or
  external data source.
- No uploads retained on disk, network calls containing user data, analytics,
  or telemetry.
- No ARM, Iberobus, Trion Scale, customer, employee, email, phone, tax, or
  operational identifiers in code, fixtures, screenshots, Git history, or
  documentation.
- No fork and no Git history shared with Suite Trion Scale.
- No claim that the demo is a production accounting system or a live AI agent.

## Architecture

The repository will be a Vite + React + TypeScript application using Tailwind
for presentation and Vitest for unit tests.

```text
src/
  domain/       Pure types, validation, calculations, confidence and insight rules
  fixtures/     Synthetic documents, rates, ledger entries, and scenario data
  features/     Document review, quote calculation, and finance lens controllers
  components/   Reusable presentational components
  app/          Routing, page composition, and local UI state
tests/          Domain and feature-level tests using synthetic fixtures
```

The `domain` layer must have no React, browser, API, database, or environment
dependencies. Feature code converts fixture or UI input into domain calls and
maps validated results into view models. Components receive view models and
callbacks only. This keeps the core rules easy to read and independently test.

### Data Flow

```text
Synthetic fixture or form input
  -> validation and normalization
  -> pure domain calculation or decision
  -> feature view model
  -> React component
  -> explicit human action stored only in local UI state
```

Malformed or incomplete data must produce an explanatory, recoverable UI state
rather than a silent fallback. All fixture mutations remain in memory and a
browser refresh resets the demo.

## Source-Provenance and Security Rules

The Suite is reference material only. The implementation must be independently
written from the documented behavior; it must not copy files, commits, tests,
or snippets verbatim. Before the first public push, the project must pass:

1. a review of every source and fixture file for client names, identifiers,
   domains, emails, telephone numbers, API keys, and secrets;
2. a secret scan with a tool such as Gitleaks, with no unreviewed findings;
3. a Git-history check proving the repository began independently and has no
   remote or commit relationship to Suite Trion Scale; and
4. a provenance check confirming that all published code is authorized for MIT
   licensing.

The initial repository includes `.gitignore`, `SECURITY.md`, `LICENSE` (MIT),
and no real `.env` file. If an environment file becomes necessary later, only
an empty `.env.example` may be committed.

## Quality and Verification

The implementation is complete only when all of the following are true:

- unit tests cover normalization, financial-direction rationale, review diffs,
  quote calculation, override transparency, and finance insight separation;
- a focused interaction test covers each of the three user journeys;
- `npm run lint`, `npm run typecheck`, `npm run test`, and `npm run build`
  pass locally;
- GitHub Actions runs the same four checks for every pull request and default
  branch push;
- the README contains a clear problem statement, GIFs or screenshots,
  architecture, setup, verification commands, design trade-offs, and an
  explicit synthetic-data notice; and
- the repository has a description, social preview, and these topics:
  `typescript`, `react`, `vitest`, `business-automation`,
  `document-processing`, and `portfolio-project`.

## Publication and Profile Plan

1. Keep `Suite-Trion-Scale` private.
2. Create `julismo/document-ops-workbench` as a public repository only after
   the security and provenance gates pass.
3. Keep `Trion-Site` public, then add a concise description, relevant topics,
   a license decision, and a verified project link.
4. Do not expose `Voice_AI_System`, `aluline-design-studio`, or the full Suite
   as raw portfolio code; they contain client-facing or third-party material
   that needs a separate curation review.
5. Rotate credentials before making `client-sim-mate` and
   `Pricing-Money-Masters` private. Making them private limits future public
   access but does not erase prior public history.
6. Treat the current private `julismo/julismo` repository as an archive. Rename
   it to `julismo-profile-private-archive`, retain it privately, then create a
   fresh public `julismo/julismo` repository with only a public-facing profile
   README. Do not change the existing repository directly from private to
   public.
7. Add a concise profile bio and website/company fields, then pin
   `document-ops-workbench` and `Trion-Site`. A third pin is added only after a
   separate project passes the same curation gate.

## Acceptance Criteria for the Public Showcase

- It is visually coherent, interactive, and understandable without setup.
- It demonstrates the three workflows with no live integrations or personal
  data.
- Its codebase has a clean independent Git history, a readable domain layer,
  automated checks, and an explicit license.
- Its public GitHub page explains the business value and engineering choices.
- The GitHub profile directs visitors to the showcase and the Trion site,
  without revealing private historical content.
