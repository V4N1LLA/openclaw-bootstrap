# Telegram Pairing과 Allowlist

OpenClaw Telegram 연결은 누가 bot을 통해 Gateway에 접근할 수 있는지 제한해야 한다. 기본 선택지는 `pairing`과 `allowlist`다.

## pairing

`pairing`은 처음 연결할 때 사용자가 짧은 연결 절차를 거치게 하는 방식이다.

장점:

- 초기 설정이 쉽다.
- Telegram user id를 모르는 상태에서도 시작할 수 있다.
- 테스트 환경에 적합하다.

주의점:

- pairing 절차가 열린 동안 의도하지 않은 사용자가 접근하지 않도록 시간과 채널을 제한한다.
- 운영에 가까운 환경에서는 오래 유지하지 않는다.

## allowlist

`allowlist`는 지정한 Telegram numeric user id만 허용하는 방식이다.

장점:

- 접근 주체가 명확하다.
- 안정화된 개인 개발 환경에 적합하다.
- 실수로 다른 계정이 연결될 가능성을 줄인다.

주의점:

- numeric user id를 정확히 알아야 한다.
- 계정 변경 시 설정을 갱신해야 한다.

## 추천 흐름

1. 처음 연결할 때는 `pairing`을 사용한다.
2. bot 응답과 Gateway 상태가 정상인지 확인한다.
3. 사용할 Telegram numeric user id를 확인한다.
4. `scripts\04-configure-telegram.bat`를 다시 실행해 `allowlist`로 전환한다.
5. `scripts\05-restart-gateway.bat`로 Gateway를 재시작한다.

템플릿은 아래 파일을 참고한다.

```text
config\openclaw.telegram.pairing.template.json
config\openclaw.telegram.allowlist.template.json
```
