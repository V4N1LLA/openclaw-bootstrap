# summarize-run

## 목적

Codex/OpenClaw 작업 결과를 Discord `#agent-pm` 보고 구조에 맞춰 짧고 일관되게 요약한다.

Telegram은 Discord 구축 전 임시 소통 창구이므로, 보고 내용은 Discord PM/Sub-Agent 운영 흐름에서도 그대로 사용할 수 있어야 한다.

## 입력

- 수행한 작업 ID
- 작업 분류: `LOW`, `MEDIUM`, `HIGH`, `CRITICAL`
- 변경 파일
- 검증 명령과 결과
- 남은 TODO
- 추천 커밋 메시지

## 절차

1. 작업 분류와 처리 경로를 먼저 적는다.
2. 변경 요약을 한두 문장으로 정리한다.
3. 파일 목록은 실제 생성/수정 파일만 적는다.
4. 검증 결과는 실행 명령과 성공/실패만 명확히 적는다.
5. 남은 TODO는 다음 작업 하나를 우선 적는다.
6. 추천 커밋 메시지는 한국어로 작성한다.

## Discord 보고 형식

1. 분류 결과
2. 변경 요약
3. 파일 목록
4. 검증 결과
5. 남은 TODO
6. 추천 커밋 메시지

## 금지

- secret/token/password/API key 원문 출력 금지
- `.env` 내용 출력 금지
- 불필요한 로그 전문 출력 금지
- 커밋/push 실행 금지
