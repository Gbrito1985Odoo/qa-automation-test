import { expect, test } from '@playwright/test';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { checkoutData } from '../fixtures/users';
import { loginStandard } from './helpers';

test('REG-01 login → carrito → checkout @regression', async ({ page }) => {
  // Caso manual: docs/manual/CASOS/WEB/WEB-08_checkout_happy.md
  const inventory = await loginStandard(page);
  await inventory.addFirstProducts(2);
  await inventory.openCart();
  const cart = new CartPage(page);
  await cart.expectLoaded();
  expect(await cart.itemNames()).toHaveLength(2);
  await cart.checkout();
  const checkout = new CheckoutPage(page);
  await checkout.fillInformation(checkoutData.firstName, checkoutData.lastName, checkoutData.postalCode);
  await checkout.expectOverviewStep();
  await checkout.finish();
  await checkout.expectConfirmation();
});
