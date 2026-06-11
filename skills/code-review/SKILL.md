---
name: code-review
description: >
  Perform a structured code review covering correctness, security (OWASP Top 10),
  readability, test coverage, and project conventions. Use when asked to review
  code, audit a PR diff, check a file for bugs, or validate implementation quality.
license: Apache-2.0
compatibility: Requires git and Node.js 20+
metadata:
  author: interview2
  version: "1.0"
allowed-tools: Read Bash(git diff:*) Bash(git log:*) Bash(npm run lint:*)
---

# Code Review

## Purpose

Deliver a structured, evidence-based code review that identifies critical bugs,
security vulnerabilities, style violations, and missing tests. Produces a verdict
with actionable, file-linked findings.

## When to Use

- User asks to review code, check a PR, or audit a change
- Before a PR is opened or merged
- When asked "what's wrong with this code?"
- After implementing a feature — self-review pass before handoff

## Steps

1. **Gather scope** — identify the files or diff to review
2. **Read each file** — load full context before forming opinions
3. **Run linter** — `npm run lint` (or language-equivalent)
4. **Check security** — scan for OWASP Top 10 patterns (injection, secrets, broken auth)
5. **Check correctness** — trace execution paths; verify edge cases
6. **Check tests** — confirm happy path + at least one error path covered
7. **Check conventions** — validate against `.github/copilot-instructions.md`
8. **Produce report** — emit the structured output below

## Output Format

```markdown
## Code Review — <file or PR>

### Summary
<One paragraph: overall quality and key risks>

### Critical Issues  (must fix before merge)
- [ ] [SECURITY] <issue> — `<file>`:`<line>`
- [ ] [BUG] <issue> — `<file>`:`<line>`

### Suggestions  (should fix; non-blocking)
- [ ] <suggestion> — `<file>`:`<line>`

### Approved
- ✅ <what was done well>

### Verdict
APPROVE | REQUEST_CHANGES | ESCALATE
```

## Security Checklist

- No hardcoded secrets, API keys, or passwords
- All inputs validated and sanitized before use
- Shell commands use explicit argument arrays, not string interpolation
- Dependencies are pinned and not at known-vulnerable versions
- No eval() or equivalent dynamic code execution

## Examples

**Input:** `git diff HEAD~1`
**Output:** Full report with critical issues, suggestions, and verdict

**Input:** "Review `skills/code-review/SKILL.md`"
**Output:** Frontmatter validity, body quality, missing sections flagged

## References

- See [REFERENCE.md](references/REFERENCE.md) for the full OWASP checklist
- See `.github/copilot-instructions.md` for project conventions
