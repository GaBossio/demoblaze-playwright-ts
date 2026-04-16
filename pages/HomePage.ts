import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly cartLink: Locator;
    readonly productGrid: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartLink = page.locator('#cartur');
        this.productGrid = page.locator('#tbodyid');
    }

    async goto() {
        await this.page.goto('/');
    }

    async selectCategory(categoryName: string) {
        const category = this.page.locator(`a:has-text("${categoryName}")`);
        await category.click();
        await expect(this.productGrid.locator('.card')).not.toHaveCount(0, { timeout: 10000 });
    }

    async selectProduct(productName: string) {
        const productLink = this.page.locator(`a:has-text("${productName}")`);
        await expect(productLink).toBeVisible({ timeout: 10000 });
        await productLink.click();
    }

    async goToCart() {
        await this.cartLink.click();
        await this.page.waitForURL('**/cart.html');
    }
}