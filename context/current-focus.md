# 현재 작업 초점

- 현재 작업: OCB-002-C Discord Work Card Dispatch
- 현재 브랜치: `feature/OCB-002-C`
- 현재 상태: work card dispatch 구현 완료, draft PR 준비
- 작업 목표: PM routing 결과에 따라 Discord 대상 채널에 work/audit/approval card를 1건 전송
- 완료한 것: ready routing 결과는 대상 Sub-Agent 채널로 work card dispatch
- 완료한 것: stopped 결과는 실행 후보 채널 대신 `agent-log` audit card로 dispatch
- 완료한 것: setup-needed 결과는 채널 전송 없이 누락 채널 설정 안내
- 완료한 것: CRITICAL 결과는 `agent-ops` approval card만 dispatch하고 실행하지 않음
- 완료한 것: 채널 ID 미설정/접근 실패 시 안전하게 STOP 이유 반환
- 완료한 것: 실제 Codex/Local LLM/shell/Git write/Sub-Agent 작업/fan-in/자동 PR 실행은 구현하지 않음
- 운영 전제: Telegram은 Discord 구축 전 임시 소통창구
- 최종 운영 기준: Discord PM/Sub-Agent 하네스
- 수정 허용 범위: `gateway/discord-agent-gateway/src/`, `gateway/discord-agent-gateway/scripts/`, `gateway/discord-agent-gateway/package.json`, `gateway/discord-agent-gateway/tsconfig.smoke.json`, `gateway/discord-agent-gateway/.gitignore`, `gateway/discord-agent-gateway/.env.example`, `gateway/discord-agent-gateway/README.md`, `TASKS.md`, `context/current-focus.md`, `context/HANDOFF.md`
- 금지사항: Codex/Sub-Agent 실제 작업 실행 금지, Local LLM 실행 금지, shell/Git write 자동화 금지, fan-in 구현 금지, 자동 커밋/PR/merge 실행 금지, 재시도 스케줄러 구현 금지, `.env` 읽기/작성/커밋 금지, secret/token/password/API key 원문 출력 금지
- 검증 명령: `cd gateway/discord-agent-gateway && npm run build`, `cd gateway/discord-agent-gateway && npm run smoke:pm-dispatch`, `git diff --check`
- 마지막 업데이트: 2026-06-17
