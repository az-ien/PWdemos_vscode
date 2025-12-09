import{test, expect, Locator} from "@playwright/test"
import { text } from "stream/consumers";

test("single selct drop down",async ({page})=>{

await page.goto("https://testautomationpractice.blogspot.com/");

//1.select option from dropdown (4 ways)
//using css selector

//await page.locator('#country').selectOption('Canada'); //visisble text
//await page.locator('#country').selectOption({value:'uk'});  //value attribute or lable 
//await page.locator('#country').selectOption({index:3});  // index



//2. check number of options in the dropdown(count)
const dropdownOptions: Locator = page.locator ('#country>option'); // '>' in css is like '/' in xpath
await expect (dropdownOptions).toHaveCount(10);


//3. check option present in dropdown
const optionsText: string[] = (await dropdownOptions.allTextContents()).map(text=>text.trim());  // the path gets the string thatstring is mapped into  text and then text is trimmed and saved in a variable
console.log(optionsText)
expect(optionsText).toContain('Japan');
    

//4. printing options from drop down
for(const option of optionsText)
{
    console.log(option);


}




















})