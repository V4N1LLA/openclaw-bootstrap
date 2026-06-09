import type { GatewayConfig } from "../config.js";

export type ServiceStatus = {
  ok: boolean;
  detail?: string;
};

export async function getAgentWorkbenchStatus(
  config: GatewayConfig
): Promise<ServiceStatus> {
  try {
    const response = await fetch(config.agentWorkbenchBaseUrl, { method: "HEAD" });
    return {
      ok: response.ok,
      detail: `HTTP ${response.status} at ${config.agentWorkbenchBaseUrl}`
    };
  } catch {
    return {
      ok: false,
      detail: `unreachable at ${config.agentWorkbenchBaseUrl}`
    };
  }
}
