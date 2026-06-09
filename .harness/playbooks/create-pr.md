# create-pr playbook

## 사용 시점

사용자가 `OCB-001 PR 생성해줘`처럼 명시적으로 GitHub PR 생성을 요청했을 때만 사용한다.

`PR 초안 작성해줘`는 이 playbook을 사용하지 않고 `prepare-pr` skill로 제목과 본문만 작성한다.

## 절차

1. `/mnt/c/dev/openclaw-bootstrap`에서 시작한다.
2. `pwd`, `git branch --show-current`, `git status --short`를 확인한다.
3. `.harness/checklists/before-pr.md`를 적용한다.
4. 현재 브랜치가 작업 브랜치인지 확인한다.
5. working tree가 clean인지 확인한다.
6. upstream이 존재하는지 확인한다.
7. 최신 커밋 SHA를 확인한다.
8. `.env`, token, secret, password, API key 원문이 커밋에 포함되지 않았는지 확인한다.
9. build/test 검증 결과를 확인한다.
10. `prepare-pr` skill 기준으로 PR 제목과 본문을 작성한다.
11. `gh --version`과 `gh auth status`로 GitHub CLI 사용 가능 여부를 확인한다.
12. `gh`가 사용 가능하면 `gh pr create`로 PR을 생성한다.
13. `gh`가 없거나 인증되지 않았으면 PR 생성 URL, 제목, 본문만 출력하고 멈춘다.
14. PR 생성 후 PR URL을 보고한다.
15. `TASKS.md` 또는 `CONTEXT.md`에 `review_pending` 상태를 기록한다.
16. 자동 리뷰를 기다리며 프로세스를 점유하지 않고 종료한다.

## Deferred PR Review Check

- PR 생성 직후 GitHub/Codex 자동 리뷰가 아직 도착하지 않을 수 있다.
- PR 생성 프로세스는 자동 리뷰 완료를 기다리지 않는다.
- 다음 사용자 명령이 들어오면 새 작업 시작 전 열린 PR의 review/comment 상태를 먼저 확인한다.
- Codex 리뷰가 있으면 P0/P1/P2만 작업화한다.
- Low/P3는 후속 TODO로 남긴다.
- 리뷰가 없으면 `자동 리뷰 미도착`으로 보고하고 사용자 판단을 기다린다.

## push 처리

- upstream이 없거나 원격 브랜치가 최신이 아니면 push 필요 여부를 먼저 보고한다.
- 사용자의 명시 승인 없이 push하지 않는다.
- force push는 금지한다.

## 금지

- 사용자 명시 요청 없는 PR 생성 금지
- 사용자 명시 승인 없는 push 금지
- force push 금지
- merge, squash merge, rebase merge 금지
- deploy 자동화 금지
- `.env` 포함 금지
- secret/token/password/API key 원문 출력 금지
