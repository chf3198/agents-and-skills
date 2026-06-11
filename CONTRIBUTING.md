# Contributing

Thank you for considering a contribution to this project!

## Before You Start

1. Open a GitHub issue describing what you want to add or fix.
2. Wait for feedback before writing code (avoids wasted effort).
3. Fork the repo and create a branch: `feat/<issue#>-<slug>` or `fix/<issue#>-<slug>`.

## Development Setup

```bash
git clone https://github.com/chf3198/agents-and-skills.git
cd agents-and-skills
npm install
cp .env.example .env   # fill in your values
npm run preflight      # validate, scan, test
```

## Adding a New Skill

1. Create a directory under `skills/<skill-name>/`
2. Add `SKILL.md` with valid YAML frontmatter (see `.github/instructions/skills.instructions.md`)
3. Optionally add `scripts/` and `references/`
4. Run `npm run validate:skills` — fix any errors
5. Add a smoke test to `tests/skills/<skill-name>.test.js`
6. Run `npm test`
7. Run `npm run index:skills` to update `skills/INDEX.md`
8. Open a PR with `Refs #<issue>` in the body

## Skill Quality Bar

- `name` matches directory name; lowercase-hyphenated; ≤ 64 chars
- `description` describes **what + when**; ≤ 1024 chars; includes trigger keywords
- Body ≤ 500 lines
- At least one smoke test

## Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):
```
feat(skill): add pdf-extraction skill
fix(validate): handle missing frontmatter gracefully
docs(readme): add quick-start section
```

## Code of Conduct

See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## License

By contributing, you agree your contributions will be licensed under [Apache 2.0](LICENSE).
