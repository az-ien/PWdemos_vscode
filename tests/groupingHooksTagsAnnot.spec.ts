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
//hooks in a group will be local to that group, so hooks have to be out of the group
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


test.describe('mygroup',async()=>{
test('test1', async() => {
await expect(page.locator('#logout2')).toBeVisible();
})


test('test2', async() => {
    await expect(page.locator('#nameofuser')).toHaveText('Welcome pavanol');
})
})



//---------------------------annotations(not like testng those are hooks)--------------------------------

//only -- only runs that specific test 
//skip -- skip the test permanently and with a condition
//fail -- intentionally fail the test 
//fixme -- it skips the test 
//slow -- slows the test execution 3 times


// test("test1",async ({page})=>{
// await page.goto("https://www.google.com/");
// await expect(page).toHaveTitle('Google');
// })


// test.skip("test2",async ({page})=>{
// await page.goto("https://www.google.com/");
// await expect(page).toHaveTitle('Google');
// })


// test.skip("test3",async ({page,browser,browserName})=>{
// test.skip(browserName === 'firefox', 'Still working on it for Firefox');
// await page.goto("https://www.google.com/");
// await expect(page).toHaveTitle('Google');
// })


// test.fail("test4",async ({page})=>{
// await page.goto("https://www.google.com/");
// await expect(page).toHaveTitle('Google');
// })


// test.fixme("test5",async ({page})=>{
// await page.goto("https://www.google.com/");
// await expect(page).toHaveTitle('Google');
// })


// test("test6",async ({page})=>{
// test.slow();
// await page.goto("https://www.google.com/");
// await expect(page).toHaveTitle('Google');
// })





//--------------------------------------------Tags----------------------------------------------------
//tests are tagged so that if only one tag needs to be run then that is only run like sanity tests and regression tests 
//Approach1: @sanity this is a tag. @abc this is also a tag
//Approach2: add the tag as parameter in the test as {tag: '@sanity'}
//run it like this: npx playwright test tests/groupingHooksTagsAnnot.spec.ts --grep "@sanity"
//if multiple tags then: npx playwright test tests/groupingHooksTagsAnnot.spec.ts --grep "(?=.*@sanity)(?=.*@regression)"
//if one or the other use: npx playwright test tests/groupingHooksTagsAnnot.spec.ts --grep "@sanity|@regression" 
//if only one not the other also not the common tag so only regression will run, this is opposite: npx playwright test tests/groupingHooksTagsAnnot.spec.ts --grep-invert "@sanity"
//in config add the grep and then make the tag there if command is not to be used here -- use config thing

test(" test tag 1",{tag: '@sanity'}, async ({page})=>{
await page.goto("https://www.google.com/");
await expect(page).toHaveTitle('Google');
})


test(" test tag 2",{tag: '@regression'}, async ({page})=>{
await page.goto("https://www.google.com/");
await expect(page).toHaveTitle('Google');
})

//make an array and pass multiple tags in the tag
test(" test tag 3",{tag:['@sanity','@regression']}, async ({page})=>{
await page.goto("https://www.google.com/");
await expect(page).toHaveTitle('Google');
})