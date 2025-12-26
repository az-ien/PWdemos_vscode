//playwright closes the popup automatically and closes it without us showing the alert 
//in selenium manually close is required 
//by default playwright will dismiss dialogue boxes and alerts but there are some actions that can be used in playwright 
//dialog.accpet or dialog.miss
//there are alos called JS alerts that are dislayed at the top of the screen that cannot be interacted with
//popups and alerts are different 
//in selenium need to close the alerts and poups manually by adding some event like click
//event handling has to be done before the event so that the event happens with the desired handling.
//after event has happened then there wont be anything to do as playwright will auto handle it and nothing can be done 






import{test, expect, Locator} from "@playwright/test"




test("simple dialog",async ({page})=>{ 
await page.goto('https://testautomationpractice.blogspot.com/');


//event and an arrow function takes the event dialog and accepts it. playwright statement. this is a short form 
//enabling alert handler 
page.on('dialog', (dialog) => {
    console.log('dialog type is:', dialog.type());     //returns the type of dialog
    expect(dialog.type()).toContain('alert');
    console.log('dialog text is:', dialog.message());  //returns the message on the dialog
    expect(dialog.message()).toContain('I am an alert box!');
    dialog.accept()

})

await page.locator("#alertBtn").click();
await page.waitForTimeout(5000);
})




test("confirmation alert",async ({page})=>{ 
await page.goto('https://testautomationpractice.blogspot.com/');


//event and an arrow function takes the event dialog and accepts it. playwright statement. this is a short form 
//enabling alert handler 
page.on('dialog', (dialog) => {
    console.log('dialog type is:', dialog.type());     //returns the type of dialog
    expect(dialog.type()).toContain('confirm');
    console.log('dialog text is:', dialog.message());  //returns the message on the dialog
    expect(dialog.message()).toContain('Press a button!');
    dialog.accept()  // close dialoge by accepting 
    //dialog.dismiss()  // close dialoge by dismiss 

})

await page.locator("#confirmBtn").click();
const text: string = await  page.locator('#demo').innerText()
console.log('output text:', text);
//await expect(page.locator('#demo')).toHaveText('You pressed Cancel!');
await expect(page.locator('#demo')).toHaveText('You pressed OK!');
await page.waitForTimeout(5000);
})






test.only("prompt dialog",async ({page})=>{ 
await page.goto('https://testautomationpractice.blogspot.com/');


//event and an arrow function takes the event dialog and accepts it. playwright statement. this is a short form 
//enabling alert handler 
page.on('dialog', (dialog) => {
    console.log('dialog type is:', dialog.type());     //returns the type of dialog
    expect(dialog.type()).toContain('prompt');
    console.log('dialog text is:', dialog.message());  //returns the message on the dialog
    expect(dialog.message()).toContain('Please enter your name:');
    expect(dialog.defaultValue()).toContain('Harry Potter');  //checks default value of the dialog   
    dialog.accept('John')  // close dialoge by accepting after entering and sending the text

})

await page.locator("#promptBtn").click();
const text: string = await  page.locator('#demo').innerText()
console.log('output text:', text);
await expect(page.locator('#demo')).toHaveText('Hello John! How are you today?');
await page.waitForTimeout(5000);
})