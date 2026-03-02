//fixtures can be used to support a Page Object Model (POM) in Playwright Test, but they don’t replace POM. 
//Instead, they help you inject page object instances automatically into your tests,making your test code cleaner and more maintainable.


import { test as base } from '@playwright/test';
// This is a POM (Page Object Model) class that encapsulates navigation/actions.
import { HomePage } from '../POM_example/Homepage';

/**
 * 1️⃣ We extend the built-in Playwright 'test' fixture  
 *    to include our own custom fixtures (here: homePage).
 * 2️⃣ fixture type declaration <{ homePage: HomePage }>
 *    tells TypeScript what type our custom fixture provides.
 */
export const test = base.extend<{
  homePage: HomePage;
}>({

  homePage: async ({ page }, use) => {
    // Create the HomePage object with the page fixture
    const homePage = new HomePage(page);

    // Anything before `use(...)` happens before the test.
    // E.g., you could navigate, login, setup state, etc.

    await use(homePage);

    // Anything after `use(...)` happens *after* the test.
    // Teardown/cleanup logic goes here if needed.
  },
});

// Re-export expect so tests can write: import { test, expect } from "../fixtures";
export { expect } from '@playwright/test';