import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ContactsPage } from '../pages/ContactsPage';
import { config } from '../utils/config';

test.describe('Contact Scenarios', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(config.testUser, config.testPassword);
    await page.waitForURL('**/dashboard');
  });

  test('Contact Creation - Validation', async ({ page }) => {
    const contactsPage = new ContactsPage(page);

    await contactsPage.navigateToContacts();
    await contactsPage.clickNyKontakt();
    await contactsPage.clickOpprettKontakt();

    const errorMessage = contactsPage.getNameValidationError();
    
    await expect(errorMessage).toBeVisible();
  });

  test('Contact Creation - Success', async ({ page }) => {
    const contactsPage = new ContactsPage(page);

    await contactsPage.navigateToContacts();
    await contactsPage.clickNyKontakt();
    await contactsPage.fillName('Test');
    await page.keyboard.press('Tab');
    const opprettBtn = page.getByRole('button', { name: 'Opprett kontakt' });
    await opprettBtn.hover();
    await opprettBtn.waitFor({ state: 'visible', timeout: 10000 });

    await page.waitForSelector('button:has-text("Opprett kontakt"):not([disabled])', { timeout: 10000 });
    await page.waitForTimeout(2000);
    await contactsPage.clickOpprettKontakt()

    await expect(contactsPage.getSuccessMessage()).toBeVisible({ timeout: 20000 });
  });
});
