# Skill Registry

**Delegator use only.** Any agent that launches sub-agents reads this registry to resolve compact rules, then injects them directly into sub-agent prompts. Sub-agents do NOT read this registry or individual SKILL.md files.

## User Skills

| Trigger | Skill | Path |
|---------|-------|------|
| When creating a pull request, opening a PR, or preparing changes for review | branch-pr | C:\Users\agusc\.gemini\config\skills\branch-pr\SKILL.md |
| When writing Go tests, using teatest, or adding test coverage | go-testing | C:\Users\agusc\.gemini\config\skills\go-testing\SKILL.md |
| When creating a GitHub issue, reporting a bug, or requesting a feature | issue-creation | C:\Users\agusc\.gemini\config\skills\issue-creation\SKILL.md |
| When user says "judgment day", "judgment-day", "review adversarial", "dual review", "doble review", "juzgar", "que lo juzguen" | judgment-day | C:\Users\agusc\.gemini\config\skills\judgment-day\SKILL.md |
| When user asks to create a new skill, add agent instructions, or document patterns for AI | skill-creator | C:\Users\agusc\.gemini\config\skills\skill-creator\SKILL.md |

## Compact Rules

Pre-digested rules per skill. Delegators copy matching blocks into sub-agent prompts as `## Project Standards (auto-resolved)`.

### branch-pr
- Every PR MUST link an approved issue (`Closes #N`, `Fixes #N`, or `Resolves #N`) — no exceptions
- Every PR MUST have exactly one `type:*` label (type:feature, type:bug, type:docs, type:refactor, type:chore, type:breaking-change)
- Branch naming: `type/description` — must match `^(feat|fix|chore|docs|style|refactor|perf|test|build|ci|revert)\/[a-z0-9._-]+$`
- Commit messages MUST match `^(build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test)(\([a-z0-9\._-]+\))?!?: .+`
- NO `Co-Authored-By` trailers in commits
- Run `shellcheck scripts/*.sh` before pushing if shell scripts were modified
- Linked issue MUST have `status:approved` label before PR can be opened
- Blank PRs without issue linkage will be blocked by GitHub Actions

### go-testing
- Use table-driven tests (`[]struct{name, input, expected, wantErr}`) for all multi-case scenarios
- Test Bubbletea model state directly: `newModel, _ := m.Update(tea.KeyMsg{...}); m = newModel.(Model)`
- Use `teatest.NewTestModel(t, m)` + `tm.Send(...)` + `tm.WaitFinished(...)` for full TUI flow tests
- Use golden files (`testdata/*.golden`) for View() output — update with `-update` flag
- Test file naming: `model_test.go`, `update_test.go`, `view_test.go` — mirror source files
- Use `t.TempDir()` for file operations, `--short` flag to skip integration tests
- Mock system deps via interfaces, never patch globals

### issue-creation
- Blank issues are disabled — MUST use a template (Bug Report or Feature Request)
- Every issue gets `status:needs-review` automatically on creation
- A maintainer MUST add `status:approved` before any PR can be opened
- Questions go to Discussions, NOT issues
- Bug Report auto-labels: `bug`, `status:needs-review`
- Feature Request auto-labels: `enhancement`, `status:needs-review`
- Issue title MUST follow conventional commit format: `type(scope): description`

### judgment-day
- Resolve skills BEFORE launching judges: search engram for `skill-registry` → fallback `.atl/skill-registry.md`
- Launch TWO judges in PARALLEL (async) — never sequential; neither knows about the other
- Orchestrator NEVER reviews code itself — only coordinates and synthesizes results
- Verdict classification: Confirmed = both agree, Suspect = one only, Contradiction = disagree
- WARNING classification: real (normal user can trigger) vs theoretical (contrived scenario) — theoretical = INFO only, never fix
- Fix Agent is a SEPARATE delegation — never use a judge as the fixer
- After Round 1: show verdict table, ASK user before fixing — never auto-fix
- After Round 2+: only re-judge if confirmed CRITICALs remain; real WARNINGs fixed inline without re-judge
- APPROVED = 0 confirmed CRITICALs + 0 confirmed real WARNINGs
- After 2 fix iterations: ASK user whether to continue — never auto-escalate

### skill-creator
- Create skills only for reusable patterns, not one-off tasks
- SKILL.md requires frontmatter: name, description (with Trigger:), license (Apache-2.0), metadata.author, metadata.version
- Skill directory: `skills/{skill-name}/SKILL.md` + optional `assets/` and `references/`
- references/ points to LOCAL files only — no web URLs
- After creating a skill, register it in AGENTS.md
- Content: Critical Patterns first, minimal code examples, Commands section — no lengthy explanations

## Project Conventions

| File | Path | Notes |
|------|------|-------|
| — | — | No convention files found in project root (new project) |
