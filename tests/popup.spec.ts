import{test, expect, Locator,Page, chromium, webkit} from "@playwright/test"

test("handle popups",async ({browser})=>{

const context = await browser.newContext();
const page =await context.newPage();
await page.goto("https://testautomationpractice.blogspot.com/");

// same concept but event is now popup not tab window
await Promise.all([page.waitForEvent('popup'),page.locator('#PopUp').click()]) // array created here 
await Promise.all([page.waitForEvent('popup'),page.locator('#PopUp').click()]) // but why ??? maybe because it opens an unreliable popup window

const allPopuwindows = context.pages() // array of pages returned 
console.log("popup windows",allPopuwindows.length) //3 pages

// there should be overall 3 pages after popups being opened but but my code is returning only 2 popups 1 original and 1 popup which
//is not correct need to correct it 



console.log("parent ", allPopuwindows[0].url())
console.log("child ", allPopuwindows[1].url())
console.log("child ", allPopuwindows[2].url())

// // for (const popw of allPopuwindows)
// // {
// //     const title = popw.title();
// //     if((await title).includes('Selenium'))
// //     {


// //     }

// // }


})