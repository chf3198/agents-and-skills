/**
 * tests/scripts/validate-skills.test.js
 *
 * Tests the validate-skills.js script logic by running it against the
 * live skills/ directory. Verifies exit code 0 (all valid).
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const VALIDATE_SCRIPT = join(__dirname, '../../scripts/validate-skills.js');

describe('validate-skills script', () => {
  it('exits 0 for the current skills/ directory', () => {
    let exitCode = 0;
    try {
      execFileSync('node', [VALIDATE_SCRIPT], { encoding: 'utf8' });
    } catch (err) {
      exitCode = err.status ?? 1;
      console.error('validate-skills output:\n', err.stdout, err.stderr);
    }
    assert.equal(exitCode, 0, 'validate-skills must exit 0 for the shipped skills');
  });
});
