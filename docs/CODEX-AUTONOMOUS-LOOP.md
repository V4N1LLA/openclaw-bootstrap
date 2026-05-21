# Codex 자율 작업 루프

이 문서는 OpenClaw, Telegram Bot, Codex CLI 자동화 준비를 위한 부트스트랩 하네스에서 Codex가 다음 작업을 스스로 고르고 이어가는 방식을 설명한다.

## 왜 필요한가

매 단계마다 사용자가 다음 프롬프트를 직접 입력하면 같은 컨텍스트를 반복해서 설명하게 된다. 토큰 사용량이 늘고, 세션이 길어질수록 Codex가 현재 목표와 남은 일을 놓치기 쉽다. 자율 작업 루프는 작업 큐, 현재 초점, 인계 문서를 기준으로 한 번에 하나의 작은 작업만 처리하게 만든다.

## 기존 방식의 문제점

- 사용자가 다음 작업을 계속 지정해야 한다.
- 이전 세션의 판단과 남은 문제가 대화 안에만 남는다.
- 전체 저장소나 긴 로그를 다시 읽기 쉽다.
- 검증과 인계 형식이 매번 달라진다.

## TASK_QUEUE.md 기반 작업 방식

`context/TASK_QUEUE.md`는 작업 후보를 `TODO`, `DOING`, `DONE`, `BLOCKED` 상태로 관리한다. Codex는 `TODO` 중 `P0`, `P1`, `P2` 순으로 하나만 고르고, 예상 토큰 등급이 `L`이면 실행하지 않고 계획에서 멈춘다.

각 작업은 수정 허용 파일, 읽어도 되는 파일, 금지사항, 완료 조건, 검증 명령을 함께 가진다. 이 정보가 자동 루프의 작업 경계를 만든다.

## HANDOFF.md 기반 세션 압축

`context/HANDOFF.md`는 다음 세션이 이어받기 위한 80줄 이하 요약이다. 긴 대화 기록 대신 현재 목표, 완료한 것, 수정 파일, 확인한 사실, 실패한 시도, 남은 문제, 다음 한 단계, 검증 상태만 유지한다.

작업 시작 전에는 `context/current-focus.md`를 갱신하고, 작업 종료 후에는 `HANDOFF.md`를 갱신한다.

## 멈춰야 하는 조건

Codex는 secret/token, `.env`, git push, deploy, force push, DB 삭제/초기화가 필요하면 멈춘다. 작업 범위가 허용 파일을 넘거나, 테스트 실패 원인이 불명확하거나, 같은 실패가 2회 반복되어도 멈춘다. 예상 토큰 등급이 `L` 이상이거나 제품/아키텍처 판단이 필요할 때도 사용자 결정을 기다린다.

## 토큰 절약 운영법

- 처음에는 `TASK_QUEUE.md`, `current-focus.md`, `HANDOFF.md`만 읽는다.
- 선택 작업에 적힌 파일만 추가로 읽는다.
- 큰 로그와 전체 diff를 출력하지 않는다.
- 검증 결과는 핵심 성공/실패만 남긴다.
- 결정은 `DECISION_LOG.md`에 짧게 기록한다.

## OpenClaw/Telegram 연결 방식

이 하네스는 OpenClaw나 Telegram Bot을 직접 실행하지 않는다. Telegram으로 연결할 때는 자동 루프의 최종 요약만 보내고, token, secret, password, `.env` 내용은 어떤 채널에도 출력하지 않는다. OpenClaw와 연결할 때도 실제 서비스 코드는 별도 저장소에서 다루고, 이 저장소는 문서, 프롬프트, 검증 스크립트만 관리한다.

## 예시 명령어

```bat
scripts\codex-run-next.bat
scripts\codex-agent-loop.bat
scripts\codex-agent-loop.bat 3
```

`scripts\codex-agent-loop.bat`의 반복 횟수 기본값은 1이고 최대값은 5다. 루프는 commit, push, merge, rebase를 수행하지 않는다.
