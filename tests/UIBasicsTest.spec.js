const {test,expect}=require('@playwright/test');


test('New Browser Instance Playwright Test', async ({browser})=>
{
    
    const browserContext = await browser.newContext();
    const newPage = await browserContext.newPage();
    const username = newPage.locator("#username");
    const password = newPage.locator("#password");
    const productTitles = newPage.locator(".card-body .card-title");
    const subRole = newPage.locator("[data-style='btn-info']");
    const User = newPage.locator(".radiotextsty");
    const confirm = newPage.locator("#okayBtn");
    const blinkLink = newPage.locator("[href='https://rahulshettyacademy.com/documents-request']");
    const docRequest = newPage.locator("[class*='red']");

    await newPage.goto("https://rahulshettyacademy.com/loginpagePractise/",
        {waitUntil: 'domcontentloaded', timeout: 30000});
    console.log( await newPage.title());    
    await expect(newPage).toHaveTitle("LoginPage Practise | Rahul Shetty Academy")
    await username.fill("rahulshettyacademy");
    await password.fill("Learning@830$3mK2");    
    await User.nth(1).check();
    await confirm.click();
    await expect(User.nth(1)).toBeChecked();    
    await subRole.selectOption("consult");
    await newPage.locator("#terms").check();
    await expect(newPage.locator("#terms")).toBeChecked();
    await newPage.locator("#terms").uncheck();
    await expect(newPage.locator("#terms")).not.toBeChecked();
    await expect(blinkLink).toHaveAttribute("class","blinkingText");
    await blinkLink.click();
    await newPage.waitForLoadState("domcontentloaded");
    

    await newPage.locator("#signInBtn").click();    
    // await expect(newPage.locator("[style*='block']")).toContainText("Empty");
    expect(await productTitles.first().textContent()).toContain("iphone X");
    expect(await productTitles.nth(1).textContent()).toContain("Samsung Note 8");
    const productCount = await productTitles.count();
    for(let i = 0;i<productCount; i++)
    {
        console.log(await productTitles.nth(i).textContent());
    }

});

test('No new instance Playwright Test', async ({page})=>
{
  const newPage = await page.goto("https://google.com/");
//   await page.title();
console.log(await page.title());
await expect(page).toHaveTitle("Google"); 
});

test('Child Window Handling test', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage()
    
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const blinkLink = page.locator("[href='https://rahulshettyacademy.com/documents-request']");
    const [newpage] = await Promise.all([
    context.waitForEvent('page'),
    blinkLink.click()]);
    const docRequest = await newpage.locator(".red").textContent();
    console.log(docRequest);
    const arraytext =docRequest.split("@");
    const rightText=arraytext[1].trim();
    const requiredtext =rightText.split(" ")[0];
    console.log(requiredtext);    
    
    const username = page.locator("#username");
    await username.fill(requiredtext);    
    console.log(await username.inputValue());

});