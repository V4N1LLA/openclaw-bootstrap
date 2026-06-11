# HANDOFF

<!-- 80줄 이하로 유지한다. token, secret, password를 적지 않는다. -->

- 현재 목표: OCB-PR-READY-REVIEW-GATE
- 현재 브랜치: `feature/OCB-PR-READY-REVIEW-GATE`
- 현재 상태: docs/policy only 변경 완료, draft PR 준비
- 완료한 것: `TASKS.md`에 OCB-PR-READY-REVIEW-GATE 등록 및 DONE 처리
- 완료한 것: Draft PR은 CI/공유용 상태로만 취급하도록 정책화
- 완료한 것: draft 상태의 comment/review/thread 없음은 merge 근거가 아님을 명시
- 완료한 것: MEDIUM/HIGH PR의 ready 전환과 merge를 같은 run에서 금지
- 완료한 것: ready 전환 후 CI/review/comment/thread/scope/mergeable 재확인 절차를 ready-aftercare 경로로 분리
- 완료한 것: PR #9 P2 리뷰에 따라 before-pr checklist에는 PR 생성 전 가능한 조건만 유지
- 운영 전제: Telegram은 Discord 구축 전 임시 소통창구
- 최종 운영 기준: Discord PM/Sub-Agent 하네스
- 현재 작업 상태: OCB-PR-READY-REVIEW-GATE DONE
- 다음 작업: 아직 등록되지 않음
- 검증 예정: `git status --short`, `git diff --check`, `rg -n "PR Ready Review Gate|ready-aftercare|Draft PR|ready 전환|same run|MEDIUM/HIGH|review/comment/thread" WORKFLOW.md TASKS.md context .harness`
- 추천 커밋 메시지: `:memo: docs: PR ready review gate 정책을 추가한다`
