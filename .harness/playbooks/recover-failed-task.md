# recover-failed-task playbook

## 사용 시점

build/test/검증 명령이 실패했을 때 사용한다.

## 절차

1. 실패한 명령과 핵심 오류를 요약한다.
2. `TASKS.md`의 Scope와 Forbidden을 다시 확인한다.
3. 실패 원인이 Scope 안에서 고칠 수 있는지 판단한다.
4. 작은 수정으로 복구 가능하면 수정 후 Validation을 다시 실행한다.
5. 대규모 수정이 필요하거나 범위가 불명확하면 확인 질문을 한다.
6. 실패를 숨기지 않고 보고한다.

## 금지

- 임의 대규모 수정 금지
- Forbidden 우회 금지
- 검증 실패 상태에서 DONE 처리 금지
- secret/token/password/API key 원문 출력 금지
