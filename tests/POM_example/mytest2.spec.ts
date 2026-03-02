import { test, expect } from '../POM_example/fixtures';
// define it as a async function
test("verify page url", async ({homePage})=>{

  // Navigate to the site using the POM method
  await homePage.goto();

  // Get current URL
  const url: string = await homePage.getUrl();
  console.log("Url:", url);

  // Assert URL contains expected text
  await expect(homePage.page).toHaveURL(/automationexercise/);
})


