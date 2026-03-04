export class LoginPage
{
    constructor(page)
    {
        this.page = page;
        this.username = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
        this.loginButton = page.locator("#login");
        this.loginSuccessText = page.getByText("Login Successfully");
        this.loginErrorText = page.getByText("Incorrect email or password.");
        this.logoutButton = page.locator(".fa-sign-out");
        this.logoutSuccessText = page.getByText("Logout Successfully");
    }

    async goto()
    {
        await this.page.goto("/client");
    }

    async validLogin(username, password)
    {        
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
        return await this.loginSuccessText;
    }

    async invalidLogin(username, password)
    {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
        return await this.loginErrorText;
    }

    async logout()
    {
        await this.logoutButton.click();
        return this.logoutSuccessText;
    }
}