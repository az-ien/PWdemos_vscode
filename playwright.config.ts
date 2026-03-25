import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',

  //this will run a custom API using json server that will
  testMatch: 'tests/API_testing/Tests_using_cutom_API/students.spec.ts',
  webServer: {
    command: 'npx json-server --watch tests/API_testing/Tests_using_cutom_API/students.json --port 3000',
    url: 'http://localhost:3000/students',
    reuseExistingServer: !process.env.CI,
    timeout: 60 * 1000, // optional: wait time for server start
  },


  //timeout: 60000,        // default timeout fo all tests globally default is 30 this changes it to 60 seconds
  //expect:{timeout: 10000},   // longer wait for all expect condtions default is 5 this changes it to 10 seconds 
  // You can set `grep` and `grepInvert` using JavaScript RegExp objects.
  // Examples (uncomment to enable):
  // Run tests that include the @sanity tag:
  // grep: /@sanity/,
  // Run tests that include both @sanity and @regression tags (positive lookahead):
  // grep: /(?=.*@sanity)(?=.*@regression)/,
  // Invert grep to exclude @sanity:
  // grepInvert: /@sanity/,


  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  //forbidOnly: !!process.env.CI,
  forbidOnly: false,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  // need to install npm allure reports then allure command line then run them using the command line for allure reports npx allure serve allure-results
  reporter:[ ['html'],['allure-playwright'], ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    //take the screenshot of all the tests, saves screenshot in test results folder
    //screenshot:'only-on-failure',

    //video, saves video in test results folder
    //video:'on',

    //screensize of all the tests
    //viewport:{width: 1290, height:720}, 

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace:'on',
   },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
