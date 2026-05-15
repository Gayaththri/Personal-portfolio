import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import { siteConfig } from "./src/config";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const fromEnv = (env.VITE_SITE_URL ?? "").trim().replace(/\/$/, "");
  const fromConfig = (siteConfig.siteUrl ?? "").trim().replace(/\/$/, "");
  const origin =
    fromEnv ||
    fromConfig ||
    (mode === "development"
      ? "http://localhost:5173"
      : (() => {
          console.warn(
            "[vite] Set siteConfig.siteUrl in src/config.ts or VITE_SITE_URL in .env for correct og:url and og:image (using https://example.com until then).",
          );
          return "https://example.com";
        })());

  return {
    plugins: [
      react(),
      {
        name: "html-open-graph-origin",
        transformIndexHtml(html) {
          return html.replaceAll("__OG_ORIGIN__", origin);
        },
      },
    ],
  };
});
