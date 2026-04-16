import { Page, Locator, expect } from '@playwright/test';

export interface CheckoutFormData {
    name: string;
    country: string;
    city: string;
    card: string;
    month: string;
    year: string;
}

/**
 * Page Object para el modal de "Place Order" de la CartPage.
 */
export class CheckoutModal {
    readonly page: Page;
    readonly modal: Locator;
    readonly nameInput: Locator;
    readonly countryInput: Locator;
    readonly cityInput: Locator;
    readonly cardInput: Locator;
    readonly monthInput: Locator;
    readonly yearInput: Locator;
    readonly purchaseButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.modal = page.locator('#orderModal');
        this.nameInput = page.locator('#name');
        this.countryInput = page.locator('#country');
        this.cityInput = page.locator('#city');
        this.cardInput = page.locator('#card');
        this.monthInput = page.locator('#month');
        this.yearInput = page.locator('#year');
        this.purchaseButton = page.locator('button:has-text("Purchase")');
    }

    async fillForm(data: CheckoutFormData) {
        await expect(this.modal).toHaveClass(/show/, { timeout: 5000 });
        await expect(this.nameInput).toBeVisible();
        await this.nameInput.focus();
        await this.nameInput.fill(data.name);
        await this.countryInput.fill(data.country);
        await this.cityInput.fill(data.city);
        await this.cardInput.fill(data.card);
        await this.monthInput.fill(data.month);
        await this.yearInput.fill(data.year);
    }

    async submitPurchase() {
        await this.purchaseButton.click();
    }
}
