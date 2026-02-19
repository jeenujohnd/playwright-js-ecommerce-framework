export class CartPage
{
    constructor(page,productName)
    {
        this.page = page;
        this.itemAdded= page.locator(`h3:has-text("${productName}")`);
        this.cartItemsList = page.locator("div li");
        this.checkoutButton = page.locator(".subtotal .btn-primary");
    }

    async verifyItemAddedToCart()
    {
        await this.cartItemsList.first().waitFor();
        const isItemAddedVisible = await this.itemAdded.isVisible();        
        return isItemAddedVisible;
    }

    async clickCheckoutButton()
    {
        await this.checkoutButton.click();
    }
}