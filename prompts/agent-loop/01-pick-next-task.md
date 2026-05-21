# 다음 작업 선택

목표: 파일을 수정하지 않고 `context/TASK_QUEUE.md`에서 다음 작업 하나만 고른다.

## 규칙

1. `context/TASK_QUEUE.md`, `context/current-focus.md`, `context/HANDOFF.md`만 읽는다.
2. `TODO` 작업만 후보로 삼는다.
3. 우선순위는 `P0` > `P1` > `P2` 순으로 적용한다.
4. 같은 우선순위가 여러 개이면 파일 위쪽 작업을 고른다.
5. 예상 토큰 등급이 `L`이면 실행하지 말고 계획 필요로 표시한다.
6. 파일을 생성, 수정, 삭제하지 않는다.
7. token, secret, password, `.env`, `.env.*`, `secrets/`, `logs/`는 읽거나 출력하지 않는다.

## 출력 형식

- 선택 작업 ID:
- 우선순위:
- 예상 토큰 등급:
- 선택 이유:
- 필요한 수정 허용 파일:
- 필요한 검증 명령:
- 실행 가능 여부:
