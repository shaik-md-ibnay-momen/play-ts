import { test } from "../utilities/fixtures";
import productData from "../testData/automationexercise/product.json";
import { expect } from "@playwright/test";

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


      test("Search Product", async ({ runner, product }) => {

        await runner.clickButton(product.productLink);
        await runner.verifyUrl("/products", "endsWith", 5000, "Verify URL after clicking Products link");
        await runner.isVisible(product.productList, true);
        await runner.typeText(product.searchInput, productData.searchKeyword);
        await runner.clickButton(product.searchButton);
        await runner.verifyText(product.searchResultTitle, productData.searchResultTitle, "exact");
        const titles = await runner.getList(
                product.searchResultList, 
                product.searchResultItemName                 
        );
        console.log("Search Result Titles:", titles);
        expect(titles).toContain(productData.searchKeyword);
        

      });


      test("Verify Subscription in home page", async ({ runner, product }) => {

        await runner.scroll("down", product.footer);
        await runner.verifyText(product.subscriptionTitle, "SUBSCRIPTION", "exact");
        await runner.typeText(product.subcriptionEmailInput, productData.subscribeEmail);
        await runner.clickButton(product.subscriptionButton);
        await runner.isVisible(product.subscriptionSuccessMessage, true);
        await runner.verifyText(product.subscriptionSuccessMessage, productData.subscribeSuccessMessage, "exact");

      });


      test("Verify Subscription in Cart page", async ({ runner, product }) => {
        await runner.clickButton(product.cartButton);
        await runner.verifyUrl("/view_cart", "endsWith", 5000, "Verify URL after clicking Cart button");
        await runner.scroll("down", product.footer);
        await runner.verifyText(product.subscriptionTitle, "SUBSCRIPTION", "exact");
        await runner.typeText(product.subcriptionEmailInput, productData.subscribeEmail);
        await runner.clickButton(product.subscriptionButton);
        await runner.isVisible(product.subscriptionSuccessMessage, true);
        await runner.verifyText(product.subscriptionSuccessMessage, productData.subscribeSuccessMessage, "exact");

      });




       });

      

  }
}

const testSuite = new ProductTests();
testSuite.runTests();

