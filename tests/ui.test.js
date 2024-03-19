const { expect, test} = require('@playwright/test');
const baseURL = "http://localhost:3000";
const loginURL = "http://localhost:3000/login";
const allBooksURL = "http://localhost:3000/catalog";

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
    
    await page.goto(loginURL);
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

test("Verify My Books link is visible after login", async ( {page} ) => {
    await page.goto(loginURL);    
    await page.fill('#email', "peter@abv.bg");
    await page.fill('#password', "123456");
    await page.click('#login-form > fieldset > input');    
    
    const myBooksButton = await page.$('a[href="/profile"]');
    const isMyBooksButtonVisible = await myBooksButton.isVisible();
    expect(isMyBooksButtonVisible).toBe(true);     
});

test("Verify Add Book link is visible after login", async ( {page} ) => {
    await page.goto(loginURL);    
    await page.fill('#email', "peter@abv.bg");
    await page.fill('#password', "123456");
    await page.click('#login-form > fieldset > input');    
    
    const addBookButton = await page.$('a[href="/create"]');
    const isAddBookButtonVisible = await addBookButton.isVisible();
    expect(isAddBookButtonVisible).toBe(true);     
});

test("Verify User's email address is visible after login", async ( {page} ) => {
    await page.goto(loginURL);    
    await page.fill('#email', "peter@abv.bg");
    await page.fill('#password', "123456");
    await page.click('#login-form > fieldset > input');    
    
    const emailInfo = await page.$('#user > span');
    const isEmailInfoVisible = await emailInfo.isVisible();
    expect(isEmailInfoVisible).toBe(true);     
});

test("Login with valid credentials", async ( {page} ) => {
    await page.goto(loginURL);    
    await page.fill('#email', "peter@abv.bg");
    await page.fill('#password', "123456");
    await page.click('#login-form > fieldset > input');    
    
    await page.$('a[href="/catalog"]');
    expect(page.url()).toBe(allBooksURL); 
});

test("Submit Login form with empty fields", async ( {page} ) => {
    await page.goto(loginURL);        
    await page.click('#login-form > fieldset > input');    
    
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.$('a[href="/login"]');
    expect(page.url()).toBe(loginURL);
});