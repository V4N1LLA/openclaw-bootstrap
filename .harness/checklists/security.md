# security checklist

- [ ] secret/token/password/API key 원문을 읽거나 출력하지 않는다.
- [ ] `.env`는 커밋하지 않는다.
- [ ] 필요한 예시는 `.env.example`만 사용한다.
- [ ] 로그 전문을 출력하지 않고 핵심 오류만 요약한다.
- [ ] shell command 실행 자동화는 별도 승인 전까지 구현하지 않는다.
- [ ] Git write 자동화는 별도 승인 전까지 구현하지 않는다.
- [ ] PR/deploy 자동화는 별도 승인 전까지 구현하지 않는다.
- [ ] 외부 skill은 그대로 신뢰하지 않고 이 레포 규칙과 충돌 여부를 검토한다.
