import { Page } from "playwright";

export class CartAndOrder {
    readonly productLink: string;
    readonly firstProduct: string;
    readonly firstProductcartButton: string;
    readonly firstProductName: string;
    readonly modalContuinueButton: string;
    
    readonly secondProduct: string;
    readonly secondProductcartButton: string;
    readonly secondProductName: string;

    readonly modalViewCartButton: string;

    readonly cartTableProductName: string;
    readonly cartTableRow: string;

    readonly anyProduct: string;
    readonly quantityInput: string;
    readonly detailPageAddToCartButton: string;

    readonly cartQuantity: string;

    readonly removeProductButton: string;
    readonly emptyCartMessage: string;


    constructor(page: Page) {

        this.productLink = "a[href='/products']";
        this.firstProduct = ".col-sm-4:nth-child(3) > div";
        this.firstProductcartButton = ".col-sm-4:nth-child(3) > div > .single-products > .product-overlay > .overlay-content > a > i";
        this.firstProductName = ".col-sm-4:nth-child(3) > div > .single-products >.productinfo.text-center > p";
        this.modalContuinueButton = ".modal-footer > button:has-text('Continue Shopping')";
        this.secondProduct = ".col-sm-4:nth-child(4) > div";
        this.secondProductcartButton = ".col-sm-4:nth-child(4) > div > .single-products > .product-overlay > .overlay-content > a > i";
        this.secondProductName = ".col-sm-4:nth-child(4) > div > .single-products >.productinfo.text-center > p";
        this.modalViewCartButton = ".modal-body > p:last-child > a[href='/view_cart']";
        this.cartTableProductName = ".cart_description>h4>a";
        this.cartTableRow = ".table > tbody > tr";

        this.anyProduct = ".col-sm-4:nth-child(6) > div > div:last-child > ul > li > a";
        this.quantityInput = "#quantity";
        this.detailPageAddToCartButton = ".btn.btn-default.cart";
        this.cartQuantity = "tbody > tr > .cart_quantity > button";
        this.removeProductButton = ".cart_quantity_delete";
        this.emptyCartMessage = "#empty_cart";

         }
}