# Toolchain

Solidity validation uses a repository-local, lockfile-backed `solc` JavaScript compiler and Node host adapter. Authoritative native and Docker gates run on GitHub Actions.

## Proven commands

- `npm ci --ignore-scripts`
- `./node_modules/.bin/solcjs --version`
- `node --version`
- `npm run build`
- `make compiler-proof`
- `make test`

Toolchain sources: committed npm lockfile for `solc 0.8.35`, Node 22 in Docker, GitHub-hosted Node for native CI, and Nix for reproducible workspace discovery. EVM deployment is not part of this deterministic compile-and-adapter tranche.
