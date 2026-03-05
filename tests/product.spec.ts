import { test } from "../utilities/fixtures";
import productData from "../testData/automationexercise/product.json";

class ProductTests {
  
  runTests() { 

    test.describe("Product Section Testing", () => {
      test.beforeEach(async ({ runner }) => {
        await runner.navigateTo(productData.siteUrl);
      });

      test("Verify Test Cases Page", async ({ runner, product }) => {

        
      });


       });

      

  }
}

const testSuite = new ProductTests();
testSuite.runTests();

