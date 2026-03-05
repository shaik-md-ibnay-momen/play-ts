import { test as base, Page } from "@playwright/test";
import { Utils } from "./utils";
import { AjaxForm } from "../pom/ajaxform";
import { CheckBox } from "../pom/checkbox";
import { RegisterUser, LoginUser } from "../pom/automationexercise/auth";
import { ContactUs } from "../pom/automationexercise/menu";
import { Product } from "../pom/automationexercise/product";
import { CartAndOrder } from "../pom/automationexercise/cart&order";
import { Order } from "../pom/automationexercise/order";

type TestFixtures = {
  runner: Utils;
  ajaxform: AjaxForm;
  checkbox: CheckBox;
  register: RegisterUser;
  login: LoginUser;
  contactus: ContactUs;
  product: Product;
  cartAndOrder: CartAndOrder;
  order: Order;
};

export const test = base.extend<TestFixtures>({
  runner: async ({ page }, use) => {
    await use(new Utils(page));
  },

  ajaxform: async ({ page }, use) => {
    await use(new AjaxForm(page));
  },

  checkbox: async ({ page }, use) => {
    await use(new CheckBox(page));
  },

  register: async ({ page }, use) => {
    await use(new RegisterUser(page));
  },
  
  login: async ({ page }, use) => {
    await use(new LoginUser(page));
  },
  
  contactus: async ({ page }, use) => {
    await use(new ContactUs(page));
  },
  product: async ({ page }, use) => {
    await use(new Product(page));
  },
  cartAndOrder: async ({ page }, use) => {
    await use(new CartAndOrder(page));
  },

  order: async ({ page }, use) => {
    await use(new Order(page));
  }

});