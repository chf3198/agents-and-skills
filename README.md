# Agents & Skills

> A reference implementation of the cutting-edge (2026) project structure for
> defining reusable AI agent skills and role configurations, compatible with
> **GitHub Copilot** and **Claude Code**.

[![CI](https://github.com/chf3198/agents-and-skills/actions/workflows/ci.yml/badge.svg)](https://github.com/chf3198/agents-and-skills/actions)
[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D20-brightgreen.svg)](https://nodejs.org/)
[![Skills](https://img.shields.io/badge/skills-6-blueviolet.svg)](skills/INDEX.md)

---

## Table of Contents

1. [What This Repository Does](#what-this-repository-does)
2. [The 2026 Agent Configuration Stack](#the-2026-agent-configuration-stack)
3. [Repository Structure](#repository-structure)
4. [Quick Start](#quick-start)
5. [Skills](#skills)
   - [How Skills Work](#how-skills-work)
   - [Skill Directory](#skill-directory)
   - [Installing Skills](#installing-skills)
   - [Creating a New Skill](#creating-a-new-skill)
6. [Agent Roles](#agent-roles)
   - [Baton-Handoff Protocol](#baton-handoff-protocol)
7. [Configuration Layers Explained](#configuration-layers-explained)
   - [AGENTS.md](#agentsmd)
   - [CLAUDE.md](#claudemd)
   - [.github/copilot-instructions.md](#githubcopilot-instructionsmd)
   - [Path-Specific Instructions](#path-specific-instructions)
   - [Prompt Templates](#prompt-templates)
   - [.claude/settings.json](#claudesettingsjson)
8. [Validation & CI](#validation--ci)
9. [Security](#security)
10. [Environment Variables](#environment-variables)
11. [Contributing](#contributing)
12. [License](#license)

---

## What This Repository Does

This repository is a **living reference** for building AI-augmented development
workflows that work seamlessly across the two dominant agentic runtimes of 2026:

- **GitHub Copilot** — inline suggestions, Copilot Chat, Copilot coding agent, Copilot CLI
- **Claude Code** — Claude Code agent, Claude.ai skills, Claude API

It solves a real problem: most repos sprinkle a `CLAUDE.md` here and a
`copilot-instructions.md` there without a coherent strategy. This repo shows you
the **complete, layered configuration stack** that lets both agents operate at
peak effectiveness — sharing conventions, respecting each other's native formats,
and using reusable skills rather than duplicating instructions everywhere.

The skills themselves are production-grade playbooks for common development
workflows: code review, git delivery, security audits, test generation, skill
authoring, and documentation writing.

---

## The 2026 Agent Configuration Stack

Understanding the priority hierarchy is critical for getting the most out of
both runtimes.

### GitHub Copilot Priority Order

| Priority | Source | Scope | Notes |
|---|---|---|---|
| 1 — Highest | `AGENTS.md` | Repository / directory | Read by Copilot CLI, coding agent, and `@github` in Copilot Chat during agentic tasks |
| 2 | `.github/copilot-instructions.md` | Repository-wide | Applied to every chat request and inline suggestion |
| 3 | `.github/instructions/*.instructions.md` | Path-specific | Applied when Copilot works on matching file paths |
| 4 | `.github/prompts/*.prompt.md` | Per-task | Reusable prompt templates invoked explicitly |
| 5 | Open editor tabs | Session | Copilot scans open files for patterns |
| 6 | Inline comments | Cursor-local | Highest specificity, lowest scope |

### Claude Code Priority Order

| Priority | Source | Scope |
|---|---|---|
| 1 — Highest | `AGENTS.md` (root) | Repository baseline |
| 2 | `CLAUDE.md` | Project-level Claude configuration |
| 3 | `AGENTS.md` (subdirectory) | Nearest ancestor AGENTS.md wins |
| 4 | `.claude/settings.json` | Tool permissions and hooks |
| 5 | Skills loaded from `~/.claude/skills/` | On-demand skill context |

### Key Insight: Complementary, Not Competing

`AGENTS.md` and `CLAUDE.md` are **additive**:
- `AGENTS.md` is the **shared baseline** — read by both runtimes
- `CLAUDE.md` adds **Claude-specific** project configuration (tool permissions, installation commands)
- `.github/copilot-instructions.md` adds **Copilot-specific** style and convention rules
- Skills in `skills/` are the **reusable capability layer** — load once, use everywhere

---

## Repository Structure

```
agents-and-skills/
│
├── AGENTS.md                          ← Shared baseline (both runtimes)
├── CLAUDE.md                          ← Claude Code–specific config
├── CHANGELOG.md
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── LICENSE
├── SECURITY.md
├── SUPPORT.md
├── package.json
├── .env.example                       ← Template; copy to .env (never commit .env)
├── .gitignore
│
├── .github/
│   ├── copilot-instructions.md        ← Copilot repository-wide instructions
│   ├── instructions/                  ← Path-specific Copilot instruction files
│   │   ├── skills.instructions.md     ← Applied when working in skills/
│   │   └── agents.instructions.md    ← Applied when working in agents/
│   └── prompts/                       ← Reusable Copilot prompt templates
│       ├── create-skill.prompt.md
│       └── code-review.prompt.md
│
├── .claude/
│   └── settings.json                  ← Claude Code tool permissions + hooks
│
├── agents/                            ← Agent role definitions
│   ├── manager.md
│   ├── collaborator.md
│   ├── admin.md
│   └── reviewer.md
│
├── skills/                            ← Agent skill directories (agentskills.io spec)
│   ├── INDEX.md                       ← Auto-generated skill table
│   ├── code-review/
│   │   ├── SKILL.md
│   │   └── references/REFERENCE.md
│   ├── git-workflow/
│   │   └── SKILL.md
│   ├── security-audit/
│   │   └── SKILL.md
│   ├── test-generator/
│   │   └── SKILL.md
│   ├── skill-creator/
│   │   └── SKILL.md
│   └── doc-writer/
│       └── SKILL.md
│
├── scripts/
│   ├── validate-skills.js             ← Validates all SKILL.md frontmatter
│   ├── index-skills.js                ← Generates skills/INDEX.md
│   └── scan-secrets.sh                ← Pre-commit secret scan
│
├── tests/
│   ├── skills/
│   │   └── all-skills.test.js         ← Smoke tests for all SKILL.md files
│   └── scripts/
│       └── validate-skills.test.js
│
└── docs/
    └── architecture.md
```

---

## Quick Start

### Prerequisites

- Node.js ≥ 20
- Git
- GitHub CLI (`gh`) — for git-workflow skill
- One of: Claude Code, GitHub Copilot, or any AGENTS.md-compatible agent

### 1. Clone and Install

```bash
git clone https://github.com/chf3198/agents-and-skills.git
cd agents-and-skills
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
# Edit .env and fill in your API keys
```

### 3. Run the Preflight Check

```bash
npm run preflight
```

This runs skill validation, the secret scan, and the full test suite. You
should see all green before making any changes.

### 4. Install Skills for Claude Code

```bash
# Option A: Register as a skill marketplace (recommended)
# Run this inside Claude Code:
/plugin marketplace add chf3198/agents-and-skills

# Option B: Copy skills directly
cp -r skills/code-review ~/.claude/skills/
cp -r skills/git-workflow ~/.claude/skills/
cp -r skills/security-audit ~/.claude/skills/
# ... repeat for any skill you want
```

### 5. Verify Skills Work

In Claude Code, ask:
> "Use the code-review skill to review my last commit"

Or for Copilot Chat:
> "@github Review the changes in my current branch using code review best practices"

---

## Skills

### How Skills Work

A **skill** is a directory containing a `SKILL.md` file — YAML frontmatter
plus Markdown instructions. When an agent decides a skill is relevant (based on
the `description` field's keywords matching the task), it loads the `SKILL.md`
and follows the instructions within it.

The agent's loading behavior follows **progressive disclosure**:

1. **Metadata** (~100 tokens): `name` + `description` are loaded at startup for all skills
2. **Instructions** (<5 000 tokens): the full `SKILL.md` body is loaded when the skill is activated
3. **Resources** (on demand): files in `scripts/`, `references/`, and `assets/` are loaded only when referenced

This means you can have dozens of skills without overwhelming the context window.

### Skill Directory

| Skill | What It Does | When to Invoke |
|---|---|---|
| [`code-review`](skills/code-review/SKILL.md) | Structured code review with OWASP security checklist | "Review this code", "Check my PR", "Audit these changes" |
| [`git-workflow`](skills/git-workflow/SKILL.md) | Full git delivery: branch → commit → PR → merge | "Commit and push", "Create a PR for #N", "Ship this feature" |
| [`security-audit`](skills/security-audit/SKILL.md) | Repository security audit: secrets, vulns, misconfigs | "Audit security", "Scan for secrets", "Harden before release" |
| [`test-generator`](skills/test-generator/SKILL.md) | Generate unit, integration, and smoke tests | "Write tests for X", "Add test coverage", "Generate a test file" |
| [`skill-creator`](skills/skill-creator/SKILL.md) | Bootstrap a new skill directory from description | "Create a skill for X", "Build a skill that does Y" |
| [`doc-writer`](skills/doc-writer/SKILL.md) | Write or update README, CHANGELOG, ADRs, API docs | "Write a README", "Add a CHANGELOG entry", "Document this API" |

### Installing Skills

#### Claude Code

```bash
# Marketplace (recommended — gets updates automatically)
# Run inside Claude Code:
/plugin marketplace add chf3198/agents-and-skills

# Direct copy (pinned version)
cp -r skills/<skill-name> ~/.claude/skills/

# All skills at once
for skill in skills/*/; do
  cp -r "$skill" ~/.claude/skills/
done
```

#### Generic (any AGENTS.md-compatible agent)

```bash
# Global install
cp -r skills/<skill-name> ~/.agents/skills/

# Or symlink (gets updates on git pull)
ln -s "$(pwd)/skills/<skill-name>" ~/.agents/skills/
```

#### Copilot (path-specific instructions)

For Copilot, skills are surfaced as path-specific instruction files. Copy
the relevant `.instructions.md` from `.github/instructions/` into your target
repo's `.github/instructions/` directory.

### Creating a New Skill

The fastest path is the `skill-creator` skill itself:

1. In Claude Code: "Create a skill for [your use case]"
2. Or use the prompt template: `@workspace /create-skill`
3. Or manually: follow the template in `skills/skill-creator/SKILL.md`

All skills are validated automatically when you run `npm run validate:skills`.

#### SKILL.md Frontmatter Spec

```yaml
---
name: skill-name          # required; lowercase-hyphenated; max 64 chars; matches dir name
description: >            # required; what + when; max 1024 chars; include trigger keywords
  A description of what this skill does and when to invoke it.
license: Apache-2.0       # optional
compatibility: >          # optional; only if env requirements exist
  Requires Node.js 20+
metadata:                 # optional
  author: your-org
  version: "1.0"
allowed-tools: Read Write Bash(git:*)  # optional; space-separated pre-approved tools
---
```

**Name validation rules:**
- Lowercase letters, numbers, hyphens only (`a-z`, `0-9`, `-`)
- Must not start or end with a hyphen
- Must not contain consecutive hyphens (`--`)
- Must match the parent directory name exactly
- Maximum 64 characters

---

## Agent Roles

The `agents/` directory contains four role definition files that describe a
**baton-handoff protocol** for multi-step agentic workflows.

| Role | File | Owns |
|---|---|---|
| Manager | `agents/manager.md` | Scope, acceptance criteria, ticket creation |
| Collaborator | `agents/collaborator.md` | Implementation, tests, validation |
| Admin | `agents/admin.md` | Git ops, PR creation, CI verification, merge |
| Reviewer | `agents/reviewer.md` | Independent critique, rubric scoring, closeout |

### Baton-Handoff Protocol

The protocol enforces a single active role at a time. Each role produces a
**handoff artifact** before passing control to the next role:

```
Manager ──(MANAGER_HANDOFF)──▶ Collaborator ──(COLLABORATOR_HANDOFF)──▶
Admin ──(ADMIN_HANDOFF)──▶ Reviewer ──(REVIEWER_CLOSEOUT)──▶ [DONE]
```

**Why this matters:**
- Prevents incomplete work from being shipped (each gate has explicit evidence requirements)
- Creates an audit trail for every feature delivery
- Works across both Copilot and Claude Code runtimes because it's pure Markdown

**Minimal MANAGER_HANDOFF example:**

```markdown
## MANAGER_HANDOFF
scope: Add the pdf-extraction skill to skills/
lane: code-change
test_strategy: tdd-pyramid
acceptance:
  - [ ] AC1: skills/pdf-extraction/SKILL.md exists with valid frontmatter
  - [ ] AC2: npm run validate:skills exits 0
  - [ ] AC3: smoke test passes in tests/skills/pdf-extraction.test.js
gates:
  - npm test
  - npm run validate:skills
  - npm run scan:secrets

Signed-by: manager-alias
Role: manager
```

---

## Configuration Layers Explained

### AGENTS.md

**What:** The highest-priority context file. Read by Copilot coding agent,
Copilot CLI, Claude Code, and any AGENTS.md-compatible orchestrator.

**What to put here:**
- Build and validation commands (the most useful thing for agents)
- Code location map (where things live)
- Definition of done
- Do-not-do rules

**Length limit:** No hard limit, but keep it under 1 000 words. Agents read
the entire file, so every word costs context.

**Location:** Repository root (or any directory — the nearest ancestor wins).

### CLAUDE.md

**What:** Claude Code–specific configuration. Read automatically by Claude Code
when opening the repository. Not read by Copilot.

**What to put here:**
- Claude Code–specific commands (`/plugin install ...`)
- Claude-specific tool permission notes
- Reference to `.claude/settings.json`

**Length limit:** Aim for under 400 words.

### .github/copilot-instructions.md

**What:** Copilot repository-wide instructions. Applied to every inline
suggestion and Copilot Chat request within the repo. Not read by Claude Code.

**What to put here:**
- Language/style preferences
- Framework-specific rules
- What to avoid (anti-patterns)
- Testing and PR conventions

**Critical:** Must be under **600 words**. Copilot silently ignores content
beyond its effective context window. Every word beyond ~600 is wasted.

### Path-Specific Instructions

**What:** `.github/instructions/*.instructions.md` files with an `applyTo`
frontmatter field. Applied only when Copilot works on files matching the
specified glob pattern.

**When to use:** When different parts of the codebase have fundamentally
different conventions (e.g., `skills/` authoring rules differ from general JS).

**Example frontmatter:**
```yaml
---
applyTo: "skills/**"
---
```

### Prompt Templates

**What:** `.github/prompts/*.prompt.md` files with a `mode: agent` frontmatter.
Reusable workflows invokable explicitly in Copilot Chat.

**When to use:** For multi-step, repeatable workflows that are too long for
inline instructions but too task-specific for a permanent skill.

**Invocation:** `@workspace /create-skill` in Copilot Chat.

### .claude/settings.json

**What:** Claude Code tool permissions and lifecycle hooks.

**What to put here:**
- `permissions.allow` — tools Claude Code may use without prompting
- `permissions.deny` — tools always blocked
- `hooks.PreToolUse` — commands run before tool invocations
- `hooks.PostToolUse` — commands run after tool invocations (e.g., auto-validate after Write)

**Security:** The `deny` list is your safety net. Always deny `rm -rf`, `sudo`,
and unconstrained `curl`/`wget`.

---

## Validation & CI

### Running Validation Locally

```bash
# Validate all SKILL.md frontmatter
npm run validate:skills

# Lint all markdown files
npm run lint:md

# Scan for secrets
npm run scan:secrets

# Run full test suite
npm test

# Run all checks at once (pre-PR preflight)
npm run preflight
```

### What the Validator Checks

The `scripts/validate-skills.js` validator enforces the
[agentskills.io specification](https://agentskills.io/specification):

| Check | Rule |
|---|---|
| `name` present | Required field |
| `name` format | `^[a-z0-9][a-z0-9-]*[a-z0-9]$` — lowercase-hyphenated |
| `name` max length | ≤ 64 characters |
| `name` matches directory | `skill.name === dirname` |
| No consecutive hyphens | `--` not allowed |
| `description` present | Required field |
| `description` max length | ≤ 1 024 characters |
| Body length | ≤ 500 lines |

### Regenerating the Skills Index

After adding or removing a skill:

```bash
npm run index:skills
```

This writes `skills/INDEX.md` with a sorted table of all skills, their
descriptions, and licenses.

---

## Security

This repository follows security-first practices:

- **No secrets in code** — `.env` is gitignored; `.env.example` contains only placeholders
- **Pre-commit scan** — `scripts/scan-secrets.sh` detects credential patterns before any commit
- **Principle of least privilege** — `.claude/settings.json` `allowed-tools` is minimal per skill
- **OWASP Top 10** — applied during code review (see `skills/code-review/references/REFERENCE.md`)
- **Dependency hygiene** — `npm audit` run in CI; no unnecessary production dependencies

### Reporting a Vulnerability

See [SECURITY.md](SECURITY.md) for the responsible disclosure process.

---

## Environment Variables

Copy `.env.example` to `.env` and fill in your values. `.env` is gitignored
and should never be committed.

| Variable | Required | Purpose |
|---|---|---|
| `ANTHROPIC_API_KEY` | For Claude API use | Anthropic API key |
| `OPENAI_API_KEY` | For OpenAI use | OpenAI API key |
| `OPENROUTER_API_KEY` | Optional | OpenRouter key for model routing |
| `GITHUB_TOKEN` | For git-workflow skill | GitHub PAT with `repo` + `workflow` scopes |

**Loading from a neighboring repo:**

```bash
# Import from devenv-ops (or any neighboring repo with a .env)
cp ../devenv-ops/.env .env
```

The `.env` is imported at session start; all credentials remain local and are
never committed.

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full guide.

The short version:
1. Open an issue
2. Fork + branch: `feat/<issue#>-<slug>`
3. Implement + `npm run preflight`
4. PR with `Refs #N` in body + `CHANGELOG.md` updated

---

## License

[Apache 2.0](LICENSE) — open source, free to use and modify with attribution.

Skills in this repository that originate from the
[Anthropic skills repo](https://github.com/anthropics/skills) retain their
original Apache 2.0 license and attribution.

---

*Built with the [agentskills.io](https://agentskills.io) specification — the
open standard for SKILL.md–based agent skills, compatible with Claude Code,
GitHub Copilot, Codex CLI, and any AGENTS.md-aware orchestrator.*
