# Secret 정책

- `.env`, secret store, credential 파일을 직접 읽지 않는다.
- secret 존재 여부가 필요하면 파일명과 설정 키 이름까지만 확인한다.
- token, password, private key는 로그와 응답에 출력하지 않는다.
- secret rotation 절차가 있는지 확인한다.
- CI secret은 권한 범위와 환경 분리를 확인한다.
- 예시 값도 실제 형식과 혼동되지 않게 placeholder를 사용한다.
