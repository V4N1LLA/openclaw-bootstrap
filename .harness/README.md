# OpenClaw Bootstrap Harness

이 하네스는 Discord `#agent-pm`에서 짧은 명령만 받아도 PM Agent와 하위 에이전트가 일관된 절차로 작업하도록 돕는 로컬 운영 문서다.

Telegram은 Discord 구축 전 임시 소통 창구다. 최종 운영 기준은 Discord PM/Sub-Agent 흐름이다.

기본 흐름은 다음과 같다.

1. 짧은 명령을 해석한다.
2. PM Agent가 Local LLM 또는 규칙 기반으로 작업을 `LOW`, `MEDIUM`, `HIGH`, `CRITICAL`로 분류한다.
3. `LOW`는 Local LLM 또는 규칙 기반으로 처리한다.
4. `MEDIUM`은 Local LLM이 계획, 파일 후보, 검증 후보를 만든 뒤 Codex에 최소 컨텍스트를 전달한다.
5. `HIGH`는 Codex가 수행하고 review 또는 별도 검증을 거친다.
6. `CRITICAL`은 사용자 명시 승인 전까지 실행하지 않는다.
7. `TASKS.md`에서 작업 ID, 상태, 범위, 검증, 금지사항을 확인한다.
8. `.harness/playbooks/`에서 절차를 선택한다.
9. 필요한 `.harness/skills/`를 적용한다.
10. `.harness/checklists/`로 위험 항목을 점검한다.
11. Discord 채널 보고 구조에 맞춰 변경 요약, 검증 결과, TODO 중심으로 보고한다.

## 짧은 명령만 보내도 되는 이유

`AGENTS.md`, `TASKS.md`, `WORKFLOW.md`, `CONTEXT.md`가 기본 규칙과 작업 문맥을 보관한다.

`.harness/`는 그 규칙을 실행 가능한 절차, skill, checklist로 나눈다.

따라서 사용자는 Discord `#agent-pm`에서 매번 긴 컨텍스트, 금지사항, 검증 명령, 보고 형식을 반복하지 않아도 된다.

## 루트 문서와의 관계

- `AGENTS.md`: 에이전트 역할, 안전 규칙, 작업 전 확인 파일
- `TASKS.md`: 작업 레지스트리와 각 작업의 Status, Scope, Validation, Forbidden
- `WORKFLOW.md`: 짧은 명령 해석과 playbook/skill 선택 규칙
- `CONTEXT.md`: 레포 목적, OCB-001 목표, 하네스 운영 배경
- `.harness/skills/`: 반복 작업의 세부 지침
- `.harness/playbooks/`: 명령 유형별 절차
- `.harness/checklists/`: 편집, 커밋, push, 보안 점검 기준

루트 문서와 하네스 문서가 충돌하면 `AGENTS.md`와 `TASKS.md`의 안전 규칙을 우선한다.

## Local LLM-first playbook

Discord `#agent-pm`에서 들어온 짧은 명령은 먼저 `.harness/playbooks/local-llm-first.md`를 적용한다.

이 playbook은 Codex 호출 여부를 결정하기 전 Local LLM이 수행할 요약, 분류, 파일 후보 추림, 검증 후보 추림 기준을 정의한다.
