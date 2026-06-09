# verify-task playbook

## 사용 시점

`OCB-001-D 검증만 해줘`처럼 검증만 요청받았을 때 사용한다.

## 절차

1. `/mnt/c/dev/openclaw-bootstrap`에서 시작한다.
2. `pwd`, `git branch --show-current`, `git status --short`를 확인한다.
3. `TASKS.md`에서 작업 ID를 찾는다.
4. Validation 항목만 확인한다.
5. 파일 수정 없이 지정된 Validation만 실행한다.
6. 결과와 현재 Status만 보고한다.

## 금지

- 파일 수정 금지
- 작업 상태 변경 금지
- 커밋/push 금지
- secret/token/password/API key 원문 출력 금지
