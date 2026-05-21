# 다음 작업 하나 실행

목표: `context/TASK_QUEUE.md`에서 다음 작업 하나만 선택하고, 허용 범위 안에서 실행한 뒤 검증과 인계를 남긴다.

## 시작 규칙

1. 먼저 `context/TASK_QUEUE.md`, `context/current-focus.md`, `context/HANDOFF.md`만 읽는다.
2. `TODO` 중 우선순위 `P0` > `P1` > `P2` 순으로 하나만 고른다.
3. 같은 우선순위가 여러 개이면 파일 위쪽에 있는 작업을 고른다.
4. 예상 토큰 등급이 `L`이면 계획만 세우고 멈춘다.
5. 한 번에 하나의 작업만 수행한다.
6. 선택한 작업의 `수정 허용 파일` 밖은 수정하지 않는다.
7. 선택한 작업의 `읽어도 되는 파일` 밖은 읽지 않는다.
8. token, secret, password, `.env`, `.env.*`, `secrets/`, `logs/`는 읽거나 출력하지 않는다.

## 운영 메타 파일 예외

- `context/current-focus.md`, `context/HANDOFF.md`, `context/TASK_QUEUE.md`는 자율 루프 운영 메타 파일이다.
- 이 3개 파일은 선택된 TASK의 `수정 허용 파일`에 명시되어 있지 않아도 루프 상태 갱신을 위해 수정할 수 있다.
- 단, 실제 산출물 파일은 반드시 선택된 TASK의 `수정 허용 파일` 안에서만 수정한다.

## 실행 규칙

1. 작업 전 `context/current-focus.md`를 선택한 작업 기준으로 갱신한다.
2. 작업 상태를 `DOING`으로 바꾼다.
3. 작업 목표, 완료 조건, 검증 명령에 필요한 최소 파일만 읽는다.
4. 막히면 상태를 `BLOCKED`로 바꾸고 `비고`에 이유와 다음 한 단계를 적는다.
5. 작업 완료 시 검증 명령을 실행한다.
6. 검증이 통과하면 `context/TASK_QUEUE.md` 상태를 `DONE`으로 바꾼다.
7. 작업 후 `context/HANDOFF.md`를 80줄 이하로 갱신한다.
8. 출력은 40줄 이하로 한다.

## 중단 규칙

`prompts/agent-loop/04-stop-conditions.md`의 조건에 해당하면 즉시 멈춘다. 필요한 경우 `TASK_QUEUE.md` 상태를 `BLOCKED`로 바꾸고 이유만 짧게 남긴다.
