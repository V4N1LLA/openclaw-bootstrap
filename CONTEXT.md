# OCB-001 프로젝트 컨텍스트

## 레포 목적

이 레포는 OpenClaw를 로컬 개발 환경에서 안전하게 준비하고 확장하기 위한 부트스트랩 저장소다.

문서, 설정 템플릿, 실행 스크립트, 에이전트 작업 지시를 통해 로컬 자동화 작업의 진입점을 정리한다.

## 기존 역할

기존 역할은 OpenClaw Telegram Bootstrap이다.

Windows 개발자가 OpenClaw Gateway와 Telegram Bot 연결 환경을 준비할 수 있도록 문서, 설정 템플릿, 실행 스크립트를 제공한다. 실제 Telegram Bot token 발급이나 BotFather 자동화는 하지 않는다.

## 확장 목표

OCB-001의 확장 목표는 Discord + Ollama 기반 로컬 멀티 에이전트 Gateway 초안을 만드는 것이다.

Discord 명령을 통해 로컬 Gateway가 요청을 받고, Ollama 로컬 LLM 및 Agent Workbench 상태를 확인하거나 응답을 반환하는 흐름을 정의한다.

## Agent Workbench와의 관계

Agent Workbench는 개인 개발자가 여러 프로젝트의 작업 큐, 인계 문서, 의사결정, Git 상태, 실행 결과를 관리하는 개인 개발 운영 서비스다.

이 레포의 Discord + Ollama Gateway는 Agent Workbench와 직접 결합하기보다, 로컬에서 Agent Workbench 상태를 확인하거나 향후 연동할 수 있는 부트스트랩 계층으로 다룬다.

## 1차 MVP 성공 기준

- Discord에서 `/aw ask-local`을 입력할 수 있다.
- Gateway가 `/aw ask-local` 요청을 수신한다.
- Gateway가 Ollama 로컬 LLM에 질의한다.
- Ollama 응답이 Discord에 출력된다.
- Discord에서 `/aw status`를 입력할 수 있다.
- `/aw status`가 Gateway, Ollama, Agent Workbench 상태를 확인해 Discord에 출력한다.

## 1차 런타임 확인

2026-06-10 기준 Discord Gateway의 핵심 명령 런타임 확인을 완료했다.

- Discord `/aw status` 성공
- Discord `/aw ask-local` 성공
- 기본 빠른 모델 `qwen2.5-coder:3b` 응답 성공
- `/aw ask-local` 응답 로그 기준 `durationMs=11452`
- `qwen3:8b`는 기본값이 아니라 slow/high-quality 옵션으로 유지

## 보수적 범위

1차 MVP에서는 shell command 실행, Git write, PR 생성, deploy 자동화를 구현하지 않는다.
민감 정보는 환경 변수 또는 로컬 설정으로만 다루며 원문 출력하지 않는다.

## 로컬 LLM 모델 정책

Local LLM은 실제 개발 주체가 아니라 요약, 문서화, 커밋 메시지 초안, 반복 작업 보조를 담당한다.

기본 Discord 응답 모델은 빠른 응답을 우선해 `qwen2.5-coder:3b`를 권장한다.

`qwen3:8b`는 현재 PC에서 응답 지연이 커서 기본값으로 쓰지 않고, 느리지만 품질이 필요한 slow/high-quality 옵션으로 분리한다.

`/aw status`는 현재 기본 모델과 사용 가능한 Ollama 모델 목록을 보여줘야 한다.

## 하네스 운영 목표

이 레포는 Telegram에서 짧은 작업 지시를 받아도 에이전트가 `AGENTS.md`, `TASKS.md`, `WORKFLOW.md`, `CONTEXT.md`를 기준으로 일관되게 작업하도록 운영한다.

사용자는 매번 긴 컨텍스트, 금지사항, 검증 명령, 보고 형식을 반복하지 않아도 된다.

에이전트는 작업 ID를 받으면 `TASKS.md`의 작업 레지스트리를 먼저 확인하고, 안전 규칙과 작업 절차를 자동 적용한다.

## 하네스 확장 구조

`.harness/`는 짧은 Telegram 명령을 안정적인 작업 절차로 바꾸기 위한 로컬 운영 문서다.

- `skills/`: 반복 가능한 보조 지침
- `playbooks/`: 명령 유형별 실행 절차
- `checklists/`: 수정, 커밋, push, 보안 전 점검 기준

이 구조는 Claude Code Superpowers/Skills류 개발 프로세스처럼 재사용 가능한 절차를 문서화하되, 실제 실행 권한은 이 레포의 안전 규칙 안에 묶어 둔다.

목표 흐름은 `짧은 명령 -> 작업 해석 -> 실행 절차 -> 검증 -> 보고`다.
