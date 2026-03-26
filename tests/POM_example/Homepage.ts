// this file imports the objects
// performs actions on them and exports which is received by the fixture 

import { Page,expect } from "@playwright/test";
import { HomepageLocators } from "./HomepageLocaters";

export class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("https://testautomationpractice.blogspot.com/");
  }

  async getUrl() {
    return this.page.url();
  }

async clickonStartbutton() {
    // wait for the click to finish
    await this.page.locator(HomepageLocators.startBtn).click();

    // assert the Stop button contains "STOP"
    await expect(this.page.locator(HomepageLocators.stopBtn)).toContainText("STOP");

    // optional: log the actual text
    const stopButtonText = await this.page.locator(HomepageLocators.stopBtn).innerText();
    console.log("after click now the button text is:", stopButtonText);

}


  async clickonStopbutton() {
    // wait for click to complete
    await this.page.locator(HomepageLocators.stopBtn).click();

    // now assert the Start button text contains "START"
    await expect(this.page.locator(HomepageLocators.startBtn)).toContainText("START");

    // log the text if you want to inspect it
    const startButtonText = await this.page.locator(HomepageLocators.startBtn).innerText();
    console.log("After click, button text is:", startButtonText);


}



}