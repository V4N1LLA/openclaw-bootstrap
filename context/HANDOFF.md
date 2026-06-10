# HANDOFF

<!-- 80줄 이하로 유지한다. token, secret, password를 적지 않는다. -->

- 현재 목표: OCB-SCOPE-GUARD 작업 scope guard 규칙 추가
- 현재 브랜치: `main`
- 현재 상태: 문서/하네스 정책 변경 완료, 커밋/push 미수행
- 완료한 것: `TASKS.md`에 OCB-SCOPE-GUARD 등록 및 DONE 처리
- 완료한 것: `AGENTS.md`에 작업 ID/목표/허용 파일 확인과 mismatch STOP 규칙 추가
- 완료한 것: `WORKFLOW.md`에 Scope Guard 섹션과 작업 시작/커밋/PR/merge 전 확인 시점 추가
- 완료한 것: `.harness/checklists/scope-guard.md` 추가
- 완료한 것: before-commit, before-pr, implement-task, commit-task, create-pr 절차에 scope guard 연결
- 완료한 것: CI-GATE PR에 gateway 런타임 변경이 섞였던 사례를 회고로 문서화
- 운영 전제: Telegram은 Discord 구축 전 임시 소통창구
- 최종 운영 기준: Discord PM/Sub-Agent 하네스
- 현재 작업 상태: OCB-SCOPE-GUARD DONE
- 다음 작업: 아직 등록되지 않음
- 검증 예정: `git status --short`, `git diff --name-only`, `rg -n "Scope Guard|scope mismatch|changed files|별도 브랜치 후보|CI-GATE" AGENTS.md WORKFLOW.md TASKS.md .harness context/current-focus.md context/HANDOFF.md`
- 추천 커밋 메시지: `:memo: docs: 작업 scope guard 규칙을 추가한다`
