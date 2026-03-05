import { Page } from "playwright";

export class Product {
    
    readonly productLink: string;
    readonly productList: string;
    readonly firstProduct: string;

    readonly productDetailName: string;
    readonly productDetailPrice: string;
    readonly productDetailCategory: string;
    readonly productDetailAvailability: string;
    readonly productDetailCondition: string;
    readonly productDetailBrand: string;

    constructor(page: Page) {
        this.productLink = "a[href='/products']";
        this.productList = ".features_items";
        this.firstProduct = ".col-sm-4:nth-child(3) > div > div:last-child > ul > li > a";
        this.productDetailName = ".product-information > h2";
        this.productDetailPrice = ".product-information > span > span";
        this.productDetailCategory = ".product-information > p:nth-child(3)";
        this.productDetailAvailability = ".product-information > p:nth-child(6)";
        this.productDetailCondition = ".product-information > p:nth-child(7)";
        this.productDetailBrand = ".product-information > p:nth-child(8)";



         }
}