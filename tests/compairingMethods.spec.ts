import{test, expect, Locator} from "@playwright/test"

test("Comparing Methods",async ({page})=>{

await page.goto('https://demowebshop.tricentis.com/');

const products: Locator = page.locator('.product-title');   //contains a group of elements but not an array so loops easier not for of or for in 

// //1) innerText() vs textContent()  -- returns text of just one element at a time
// console.log(await products.nth(1).innerText());  // only text that is on ui
// console.log(await products.nth(1).textContent());  // gets everything hidden elements
// const count = await products.count();

// for (let i =0; i < count; i++ )
// {
// //console.log(await products.nth(i).innerText());

// console.log(await products.nth(i).textContent());
// }


// //2) allInnterText() Vs AllTextContent()  -- returns text of the total group so returns an array
//for of and for in can be used as returned is array/string

// const productNames: string[] = await  products.allInnerTexts();  
// console.log("product names captured by allinnertext:", productNames );


// const productNames: string[] = await  products.allTextContents();  
// console.log("product names captured alltextcontent:", productNames );

// const productNamesTrimmed:string[] = productNames.map(text=>text.trim()); //returns array that map maps and then trims so add to array
// console.log("product names after trimmed:", productNamesTrimmed );
// 


//3) all() captures of all elements that are returned as an locator array 

const productsLocators: Locator[] = await products.all();
//console.log(productsLocators);

console.log( await productsLocators[1].innerText());

for (let productloc of productsLocators)
{
console.log( await productloc.innerText());
}


for (let i in productsLocators)
{
console.log( await productsLocators[i].innerText());
}






















})