# local-llm-first playbook

## 사용 시점

Discord `#agent-pm`에 짧은 작업 명령이 들어왔을 때 사용한다.

Telegram은 Discord 구축 전 임시 소통 창구다. 이 playbook의 최종 기준은 Discord PM/Sub-Agent 운영 흐름이다.

## 목표

PM Agent가 Codex를 바로 호출하지 않고 Local LLM 또는 규칙 기반으로 먼저 작업을 분류, 요약, 전처리한다.

## Local LLM 산출물

Local LLM은 Codex 호출 전 다음 항목을 만든다.

- 사용자 요청 한 줄 요약
- 작업 분류: `LOW`, `MEDIUM`, `HIGH`, `CRITICAL`
- 작업 ID 후보
- 수정 파일 후보
- 검증 명령 후보
- 금지 사항 후보
- Codex에 전달할 최소 컨텍스트
- 사용자 명시 승인 필요 여부

## 분류 기준

`LOW`:

- 단순 질의
- 요약
- 문서 초안
- 커밋 메시지 초안
- PR 본문 초안
- diff 요약
- 파일 수정 없이 처리 가능한 작업

처리 방식:

- Local LLM 또는 규칙 기반으로 처리한다.
- Codex 호출을 생략할 수 있다.

`MEDIUM`:

- 제한된 문서 수정
- 작은 코드 변경 후보 정리
- 파일 후보와 검증 후보가 비교적 명확한 작업

처리 방식:

- Local LLM이 계획, 파일 후보, 검증 후보를 만든다.
- Codex에는 최소 컨텍스트만 전달한다.

`HIGH`:

- 실제 코드 수정
- 테스트 실패 수정
- 구조 변경
- 여러 파일에 걸친 동작 변경

처리 방식:

- Codex가 수행한다.
- review 또는 별도 검증을 거친다.

`CRITICAL`:

- 배포
- force push 또는 destructive git
- 권한/보안 정책 변경
- 비용 발생 가능 외부 API 사용
- 외부 공개 변경

처리 방식:

- 사용자 명시 승인 전까지 실행하지 않는다.
- 승인 문구와 대상 범위를 먼저 확인한다.

`STOP`:

- secret/token/password/API key/raw secret 읽기, 출력, 요약, 전달 요청
- raw secret을 Local LLM 또는 Codex 컨텍스트에 포함해야 하는 요청
- secret 값을 대신 확인하거나 붙여 넣거나 변환해야 하는 요청

처리 방식:

- 사용자 승인이 있어도 실행하지 않는다.
- PM Agent, Local LLM, Codex는 raw secret을 읽거나 출력하거나 요약하거나 전달하지 않는다.
- 사용자가 직접 수행할 안전 절차와 확인 명령만 안내한다.
- 필요한 경우 secret 이름, 저장 위치 유형, 검증 명령처럼 원문 값을 포함하지 않는 메타데이터만 다룬다.

## Codex 전달 형식

Codex에는 전체 대화 전문 대신 다음 최소 컨텍스트만 전달한다.

```text
작업 ID:
분류:
목표:
허용 파일 후보:
금지 사항:
검증 후보:
사용자 승인 필요 여부:
요약:
```

## Discord 보고 구조

PM Agent는 Discord `#agent-pm`에 다음 구조로 보고할 수 있어야 한다.

1. 분류 결과
2. Local LLM 처리 결과 또는 Codex 전달 여부
3. 수정 파일 후보
4. 검증 후보
5. 사용자 승인 필요 여부
6. 다음 단계

## 금지

- Local LLM이 실제 코드 수정 주체인 것처럼 취급하지 않는다.
- CRITICAL 작업을 자동 실행하지 않는다.
- secret/token/password/API key/raw secret 원문을 읽거나 출력하거나 요약하거나 Local LLM 또는 Codex 컨텍스트에 포함하지 않는다.
- 전체 대화 전문을 불필요하게 Codex에 전달하지 않는다.
