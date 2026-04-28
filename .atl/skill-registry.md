# Skill Registry

**Delegator use only.** Any agent that launches sub-agents reads this registry to resolve compact rules, then injects them directly into sub-agent prompts. Sub-agents do NOT read this registry or individual SKILL.md files.

See `_shared/skill-resolver.md` for the full resolution protocol.

## User Skills

| Trigger | Skill | Path |
|---------|-------|------|
| When creating a pull request, opening a PR, or preparing changes for review. | branch-pr | C:\Users\Usuario\.config\agents\skills\branch-pr\SKILL.md |
| When writing Go tests, using teatest, or adding test coverage. | go-testing | C:\Users\Usuario\.config\agents\skills\go-testing\SKILL.md |
| When creating a GitHub issue, reporting a bug, or requesting a feature. | issue-creation | C:\Users\Usuario\.config\agents\skills\issue-creation\SKILL.md |
| When user says "judgment day", "judgment-day", "review adversarial", "dual review", "doble review", "juzgar", "que lo juzguen". | judgment-day | C:\Users\Usuario\.config\agents\skills\judgment-day\SKILL.md |

## Compact Rules

Pre-digested rules per skill. Delegators copy matching blocks into sub-agent prompts as `## Project Standards (auto-resolved)`.

### branch-pr
- Every PR MUST link an approved issue — no exceptions
- Every PR MUST have exactly one `type:*` label
- Branch naming: `type/description` with regex `^(feat|fix|chore|docs|style|refactor|perf|test|build|ci|revert)/[a-z0-9._-]+$`
- Conventional commits: `type(scope): description` or `type: description`
- PR body MUST contain: linked issue, type label, summary, changes table, test plan, contributor checklist
- Automated checks (issue reference, approved status, type label, shellcheck) must pass before merge

### go-testing
- Pure functions → table-driven tests with `tests := []struct{...}` + `t.Run(tt.name, func(t *testing.T){...})`
- TUI state changes → test `Model.Update()` directly with `tea.KeyMsg`
- Full TUI flows → use `teatest.NewTestModel(t, m)` + `tm.Send()` + `tm.WaitFinished()`
- Visual output → golden file testing in `testdata/*.golden`; update with `go test -update`
- Side effects / system exec → mock via interfaces; real commands → integration tests with `--short` skip
- Use `t.TempDir()` for file operation tests

### issue-creation
- Blank issues are disabled — MUST use a template (bug report or feature request)
- Every issue gets `status:needs-review` automatically on creation
- A maintainer MUST add `status:approved` before any PR can be opened
- Questions go to Discussions, NOT issues
- Create issues via `gh issue create --template <template>` with pre-flight checkboxes filled

### judgment-day
- Launch TWO judge sub-agents in parallel (async, blind — neither knows about the other)
- Orchestrator NEVER reviews code itself — only coordinates, synthesizes, and delegates fixes
- Verdict synthesis: Confirmed (both found) → fix; Suspect (one found) → triage; Contradiction → flag
- WARNING classification: real (normal user can trigger) → fix; theoretical (contrived scenario) → info only
- Fix confirmed issues → re-judge both in parallel. After 2 fix iterations, ASK user before continuing
- Both judges must return clean for JUDGMENT: APPROVED

## Project Conventions

| File | Path | Notes |
|------|------|-------|

_No project convention files found (AGENTS.md, CLAUDE.md, .cursorrules, GEMINI.md, copilot-instructions.md)._
