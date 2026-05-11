import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
 

  constructor(page: Page) {
    this.page = page;
    // Using robust IDs and Headings
    this.emailInput = page.locator('#customer_email');
    this.passwordInput = page.locator('#customer_password');
    this.signInButton = page.getByRole('button', { name: 'Sign In' });

  }

  async login(email: string, pass: string) {
    await this.page.goto('https://sauce-demo.myshopify.com/account/login');
    await this.emailInput.fill(email);
    await this.passwordInput.fill(pass);
    await this.signInButton.click();
  }
}