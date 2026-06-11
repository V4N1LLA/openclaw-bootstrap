# ready-aftercare playbook

## 사용 시점

Draft PR을 ready로 전환한 뒤 review, CI, comment, thread, scope, merge 가능 여부를 다시 확인할 때 사용한다.

이 playbook은 PR 생성 전 checklist가 아니다. `.harness/checklists/before-pr.md`를 대체하지 않는다.

## 절차

1. `/mnt/c/dev/openclaw-bootstrap`에서 시작한다.
2. `pwd`, `git branch --show-current`, `git status --short`를 확인한다.
3. 대상 PR이 open 상태이고 draft가 아닌지 확인한다.
4. PR head SHA를 확인한다.
5. CI가 대상 head SHA 기준 completed/success인지 확인한다.
6. ready 전환 이후 새 review, comment, unresolved thread를 확인한다.
7. P0/P1/P2 review 또는 unresolved blocking thread가 있으면 merge하지 않고 STOP 보고한다.
8. PR changed files가 PR 목적과 계속 일치하는지 확인한다.
9. docs-only 또는 policy-only PR에 runtime/source 변경이 섞였으면 merge하지 않고 STOP 보고한다.
10. `.env`, secret/token/password/API key/raw secret 위험이 있으면 merge하지 않고 STOP 보고한다.
11. PR이 mergeable이고 최신 head SHA 기준이면 사용자 merge 승인 범위 안에서만 merge한다.
12. merge 후 main fast-forward pull과 working tree clean 상태를 확인한다.

## 정책

- Draft PR은 CI 실행과 변경 공유를 위한 중간 상태로만 취급한다.
- Draft 상태의 comment, review, thread 없음은 merge 가능 근거가 아니다.
- MEDIUM/HIGH PR은 ready 전환과 merge를 같은 run에서 수행하지 않는다.
- ready 전환 이후 별도 run에서 이 playbook을 적용해야 merge 준비로 볼 수 있다.

## 금지

- ready 전환과 merge를 같은 run에서 수행 금지
- ready 이후 CI/review/comment/thread/scope/mergeable/head SHA 재확인 없는 merge 금지
- unresolved P0/P1/P2 또는 blocking thread가 있는 상태의 merge 금지
- PR 목적과 changed files가 불일치한 상태의 merge 금지
- docs-only 또는 policy-only PR에 runtime/source 변경이 섞인 상태의 merge 금지
- `.env` 포함 금지
- secret/token/password/API key/raw secret 원문 출력 금지
