import { test } from "../utilities/fixtures";
import cartAndOrderData from "../testData/automationexercise/cart&order.json";
import orderData from "../testData/automationexercise/order.json";
import registerData from "../testData/automationexercise/register.json";
import loginData from "../testData/automationexercise/login.json";
import { expect } from "@playwright/test";

class OrderAndAuthTests {
  
  runTests() { 

    test.describe("Order and Authentication Section Testing", () => {
        let productName: string;
      test.beforeEach(async ({ runner}) => {
        await runner.navigateTo(cartAndOrderData.siteUrl);
      });

      test("Place Order: Register while Checkout", async ({ runner, register, order, product, cartAndOrder}) => {
        await runner.clickButton(cartAndOrder.productLink);
        await runner.verifyUrl("/products", "endsWith", 5000, "Verify URL after clicking Products link");
        await runner.mouseHover(cartAndOrder.firstProduct);
        productName = await runner.extractText(cartAndOrder.firstProductName);
        await runner.clickButton(cartAndOrder.firstProductcartButton);
        await runner.clickButton(cartAndOrder.modalContuinueButton);
        await runner.clickButton(product.cartButton);
        await runner.verifyUrl("/view_cart", "endsWith", 5000, "Verify URL after clicking Cart button");
        await runner.clickButton(order.checkoutButton);
        await runner.clickButton(order.modalRegisterButton);

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
        
        await runner.clickButton(product.cartButton);
        await runner.verifyUrl("/view_cart", "endsWith", 5000, "Verify URL after clicking Cart button");
        await runner.clickButton(order.checkoutButton);
        
        const deliveryAddress = await runner.getList(order.deliveryAddressCard, 'li');
        const billingAddress = await runner.getList(order.billingAddressCard, 'li');
        console.log(deliveryAddress);
        console.log(billingAddress);
        const name = `${registerData.nameTitle}. ${registerData.firstnameBox} ${registerData.lastnameBox}`;
        const address = `${registerData.cityBox} ${registerData.stateBox} ${registerData.zipcodeBox}`;

        expect(deliveryAddress).toContain(name);
        expect(deliveryAddress).toContain(registerData.address1Box);
        expect(deliveryAddress).toContain(registerData.address2Box);
        expect(deliveryAddress).toContain(address);
        expect(deliveryAddress).toContain(registerData.country);
        expect(deliveryAddress).toContain(registerData.mobileBox);

        expect(billingAddress).toContain(name);
        expect(billingAddress).toContain(registerData.address1Box);
        expect(billingAddress).toContain(registerData.address2Box);
        expect(billingAddress).toContain(address);
        expect(billingAddress).toContain(registerData.country);
        expect(billingAddress).toContain(registerData.mobileBox);

        const cartProductList = await runner.getList(cartAndOrder.cartTableRow, cartAndOrder.cartTableProductName);
        console.log(productName);
        expect(cartProductList).toContain(productName);
        const quantity = await runner.extractText(cartAndOrder.cartQuantity);
        expect(quantity).toBe("1");

        await runner.typeText(order.orderCommentTextArea, orderData.orderComment);
        await runner.clickButton(order.placeOrderButton);
        await runner.typeText(order.nameOnCardInput, orderData.nameOnCard);
        await runner.typeText(order.cardNumberInput, orderData.cardNumber);
        await runner.typeText(order.cvcInput, orderData.cvc); 
        await runner.typeText(order.expiryMonthInput, orderData.expiryMonth); 
        await runner.typeText(order.expiryYearInput, orderData.expiryYear); 

        await Promise.all([
          await runner.verifyText(order.successMessage, orderData.successMessage, "contains", "Verify order success message is displayed"),
          await runner.clickButton(order.paymentConfirmButton)
        ]);
        
        await runner.clickButton(register.deleteaccountButton, "Delete Account Btn");
        await runner.verifyText(register.deleteconfirmationTitle, registerData.deleteconfirmationTitle, "exact", "Verify account deleted title is correct");
        

      });


      test("Place Order: Register before Checkout", async ({ runner, register, order, product, cartAndOrder}) => {

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

        await runner.clickButton(cartAndOrder.productLink);
        await runner.verifyUrl("/products", "endsWith", 5000, "Verify URL after clicking Products link");
        await runner.mouseHover(cartAndOrder.firstProduct);
        productName = await runner.extractText(cartAndOrder.firstProductName);
        await runner.clickButton(cartAndOrder.firstProductcartButton);
        await runner.clickButton(cartAndOrder.modalContuinueButton);
        await runner.clickButton(product.cartButton);
        await runner.verifyUrl("/view_cart", "endsWith", 5000, "Verify URL after clicking Cart button");
        await runner.clickButton(order.checkoutButton);
        
        const deliveryAddress = await runner.getList(order.deliveryAddressCard, 'li');
        const billingAddress = await runner.getList(order.billingAddressCard, 'li');
        console.log(deliveryAddress);
        console.log(billingAddress);
        const name = `${registerData.nameTitle}. ${registerData.firstnameBox} ${registerData.lastnameBox}`;
        const address = `${registerData.cityBox} ${registerData.stateBox} ${registerData.zipcodeBox}`;

        expect(deliveryAddress).toContain(name);
        expect(deliveryAddress).toContain(registerData.address1Box);
        expect(deliveryAddress).toContain(registerData.address2Box);
        expect(deliveryAddress).toContain(address);
        expect(deliveryAddress).toContain(registerData.country);
        expect(deliveryAddress).toContain(registerData.mobileBox);

        expect(billingAddress).toContain(name);
        expect(billingAddress).toContain(registerData.address1Box);
        expect(billingAddress).toContain(registerData.address2Box);
        expect(billingAddress).toContain(address);
        expect(billingAddress).toContain(registerData.country);
        expect(billingAddress).toContain(registerData.mobileBox);

        const cartProductList = await runner.getList(cartAndOrder.cartTableRow, cartAndOrder.cartTableProductName);
        console.log(productName);
        expect(cartProductList).toContain(productName);
        const quantity = await runner.extractText(cartAndOrder.cartQuantity);
        expect(quantity).toBe("1");

        await runner.typeText(order.orderCommentTextArea, orderData.orderComment);
        await runner.clickButton(order.placeOrderButton);
        await runner.typeText(order.nameOnCardInput, orderData.nameOnCard);
        await runner.typeText(order.cardNumberInput, orderData.cardNumber);
        await runner.typeText(order.cvcInput, orderData.cvc); 
        await runner.typeText(order.expiryMonthInput, orderData.expiryMonth); 
        await runner.typeText(order.expiryYearInput, orderData.expiryYear); 

        await Promise.all([
          await runner.verifyText(order.successMessage, orderData.successMessage, "contains", "Verify order success message is displayed"),
          await runner.clickButton(order.paymentConfirmButton)
        ]);
        
        await runner.clickButton(register.deleteaccountButton, "Delete Account Btn");
        await runner.verifyText(register.deleteconfirmationTitle, registerData.deleteconfirmationTitle, "exact", "Verify account deleted title is correct");

      });



      test("Place Order: Login before Checkout", async ({ runner, login,register, order, product, cartAndOrder}) => {

        await runner.clickButton(register.signupButton, " Signup / Login");
        await runner.verifyText(login.formTitle, loginData.formTitle, "exact");
        await runner.typeText(login.email, loginData.email);
        await runner.typeText(login.password, loginData.password);
        await runner.clickButton(login.loginButton, "Login Btn");
        await runner.verifyText(register.loggedInAs, `Logged in as `, "contains", "Verify logged in username is correct");

        await runner.clickButton(cartAndOrder.productLink);
        await runner.verifyUrl("/products", "endsWith", 5000, "Verify URL after clicking Products link");
        await runner.mouseHover(cartAndOrder.firstProduct);
        productName = await runner.extractText(cartAndOrder.firstProductName);
        await runner.clickButton(cartAndOrder.firstProductcartButton);
        await runner.clickButton(cartAndOrder.modalContuinueButton);
        await runner.clickButton(product.cartButton);
        await runner.verifyUrl("/view_cart", "endsWith", 5000, "Verify URL after clicking Cart button");
        await runner.clickButton(order.checkoutButton);
        
        const deliveryAddress = await runner.getList(order.deliveryAddressCard, 'li');
        const billingAddress = await runner.getList(order.billingAddressCard, 'li');
        console.log(deliveryAddress);
        console.log(billingAddress);
        const name = `${registerData.nameTitle}. ${registerData.firstnameBox} ${registerData.lastnameBox}`;
        const address = `${registerData.cityBox} ${registerData.stateBox} ${registerData.zipcodeBox}`;

        expect(deliveryAddress).toContain(name);
        expect(deliveryAddress).toContain(registerData.address1Box);
        expect(deliveryAddress).toContain(registerData.address2Box);
        expect(deliveryAddress).toContain(address);
        expect(deliveryAddress).toContain(registerData.country);
        expect(deliveryAddress).toContain(registerData.mobileBox);

        expect(billingAddress).toContain(name);
        expect(billingAddress).toContain(registerData.address1Box);
        expect(billingAddress).toContain(registerData.address2Box);
        expect(billingAddress).toContain(address);
        expect(billingAddress).toContain(registerData.country);
        expect(billingAddress).toContain(registerData.mobileBox);

        const cartProductList = await runner.getList(cartAndOrder.cartTableRow, cartAndOrder.cartTableProductName);
        console.log(productName);
        expect(cartProductList).toContain(productName);
        const quantity = await runner.extractText(cartAndOrder.cartQuantity);
        expect(quantity).toBe("1");

        await runner.typeText(order.orderCommentTextArea, orderData.orderComment);
        await runner.clickButton(order.placeOrderButton);
        await runner.typeText(order.nameOnCardInput, orderData.nameOnCard);
        await runner.typeText(order.cardNumberInput, orderData.cardNumber);
        await runner.typeText(order.cvcInput, orderData.cvc); 
        await runner.typeText(order.expiryMonthInput, orderData.expiryMonth); 
        await runner.typeText(order.expiryYearInput, orderData.expiryYear); 

        await Promise.all([
          await runner.verifyText(order.successMessage, orderData.successMessage, "contains", "Verify order success message is displayed"),
          await runner.clickButton(order.paymentConfirmButton)
        ]);
        
        //await runner.clickButton(register.deleteaccountButton, "Delete Account Btn");
        //await runner.verifyText(register.deleteconfirmationTitle, registerData.deleteconfirmationTitle, "exact", "Verify account deleted title is correct");

      });


       });

      

  }
}

const testSuite = new OrderAndAuthTests();
testSuite.runTests();

