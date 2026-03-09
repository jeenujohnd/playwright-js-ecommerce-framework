const {test, expect}= require ('@playwright/test');
const console = require('node:console');
const {LoginPage} = require('../page-objects/LoginPage');
const { DashboardPage } = require('../page-objects/DashboardPage');
const {CartPage} = require('../page-objects/CartPage');
const {PlaceorderPage} = require('../page-objects/PlaceorderPage');
const {OrderconfirmationPage} = require('../page-objects/OrderconfirmationPage');
const {OrdersPage} = require('../page-objects/OrdersPage');
const { json } = require('node:stream/consumers');
const testData = JSON.parse(JSON.stringify(require('../utils/ecommerceTestData.json')));

test('Register User', async({page}) =>
{
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    //#region Locators
    const registerLink = page.locator("[class*='login-wrapper'] .login-wrapper-footer-text a");
    const firstName = page.locator("[type='firstName']");
    const lastName = page.locator("[type='lastName']");
    const email = page.locator("#userEmail");
    const mobile = page.locator("#userMobile");
    const password = page.locator("#userPassword");
    const confirmPassword = page.locator("#confirmPassword");
    const confirmAge = page.locator("[type='checkbox']");
    const registerButton = page.locator("#login");
    //#endregion

    //#region Actions
    await registerLink.click();
    await firstName.fill("Kitty");
    await lastName.fill("Cat");
    await email.fill("kitty@gmail.com");
    await mobile.fill("9876543210");
    await password.fill("Kitty@1234");
    await confirmPassword.fill("Kitty@1234");
    await confirmAge.check();
    await registerButton.click();
    //#endregion
});

test.only('Login User', async({page}) =>
{
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.validLogin(testData.username, testData.password);    
    
    const productName = testData.productName;   
    
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.searchAndaddProductToCart(testData.productName);
    await dashboardPage.navigateToCart();

    const cartPage = new CartPage(page, testData.productName);
    await expect(cartPage.verifyItemAddedToCart()).toBeTruthy();
    await cartPage.clickCheckoutButton();  
    
    const placeorderPage = new PlaceorderPage(page);
    const emailInShippingDetails = await placeorderPage.checkEmailInShippingDetails();
    expect(emailInShippingDetails).toBe(testData.username);
    await placeorderPage.selectCountryFromDropdown(testData.typeCountry, testData.country);
    await placeorderPage.clickPlaceOrderButton();

    const orderConfirmationPage = new OrderconfirmationPage(page);
    const orderConfirmationMessage = await orderConfirmationPage.getOrderConfirmationMessage();
    expect(orderConfirmationMessage).toBe(" Thankyou for the order. ");
    const orderID = await orderConfirmationPage.getOrderID();
    console.log(orderID);    
    
    const ordersPage = new OrdersPage(page);
    await ordersPage.navigateToOrdersPage();
    const orderIDInOrderSummary = await ordersPage.checkOrderInOrderList(orderID);
    expect(orderIDInOrderSummary).toBe(orderID);   
});

