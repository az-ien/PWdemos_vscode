





import{test, expect, Locator} from "@playwright/test"

test("Autosuggest dropdown",async ({page})=>{


//--------------------------------------------------------auto-suggested dropdown 
// await page.goto("https://www.google.com/");

// await page.locator("textarea[id='APjFqb']").fill('smart');
// await page.waitForTimeout(5000);     //  need to wait for the server to respond with the options 

// const options: Locator = page.locator('ul>li');
// const count = await options.count();
// console.log("number of options", count);




// // click on smart phone option

// for(let i =0; i < count; i++)   // for loops because for of and for in are for arrays only. the elements returned are multiple but not in an array
// {
// console.log("options text: ",await options.nth(i).innerText());
// const text = await options.nth(i).innerText();
// if (text == 'Smart watch'){
//     options.nth(i).click();
//     break;
// }

// }


//----------------bootstrap dropdown/Hidden dropdown -- options in ui but not in DOM, select tag missing
await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

//login
await page.locator("input[name='username']").fill('Admin');
await page.locator("input[name='password']").fill('admin123');
await page.locator("button[type='submit']").click();

// click on PIM
await page.getByText('PIM').click();

//click on job Title dropdown
await page.locator('form i').nth(2).click();
await page.waitForTimeout(5000);


// capture all the options from dropdown 
const options: Locator =  page.locator("div[role='option'] span");   // space span is a child but not a direct child so > wont work
const count = await options.count();

console.log("number of options" , count);



//select/click on option
for (let i=0; i<count; i++)   // for loops because for of and for in are for arrays only. the elements returned are multiple but not in an array
{
const text = await options.nth(i).innerText();
if (text == 'Automaton Tester'){
    options.nth(i).click();
    break;
}

}





await page.waitForTimeout(5000);

})