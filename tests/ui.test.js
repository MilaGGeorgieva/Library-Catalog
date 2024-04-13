const { expect, test} = require('@playwright/test');
const baseURL = "http://localhost:3000";
const loginURL = "http://localhost:3000/login";
const registerURL = "http://localhost:3000/register"
const allBooksURL = "http://localhost:3000/catalog";
const uniqueEmail = () => `anyuser${Math.floor(Math.random() * 100000)}@example.com`;

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
    //await page.click('input[type="submit"]');    
    
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

test("Submit login form with empty email field and valid password", async ( {page} ) => {
    await page.goto(loginURL);
    await page.fill('#password', "123456");
    await page.click('#login-form > fieldset > input');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

     await page.$('a[href="/login"]');
     expect(page.url()).toBe(loginURL);
});

test("Submit login form with valid email and empty password field", async ( {page} ) => {
    await page.goto(loginURL);
    await page.fill('#email', "peter@abv.bg");
    await page.click('#login-form > fieldset > input');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

     await page.$('a[href="/login"]');
     expect(page.url()).toBe(loginURL);
});

test("Register with valid values", async ( {page} ) => {
    await page.goto(registerURL);    
    await page.fill('#email', uniqueEmail());
    await page.fill('#password', "1234567");
    await page.fill('#repeat-pass', "1234567")
    await page.click('#register-form > fieldset > input');    
    
    await page.$('a[href="/catalog"]');
    expect(page.url()).toBe(allBooksURL); 
});

test("Submit Register form with empty fields", async ( {page} ) => {
    await page.goto(registerURL);        
    await page.click('#register-form > fieldset > input');    
    
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.$('a[href="/register"]');
    expect(page.url()).toBe(registerURL);
});

test("Submit Register form with empty email field and valid password fields", async ( {page} ) => {
    await page.goto(registerURL);
    await page.fill('#password', "1234567");
    await page.fill('#repeat-pass', "1234567")
    await page.click('#register-form > fieldset > input');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

     await page.$('a[href="/register"]');
     expect(page.url()).toBe(registerURL);
});

test("Submit Register form with valid email and empty password field", async ( {page} ) => {
    await page.goto(registerURL);
    await page.fill('#email', uniqueEmail());    
    await page.fill('#repeat-pass', "1234567")
    await page.click('#register-form > fieldset > input');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

     await page.$('a[href="/register"]');
     expect(page.url()).toBe(registerURL);
});

test("Submit Register form with valid email and empty confirm password field", async ( {page} ) => {
    await page.goto(registerURL);
    await page.fill('#email', uniqueEmail());
    await page.fill('#password', "1234567");    
    await page.click('#register-form > fieldset > input');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

     await page.$('a[href="/register"]');
     expect(page.url()).toBe(registerURL);
});

test("Submit Register form with valid email and different passwords", async ( {page} ) => {
    await page.goto(registerURL);
    await page.fill('#email', uniqueEmail());
    await page.fill('#password', "1234567");
    await page.fill('#repeat-pass', "12345678")   
    await page.click('#register-form > fieldset > input');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain("Passwords don't match!");
        await dialog.accept();
    });

     await page.$('a[href="/register"]');
     expect(page.url()).toBe(registerURL);
});

test("Add book with correct data", async ( {page} ) => {
    await page.goto(loginURL);    
    await page.fill('#email', "peter@abv.bg");
    await page.fill('#password', "123456");
        
    
    await Promise.all([
        page.click('#login-form > fieldset > input'),
        page.waitForURL(allBooksURL)
    ]);
    
     await page.click('a[href="/create"]');
     await page.waitForSelector('#create-form');

     await page.fill('#title', "MagicTestBook");
     await page.fill('#description', "This is a test book description");
     await page.fill('#image', "https://example.com/book-image.jpg");
     await page.selectOption('#type', "Fiction");
     await page.click('#create-form > fieldset > input');

     await page.waitForURL(allBooksURL);
     expect(page.url()).toBe(allBooksURL);
});