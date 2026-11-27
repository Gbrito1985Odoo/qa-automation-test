# WEB-08 — Checkout happy path

## Metadatos
- **ID**: WEB-08
- **Área**: Web / Checkout
- **Prioridad**: Alta
- **Tipo**: Funcional / Positivo
- **Automatizado**: Sí (`e2e/tests/checkout.spec.ts::WEB-08`)
- **Tags**: @smoke @critical

## Precondiciones
- Carrito con al menos 1 producto

## Datos de prueba
| Campo | Valor |
|---|---|
| Nombre | `QA` |
| Apellido | `Automation` |
| Código postal | `28001` |

## Pasos
1. Abrir el carrito
2. Hacer clic en "Checkout"
3. Completar nombre, apellido y código postal
4. Continuar y hacer clic en "Finish"

## Resultado esperado
- URL `/checkout-complete.html`
- Mensaje "Thank you for your order!"

## Evidencia requerida
- Captura de confirmación (`EVIDENCIAS/WEB-08_complete.png`)

## Criterio de aceptación
Orden confirmada con mensaje exacto

## Postcondiciones
Orden creada; no reutilizar datos de pago.
