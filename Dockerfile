# Docker validation is intentionally deferred for this M1-safe local Solidity tranche.
# The native validation lane uses Homebrew solc plus local Node on macOS.
FROM alpine:3.20
CMD ["sh", "-c", "echo 'Docker validation deferred for solidity-stakeholder'; exit 1"]
