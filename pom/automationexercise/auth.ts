import { Page } from "playwright";

export class RegisterUser {
  readonly signupButton: string;
  readonly formTitle: string;
  readonly name: string;
  readonly email: string;
  readonly submitButton: string;
  readonly confirmationTitle: string;
  readonly mr: string;
  readonly mrs: string
  readonly nameBox: string;
  readonly emailBox: string;
  readonly passwordBox: string;
  readonly day: string;
  readonly month: string
  readonly year: string;
  readonly newsletter: string;
  readonly offer: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly company: string;
  readonly address1: string
  readonly address2: string;
  readonly country: string
  readonly state: string;
  readonly city: string
  readonly zipcode: string;
  readonly mobile: string;
  readonly createAccountButton: string;
  readonly accountCreatedTitle: string;
  readonly continueButton: string;
  readonly loggedInAs: string;
  readonly deleteaccountButton: string;
  readonly deleteconfirmationTitle: string;
  readonly alreadyExistWarning: string;

  constructor(page: Page) {
    this.signupButton = `a[href="/login"]`;
    this.formTitle = `.signup-form > h2`;
    this.name = `[data-qa="signup-name"]`;
    this.email = `[data-qa="signup-email"]`;
    this.submitButton = `[data-qa="signup-button"]`;
    this.confirmationTitle = `.title.text-center:first-child`;
    this.mr = `#id_gender1`;
    this.mrs = `#id_gender2`;
    this.nameBox = `#name`;
    this.emailBox = `#email`;
    this.passwordBox = `#password`;
    this.day = `#days`;
    this.month = `#months`;
    this.year = `#years`;
    this.newsletter = `#newsletter`;
    this.offer = `#optin`;
    this.firstName = `#first_name`;
    this.lastName = `#last_name`;
    this.company = `#company`;
    this.address1 = `#address1`;
    this.address2 = `#address2`;
    this.country = `#country`;
    this.state = `#state`;
    this.city = `#city`;
    this.zipcode = `#zipcode`;
    this.mobile = `#mobile_number`;
    this.createAccountButton = `[data-qa="create-account"]`;
    this.accountCreatedTitle = `[data-qa="account-created"]`;
    this.continueButton = `[data-qa="continue-button"]`;
    this.loggedInAs = `.nav.navbar-nav> li:nth-child(10)`;
    this.deleteaccountButton = `a[href="/delete_account"]`;
    this.deleteconfirmationTitle = `[data-qa="account-deleted"]`;
    this.alreadyExistWarning = `p:has-text("Email Address already exist!")`;


  }
}

export class LoginUser {
  
  readonly formTitle: string;
  readonly email: string;
  readonly password: string;
  readonly loginButton: string;
  readonly warningMessage: string;
  readonly logoutButton: string;

  constructor(page: Page) {
    this.formTitle = `.login-form > h2`;
    this.email = `[data-qa="login-email"]`;
    this.password = `[data-qa="login-password"]`;
    this.loginButton = `[data-qa="login-button"]`;
    this.warningMessage = `[action="/login"]>p`;
    this.logoutButton = `a[href="/logout"]`;


  }
}