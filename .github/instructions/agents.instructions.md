---
applyTo: "agents/**"
---

# Agent Role Authoring Instructions

When working inside the `agents/` directory:

## Required Sections in Every Agent Role File

```markdown
# <Role Name>

## Identity
- One-line description of who this agent is and what it owns.

## Responsibilities
- Bulleted list of concrete actions this role takes.

## Handoff Artifacts
- Name and format of the artifact this role produces before passing the baton.

## Entry Conditions
- What must be true before this role activates.

## Exit Conditions
- What must be true before this role hands off.

## Forbidden Actions
- What this role must never do.
```

## Naming Convention

Agent role files use `kebab-case.md`:
- `manager.md` — scope + planning role
- `collaborator.md` — implementation role
- `admin.md` — git/release ops role
- `reviewer.md` — independent critique role

## Cross-Runtime Compatibility

Role files must not reference runtime-specific APIs or tools.
Use abstract verbs: "emit", "post", "validate", "confirm".
Runtime-specific behavior belongs in skill `scripts/` or `.claude/settings.json`.
