export class CartPage
{
    constructor(page,productName)
    {
        this.page = page;
        this.itemAdded= page.locator(`h3:has-text("${productName}")`);
        this.cartItemsList = page.locator("div li");
        this.checkoutButton = page.locator(".subtotal .btn-primary");
        this.cartItems = page.locator(".cartWrap");
        this.removeProductButton = page.locator(".fa-trash-o");
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

    async removeProductFromCart()
    {
        await this.cartItems
                  .filter({has : this.itemAdded})
                  .locator(this.removeProductButton)
                  .click();
    }
}