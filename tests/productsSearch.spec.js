const {test,expect} = require ('@playwright/test');
const {LoginPage} = require('../page-objects/LoginPage');
const {DashboardPage} = require('../page-objects/DashboardPage');
const testData = require('../utils/ecommerceTestData.json');
const productName = testData.productName;
let dashboardPage;

test.describe('Products view  and add to cart tests', () =>
{
    test.beforeEach(async ({page})=>
    {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.validLogin(testData.username, testData.password);
        dashboardPage = new DashboardPage(page);        
    });
    
    test('View products and continue shopping', async({page})=>
    {
        expect(await dashboardPage.viewProducts()).toBe(true);
        await dashboardPage.continueShopping();
    });

    test('Search and add product to cart', async({page})=>
    {
        await dashboardPage.searchAndaddProductToCart(testData.productName);
        await dashboardPage.navigateToCart();
    });
});