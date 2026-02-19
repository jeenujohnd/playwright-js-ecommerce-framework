export class OrderconfirmationPage
{
    constructor(page)
    {
        this.page = page;
        this.orderConfirmationMessage = page.locator(".hero-primary");
        this.orderID = page.locator("label.ng-star-inserted");
    }

    async getOrderConfirmationMessage()
    {
        return await this.orderConfirmationMessage.textContent();
    }

    async getOrderID()
    {
        return (await this.orderID.textContent()).replace(/[|\s]/g, "");
    }
}