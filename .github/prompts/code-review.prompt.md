---
mode: agent
description: Perform a thorough code review on the current diff or specified files. Use when asked to review code, check a PR, or audit changes.
---

# Code Review

## Instructions

Perform a structured code review following this checklist.

### 1. Correctness
- Does the code do what it claims?
- Are edge cases handled?
- Are error paths explicit and tested?

### 2. Security (OWASP Top 10)
- No hardcoded secrets or credentials
- Input validation at all boundaries
- No SQL/shell injection vectors
- Dependencies not pinned to vulnerable versions

### 3. Readability
- Variables and functions have descriptive names
- No magic numbers without named constants
- Complex logic has inline comments explaining *why*

### 4. Test Coverage
- Happy path tested
- At least one error/edge case tested
- Tests are deterministic and isolated

### 5. Conventions
- Matches `.github/copilot-instructions.md` style rules
- Commit message follows Conventional Commits
- New skills pass `npm run validate:skills`

## Output Format

```markdown
## Code Review — <file or PR title>

### Summary
<One paragraph overall assessment>

### Critical Issues
- [ ] <issue> — <file>:<line>

### Suggestions
- [ ] <suggestion> — <file>:<line>

### Approved Items
- ✅ <what looks good>

### Verdict
APPROVE | REQUEST_CHANGES | NEEDS_DISCUSSION
```
