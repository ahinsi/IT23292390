// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  // 1. Where your test files are located
  testDir: './tests',

  // 2. RUN SEQUENTIALLY: Force tests to run one by one so you can watch
  workers: 1, 
  fullyParallel: false,

  // 3. Fail the build on CI if you accidentally left test.only in the source code.
  forbidOnly: !!process.env.CI,

  // 4. Retry settings
  retries: process.env.CI ? 2 : 0,

  // 5. Reporter to use (Required by assignment to see results)
  reporter: 'html',

  /* Shared settings for all the projects below. */
  use: {
    // 6. HEADED MODE: Open the browser window automatically
    headless: false,

    // 7. SLOW MOTION: Wait 1 second (1000ms) between every action (click, type, etc.)
    launchOptions: {
      slowMo: 1000, 
    },

    // 8. EVIDENCE: Collect trace and video (helpful for your Git repository)
    trace: 'on',
    video: 'on',
    screenshot: 'on',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    /* 
       Note: For the assignment run, we usually use Chromium. 
       If you want to run on Firefox/Webkit as well, 
       uncomment the lines below.
    */
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});