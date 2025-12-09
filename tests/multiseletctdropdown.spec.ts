import{test, expect, Locator} from "@playwright/test"

test("single selct drop down",async ({page})=>{

await page.goto("https://testautomationpractice.blogspot.com/");




//1.select option from dropdown (4 ways)
//await page.locator('#colors').selectOption(['Red','Blue','Green']); // using visible text only text
//await page.locator('#colors').selectOption(['Red','Green','White']); // value attribute given in the element
//await page.locator('#country').selectOption([{index:0},{index:2},{index:4}]);  // index and change index to label if label 




//2. check number of options in the dropdown(count)
// const dropdownOptions: Locator = page.locator ('#colors>option'); // '>' in css is like '/' in xpath
// await expect (dropdownOptions).toHaveCount(7);



//3. check option present in dropdown
// const optionsText: string[] = (await dropdownOptions.allTextContents()).map(text=>text.trim());  // the path gets the string thatstring is mapped into  text and then text is trimmed and saved in a variable
// console.log(optionsText)
// expect(optionsText).toContain('Green');
    

// //4. printing options from drop down
// for(const option of optionsText)
// {
//     console.log(option);
// }


//sorting an array
//const dropDownoptions: Locator =  page.locator('#animals>option'); // this was sorted already
// const dropdownOptions: Locator = page.locator ('#colors>option');
// const optionsText:string[] = (await dropdownOptions.allTextContents()).map(text=>text.trim())

// const originalList:string[] = [...optionsText]; //The spread operator (...) in TypeScript unpacks elements from arrays or properties from objects into a new array or object
// const SortedList:string[] = [...optionsText].sort(); // sort is sorting both the lists as it is mutable (orginal valyue is able to change)


// console.log('Original List: ', originalList);
// console.log('Sorted List', SortedList);

// expect(originalList).toEqual(SortedList); // obviously fails.... because one is sorted one is not sorted 


//duplicate values in a drop down

const dropdownOptions: Locator = page.locator ('#colors>option'); // with duplicate
const optionsText:string[] = (await dropdownOptions.allTextContents()).map(text=>text.trim())



const myset  = new Set<string>();       // set - duplicates not allowed, A Set in TypeScript is a bunch of unique values.
const duplicates:string[] = [];   // array allows the duplicates

for (const text of optionsText)
{
 if(myset.has(text))
 {
    duplicates.push(text);
 }
 else 
 {
    myset.add(text);

 }

}


if (duplicates.length >0 )
{
console.log('Duplicates are there, bad dropdown ====>', duplicates);
}
else
    {
console.log('Duplicates are ====> none so test passes');

}


})