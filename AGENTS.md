# AGENTS.md — Repository Baseline for AI Agents

> Read by GitHub Copilot coding agent, Copilot CLI, Claude Code, and any
> AGENTS.md-compatible orchestrator. This is the highest-priority context file
> for agentic tasks. Load it before any file edits or plan execution.

---

## 1. Repository Purpose

This repository is a **reference implementation** of an agents-and-skills
project compatible with:

- **GitHub Copilot** (inline, chat, coding agent, Copilot CLI)
- **Claude Code** (Claude Code agent, Claude.ai, Claude API)

It demonstrates the canonical 2026 project structure for defining reusable AI
agent skills, per-agent configurations, and governance wrappers that work
across both runtimes.

---

## 2. Build & Validation Commands

```bash
# Install dependencies
npm install

# Validate all SKILL.md frontmatter
npm run validate:skills

# Lint all markdown files (instructions, prompts, AGENTS.md)
npm run lint:md

# Run the full test suite
npm test

# Run a single test file
npm test -- --testPathPattern=<filename>

# Check for secrets / credential leaks before commit
npm run scan:secrets

# Generate skill index from skills/ directory
npm run index:skills
```

---

## 3. Code Locations

| Path | Contents |
|---|---|
| `skills/` | Agent skill folders — one directory per skill, each with `SKILL.md` |
| `agents/` | Agent role definition files (`*.md`) loaded by orchestrators |
| `.github/copilot-instructions.md` | Repository-wide Copilot instructions |
| `.github/instructions/` | Path-specific Copilot instruction files (`*.instructions.md`) |
| `.github/prompts/` | Reusable prompt templates (`*.prompt.md`) |
| `CLAUDE.md` | Claude Code–specific project configuration |
| `.claude/settings.json` | Claude Code tool permissions and hook configuration |
| `scripts/` | Utility scripts for skill validation, indexing, and deployment |
| `docs/` | Architecture docs, decision records, contribution guides |

---

## 4. Agent Startup Protocol

1. Load `AGENTS.md` (this file) first.
2. Load `.github/copilot-instructions.md` for Copilot context.
3. Load `CLAUDE.md` for Claude Code context.
4. Identify the task type and select the relevant skill from `skills/`.
5. If no existing skill matches, use the `skill-creator` skill to generate one.
6. Validate changes with `npm run validate:skills` before claiming completion.
7. Never commit secrets. Run `npm run scan:secrets` before every commit.

---

## 5. Definition of Done

Before opening any PR:

- [ ] All tests pass: `npm test`
- [ ] No markdown lint errors: `npm run lint:md`
- [ ] All skill frontmatter valid: `npm run validate:skills`
- [ ] No secrets detected: `npm run scan:secrets`
- [ ] `CHANGELOG.md` updated under `[Unreleased]`
- [ ] PR body includes `Refs #N` (linked issue)

---

## 6. Do Not

- Do not modify `package-lock.json` manually.
- Do not add credentials, API keys, or tokens to any file — use `.env` (gitignored).
- Do not add `console.log` statements to production scripts.
- Do not create skills with duplicate `name` fields.
- Do not nest skills more than one level deep inside `skills/`.
- Do not exceed 500 lines in any single `SKILL.md`.
- Do not add uppercase letters or consecutive hyphens to skill `name` fields.

---

## 7. Skill Naming Conventions

Skill directory names and `name` frontmatter must:
- Be lowercase alphanumeric with hyphens only (`a-z`, `0-9`, `-`)
- Match the parent directory name exactly
- Not start or end with a hyphen
- Not contain consecutive hyphens (`--`)
- Be ≤ 64 characters

---

## 8. Agent Role Files

The `agents/` directory contains markdown files that define named agent roles
(e.g., `manager.md`, `collaborator.md`, `reviewer.md`). Orchestrators can
load these role files to assign specific behavior profiles. See `docs/agent-roles.md`
for the role taxonomy and baton-handoff protocol.
