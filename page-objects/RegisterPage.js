const {expect} = require('@playwright/test');   
export class RegisterPage
{
    constructor(page)
    {
        this.page = page;
        this.registerLink = page.locator("[class*='login-wrapper'] .login-wrapper-footer-text a");
        this.firstName = page.locator("[type='firstName']");
        this.lastName = page.locator("[type='lastName']");
        this.email = page.locator("#userEmail");
        this.mobile = page.locator("#userMobile");
        this.password = page.locator("#userPassword");
        this.confirmPassword = page.locator("#confirmPassword");
        this.confirmAge = page.locator("[type='checkbox']");
        this.registerButton = page.locator("#login");
        this.loginLink = page.locator(".btn-primary");
        this.loginTitle = page.locator(".login-wrapper .login-title");
    }

    async registerNewUser(firstName, lastName, email, mobile, password)
    {
        await this.registerLink.click();
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.email.fill(email);
        await this.mobile.fill(mobile);
        await this.password.fill(password);
        await this.confirmPassword.fill(password);
        await this.confirmAge.check();
        await this.registerButton.click();
    }

    getSuccessMessage()
    {   
        return this.page.getByText("Account Created Successfully");
    }

    async clickLoginLink()
    {
        await this.loginLink.click();
        await expect(this.loginTitle).toBeVisible();
    }


}