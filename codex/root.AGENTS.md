# 프로젝트 AGENTS.md 템플릿

이 파일은 실제 서비스 repo 루트의 `AGENTS.md`로 복사해 사용하는 인덱스 템플릿이다. 모든 지식을 담지 말고, Codex가 어디부터 읽을지 알려주는 안내판으로 유지한다.

## 프로젝트 목표

- 목적:
- 주요 사용자:
- 운영 환경:

## 기술 스택

- Backend:
- Frontend:
- Mobile:
- Database:
- Infra:
- Test:

## 자주 쓰는 명령어

```bat
REM 테스트

REM 빌드

REM 린트
```

## 작업 전 읽을 최소 문서

- `context/current-focus.md`
- `context/HANDOFF.md`
- `context/context-map.md`

## 작업별 추가 문서

- Backend API: `prompts/skills/backend-api/SKILL.md`
- Frontend page: `prompts/skills/frontend-page/SKILL.md`
- Security review: `prompts/skills/security-review/SKILL.md`
- 토큰 예산: `codex/token-budget.AGENTS.md`
- 인계 규칙: `codex/handoff.AGENTS.md`

## 금지사항

- 사용자 승인 없는 push, merge, deploy 금지
- token, secret, password 읽기 또는 출력 금지
- `.env`, secret store, credential 파일 탐색 금지
- 작업과 무관한 대규모 리팩토링 금지
- 전체 repo 파일 내용 덤프 금지

## 토큰 절약 규칙

- 처음에는 최소 문서만 읽는다.
- 검색 결과는 상위 5개부터 확인한다.
- 긴 파일은 필요한 섹션만 읽는다.
- 성공 로그 전체를 반복하지 않는다.
- 변경 설명은 diff 요약 중심으로 한다.

## HANDOFF.md 작성 규칙

작업 종료 시 `context/HANDOFF.md`를 80줄 이하로 갱신한다.

- 현재 목표:
- 완료한 것:
- 수정한 파일:
- 확인한 사실:
- 실패한 시도:
- 남은 문제:
- 다음 한 단계:
- 검증 상태:
- 추천 커밋 메시지:
