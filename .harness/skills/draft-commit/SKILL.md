# draft-commit

## 목적

`git status`와 diff 요약을 바탕으로 한국어 커밋 메시지 초안을 작성한다.

## 절차

1. 변경 파일과 작업 ID를 확인한다.
2. 변경 범위가 하나의 작업으로 묶이는지 확인한다.
3. 커밋 메시지를 `:gitmoji: type: subject` 형식으로 제안한다.
4. 실제 커밋은 실행하지 않는다.

## 권장 형식

```text
:memo: docs: 하네스 운영 문서를 정리한다
```

## 금지

- 실제 `git commit` 실행 금지
- secret/token/password/API key 원문 출력 금지
- 변경 범위가 불명확한데 커밋 메시지를 단정 금지
