import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { PurchasePage } from '../pages/PurchasePage';
import { config } from '../utils/config';

test.describe('Purchase Scenarios', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(config.testUser, config.testPassword);

    await page.waitForURL('**/dashboard');
  });

  test('Create Purchase - Success', async ({ page }) => {
    const purchasePage = new PurchasePage(page);

    await purchasePage.navigateToBokforing();
    await purchasePage.selectContact('Systima AS');
    await purchasePage.fillAmount('100');
    await purchasePage.fillInvoiceDate('01.01.2024');
    await purchasePage.fillDueDate('15.01.2024');
    await purchasePage.selectAccount('Utvikling, ervervet');

    await purchasePage.clickBokfor();

    await expect(purchasePage.getSuccessAlert()).toContainText('Bilag opprettet med bilagsnr.', { timeout: 30000 });

    const cleared = await purchasePage.isFormCleared();
    expect(cleared).toBe(true);
  });

  test('Duplicate Invoice Number Handling', async ({ page }) => {
    const purchasePage = new PurchasePage(page);

    await purchasePage.navigateToBokforing();

    await purchasePage.selectContact('Systima AS');
    await purchasePage.fillAmount('100');
    await purchasePage.fillInvoiceDate('01.01.2024');
    await purchasePage.fillDueDate('15.01.2024');
    await purchasePage.fillInvoiceNumber('1');
    await purchasePage.selectAccount('1000 Utvikling, ervervet');

    await purchasePage.clickBokfor();

    const errorAlert = purchasePage.getErrorAlert(); 
    await expect(errorAlert).toContainText('Fakturanr. er allerede bokført', { timeout: 20000});

    const isCleared = await purchasePage.isFormCleared();
    expect(isCleared).toBe(false);
  });
});
