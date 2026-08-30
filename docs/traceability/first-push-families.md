# First push families

This local tranche ports the deterministic family-focus contract into a Solidity contract catalog with a Node CLI runner.

| Family group | Solidity path | Source reference | Parity class |
| --- | --- | --- | --- |
| classic-six | `contracts/StakeholderCatalog.sol` | current deterministic CLI family registry and smoke-contract shape | dedicated |
| modern-core | `contracts/StakeholderCatalog.sol` | current deterministic CLI family registry and smoke-contract shape | dedicated |
| later families | `contracts/StakeholderCatalog.sol` | grouped fallback policy in current deterministic repos | grouped fallback |
| CLI contract | `contracts/StakeholderCatalog.sol`, `catalog.json`, `bin/stakeholder.mjs`, `tests/test_cli.sh` | small-tranche smoke contract | deterministic |
| experimental provider | `bin/stakeholder.mjs`, `tests/test_cli.sh` | fail-fast provider policy in current deterministic repos | explicit fail-fast |

Rust and Java remain canonical behavioral anchors; this Solidity contract/adapter tranche is compiler, native, and Docker validated in GitHub Actions.
