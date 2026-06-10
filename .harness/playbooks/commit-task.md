# commit-task playbook

## 사용 시점

사용자가 명시적으로 커밋을 요청했을 때만 사용한다.

## 절차

1. `/mnt/c/dev/openclaw-bootstrap`에서 시작한다.
2. `pwd`, `git branch --show-current`, `git status --short`를 확인한다.
3. `review-diff` skill을 적용한다.
4. `scope-guard` checklist를 적용한다.
5. `before-commit` checklist를 적용한다.
6. 변경 파일과 staged files가 요청 범위와 일치하는지 확인한다.
7. 추천 커밋 메시지를 제안하거나 사용자가 지정한 메시지를 확인한다.
8. 커밋 요청이 명확할 때만 커밋한다.
9. push는 별도 명시 요청 전까지 하지 않는다.
10. PR 생성은 별도 명시 요청 전까지 하지 않는다.
11. PR 생성 요청을 받으면 `.harness/playbooks/create-pr.md`로 전환한다.

## 금지

- 사용자 명시 요청 없는 커밋 금지
- 작업 ID/목표와 staged files가 불일치한 상태의 커밋 금지
- push 금지
- PR 생성 금지
- merge 금지
- `.env` 커밋 금지
- secret/token/password/API key 원문 출력 금지
