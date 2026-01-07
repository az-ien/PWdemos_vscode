//by deafult tests are run in the without any order
//change fullyParallel: true, in the config file to false which will run the tests in sequential order 

import{test, expect, Locator,Page} from "@playwright/test"


//test.describe will be used to group tests
//npx playwright test tests/grouping.spec.ts --grep group1 this command will make only the group1 run 
//we can add specific tags and then tags can be run 

// test.describe('Group1',async()=>{

 
// test("test1",async ({page})=>{
// console.log("Test 1");
// })


// test("test2",async ({page})=>{
// console.log("Test 2");
// })   



// })





// test.describe('Group2',async()=>{


// test("test3",async ({page})=>{
// console.log("Test 3");
// })


// test("test4",async ({page})=>{
// console.log("Test 4");
// })


// })




//------------------------------Hooks-------------------------------------
//hooks can be used to manage how or when tests are executed, before test after test the same methods in testng
//before, after same as testng
// as login and logout are required before each test they are seperated into another method
//for reusable tasks this is used, if any settings, like database connection or file reading scripts can be kept in these hooks and closing connection after reading file 


// test.beforeAll('run before all tests', async() => {
// console.log("before all tests this is run");
// })


// test.afterAll('run after all tests', async() => {
// console.log("after all tests this is run");
// })

// test.beforeEach('run before each test', async() => {
// console.log("before each test this is run");
// })

// test.afterEach('run after each test', async() => {
// console.log("after each test this is run");
// })



// test("test1",async ({page})=>{
// console.log("Test 1");
// })


// test("test2",async ({page})=>{
// console.log("Test 2");
// })  


// test("test3",async ({page})=>{
// console.log("Test 3");
// })


// test("test4",async ({page})=>{
// console.log("Test 4");
// })



//---------------------------------------Hooks Example-----------------------------------------------------

//create a browser while your at it ugghhhhhh !!!
//Iam using page 
//one problem with custom before all and after all these two will only accept browser fixtures not the page so need to pass a browser in the 
let page: Page;

test.beforeAll('open app', async({browser}) => {
    page =await browser.newPage();
await page.goto("https://demoblaze.com/");
})


test.afterAll('run after all tests', async() => {
await page.close();
})

test.beforeEach('login', async() => {
await page.locator('#login2').click();
await page.locator('#loginusername').fill('pavanol');
await page.locator('#loginpassword').fill('test@123');
await page.locator("button[onclick='logIn()']").click();
await page.waitForTimeout(2000);
})

test.afterEach('logout', async() => {
await page.locator('#logout2').click();
})


test('test1', async() => {
await expect(page.locator('#logout2')).toBeVisible();
})


test('test2', async() => {
    await expect(page.locator('#nameofuser')).toHaveText('Welcome pavanol');
})