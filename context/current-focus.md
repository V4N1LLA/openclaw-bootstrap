# 현재 작업 초점

- 현재 작업: OCB-PR-READY-REVIEW-GATE
- 현재 브랜치: `feature/OCB-PR-READY-REVIEW-GATE`
- 현재 상태: docs/policy only 변경 진행
- 작업 목표: draft PR ready 전환과 merge 사이의 review gate를 명확히 문서화
- 완료한 것: Draft PR은 CI/공유용 상태로만 취급하도록 정책화
- 완료한 것: draft 상태의 comment/review/thread 없음은 merge 근거가 아님을 명시
- 완료한 것: MEDIUM/HIGH PR은 ready 전환과 merge를 같은 run에서 금지
- 완료한 것: ready 전환 후 CI/review/comment/thread/scope/mergeable 재확인 절차 추가
- 운영 전제: Telegram은 Discord 구축 전 임시 소통창구
- 최종 운영 기준: Discord PM/Sub-Agent 하네스
- 수정 허용 범위: `TASKS.md`, `WORKFLOW.md`, `context/current-focus.md`, `context/HANDOFF.md`, `.harness/checklists/*.md`, `.harness/playbooks/*.md`
- 금지사항: gateway 코드 변경 금지, Discord command 재등록 금지, Codex/Sub-Agent 실행 금지, `.env` 읽기/작성/커밋 금지, secret/token/password/API key 원문 출력 금지
- 검증 명령: `git status --short`, `git diff --check`, `rg -n "PR Ready Review Gate|Draft PR|ready 전환|same run|MEDIUM/HIGH|review/comment/thread" WORKFLOW.md TASKS.md context .harness`
- 마지막 업데이트: 2026-06-11
