import { test, expect } from '../POM_example/fixtures';
// define it as a async function
test("verify page url", async ({homePage})=>{

  // Navigate to the site using the POM method
  await homePage.goto();

  // Get current URL
  const url: string = await homePage.getUrl();
  console.log("Url:", url);

  // Assert URL contains expected text
  await expect(homePage.page).toHaveURL(/practice/);


  //now just call the methods only no need to create any verification here
  //await calling here is a must as due to the asynchronus calls the call for the stop button will not reach here and the test will end 
  await homePage.clickonStartbutton()
  await homePage.clickonStopbutton()

})


