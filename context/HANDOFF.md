# HANDOFF

<!-- 80줄 이하로 유지한다. token, secret, password를 적지 않는다. -->

- 현재 목표: OCB-002-A Discord PM Command Intake + Runtime Preflight Guard
- 현재 브랜치: `main`
- 현재 상태: 런타임/문서 변경 완료, 커밋/push 미수행
- 완료한 것: `TASKS.md`에 OCB-002-A 등록 및 DONE 처리
- 완료한 것: `/aw pm command:<text>` slash subcommand 추가
- 완료한 것: PM command intake와 LOW/MEDIUM/HIGH/CRITICAL/STOP 분류 응답 추가
- 완료한 것: `DISCORD_PM_CHANNEL_ID` 설정 시 PM 채널 guard 적용
- 완료한 것: secret/token/password/API key/raw secret 요청 STOP 처리
- 완료한 것: critical 요청은 실행하지 않고 승인 필요 상태로 분류
- 완료한 것: 실제 shell/Git/PR/deploy/Codex/Sub-Agent 실행은 구현하지 않음
- 운영 전제: Telegram은 Discord 구축 전 임시 소통창구
- 최종 운영 기준: Discord PM/Sub-Agent 하네스
- 현재 작업 상태: OCB-002-A DONE
- 다음 작업: 아직 등록되지 않음
- 검증 예정: `cd gateway/discord-agent-gateway && npm run build`, `rg -n "pm|DISCORD_PM_CHANNEL_ID|Runtime guard|Preflight|STOP|CRITICAL" gateway/discord-agent-gateway/src gateway/discord-agent-gateway/README.md gateway/discord-agent-gateway/.env.example TASKS.md context`
- 추천 커밋 메시지: `:sparkles: feat: Discord PM command intake preflight를 추가한다`
