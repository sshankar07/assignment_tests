async function login(page, username, password) {
    await page.fill('#username', username);
    await page.fill('#password', password);
    await page.click('button[type="submit"]');
}

async function navigateToModule(page, module) {
    await page.click(`text=${module}`);
}

module.exports = { login, navigateToModule };
