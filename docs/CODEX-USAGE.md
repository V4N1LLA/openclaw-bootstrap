# Codex CLI 사용

Codex CLI를 사용하면 이 부트스트랩 저장소의 문서, 설정 템플릿, 스크립트를 생성하거나 검토할 수 있다. 다만 Codex에게 token, password, secret 값을 제공하지 않는다.

## 생성 실행 예시

Windows CMD에서 프롬프트 파일을 Codex에 전달할 수 있다.

```bat
type .codex-prompts\bootstrap-openclaw-telegram.md | codex exec --cd . --sandbox workspace-write -
```

PowerShell에서는 아래처럼 실행할 수 있다.

```powershell
Get-Content -Raw .codex-prompts\bootstrap-openclaw-telegram.md | codex exec --cd . --sandbox workspace-write -
```

## 수정 요청 예시

```bat
codex exec --cd . --sandbox workspace-write "scripts\04-configure-telegram.bat가 token을 출력하지 않는지 검토하고 필요한 수정을 해줘"
```

## 리뷰 요청 예시

```bat
codex exec --cd . --sandbox read-only "이 저장소를 보안 관점에서 리뷰해줘"
```

## 사용 원칙

- Codex 프롬프트에 실제 Telegram token을 넣지 않는다.
- Codex에게 git commit, git push, merge, deploy를 자동으로 맡기지 않는다.
- 로컬 secret 파일을 읽도록 요청하지 않는다.
- 필요한 작업 디렉터리만 sandbox 범위에 포함한다.
- 변경 후 사람이 diff를 검토한다.

## 권장 검토 명령

```bat
git status --short
git diff -- README.md docs scripts config .gitignore
```

생성된 스크립트는 사용자가 직접 실행해야 하며, Codex 실행 중에는 외부 패키지 설치나 OpenClaw Gateway 실행을 하지 않는 것이 기본 원칙이다.
