import { Page } from '@playwright/test';

export class PurchasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToBokforing() {
    await this.page.getByRole('button', { name: 'Bokføring' }).click();
    await this.page.getByRole('link', { name: 'Bokfør andre filer' }).waitFor({ state: 'visible', timeout: 10000 });
    await this.page.getByRole('link', { name: 'Bokfør andre filer' }).click();
  }

async selectContact(contactName: string) {
  await this.page.getByTestId('contact-select').waitFor({ state: 'visible', timeout: 10000 });
  await this.page.getByTestId('contact-select').click();
  await this.page.locator('.v-list-item__title', { hasText: contactName }).click();
}

  async fillAmount(amount: string) {
    await this.page.getByRole('textbox', { name: 'Totalt beløp inkl. mva. *' }).fill(amount);
  }

  async fillInvoiceDate(date: string) {
    await this.page.getByLabel('Fakturadato *').fill(date);
  }
  
  async fillDueDate(date: string) {
    await this.page.getByLabel('Forfallsdato').fill(date);
  }

  async selectAccount(accountLabel: string) {
    await this.page.getByRole('button', { name: /Konto \*/ }).click();
    const accountOption = this.page.locator('.v-list-item__title', { hasText: accountLabel });
    await accountOption.waitFor({ state: 'visible' });
    await accountOption.click();
  }  

  async clickBokfor() {
    await this.page.getByRole('button', { name: 'Bokfør', exact: true }).click();
  }

  async checkKvittering() {
    await this.page.getByRole('checkbox', { name: 'Dette er en kvittering (' }).check();
  }

  async fillInvoiceNumber(invoiceNumber: string) {
      await this.page.getByLabel('Fakturanr.').fill(invoiceNumber);
  }

  getErrorAlert() {
    return this.page.getByRole('alert').filter({ hasText: 'Fakturanr. er allerede bokført' });  
  }

  getSuccessAlert() {
    return this.page.getByRole('status').filter({ hasText: 'Bilag opprettet med bilagsnr.' });
  }  

  async isFormCleared() {
    const amountValue = await this.page
      .getByRole('textbox', { name: 'Totalt beløp inkl. mva. *' })
      .inputValue();
    return amountValue === '';
  }
}
