#!/usr/bin/env bash
# scan-secrets.sh — Pre-commit secret scan
# Exits non-zero if secrets are detected.
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"

echo "[scan-secrets] Scanning for credential patterns..."

# Patterns to detect (case-insensitive)
PATTERNS=(
  'api_key\s*=\s*["\047][A-Za-z0-9_\-]{20,}'
  'secret\s*=\s*["\047][A-Za-z0-9_\-]{20,}'
  'password\s*=\s*["\047][A-Za-z0-9!@#$%^&*]{8,}'
  'token\s*=\s*["\047][A-Za-z0-9_\-]{20,}'
  'private_key\s*='
  'ANTHROPIC_API_KEY\s*=\s*sk-'
  'OPENAI_API_KEY\s*=\s*sk-'
  'ghp_[A-Za-z0-9]{36}'
  'gho_[A-Za-z0-9]{36}'
  'github_pat_[A-Za-z0-9_]{82}'
  'sk-[A-Za-z0-9]{32,}'
)

# Files to skip
EXCLUDE_PATTERN='\.(env\.example|test\.|spec\.|fixture)|\bscan-secrets\.sh$'

FOUND=0

for pattern in "${PATTERNS[@]}"; do
  matches=$(git -C "$REPO_ROOT" grep -rIin --extended-regexp "$pattern" \
    -- ':!*.lock' ':!node_modules' ':!.env*' ':!dist' 2>/dev/null || true)
  if [[ -n "$matches" ]]; then
    # Filter test/example files
    filtered=$(echo "$matches" | grep -vE "$EXCLUDE_PATTERN" || true)
    if [[ -n "$filtered" ]]; then
      echo "[scan-secrets] POTENTIAL SECRET DETECTED:"
      echo "$filtered"
      FOUND=1
    fi
  fi
done

if [[ $FOUND -eq 1 ]]; then
  echo ""
  echo "[scan-secrets] ✗ Secret patterns detected. Review findings above before committing."
  echo "  To suppress a false positive, add the file to .gitignore or use:"
  echo "  # scan-secrets:ignore-next-line"
  exit 1
else
  echo "[scan-secrets] ✓ No secrets detected."
fi
