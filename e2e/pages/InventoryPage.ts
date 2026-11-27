import { expect, type Locator, type Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly menuButton: Locator;
  readonly cartLink: Locator;
  readonly items: Locator;
  readonly sort: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByTestId('title');
    this.menuButton = page.getByTestId('open-menu');
    this.cartLink = page.getByTestId('shopping-cart-link');
    this.items = page.getByTestId('inventory-item');
    this.sort = page.getByTestId('product-sort-container');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/inventory\.html$/);
    await expect(this.title).toHaveText('Products');
    await expect(this.menuButton).toBeVisible();
  }

  async addProduct(testId: string): Promise<void> {
    await this.page.getByTestId(`add-to-cart-${testId}`).click();
  }

  async addFirstProducts(count: number): Promise<string[]> {
    const names: string[] = [];
    for (let index = 0; index < count; index += 1) {
      const item = this.items.nth(index);
      const name = await item.getByTestId('inventory-item-name').innerText();
      names.push(name);
      await item.getByRole('button', { name: /add to cart/i }).click();
    }
    return names;
  }

  async prices(): Promise<number[]> {
    const texts = await this.items.getByTestId('inventory-item-price').allInnerTexts();
    return texts.map((text) => Number(text.replace(/[^0-9.]/g, '')));
  }

  async sortBy(option: 'lohi' | 'hilo'): Promise<void> {
    await this.sort.selectOption(option);
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }

  async logout(): Promise<void> {
    await this.page.getByRole('button', { name: 'Open Menu' }).click();
    await this.page.getByTestId('logout-sidebar-link').click();
  }
}
