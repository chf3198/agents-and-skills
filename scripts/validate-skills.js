#!/usr/bin/env node
/**
 * validate-skills.js — Validate all SKILL.md files in skills/
 *
 * Checks:
 *   - YAML frontmatter is present and parseable
 *   - Required fields: name, description
 *   - name format: ^[a-z0-9][a-z0-9-]*[a-z0-9]$ max 64 chars, no --
 *   - name matches parent directory name
 *   - description max 1024 chars
 *   - body under 500 lines
 *
 * Exit 0 = all valid, Exit 1 = violations found
 */

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse as parseYaml } from 'yaml';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const SKILLS_DIR = join(__dirname, '../skills');

const NAME_RE = /^[a-z0-9][a-z0-9-]*[a-z0-9]$/;
const FRONTMATTER_RE = /^---\n([\s\S]+?)\n---/;

let errors = 0;

function fail(skillDir, msg) {
  console.error(`  ✗ [${skillDir}] ${msg}`);
  errors++;
}

function pass(skillDir, msg) {
  console.log(`  ✓ [${skillDir}] ${msg}`);
}

const skillDirs = readdirSync(SKILLS_DIR).filter(d => {
  const full = join(SKILLS_DIR, d);
  return statSync(full).isDirectory();
});

if (skillDirs.length === 0) {
  console.log('No skill directories found.');
  process.exit(0);
}

for (const dir of skillDirs) {
  const skillPath = join(SKILLS_DIR, dir, 'SKILL.md');
  let content;
  try {
    content = readFileSync(skillPath, 'utf8');
  } catch {
    fail(dir, 'SKILL.md not found');
    continue;
  }

  const fmMatch = content.match(FRONTMATTER_RE);
  if (!fmMatch) {
    fail(dir, 'Missing YAML frontmatter (--- block)');
    continue;
  }

  let fm;
  try {
    fm = parseYaml(fmMatch[1]) ?? {};
  } catch (e) {
    fail(dir, `YAML parse error: ${e.message}`);
    continue;
  }

  // Required: name
  if (!fm.name) {
    fail(dir, 'Missing required frontmatter field: name');
  } else {
    if (fm.name.length > 64) fail(dir, `name exceeds 64 chars (${fm.name.length})`);
    if (!NAME_RE.test(fm.name)) fail(dir, `name "${fm.name}" must be lowercase-hyphenated (a-z, 0-9, hyphens; no leading/trailing hyphen)`);
    if (fm.name.includes('--')) fail(dir, `name "${fm.name}" must not contain consecutive hyphens`);
    if (fm.name !== dir) fail(dir, `name "${fm.name}" must match directory name "${dir}"`);
    else pass(dir, `name OK: ${fm.name}`);
  }

  // Required: description
  if (!fm.description) {
    fail(dir, 'Missing required frontmatter field: description');
  } else {
    const descLen = fm.description.length;
    if (descLen > 1024) fail(dir, `description exceeds 1024 chars (${descLen})`);
    else pass(dir, `description OK (${descLen} chars)`);
  }

  // Body length
  const lines = content.split('\n').length;
  if (lines > 500) fail(dir, `SKILL.md exceeds 500 lines (${lines})`);
  else pass(dir, `body length OK (${lines} lines)`);
}

console.log(`\n${skillDirs.length} skill(s) checked. ${errors} error(s).`);
process.exit(errors > 0 ? 1 : 0);
