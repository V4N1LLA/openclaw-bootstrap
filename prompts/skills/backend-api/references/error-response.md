# Error Response 규칙

- 에러 형식은 기존 공통 포맷을 따른다.
- HTTP status와 application error code를 구분한다.
- validation error는 필드별 원인을 확인 가능하게 한다.
- 인증 실패와 인가 실패를 구분한다.
- stack trace, SQL, secret 값은 응답에 포함하지 않는다.
- 알 수 없는 예외는 일반 메시지로 감싸고 내부 로그에서만 추적한다.
