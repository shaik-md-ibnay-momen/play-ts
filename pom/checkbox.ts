import { Locator, Page } from "playwright";

export class CheckBox {
  readonly title1: Locator;
  readonly title2: Locator;
  readonly title3: Locator;
  readonly singleCheckbox: Locator;

  readonly disabledOption1: Locator;
  readonly disabledOption2: Locator;
  readonly disabledOption3: Locator;
  readonly disabledOption4: Locator;

  readonly multipleOption1: Locator;
  readonly multipleOption2: Locator;
  readonly multipleOption3: Locator;
  readonly multipleOption4: Locator;

  constructor(page: Page) {
    this.title1 = page.getByRole('heading', { name: 'Single Checkbox Demo', level: 2 });
    this.title2 = page.getByRole('heading', { name: 'Disabled Checkbox Demo', level: 2 });
    this.title3 = page.getByRole('heading', { name: 'Multiple Checkbox Demo', level: 2 });
    this.singleCheckbox = page.getByLabel('Click on check box');

    this.disabledOption1 = page.locator('div.mt-40').nth(1).getByLabel('Option 1');
    this.disabledOption2 = page.locator('div.mt-40').nth(1).getByLabel('Option 2');
    this.disabledOption3 = page.locator('div.mt-40').nth(1).getByLabel('Option 3');
    this.disabledOption4 = page.locator('div.mt-40').nth(1).getByLabel('Option 4');

    this.multipleOption1 = page.locator('div.mt-40').nth(2).getByLabel('Option 1');
    this.multipleOption2 = page.locator('div.mt-40').nth(2).getByLabel('Option 2');
    this.multipleOption3 = page.locator('div.mt-40').nth(2).getByLabel('Option 3');
    this.multipleOption4 = page.locator('div.mt-40').nth(2).getByLabel('Option 4');
  }
}