import { expect, test } from '@playwright/test';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { checkoutData } from '../fixtures/users';
import { loginStandard } from './helpers';

test.describe('Checkout WEB-08..09', () => {
  test('WEB-08 checkout happy path @smoke @critical', async ({ page }) => {
    // Caso manual: docs/manual/CASOS/WEB/WEB-08_checkout_happy.md
    const inventory = await loginStandard(page);
    await inventory.addProduct('sauce-labs-backpack');
    await inventory.openCart();
    const cart = new CartPage(page);
    await cart.checkout();
    const checkout = new CheckoutPage(page);
    await checkout.expectInformationStep();
    await checkout.fillInformation(
      checkoutData.firstName,
      checkoutData.lastName,
      checkoutData.postalCode,
    );
    await checkout.expectOverviewStep();
    await checkout.finish();
    await checkout.expectConfirmation();
  });

  test('WEB-09 checkout sin datos @critical', async ({ page }) => {
    // Caso manual: docs/manual/CASOS/WEB/WEB-09_checkout_sin_datos.md
    const inventory = await loginStandard(page);
    await inventory.addProduct('sauce-labs-bike-light');
    await inventory.openCart();
    const cart = new CartPage(page);
    await cart.checkout();
    const checkout = new CheckoutPage(page);
    await checkout.expectInformationStep();
    await checkout.continueButton.click();
    await expect(checkout.error).toContainText('First Name is required');
  });
});
