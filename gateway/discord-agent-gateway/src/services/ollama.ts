import type { GatewayConfig } from "../config.js";

export type ServiceStatus = {
  ok: boolean;
  detail?: string;
};

export type OllamaStatus = ServiceStatus & {
  models: string[];
  defaultModelAvailable: boolean;
};

type OllamaGenerateResponse = {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
  error?: {
    message?: string;
  };
};

type OllamaModelsResponse = {
  data?: Array<{
    id?: string;
  }>;
  error?: {
    message?: string;
  };
};

const CHICKEN_SYSTEM_PROMPT =
  "너는 Chicken이다. Chicken은 Discord 기반 AI Agent Gateway의 PM/라우터 봇이다. " +
  "사용자의 개발 요청을 이해하고, 간단한 질문은 직접 답하며, 복잡한 코딩/문서/검토 작업은 다른 AI 에이전트에게 넘기기 쉽게 정리한다. " +
  "항상 자연스러운 한국어로 짧고 실용적으로 답한다. 번역체 표현을 피한다. 모르면 추측하지 말고 확인할 명령어와 다음 단계를 제시한다.";

const OLLAMA_REQUEST_TIMEOUT_MS = 60_000;

export async function getOllamaStatus(config: GatewayConfig): Promise<OllamaStatus> {
  try {
    const response = await fetch(new URL("models", ensureTrailingSlash(config.ollamaBaseUrl)));
    const payload = (await response.json()) as OllamaModelsResponse;
    const models = payload.data?.map((model) => model.id).filter(isPresent) ?? [];
    const defaultModelAvailable = models.includes(config.ollamaDefaultModel);

    if (!response.ok) {
      return {
        ok: false,
        detail: payload.error?.message ?? `HTTP ${response.status}`,
        models,
        defaultModelAvailable
      };
    }

    return {
      ok: true,
      detail: `HTTP ${response.status}, ${models.length} model(s) found`,
      models,
      defaultModelAvailable
    };
  } catch {
    return {
      ok: false,
      detail: `unreachable at ${config.ollamaBaseUrl}`,
      models: [],
      defaultModelAvailable: false
    };
  }
}

export async function askOllama(
  config: GatewayConfig,
  prompt: string,
  modelOverride?: string
): Promise<string> {
  const selectedModel = modelOverride?.trim() || config.ollamaDefaultModel;

  if (!selectedModel) {
    return [
      "Ollama 모델이 설정되지 않았습니다.",
      "`OLLAMA_DEFAULT_MODEL`을 `.env`에 설정한 뒤 다시 시도하세요.",
      "예: `OLLAMA_DEFAULT_MODEL=qwen2.5-coder:3b`"
    ].join("\n");
  }

  let response: Response;
  const startedAt = Date.now();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), OLLAMA_REQUEST_TIMEOUT_MS);

  try {
    console.log(
      `Ollama ask-local request started: model=${selectedModel}, timeoutMs=${OLLAMA_REQUEST_TIMEOUT_MS}`
    );

    response = await fetch(new URL("chat/completions", ensureTrailingSlash(config.ollamaBaseUrl)), {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: selectedModel,
        messages: [
          {
            role: "system",
            content: CHICKEN_SYSTEM_PROMPT
          },
          {
            role: "user",
            content: prompt
          }
        ],
        stream: false
      })
    });
  } catch (error) {
    const durationMs = Date.now() - startedAt;

    if (isAbortError(error)) {
      console.error(
        `Ollama ask-local request timed out: model=${selectedModel}, durationMs=${durationMs}`
      );
      return [
        "Ollama 응답 시간이 60초를 초과했습니다.",
        "모델이 로딩 중이거나 요청이 너무 오래 걸릴 수 있습니다.",
        "잠시 후 다시 시도하거나 더 짧은 prompt로 요청하세요."
      ].join("\n");
    }

    console.error(
      `Ollama ask-local request failed: model=${selectedModel}, durationMs=${durationMs}`
    );
    return [
      "Ollama에 연결할 수 없습니다.",
      "`OLLAMA_BASE_URL`이 실행 중인 Ollama OpenAI-compatible endpoint를 가리키는지 확인하세요.",
      "기본값: `http://localhost:11434/v1`"
    ].join("\n");
  } finally {
    clearTimeout(timeout);
  }

  const payload = (await response.json()) as OllamaGenerateResponse;
  const durationMs = Date.now() - startedAt;

  if (!response.ok) {
    const detail = payload.error?.message ?? `HTTP ${response.status}`;
    console.error(
      `Ollama ask-local request failed: model=${selectedModel}, status=${response.status}, durationMs=${durationMs}`
    );
    return [
      "Ollama 요청이 실패했습니다.",
      `상태: ${detail}`,
      "Ollama가 실행 중인지, 선택한 model이 pull 되었는지 확인하세요."
    ].join("\n");
  }

  const content = payload.choices?.[0]?.message?.content?.trim();
  console.log(
    `Ollama ask-local request succeeded: model=${selectedModel}, status=${response.status}, durationMs=${durationMs}`
  );
  return content || "Ollama가 빈 응답을 반환했습니다.";
}

function ensureTrailingSlash(value: string): string {
  return value.endsWith("/") ? value : `${value}/`;
}

function isPresent(value: string | undefined): value is string {
  return typeof value === "string" && value.length > 0;
}

function isAbortError(error: unknown): boolean {
  return error instanceof Error && error.name === "AbortError";
}
