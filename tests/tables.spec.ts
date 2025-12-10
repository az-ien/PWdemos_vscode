import{test, expect, Locator} from "@playwright/test"

test("tables",async ({page})=>{

await page.goto('https://testautomationpractice.blogspot.com/');


const table: Locator = page.locator("table[name='BookTable'] tbody");
await expect(table).toBeVisible();

//1) count number of rows

//chaining of locators: table.locator("tr")
const rows: Locator = page.locator("table[name='BookTable'] tbody tr"); //returns all the rows including header
await expect (rows).toHaveCount(7);  //7 rows returned




//2) count number of headers/columns

const columns: Locator = page.locator("table[name='BookTable'] tbody tr th"); //returns all the rows including header
await expect (columns ).toHaveCount(4);  //4 columns returned



//3) read all the data from 2nd row 
const secondrowcells: Locator = rows.nth(2).locator("td");
const secondRowtext: string[] = await secondrowcells.allInnerTexts();  // why this as there are 4 cells that are returned so array
console.log("2nd row data:", secondRowtext)
await expect(secondrowcells).toHaveText([ 'Learn Java', 'Mukesh', 'Java', '500' ]);
// for loop on text as string returned so then print 



//4) read all the table data except headers

console.log("printing all data");

const allrowdata = await rows.all();  // so array of locators returned 

for(let row of allrowdata.slice(1))
{
const cols = await rows.locator("td").allInnerTexts(); // array returned so can be used 
//console.log(cols.join('\t'));
}


//5) print subject where book name is selenium
console.log("subjects of selenium named books ");
const seleniumBooks:string[] =[];

for(let row of allrowdata.slice(1))
{
const cells =await row.locator('td').allInnerTexts();
const booknames =cells[0];
const subjects = cells[2];
if (booknames === 'Master In Selenium')
{
console.log(`${booknames} \t ${subjects}`);
seleniumBooks.push(booknames);
}

}

expect(seleniumBooks).toHaveLength(1);


//6) calculate the total price 
let totalprice =0; 

for(let row of allrowdata.slice(1))
{
const cells =await row.locator('td').allInnerTexts();
const price =cells[3];
totalprice =totalprice + parseInt(price);  //convert string to number

}
 console.log("total price is :", totalprice); 
expect(totalprice).toBe(7100);




})