# Toolchain

Solidity native validation uses Homebrew `solidity` plus an existing local Node runtime for CLI execution.

## Proven commands

- `solc --version`
- `node --version`
- `solc --abi --bin contracts/StakeholderCatalog.sol -o build --overwrite`
- `make compiler-proof`
- `make test`

Toolchain source: Homebrew bottled `solidity` 0.8.35; required Boost and Z3 dependencies were already present. Docker, Nix, npm packages, and EVM execution are not required for the current deterministic first tranche.
