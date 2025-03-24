import { Page } from '@playwright/test';
import { config } from '../utils/config';

export class LoginPage {
  readonly page: Page;
 
  private usernameInput = 'input[name="email"]';
  private passwordInput = 'input[name="password"]';
  private loginButton = 'button[type="submit"]:not([disabled])';

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(`${config.baseUrl}/login`);
  }

  async login(username: string, password: string) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.locator(this.loginButton).click();
  }
}
