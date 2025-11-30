import{test, expect, Locator} from "@playwright/test"




test("Xpath axes demo",async ({page})=>{

await page.goto("https://www.w3schools.com/html/html_tables.asp");

//self
const germanycell:Locator = page.locator("//td[text()='Germany']/self::td")
await expect(germanycell).toHaveText('Germany');

//parent
const parentRow:Locator = page.locator("//td[text()='Germany']/parent::tr")
await expect(parentRow).toContainText('Alfreds Futterkiste Maria Anders Germany');
console.log(await parentRow.textContent());


//child td children of second row tr
const secondRowCells:Locator = page.locator("//table[@id='customers']//tr[3]/child::td") //as three seperate td are returned so text not there but count is
await expect(secondRowCells).toHaveCount(3);


//gets ancestor of germany 
const table:Locator = page.locator("//td[text()='Germany']//ancestor::table")
await expect(table).toHaveAttribute('id','customers');

//descendent get all td under table
const allTds:Locator = page.locator("//table[@id='customers']/descendant::td")
await expect(allTds).toHaveCount(18);


//following get td that comes after germany ind ocument order
const followingCell:Locator = page.locator("//td[text()='Germany']/following::td[1]")
await expect(followingCell).toHaveText("Centro comercial Moctezuma");




//following-sibling get td that comes after germany in document order
const rightsibling:Locator = page.locator("//td[text()='Germany']/following-sibling::td")
await expect(rightsibling).toHaveCount(0);



//following-sibling get td that comes after Maria Anders in document order
const rightsiblingwithvalue:Locator = page.locator("//td[text()='Maria Anders']/following-sibling::td")
await expect(rightsiblingwithvalue).toHaveCount(1);


//preceding get td that comes before germany in document order
const precedingCell:Locator = page.locator("//td[text()='Germany']/preceding::td[1]")
await expect(precedingCell).toHaveText("Maria Anders");


//preceding-siblings get td to the left of germany
const precedingsiblingCell:Locator = page.locator("//td[text()='Germany']/preceding-sibling::td")
await expect(precedingsiblingCell).toHaveCount(2);
await expect(precedingsiblingCell.nth(0)).toHaveText("Alfreds Futterkiste");
await expect(precedingsiblingCell.nth(1)).toHaveText("Maria Anders");


})