# implement-task playbook

## 사용 시점

`OCB-001-D 진행해줘`처럼 작업 ID와 진행 요청을 받았을 때 사용한다.

## 절차

1. `/mnt/c/dev/openclaw-bootstrap`에서 시작한다.
2. `pwd`, `git branch --show-current`, `git status --short`를 확인한다.
3. `TASKS.md`에서 작업 ID를 찾는다.
4. Status가 `DONE`이면 재작업하지 말고 확인 질문을 한다.
5. Scope, Validation, Forbidden을 확인한다.
6. `before-edit` checklist를 적용한다.
7. 작업 상태를 `IN_PROGRESS`로 갱신한다.
8. Scope 안에서만 구현 또는 문서 작업을 수행한다.
9. Validation을 실행한다.
10. 검증 성공 시 `update-task-state` skill로 DONE 처리한다.
11. `summarize-run` skill 형식으로 보고한다.

## 금지

- 작업 범위 밖 수정 금지
- 커밋/push 금지
- secret/token/password/API key 원문 출력 금지
