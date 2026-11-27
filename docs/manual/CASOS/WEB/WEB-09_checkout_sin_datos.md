# WEB-09 — Checkout sin datos

## Metadatos
- **ID**: WEB-09
- **Área**: Web / Checkout
- **Prioridad**: Alta
- **Tipo**: Funcional / Negativo
- **Automatizado**: Sí (`e2e/tests/checkout.spec.ts::WEB-09`)
- **Tags**: @critical

## Precondiciones
- Carrito con 1 producto
- Paso de información personal abierto

## Datos de prueba
| Campo | Valor |
|---|---|
| Campos | Todos vacíos |

## Pasos
1. Hacer clic en "Continue" sin rellenar nada

## Resultado esperado
- Mensaje "Error: First Name is required"
- Permanecer en `/checkout-step-one.html`

## Evidencia requerida
- Captura del error (`EVIDENCIAS/WEB-09_error.png`)

## Criterio de aceptación
Validación de nombre obligatorio visible

## Postcondiciones
Orden no creada.
