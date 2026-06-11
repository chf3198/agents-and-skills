# Security Policy

## Supported Versions

| Version | Supported |
|---|---|
| 1.x (current) | ✅ |

## Reporting a Vulnerability

**Do not open a public GitHub issue for security vulnerabilities.**

Please report security issues by emailing the maintainer directly or using
[GitHub's private vulnerability reporting](https://docs.github.com/en/code-security/security-advisories/guidance-on-reporting-and-writing/privately-reporting-a-security-vulnerability).

Include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (optional)

You will receive a response within 48 hours. If the vulnerability is confirmed,
a patch will be released as soon as possible.

## Security Design Principles

This repository follows these security practices:
- No credentials or secrets are ever committed (enforced by `scripts/scan-secrets.sh`)
- All skill scripts follow the principle of least privilege via `allowed-tools`
- Dependencies are kept minimal and audited with `npm audit`
- Input validation is required at all system boundaries
- The OWASP Top 10 checklist is applied during code review (see `skills/code-review/references/REFERENCE.md`)
