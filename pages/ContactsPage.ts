import { Page } from '@playwright/test';

export class ContactsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToContacts() {
    await this.page.getByRole('link', { name: 'Kontakter' }).click();
  }

  async clickNyKontakt() {
    await this.page.getByRole('button', { name: 'Ny kontakt' }).click();
  }

  async fillName(name: string) {
    await this.page.getByRole('textbox', { name: 'Navn *' }).fill(name);
  }

  async clickOpprettKontakt() {
    await this.page.getByRole('button', { name: 'Opprett kontakt' }).click();
  }

  getNameValidationError() {
    return this.page.getByText('Vennligst skriv inn navn');
  }

  getSuccessMessage() {
    return this.page
      .getByRole('status')
      .filter({ hasText: 'Ny kontakt lagret.' });
  }
}
