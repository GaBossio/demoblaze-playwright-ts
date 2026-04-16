import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.ts';
import { ProductPage } from '../pages/ProductPage.ts';
import { CartPage } from '../pages/CartPage.ts';
import { CheckoutModal } from '../components/CheckoutModal.ts';
import { PurchaseConfirmation } from '../components/PurchaseConfirmation.ts';
import { categories, products, checkoutData } from '../test-data/cart.ts';

test.describe('Gestión del Carrito de Compras', () => {

  test('Completar flujo de compra exitosamente para un producto', {
    tag: ['@e2e', '@compra'],
    annotation: { type: 'docs', description: 'Flujo happy-path: selección - carrito - checkout - confirmacion' },
  }, async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const checkoutModal = new CheckoutModal(page);
    const purchaseConfirmation = new PurchaseConfirmation(page);

    const productName = products.phone;

    //Navegar a la Home y seleccionar producto
    await homePage.goto();
    await homePage.selectCategory(categories.phones);
    await homePage.selectProduct(productName);

    //Obtener el precio del producto
    const productPrice = await productPage.getProductPrice();

    //Agregar al carrito y validar alerta
    const alertMessage = await productPage.addToCartAndGetAlertMessage();
    expect(alertMessage).toContain('Product added');

    //Validar que el producto aparece en el carrito
    await homePage.goToCart();
    await cartPage.validateProductInCart(productName);

    //Validar que el total del carrito coincide con el precio del producto
    const totalAmount = await cartPage.getTotalAmount();
    expect(totalAmount).toBe(productPrice);

    //Completar el modal de checkout y confirmar la compra
    await cartPage.clickPlaceOrder();
    await checkoutModal.fillForm(checkoutData);
    await checkoutModal.submitPurchase();

    //Validar el popup de confirmación y que el ID de compra existe y es numérico
    const orderId = await purchaseConfirmation.validateSuccessAndGetOrderId();
    expect(orderId).toBeDefined();
    expect(orderId.length).toBeGreaterThan(0);
    expect(orderId).toMatch(/^\d+$/);

    console.log(`Compra realizada. Order ID: ${orderId}`);
  });
});