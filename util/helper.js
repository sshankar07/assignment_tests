async function submitCredentials(page, username, password) {
    await page.fill('#username', username);
    await page.fill('#password', password);
    await page.click('button:has-text("Login")');
}

module.exports = { submitCredentials };
