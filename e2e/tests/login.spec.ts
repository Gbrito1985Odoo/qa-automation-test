import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { users } from '../fixtures/users';

test.describe('Login WEB-01..04', () => {
  test('WEB-01 login correcto @smoke @critical', async ({ page }) => {
    // Caso manual: docs/manual/CASOS/WEB/WEB-01_login_correcto.md
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);
    await login.goto();
    await login.login(users.standard.username, users.standard.password);
    await inventory.expectLoaded();
    await inventory.logout();
    await expect(page).toHaveURL(/\/$/);
  });

  test('WEB-02 login bloqueado @critical', async ({ page }) => {
    // Caso manual: docs/manual/CASOS/WEB/WEB-02_login_bloqueado.md
    const login = new LoginPage(page);
    await login.goto();
    await login.login(users.locked.username, users.locked.password);
    await login.expectError('Sorry, this user has been locked out.');
  });

  test('WEB-03 credenciales inválidas @critical', async ({ page }) => {
    // Caso manual: docs/manual/CASOS/WEB/WEB-03_credenciales_invalidas.md
    const login = new LoginPage(page);
    await login.goto();
    await login.login(users.invalid.username, users.invalid.password);
    await login.expectError('Username and password do not match any user in this service');
  });

  test('WEB-04 campos vacíos @smoke', async ({ page }) => {
    // Caso manual: docs/manual/CASOS/WEB/WEB-04_campos_vacios.md
    const login = new LoginPage(page);
    await login.goto();
    await login.loginButton.click();
    await login.expectError('Username is required');
  });
});
