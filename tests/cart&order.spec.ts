import { test } from "../utilities/fixtures";
import cartAndOrderData from "../testData/automationexercise/cart&order.json";
import { expect } from "@playwright/test";

class CartAndOrderTests {
  
  runTests() { 

    test.describe("Cart and Order Section Testing", () => {
      test.beforeEach(async ({ runner }) => {
        await runner.navigateTo(cartAndOrderData.siteUrl);
      });

      test("Add Products in Cart", async ({ runner, cartAndOrder }) => {
        const productList = []
        await runner.clickButton(cartAndOrder.productLink);
        await runner.verifyUrl("/products", "endsWith", 5000, "Verify URL after clicking Products link");
        await runner.mouseHover(cartAndOrder.firstProduct);
        await runner.clickButton(cartAndOrder.firstProductcartButton);
        await runner.clickButton(cartAndOrder.modalContuinueButton);
        productList.push(await runner.extractText(cartAndOrder.firstProductName));
        productList.push(await runner.extractText(cartAndOrder.secondProductName));
        await runner.mouseHover(cartAndOrder.secondProduct);
        await runner.clickButton(cartAndOrder.secondProductcartButton);
        await runner.clickButton(cartAndOrder.modalViewCartButton);
        await runner.verifyUrl("/view_cart", "endsWith", 5000, "Verify URL after clicking View Cart button");
        const cartProductList = await runner.getList(cartAndOrder.cartTableRow, cartAndOrder.cartTableProductName);
        console.log(productList);
        console.log(cartProductList);
        expect(cartProductList).toEqual(productList)
      });


      test("Verify Product quantity in Cart", async ({ runner, cartAndOrder, product }) => {
        
        await runner.clickButton(cartAndOrder.productLink);
        await runner.verifyUrl("/products", "endsWith", 5000, "Verify URL after clicking Products link");
        await runner.isVisible(product.productList, true);
        await runner.clickButton(cartAndOrder.anyProduct);
        const productname = await runner.extractText(product.productDetailName);
        await runner.typeText(cartAndOrder.quantityInput, "4");
        await runner.clickButton(cartAndOrder.detailPageAddToCartButton);
        await runner.clickButton(cartAndOrder.modalViewCartButton);
        await runner.verifyUrl("/view_cart", "endsWith", 5000, "Verify URL after clicking View Cart button");
        const cartProductList = await runner.getList(cartAndOrder.cartTableRow, cartAndOrder.cartTableProductName);
        console.log(productname);
        console.log(cartProductList);
        expect(cartProductList).toContain(productname);
        const quantity = await runner.extractText(cartAndOrder.cartQuantity);
        console.log(quantity);
        expect(quantity).toBe("4");

      });




       });

      

  }
}

const testSuite = new CartAndOrderTests();
testSuite.runTests();

