import { describe, expect, it } from "vitest";
import { validatePluginManifest } from "@velora-cms/plugin-sdk";
import plugin from "./plugin";

// The same check the Velora registry runs at install time (and
// `velora-plugin validate` runs before publish) — keep this test as you
// build out contributions, so a broken manifest fails here instead of at
// install.
describe("Hello Banner manifest", () => {
  it("passes the SDK's manifest validation", () => {
    const result = validatePluginManifest(plugin);
    expect(result.ok).toBe(true);
  });

  it("keeps the id and type set at scaffold time", () => {
    expect(plugin.id).toBe("com.example.hello-banner");
    expect(plugin.type).toBe("section");
  });
});
