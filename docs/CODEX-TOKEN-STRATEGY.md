# Codex 토큰 관리 전략

이 문서는 Claude Code 중심의 토큰 관리 습관을 Codex CLI 환경에 맞게 바꾼 운영 하네스를 설명한다.

## 바꾼 이유

토큰 절약은 프롬프트를 짧게 쓰는 일이 아니라 Codex에게 지금 필요한 정보만 보여주는 일이다. 전체 repo, 긴 로그, 전체 diff를 매번 넣으면 모델이 중요한 변경 지점을 놓치고 비용도 커진다.

## Codex CLI 방식

- Claude Code의 `/clear` 대신 새 `codex exec` 세션을 시작한다.
- `/compact` 대신 `context/HANDOFF.md`를 80줄 이하로 갱신한다.
- `CLAUDE.md` 대신 repo 루트의 `AGENTS.md`를 인덱스로 사용한다.
- Skills는 `prompts/skills/*/SKILL.md`와 `references/`로 나눠 구현한다.
- `.claudeignore` 대신 `context/ignore-patterns.txt`와 `scripts/collect-min-context.bat`로 읽지 않을 범위를 관리한다.

## 운영 루프

1. Plan-only: read-only로 목표와 필요한 파일만 정한다.
2. Targeted edit: 허용 파일 안에서만 수정한다.
3. Diff review: 현재 diff 기준으로 위험만 검토한다.
4. Handoff: 다음 세션이 이어받을 수 있게 짧게 정리한다.

## ChatGPT 의존도 줄이기

- ChatGPT 대화도 길어지면 컨텍스트 비용이 생긴다.
- 반복 작업은 ChatGPT에 묻지 말고 Codex `run-next`로 처리한다.
- ChatGPT에게 묻기 전에 `HANDOFF.md`, `TASK_QUEUE.md`, `DECISION_LOG.md`를 먼저 확인한다.
- 막힌 경우에는 문제 요약 20줄 이하, 관련 파일 5개 이하, 실패 로그 핵심만 가져와 질문한다.

## OpenClaw/Telegram 보고 방식

- 긴 로그를 Telegram으로 보내지 않는다.
- 성공 보고는 변경 요약과 검증 결과만 보낸다.
- 실패 보고는 에러 핵심, 원인 후보, 다음 한 단계만 보낸다.
- token, secret, password는 어떤 채널에도 출력하지 않는다.

## 나쁜 요청 예시

```text
repo 전체를 읽고 알아서 고쳐줘.
로그 전체를 보고 원인을 찾아줘.
모든 테스트와 빌드를 다 돌리고 배포까지 해줘.
.env를 확인해서 설정을 맞춰줘.
```

## 좋은 요청 예시

```text
context/current-focus.md와 context/HANDOFF.md만 읽고 계획만 세워줘.
수정 허용 파일은 A와 B뿐이야. 이 범위에서만 고쳐줘.
이 에러 로그 마지막 80줄 기준으로 원인 후보 3개만 말해줘.
현재 git diff만 리뷰하고 치명적 문제만 알려줘.
```

## 권장 운영 루틴

```bat
scripts\collect-min-context.bat
scripts\codex-plan-only.bat
scripts\codex-targeted-edit.bat prompts\token\02-targeted-edit.md
scripts\codex-diff-review.bat
scripts\codex-handoff.bat
```

작업이 길어지면 `prompts/token/06-session-compact.md` 기준으로 세션을 정리하고 새 `codex exec` 세션에서 이어간다.
