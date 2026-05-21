# MVP Repo Bootstrap

이 문서는 OpenClaw MVP 서비스 저장소를 새로 준비할 때 사용할 초기화 절차와 문서 템플릿 기준을 정리한다. 이 부트스트랩 하네스 저장소에서는 실제 서비스 저장소를 만들거나 서비스 코드를 생성하지 않는다.

## 목적

- 실제 MVP 저장소의 첫 Codex 작업 경계를 분명히 한다.
- `AGENTS.md`, `context/`, `docs/`, `prompts/`의 최소 문서 구조를 먼저 만든다.
- token, secret, password, `.env` 파일을 Codex가 읽거나 출력하지 않도록 초기 규칙에 포함한다.
- 기능 구현 전 제품 범위, 작업 큐, 검증 방식을 먼저 합의한다.

## 사용 순서

1. 실제 MVP 저장소를 사용자가 직접 생성한다.
2. MVP 저장소 루트에서 `prompts/mvp/00-init-mvp-repo.md` 내용을 Codex에 전달한다.
3. 서비스 코드 생성 전 `AGENTS.md`, `context/TASK_QUEUE.md`, `context/current-focus.md`, `context/HANDOFF.md`, `docs/PRODUCT.md`, `docs/README.md` 초안을 만든다.
4. 생성된 문서에 실제 제품명, 저장소명, 검증 명령, 금지 파일을 채운다.
5. 첫 기능 구현은 별도 작업 큐 항목으로 분리한다.

## 필수 산출물

- `AGENTS.md`: 저장소 목적, 허용/금지 작업, 보안 경계, 검증 원칙
- `context/TASK_QUEUE.md`: 한 번에 하나씩 실행할 초기 작업 큐
- `context/current-focus.md`: 현재 작업 하나의 범위와 검증 명령
- `context/HANDOFF.md`: 80줄 이하 인계 문서
- `docs/PRODUCT.md`: MVP 문제, 사용자, 핵심 흐름, 제외 범위
- `docs/README.md`: 로컬 실행 전제, 문서 구조, 안전한 검증 명령

## 금지 경계

- 이 하네스 저장소에서 실제 MVP repo를 생성하지 않는다.
- 이 하네스 저장소에서 실제 서비스 코드를 생성하지 않는다.
- Codex가 token, secret, password, `.env`, `.env.*`, `secrets/`, `logs/`를 읽거나 출력하지 않게 한다.
- 초기화 단계에서 git commit, push, merge, deploy를 수행하지 않는다.

## README 템플릿

~~~md
# <MVP 이름>

## 목적

<이 저장소가 해결하는 문제와 MVP 범위를 3문장 이하로 적는다.>

## 문서 구조

- `AGENTS.md`: Codex 작업 규칙
- `context/TASK_QUEUE.md`: 작업 큐
- `context/current-focus.md`: 현재 작업 초점
- `context/HANDOFF.md`: 다음 세션 인계
- `docs/PRODUCT.md`: 제품 범위

## 로컬 검증

아직 서비스 코드가 없으면 문서 검증만 수행한다.

```powershell
git diff --stat
```

## 보안

token, secret, password, `.env`, `.env.*`, `secrets/`, `logs/`는 Codex 입력이나 출력에 포함하지 않는다.
~~~

## PRODUCT 템플릿

~~~md
# PRODUCT

## 문제

<MVP가 해결할 사용자 문제를 적는다.>

## 대상 사용자

<초기 사용자와 제외할 사용자를 적는다.>

## 핵심 흐름

1. <사용자가 시작하는 행동>
2. <시스템이 제공하는 핵심 가치>
3. <사용자가 확인하는 결과>

## MVP 포함 범위

- <첫 버전에 반드시 필요한 기능>

## MVP 제외 범위

- <첫 버전에서 만들지 않을 기능>

## 성공 기준

- <MVP가 작동한다고 판단할 검증 가능한 기준>
~~~
