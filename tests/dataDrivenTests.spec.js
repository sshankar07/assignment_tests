const { test, expect } = require('@playwright/test');
const testData = require('../data/testData.json');
const { login, navigateToModule } = require('../util/helper');
const logger = require('../util/logger');
require('dotenv').config();

// Load credentials from environment variables
const username = process.env.USERNAME || 'defaultUser';
const password = process.env.PASSWORD || 'defaultPassword';

test.describe('Data-Driven Tests', () => {
    testData.tests.forEach(({ module, task, status, tags }) => {
        test(`Verify task "${task}" in module "${module}"`, async ({ page }) => {
            logger.info(`Verifying task "${task}" in module "${module}"`);
            await page.goto('/');
            await login(page, username, password);
            await navigateToModule(page, module);

            // Ensure the column is visible
            const column = page.locator(`h2:has-text("${status}") >> xpath=..`);
            await expect(column).toBeVisible();
            const taskElement = page.locator(`h3:has-text("${task}")`);
            await expect(taskElement).toBeVisible();

            // Ensure Tag is visible
            for (const tag of tags) {
                logger.info(`Verifying tag "${tag}" under "${status}"`);
                await expect(taskElement.locator(`..`).locator(`div span:has-text("${tag}")`)).toBeVisible();
            }

        });
    });
});
