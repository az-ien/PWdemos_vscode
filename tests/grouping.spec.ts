//by deafult tests are run in the without any order
//change fullyParallel: true, in the config file to false which will run the tests in sequential order 

import{test, expect, Locator} from "@playwright/test"


//test.describe will be used to group tests
//npx playwright test tests/grouping.spec.ts --grep group1 this command will make only the group1 run 
//we can add specific tags and then tags can be run 

test.describe('Group1',async()=>{

 
test("test1",async ({page})=>{
console.log("Test 1");
})


test("test2",async ({page})=>{
console.log("Test 2");
})   



})





test.describe('Group2',async()=>{


test("test3",async ({page})=>{
console.log("Test 3");
})


test("test4",async ({page})=>{
console.log("Test 4");
})


})




//------------------------------Hooks-------------------------------------
//hooks can be used to manage how or when tests are executed, before test after test the same methods in testng
//before, after same as testng



