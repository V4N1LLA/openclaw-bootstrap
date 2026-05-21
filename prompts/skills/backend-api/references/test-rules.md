# Backend Test 규칙

- 정상 경로와 주요 실패 경로를 함께 검증한다.
- Controller 테스트는 request, status, response body를 확인한다.
- Service 테스트는 비즈니스 분기와 repository 상호작용을 확인한다.
- 권한이 필요한 API는 인증 없음, 권한 부족, 정상 권한을 나눠 본다.
- fixture는 테스트 의도를 가리는 수준으로 커지지 않게 한다.
- 외부 서비스 호출은 mock 또는 test double을 사용한다.
