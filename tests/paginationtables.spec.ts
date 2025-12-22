import{test, expect, Locator} from "@playwright/test"

test("read data from all the table pages",async ({page})=>{

await page.goto('https://datatables.net/examples/basic_init/zero_configuration.html');

let hasmorepges = true;  // assumption there are more pages

// display the rows present on the first page
//   const rows: Locator[] = await page.locator('table#example tbody>tr').all();
//     for (let row of rows)
//     {
//         console.log(await row.innerText());

//     }

// read all rows from all pages
while(hasmorepges)      // we dont know what is the last page so while is needed
{
    const rows: Locator[] = await page.locator('table#example tbody>tr').all();
    for (let row of rows)
    {
        console.log(await row.innerText());
    }

   const nextButton: Locator = page.locator("button[aria-label='Next']");
   const isDisabled = await nextButton.getAttribute('class');
   if (isDisabled?.includes('disabled')) {
       hasmorepges = false;   // put false in the variable so while breaks automatically on condition otherwise continue clicking 
   }
   else
    {
   await nextButton.click();
   }

}

})


test("filter the rows and check the rows count ",async ({page})=>{
    await page.goto('https://datatables.net/examples/basic_init/zero_configuration.html');
    await page.waitForTimeout(5000);

const dropdown:Locator = page.locator('#dt-length-0');
await dropdown.selectOption({label:'25'});

const rows = await page.locator ('table#example tbody>tr').all();
expect (rows.length).toBe(25); 

})


test.only("search for specific data in table ",async ({page})=>{
await page.goto('https://datatables.net/examples/basic_init/zero_configuration.html');
await page.waitForTimeout(5000);

const searchbox:Locator = page.locator('#dt-search-0');
await searchbox.fill('Paul Byrd');

await page.waitForTimeout(5000);
const rows = await page.locator ('table#example tbody>tr').all();
if(rows.length >=1)   // if this fails then that means that no rows were returned so why continue just show text in else 
{
    let matchfound = false;   // need to change boolean for assertion as a check so need this 
    for(let row of rows)
    {
        const text = await row.innerText();
        if(text.includes('Paul Byrd'))
        {
            console.log('Match found:', text);
            matchfound = true;   // change condition on text found so that assertion runs sucessfully
            break;
        }
    }
    expect(matchfound).toBe(true);  // assertion runs becuase condition was changed 

}
else
{
    console.log('No Rows found with the searched text')
}

})