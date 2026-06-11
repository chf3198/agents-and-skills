---
name: skill-creator
description: >
  Generate a new, complete agent skill directory from a plain-English description.
  Produces a valid SKILL.md with frontmatter, scripts, and references following
  the agentskills.io specification. Use when asked to "create a new skill",
  "add a skill for X", or "build a skill that does Y".
license: Apache-2.0
compatibility: Compatible with Claude Code, GitHub Copilot, and any AGENTS.md-aware agent
metadata:
  author: interview2
  version: "1.0"
allowed-tools: Write Read Bash(npm run validate:skills:*)
---

# Skill Creator

## Purpose

Bootstrap a new agent skill from scratch: gather requirements, generate the
directory structure, write a valid `SKILL.md`, create helper scripts if needed,
and validate the result — all in one workflow.

## When to Use

- "Create a skill that does X"
- "Build a skill for Y workflow"
- "I need a new skill for Z"
- When no existing skill in `skills/` covers the task

## Steps

### Step 1 — Gather Requirements

Determine (ask if not provided):
1. **What does the skill do?** → becomes the body
2. **When should it trigger?** → keywords for the `description` field
3. **Does it need helper scripts?** → yes/no for `scripts/` directory
4. **What tools does it need?** → `allowed-tools` field
5. **Any environment requirements?** → `compatibility` field

### Step 2 — Derive Skill Name

- Use the task noun + action verb in kebab-case
- Examples: `pdf-extraction`, `code-review`, `git-workflow`, `doc-writer`
- Validate: `^[a-z0-9][a-z0-9-]*[a-z0-9]$`, max 64 chars, no `--`

### Step 3 — Create Directory Structure

```
skills/<skill-name>/
├── SKILL.md           ← always
├── scripts/           ← if automation is needed
│   └── run.sh|py|js
└── references/        ← if reference docs are needed
    └── REFERENCE.md
```

### Step 4 — Write SKILL.md

Use this canonical template:

```markdown
---
name: <skill-name>
description: >
  <1-2 sentences: what it does + trigger keywords for auto-detection>
license: Apache-2.0
metadata:
  author: <org-or-username>
  version: "1.0"
---

# <Skill Title>

## Purpose
<One paragraph: what this skill accomplishes and why it matters>

## When to Use
- <Trigger condition with specific keywords>
- <Another trigger>
- <Edge case trigger>

## Steps
1. <Step 1 — verb-first>
2. <Step 2>
3. <Step 3>

## Output Format
<What the agent produces: structured markdown block, file, command output, etc.>

## Examples
**Input:** <example request>
**Output:** <expected result>

## References
- See [REFERENCE.md](references/REFERENCE.md) for detailed spec  (if applicable)
```

### Step 5 — Write Helper Script (if needed)

Keep scripts self-contained. Template:

```bash
#!/usr/bin/env bash
set -euo pipefail

# <script-name>.sh — <one-line purpose>
# Usage: ./scripts/<script-name>.sh [args]

SKILL_ROOT="$(cd "$(dirname "$0")/.." && pwd)"

main() {
  local input="${1:?Usage: $0 <input>}"
  # ... implementation
  echo "Done."
}

main "$@"
```

### Step 6 — Validate

```bash
npm run validate:skills
```

Fix any errors before completing.

### Step 7 — Add Smoke Test

Create `tests/skills/<skill-name>.test.js` using the `test-generator` skill's
smoke test template.

## Examples

**Input:** "Create a skill for generating database migration files"
**Output:** `skills/db-migration/` with `SKILL.md` covering migration naming,
up/down templates, and rollback guidance

**Input:** "I need a skill for Slack message formatting"
**Output:** `skills/slack-formatter/` with `SKILL.md` covering block kit
structure, character limits, and link formatting

## References

- [Agent Skills Specification](https://agentskills.io/specification)
- [Anthropic Skills Repository](https://github.com/anthropics/skills)
