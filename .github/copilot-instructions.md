# Repository-Wide Copilot Instructions

> Applied to every GitHub Copilot inline suggestion and Copilot Chat request
> within this repository. Keep this file under 600 words to ensure full loading.

---

## Project Context

This repository defines reusable **agent skills** and **agent role configurations**
for use with GitHub Copilot and Claude Code. Skills are stored in `skills/` as
SKILL.md-based directories. Agent role files are in `agents/`.

---

## Language & Style

- **JavaScript/TypeScript** for scripts and validation tooling (Node.js ≥ 20)
- **Markdown** for all skill, instruction, and documentation files
- **YAML frontmatter** for SKILL.md metadata blocks
- Prefer `async/await` over promise chains
- Use ES modules (`import`/`export`); avoid CommonJS `require`
- No `console.log` in production scripts; use a proper logger

---

## Skill Authoring Rules

When generating or editing a SKILL.md file:

1. YAML frontmatter must include `name` and `description` (both required)
2. `name` must be lowercase alphanumeric with hyphens; max 64 chars
3. `description` must describe **what** the skill does AND **when** to invoke it
4. Keep the SKILL.md body under 500 lines
5. Move detailed reference material to `references/REFERENCE.md`
6. Scripts belong in `scripts/`; must include error handling

---

## Security Rules

- Never suggest hardcoding credentials, API keys, or tokens
- Always reference environment variables from `.env` (loaded, never committed)
- Input validation required at all system boundaries
- Sanitize any user-supplied strings before passing to shell commands

---

## Testing Rules

- Test files live in `tests/skills/<skill-name>.test.js`
- Use `node:test` (Node.js built-in) or Jest
- Every new skill should have at least one smoke test
- Run `npm test` before claiming implementation complete

---

## Commit & PR Rules

- Commit messages: `type(scope): imperative description` (Conventional Commits)
- Every PR must include `Refs #N` in the body
- `CHANGELOG.md` must be updated under `[Unreleased]` for every behavior change
- Branch naming: `feat/<issue#>-<slug>` or `fix/<issue#>-<slug>`
