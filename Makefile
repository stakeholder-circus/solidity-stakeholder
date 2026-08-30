NODE ?= node
NPM ?= npm

.PHONY: all compiler-proof build test clean

all: build

compiler-proof:
	./node_modules/.bin/solcjs --version
	$(NODE) --version

build:
	$(NPM) run build

test: build
	NODE=$(NODE) BIN=bin/stakeholder.mjs tests/test_cli.sh

clean:
	rm -rf build
