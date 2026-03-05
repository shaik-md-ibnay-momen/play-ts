import { test } from "../utilities/fixtures";
import contactUSdata from "../testData/automationexercise/contactUS.json";

class MenuTests {
  
  runTests() { 

    test.describe("Menu Testing", () => {
      test.beforeEach(async ({ runner }) => {
        await runner.navigateTo(contactUSdata.siteUrl);
      });

      test("Contact Us Form", async ({ runner, contactus }) => {

        await runner.clickButton(contactus.contactUsButton, "Contact Us Btn");
        await runner.verifyText(contactus.formTitle, contactUSdata.formTitle, "exact", "Verify form title is correct");
        await runner.typeText(contactus.nameInput, contactUSdata.nameBox);
        await runner.typeText(contactus.emailInput, contactUSdata.emailBox);
        await runner.typeText(contactus.subjectInput, contactUSdata.subjectBox);
        await runner.typeText(contactus.messageInput, contactUSdata.messageBox);
        await runner.uploadFile(contactus.fileUploadInput, contactUSdata.filePath);
        //await runner.handleAlert("accept");
        const alertHandler = runner.handleAlert('accept');
        await runner.clickButton(contactus.submitButton, "Submit Btn");
        await runner.waitFor(2000, "Waiting for alert to be handled...");
        //await alertHandler;
        await runner.verifyText(contactus.successMessage, contactUSdata.successMessage, "exact", "Verify success message is displayed");
      });


      test("Verify Test Cases Page", async ({ runner, contactus }) => {
        await runner.clickButton(contactus.testcasesButton);
        await runner.verifyUrl(contactUSdata.testCasesUrl);
        await runner.verifyText(contactus.testCasesPageTitle, contactUSdata.testCasesPageTitle, "exact", "Verify Test Cases page title is correct");
      });


       });

      

  }
}

const testSuite = new MenuTests();
testSuite.runTests();

