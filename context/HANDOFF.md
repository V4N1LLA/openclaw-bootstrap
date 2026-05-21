# HANDOFF

<!-- 80줄 이하로 유지한다. token, secret, password를 적지 않는다. -->

- 현재 목표: TASK-011 MVP repo bootstrap 스크립트 초안 작성
- 완료한 것: `scripts/init-mvp-repo.bat` dry-run 기본 스크립트 추가
- 완료한 것: `APPLY=1`에서도 기존 `AGENTS.md`와 `codex/*.AGENTS.md`는 덮어쓰지 않고 SKIP하도록 수정
- 완료한 것: `docs/MVP-BOOTSTRAP.md`에 보조 스크립트 사용법 추가
- 참고: 대상 repo는 직접 생성하지 않고, `APPLY=1`일 때만 기존 대상 경로에 문서 파일을 준비함
- 검증: `git diff --stat` 실행 완료
- 현재 상태: TASK-011 DONE
- 다음 단계: 다음 자동 루프에서 우선순위 규칙에 따라 다음 TODO 하나 선택
- 추천 커밋 메시지: `:memo: scripts: MVP repo bootstrap 초안을 추가한다`
