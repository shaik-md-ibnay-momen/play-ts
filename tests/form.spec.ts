import { test } from "../utilities/fixtures";
import ajaxData from "../testData/ajaxform.json";


class MenuValidationTests {
  
  runTests() {
    test.describe("Check Url", () => {
      test.beforeEach(async ({ runner }) => {
        await runner.navigateTo(ajaxData.ajaxUrl);
      });

      test("Validating Form Title", async ({ runner, ajaxform }) => {
        await runner.verifyText(ajaxform.formTitle, ajaxData.formTitle);
      });

      test("Submitting Form", async ({ runner, ajaxform }) => {
        await runner.typeText(ajaxform.name, ajaxData.nameValue);
        await runner.typeText(ajaxform.massage, ajaxData.massageValue);
        await runner.clickButton(ajaxform.submitButton, "Submit Btn");
    // Wait for the AJAX request to process
        await runner.waitFor(5000);
        const successText = await runner.extractText(ajaxform.sucess);
        console.log(`Extracted success message: "${successText}"`);
        //await runner.verifyText(ajaxform.sucess, ajaxData.successMessage, "contains", "Verify success message is correct");
        
      });

       });
  }
}

// Run the tests
const testSuite = new MenuValidationTests();
testSuite.runTests();

