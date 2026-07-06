# AGENTS

- Favour simplicity in implementation where possible
- Add JSDoc comments to all new functions, types, modules and route handlers
- Don't add additional dependencies / tools unless they're useful and always ask first
  - When adding packages, use `node scripts/find-compatible-version.mjs <package>` to find a version that satisfies `minimumReleaseAge` in `pnpm-workspace.yaml`
- After making a change, ask for permission before committing
- Use Conventional Commits format for commit messages
- When committing, list the current AI model as a co-author
- Commits must be signed
- Keep README.md up to date automatically. Any time a change is made that affects features, setup steps, project structure, tech stack, or data model, update README.md in the same step — no need to ask
