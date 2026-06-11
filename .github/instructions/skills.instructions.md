---
applyTo: "skills/**"
---

# Skill Authoring Instructions

When working inside the `skills/` directory, follow these additional rules:

## File Structure (Required)

Every skill directory MUST contain:
- `SKILL.md` — YAML frontmatter + instructions

Optional but recommended:
- `scripts/` — executable helpers (Python, Bash, JS)
- `references/` — detailed reference docs loaded on demand
- `assets/` — templates, schemas, static resources

## SKILL.md Frontmatter Spec

```yaml
---
name: skill-name           # required; lowercase-hyphenated; matches dir name
description: >             # required; what it does + when to invoke it
  One or two sentences. Include specific keywords for agent auto-detection.
license: Apache-2.0        # optional
compatibility: >           # optional; only if env requirements exist
  Requires Node.js 20+
metadata:                  # optional
  author: your-org
  version: "1.0"
allowed-tools: Bash(git:*) Read  # optional; space-separated pre-approved tools
---
```

## Body Content Guidelines

- Lead with a `## Purpose` section (one paragraph max)
- Follow with `## When to Use` (bulleted trigger conditions)
- Add `## Steps` or `## Workflow` for procedural skills
- Add `## Examples` with concrete input/output pairs
- Keep total body under 500 lines
- For long reference material, link to `references/REFERENCE.md`

## Validation

Run `npm run validate:skills` after every SKILL.md edit.
This checks frontmatter validity, name format, and body length.
