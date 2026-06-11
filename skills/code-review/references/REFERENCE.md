# Code Review Reference — OWASP Top 10 Checklist

## A01 — Broken Access Control
- [ ] Verify authorization checks exist before returning sensitive data
- [ ] Confirm no path traversal vulnerabilities (`../` in user input)
- [ ] Ensure CORS policy is restrictive, not `*`

## A02 — Cryptographic Failures
- [ ] No plaintext secrets in code, config, or logs
- [ ] Encryption uses modern algorithms (AES-256, ChaCha20); no MD5/SHA1 for security
- [ ] TLS enforced on all connections; no certificate verification disabled

## A03 — Injection
- [ ] SQL uses parameterized queries or prepared statements; no string concatenation
- [ ] Shell commands use argument arrays (`execFile`) not interpolated strings (`exec`)
- [ ] Template engines use auto-escaping for HTML output

## A04 — Insecure Design
- [ ] Threat model considered: what happens if this input is malicious?
- [ ] Rate limiting exists for authentication endpoints
- [ ] Sensitive workflows have confirmation steps

## A05 — Security Misconfiguration
- [ ] No default credentials in config
- [ ] Debug/verbose modes off in production
- [ ] Error messages do not expose stack traces to end users

## A06 — Vulnerable and Outdated Components
- [ ] `npm audit` or equivalent shows no critical/high vulnerabilities
- [ ] Pinned dependency versions in lockfile
- [ ] Third-party Actions pinned to commit SHA (not mutable tags)

## A07 — Identification and Authentication Failures
- [ ] Passwords hashed with bcrypt/argon2 (not MD5/SHA256)
- [ ] Session tokens are cryptographically random and revocable
- [ ] Multi-factor auth available for privileged operations

## A08 — Software and Data Integrity Failures
- [ ] Unsigned code or data not blindly trusted
- [ ] CI pipeline does not pull unconstrained external scripts
- [ ] Releases produce attestation artifacts (cosign or equivalent)

## A09 — Security Logging and Monitoring Failures
- [ ] Authentication events logged with timestamp and IP
- [ ] Logs do not contain passwords or tokens
- [ ] Alerting exists for repeated failures

## A10 — Server-Side Request Forgery (SSRF)
- [ ] User-supplied URLs are validated against an allowlist
- [ ] Internal network endpoints not reachable via user-controlled input
- [ ] Redirect targets are constrained

## Agent Skills–Specific Checks
- [ ] No `eval()` or `Function()` in skill scripts
- [ ] Skill `allowed-tools` is minimal (principle of least privilege)
- [ ] `scripts/` are self-contained and handle errors explicitly
- [ ] No credentials expected in SKILL.md body or frontmatter
