export class PlaceorderPage
{
    constructor(page)
    {
        this.page = page;
        this.emailInShippingDetails = page.locator("[style*='lightgray']");    
        this.selectCountry = page.locator("[placeholder='Select Country']");
        this.countryDropdown = page.locator("section .ta-results");        
        this.countryOptions = page.locator("section .ta-results button");
        this.placeOrderButton = page.locator(".action__submit");
    }

    async checkEmailInShippingDetails()
    {
        return await this.emailInShippingDetails.textContent();
    }

    async selectCountryFromDropdown(typeCountry,country)
    {
        await this.selectCountry.pressSequentially(typeCountry,{delay: 100});
        await this.countryDropdown.waitFor();
        const countryOptionsCount = await this.countryOptions.count();
        for(let i=0; i<countryOptionsCount; i++)
        {
           if((await this.countryOptions.nth(i).textContent()).trim() === country)
           {
            await this.countryOptions.nth(i).click();
            break;
           }
      }
    }

    async clickPlaceOrderButton()
    {
        await this.placeOrderButton.click();
    }
}