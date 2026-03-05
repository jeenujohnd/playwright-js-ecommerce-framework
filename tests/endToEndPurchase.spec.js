const {test,expect} = require('@playwright/test');
const {LoginPage} = require('../page-objects/LoginPage');
const {DashboardPage} = require('../page-objects/DashboardPage');
const {CartPage} =require('../page-objects/CartPage');
const {PlaceorderPage} =require('../page-objects/PlaceorderPage');
const {OrderconfirmationPage} = require('../page-objects/OrderconfirmationPage');
const {OrdersPage} =require('../page-objects/OrdersPage');
const testData = JSON.parse(JSON.stringify(require('../utils/ecommerceTestData.json')));
let loginPage;
let dashboardPage;
let cartPage;
let placeorderPage;
let orderconfirmationPage;
let ordersPage;
let orderID;

test('End-to-End Purchase Tests', async({page}) =>
{
    await test.step('Login to the application', async()=>
    {
        loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.validLogin(testData.username, testData.password);
        

    });

    await test.step('Add product to cart', async()=>
    {
        dashboardPage = new DashboardPage(page);
        await dashboardPage.searchAndaddProductToCart(testData.productName);
        await dashboardPage.navigateToCart();
    }); 

    await test.step('Verify product in cart and checkout', async()=>
    {
        cartPage = new CartPage(page, testData.productName);
        await expect(cartPage.verifyItemAddedToCart()).toBeTruthy();
        await cartPage.clickCheckoutButton();
    });

    await test.step('Place order and verify the confirmation order', async () =>
    {
        placeorderPage = new PlaceorderPage(page);
        await placeorderPage.selectCountryFromDropdown(testData.typeCountry, testData.country);
        await placeorderPage.clickPlaceOrderButton();
        orderconfirmationPage = new OrderconfirmationPage(page);
        const orderConfirmationMessage = await orderconfirmationPage.getOrderConfirmationMessage();
        await expect(orderConfirmationMessage).toBe(" Thankyou for the order. ");
        orderID = await orderconfirmationPage.getOrderID(); 
        await orderconfirmationPage.goToOrdersHistory();
    });

    await test.step('Verify order in order summary page', async ()=>
    {
        ordersPage = new OrdersPage(page);
        const orderIDInOrderSummary = await ordersPage.checkOrderInOrderList(orderID);
        await expect(orderIDInOrderSummary).toBe(orderID);
    });
    
});
