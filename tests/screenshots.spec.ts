import{test, expect, Locator} from "@playwright/test"


// to take screenshot after the test is run the setting is done in the config file 
test("screenshots",async ({page})=>{
 await page.goto("https://testautomationpractice.blogspot.com/");



//page screenshot
// need to give folder path it should be in the project and give the name of the file
//to keep the older screenshots save the file with the name and with a timestamp. timestamp makes the name unique
const timestamp = Date.now();
//await page.screenshot({path:'screenshots/'+'homepage'+timestamp+'.png'})

//full page screenshot
await page.screenshot({path:'screenshots/'+'fullpage'+timestamp+'.png', fullPage: true})

//specific locator/element screenshot 
const title = await page.locator("h1[class='title']");
await title.screenshot({path:'screenshots/'+'title'+timestamp+'.png'});


})


test("video",async ({page})=>{
//video only from config file 
//video will play in the html report
//video will be saved in the test-results
await page.goto("https://testautomationpractice.blogspot.com/");
await page.waitForTimeout(5000);
})

//-------------------------------------------------------- trace viewer-----------------------------------------------------------------
//three ways to run the trace 
//1.through config default way 
//2.terminal command with the test 
//3.context of the test and then view the trace file in the https://trace.playwright.dev


//trace viewer will create a.zip file that will be created in the test results folder. this .zip file can be opened in the trace viewer 
//opens the HTML report that is created that will contain the trace.zip and it will open like in the browser with steps and the dev console in webkit
//if trace for specific test then:  npx playwright test tests/screenshots.spec.ts --headed --trace on
//context tracing for a specific test
//as soon as test starts
//context.tracing.start({screenshots:true, snapshots: true});
//before ending the test
//context.traing.stop({'trace.zip'});
//but trace file will not attach to HTML report
//then in terminal said: npx playwrigt show-trace trace.zip
//then the trace.zip will be opened in the trace viewer


//--------------------------------------------------------retries multiple times test runner-------------------------------------------------
//setting of retries runs in CI. the setting is in config and the count is there too
//retry happens when test fails so will try 2 times and then stop as due to option
//or use this command in the terminal: npx playwright test tests/screenshots.spec.ts --retries=3

test.only("flaky test",async ({page})=>{
await page.goto("https://testautomationpractice.blogspot.com/");
await page.waitForTimeout(5000);
})