# Security Policy

## Project boundary

Document Ops Workbench is a local-only demonstration. It has no deployed service, authentication, backend, data store, uploads, analytics, external APIs, or environment configuration. The included scenarios are synthetic and mutable UI state is discarded on browser refresh.

Do not enter real personal, customer, or financial data into the demo.

## Reporting a concern

Do not include credentials, private data, or exploit details in a public report. If this repository is published and a private reporting channel is available in its repository settings, use that channel. Otherwise, contact the maintainer through a private channel before disclosing details.

## Maintainer controls

- Keep secrets and local environment files out of version control.
- Review source provenance and run a local secret scan before publishing changes.
- Keep dependencies updated through the repository’s Dependabot configuration.
- Run the documented quality checks before release.

This policy describes the repository as it exists locally; it does not promise a hosted security response service or a production uptime commitment.
