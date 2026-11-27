import { expect, test } from '@playwright/test';
import { CartPage } from '../pages/CartPage';
import { loginStandard } from './helpers';

test.describe('Carrito WEB-05..07, WEB-10', () => {
  test('WEB-05 añadir 1 producto @smoke @critical', async ({ page }) => {
    // Caso manual: docs/manual/CASOS/WEB/WEB-05_añadir_1_producto.md
    const inventory = await loginStandard(page);
    await inventory.addProduct('sauce-labs-backpack');
    await expect(inventory.cartLink).toHaveText('1');
    await inventory.openCart();
    const cart = new CartPage(page);
    await cart.expectLoaded();
    await expect(cart.items).toHaveCount(1);
    await expect(cart.items.getByTestId('inventory-item-name')).toHaveText('Sauce Labs Backpack');
  });

  test('WEB-06 añadir 3 productos @regression', async ({ page }) => {
    // Caso manual: docs/manual/CASOS/WEB/WEB-06_añadir_3_productos.md
    const inventory = await loginStandard(page);
    const names = await inventory.addFirstProducts(3);
    expect(names).toHaveLength(3);
    await expect(inventory.cartLink).toHaveText('3');
    await inventory.openCart();
    const cart = new CartPage(page);
    await cart.expectLoaded();
    await expect(cart.items).toHaveCount(3);
    expect(await cart.itemNames()).toEqual(names);
  });

  test('WEB-07 eliminar producto @regression', async ({ page }) => {
    // Caso manual: docs/manual/CASOS/WEB/WEB-07_eliminar_producto.md
    const inventory = await loginStandard(page);
    await inventory.addFirstProducts(2);
    await inventory.openCart();
    const cart = new CartPage(page);
    await cart.expectLoaded();
    await expect(cart.items).toHaveCount(2);
    await cart.removeFirst();
    await expect(cart.items).toHaveCount(1);
  });

  test('WEB-10 orden por precio @regression', async ({ page }) => {
    // Caso manual: docs/manual/CASOS/WEB/WEB-10_orden_precio.md
    const inventory = await loginStandard(page);
    await inventory.sortBy('lohi');
    const prices = await inventory.prices();
    expect(prices.length).toBeGreaterThan(1);
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
    await inventory.sortBy('hilo');
    const descending = await inventory.prices();
    expect(descending).toEqual([...descending].sort((a, b) => b - a));
  });
});
