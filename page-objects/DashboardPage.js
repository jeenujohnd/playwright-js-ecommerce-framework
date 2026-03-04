import { expect } from "@playwright/test";

export class DashboardPage
{
    constructor(page)
    {
        this.page = page;
        this.productTitleOnDashboard = page.locator(".card-body b");
        this.addTocart = page.locator(".w-10");
        this.cartButton = page.locator("[routerlink='/dashboard/cart']");
        this.viewProduct = page.getByText("View");
        this.productTitleInView = page.locator("div h2");
        this.continueShoppingButton = page.getByText("Continue Shopping");
        this.filters = page.locator("#sidebar h4");
    }

    async viewProducts()
    {
        await this.productTitleOnDashboard.first().waitFor();
        const titleOnDashboard = await this.productTitleOnDashboard.first().textContent();
        await this.viewProduct.first().click();
        await this.productTitleInView.waitFor();
        const titleInView = await this.productTitleInView.textContent();
        return titleOnDashboard === titleInView;
    }

    async searchAndaddProductToCart(productName)
    {
        await this.productTitleOnDashboard.first().waitFor();
        const titles =await this.productTitleOnDashboard.allTextContents();
        console.log(titles);
        console.log(await this.productTitleOnDashboard.count());
        const count = await this.productTitleOnDashboard.count();
        for(let i=0; i<count; i++) 
        {
            if(await this.productTitleOnDashboard.nth(i).textContent() === productName)
            {
                    await this.addTocart.nth(i).click();
                    break;
            }
        }       
    }    

    async navigateToCart()
    {
        await this.cartButton.click();
    }

    async continueShopping()
    {
        await this.continueShoppingButton.click();
        await expect(this.filters).toBeVisible();
    }
}
