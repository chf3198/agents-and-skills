---
name: git-workflow
description: >
  Execute a complete git workflow: branch creation, staged commits, PR creation,
  CI verification, and merge. Use when asked to commit changes, open a PR,
  push a branch, or complete the git portion of a feature delivery.
license: Apache-2.0
compatibility: Requires git 2.40+ and the gh CLI
metadata:
  author: interview2
  version: "1.0"
allowed-tools: Bash(git:*) Bash(gh:*)
---

# Git Workflow

## Purpose

Automate the full git delivery flow from branch creation through PR merge,
enforcing commit message conventions, CI gate checking, and issue linkage.

## When to Use

- "Commit and push these changes"
- "Create a PR for issue #N"
- "Open a pull request with this work"
- "Ship this feature"
- After implementation is complete and tests pass

## Steps

### 1. Verify Clean State

```bash
git status
git diff --stat
```

Confirm only intentional files are staged. Never commit `node_modules/`, `.env`, or `dist/`.

### 2. Create Branch

```bash
git checkout -b feat/<issue-number>-<slug>
# or for fixes:
git checkout -b fix/<issue-number>-<slug>
```

Branch naming: `feat/` or `fix/` + issue number + kebab-case slug.

### 3. Stage and Commit

```bash
git add <files>
git commit -m "feat(scope): imperative description (#N)"
```

Commit message format: `type(scope): imperative description (#N)`.
Allowed types: `feat`, `fix`, `chore`, `docs`, `test`, `refactor`, `perf`.

### 4. Push Branch

```bash
git push -u origin <branch-name>
```

### 5. Create Pull Request

```bash
gh pr create \
  --title "feat(scope): imperative description" \
  --body "Refs #N

## Summary
<What this PR does>

## Changes
- <file>: <what changed>

## Testing
- [ ] npm test passes
- [ ] npm run validate:skills passes"
```

### 6. Verify CI

```bash
gh pr checks <PR-number> --watch
```

Wait for all required checks to turn green. Never merge with failing checks.

### 7. Merge

```bash
gh pr merge <PR-number> --squash --delete-branch
```

Use squash merge to keep main history clean.

## Rules

- One issue → one branch → one PR (no bundling)
- Never commit directly to `main`
- PR body must include `Refs #N`
- Do not merge with failing CI
- Delete branch after merge

## Examples

**Input:** "Commit the changes to skills/code-review/ for issue #5"
**Output:** Branch `feat/5-code-review-skill` created, committed, pushed, PR opened

## References

- See [REFERENCE.md](references/REFERENCE.md) for Conventional Commits spec
