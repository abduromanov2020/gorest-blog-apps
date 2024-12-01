import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 45000,
  expect: {
    timeout: 15000
  },
  workers: 1,
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
      },
    },
  ],
  webServer: {
    command: process.platform === 'win32' ? 'npm.cmd run dev' : 'npm run dev',
    port: 3000,
    reuseExistingServer: true,
    timeout: 120000,
  },
  reporter: [
    ['list'],
    ['html', { open: 'never' }]
  ],
});