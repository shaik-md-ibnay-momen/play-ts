import { Page } from "playwright";

export class AjaxForm {
  readonly name: string;
  readonly massage: string;
  readonly submitButton: string;
  readonly sucess: string;
  readonly pageTitle: string;
  readonly formTitle: string;

  constructor(page: Page) {
    this.name = `#title`;
    this.massage = `#description`;
    this.submitButton = `#btn-submit`;
    this.sucess = `#submit-control`;
    this.pageTitle = `[css="2"][data-next-head]`;
    this.formTitle = `.py-50`;
  }
}