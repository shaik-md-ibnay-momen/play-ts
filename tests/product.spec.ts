import { test } from "../utilities/fixtures";
import productData from "../testData/automationexercise/product.json";

class ProductTests {
  
  runTests() { 

    test.describe("Product Section Testing", () => {
      test.beforeEach(async ({ runner }) => {
        await runner.navigateTo(productData.siteUrl);
      });

      test("Verify All Products and product detail page", async ({ runner, product }) => {
        await runner.clickButton(product.productLink);
        await runner.verifyUrl("/products", "endsWith", 5000, "Verify URL after clicking Products link");
        await runner.isVisible(product.productList, true);
        await runner.clickButton(product.firstProduct);
        await runner.isVisible(product.productDetailName, true);
        await runner.verifyText(product.productDetailPrice, "Rs.", "startsWith");
        await runner.verifyText(product.productDetailCategory, "Category", "startsWith");
        await runner.verifyText(product.productDetailAvailability, "Availability", "startsWith");
        await runner.verifyText(product.productDetailCondition, "Condition", "startsWith");
        await runner.verifyText(product.productDetailBrand, "Brand", "startsWith");

      });


       });

      

  }
}

const testSuite = new ProductTests();
testSuite.runTests();

