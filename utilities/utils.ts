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
    console.log(` Passed - actual: "${actual}" | expected: "${expected}" | type: ${type}`);

  } catch (error) {
    const actual = this.page.url();
    const errorMsg = ` Failed - actual: "${actual}" | expected: "${expected}" | type: ${type}`;
    console.log(errorMsg);
    throw error;
  }
}

async waitFor(ms: number, message?: string): Promise<void> {
  console.log(message ?? `⏳ Waiting for ${ms}ms...`);
  await this.page.waitForTimeout(ms);
  console.log(` Wait complete: ${ms}ms`);
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

    console.log(` Passed - actual: "${actual.trim()}" | expected: "${expected}" | type: ${type}`);

  } catch (error) {
    const actual = await this.page.locator(locator).innerText().catch(() => 'Could not extract text');
    const errorMsg = ` Failed - actual: "${actual.trim()}" | expected: "${expected}" | type: ${type}`;
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
    console.log(`Extracted text: "${text.trim()}"`);
    return text.trim();

  } catch (error) {
    const errorMsg = `Failed to extract text from element`;
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
    console.log(` Clicked on: ${name}`);

  } catch (error) {
    const errorMsg = ` Failed to click on: ${name}`;
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

    console.log(` Selected option "${value}" by ${selectBy} in: ${name}`);

  } catch (error) {
    const errorMsg = ` Failed to select option "${value}" in: ${name}`;
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
    console.log(` Uploaded ${files.length} file(s) to: ${name}`);
    files.forEach((f, i) => console.log(`   📎 File ${i + 1}: ${f}`));

  } catch (error) {
    const errorMsg = ` Failed to upload file(s) to: ${name}`;
    console.log(errorMsg);
    throw new Error(errorMsg);
  }
}

async isVisible(
  locator: string,
  expectedVisible: boolean = true,
  timeout: number = 5000,
  elementName?: string
): Promise<boolean> {
  const name = elementName ?? 'element';

  try {
    await this.page.waitForSelector(locator, {
      state: expectedVisible ? 'visible' : 'hidden',
      timeout,
    });

    const visible = await this.page.isVisible(locator);

    if (expectedVisible && visible) {
      console.log(` ${name} is visible as expected`);
    } else if (!expectedVisible && !visible) {
      console.log(` ${name} is hidden as expected`);
    } else {
      throw new Error(` ${name} visibility mismatch | expected: ${expectedVisible} | actual: ${visible}`);
    }

    return visible;

  } catch (error) {
    const visible = await this.page.isVisible(locator).catch(() => false);
    const errorMsg = ` Failed visibility check on: ${name} | expected: ${expectedVisible} | actual: ${visible}`;
    console.log(errorMsg);
    throw new Error(errorMsg);
  }
}


async getList(
  locator: string,
  childLocator: string,
  elementName?: string,
  timeout: number = 5000
): Promise<string[]> {
  const name = elementName ?? 'elements';

  try {
    await this.page.locator(locator).first().waitFor({ state: 'visible', timeout });

    const elements = await this.page.locator(`${locator} ${childLocator}`).all();

    if (elements.length === 0) {
      console.log(`No elements found for: ${name}`);
      return [];
    }

    const texts = await Promise.all(elements.map(el => el.innerText()));
    const trimmed = texts.map(t => t.trim()).filter(t => t.length > 0);

    console.log(` Found ${trimmed.length} ${name}:`);
    trimmed.forEach((text, i) => console.log(` Item ${i + 1}: "${text}"`));

    return trimmed;

  } catch (error) {
    const errorMsg = ` Failed to get texts from: ${name}`;
    console.log(errorMsg);
    throw new Error(errorMsg);
  }
}

async scroll(
  direction: 'up' | 'down' | 'top' | 'bottom',
  target?: 'page' | string,
  amount?: number,
  elementName?: string
): Promise<void> {
  const name = elementName ?? 'page';

  try {
    if (direction === 'top') {
      await this.page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
      return;
    }

    if (direction === 'bottom') {
      await this.page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }));
      return;
    }

    if (target && target !== 'page') {
      await this.page.locator(target).waitFor({ state: 'visible' });
      await this.page.locator(target).scrollIntoViewIfNeeded();
      return;
    }
    const pixels = amount ?? 500;
    const scrollAmount = direction === 'down' ? pixels : -pixels;
    await this.page.evaluate((y) => window.scrollBy({ top: y, behavior: 'smooth' }), scrollAmount);

  } catch (error) {
    const errorMsg = `Failed to scroll ${direction} on: ${name}`;
    console.log(errorMsg);
    throw new Error(errorMsg);
  }
}


async mouseHover(
  locator: string,
  waitAfterHover?: number,
  elementName?: string,
  timeout: number = 5000
): Promise<void> {
  const name = elementName ?? 'element';

  try {
    await this.page.waitForSelector(locator, { state: 'visible', timeout });

    const isVisible = await this.page.isVisible(locator);

    if (!isVisible) {
      throw new Error(`${name} is not visible, cannot hover`);
    }

    await this.page.locator(locator).hover();
    console.log(` Hovered over: ${name}`);

    if (waitAfterHover) {
      await this.page.waitForTimeout(waitAfterHover);
      console.log(`⏳ Waited ${waitAfterHover}ms after hover on: ${name}`);
    }

  } catch (error) {
    const errorMsg = `Failed to hover over: ${name}`;
    console.log(errorMsg);
    throw new Error(errorMsg);
  }
}

async multiClick(
  locator: string,
  count: number = 3,
  delayBetweenClicks: number = 300,
  elementName?: string,
  timeout: number = 5000
): Promise<void> {
  const name = elementName ?? 'element';

  try {
    await this.page.waitForSelector(locator, { state: 'visible', timeout });

    const isVisible = await this.page.isVisible(locator);

    if (!isVisible) {
      throw new Error(`${name} is not visible, cannot click`);
    }

    for (let i = 1; i <= count; i++) {
      await this.page.locator(locator).click();
      console.log(`   🖱️ Click ${i} of ${count} on: ${name}`);
      if (delayBetweenClicks && i < count) {
        await this.page.waitForTimeout(delayBetweenClicks);
      }
    }

    console.log(`✅ Clicked ${count} times on: ${name}`);

  } catch (error) {
    const errorMsg = `Failed to click ${count} times on: ${name}`;
    console.log(errorMsg);
    throw new Error(errorMsg);
  }
}

}

