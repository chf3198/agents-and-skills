/**
 * tests/skills/all-skills.test.js
 *
 * Smoke tests that run against EVERY skill in skills/.
 * Validates frontmatter compliance with the agentskills.io spec.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse as parseYaml } from 'yaml';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const SKILLS_DIR = join(__dirname, '../../skills');
const FRONTMATTER_RE = /^---\n([\s\S]+?)\n---/;
const NAME_RE = /^[a-z0-9][a-z0-9-]*[a-z0-9]$/;

const skillDirs = readdirSync(SKILLS_DIR).filter(d => {
  const full = join(SKILLS_DIR, d);
  return statSync(full).isDirectory() && d !== 'INDEX.md';
});

assert.ok(skillDirs.length > 0, 'At least one skill must exist in skills/');

for (const dir of skillDirs) {
  describe(`skill: ${dir}`, () => {
    const skillPath = join(SKILLS_DIR, dir, 'SKILL.md');

    it('SKILL.md exists', () => {
      let exists = false;
      try { readFileSync(skillPath); exists = true; } catch { /* noop */ }
      assert.ok(exists, `${skillPath} must exist`);
    });

    it('has valid YAML frontmatter', () => {
      const content = readFileSync(skillPath, 'utf8');
      const match = content.match(FRONTMATTER_RE);
      assert.ok(match, 'SKILL.md must contain --- frontmatter block ---');
    });

    it('has required name field in correct format', () => {
      const content = readFileSync(skillPath, 'utf8');
      const match = content.match(FRONTMATTER_RE);
      if (!match) return; // already caught above
      const fm = parseYaml(match[1]) ?? {};
      assert.ok(fm.name, 'name is required in frontmatter');
      assert.ok(fm.name.length <= 64, `name must be ≤ 64 chars (got ${fm.name.length})`);
      assert.match(fm.name, NAME_RE, `name "${fm.name}" must be lowercase-hyphenated`);
      assert.ok(!fm.name.includes('--'), 'name must not contain consecutive hyphens');
      assert.equal(fm.name, dir, `name "${fm.name}" must match directory name "${dir}"`);
    });

    it('has required description field within length limit', () => {
      const content = readFileSync(skillPath, 'utf8');
      const match = content.match(FRONTMATTER_RE);
      if (!match) return;
      const fm = parseYaml(match[1]) ?? {};
      assert.ok(fm.description, 'description is required in frontmatter');
      const descStr = typeof fm.description === 'string' ? fm.description : String(fm.description);
      assert.ok(descStr.length <= 1024, `description must be ≤ 1024 chars (got ${descStr.length})`);
    });

    it('body is under 500 lines', () => {
      const content = readFileSync(skillPath, 'utf8');
      const lines = content.split('\n').length;
      assert.ok(lines <= 500, `SKILL.md must be ≤ 500 lines (got ${lines})`);
    });
  });
}
