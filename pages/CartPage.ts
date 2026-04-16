import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object para la página del Carrito de compras.
 */
export class CartPage {
    readonly page: Page;
    readonly placeOrderButton: Locator;
    readonly tableRows: Locator;
    readonly totalAmount: Locator;

    constructor(page: Page) {
        this.page = page;
        this.placeOrderButton = page.locator('button:has-text("Place Order")');
        this.tableRows = page.locator('#tbodyid tr');
        this.totalAmount = page.locator('#totalp');
    }

    async validateProductInCart(productName: string) {
        const row = this.tableRows.filter({ hasText: productName }).first();
        await expect(row).toBeVisible({ timeout: 10000 });
        return row;
    }

    async getTotalAmount(): Promise<number> {
        await expect(this.totalAmount).toBeVisible();
        const text = await this.totalAmount.innerText();
        return parseInt(text.trim(), 10);
    }

    async clickPlaceOrder() {
        await this.placeOrderButton.click();
    }
}
