# before-pr checklist

PR 생성 전 아래 항목을 확인한다.

- 작업 디렉터리가 `/mnt/c/dev/openclaw-bootstrap`인지 확인한다.
- 현재 브랜치가 작업 브랜치인지 확인한다.
- `git status --short`가 비어 있는지 확인한다.
- upstream이 설정되어 있는지 확인한다.
- 최신 커밋 SHA를 확인한다.
- `.env`가 tracked 또는 staged 상태가 아닌지 확인한다.
- token, secret, password, API key 원문이 변경 파일에 포함되지 않았는지 확인한다.
- build/test 검증 결과가 있는지 확인한다.
- PR 제목과 본문이 `prepare-pr` 기준을 따르는지 확인한다.
- `gh`가 없거나 인증되지 않았으면 PR 생성 URL과 초안만 보고한다.
- PR 생성 후 `review_pending` 상태를 `TASKS.md` 또는 `CONTEXT.md`에 기록할 준비가 되었는지 확인한다.
- merge 준비 명령에서는 PR review/comment pending 상태를 먼저 확인한다.
- `PR 상태 확인해줘`는 조회 전용 명령으로 해석하고 merge하지 않는다.
- `문제 없으면 merge 해`가 함께 있으면 조건부 merge 승인으로 해석한다.
- 조건부 merge 전 PR이 open, mergeable, 최신 head SHA 기준인지 확인한다.
- 조건부 merge 전 unresolved blocking review thread, P0/P1/P2 리뷰, failing build/test, `.env` 포함 위험이 없는지 확인한다.
- 차단 조건이 있으면 merge하지 않고 STOP 보고한다.

금지:

- 사용자 승인 없는 push 금지
- force push 금지
- 조건부 또는 명시 승인 없는 merge 금지
- deploy 자동화 금지
- secret/token/password/API key 원문 출력 금지
