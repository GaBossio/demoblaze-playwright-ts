import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.ts';
import { ProductPage } from '../pages/ProductPage.ts';
import { CartPage } from '../pages/CartPage.ts';
import { categories, products } from '../test-data/cart.ts';

test.describe('Gestión del Carrito de Compras', () => {

  test('Completar flujo de compra exitosamente para un producto', {
    tag: ['@e2e', '@compra'],
    annotation: { type: 'docs', description: 'Flujo happy-path: selección - carrito - checkout - confirmacion' },
  }, async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

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
    await cartPage.clickPlaceOrder();
  });

});