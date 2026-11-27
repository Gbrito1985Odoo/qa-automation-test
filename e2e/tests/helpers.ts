import { expect, test, type Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { users } from '../fixtures/users';

export async function loginStandard(page: Page): Promise<InventoryPage> {
  const login = new LoginPage(page);
  await login.goto();
  await login.login(users.standard.username, users.standard.password);
  const inventory = new InventoryPage(page);
  await inventory.expectLoaded();
  return inventory;
}
