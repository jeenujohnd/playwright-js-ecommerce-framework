export class DashboardPage
{
    constructor(page)
    {
        this.page = page;
        this.productTitle = page.locator(".card-body b");
        this.addTocart = page.locator(".w-10");
        this.cartButton = page.locator("[routerlink='/dashboard/cart']");        
    }

    async searchAndaddProductToCart(productName)
    {
        await this.productTitle.first().waitFor();
        const titles =await this.productTitle.allTextContents();
        console.log(titles);
        console.log(await this.productTitle.count());
        const count = await this.productTitle.count();
        for(let i=0; i<count; i++) 
        {
            if(await this.productTitle.nth(i).textContent() === productName)
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

}