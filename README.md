> [!WARNING]
> This repository is AI-assisted and manually reviewed. It is local-only in the resource-safe small deterministic tranche.

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
- `make compiler-proof`
- `make test`
- `make build && node bin/stakeholder.mjs --list-values`

Docker is intentionally not used in this M1-safe pass; native `solc` plus Node execution is the validation lane.
