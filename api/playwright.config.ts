import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: [
    ['html', { outputFolder: '../playwright-report/api', open: 'never' }],
    ['json', { outputFile: '../reports/api-results.json' }],
    ['list'],
  ],
  use: {
    baseURL: process.env.BASE_URL_API ?? 'https://restful-booker.herokuapp.com',
    extraHTTPHeaders: { Accept: 'application/json' },
  },
});
