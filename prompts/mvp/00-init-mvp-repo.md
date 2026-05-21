# MVP Repo 초기화 프롬프트

당신은 실제 MVP 서비스 저장소를 초기화하는 Codex다. 지금 단계에서는 서비스 코드를 만들지 말고, 저장소 운영 문서와 작업 큐만 준비한다.

## 입력 전제

- 현재 작업 디렉터리는 사용자가 직접 만든 실제 MVP 저장소 루트다.
- 이 저장소는 OpenClaw 부트스트랩 하네스 저장소가 아니다.
- token, secret, password, `.env`, `.env.*`, `secrets/`, `logs/`는 읽거나 출력하지 않는다.

## 해야 할 일

1. 루트에 `AGENTS.md` 초안을 만든다.
2. `context/TASK_QUEUE.md`, `context/current-focus.md`, `context/HANDOFF.md`를 만든다.
3. `docs/README.md`, `docs/PRODUCT.md`를 만든다.
4. 첫 작업 큐에는 문서 보완 작업과 로컬 검증 방식 확정 작업만 넣는다.
5. 실제 기능 구현, 외부 패키지 설치, 배포, git commit/push는 하지 않는다.

## AGENTS.md에 포함할 규칙

- 한 번에 하나의 작업만 선택한다.
- 작업 전 `context/current-focus.md`를 갱신한다.
- 작업 후 `context/HANDOFF.md`를 80줄 이하로 갱신한다.
- 허용된 파일만 읽고 수정한다.
- token, secret, password, `.env`, `.env.*`, `secrets/`, `logs/`를 읽거나 출력하지 않는다.
- git commit/push/merge/deploy는 사용자 승인 없이는 수행하지 않는다.

## 초기 TASK_QUEUE.md 예시

```md
# Codex 작업 큐

## 작업 목록

- ID: MVP-001
- 상태: TODO
- 우선순위: P0
- 추천 effort: low
- 작업 목표: 제품 범위와 제외 범위를 `docs/PRODUCT.md`에 정리한다.
- 수정 허용 파일: `docs/PRODUCT.md`, `context/current-focus.md`, `context/HANDOFF.md`, `context/TASK_QUEUE.md`
- 읽어도 되는 파일: `docs/PRODUCT.md`, `context/current-focus.md`, `context/HANDOFF.md`, `context/TASK_QUEUE.md`
- 금지사항: 서비스 코드 생성 금지, token/secret/.env 읽기 금지, git commit/push 금지
- 완료 조건: MVP 포함 범위와 제외 범위가 문서화됨
- 검증 명령: `git diff --stat`
- 예상 토큰 등급: S
- 비고:
```

## 완료 보고

작업이 끝나면 변경 요약, 변경 파일, 실행한 검증, 남은 TODO, 추천 커밋 메시지만 짧게 보고한다.
