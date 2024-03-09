const { expect, test} = require('@playwright/test');

test("Verify All Books link is visible", async ( {page} ) => {
    await page.goto("http://localhost:3000");
    await page.waitForSelector("nav.navbar");
    const allBooksLink = await page.$('a[href="/catalog"]');
    const isLinkVisible = await allBooksLink.isVisible();
    expect(isLinkVisible).toBe(true); 
});

test("Verify Login buttnon is visible", async ( {page} ) => {
    await page.goto("http://localhost:3000");
    await page.waitForSelector("nav.navbar");
    const loginButton = await page.$('a[href="/login"]');
    const isLoginButtonVisisble = await loginButton.isVisible();
    expect(isLoginButtonVisisble).toBe(true); 
});

test("Verify Register buttnon is visible", async ( {page} ) => {
    await page.goto("http://localhost:3000");
    await page.waitForSelector("nav.navbar");
    const registerButton = await page.$('a[href="/register"]');
    const isRegisterButtonVisisble = await registerButton.isVisible();
    expect(isRegisterButtonVisisble).toBe(true); 
});