import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object para el popup de confirmación de compra de la CartPage.
 */
export class PurchaseConfirmation {
    readonly page: Page;
    readonly popup: Locator;
    readonly title: Locator;
    readonly details: Locator;
    readonly okButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.popup = page.locator('.sweet-alert.showSweetAlert');
        this.title = this.popup.locator('h2');
        this.details = this.popup.locator('p').filter({ hasText: 'Id:' }).first();
        this.okButton = this.popup.locator('button.confirm');
    }

    async validateSuccessAndGetOrderId(): Promise<string> {
        await expect(this.popup).toBeVisible({ timeout: 15000 });
        await expect(this.title).toHaveText('Thank you for your purchase!');

        await expect(this.details).toBeVisible();
        const detailsText = await this.details.innerText();

        const match = detailsText.match(/Id:\s+(\d+)/);
        if (!match) {
            throw new Error(`Order ID not found in confirmation text: ${detailsText}`);
        }

        await this.okButton.click();

        return match[1];
    }
}
