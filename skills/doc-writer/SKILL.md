---
name: doc-writer
description: >
  Write, update, or audit project documentation: README, CHANGELOG, architecture
  docs, API references, and contribution guides. Use when asked to write docs,
  update the README, add a CHANGELOG entry, or document an API or architectural
  decision.
license: Apache-2.0
metadata:
  author: interview2
  version: "1.0"
allowed-tools: Read Write Edit
---

# Doc Writer

## Purpose

Produce accurate, concise, and structurally consistent documentation that stays
synchronized with the code it describes. Enforces the project's documentation
conventions and checks for drift between docs and implementation.

## When to Use

- "Write a README for this project"
- "Add a CHANGELOG entry for feature X"
- "Document this API endpoint"
- "Update the docs to reflect the new behavior"
- As the Tech-Writer phase before a Collaborator handoff

## Document Types & Templates

### README.md

Required sections (in order):
1. **Project title + one-line description**
2. **Badges** (CI status, license, version)
3. **Quick Start** (copy-paste commands to get running in < 5 min)
4. **Features** (bulleted or tabular)
5. **Installation** (detailed steps)
6. **Usage** (examples with real commands and expected output)
7. **Configuration** (environment variables table)
8. **Contributing** (link to CONTRIBUTING.md)
9. **License**

### CHANGELOG.md

Follow [Keep a Changelog](https://keepachangelog.com/) format:
```markdown
## [Unreleased]

### Added
- <New feature>

### Changed
- <Modified behavior>

### Fixed
- <Bug fix>

### Security
- <Security fix>
```

### Architecture Decision Record (ADR)

```markdown
# ADR-<NNN>: <Title>

## Status
Proposed | Accepted | Deprecated | Superseded by ADR-<NNN>

## Context
<What problem are we solving? What constraints exist?>

## Decision
<What was decided?>

## Consequences
**Positive:** <Benefits>
**Negative:** <Trade-offs>
**Neutral:** <Side effects>
```

## Drift Detection

After writing docs, verify they match the code:
1. Every command in README must be runnable and succeed
2. Every environment variable in docs must exist in `.env.example`
3. Every API endpoint in docs must exist in the implementation
4. Version numbers must be consistent across README, package.json, and CHANGELOG

## Style Rules

- Use active voice: "Run `npm test`" not "Tests can be run with `npm test`"
- Code blocks must have a language tag (` ```bash `, ` ```javascript `, etc.)
- Tables over nested bullets for structured comparisons
- Link to source files with relative paths, not absolute URLs
- < 80 chars per line in prose paragraphs

## Examples

**Input:** "Write a README for this agents-and-skills repo"
**Output:** Full README.md with all required sections, real examples, and badges

**Input:** "Add a CHANGELOG entry for the new `skill-creator` skill"
**Output:** Properly formatted `[Unreleased]` entry under `### Added`

## References

- [Keep a Changelog](https://keepachangelog.com/)
- [Make a README](https://www.makeareadme.com/)
- See [REFERENCE.md](references/REFERENCE.md) for the full doc coverage matrix
