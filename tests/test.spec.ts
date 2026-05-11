import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';

test('User can login to Shopify SauceDemo', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // 1. Perform Login (Using the credentials we found yesterday)
  await loginPage.login('adarshroshan45@gmail.com', 'Hannarose@2');

  // 2. The Verification (Check for the URL first)
  await expect(page).toHaveURL(/.*account/, { timeout: 10000 });

  // 3. The "Human" check (Looking for your name or the order history)
  await expect(page.getByText('Order History', { exact: false })).toBeVisible();
});