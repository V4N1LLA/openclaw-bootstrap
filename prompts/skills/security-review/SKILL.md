# Security Review Skill

인증, 인가, secret, 입력 검증, 배포 전 점검에 사용한다. 실제 secret 값을 읽지 않고 정책과 코드 경로만 확인한다.

## 먼저 읽을 references

- Secret 점검: `references/secrets-policy.md`
- 인증/인가 점검: `references/auth-checklist.md`
- 입력 검증 점검: `references/input-validation.md`

## 핵심 규칙

- secret, token, password 값을 읽거나 출력하지 않는다.
- 인증과 인가를 분리해서 확인한다.
- 사용자 입력이 저장, 실행, 외부 호출에 들어가는 경로를 추적한다.
- 로그와 에러 응답에 민감값이 노출되는지 확인한다.
- 배포 권한과 자동화 권한은 최소 권한을 기준으로 본다.
- 발견사항은 영향과 재현 조건 중심으로 짧게 쓴다.
