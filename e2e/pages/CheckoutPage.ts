import { expect, type Locator, type Page } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly postalCode: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly error: Locator;
  readonly completeHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstName = page.getByTestId('firstName');
    this.lastName = page.getByTestId('lastName');
    this.postalCode = page.getByTestId('postalCode');
    this.continueButton = page.getByTestId('continue-button');
    this.finishButton = page.getByTestId('finish-button');
    this.error = page.getByTestId('error');
    this.completeHeader = page.getByTestId('complete-header');
  }

  async expectInformationStep(): Promise<void> {
    await expect(this.page).toHaveURL(/\/checkout-step-one\.html$/);
  }

  async fillInformation(first: string, last: string, postal: string): Promise<void> {
    await this.firstName.fill(first);
    await this.lastName.fill(last);
    await this.postalCode.fill(postal);
    await this.continueButton.click();
  }

  async expectOverviewStep(): Promise<void> {
    await expect(this.page).toHaveURL(/\/checkout-step-two\.html$/);
  }

  async finish(): Promise<void> {
    await this.finishButton.click();
  }

  async expectConfirmation(): Promise<void> {
    await expect(this.page).toHaveURL(/\/checkout-complete\.html$/);
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
  }
}
