# DTO 규칙

- Request DTO와 Response DTO를 섞지 않는다.
- 외부에 노출되는 필드명은 신중히 변경한다.
- nullable 여부와 기본값을 명확히 한다.
- validation message는 사용자에게 노출 가능한 문장으로 둔다.
- 내부 entity를 그대로 반환하지 않는다.
- 날짜, 금액, enum 형식은 기존 API 규칙을 따른다.
