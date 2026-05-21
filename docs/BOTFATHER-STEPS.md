# BotFather 수동 설정 절차

Telegram Bot token은 반드시 사용자가 직접 발급한다. 이 저장소는 BotFather를 자동화하지 않는다.

## bot 생성

1. Telegram 앱에서 `@BotFather`를 검색해 대화를 연다.
2. `/start`를 보낸다.
3. `/newbot`을 보낸다.
4. 표시될 bot 이름을 입력한다. 예: `OpenClaw Dev Gateway`
5. username을 입력한다. username은 반드시 `bot`으로 끝나야 한다. 예: `my_openclaw_dev_bot`
6. BotFather가 token을 표시하면 안전한 비밀 저장소에 보관한다.

## token 보안

- token을 git에 커밋하지 않는다.
- token을 채팅, 이슈, PR 설명, 로그에 붙여 넣지 않는다.
- token이 노출되면 BotFather에서 즉시 재발급한다.
- 이 저장소의 `config/*.template.json`과 `config/openclaw.env.example`에는 실제 token을 넣지 않는다.

## bot 시작

1. BotFather가 알려 준 bot username 링크를 연다.
2. bot에게 `/start`를 보낸다.
3. OpenClaw 설정에서 `dmPolicy`가 `pairing`이면 pairing 절차를 진행한다.
4. `allowlist`를 사용할 경우 Telegram numeric user id를 확인해 설정에 넣는다.

## token 입력 위치

Windows CMD에서 아래 스크립트를 실행한다.

```bat
scripts\04-configure-telegram.bat
```

스크립트는 token을 화면에 다시 출력하지 않고 `%USERPROFILE%\.openclaw\openclaw.json`에 저장한다. 이 경로는 git 저장소 밖이다.
