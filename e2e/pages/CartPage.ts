import { expect, type Locator, type Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly title: Locator;
  readonly items: Locator;
  readonly checkoutButton: Locator;
  readonly continueShopping: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByTestId('title');
    this.items = page.getByTestId('inventory-item');
    this.checkoutButton = page.getByTestId('checkout-button');
    this.continueShopping = page.getByTestId('continue-shopping');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/cart\.html$/);
    await expect(this.title).toHaveText('Your Cart');
  }

  async itemNames(): Promise<string[]> {
    return this.items.getByTestId('inventory-item-name').allInnerTexts();
  }

  async removeFirst(): Promise<void> {
    await this.items.first().getByRole('button', { name: /remove/i }).click();
  }

  async checkout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
