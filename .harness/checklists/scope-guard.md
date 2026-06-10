# scope-guard checklist

작업 ID, 작업 목표, PR 목적, changed files가 서로 맞는지 확인한다.

## 작업 시작 전

- [ ] 작업 디렉터리가 `/mnt/c/dev/openclaw-bootstrap`이다.
- [ ] 작업 ID가 `TASKS.md`에 존재하거나, 사용자가 이번 명령에서 등록을 명시했다.
- [ ] 작업 목표를 한 문장으로 확인했다.
- [ ] 허용 파일 범위를 확인했다.
- [ ] 현재 changed files가 작업 Scope와 일치한다.

## 파일 수정 전

- [ ] 수정 대상 파일이 작업 Scope 안에 있다.
- [ ] 관련 없는 기존 변경을 발견하면 수정하지 않고 STOP 보고한다.
- [ ] 관련 없는 변경은 삭제, 되돌리기, 덮어쓰기를 하지 않는다.

## 커밋 전

- [ ] staged files가 작업 Scope와 일치한다.
- [ ] 커밋 메시지가 실제 변경 범위를 반영한다.
- [ ] docs-only 또는 policy-only 작업에 runtime/source 변경이 섞이지 않았다.

## PR 생성 전

- [ ] branch changed files가 PR 목적과 일치한다.
- [ ] PR 제목과 본문이 실제 changed files를 정확히 설명한다.
- [ ] 관련 없는 변경이 있으면 PR을 만들지 않고 STOP 보고한다.

## STOP 기준

- 작업 ID/목표와 changed files가 맞지 않는다.
- PR 목적과 branch changed files가 맞지 않는다.
- docs-only 또는 policy-only PR에 gateway runtime/source 변경이 섞였다.
- CI gate PR에 CI gate 목적 밖의 runtime 변경이 섞였다.
- secret/token/password/API key/raw secret 위험이 있다.

## STOP 보고

- 현재 작업 ID와 목표
- 허용 파일 범위
- 실제 changed files
- mismatch 파일 목록
- 별도 브랜치 후보로 보존할 파일 목록

관련 없는 변경은 버리지 않는다. 사용자가 승인하면 별도 브랜치 후보로 분리한다.
