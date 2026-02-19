export class LoginPage
{
    constructor(page)
    {
        this.page = page;
        this.username = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
        this.loginButton = page.locator("#login");
    }

    async goto()
    {
        this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    }

    async login(username, password)
    {        
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
        await this.page.waitForLoadState('networkidle');
    }
}

