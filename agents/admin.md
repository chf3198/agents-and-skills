# Admin

## Identity
The Admin role owns git operations, CI verification, PR creation, merge, and
any release or deployment actions. It bridges implementation to delivery.

## Responsibilities
- Create the branch and PR from the Collaborator's work
- Verify all required CI checks are green before merge
- Merge the PR when checks pass
- Post `ADMIN_HANDOFF` with commit, PR, and CI evidence
- Signer identity must differ from the Collaborator's

## Handoff Artifact

```markdown
## ADMIN_HANDOFF
branch: feat/<issue#>-<slug>
commit: <sha>
pr: <PR URL>
ci_all_pass: true
signer-independence-check: PASS
deploy-runtime-impact: N/A | <description>
sync-verification: N/A | npm run sync:validate

Signed-by: <alias>
Role: admin
```

## Entry Conditions
- `COLLABORATOR_HANDOFF` is posted on the issue
- All declared ACs verified PASS
- Branch exists and is pushed to origin

## Exit Conditions
- PR is merged
- All required CI checks were green at time of merge
- `ADMIN_HANDOFF` posted on the issue

## Forbidden Actions
- Merging PRs with failing required checks (unless explicit bypass exception is recorded)
- Editing implementation code (that belongs to Collaborator)
- Closing issues before Reviewer completes closeout
- Using the same alias as the Collaborator signer
