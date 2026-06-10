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

type OllamaChatAttempt = {
  content?: string;
  detail?: string;
  durationMs: number;
  quotaLimited: boolean;
  status: number;
};

const LOCAL_ASSISTANT_SYSTEM_PROMPT = [
  "You are a local development assistant for Agent Workbench and OpenClaw Bootstrap.",
  "Help with documentation, summarization, commit message drafts, and repetitive work planning.",
  "Do not claim to execute shell commands, Git writes, PR creation, or deployment."
].join(" ");

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
  const fallbackModel = config.ollamaDefaultModel.trim();

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
            content: LOCAL_ASSISTANT_SYSTEM_PROMPT
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

    if (
      isQuotaLimited(response.status, detail) &&
      fallbackModel.length > 0 &&
      fallbackModel !== selectedModel
    ) {
      console.warn(
        `Ollama ask-local quota fallback started: from=${selectedModel}, to=${fallbackModel}`
      );
      const fallback = await tryAskOllamaWithModel(config, prompt, fallbackModel);

      if (fallback.content) {
        console.log(
          `Ollama ask-local quota fallback succeeded: model=${fallbackModel}, status=${fallback.status}, durationMs=${fallback.durationMs}`
        );
        return fallback.content;
      }

      console.error(
        `Ollama ask-local quota fallback failed: model=${fallbackModel}, status=${fallback.status}, durationMs=${fallback.durationMs}`
      );

      if (fallback.quotaLimited) {
        return formatQuotaLimitedMessage(fallbackModel, fallback.detail);
      }
    }

    if (isQuotaLimited(response.status, detail)) {
      return formatQuotaLimitedMessage(selectedModel, detail);
    }

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

async function tryAskOllamaWithModel(
  config: GatewayConfig,
  prompt: string,
  model: string
): Promise<OllamaChatAttempt> {
  const startedAt = Date.now();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), OLLAMA_REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(new URL("chat/completions", ensureTrailingSlash(config.ollamaBaseUrl)), {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      signal: controller.signal,
      body: JSON.stringify({
        model,
        messages: [
          {
            role: "system",
            content: LOCAL_ASSISTANT_SYSTEM_PROMPT
          },
          {
            role: "user",
            content: prompt
          }
        ],
        stream: false
      })
    });

    const payload = (await response.json()) as OllamaGenerateResponse;
    const durationMs = Date.now() - startedAt;
    const detail = payload.error?.message ?? `HTTP ${response.status}`;

    if (!response.ok) {
      return {
        detail,
        durationMs,
        quotaLimited: isQuotaLimited(response.status, detail),
        status: response.status
      };
    }

    return {
      content: payload.choices?.[0]?.message?.content?.trim() || "Ollama가 빈 응답을 반환했습니다.",
      durationMs,
      quotaLimited: false,
      status: response.status
    };
  } catch (error) {
    const durationMs = Date.now() - startedAt;

    return {
      detail: isAbortError(error) ? "request timed out" : "request failed",
      durationMs,
      quotaLimited: false,
      status: 0
    };
  } finally {
    clearTimeout(timeout);
  }
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

function isQuotaLimited(status: number, detail: string): boolean {
  const normalized = detail.toLowerCase();

  return (
    status === 402 ||
    status === 429 ||
    normalized.includes("quota") ||
    normalized.includes("rate limit") ||
    normalized.includes("rate_limit") ||
    normalized.includes("too many requests") ||
    normalized.includes("insufficient_quota")
  );
}

function formatQuotaLimitedMessage(model: string, detail?: string): string {
  return [
    "모델 요청이 quota 또는 rate limit으로 거부되었습니다.",
    `모델: ${model}`,
    detail ? `상태: ${detail}` : undefined,
    "잠시 후 다시 시도하거나 `/aw ask-local`의 `model` 옵션에 사용 가능한 로컬 모델을 지정하세요.",
    "`/aw status`로 현재 Ollama 모델 목록을 먼저 확인할 수 있습니다."
  ]
    .filter(isPresent)
    .join("\n");
}
