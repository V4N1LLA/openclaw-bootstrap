# Backend API Skill

Spring Boot API 구현 또는 리뷰에 사용한다. Controller, Service, DTO, Error Response, Test 기준을 짧게 확인하고 필요한 references만 읽는다.

## 먼저 읽을 references

- Controller 변경: `references/controller-rules.md`
- DTO 변경: `references/dto-rules.md`
- 에러 응답 변경: `references/error-response.md`
- 테스트 변경: `references/test-rules.md`

## 핵심 규칙

- 요청/응답 계약을 먼저 확인한다.
- Controller에는 HTTP 입출력과 검증 연결만 둔다.
- 비즈니스 규칙은 Service에 둔다.
- DTO는 외부 계약이므로 필드 변경 시 영향 범위를 확인한다.
- 에러 응답은 일관된 형식으로 반환한다.
- 테스트는 변경한 계약과 실패 경로를 우선 검증한다.
- 관련 없는 리팩토링과 포맷팅 변경을 피한다.
