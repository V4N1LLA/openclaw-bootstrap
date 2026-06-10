# 현재 작업 초점

- 현재 작업: OCB-CONTEXT-REFRESH openclaw-bootstrap 상태 문서 최신화
- 현재 브랜치: `main`
- 현재 상태: `main` HEAD는 `origin/main`과 동기화된 최신 상태
- 완료된 흐름: OCB-001 완료, PR #1~#5 merge 완료
- 완료된 정책/기능: CI gate 적용, Ollama fallback 적용, Local LLM-first 정책 적용
- 운영 전제: Telegram은 Discord 구축 전 임시 소통창구
- 최종 운영 기준: Discord PM/Sub-Agent 하네스
- 다음 우선 작업: OCB-SCOPE-GUARD
- 수정 허용 범위: `context/current-focus.md`, `context/HANDOFF.md`, `TASKS.md`의 next/current 항목
- 금지사항: 코드 변경 금지, 커밋 금지, push 금지, 패키지 설치 금지, secret/token/password/API key 원문 출력 금지
- 검증 명령: `git status --short --branch`, `git diff --stat`, `rg -n "OCB-SCOPE-GUARD|Discord PM/Sub-Agent|Telegram|PR #1|PR #5|Local LLM-first|Ollama fallback|CI gate" context/current-focus.md context/HANDOFF.md TASKS.md`
- 마지막 업데이트: 2026-06-11
