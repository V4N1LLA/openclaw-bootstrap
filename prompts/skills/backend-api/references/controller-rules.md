# Controller 규칙

- URL, method, status code가 기존 API 패턴과 맞는지 확인한다.
- 인증/인가가 필요한 endpoint인지 먼저 확인한다.
- 요청 검증은 DTO annotation 또는 명시적 validator로 처리한다.
- Controller에서 복잡한 비즈니스 분기를 만들지 않는다.
- 응답 status와 body가 문서 또는 기존 관례와 일치해야 한다.
- pagination, sorting, filtering은 기존 naming을 따른다.
- 로그에는 token, password, 개인정보를 남기지 않는다.
