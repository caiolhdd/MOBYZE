import { defineConfig, devices } from "@playwright/test";

const PREVIEW = 4173; // build de produção: valida o roteamento /chiqcell com fallback de SPA
const DEV = 4174; // painel admin só existe no dev server

export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: { baseURL: `http://localhost:${PREVIEW}`, trace: "on-first-retry" },
  projects: [
    { name: "desktop", testIgnore: /admin\.spec/, use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", testIgnore: /admin\.spec/, use: { ...devices["Pixel 7"] } },
    { name: "admin", testMatch: /admin\.spec/, use: { ...devices["Desktop Chrome"], baseURL: `http://localhost:${DEV}` } },
  ],
  webServer: [
    { command: `npm run build && npx vite preview --port ${PREVIEW} --strictPort`, port: PREVIEW, reuseExistingServer: !process.env.CI, timeout: 120_000 },
    { command: `npx vite --port ${DEV} --strictPort`, port: DEV, reuseExistingServer: !process.env.CI },
  ],
});
