import{test, expect, Locator,Page} from "@playwright/test"

// create a reusuable function so that both handles furture and past and it can be used for any date picker it increases usability 
//pass parameters and page fixture becaue of automation test, page is imported 
// need to tell the function that if it is a past date or future date, in real sites there is no past date only future because what to do with the past 
// but why tell it why not the code find it self ??? will probably use the current date as a refernce point and then click previous or next 
//async needed for the function
//pass parameters to the function and function has its own parameters  


async function selectDate(targetYear: string, targetMonth:string, targetDate:string, page:Page, iffuture: Boolean)
{


// use while loop with the true condition as we donot know how many times do we click to reach the target date
// continuously gets true but when it matches so it breaks 
while(true)
{
 const currentMonth = await  page.locator('.ui-datepicker-month').textContent();
 const currentYear = await  page.locator('.ui-datepicker-year').textContent();

 if(currentMonth === targetMonth && currentYear === targetYear )
 { 
    break;
 }

 if(iffuture)
  {//Future
   await page.locator("a[title='Next']").click();
  }

  else
  {//Past
   await page.locator("a[title='Prev']").click();
  }


}

// now loop for dates and then compare and check the dates after the month and year 
// so this loop is the after that loop 

const allDates = await page.locator('.ui-datepicker-calendar td').all();

// we know how many dats are so you cna use a for of or while till the allDates returns true for elements available 
// so for loop is easier 

for(let dt of allDates)
{
   const dateText = await dt.innerText();

   if(dateText === targetDate) 
   { 
      await dt.click()
      break;
   }
   
}


await page.waitForTimeout(3000);

}





test("jQuery datepicker",async ({page})=>{

await page.goto("https://testautomationpractice.blogspot.com/");
const dateInput: Locator = page.locator('#datepicker');
expect (dateInput).toBeVisible();


//Approach 1: using fill() mthod
//dateInput.fill('06/20/2025'); //mm/dd/yyyy

//Approach 2: using date picker
await dateInput.click(); //opens the date picker 

// select target date
const year  ='2021';
const month = 'December';
const date = '12';

selectDate(year, month, date, page, false ); 
const expectedDate ='12/12/2021'
await expect(dateInput).toHaveValue(expectedDate);


await page.waitForTimeout(5000);



})