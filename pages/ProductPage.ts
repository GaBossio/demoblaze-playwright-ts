import { Page, Locator, expect } from '@playwright/test';

export class ProductPage {
    readonly page: Page;
    readonly addToCartButton: Locator;
    readonly priceContainer: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addToCartButton = page.locator('a:has-text("Add to cart")');
        this.priceContainer = page.locator('h3.price-container');
    }

    async getProductPrice(): Promise<number> {
        await expect(this.priceContainer).toBeVisible();
        const text = await this.priceContainer.innerText();
        const match = text.match(/\d+/);
        if (!match) throw new Error('Price not found');
        return parseInt(match[0], 10);
    }

    async addToCartAndGetAlertMessage(): Promise<string> {
        const [dialog] = await Promise.all([
            this.page.waitForEvent('dialog'),
            this.addToCartButton.click(),
        ]);
        const message = dialog.message();
        await dialog.accept();
        return message;
    }
}