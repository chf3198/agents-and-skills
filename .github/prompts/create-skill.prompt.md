---
mode: agent
description: Generate a new agent skill from a plain-English description. Use when you need to create a SKILL.md-based skill directory.
---

# Create New Skill

## Instructions

Generate a new skill directory under `skills/` based on the user's description.

### Step 1 — Gather Requirements

Ask (or infer from context):
1. What does the skill do? (purpose)
2. When should an agent invoke it? (trigger conditions)
3. Does it need scripts, references, or assets?
4. What tools does it require? (for `allowed-tools`)

### Step 2 — Generate Directory Structure

Create the directory at `skills/<skill-name>/` with:

```
skills/<skill-name>/
├── SKILL.md
├── scripts/          (if scripts are needed)
│   └── <main>.sh|py|js
└── references/       (if reference docs are needed)
    └── REFERENCE.md
```

### Step 3 — Write SKILL.md

Use this template:

```markdown
---
name: <skill-name>
description: >
  <What it does and when to invoke it. Include trigger keywords.>
license: Apache-2.0
metadata:
  author: <org>
  version: "1.0"
---

# <Skill Title>

## Purpose
<One paragraph describing what this skill accomplishes.>

## When to Use
- <Trigger condition 1>
- <Trigger condition 2>
- <Trigger condition 3>

## Steps
1. <Step one>
2. <Step two>
3. <Step three>

## Examples
**Input:** <example input>
**Output:** <expected result>

## References
- See [REFERENCE.md](references/REFERENCE.md) for detailed spec.
```

### Step 4 — Validate

Run: `npm run validate:skills`

Fix any frontmatter errors before completing.

### Step 5 — Add Test

Create `tests/skills/<skill-name>.test.js` with at least one smoke test
that verifies the SKILL.md parses correctly.
