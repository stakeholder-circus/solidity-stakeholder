#!/usr/bin/env node
import fs from 'node:fs';
const catalog = JSON.parse(fs.readFileSync(new URL('../catalog.json', import.meta.url), 'utf8'));
function normalizeFamily(value) { return value.toLowerCase().replaceAll('-', '_'); }
function hashText(value) { let hash = 2166136261 >>> 0; for (const ch of Buffer.from(value)) hash = Math.imul(hash, 16777619) + ch >>> 0; return hash >>> 0; }
function pad2(value) { return value < 10 ? `0${value}` : `${value}`; }
function findFamily(value) { const normalized = normalizeFamily(value); return catalog.families.find((family) => family.id === normalized || family.registryId === value); }
function fail(message) { process.stderr.write(`${message}\n`); process.exit(2); }
function payload(family, seed, outputFormat) {
  const hash = hashText(`${seed}::${family.id}`);
  const seconds = hash % 86400;
  const timestamp = `2026-01-01T${pad2(Math.floor(seconds / 3600))}:${pad2(Math.floor((seconds % 3600) / 60))}:${pad2(seconds % 60)}Z`;
  const sequence = 1000 + (hash % 9000);
  if (outputFormat === 'json') {
    return JSON.stringify({eventType:'stakeholder.generator.output',sequence,family:family.id,message:`Deterministic solidity tranche for ${family.id}`,timestamp,context:{rendererKey:family.rendererKey,[family.contextKey]:family.contextValue,seedFingerprint:`${family.registryId}-${hash.toString(16)}`,tranche:family.tranche,solidityProfile:'solc-compiled-contract-catalog'},generationProvenance:{sourceRepo:'solidity-stakeholder',baseline:'local-small-tranche-family-focus',experimental:false,adapterType:'compiled-contract-catalog',promptVersion:null},outputFormat:'json'});
  }
  return `family: ${family.id}\nrenderer: ${family.rendererKey}\ntranche: ${family.tranche}\nsequence: ${sequence}\ntimestamp: ${timestamp}\nmessage: Deterministic solidity tranche for ${family.id}`;
}
let focusFamily = '', seed = 'default-seed', outputFormat = 'text', listValues = false;
const args = process.argv.slice(2);
for (let i = 0; i < args.length;) {
  const arg = args[i];
  if (arg === '--list-values') { listValues = true; i++; }
  else if (arg === '--focus-family') { if (i + 1 >= args.length) fail('missing value for --focus-family'); focusFamily = args[i + 1]; i += 2; }
  else if (arg === '--seed') { if (i + 1 >= args.length) fail('missing value for --seed'); seed = args[i + 1]; i += 2; }
  else if (arg === '--output-format') { if (i + 1 >= args.length) fail('missing value for --output-format'); const candidate = args[i + 1]; if (candidate !== 'text' && candidate !== 'json') fail(`invalid --output-format: ${candidate}`); outputFormat = candidate; i += 2; }
  else if (arg === '--experimental-provider') { if (i + 1 >= args.length) fail('missing value for --experimental-provider'); fail(`experimental provider is not enabled in the deterministic first tranche: ${args[i + 1]}`); }
  else if (arg.startsWith('--experimental-')) fail('experimental flags require --experimental-provider');
  else fail(`unknown argument: ${arg}`);
}
if (listValues) { process.stdout.write(`${catalog.registry}\n`); process.exit(0); }
if (!focusFamily) fail('focus-family is required and must be a known generator family');
const family = findFamily(focusFamily);
if (!family) fail(`invalid --focus-family: ${focusFamily}`);
process.stdout.write(`${payload(family, seed, outputFormat)}\n`);
