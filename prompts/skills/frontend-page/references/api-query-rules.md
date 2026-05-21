# API Query 규칙

- 기존 query client, hook, fetch wrapper를 우선 사용한다.
- loading, error, refetch, stale 상태를 확인한다.
- mutation 성공 후 필요한 cache invalidation을 수행한다.
- API 에러 메시지는 사용자에게 필요한 수준으로 변환한다.
- retry가 위험한 mutation에는 자동 재시도를 피한다.
- 인증 실패와 권한 부족 상태를 구분한다.
