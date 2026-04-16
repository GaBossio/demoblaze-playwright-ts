# Demoblaze – Automatización E2E con Playwright

Proyecto demo de automatización de pruebas end-to-end sobre [Demoblaze](https://www.demoblaze.com), una tienda e-commerce de ejemplo. Construido con **Playwright** y **TypeScript** siguiendo el patrón **Page Object Model (POM)**.

---

## Tech Stack

| Herramienta | Versión |
|---|---|
| [Playwright](https://playwright.dev/) | ^1.59 |
| TypeScript | (incluido con `@playwright/test`) |
| Node.js | LTS |

---

## Estructura del Proyecto

```
demoblaze-playwright/
├── components/             # Componentes reutilizables (modales, popups)
│   ├── CheckoutModal.ts
│   └── PurchaseConfirmation.ts
├── pages/                  # Page Objects por cada página
│   ├── HomePage.ts
│   ├── ProductPage.ts
│   └── CartPage.ts
├── test-data/              # Datos de prueba externalizados
│   └── cart.ts
├── tests/                  # Specs de prueba
│   └── cart.spec.ts
├── .github/workflows/      # CI con GitHub Actions
│   └── playwright.yml
└── playwright.config.ts    # Configuración de Playwright
```

---

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/<tu-usuario>/demoblaze-playwright.git
cd demoblaze-playwright

# Instalar dependencias
npm install

# Instalar navegadores de Playwright
npx playwright install chromium
```

---

## Ejecución de Tests

```bash
# Ejecutar todos los tests
npx playwright test

# Ejecutar en modo headed (visual)
npx playwright test --headed

# Ejecutar un test específico
npx playwright test cart.spec.ts

# Ver el reporte HTML después de la ejecución
npx playwright show-report
```

---

## Flujo de Prueba

El test principal (`cart.spec.ts`) cubre un flujo E2E completo de compra:

1. Navegar a la Home de Demoblaze
2. Filtrar por categoría y seleccionar un producto
3. Obtener el precio y agregar al carrito (validando la alerta del navegador)
4. Verificar que el producto aparece en el carrito con el precio correcto
5. Completar el formulario de checkout
6. Validar la confirmación de compra y extraer el Order ID

---

## Patrones y Prácticas aplicadas

- **Page Object Model**: separación clara entre lógica de interacción y tests.
- **Componentes**: modales y popups encapsulados en su propia capa (`components/`), separados de las páginas.
- **Datos externalizados**: los datos de prueba viven en `test-data/`, facilitando su mantenimiento.
- **Smart waits**: uso de `expect` con timeouts en lugar de waits estáticos.
- **Manejo de dialogs nativos**: captura y validación de alertas del navegador con `page.waitForEvent('dialog')`.
- **CI/CD**: pipeline de GitHub Actions que ejecuta los tests en cada push/PR.

---

## CI/CD

El proyecto incluye un workflow de GitHub Actions (`.github/workflows/playwright.yml`) que:

- Se ejecuta en cada **push** o **pull request** a `main`/`master`
- Puede dispararse manualmente (`workflow_dispatch`)
- Instala dependencias, ejecuta los tests y sube el reporte HTML como artefacto (retención: 7 días)

---