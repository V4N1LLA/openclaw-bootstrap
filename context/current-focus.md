# 현재 작업 초점

- 현재 작업: OCB-002-A Discord PM Command Intake + Runtime Preflight Guard
- 현재 브랜치: `main`
- 현재 상태: `main` HEAD는 `origin/main`과 동기화된 상태에서 OCB-002-A 변경 진행
- 작업 목표: Discord PM 명령을 접수하고 실행 전 runtime preflight guard 결과만 반환
- 완료한 것: `/aw pm command:<text>` slash subcommand 추가
- 완료한 것: PM command intake 응답 추가
- 완료한 것: `DISCORD_PM_CHANNEL_ID` 기반 PM 채널 guard 추가
- 완료한 것: secret/token/password/API key/raw secret 요청 STOP 처리 추가
- 완료한 것: critical 요청은 실행하지 않고 승인 필요 상태로 분류
- 완료한 것: 실제 shell/Git/PR/deploy/Codex/Sub-Agent 실행은 구현하지 않음
- 운영 전제: Telegram은 Discord 구축 전 임시 소통창구
- 최종 운영 기준: Discord PM/Sub-Agent 하네스
- 수정 허용 범위: `gateway/discord-agent-gateway/src/`, `gateway/discord-agent-gateway/.env.example`, `gateway/discord-agent-gateway/README.md`, `TASKS.md`, `context/current-focus.md`, `context/HANDOFF.md`
- 금지사항: `.env` 읽기/작성/커밋 금지, 패키지 설치 금지, secret/token/password/API key 원문 출력 금지, 커밋 금지, push 금지
- 검증 명령: `cd gateway/discord-agent-gateway && npm run build`, `rg -n "pm|DISCORD_PM_CHANNEL_ID|Runtime guard|Preflight|STOP|CRITICAL" gateway/discord-agent-gateway/src gateway/discord-agent-gateway/README.md gateway/discord-agent-gateway/.env.example TASKS.md context`
- 마지막 업데이트: 2026-06-11
