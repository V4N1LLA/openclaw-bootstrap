# prepare-pr

## 목적

PR 설명 초안과 `gh pr create`에 사용할 제목/본문을 작성한다.

이 skill 자체는 실제 PR 생성을 실행하지 않는다. 실제 PR 생성은 사용자가 명시적으로 요청했고 `.harness/playbooks/create-pr.md`가 선택된 경우에만 진행한다.

## 포함 항목

- 요약
- 변경 파일 또는 변경 영역
- 검증 결과
- 위험 요소
- 후속 작업
- secret/token/password/API key 원문이 포함되지 않았다는 확인

## 절차

1. 작업 ID와 변경 범위를 확인한다.
2. `review-diff` 기준으로 위험 항목을 확인한다.
3. PR 설명 초안을 한국어로 작성한다.
4. PR 생성 명령이 필요한 경우에도 제목과 본문까지만 준비한다.
5. `gh pr create` 실행 여부는 create-pr playbook에서 결정한다.

## PR 본문 기본 구조

```md
## 변경 요약

## 주요 변경

## 검증

## 보안/주의사항

## 후속 TODO
```

## 금지

- 이 skill 단독으로 실제 PR 생성 금지
- push 금지
- merge 금지
- deploy 자동화 금지
- secret/token/password/API key 원문 출력 금지
