import {test,expect} from "@playwright/test";
//npm = node package manager, npx = node package executor

//syntax:
// test("title",()=>{

// //step1
// //step2
// //step3

// })

//playwright architecture: uses web socket protocol opens connection runs all requests and gets all responses once then closes so perfromance faster
//selenium architecture: uses W3/HTTP for every request open conncetion then request/response then close connection so performance wise slower

//fixture - global variable, like:  {page}, {browser} passed as a parameter 
//it takes the browser from the config 

//As TS supports and enhances the asynchronous nature of JavaScript, the language it is built upon.
//all steps (back ground task) in a test return a promise (a guarantee if a task is succesful: promise resolved, if not successful then a promise is rejected) 
//async and sync: sync steps executed in a sequence of 1 ,2 ,3 ,4. async steps started in parallel  not in a sequence 
//as every step has a back ground task so each step needs to await  step2 should wait for step1 so await is needed 
//whichever statement returns a promise then the next statement must have await
//if promise resolved. then next step auto runs 
//if promise rejected then await stops for 30 secs and second step not executed
//example console.log does not return any promise so await before or after it not required. 
//async -> returns promise so await needed so statements are await
// if await then always async not in sync


// single test single assertion, more assertions then make more tests 
// hard assertions: tests stop and do not execute the next statement but with soft assertions assert fails but the next statement executes

//by default playwright runs in headless
//1 worker = 1 browser instance 
//by default HTML report 


//commands to run tests 
//npx playwright show-report
//npx playwright test -g "title"  
//npx playwright test mytest2.spec.ts
//npx playwright test mytest2.spec.ts --headless
//how to run through UI not command: npx playwright test --ui // captures a lot of information, easy to debug the test
//npx playwright test mytest2.spec.ts --debug, opens browser and opens the code with it and with that it can be debugged


// define it as a async function
test("verify page title", async ({page})=>{

// every step (background task) returns promise so await needed for every statement
await page.goto("https://automationexercise.com/");
let title:string = await page.title();
console.log("Title:", title);
await expect(page).toHaveTitle("Automation Exercise");

})


