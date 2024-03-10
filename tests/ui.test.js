const { expect, test} = require('@playwright/test');
const baseURL = "http://localhost:3000";
const loggedInURL = "http://localhost:3000/login"

test("Verify All Books link is visible", async ( {page} ) => {
    await page.goto(baseURL);
    await page.waitForSelector("nav.navbar");
    const allBooksLink = await page.$('a[href="/catalog"]');
    const isLinkVisible = await allBooksLink.isVisible();
    expect(isLinkVisible).toBe(true); 
});

test("Verify Login buttnon is visible", async ( {page} ) => {
    await page.goto(baseURL);
    await page.waitForSelector("nav.navbar");
    const loginButton = await page.$('a[href="/login"]');
    const isLoginButtonVisisble = await loginButton.isVisible();
    expect(isLoginButtonVisisble).toBe(true); 
});

test("Verify Register buttnon is visible", async ( {page} ) => {
    await page.goto(baseURL);
    await page.waitForSelector("nav.navbar");
    const registerButton = await page.$('a[href="/register"]');
    const isRegisterButtonVisisble = await registerButton.isVisible();
    expect(isRegisterButtonVisisble).toBe(true); 
});

test("Verify All Books link is visible after login", async ( {page} ) => {
    //await page.goto(baseURL);
    //await page.waitForSelector("nav.navbar");
    //await page.click('a[href="/login"]');
    
    await page.goto(loggedInURL);
    //await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('#email', "peter@abv.bg");
    await page.fill('#password', "123456");
    await page.click('#login-form > fieldset > input');    
    
    const logoutButton = await page.$('#logoutBtn');
    const isLogoutButtonVisible = await logoutButton.isVisible();
    expect(isLogoutButtonVisible).toBe(true); 

    //const allBooksLink = await page.$('a[href="/catalog"]');
    //const isLinkVisible = await allBooksLink.isVisible();
    //expect(isLinkVisible).toBe(true); 
});