//browser -> (necessary)mulitple context can be created for multiple users  -> multiple pages (work on multiple tabs/pages)
//BrowserContexts provide a way to operate multiple independent browser sessions.
//If a page opens another page, e.g. with a window.open call, the popup will belong to the parent page's browser context
//in that context there are plugins so these are used by only one user
//one browser can have multiple contexts.
//in automation script generally there is page directly  
//page can be a tab, window or popup 
// webkit is a mac browser but it can run on windows


import{test, expect, Locator,Page, chromium, webkit} from "@playwright/test"

//normally we send a {page} in the test below in async(). browser takes the default browser that is in the config.ts file 
//but need custom browser 
// as everything of the browser session is defined in the test no need to pass any thing in the async() for the test. whatever is being passed in the test is not needed in the test
test("Browser Context Demo",async ()=>{

const browser =await chromium.launch();       // chromium is being sent to the browser 
const context =await browser.newContext();   // context of browser is stored in a variable 


const page1 = await context.newPage();        // page of context is stored in a variable  
await page1.goto('https://testautomationpractice.blogspot.com/');   //page is used

const page2 = await context.newPage();
await page2.goto('https://testautomationpractice.blogspot.com/');

})