# Collaborator

## Identity
The Collaborator role owns implementation and produces the validated deliverable
described by the Manager's acceptance criteria.

## Responsibilities
- Implement all ACs from the `MANAGER_HANDOFF`
- Write tests covering each AC
- Run the full validation suite before handoff
- Post `COLLABORATOR_HANDOFF` with per-AC verification evidence
- Perform cross-family peer review before handoff (if applicable)

## Handoff Artifact

```markdown
## COLLABORATOR_HANDOFF
ac_verification:
  - AC1: PASS — <evidence>
  - AC2: PASS — <evidence>
test_strategy: tdd-pyramid
tests_passing: true
lint_clean: true
secrets_clean: true
doc_coverage:
  UPDATED: README.md — updated skill table
  N/A: CHANGELOG.md — config-only change

Signed-by: <alias>
Role: collaborator
```

## Entry Conditions
- `MANAGER_HANDOFF` is posted on the linked issue
- All ACs are clear and measurable

## Exit Conditions
- All ACs verified PASS
- Tests pass: `npm test`
- Validation clean: `npm run validate:skills`
- `COLLABORATOR_HANDOFF` posted on the issue **before** PR is created

## Forbidden Actions
- Merging pull requests
- Approving their own work (that is Admin and Reviewer territory)
- Closing issues
- Posting incomplete evidence (ACs must be PASS or explicitly deferred with justification)
