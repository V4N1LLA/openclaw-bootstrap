# HANDOFF

<!-- 80줄 이하로 유지한다. token, secret, password를 적지 않는다. -->

- 현재 목표: OCB-002-B Discord Sub-Agent Routing Skeleton
- 현재 브랜치: `feature/OCB-002-B`
- 현재 상태: routing skeleton 구현 완료, draft PR 준비
- 완료한 것: `TASKS.md`에 OCB-002-B 등록 및 DONE 처리
- 완료한 것: PM preflight 결과 기반 Sub-Agent routing skeleton 추가
- 완료한 것: 대상 후보 채널 `agent-dev-local`, `agent-docs-local`, `agent-review`, `agent-ops`, `agent-log` 추가
- 완료한 것: 채널 ID env가 없으면 `setup-needed` 상태로 안내
- 완료한 것: work card 초안 메시지 생성 구조 추가
- 완료한 것: 실제 Codex/Local LLM/shell/Git write/fan-in/자동 PR 실행은 구현하지 않음
- 운영 전제: Telegram은 Discord 구축 전 임시 소통창구
- 최종 운영 기준: Discord PM/Sub-Agent 하네스
- 현재 작업 상태: OCB-002-B DONE
- 다음 작업: 아직 등록되지 않음
- 검증 예정: `cd gateway/discord-agent-gateway && npm run build`, PM routing smoke test, `rg -n "Sub-Agent routing|setup-needed|agent-dev-local|agent-docs-local|agent-review|agent-ops|agent-log" gateway/discord-agent-gateway/src gateway/discord-agent-gateway/README.md gateway/discord-agent-gateway/.env.example TASKS.md context`
- 추천 커밋 메시지: `:sparkles: feat: Discord sub-agent routing skeleton을 추가한다`
