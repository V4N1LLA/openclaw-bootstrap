# 작은 작업 하나 수행

목표: 이미 선택된 예상 토큰 등급 `S` 또는 `M` 작업 하나를 허용 범위 안에서 수행한다.

## 규칙

1. 선택된 작업의 `수정 허용 파일`과 `읽어도 되는 파일`만 사용한다.
2. 작업 전 `context/current-focus.md`를 갱신한다.
3. `context/TASK_QUEUE.md`에서 선택 작업 상태를 `DOING`으로 바꾼다.
4. 실제 서비스 코드, OpenClaw 서비스 코드, Telegram Bot 서비스 코드는 생성하지 않는다.
5. OpenClaw를 실행하지 않는다.
6. 외부 패키지를 설치하지 않는다.
7. git commit, git push, merge, rebase, force push를 하지 않는다.
8. token, secret, password, `.env`, `.env.*`, `secrets/`, `logs/`는 읽거나 출력하지 않는다.
9. 작업 범위가 커지면 즉시 멈추고 `BLOCKED`로 바꾼다.

## 운영 메타 파일 예외

`context/current-focus.md`, `context/HANDOFF.md`, `context/TASK_QUEUE.md`는 루프 상태 갱신을 위해 모든 작업에서 수정할 수 있다. 실제 산출물 파일은 선택 작업의 `수정 허용 파일` 안에서만 수정한다.

## 완료 전 확인

- 수정한 파일이 허용 범위 안인지 확인한다.
- 완료 조건을 만족하는지 확인한다.
- 검증 명령이 위험하지 않은지 확인한다.
