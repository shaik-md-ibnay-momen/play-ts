import { expect, Page, Locator  } from "@playwright/test";
//import { allure } from "allure-playwright";
import logger from "./logger"; // Import Winston Logger

export class Utils {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(url: string): Promise<void> {
  try {  
        await expect(async () => {
        await this.page.goto(url, { waitUntil: 'domcontentloaded' });
      }).toPass();
        console.log(`Navigated to: ${url}`);
      }catch (error) {
        const errorMsg = `Failed to navigate to ${url}`;
        throw new Error(errorMsg);

      }
    }

async verifyUrl(
  expected: string,
  type: 'exact' | 'contains' | 'startsWith' | 'endsWith' = 'exact',
  timeout: number = 5000,
  message?: string
): Promise<void> {
  try {
    console.log(message ?? `Verify URL [${type}]: "${expected}"`);

    switch (type) {
      case 'exact':
        await expect(this.page).toHaveURL(expected, { timeout });
        break;
      case 'contains':
        await expect(this.page).toHaveURL(new RegExp(expected), { timeout });
        break;
      case 'startsWith':
        await expect(this.page).toHaveURL(new RegExp(`^${expected}`), { timeout });
        break;
      case 'endsWith':
        await expect(this.page).toHaveURL(new RegExp(`${expected}$`), { timeout });
        break;
      default:
        throw new Error(`Unknown type: "${type}"`);
    }

    const actual = this.page.url();
    console.log(`✅ Passed - actual: "${actual}" | expected: "${expected}" | type: ${type}`);

  } catch (error) {
    const actual = this.page.url();
    const errorMsg = `❌ Failed - actual: "${actual}" | expected: "${expected}" | type: ${type}`;
    console.log(errorMsg);
    throw error;
  }
}

async waitFor(ms: number, message?: string): Promise<void> {
  console.log(message ?? `⏳ Waiting for ${ms}ms...`);
  await this.page.waitForTimeout(ms);
  console.log(`✅ Wait complete: ${ms}ms`);
}

async verifyText(
  locator: string,
  expected: string,
  type: 'exact' | 'contains' | 'startsWith' | 'endsWith' = 'exact',
  message?: string
): Promise<void> {
  try {

    const actual = await this.page.locator(locator).innerText();
    console.log(message ?? `Verify text [${type}]: "${expected}"`);

    switch (type) {
      case 'exact':
        expect(actual.trim()).toBe(expected);
        break;
      case 'contains':
        expect(actual.trim()).toContain(expected);
        break;
      case 'startsWith':
        expect(actual.trim()).toMatch(new RegExp(`^${expected}`));
        break;
      case 'endsWith':
        expect(actual.trim()).toMatch(new RegExp(`${expected}$`));
        break;
      default:
        throw new Error(`Unknown type: "${type}"`);
    }

    console.log(`✅ Passed - actual: "${actual.trim()}" | expected: "${expected}" | type: ${type}`);

  } catch (error) {
    const actual = await this.page.locator(locator).innerText().catch(() => 'Could not extract text');
    const errorMsg = `❌ Failed - actual: "${actual.trim()}" | expected: "${expected}" | type: ${type}`;
    console.log(errorMsg);
    throw error;
  }
}

async extractText(
  locator: string,
  waitForAjax: boolean = false,
  timeout: number = 5000
): Promise<string> {
  try {
    // Wait for element to appear (useful after ajax)
    await this.page.locator(locator).waitFor({ state: 'visible', timeout });
    const text = await this.page.locator(locator).innerText();
    console.log(`✅ Extracted text: "${text.trim()}"`);
    return text.trim();

  } catch (error) {
    const errorMsg = `❌ Failed to extract text from element`;
    console.log(errorMsg);
    throw error;
  }
}


  async typeText(
    locator: string,
    text: string,
    clear: boolean = true
  ): Promise<void> {
    try {
      await this.page.isVisible(locator);

      if (clear) {
        await this.page.locator(locator).clear();
      }

      await this.page.locator(locator).fill(text);
      console.log(`Typed "${text}" into input`);
    } catch (error) {
      const errorMsg = `Failed to type "${text}" into input`;
      console.log(errorMsg);
      throw new Error(errorMsg);
    }
  }
  
async clickButton(locator: string, elementName?: string): Promise<void> {
  const name = elementName ?? 'element';
  
  try {
    await this.page.waitForSelector(locator, { state: 'visible' });
    
    const isVisible = await this.page.isVisible(locator);
    
    if (!isVisible) {
      throw new Error(`${name} is not visible, cannot click`);
    }

    await this.page.locator(locator).click();
    console.log(`✅ Clicked on: ${name}`);

  } catch (error) {
    const errorMsg = `❌ Failed to click on: ${name}`;
    console.log(errorMsg);
    throw new Error(errorMsg);
  }
}

async selectOption(
  locator: string,
  value: string,
  selectBy: 'value' | 'label' | 'index' = 'label',
  elementName?: string
): Promise<void> {
  const name = elementName ?? 'dropdown';

  try {
    await this.page.waitForSelector(locator, { state: 'visible' });

    const isVisible = await this.page.isVisible(locator);

    if (!isVisible) {
      throw new Error(`${name} is not visible, cannot select option`);
    }

    switch (selectBy) {
      case 'value':
        await this.page.locator(locator).selectOption({ value });
        break;
      case 'label':
        await this.page.locator(locator).selectOption({ label: value });
        break;
      case 'index':
        await this.page.locator(locator).selectOption({ index: Number(value) });
        break;
      default:
        throw new Error(`Unknown selectBy type: "${selectBy}"`);
    }

    console.log(`✅ Selected option "${value}" by ${selectBy} in: ${name}`);

  } catch (error) {
    const errorMsg = `❌ Failed to select option "${value}" in: ${name}`;
    console.log(errorMsg);
    throw new Error(errorMsg);
  }
}

async uploadFile(
  locator: string,
  filePath: string | string[],
  elementName?: string
): Promise<void> {
  const name = elementName ?? 'file input';

  try {
    await this.page.waitForSelector(locator, { state: 'attached' });

    const isVisible = await this.page.isVisible(locator);

    if (!isVisible) {
      throw new Error(`${name} is not visible, cannot upload file`);
    }

    await this.page.locator(locator).setInputFiles(filePath);

    const files = Array.isArray(filePath) ? filePath : [filePath];
    console.log(`✅ Uploaded ${files.length} file(s) to: ${name}`);
    files.forEach((f, i) => console.log(`   📎 File ${i + 1}: ${f}`));

  } catch (error) {
    const errorMsg = `❌ Failed to upload file(s) to: ${name}`;
    console.log(errorMsg);
    throw new Error(errorMsg);
  }
}

async handleAlert(
  action: 'accept' | 'dismiss' = 'accept',
  inputText?: string,
  expectedMessage?: string,
  timeout: number = 10000,
  elementName?: string
): Promise<void> {
  const name = elementName ?? 'alert';

  try {
    // ✅ Register listener BEFORE any action
    const dialogPromise = new Promise<void>((resolve, reject) => {
      const timer = setTimeout(() => {
        this.page.removeAllListeners('dialog');
        reject(new Error(`⏱️ Timed out waiting for ${name} to appear`));
      }, timeout);

      this.page.on('dialog', async (dialog) => {
        clearTimeout(timer);
        try {
          const actualMessage = dialog.message();
          const dialogType = dialog.type();

          console.log(`🔔 ${dialogType} detected | message: "${actualMessage}"`);

          if (expectedMessage) {
            expect(actualMessage).toContain(expectedMessage);
            console.log(`✅ Message verified: "${actualMessage}"`);
          }

          if (action === 'accept') {
            inputText ? await dialog.accept(inputText) : await dialog.accept();
          } else {
            await dialog.dismiss();
          }

          console.log(`✅ ${action === 'accept' ? 'Clicked OK' : 'Clicked Cancel'} on ${dialogType}`);
          resolve();

        } catch (err) {
          reject(err);
        } finally {
          this.page.removeAllListeners('dialog');
        }
      });
    });

    return dialogPromise; // ✅ Return the promise — caller decides when to trigger

  } catch (error) {
    this.page.removeAllListeners('dialog');
    const errorMsg = `❌ Failed to handle ${name} | ${error instanceof Error ? error.message : error}`;
    console.log(errorMsg);
    throw new Error(errorMsg);
  }
}

}

