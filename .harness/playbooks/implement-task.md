# implement-task playbook

## 사용 시점

`OCB-001-D 진행해줘`처럼 작업 ID와 진행 요청을 받았을 때 사용한다.

## 절차

1. `/mnt/c/dev/openclaw-bootstrap`에서 시작한다.
2. `pwd`, `git branch --show-current`, `git status --short`를 확인한다.
3. Discord `#agent-pm` 흐름에서는 `.harness/playbooks/local-llm-first.md`의 분류 결과를 먼저 확인한다.
4. `LOW`는 Local LLM 또는 규칙 기반 처리로 충분한지 확인한다.
5. `MEDIUM` 이상이면 Codex에 전달된 최소 컨텍스트와 사용자 승인 필요 여부를 확인한다.
6. `TASKS.md`에서 작업 ID를 찾는다.
7. Status가 `DONE`이면 재작업하지 말고 확인 질문을 한다.
8. Scope, Validation, Forbidden을 확인한다.
9. `scope-guard` checklist를 적용한다.
10. `before-edit` checklist를 적용한다.
11. 작업 상태를 `IN_PROGRESS`로 갱신한다.
12. Scope 안에서만 구현 또는 문서 작업을 수행한다.
13. 변경 후 changed files가 Scope와 일치하는지 다시 확인한다.
14. Validation을 실행한다.
15. 검증 성공 시 `update-task-state` skill로 DONE 처리한다.
16. `summarize-run` skill 형식으로 보고한다.

## 금지

- 작업 범위 밖 수정 금지
- 작업 ID/목표와 changed files가 불일치한 상태로 진행 금지
- 커밋/push 금지
- secret/token/password/API key 원문 출력 금지
