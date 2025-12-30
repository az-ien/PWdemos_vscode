import{test, expect, Locator,Page, chromium, webkit} from "@playwright/test"

test.only("handle tabs",async ()=>{

const browser =await chromium.launch();
const context =await browser.newContext();


const parentPage = await context.newPage();
const page2 = await context.newPage();


parentPage.goto('https://testautomationpractice.blogspot.com/');


//on the click an event is generated which launches a new tab so the sequnece is a click happens an event is generated and then tab 
//page is opened this so anything that needs to happen will happen before click becuase that will be before the event 
//set anything for the event before the click
//takes an array of the promises as multiple promises for below statements 
//context waits for the  page event as opening tab is the page
//new tab will be opened in a promise so as original page is already in a promise so thats why await is used with statements
//so  new event promise is an array of promises 
//context.waitForEvent('page')
//parentPage.locator("button[onclick='myFunction()']").click();  // opens new tab 
//both of the above 2 statements need to be sent simutanously
//promise.all is a promise array and it will wait for both to be completed 

//await Promise.all([context.waitForEvent('page'), parentPage.locator("button[onclick='myFunction()']").click()]);


context.waitForEvent('page')
parentPage.locator("button[onclick='myFunction()']").click(); 






})