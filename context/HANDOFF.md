# HANDOFF

<!-- 80줄 이하로 유지한다. token, secret, password를 적지 않는다. -->

- 현재 목표: OCB-002-C Discord Work Card Dispatch
- 현재 브랜치: `feature/OCB-002-C`
- 현재 상태: work card dispatch 구현 완료, draft PR 준비
- 완료한 것: `TASKS.md`에 OCB-002-C 등록 및 DONE 처리
- 완료한 것: ready 결과는 대상 Sub-Agent 채널에 work card 1건 전송
- 완료한 것: stopped 결과는 실행 후보 채널이 아니라 `agent-log` audit card로 전송
- 완료한 것: setup-needed 결과는 채널 전송 없이 누락 설정 안내
- 완료한 것: CRITICAL 결과는 `agent-ops` approval card만 전송하고 실행하지 않음
- 완료한 것: PM 응답에 대상 채널, dispatch 결과, 실행 여부 표시
- 완료한 것: 채널 ID 미설정/접근 실패 시 안전하게 STOP 이유 반환
- 완료한 것: 실제 Codex/Local LLM/shell/Git write/Sub-Agent 작업/fan-in/자동 PR 실행은 구현하지 않음
- 운영 전제: Telegram은 Discord 구축 전 임시 소통창구
- 최종 운영 기준: Discord PM/Sub-Agent 하네스
- 현재 작업 상태: OCB-002-C DONE
- 다음 작업: 아직 등록되지 않음
- 검증 완료: `cd gateway/discord-agent-gateway && npm run build`, `cd gateway/discord-agent-gateway && npm run smoke:pm-dispatch`
- 추천 커밋 메시지: `:sparkles: feat: Discord work card dispatch를 추가한다`
