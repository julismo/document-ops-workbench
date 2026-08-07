# Architecture

## Purpose

Document Ops Workbench is a local-only React demonstration of three business-operation patterns: document review, quote calculation, and finance summaries. It uses synthetic fixtures and does not connect to services or retain data.

## Boundaries

```text
Synthetic fixture or local form input
  -> pure domain rule
  -> React feature panel
  -> visible result and local UI state
```

| Area | Responsibility | Dependencies |
| --- | --- | --- |
| `src/domain` | Types, normalization, calculations, confidence rules, and finance summaries | TypeScript only; no React, browser, database, API, or environment access |
| `src/fixtures` | Synthetic document, quote, and ledger scenarios | Domain types |
| `src/features` | Form handling, validation messages, and presentation of domain results | React and domain modules |
| `src/app` | Page composition and workspace navigation | Feature panels and fixtures |
| `src/test` and `*.test.tsx` | Test setup and behavior checks | Vitest and Testing Library |

## Flow behavior

- **Document review:** normalizes supplied fields, records only an explicit in-memory correction, and makes uncertainty visible in its rationale and confidence score.
- **Quote builder:** produces deterministic line items and retains the calculated result when a manual override is applied.
- **Finance lens:** calculates realized values independently from pipeline and pending-action entries.

## State and privacy

React `useState` holds form edits and validation feedback during the current page session. The application does not use a backend, authentication, browser persistence, uploads, network calls, analytics, external APIs, or environment configuration. Refreshing the browser restores the fixture scenarios.

## Verification design

Domain tests exercise the pure rules directly. Feature and application tests exercise the three visible flows. Continuous integration runs linting, TypeScript checks, tests, and a production build using the locked npm dependency graph.
