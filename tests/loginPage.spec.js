import { test, expect } from '@playwright/test';
import path from 'path';
const { submitCredentials } = require('../util/helper');
// Load credentials from environment variables
const username = process.env.USERNAME || 'defaultUser';
const password = process.env.PASSWORD || 'defaultPassword';
const filePath = path.join(__dirname, '../app/assignment.html');
const fileUrl = `file://${filePath}`

test.describe('Login Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
  });

  test('Successful login with valid credentials', async ({ page }) => {
    await submitCredentials(page, username, password);
    await expect(page.locator('#homeContainer')).toBeVisible();
  });

  test('Error message for incorrect username', async ({ page }) => {
    await submitCredentials(page, 'wrongUser', password);
    await expect(page.locator('#usernameError')).toHaveText('This user does not exist');
  });

  test('Error message for incorrect password', async ({ page }) => {
    await submitCredentials(page, username, 'wrongPass');
    await expect(page.locator('#passwordError')).toHaveText('Invalid Password');
  });

  test('Verify that password is not validated if username is incorrect', async ({ page }) => {
    await submitCredentials(page, 'wrongUser', 'wrongPass');
    await expect(page.locator('#usernameError')).toHaveText('This user does not exist');
    await expect(page.locator('#passwordError')).toBeEmpty();
  });

  test('Error message when both fields are empty', async ({ page }) => {
    await page.click('button:has-text("Login")');
    await expect(page.locator('#loginError')).toHaveText('Enter a valid user name and password');
  });

  test('Clear button clears input fields', async ({ page }) => {
    await submitCredentials(page, username, 'p@$$word');
    await page.click('button:has-text("Clear")');
    await expect(page.locator('#username')).toBeEmpty();
    await expect(page.locator('#password')).toBeEmpty();
  });

  test('Clear button resets fields and error messages', async ({ page }) => {
    await submitCredentials(page, 'wrongUser', 'wrongPass');
    await page.click('button:has-text("Clear")');
    await expect(page.locator('#username')).toBeEmpty();
    await expect(page.locator('#password')).toBeEmpty();
    await expect(page.locator('#usernameError')).toBeEmpty();
    await expect(page.locator('#passwordError')).toBeEmpty();
  });

  test('Username field should trim spaces', async ({ page }) => {
    await submitCredentials(page, 'admin ', password);
    await expect(page.locator('#homeContainer')).toBeVisible();
  });

  test('Verify all spelling in Login Page are correct', async ({ page }) => {
    const expectedTexts = [
      { text: 'Please Login', selector: 'h2' },
      { text: 'Username:', selector: 'label[for="username"]' },
      { text: 'Password:', selector: 'label[for="password"]' },
      { text: 'Clear', selector: 'button:has-text("Clear")' },
      { text: 'Login', selector: 'button:has-text("Login")' }
    ];

    for (const item of expectedTexts) {
      await expect(page.locator(`${item.selector}`)).toHaveText(item.text);
    }
  });


  test('Verify tab key navigates correctly on Login Page', async ({ page }) => {
    await page.click('#username');
    await page.keyboard.press('Tab');
    await expect(page.locator('#password')).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.locator('button:has-text("Clear")')).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.locator('button:has-text("Login")')).toBeFocused();
  });

  test('Pressing Enter should submit the login form', async ({ page }) => {
    await page.fill('#username', 'admin');
    await page.fill('#password', 'p@$$w0rd');
    await page.keyboard.press('Enter');
    await expect(page.locator('#homeContainer')).toBeVisible();
  });


});
