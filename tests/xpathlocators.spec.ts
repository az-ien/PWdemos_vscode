import {test,expect,Locator} from "@playwright/test";

test("Xpath demo in playwirght",async ({page})=>{
await page.goto("https://demowebshop.tricentis.com/");

// absolute and relative xpaths

//1. absolute xpath - logo
const absolutelogo = page.locator("xpath=/html/body/div[4]/div[1]/div[1]/div[1]/a/img");  // why with double slash here ????? should be single slash so need to add keyword xpath
await expect(absolutelogo).toBeVisible();

//2. Relative xpath -logo
const relativelogo = page.locator("//img[@alt='Tricentis Demo Web Shop']");
await expect(relativelogo).toBeVisible();

//3. contains -- this returns multiple values so that can be converted into a string and itrate in loop
const product = page.locator("//h2/a[contains(@href,'computer')]");
const productcount: number = await  product.count();
console.log("No. of computer products", productcount)
expect(productcount).toBeGreaterThan(0);

console.log("firt computer related product: ", await product.first().textContent());  // as the xpath is getting 4 elements so it can be treated as an array
console.log("last computer related product: ", await product.last().textContent());  // as the xpath is getting 4 elements so it can be treated as an array 
console.log("third computer related product: ", await product.nth(2).textContent());  // as the xpath is getting 4 elements so it can be treated as an array, index starts from 0


// string and forloop to traverse it 
let productTiles: string[] = await product.allTextContents();

for(let pt of productTiles) // value is saved in pt of product tiles
{
    console.log(pt);
}

//4. start-with() -- keywords in xpath, something new 
const buildingProducts = page.locator("//h2/a[starts-with(@href,'build')]");
const buildingcount: number = await  buildingProducts.count();
expect(productcount).toBeGreaterThan(0);





})