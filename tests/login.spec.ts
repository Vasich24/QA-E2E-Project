import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { config } from '../utils/config';

test.describe('Login Scenarios', () => {
  test('Successful Login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(config.testUser, config.testPassword);
    await page.waitForURL(`${config.baseUrl}/systimaas7/dashboard`, { waitUntil: 'networkidle' })

    await expect(page).toHaveURL(`${config.baseUrl}/systimaas7/dashboard`);
  });

  test('Failed Login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('some_email@gmail.com', 'invalid_password');
   
    const alert = page.getByRole('alert');
    await expect(alert).toContainText('Feil brukernavn / passord');
  });
});
