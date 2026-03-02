import {test,expect} from "@playwright/test";
import { HomePage } from "../POM_example/Homepage";


// define it as a async function
test("verify page url", async ({page})=>{

// every step (background task) returns promise so await needed for every statement
 const homePage = new HomePage(page);

  // Navigate to the site using the POM method
  await homePage.goto();

  // Get current URL
  const url: string = await homePage.getUrl();
  console.log("Url:", url);

  // Assert URL contains expected text
  await expect(page).toHaveURL(/automationexercise/);
})


