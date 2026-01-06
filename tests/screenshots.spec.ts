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


test.only("video",async ({page})=>{
//video only from config file 
//video will play in the html report
//video will be saved in the test-results
await page.goto("https://testautomationpractice.blogspot.com/");

})