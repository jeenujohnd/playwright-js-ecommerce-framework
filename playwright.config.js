// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 500 * 1000,
  expect:{
    timeout: 8000
  },
  reporter: 'html',
  use: {
    baseURL: 'https://rahulshettyacademy.com',
    browserName: 'chromium',
    headless: process.env.CI ? true : false,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },


});

