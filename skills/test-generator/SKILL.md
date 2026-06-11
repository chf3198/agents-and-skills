---
name: test-generator
description: >
  Generate comprehensive test suites for JavaScript, TypeScript, or Python code.
  Produces unit tests, integration tests, and smoke tests following the project's
  test conventions. Use when asked to write tests, add test coverage, or generate
  a test file for an existing module.
license: Apache-2.0
compatibility: Requires Node.js 20+ (node:test or Jest)
metadata:
  author: interview2
  version: "1.0"
allowed-tools: Read Write Bash(npm test:*) Bash(node:*)
---

# Test Generator

## Purpose

Generate complete, runnable test files that cover happy paths, error cases,
and edge conditions. Tests follow the project's existing conventions and run
with `npm test`.

## When to Use

- "Write tests for this file"
- "Add test coverage to `<module>`"
- "Generate a test suite for the `code-review` skill"
- Before a PR when tests are missing
- When test coverage is below the required floor

## Test Strategy Selection

| Code Type | Recommended Strategy |
|---|---|
| Pure functions / utilities | Unit tests (tdd-pyramid) |
| HTTP handlers / APIs | Integration tests with mocked I/O |
| CLI scripts | Golden-file tests (input → expected output) |
| SKILL.md files | Smoke tests (frontmatter parse + schema validate) |
| Agent role definitions | Peer review (no automated test possible) |

## Steps

### 1. Identify Subject

Read the target file fully before writing any test.
Note: function signatures, side effects, error paths, external dependencies.

### 2. Select Test Framework

- Default: `node:test` (built-in, zero dependencies)
- If Jest is already installed: use Jest
- Never introduce a new test framework without updating `package.json`

### 3. Generate Test File

Test file location: `tests/<module-path>.test.js`
Example: `skills/code-review/SKILL.md` → `tests/skills/code-review.test.js`

### 4. Test Structure Template

```javascript
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

describe('<ModuleName>', () => {
  describe('<functionName>', () => {
    it('returns expected result for happy path', () => {
      // Arrange
      const input = '<valid input>';
      // Act
      const result = <functionName>(input);
      // Assert
      assert.equal(result, '<expected>');
    });

    it('throws on invalid input', () => {
      assert.throws(() => <functionName>(null), { message: /expected error/i });
    });

    it('handles edge case: empty input', () => {
      const result = <functionName>('');
      assert.deepEqual(result, '<expected edge case result>');
    });
  });
});
```

### 5. Skill Smoke Test Template

```javascript
import { readFileSync } from 'node:fs';
import { parse } from 'yaml';
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { join } from 'node:path';

describe('skill: <skill-name>', () => {
  const skillPath = join(import.meta.dirname, '../skills/<skill-name>/SKILL.md');
  
  it('SKILL.md exists and is readable', () => {
    const content = readFileSync(skillPath, 'utf8');
    assert.ok(content.length > 0, 'SKILL.md must not be empty');
  });

  it('frontmatter has required name field', () => {
    const content = readFileSync(skillPath, 'utf8');
    const match = content.match(/^---\n([\s\S]+?)\n---/);
    assert.ok(match, 'Must have YAML frontmatter');
    const fm = parse(match[1]);
    assert.ok(fm.name, 'name is required');
    assert.match(fm.name, /^[a-z0-9][a-z0-9-]*[a-z0-9]$/, 'name must be lowercase-hyphenated');
  });

  it('frontmatter has required description field', () => {
    const content = readFileSync(skillPath, 'utf8');
    const match = content.match(/^---\n([\s\S]+?)\n---/);
    const fm = parse(match[1]);
    assert.ok(fm.description, 'description is required');
    assert.ok(fm.description.length <= 1024, 'description must be ≤ 1024 chars');
  });

  it('body is under 500 lines', () => {
    const content = readFileSync(skillPath, 'utf8');
    const lines = content.split('\n').length;
    assert.ok(lines <= 500, `SKILL.md must be ≤ 500 lines (got ${lines})`);
  });
});
```

### 6. Run and Verify

```bash
npm test
```

Fix any failures before claiming test generation complete.

## Examples

**Input:** "Write tests for `scripts/validate-skills.js`"
**Output:** `tests/scripts/validate-skills.test.js` with unit tests for each exported function

**Input:** "Add smoke tests for the `security-audit` skill"
**Output:** `tests/skills/security-audit.test.js` with frontmatter and body validation
