# Agent Instructions

## Testing Policy

- Write only high-value tests that catch meaningful bugs, regressions, or security issues.
- Prefer real behavior and integration tests over mocked or implementation-detail tests.
- Avoid trivial, redundant, or coverage-driven tests.
- Run focused tests during development; preserve existing mandatory CI and release checks.

## Pre-push gate

- `git push` runs `.githooks/pre-push`, which runs only the checks in `.githooks/verify.rules` that the pushed commits touch. Enable it once per clone: `git config core.hooksPath .githooks`.
- Run `.githooks/pre-push` before pushing to see the same result for HEAD and uncommitted work; `VERIFY_ALL=1 .githooks/pre-push` runs every check.
- Push from a clean working tree: the checks run on the working tree, not on the pushed commit.
- Never bypass the gate with `--no-verify`; only a person may. Fix the failure or report it.
