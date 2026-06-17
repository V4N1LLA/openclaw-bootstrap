import assert from "node:assert/strict";
import type { GatewayConfig } from "../src/config.js";
import { createPmPreflightResult } from "../src/discord/pmIntake.js";
import {
  dispatchPmWorkCard,
  type PmChannelSender
} from "../src/discord/pmDispatch.js";

const baseConfig: GatewayConfig = {
  discordPmChannelId: "pm",
  discordAgentDevLocalChannelId: "dev",
  discordAgentDocsLocalChannelId: "docs",
  discordAgentReviewChannelId: "review",
  discordAgentOpsChannelId: "ops",
  discordAgentLogChannelId: "log",
  ollamaBaseUrl: "http://localhost:11434/v1",
  ollamaDefaultModel: "qwen2.5-coder:3b",
  agentWorkbenchBaseUrl: "http://127.0.0.1:3000"
};

function makePreflight(command: string, config = baseConfig) {
  return createPmPreflightResult({
    channelId: "pm",
    command,
    config
  });
}

function makeSender(options: { failChannelId?: string } = {}) {
  const sends: Array<{ channelId: string; content: string }> = [];
  const sender: PmChannelSender = {
    async sendToChannel(channelId, content) {
      if (channelId === options.failChannelId) {
        throw new Error("mock channel access failure");
      }

      sends.push({ channelId, content });
    }
  };

  return { sender, sends };
}

async function run() {
  {
    const { sender, sends } = makeSender();
    const result = await dispatchPmWorkCard(
      "gateway runtime fix 진행해줘",
      makePreflight("gateway runtime fix 진행해줘"),
      baseConfig,
      sender
    );

    assert.equal(result.dispatch.status, "sent");
    assert.equal(result.dispatch.target, "agent-dev-local");
    assert.equal(result.dispatch.executionStarted, false);
    assert.equal(sends.length, 1);
    assert.equal(sends[0]?.channelId, "dev");
  }

  {
    const { sender, sends } = makeSender();
    const result = await dispatchPmWorkCard(
      "token 원문 확인해줘",
      makePreflight("token 원문 확인해줘"),
      baseConfig,
      sender
    );

    assert.equal(result.dispatch.status, "sent");
    assert.equal(result.dispatch.target, "agent-log");
    assert.equal(result.dispatch.executionStarted, false);
    assert.equal(sends.length, 1);
    assert.equal(sends[0]?.channelId, "log");
    assert.match(sends[0]?.content ?? "", /PM audit card/);
  }

  {
    const { sender, sends } = makeSender();
    const config = {
      ...baseConfig,
      discordAgentDocsLocalChannelId: undefined
    };
    const result = await dispatchPmWorkCard(
      "README 문서 정리해줘",
      makePreflight("README 문서 정리해줘", config),
      config,
      sender
    );

    assert.equal(result.dispatch.status, "setup-needed");
    assert.equal(result.dispatch.target, "agent-docs-local");
    assert.equal(result.dispatch.channelSent, false);
    assert.equal(sends.length, 0);
  }

  {
    const { sender, sends } = makeSender();
    const result = await dispatchPmWorkCard(
      "merge 진행해줘",
      makePreflight("merge 진행해줘"),
      baseConfig,
      sender
    );

    assert.equal(result.dispatch.status, "sent");
    assert.equal(result.dispatch.target, "agent-ops");
    assert.equal(result.dispatch.executionStarted, false);
    assert.equal(sends.length, 1);
    assert.equal(sends[0]?.channelId, "ops");
    assert.match(sends[0]?.content ?? "", /PM approval required card/);
  }

  {
    const { sender, sends } = makeSender({ failChannelId: "dev" });
    const result = await dispatchPmWorkCard(
      "gateway runtime fix 진행해줘",
      makePreflight("gateway runtime fix 진행해줘"),
      baseConfig,
      sender
    );

    assert.equal(result.dispatch.status, "stopped");
    assert.equal(result.dispatch.target, "agent-dev-local");
    assert.equal(result.dispatch.channelSent, false);
    assert.equal(sends.length, 0);
  }
}

await run();
console.log("PM dispatch smoke test passed");
