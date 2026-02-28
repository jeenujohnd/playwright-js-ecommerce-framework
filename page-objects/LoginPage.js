export class LoginPage
{
    constructor(page)
    {
        this.page = page;
        this.username = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
        this.loginButton = page.locator("#login");
        this.loginSuccessText = page.getByText("Login Successfully");
    }

    async goto()
    {
        await this.page.goto("/client");
    }

    async login(username, password)
    {        
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
        return this.loginSuccessText;
    }

}
