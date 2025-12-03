import{test, expect, Locator} from "@playwright/test"
import { stringify } from "querystring";

//// only annotation- runs only this test

test("Text Input Actions",async ({page})=>{

await page.goto("https://testautomationpractice.blogspot.com/");

const textBox: Locator = page.locator('#name');
await expect(textBox).toBeVisible();
await expect(textBox).toBeEnabled();

const maxLength: string | null = await textBox.getAttribute("maxlength"); // returns value of maxlength attribute of the element
expect(maxLength).toBe('15');   // on locator in variable await is required but variable of variable await is not required

await textBox.fill("John candy");
console.log("text content of Firstname:",await textBox.textContent()); //returns empty as nothing in DOM

const enteredValue: string = await textBox.inputValue();
console.log("Input value of Firstname:",enteredValue); // returns input valye of text box
expect (enteredValue).toBe ("John candy");


})


test("Radio Button Actions",async ({page})=>{

await page.goto("https://testautomationpractice.blogspot.com/");

const maleRadio: Locator = page.locator("#male");  //male radio button
await expect(maleRadio).toBeVisible();
await expect(maleRadio).toBeEnabled();

expect(await maleRadio.isChecked()).toBe(false); // 

await maleRadio.check()        // select the radio button
// expect(await maleRadio.isChecked()).toBe(true);   checking boolean value with another boolean value
await expect(maleRadio).toBeChecked();  // prefered

})


test.only("Check box Actions",async ({page})=>{

await page.goto("https://testautomationpractice.blogspot.com/");

//captured one specific checkbox
const sundayCheckbox:Locator = page.getByLabel('Sunday');
// await sundayCheckbox.check();
// await expect(sundayCheckbox).toBeChecked();

//capture all checkboxes and assert each is checked. all elements can be checked placed in an array and checked then so ne need to map but video logic
// dont agree with the two lines below :(
// const days:string[] = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
// const checkboxes: Locator[] = days.map(index => page.getByLabel(index));
// expect(checkboxes.length).toBe(7);

//------------------------------------------------------------------------------------------------------------------------------------------
const days = page.locator("//div[@class='form-group']//input[@type='checkbox']");
const count = await days.count();

const checkboxes: Locator[] = [];

for (let i = 0; i < count; i++) {
  //const id = await days.nth(i).getAttribute("id");
  //const label = await page.locator(`label[for="${id}"]`).textContent();
  const label = await days.nth(i).locator('..').textContent();
  checkboxes.push(page.getByLabel(label!.trim()));

}

expect(checkboxes.length).toBe(count);

//--------------------------------------------------------------------------------------------------------------------------------------------

//capture all checkboxes and assert each is checked
for(const checkbox of checkboxes ){     // all values are taken
    await checkbox.check();
await expect(checkbox).toBeChecked();

} 

//Uncheck
for(const checkbox of checkboxes.slice(-3) ){  // all values are taken
await checkbox.uncheck();
await expect(checkbox).not.toBeChecked();
}


// if checked uncheck, if unchecked check

for(const checkbox of checkboxes ){     // all values are taken
   
    if(await checkbox.isChecked()){
//only if not checked   
await checkbox.check();
await expect(checkbox).toBeChecked();
}

else{
// only if checked
await checkbox.uncheck();
await expect(checkbox).not.toBeChecked();
}

}


//randonly select check boxes - select 1,3,6 and assert
const indexes:number[] =[1,3,6];

for (const i of indexes){
await checkboxes[i].check();
await expect(checkboxes[i]).toBeChecked();

}

//select the checkbox based on the value, if the upper code is commented and changed as it is now then in days there are already lables is the for loop will be modified to 'in' instead of 'of'
const weekName:string  = "Friday";
for(const lable in days)
{
if(lable.toLowerCase()===weekName.toLowerCase())
    {
    const checkbox =page.getByLabel(lable);
    await checkbox.check();
    await expect(checkbox).toBeChecked();
}

}


})