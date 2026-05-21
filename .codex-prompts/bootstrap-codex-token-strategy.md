# 작업: Codex 토큰 관리 전략 하네스 생성

현재 저장소는 Windows 기반 OpenClaw + Telegram + Codex CLI 자동화를 위한 bootstrap 저장소다.

이번 작업의 목표는 Claude Code 중심의 토큰 관리 전략을 Codex CLI 환경에 맞게 변환하여, Codex가 최대한 적은 토큰으로 개발하도록 돕는 하네스를 추가하는 것이다.

## 핵심 배경

토큰 절약의 핵심은 프롬프트를 무조건 짧게 쓰는 것이 아니라, Codex에게 지금 필요한 정보만 보여주는 것이다.

Codex는 다음 원칙을 따라야 한다.

1. 전체 저장소를 무작정 읽지 않는다.
2. 먼저 작업 범위를 좁힌다.
3. 관련 파일 후보만 찾는다.
4. 수정 허용 파일만 수정한다.
5. 긴 로그와 전체 diff를 그대로 반복 출력하지 않는다.
6. 작업이 끝나면 HANDOFF.md에 짧게 인계한다.
7. 다음 작업은 새 codex exec 세션으로 시작한다.
8. AGENTS.md는 모든 지식을 담는 문서가 아니라, 어디를 읽을지 알려주는 인덱스로 쓴다.
9. 반복 절차는 prompts/skills로 분리한다.
10. OpenClaw/Telegram 보고는 짧은 요약 중심으로 한다.

## 생성할 파일 구조

다음 파일과 폴더를 현재 저장소에 추가하라.

codex/
- global.AGENTS.md
- root.AGENTS.md
- token-budget.AGENTS.md
- handoff.AGENTS.md

context/
- ignore-patterns.txt
- context-map.md
- current-focus.md
- HANDOFF.md

prompts/token/
- 00-plan-only.md
- 01-context-request.md
- 02-targeted-edit.md
- 03-diff-review.md
- 04-log-debug.md
- 05-handoff.md
- 06-session-compact.md

prompts/skills/backend-api/
- SKILL.md
- references/controller-rules.md
- references/dto-rules.md
- references/error-response.md
- references/test-rules.md

prompts/skills/frontend-page/
- SKILL.md
- references/component-rules.md
- references/form-rules.md
- references/api-query-rules.md
- references/ui-rules.md

prompts/skills/security-review/
- SKILL.md
- references/secrets-policy.md
- references/auth-checklist.md
- references/input-validation.md

scripts/
- collect-min-context.bat
- codex-plan-only.bat
- codex-targeted-edit.bat
- codex-diff-review.bat
- codex-handoff.bat
- codex-log-tail.bat

docs/
- CODEX-TOKEN-STRATEGY.md

## 공통 규칙

- 모든 문서와 주석은 한국어로 작성한다.
- 실제 서비스 코드는 생성하지 않는다.
- git commit 하지 않는다.
- git push 하지 않는다.
- 외부 패키지를 설치하지 않는다.
- OpenClaw를 실행하지 않는다.
- Telegram token, OpenAI token, .env, secret, password를 읽거나 출력하지 않는다.
- 위험한 sandbox 우회 옵션을 사용하지 않는다.
- 문서는 길게 쓰지 말고 인덱스와 참조 분리 구조로 작성한다.
- 각 SKILL.md는 짧게 유지하고, 자세한 규칙은 references/로 분리한다.

## 파일별 요구사항

### codex/global.AGENTS.md

사용자의 전역 Codex 규칙을 작성한다.

반드시 포함할 것:

- 모든 문서, 커밋 메시지, PR 설명은 한국어로 작성한다.
- 답변은 짧고 실행 중심으로 한다.
- 전체 repo 탐색을 기본값으로 하지 않는다.
- 필요한 파일만 읽는다.
- 같은 파일을 반복해서 읽지 않는다.
- 전체 파일 내용을 답변에 붙여넣지 않는다.
- 긴 로그는 핵심 부분만 요약한다.
- 작업은 계획 → 제한 수정 → diff 리뷰 → 검증 → handoff 순서로 진행한다.
- push, merge, deploy는 사용자 승인 없이 하지 않는다.
- secret, token, password를 읽거나 출력하지 않는다.

완료 보고 형식:

1. 변경 요약
2. 변경 파일
3. 실행한 검증
4. 남은 TODO
5. 추천 커밋 메시지

### codex/root.AGENTS.md

실제 서비스 repo 루트에 복사할 AGENTS.md 템플릿이다.

목적:
- 모든 정보를 담는 문서가 아니라, 읽어야 할 문서를 안내하는 인덱스 역할을 한다.

포함할 것:
- 프로젝트 목표
- 기술 스택
- 자주 쓰는 명령어
- 작업 전 읽을 최소 문서
- 작업별 추가 문서
- 금지사항
- 토큰 절약 규칙
- HANDOFF.md 작성 규칙

### codex/token-budget.AGENTS.md

토큰 예산 규칙을 작성한다.

포함할 것:

## 입력 컨텍스트 절약
- 처음에는 AGENTS.md, context/current-focus.md, context/HANDOFF.md만 확인한다.
- 작업과 무관한 폴더를 열지 않는다.
- node_modules, dist, build, coverage, logs, .env, lock 파일, 이미지, 동영상, 바이너리는 읽지 않는다.
- 검색 결과가 많으면 상위 5개만 확인한다.
- 긴 파일은 필요한 섹션만 확인한다.

## 출력 컨텍스트 절약
- 전체 파일 내용을 출력하지 않는다.
- 성공 로그 전체를 출력하지 않는다.
- 실패 로그는 원인에 필요한 부분만 요약한다.
- 변경 설명은 diff 요약 중심으로 한다.
- 이미 합의한 배경을 반복하지 않는다.

## 수정 범위 절약
- 수정 허용 파일 외에는 건드리지 않는다.
- 포맷팅만 바뀌는 변경을 피한다.
- 기능 구현과 리팩토링을 섞지 않는다.
- 문서는 필요한 섹션만 수정한다.

### codex/handoff.AGENTS.md

세션 종료와 인계를 위한 규칙을 작성한다.

HANDOFF.md는 다음 형식을 따른다.

- 현재 목표:
- 완료한 것:
- 수정한 파일:
- 확인한 사실:
- 실패한 시도:
- 남은 문제:
- 다음 한 단계:
- 검증 상태:
- 추천 커밋 메시지:

HANDOFF.md는 80줄 이하로 유지한다.

### context/ignore-patterns.txt

Codex가 일반적으로 읽지 말아야 할 패턴을 작성한다.

포함할 것:
- node_modules/
- dist/
- build/
- coverage/
- .cache/
- .next/
- out/
- target/
- logs/
- *.log
- *.db
- *.sqlite
- .env
- .env.*
- package-lock.json
- yarn.lock
- pnpm-lock.yaml
- gradle.lockfile
- *.png
- *.jpg
- *.jpeg
- *.gif
- *.webp
- *.mp4
- *.zip
- *.tar
- *.gz

단, lock 파일은 의존성 충돌 분석이 목표일 때만 사용자가 명시적으로 허용할 수 있다고 설명한다.

### context/context-map.md

서비스 repo에 적용할 컨텍스트 맵 템플릿을 작성한다.

내용:
- repo 구조 요약
- 주요 문서 위치
- backend 주요 위치
- frontend 주요 위치
- 테스트 명령어
- 빌드 명령어
- 자주 읽는 파일
- 거의 읽지 말아야 할 파일
- 작업별 시작점

### context/current-focus.md

현재 작업 초점을 기록하는 템플릿이다.

포함할 것:
- 현재 작업:
- 수정 허용 범위:
- 읽어도 되는 파일:
- 읽지 말아야 할 파일:
- 완료 조건:
- 검증 명령어:
- 마지막 업데이트:

### context/HANDOFF.md

빈 인계 템플릿을 작성한다.

80줄 이하로 유지하라는 주석을 포함한다.

### prompts/token/00-plan-only.md

파일 수정 없이 계획만 세우는 프롬프트다.

요구사항:
- sandbox read-only에서 실행하는 것을 전제로 작성한다.
- 전체 repo 탐색 금지
- 처음에는 AGENTS.md, context/current-focus.md, context/HANDOFF.md만 읽기
- 추가로 필요한 파일은 최대 5개만 요청
- 구현하지 않기
- 출력은 30줄 이하

### prompts/token/01-context-request.md

정보가 부족할 때 전체 탐색 대신 필요한 파일만 요청하는 프롬프트다.

요구사항:
- 필요한 파일 목록 최대 5개
- 각 파일이 필요한 이유 한 줄
- 파일을 받기 전 추측 구현 금지
- 전체 repo 탐색 금지

### prompts/token/02-targeted-edit.md

제한된 파일만 수정하는 프롬프트다.

요구사항:
- 수정 허용 파일 목록을 사용자가 제공한다는 전제
- 허용 파일 외 수정 금지
- 관련 없는 리팩토링 금지
- 검증 명령은 필요한 것만 실행
- 완료 후 전체 코드 출력 금지
- git diff 요약만 보고

### prompts/token/03-diff-review.md

현재 git diff만 리뷰하는 프롬프트다.

요구사항:
- 파일 수정 금지
- 전체 repo 탐색 금지
- git diff 기준으로만 리뷰
- 치명적 문제, 테스트 누락, 문서 누락, 보안 문제만 지적
- 사소한 스타일 지적 금지
- 출력 40줄 이하

### prompts/token/04-log-debug.md

로그 기반 디버깅 프롬프트다.

요구사항:
- 로그 전체 출력 금지
- 에러 핵심 부분만 사용
- 원인 후보 1~3개
- 최소 수정 후보 1~3개
- 바로 대규모 리팩토링 금지
- 추가로 필요한 파일 최대 5개 요청

### prompts/token/05-handoff.md

작업 종료 시 HANDOFF.md를 갱신하는 프롬프트다.

요구사항:
- HANDOFF.md 80줄 이하
- 완료한 것과 다음 한 단계만 명확히
- 실패한 시도와 확인한 사실 분리
- 긴 설명 금지

### prompts/token/06-session-compact.md

긴 세션을 정리하고 새 세션으로 넘어가기 위한 요약 프롬프트다.

요구사항:
- 현재 세션 요약 50줄 이하
- 다음 세션이 바로 시작할 수 있도록 작성
- 완료/미완료/주의사항 분리
- 불필요한 대화 이력 제거
- context/HANDOFF.md 갱신 기준 포함

### prompts/skills/*

각 SKILL.md는 다음 원칙을 따른다.

- 언제 이 skill을 사용할지 짧게 설명
- 먼저 읽을 references 파일을 안내
- 핵심 규칙만 포함
- 세부 규칙은 references/로 분리
- 120줄 이하 권장

backend-api skill:
- Spring Boot API 구현 시 사용
- Controller, Service, DTO, Error Response, Test 기준

frontend-page skill:
- React 페이지/폼/API 연결 시 사용
- Component, Form, Query, UI 기준

security-review skill:
- 인증, 인가, secret, 입력 검증, 배포 전 점검 시 사용

### scripts/collect-min-context.bat

현재 repo의 최소 컨텍스트만 수집한다.

동작:
- .codex-context 폴더 생성
- git branch --show-current
- git status --short
- git diff --stat
- 루트 파일 목록
- AGENTS.md 존재 여부
- context/current-focus.md 존재 여부
- context/HANDOFF.md 존재 여부
- 결과를 .codex-context/current-context.txt에 저장

금지:
- .env 읽기 금지
- token 출력 금지
- 전체 파일 내용 덤프 금지

### scripts/codex-plan-only.bat

prompts/token/00-plan-only.md를 codex exec로 실행한다.

명령 형식:
type prompts\token\00-plan-only.md | codex exec --cd . --sandbox read-only -

### scripts/codex-targeted-edit.bat

사용법:
scripts\codex-targeted-edit.bat <prompt-file>

동작:
type <prompt-file> | codex exec --cd . --sandbox workspace-write -

프롬프트 파일이 없으면 사용법 출력.

### scripts/codex-diff-review.bat

prompts/token/03-diff-review.md를 read-only로 실행한다.

### scripts/codex-handoff.bat

prompts/token/05-handoff.md를 workspace-write로 실행한다.

### scripts/codex-log-tail.bat

로그 파일 경로와 줄 수를 인자로 받아 마지막 N줄만 .codex-context/error-tail.txt에 저장한다.

사용법:
scripts\codex-log-tail.bat logs\app.log 80

기본값:
줄 수를 생략하면 80줄.

### docs/CODEX-TOKEN-STRATEGY.md

다음을 설명하는 문서를 작성한다.

- Claude Code 전략을 Codex CLI에 맞게 바꾼 이유
- Codex에서 /clear 대신 새 codex exec 세션을 쓰는 방식
- /compact 대신 HANDOFF.md를 쓰는 방식
- CLAUDE.md 대신 AGENTS.md를 쓰는 방식
- Skills를 prompts/skills로 구현하는 방식
- .claudeignore 대신 ignore-patterns.txt와 collect-min-context를 쓰는 방식
- Plan-only → Targeted edit → Diff review → Handoff 루프
- OpenClaw/Telegram에서 짧게 보고하는 방식
- 나쁜 요청 예시
- 좋은 요청 예시
- 권장 운영 루틴

## 완료 후 보고

짧게 보고하라.

1. 생성한 파일 목록
2. Codex 토큰 전략 핵심
3. 사용 순서
4. 다음 명령어
5. 추천 커밋 메시지