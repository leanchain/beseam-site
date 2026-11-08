# Agent Instructions

## Testing Policy

- Write only high-value tests that catch meaningful bugs, regressions, or security issues.
- Prefer real behavior and integration tests over mocked or implementation-detail tests.
- Avoid trivial, redundant, or coverage-driven tests.
- Run focused tests during development; preserve existing mandatory CI and release checks.

## Agent workflow (mandatory)

- **One task, one worktree.** Start each task with `.githooks/agent-task start <task-id>`. It creates `.worktrees/<task-id>` on branch `agent/<task-id>` from `origin/main`. Work only there: never edit the main checkout, and never share a worktree with another agent.
- **Gate, then land.** Commit, run `make verify`, then `.githooks/agent-task land`. `make verify` runs the checks in `.githooks/verify.rules` that your change touches. `land` rebases onto `origin/main` and pushes to `main`; `git push` runs the same gate on exactly what lands. If a check fails, fix it and land again.
- **Never bypass the gate** with `--no-verify`; only a person may. Report a failure you cannot fix.
- **Clean up.** After landing, run `.githooks/agent-task finish <task-id>` from outside the worktree. It removes the worktree and branch only when every commit is on `origin/main` and no file is modified or untracked; ignored files (dependencies, build output) go with it. `.githooks/agent-task list` shows tasks not yet landed.
- **Never lose work.** Do not force-remove a worktree, discard uncommitted or untracked files, delete unlanded commits, or delete remote branches. Leave other agents' worktrees alone. If you stop before landing, report the worktree and branch that hold the work.
- The desktop runner re-checks `main` after each push. `make verify` also runs `git config core.hooksPath .githooks`, which turns the gate on for the clone.
