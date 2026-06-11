---
name: security-audit
description: >
  Perform a security-focused audit of repository files, scripts, and CI workflows.
  Detects credential leaks, injection vulnerabilities, insecure dependencies,
  and misconfigured permissions. Use when asked to audit security, scan for secrets,
  or harden a repository before release.
license: Apache-2.0
compatibility: Requires Node.js 20+, git, and optionally truffleHog or gitleaks
metadata:
  author: interview2
  version: "1.0"
allowed-tools: Read Bash(git log:*) Bash(git grep:*) Bash(npm audit:*) Bash(grep:*)
---

# Security Audit

## Purpose

Systematically identify security vulnerabilities in a repository: exposed secrets,
insecure code patterns, vulnerable dependencies, and misconfigured CI/CD pipelines.
Produces a prioritized finding report with remediation guidance.

## When to Use

- Before a public release
- When asked to "audit security" or "scan for vulnerabilities"
- After adding new environment variables or credentials
- When onboarding a new contributor (verify no secrets in history)
- As part of the code review skill for security-sensitive changes

## Steps

### Phase 1 — Secret Scan

```bash
# Quick scan with git grep
git grep -i "api_key\|secret\|password\|token\|private_key" -- '*.js' '*.ts' '*.py' '*.sh' '*.json' '*.yaml' '*.yml' '*.env*'

# Exclude .env.example and test fixtures
# If truffleHog is available:
trufflehog git file://. --only-verified
```

### Phase 2 — Dependency Audit

```bash
npm audit --json | node -e "
const r = JSON.parse(require('fs').readFileSync('/dev/stdin'));
const critical = Object.values(r.vulnerabilities || {}).filter(v => v.severity === 'critical');
console.log('Critical:', critical.length);
critical.forEach(v => console.log(' -', v.name, v.url));
"
```

### Phase 3 — Permissions & Config Audit

Check `.github/workflows/*.yml` for:
- `permissions: write-all` or missing permissions block
- Third-party actions not pinned to SHA
- `GITHUB_TOKEN` with excessive scope
- Secrets referenced in untrusted contexts (PR body, issue comments)

### Phase 4 — Code Pattern Scan

Scan for:
- `eval(`, `Function(`, `exec(` with user input
- `fs.readFileSync` with user-controlled paths (path traversal)
- `child_process.exec` with interpolated strings
- `dangerouslySetInnerHTML` (XSS in React)

### Phase 5 — .gitignore Verification

Verify `.gitignore` blocks:
- `.env`, `.env.*`
- `node_modules/`
- `dist/`, `build/`
- `*.pem`, `*.key`, `*.p12`, `*.pfx`
- `*.secret`

## Output Format

```markdown
## Security Audit Report — <repo>/<date>

### CRITICAL (fix before any public exposure)
- [ ] [SECRET] <description> — `<file>`:`<line>`

### HIGH (fix before release)
- [ ] [VULN] <dependency>@<version> — <CVE> — upgrade to <safe-version>

### MEDIUM (schedule fix)
- [ ] [CONFIG] <misconfiguration> — `<file>`

### INFORMATIONAL
- ℹ️ <observation>

### Clean
- ✅ No secrets in current HEAD
- ✅ All Actions pinned to SHA
```

## References

- See [REFERENCE.md](references/REFERENCE.md) for full pattern catalog
