//autoamtion is: 1.identify element, 2. perfrom action, 3. assertion 
//playwirght have their own built locators, then css priority then xpaths priority (not recomended in playwright)
//locator: identifies element on the page Document Object Model( api interface created by the browser when page is loaded)  using an attribute 
//Playwright's in built ability for: auto-waiting and retry-ability not in selenium
//auto-waiting: Playwright sctipt automatically waits for element to be visible, so no implicit wait requried
//retry-ability: trying to get again and again the element (like explicit/fluent wait)
//js and ts all same but in ts type is needed. everything else is same

//page.getByRole() to locate by explicit and implicit accessibility attributes.
//page.getByText() to locate by text content.
//page.getByLabel() to locate a form control by associated label's text.
//page.getByPlaceholder() to locate an input by placeholder.
//page.getByAltText() to locate an element, usually image, by its text alternative.
//page.getByTitle() to locate an element by its title attribute.
//page.getByTestId() to locate an element based on its data-testid attribute (other attributes can be configured).


import{test, expect, Locator} from "@playwright/test"



test("Demo on PLaywright Locators",async ({page})=>{

    await page.goto("https://demo.nopcommerce.com/");

    //1.page.getByAltText()  must have alt attribute 
     let logo: Locator = page.getByAltText("nopCommerce demo store");
    await expect(logo).toBeVisible();

    //2.page.getByText() byt text, substring, exact string, or regular expression but it is case-sensitive
    //let text: Locator =page.getByText("Welcome to our store");
    //await expect(text).toBeVisible();

    await expect(page.getByText("Welcome to our store")).toBeVisible();
    await expect(page.getByText("Welcome to")).toBeVisible();
    await expect(page.getByText(/Welcome\s+TO\sOUR\s+STORE/i)).toBeVisible();  //regular expression, 'i' ignores case-sensitivity

    //3.page.getByRole() how the browser and screen readers understand the element, not how it looks in the HTML.You don't need to specify these roles. The browser already knows them.
    //get it by using any attribute of the element 
    //implicit = tags available and attribute value is available  (no need for attribute)
    //explicit = use what does a tag might look like but is not there in the element and the name of it  may be like an attribute
    await page.getByRole("link",{name:'Register'}).click();
    await expect(page.getByRole("heading",{name:'Register'})).toBeVisible();

    //4.page.getByLabel()
    await page.getByLabel('First name:').fill("John");
    await page.getByLabel('Last name:').fill("Mike");
    await page.getByLabel('Email:').fill("john.mike@gmail.com");


    //5.page.getByPlaceholder()
    //without a label but a placeholder
    await page.getByPlaceholder("Search store").fill("Apple macbook pro");







})

