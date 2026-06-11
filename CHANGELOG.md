# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial repository structure with `AGENTS.md`, `CLAUDE.md`, and `.github/copilot-instructions.md`
- Agent role definitions: `manager.md`, `collaborator.md`, `admin.md`, `reviewer.md`
- Six agent skills: `code-review`, `git-workflow`, `security-audit`, `test-generator`, `skill-creator`, `doc-writer`
- Path-specific Copilot instruction files for `skills/` and `agents/`
- Reusable prompt templates: `create-skill.prompt.md`, `code-review.prompt.md`
- Skill validation script (`scripts/validate-skills.js`)
- Skills index generator (`scripts/index-skills.js`)
- Pre-commit secret scanner (`scripts/scan-secrets.sh`)
- Test suite covering all skills' frontmatter compliance
- Claude Code settings (`/.claude/settings.json`) with tool permissions and hooks
- Community health files: CONTRIBUTING.md, CODE_OF_CONDUCT.md, SECURITY.md, SUPPORT.md
