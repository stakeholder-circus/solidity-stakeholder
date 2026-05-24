SOLC ?= solc
NODE ?= node

.PHONY: all compiler-proof build test clean

all: build

compiler-proof:
	$(SOLC) --version | sed -n '1,5p'
	$(NODE) --version

build:
	mkdir -p build
	$(SOLC) --abi --bin contracts/StakeholderCatalog.sol -o build --overwrite >/dev/null

test: build
	NODE=$(NODE) BIN=bin/stakeholder.mjs tests/test_cli.sh

clean:
	rm -rf build
