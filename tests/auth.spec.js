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

    test('Valid Login User and logout', async() =>
        {         
            const loginSuccessMessage = await loginPage.validLogin(testData.username, testData.password);
            await expect(loginSuccessMessage).toBeVisible();
            const logoutSuccessMessage = await loginPage.logout();
            await expect(logoutSuccessMessage).toBeVisible();        
        });
    
    test('Invalid Login User',async()=>
        {
            const loginErrorMessage = await loginPage.invalidLogin(testData.invalidUsername, testData.invalidPassword);
            await expect(loginErrorMessage).toBeVisible();
        });
    
    });


