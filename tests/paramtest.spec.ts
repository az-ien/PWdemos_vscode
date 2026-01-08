import{test, expect, Locator} from "@playwright/test"
import fs from 'fs';

//testdata
const searchNames:string[]=['Span','Alan','Mark','Tom'];
 
//Approach 1: using for of loop

// for( const name  of searchNames)
// {

// //as the test is now getting multiple values sent to it and it is in a loop so the code will see the test as repeating multiple times
// //so it will give error that the test is duplicate the test needs to become unique with a parameter and so all things need to be dynamic 
// //the test will run as many times as the number of parameters being passed to it 

// test(`search the name ${name}`,async ({page})=>{
//     await page.goto('https://testautomationpractice.blogspot.com/');
//     await page.locator('#Wikipedia1_wikipedia-search-input').fill(name);
//     await page.locator('.wikipedia-search-button').click();
//     await expect.soft(page.locator('#Wikipedia1_wikipedia-search-results')).toContainText(name);

// })

 

// }

//Approach2: using for each function 

// searchNames.forEach((name) =>{

// test(`search the name ${name}`,async ({page})=>{
//     await page.goto('https://testautomationpractice.blogspot.com/');
//     await page.locator('#Wikipedia1_wikipedia-search-input').fill(name);
//     await page.locator('.wikipedia-search-button').click();
//     await expect.soft(page.locator('#Wikipedia1_wikipedia-search-results')).toContainText(name);

// })

// });



//----------------------------------------login test with two things-----------------------------------------------------------



// const loginTestData:string[][] =[["student","Password123","valid"],["lalala","test321","invalid"],["","","invalid"],];



// test.describe('group of login tests',()=>{

// for(const [email,pass,Validity] of loginTestData){


// test(`login check ${email} and ${pass}`,async ({page})=>{
//     await page.goto('https://practicetestautomation.com/practice-test-login/');
//     await page.locator('#username').fill(email);
//     await page.locator('#password').fill(pass);
//     await page.locator('#submit').click();

//     if(Validity.toLowerCase() === 'valid'){
//         const loggedin = page.locator('.post-title');
//         await expect(loggedin).toContainText('Logged In Successfully',{timeout:5000});
//         await page.locator('.wp-block-button__link.has-text-color.has-background.has-very-dark-gray-background-color').click();
//     }

//     else{
//         const loginfail = page.locator('#error');
//         await expect(loginfail).toContainText('Your username is invalid!',{timeout:5000});

//     }


// })

// }

// })



//----------------------------------------login test by reading from external file-----------------------------------------------------------

//reading data from json 
const jsonPath = "testdata/data.json"; 
//read from json file in utf format 8
const loginTestData:any = JSON.parse(fs.readFileSync(jsonPath,'utf-8'));



test.describe('group of login tests',()=>{

for(const {email,pass,Validity} of loginTestData){

test(`login check ${email} and ${pass}`,async ({page})=>{

    console.log(loginTestData);
    await page.goto('https://practicetestautomation.com/practice-test-login/');
    await page.locator('#username').fill(email);
    await page.locator('#password').fill(pass);
    await page.locator('#submit').click();
    await page.waitForTimeout(3000);

    if(Validity.toLowerCase() === 'valid'){
        const loggedin = page.locator('.post-title');
        await expect(loggedin).toContainText('Logged In Successfully',{timeout:5000});
    }

    else{
        const loginfail = page.locator('#error');
        await expect(loginfail).toContainText('Your username is invalid!',{timeout:5000});

    }


})

}

})



//----------------------------------------login test by reading from csv file-----------------------------------------------------------

// //all same code but 
// //first install csv parser using npm package
// import {parse} from 'csv-parse/sync';

// //reading data from json 
// const csvPath = "testdata/data.csv"; 
// //read from json file in utf format 8
// const fileContent = fs.readFileSync(csvPath,'utf-8');
// const records = parse(fileContent,{columns:true, skip_empty_lines:true})



//------------------------------------for excel convert excel to json file--------------------------------------------------------------


//install xlsx module 
//import xlsx from xlsx
//const excelpate = 'testdata/data.xlsx';
//const workbook=xlsx.readFile(excelpate);
//const sheetNames=workbook.SheetNames[0];
//const worksheet=workbook.sheets[sheetNames];
//convert sheet into json 
//const datajson:any= XLSX.utils.sheet_to_json(worksheet);
//the rest code for json 
