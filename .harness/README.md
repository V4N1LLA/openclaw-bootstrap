# OpenClaw Bootstrap Harness

이 하네스는 Telegram에서 짧은 명령만 받아도 에이전트가 일관된 절차로 작업하도록 돕는 로컬 운영 문서다.

기본 흐름은 다음과 같다.

1. 짧은 명령을 해석한다.
2. `TASKS.md`에서 작업 ID, 상태, 범위, 검증, 금지사항을 확인한다.
3. `.harness/playbooks/`에서 절차를 선택한다.
4. 필요한 `.harness/skills/`를 적용한다.
5. `.harness/checklists/`로 위험 항목을 점검한다.
6. 변경 요약, 검증 결과, TODO 중심으로 보고한다.

## 짧은 명령만 보내도 되는 이유

`AGENTS.md`, `TASKS.md`, `WORKFLOW.md`, `CONTEXT.md`가 기본 규칙과 작업 문맥을 보관한다.

`.harness/`는 그 규칙을 실행 가능한 절차, skill, checklist로 나눈다.

따라서 사용자는 매번 긴 컨텍스트, 금지사항, 검증 명령, 보고 형식을 반복하지 않아도 된다.

## 루트 문서와의 관계

- `AGENTS.md`: 에이전트 역할, 안전 규칙, 작업 전 확인 파일
- `TASKS.md`: 작업 레지스트리와 각 작업의 Status, Scope, Validation, Forbidden
- `WORKFLOW.md`: 짧은 명령 해석과 playbook/skill 선택 규칙
- `CONTEXT.md`: 레포 목적, OCB-001 목표, 하네스 운영 배경
- `.harness/skills/`: 반복 작업의 세부 지침
- `.harness/playbooks/`: 명령 유형별 절차
- `.harness/checklists/`: 편집, 커밋, push, 보안 점검 기준

루트 문서와 하네스 문서가 충돌하면 `AGENTS.md`와 `TASKS.md`의 안전 규칙을 우선한다.
