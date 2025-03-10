import { test, expect } from '@playwright/test';
import path from 'path';

const { submitCredentials } = require('../util/helper');
const filePath = path.join(__dirname, '../app/assignment.html');
const fileUrl = `file://${filePath}`
// Load credentials from environment variables
const username = process.env.USERNAME || 'defaultUser';
const password = process.env.PASSWORD || 'defaultPassword';

test.describe('Home Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(fileUrl);
    await submitCredentials(page, username, password);
    await expect(page.locator('#homeContainer')).toBeVisible();
  });

  test('Date input functionality', async ({ page }) => {
    await page.fill('#date', '2025-03-09');
    await expect(page.locator('#date')).toHaveValue('2025-03-09');
  });

  test('Favorite Team selection remains disabled before date is selected', async ({ page }) => {
    await expect(page.locator('#team')).toBeDisabled();
  });

  test('Enabling Favorite Team dropdown after date selection', async ({ page }) => {
    await page.fill('#date', '2025-03-09');
    await page.waitForTimeout(10000);
    await expect(page.locator('#team')).toBeEnabled();
  });

  test('Enabling of Player’s Name input after selecting team', async ({ page }) => {
    await page.fill('#date', '2025-03-09');
    await page.waitForTimeout(10000);
    await page.selectOption('#team', 'NYM');
    await expect(page.locator('#name')).toBeVisible();
  });

  test('Form validation when fields are empty', async ({ page }) => {
    page.on('dialog', async dialog => {
      expect(dialog.message()).toBe('Please fill out all fields');
      await dialog.dismiss();
    });
    await page.click('#submitButton');
  });

  test('Successful form submission', async ({ page }) => {
    await page.fill('#date', '2025-03-09');
    await page.waitForTimeout(10000);
    await page.selectOption('#team', 'NYM');
    await page.fill('#name', 'John Doe');
    await page.click('#submitButton');
    await expect(page.locator('#thankYouContainer')).toBeVisible();
  });

  test('Favorite Team dropdown should enable within a reasonable time', async ({ page }) => {
    await page.fill('#date', '2025-03-09');
    const startTime = Date.now();
    await page.waitForFunction(() => !document.getElementById('team').disabled);
    const elapsedTime = Date.now() - startTime;
    console.log(`Dropdown enabled in ${elapsedTime / 1000} seconds`);
    expect(elapsedTime).toBeLessThanOrEqual(10000);
});

test('Verify clearing date after selecting a team triggers validation', async ({ page }) => {
  await page.fill('#date', '2025-03-10');
  await page.waitForFunction(() => !document.getElementById('team').disabled);
  await page.selectOption('#team', 'NYM'); 
  await page.fill('#date', '');
  await page.click('#submitButton');
  // Validate the expected error message
  await expect(page.locator('#teamError')).toHaveText('Please select a date first');
});

test('Validate the team dropdown list has all teams and matches expected size', async ({ page }) => {
  const teamOptions = await page.locator('#team option').allTextContents();
  // 30 teams + 1 default "Select a team"
  const expectedTeamCount = 31;
  expect(teamOptions.length).toBe(expectedTeamCount);
  // Validate default option exists
  expect(teamOptions[0]).toBe('Select a team');
});

test('Validate the team dropdown list is in alphabetical order', async ({ page }) => {
  const teamOptions = await page.locator('#team option').allTextContents();
  const actualTeams = teamOptions.slice(1);
  const sortedTeams = [...actualTeams].sort();
  // Validate that the dropdown is sorted
  expect(actualTeams).toEqual(sortedTeams);
});

test('Verify all spelling in Home Page are correct', async ({ page }) => {
  const expectedTexts = [
      'Home Page',
      'Date:',
      'Favorite Team:',
      'Submit'
  ];

  for (const text of expectedTexts) {
      await expect(page.locator(`text=${text}`)).toBeVisible();
  }

  // Select date and team to enable Player's Name field
  await page.fill('#date', '2025-03-09');
  await page.waitForFunction(() => !document.getElementById('team').disabled);
  await page.selectOption('#team', 'NYM');
  await page.waitForSelector('#name', { state: 'visible' });

  // Validate Player's Name field spelling after enabling it
  await expect(page.locator('label[for="name"]')).toHaveText("Enter a Player's Name:");
});


test('Verify tab key navigates correctly on Home Page', async ({ page }) => {
  await page.fill('#date', '2025-03-09');
  await page.waitForTimeout(10000);
  await page.keyboard.press('Tab');
  await expect(page.locator('#team')).toBeEnabled();

  // Select a team and wait for the name field to be enabled
  await page.selectOption('#team', 'NYM');
  await page.waitForSelector('#name', { state: 'visible' });

  await page.keyboard.press('Tab');
  await expect(page.locator('#name')).toBeEnabled();

  await page.keyboard.press('Tab');
  await expect(page.locator('#submitButton')).toBeEnabled();
});


test('Verify leap year selection in date picker', async ({ page }) => {
  // Leap year test (valid)
  await page.fill('#date', '2024-02-29'); // 2024 is a leap year
  await expect(page.locator('#date')).toHaveValue('2024-02-29');

  // Non-leap year test (2023-02-29 should not be allowed)
  await page.evaluate(() => document.getElementById('date').value = '2023-02-29');
  await expect(page.locator('#date')).not.toHaveValue('2023-02-29');
});


test('Pressing Enter should submit the Home Page form', async ({ page }) => {
  await page.fill('#date', '2025-03-09');
  await page.waitForFunction(() => !document.getElementById('team').disabled);
  await page.selectOption('#team', 'NYM');
  await page.fill('#name', 'John Doe');

  await page.keyboard.press('Enter');
  await expect(page.locator('#thankYouContainer')).toBeVisible();
});

});
