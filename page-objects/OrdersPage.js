export class OrdersPage
{
    constructor(page)
    {
        this.page = page;
        this.orders = page.locator("[routerlink='/dashboard/myorders']");
        this.orderIDList = page.locator("tbody th");
        this.orderIDInOrderSummary = page.locator("div.-main");
        this.viewButton = page.locator(".btn-primary");
    }

    async navigateToOrdersPage()
    {
        await this.orders.first().click();
    }

    async checkOrderInOrderList(orderID)
    {
        await this.orderIDList.first().waitFor();
        const orderIDCount = await this.orderIDList.count();        
        for(let i=0;i< orderIDCount; i++)
        {
            if((await this.orderIDList.nth(i).textContent()).replace(/[|\s]/g, "") === orderID)
            {               
                await this.viewButton.nth(i).click();                
                await this.orderIDInOrderSummary.waitFor();
                console.log("order ID on order summary pae:" +await this.orderIDInOrderSummary.textContent());           
                return (await this.orderIDInOrderSummary.textContent()).replace(/[|\s]/g, "");            
            }
        }        
    }
}