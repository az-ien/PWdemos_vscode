//iframes (in-line frames) are like a page within a page basically and html document within a html document 
//they refer to some other pages that contain some external content  
//the frame is an element, first grab the frame and then interact with the elements 
//in selenium first switch to frame then interact with elements but in ts there are frame specific methods 


import{test, expect, Locator, Frame} from "@playwright/test"


test("frames demo",async ({page})=>{ 



await page.goto('https://demo.automationtesting.in/Frames.html');

//total number of frames on the webpage 
const frames : Frame[] =page.frames();
console.log('Number of frames: ', frames.length);

//----Approach 1 : using frame itself page.frame--------

page.locator(".analystic[href='#Multiple']").click();

//frames handling
await page.frameLocator("iframe[src='MultipleFrames.html']").frameLocator("iframe[src='SingleFrame.html']").locator("input[type='text']").fill('Hello');
await page.waitForTimeout(5000);

})