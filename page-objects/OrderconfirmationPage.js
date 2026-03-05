export class OrderconfirmationPage
{
    constructor(page)
    {
        this.page = page;
        this.orderConfirmationMessage = page.locator(".hero-primary");
        this.orderID = page.locator("label.ng-star-inserted");
        this.orderHistoryButton = page.getByText("Orders History Page")
    }

    async getOrderConfirmationMessage()
    {
        return await this.orderConfirmationMessage.textContent();
    }

    async getOrderID()
    {
        await this.orderID.waitFor();
        return (await this.orderID.textContent()).replace(/[|\s]/g, "");
    }

    async goToOrdersHistory()
    {
        await this.orderHistoryButton.click();
    }
}