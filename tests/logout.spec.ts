import { test, expect } from '@playwright/test';

test('user can logout', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: /login/i }).click();

  await page.getByRole('button', {
    name: 'Open Menu'
  }).click();

  await page.locator('#logout_sidebar_link').click();

  await expect(page).toHaveURL('https://www.saucedemo.com/');

  await expect(
    page.getByRole('button', { name: /login/i })
  ).toBeVisible();
});