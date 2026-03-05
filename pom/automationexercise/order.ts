import { Page } from "playwright";

export class Order {
    readonly checkoutButton: string;
    readonly modalRegisterButton: string;
    readonly deliveryAddressCard: string;
    readonly billingAddressCard: string;
    readonly orderCommentTextArea: string;
    readonly placeOrderButton: string;
    readonly nameOnCardInput: string;
    readonly cardNumberInput: string
    readonly cvcInput: string;
    readonly expiryMonthInput: string
    readonly expiryYearInput: string;
    readonly paymentConfirmButton: string;
    readonly successMessage: string;


    constructor(page: Page) {

        this.checkoutButton = ".check_out";
        this.modalRegisterButton = ".modal-body > p:last-child >a";
        this.deliveryAddressCard = "#address_delivery";
        this.billingAddressCard = "#address_invoice";
        this.orderCommentTextArea = "textarea[name='message']";
        this.placeOrderButton = ".check_out";
        this.nameOnCardInput = "input[name='name_on_card']";
        this.cardNumberInput = "input[name='card_number']";
        this.cvcInput = "input[name='cvc']";
        this.expiryMonthInput = "input[name='expiry_month']";
        this.expiryYearInput = "input[name='expiry_year']";
        this.paymentConfirmButton = "#submit";
        this.successMessage = "#success_message > .alert-success.alert ";


         }
}