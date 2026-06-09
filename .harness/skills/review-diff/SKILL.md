# review-diff

## 목적

변경 범위가 작업 ID와 일치하는지 검토하고, 금지사항 위반 여부와 검증 상태를 확인한다.

## 절차

1. `TASKS.md`에서 작업 ID의 Scope, Validation, Forbidden을 확인한다.
2. `git status --short`로 변경 파일을 확인한다.
3. 변경 파일이 Scope와 일치하는지 검토한다.
4. Forbidden 위반 가능성을 확인한다.
5. build/test 검증 실행 여부를 확인한다.
6. 위험한 변경이 있으면 `STOP`으로 보고한다.

## STOP 기준

- 작업 범위 밖 파일 수정
- secret/token/password/API key 원문 포함 가능성
- `.env` 생성 또는 커밋 대상 포함
- shell/Git/PR/deploy 자동화가 승인 없이 추가됨
- 검증 실패를 무시하고 DONE 처리하려는 경우
