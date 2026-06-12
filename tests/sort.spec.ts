import { test, expect } from '@playwright/test';

test('sort products by price low to high', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: /login/i }).click();

  await page.locator('[data-test="product-sort-container"]')
    .selectOption('lohi');

  const prices = await page
    .locator('.inventory_item_price')
    .allTextContents();

  const numericPrices = prices.map(price =>
    parseFloat(price.replace('$', ''))
  );

  const lowestPrice = Math.min(...numericPrices);

  expect(numericPrices[0]).toBe(lowestPrice);
});