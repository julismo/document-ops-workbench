# Document Ops Workbench

A local-first TypeScript workbench for exploring transparent document review, deterministic quoting, and cash-flow insights.

This portfolio project models three small back-office workflows with readable, testable rules. It is a demonstration, not a production accounting system, document-processing service, or hosted application.

## What it demonstrates

### Document review

The document review flow normalizes fields from a synthetic sample, explains the inferred financial direction and confidence, and records an explicit human correction. A missing tax identifier or ambiguous direction lowers confidence and is surfaced for review.

### Quote builder

The quote builder calculates a line-by-line total from quantity, distance, duration, and rates. When a user supplies a manual total, the calculated total remains visible and the override is clearly labeled.

### Finance lens

The finance lens summarizes a synthetic ledger into realized income, realized expense, realized balance, pipeline amount, and pending actions. Pipeline values are intentionally kept out of the realized balance.

## Local-only and synthetic-data boundary

All initial scenarios are synthetic. The application has no authentication, backend, uploads, network requests, analytics, external APIs, or persistent browser storage. Interactions exist only in React component state and reset when the page is refreshed.

Do not use this demo for real customer, financial, or personal data.

## Architecture

The domain functions in [`src/domain`](src/domain) are framework-independent TypeScript: they normalize review input, calculate quotes, and summarize finance entries. [`src/fixtures`](src/fixtures) contains the synthetic scenarios. React panels in [`src/features`](src/features) turn local form input and fixtures into visible results, while [`src/app`](src/app) composes the three flows.

See [ARCHITECTURE.md](ARCHITECTURE.md) for boundaries and data flow.

## Run locally

Requirements: Node.js 24 and npm.

```bash
npm ci
npm run dev
```

Vite prints the local address to open in a browser. No configuration file or environment variables are required.

## Quality checks

Run the same checks used by continuous integration:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

## Deliberate trade-offs

- Rules are small and deterministic so a reviewer can inspect the business logic directly.
- The demo favors transparent calculations and human review over automated decisions.
- The finance view separates confirmed and pipeline amounts, but it does not implement accounting, taxes, currencies, persistence, or reporting exports.
- Local-only state keeps the project safe to explore, but it is not a collaboration or record-keeping tool.

## Security and license

Read [SECURITY.md](SECURITY.md) for the project’s security boundary. The repository is available under the [MIT License](LICENSE).
