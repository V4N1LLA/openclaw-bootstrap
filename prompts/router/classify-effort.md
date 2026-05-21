# reasoning effort 작업 분류

목표: `context/TASK_QUEUE.md`의 다음 TODO 작업 하나를 읽고 실행하지 않은 채 적절한 reasoning effort만 추천한다.

## 읽기 규칙

1. 먼저 `context/TASK_QUEUE.md`, `context/current-focus.md`, `context/HANDOFF.md`만 읽는다.
2. 필요하면 `docs/CODEX-EFFORT-ROUTING.md`만 추가로 읽는다.
3. token, secret, password, `.env`, `.env.*`, `secrets/`, `logs/`는 읽거나 출력하지 않는다.
4. 파일을 수정하지 않는다.

## 분류 기준

- `low`: 단순 조회, 작은 문서 수정, 좁은 반복 작업
- `medium`: 일반적인 하네스 문서, 스크립트, 큐 작업
- `high`: 여러 파일 계약, 보안, 릴리스, 실패 영향이 큰 판단
- `xhigh`: 복잡한 장애 분석, 보안 영향 검토, 릴리스 차단 판단처럼 높은 확실성이 필요한 작업

## 출력 형식

40줄 이하로 다음만 출력한다.

1. 선택 작업 ID
2. 추천 effort
3. 추천 이유 한 줄
4. 실행 스크립트 예: `scripts\codex-run-medium.bat`
5. 중단 여부: 예상 토큰 등급 `L` 이상이거나 중단 조건에 해당하면 실행하지 말라고 적는다.
