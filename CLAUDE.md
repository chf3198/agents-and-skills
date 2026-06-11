# CLAUDE.md — Claude Code Project Configuration

> This file is loaded automatically by Claude Code when opening this repository.
> It provides project-specific guidance for the Claude Code agent.

---

## Project Overview

This is an **agents-and-skills reference repository** designed to demonstrate
best practices for defining reusable AI agent skills compatible with Claude Code
and GitHub Copilot. Use the skills in `skills/` to extend your capabilities.

---

## Essential Commands

```bash
npm install              # Bootstrap project
npm test                 # Run all tests
npm run validate:skills  # Validate all SKILL.md files
npm run lint:md          # Lint all markdown
npm run index:skills     # Regenerate skills/INDEX.md
npm run scan:secrets     # Pre-commit secret scan
```

---

## Skills Usage

To use a skill from this repository in Claude Code:

1. Register this repo as a plugin marketplace:
   ```
   /plugin marketplace add <your-github-username>/interview2
   ```
2. Browse and install: `/plugin install example-skills@<your-github-username>`
3. Or copy skills directly to `~/.claude/skills/<skill-name>/`

---

## Repository Conventions

- **One skill per directory** under `skills/`
- Each skill directory must contain a `SKILL.md` with valid YAML frontmatter
- Optional subdirectories: `scripts/`, `references/`, `assets/`
- Agent role definitions live in `agents/`
- Path-specific Copilot instructions live in `.github/instructions/`

---

## Sensitive Files

- `.env` — never committed; loaded from neighboring repos at bootstrap
- `.claude/settings.json` — controls tool permissions; review before sharing
- `scripts/scan-secrets.sh` — run before every commit

---

## Testing

Tests live in `tests/`. Each test file matches its subject:
- `skills/code-review/SKILL.md` → `tests/skills/code-review.test.js`

Run with `npm test`. Integration tests require a valid `.env`.

---

## Key Architecture Decisions

See `docs/architecture.md` for the full rationale. Summary:
- Skills use the `agentskills.io` specification (v1, 2025)
- Agent roles follow the baton-handoff protocol (Manager → Collaborator → Admin → Consultant)
- Instructions are layered: `AGENTS.md` > `.github/copilot-instructions.md` > path-specific `.instructions.md`
- All credentials are injected via `.env`; never hardcoded
