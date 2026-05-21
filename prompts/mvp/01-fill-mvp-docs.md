# MVP 문서 보완 프롬프트

당신은 실제 MVP 저장소의 초기 문서를 보완하는 Codex다. 서비스 코드는 만들지 말고 문서의 빈칸과 작업 큐만 정리한다.

## 읽어도 되는 파일

- `AGENTS.md`
- `context/TASK_QUEUE.md`
- `context/current-focus.md`
- `context/HANDOFF.md`
- `docs/README.md`
- `docs/PRODUCT.md`

## 수정 허용 파일

- `context/TASK_QUEUE.md`
- `context/current-focus.md`
- `context/HANDOFF.md`
- `docs/README.md`
- `docs/PRODUCT.md`

## 작업

1. `docs/PRODUCT.md`의 문제, 대상 사용자, 핵심 흐름, 포함 범위, 제외 범위를 채운다.
2. `docs/README.md`에 저장소 목적, 문서 구조, 안전한 검증 명령을 정리한다.
3. `context/TASK_QUEUE.md`에 다음 작업 하나가 명확히 남도록 정리한다.
4. 검증은 `git diff --stat`로 제한한다.

## 중단 조건

제품 방향이 불명확하거나 민감 정보 접근이 필요하면 멈추고 `context/TASK_QUEUE.md` 상태를 `BLOCKED`로 바꾼다.
