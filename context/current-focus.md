# 현재 작업 초점

- 현재 작업: OCB-002-B Discord Sub-Agent Routing Skeleton
- 현재 브랜치: `feature/OCB-002-B`
- 현재 상태: routing skeleton 구현 완료, draft PR 준비
- 작업 목표: PM preflight 결과를 기반으로 Sub-Agent 대상 후보와 work card 초안만 생성
- 완료한 것: 대상 후보 채널 `agent-dev-local`, `agent-docs-local`, `agent-review`, `agent-ops`, `agent-log` 추가
- 완료한 것: 채널 ID env가 없으면 `setup-needed` 상태로 안내
- 완료한 것: work card 초안 메시지 생성 구조 추가
- 완료한 것: 실제 Codex/Local LLM/shell/Git write/fan-in/자동 PR 실행은 구현하지 않음
- 운영 전제: Telegram은 Discord 구축 전 임시 소통창구
- 최종 운영 기준: Discord PM/Sub-Agent 하네스
- 수정 허용 범위: `gateway/discord-agent-gateway/src/`, `gateway/discord-agent-gateway/.env.example`, `gateway/discord-agent-gateway/README.md`, `TASKS.md`, `context/current-focus.md`, `context/HANDOFF.md`
- 금지사항: 실제 Discord channel send 금지, Codex/Sub-Agent 호출 금지, Local LLM 실행 금지, shell/Git write 자동화 금지, fan-in 구현 금지, `.env` 읽기/작성/커밋 금지, secret/token/password/API key 원문 출력 금지
- 검증 명령: `cd gateway/discord-agent-gateway && npm run build`, PM routing smoke test, `rg -n "Sub-Agent routing|setup-needed|agent-dev-local|agent-docs-local|agent-review|agent-ops|agent-log" gateway/discord-agent-gateway/src gateway/discord-agent-gateway/README.md gateway/discord-agent-gateway/.env.example TASKS.md context`
- 마지막 업데이트: 2026-06-11
