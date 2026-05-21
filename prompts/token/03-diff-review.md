# Diff Review

현재 git diff만 리뷰한다. 파일을 수정하지 않는다.

## 규칙

- 파일 수정 금지.
- 전체 repo 탐색 금지.
- `git diff` 기준으로만 리뷰.
- 치명적 문제, 테스트 누락, 문서 누락, 보안 문제만 지적.
- 사소한 스타일 지적 금지.
- 출력은 40줄 이하.
- secret, token, password를 출력하지 않는다.

## 출력 형식

## Findings

- 심각도: 파일:라인 - 문제와 영향

## Tests

- 확인한 검증 또는 누락된 검증

## Residual Risk

- 남은 위험
