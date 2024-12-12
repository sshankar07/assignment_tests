// @ts-check
const { test } = require('@playwright/test');
const { login } = require('../util/helper');
const username = process.env.USERNAME || 'defaultUser';
const password = process.env.PASSWORD || 'defaultPassword';
const logger = require('../util/logger');
require('dotenv').config();


test.describe('Login Automation', () => {
  test('Login to the Demo App', async ({ page }) => {
    logger.info(`Verifying login action"`);
    await page.goto('/');
    await login(page, username, password);
  });
});
