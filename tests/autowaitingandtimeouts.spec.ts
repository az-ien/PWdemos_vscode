//playwirght actionability link:  https://playwright.dev/docs/actionability

//Auto-wating:
//Playwright automatically performs a range of actionability checks on the elements before making actions to ensure these actions behave as expected. 
//It auto-waits for all the relevant checks to pass and only then performs the requested action.
//If the required checks do not pass within the given timeout, action fails with the TimeoutError.


//Assertions:
//Playwright includes auto-retrying assertions that remove flakiness by waiting until the condition is met, similarly to auto-waiting before actions.

// !!!! selenium doesn't have this so waiting is needed !!!!.. has very bad test flakyness


//Timeouts -- if we want how can we increase or decrease them 
//if local timeouts need to be set then those can be set in the test 
//if global timeout is to be set then that can be set in the playwright config file 
//config timeout overrides local test timeout 


import{test, expect, Locator} from "@playwright/test"

test("Autowaiting and forcing",async ({page})=>{
//test.setTimeout(60000); // timeout increased to 60 seconds locally for this test 
//test.slow();  // triples the timeout makes 30 to 90 sec

await page.goto('https://testautomationpractice.blogspot.com/');

//Assertions - Auto wait works
// await expect(page).toHaveURL("https://testautomationpractice.blogspot.com/");
// await expect(page.locator("h1[class='title']")).toBeVisible();


//Actions - auto wait works
//await page.locator('#Wikipedia1_wikipedia-search-input').fill("John"); 
//await page.locator("input[type='submit']").click(); 

//if we donot want to perform the acitionability (basically element visibility and stability checks ) that playwright performs itself then we can use force
// await page.locator('#Wikipedia1_wikipedia-search-input').fill("John",{force: true});  // force parameter is passed in the method
// await page.locator("input[type='submit']").click({force: true});  // force parameter is passed in the method 


//Timeouts
await expect(page).toHaveURL("https://testautomationpractice.blogspot.com/", {timeout: 10000}); // only for this 
await expect(page.locator("h1[class='title']")).toBeVisible({timeout:10000}); // only for this 

await page.locator('#Wikipedia1_wikipedia-search-input').fill("John", {timeout: 10000}); 
await page.locator("input[type='submit']").click({timeout: 10000}); 



await page.waitForTimeout(5000);
})


test.only("assertions",async ({page})=>{

//assertions URL: https://playwright.dev/docs/test-assertions#non-retrying-assertions

//Auto-retrying assertions:  assertions will retry until the assertion passes, or the assertion timeout is reached. Note that retrying assertions are async, so you must await them.
//these assertions assert on values being there or available

//Non-retrying assertions: assertions allow to test any conditions, but do not auto-retry. Most of the time, web pages show information asynchronously, and using non-retrying assertions can lead to a flaky test.
//conditions mostly

//Negating matchers: In general, we can expect the opposite to be true by adding a .not to the front of the matchers
// expect( some value).not.toEqual(0);
// await expect( some locator).not.toContainText('some text');

//hard vs soft assertions 
//By default, failed assertion will terminate test execution. Playwright also supports soft assertions: failed soft assertions do not terminate test execution, but mark the test as failed.
//await expect.soft(page.locator("h1[class='title']")).toBeVisible()
//expect.soft(); and expect();

//expect(); if failed then test stopped vs  expect.soft(); test will move on to next assertion 
//expect();                                 expect();
//expect();                                 expect();

await page.goto('https://testautomationpractice.blogspot.com/');

//use any assertion you like 



})