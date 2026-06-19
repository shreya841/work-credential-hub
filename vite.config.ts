import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const isProduction =
  process.env.NODE_ENV === "production" ||
  process.argv.includes("build") ||
  process.env.npm_lifecycle_event === "build";

if (isProduction) {
  process.env.NODE_ENV = "production";
}

export default defineConfig({
  nitro: {
    preset: "vercel",
  },
  react: {
    development: !isProduction,
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  vite: {
    esbuild: {
      jsxDev: !isProduction,
    },
  },
});
