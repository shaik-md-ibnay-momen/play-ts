import { Page } from "playwright";

export class ContactUs {
    readonly contactUsButton: string;
    readonly formTitle: string;
    readonly nameInput: string;
    readonly emailInput: string;
    readonly subjectInput: string
    readonly messageInput: string;
    readonly fileUploadInput: string;
    readonly submitButton: string;
    readonly successMessage: string;

    constructor(page: Page) {
        this.contactUsButton = `a[href="/contact_us"]`;
        this.formTitle = `.contact-form > h2`;
        this.nameInput = `input[data-qa="name"]`;
        this.emailInput = `input[data-qa="email"]`;
        this.subjectInput = `input[data-qa="subject"]`;
        this.messageInput = `textarea[data-qa="message"]`;
        this.fileUploadInput = `[name="upload_file"]`;
        this.submitButton = `[data-qa="submit-button"]`;
        this.successMessage = `.status.alert.alert-success`;
         }
}