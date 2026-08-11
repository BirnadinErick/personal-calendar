# General LLM Rules & Guidelines

The following rulesets have been extracted from instructions and preferences given during development. Any LLM/agent working in this repository must follow these rules at all times:

## 1. Package Manager & Script Executions
- **Use pnpm**: Always use `pnpm` as the package manager for installing packages, running tests (`pnpm test`), building production bundles (`pnpm build`), and other developer scripts. Do not use `npm` or `yarn`.

## 2. Git & Commit Guidelines
- **Commit by Logical Hunks**: Group your changes into logically related hunks/commits rather than committing all modifications at once.
- **SemVer 2.0 / Conventional Commits**: Write git commit messages conforming to the Conventional Commits specification (e.g., `feat(scope): ...`, `fix(scope): ...`, `docs(scope): ...`). This enables automated SemVer 2.0 version bumping.

## 3. Documentation Guidelines
- **Document Changes & Rationale**: Document all code changes and the reasons why things were implemented the way they are under the `docs/` directory. Ensure future agents or developers can easily understand the design decisions.
- **Portability (No `file://` links)**: Never use absolute `file://` URLs in documentation files. Always use relative markdown links (e.g., `../../src/components/MiniCalendar.tsx`).
- **Structured Layout**: Organize documentation files into logical subdirectories matching their category (e.g., `docs/components/` for component documentation, `docs/store/` for state management).
- **Index README**: Maintain a main `README.md` inside the `docs/` folder explaining the documentation directory structure.
