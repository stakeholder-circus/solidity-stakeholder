> [!NOTE]
> This repository is AI-assisted and manually reviewed. Solidity contract behavior is compiler-validated and the deterministic host adapter is validated natively and in Docker.

# solidity-stakeholder

Solidity implementation of the stakeholder deterministic first tranche using a compiled contract catalog and small Node CLI runner.

## Current tranche

- Full dedicated `classic-six + modern-core` generator families.
- Grouped fallback for later generator families.
- Deterministic normalized JSON with same-seed stability.
- `--list-values`, `--focus-family`, `--output-format`, `--seed`, and explicit `--experimental-provider` fail-fast.
- Full live-provider/runtime support remains deferred to the later provider wave.

## Commands

- `python3 scripts/validate_scaffold.py`
- `npm ci --ignore-scripts`
- `make compiler-proof`
- `make test`
- `make build && node bin/stakeholder.mjs --list-values`
- `docker build -t solidity-stakeholder .`
- `docker run --rm solidity-stakeholder --list-values`

GitHub Actions runs the contract, lockfile-backed Solidity compilation, Node adapter tests, Docker, dependency-review, actionlint, SAST, and workflow-security gates.
