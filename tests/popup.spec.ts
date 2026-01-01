import{test, expect, Locator,Page, chromium, webkit} from "@playwright/test"

test("handle popups",async ({browser})=>{

const context = await browser.newContext();
const page =await context.newPage();
await page.goto("https://testautomationpractice.blogspot.com/");

// same concept but event is now popup not tab window
await Promise.all([page.waitForEvent('popup'),page.locator('#PopUp').click()]) // array created here 
await Promise.all([page.waitForEvent('popup'),page.locator('#PopUp').click()]) // but why ??? maybe because it opens an unreliable popup window


//----------------------------Logic change here--------------------------------------------------------
//for multiple popups this approach is very tricky. there should be two seperate objects made that can handle the individual pages.
//this leaves the pages in arrays open ended need to be handled very carefully
//the correct approach is in the tabs excercise that needs to be here. but this is another way of doing it

const allPopuwindows = context.pages() // array of pages returned 
console.log("popup windows",allPopuwindows.length) //3 pages

// there should be overall 3 pages after popups being opened but but my code is returning only 2 popups 1 original and 1 popup which
//is not correct need to correct it 


console.log("parent ", allPopuwindows[0].url())
console.log("child ", allPopuwindows[1].url())
console.log("child ", allPopuwindows[2].url())


for (const pw of allPopuwindows)
{
    const title = pw.title();
    if((await title).includes('Playwright'))
    {
        await pw.waitForLoadState(); //page was not being loaded 
        await pw.locator('.getStarted_Sjon').click();
        await pw.waitForTimeout(3000);
        await pw.close(); // that specific window is closed by this 

    }

}

await page.waitForTimeout(5000);  // this is making the main page wait not the child that will be closed
})




test.only("authenticated popups",async ({browser})=>{

//const context = await browser.newContext();
const context = await browser.newContext({ httpCredentials: { username:'admin', password:'admin' } });  // for approach 2 

const page =await context.newPage();
await page.waitForLoadState();

//as the URL has been given directly till the popup, need to pass the username and password with the opening not seperately like selenium


//Approach 1:username and password are within the URL https://username:password@the-internet.herokuapp.com/basic_auth
// await page.goto("https://admin:admin@the-internet.herokuapp.com/basic_auth");
// await expect(page.locator('p:has-text("Congratulations! You must have the proper credentials."')).toBeVisible();
// await page.waitForTimeout(5000); 


// Approach 2:pass username and password with browser context instead of the URL 
await page.goto("https://the-internet.herokuapp.com/basic_auth");
await expect(page.locator("//p[contains(text(),'Congratulations! You must have the proper credenti')]").toBeVisible();
await page.waitForTimeout(5000); 





})