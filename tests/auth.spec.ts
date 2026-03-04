import { test } from "../utilities/fixtures";
import registerData from "../testData/automationexercise/register.json";
import loginData from "../testData/automationexercise/login.json";

class RegisterTests {
  
  runTests() { 

    test.describe("Auth Testing", () => {
      test.beforeEach(async ({ runner }) => {
        await runner.navigateTo(registerData.siteUrl);
      });

      test("Register User", async ({ runner, register }) => {
        await runner.clickButton(register.signupButton, " Signup / Login");
        await runner.verifyText(register.formTitle, registerData.formTitle, "exact", "Verify form title is correct");
        await runner.typeText(register.name, registerData.nameBox);
        await runner.typeText(register.email, registerData.emailBox);
        await runner.clickButton(register.submitButton, "Signup Btn");
        await runner.verifyText(register.confirmationTitle, registerData.confirmationTitle, "exact", "Verify form title is correct");
        await runner.clickButton(register.mr);
        await runner.typeText(register.passwordBox, registerData.passwordBox);
        await runner.selectOption(register.day, registerData.dob);
        await runner.selectOption(register.month, registerData.dobMonth);
        await runner.selectOption(register.year, registerData.dobYear);
        await runner.clickButton(register.newsletter);
        await runner.clickButton(register.offer);
        await runner.typeText(register.firstName, registerData.firstnameBox);
        await runner.typeText(register.lastName, registerData.lastnameBox);
        await runner.typeText(register.company, registerData.companyBox);
        await runner.typeText(register.address1, registerData.address1Box);
        await runner.typeText(register.address2, registerData.address2Box);
        await runner.selectOption(register.country, registerData.country);
        await runner.typeText(register.state, registerData.stateBox);
        await runner.typeText(register.city, registerData.cityBox);
        await runner.typeText(register.zipcode, registerData.zipcodeBox);
        await runner.typeText(register.mobile, registerData.mobileBox);
        await runner.clickButton(register.createAccountButton, "Create Account Btn");
        await runner.verifyText(register.accountCreatedTitle, registerData.accountCreatedTitle, "exact", "Verify account created title is correct");
        await runner.clickButton(register.continueButton, "Continue Btn");
        await runner.verifyText(register.loggedInAs, `Logged in as ${registerData.nameBox}`, "exact", "Verify logged in username is correct");
        await runner.clickButton(register.deleteaccountButton, "Delete Account Btn");
        await runner.verifyText(register.deleteconfirmationTitle, registerData.deleteconfirmationTitle, "exact", "Verify account deleted title is correct");

      });

      
      test("Login User with correct email and password", async ({ runner, login ,register}) => {

        await runner.clickButton(register.signupButton, " Signup / Login");
        await runner.verifyText(login.formTitle, loginData.formTitle, "exact");
        await runner.typeText(login.email, loginData.email);
        await runner.typeText(login.password, loginData.password);
        await runner.clickButton(login.loginButton, "Login Btn");
        await runner.verifyText(register.loggedInAs, `Logged in as `, "contains", "Verify logged in username is correct");

        
      });

      test("Login User with incorrect email and password", async ({ runner, login ,register}) => {

        await runner.clickButton(register.signupButton, " Signup / Login");
        await runner.verifyText(login.formTitle, loginData.formTitle, "exact");
        await runner.typeText(login.email, loginData.wrongEmail);
        await runner.typeText(login.password, loginData.wrongPassword);
        await runner.clickButton(login.loginButton, "Login Btn");
        await runner.verifyText(login.warningMessage, loginData.warningMessage, "exact", "Verify warning message is correct");
      });

      test("Logout User", async ({ runner, login ,register}) => {
        await runner.clickButton(register.signupButton, " Signup / Login");
        await runner.verifyText(login.formTitle, loginData.formTitle, "exact");
        await runner.typeText(login.email, loginData.email);
        await runner.typeText(login.password, loginData.password);
        await runner.clickButton(login.loginButton, "Login Btn");
        await runner.verifyText(register.loggedInAs, `Logged in as `, "contains", "Verify logged in username is correct");
        await runner.clickButton(login.logoutButton, "Logout Btn");
        await runner.verifyUrl(loginData.loginUrl, "exact", 5000, "Verify user is logged out");
      });

      test("Register User with existing email", async ({ runner, login ,register}) => {
        await runner.clickButton(register.signupButton, " Signup / Login");
        await runner.verifyText(register.formTitle, registerData.formTitle, "exact", "Verify form title is correct");
        await runner.typeText(register.name, registerData.nameBox);
        await runner.typeText(register.email, loginData.email);
        await runner.clickButton(register.submitButton, "Signup Btn");
        await runner.verifyText(register.alreadyExistWarning, registerData.alreadyExistWarning, "exact", "Verify existing email warning message is correct");
      });

    



       });

      

  }
}

const testSuite = new RegisterTests();
testSuite.runTests();

