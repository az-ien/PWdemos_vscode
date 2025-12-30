import{test, expect, Locator,Page, chromium, webkit} from "@playwright/test"

test("handle popups",async ({browser})=>{

const context = await browser.newContext();
const page =await context.newPage();
await page.goto("https://testautomationpractice.blogspot.com/");

// same concept but event is now popup not tab window
await Promise.all([page.waitForEvent('popup'),page.locator('#PopUp').click()]) // array created here 
const allPopuwindows = context.pages() // array of pages returned 
console.log("popup windows",allPopuwindows.length) //3 pages






// console.log("parent ", allPopuwindows[0].url())
// console.log("child ", allPopuwindows[1].url())
// console.log("child ", allPopuwindows[2].url())

// // for (const popw of allPopuwindows)
// // {
// //     const title = popw.title();
// //     if((await title).includes('Selenium'))
// //     {


// //     }

// // }


})