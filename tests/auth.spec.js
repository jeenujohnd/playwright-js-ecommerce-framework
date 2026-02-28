const {test,expect} = require ('@playwright/test');
const {LoginPage} = require('../page-objects/LoginPage');
const {RegisterPage} = require('../page-objects/RegisterPage');
const testData = require('../utils/ecommerceTestData.json');
let loginPage;

test.describe('Authentications Tests', () =>
    {
    test.beforeEach(async ({page})=>
        {
            loginPage = new LoginPage(page);
            await loginPage.goto();
        });

    test('Successful User Registerion with Valid Data', async({page}) =>
        {            
            const registerPage = new RegisterPage(page);
            const uniqueEmail = `${Date.now()}@gmail.com`; //To ensure unique email for each test runß
            await registerPage.registerNewUser(testData.firstName, testData.lastName, 
            uniqueEmail, testData.mobile, testData.password);
            await expect(registerPage.getSuccessMessage()).toBeVisible();
            await registerPage.clickLoginLink();
        });

    test('Login User', async({page}) =>
        {         
            const loginSuccessMessage = await loginPage.login(testData.username, testData.password);
            await expect(loginSuccessMessage).toBeVisible();
        });
    
    });


