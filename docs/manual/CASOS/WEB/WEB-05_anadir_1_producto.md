# WEB-05 — Añadir 1 producto

## Metadatos
- **ID**: WEB-05
- **Área**: Web / Carrito
- **Prioridad**: Alta
- **Tipo**: Funcional / Positivo
- **Automatizado**: Sí (`e2e/tests/cart.spec.ts::WEB-05`)
- **Tags**: @smoke @critical

## Precondiciones
- Sesión iniciada como `standard_user`
- Inventario visible

## Datos de prueba
| Campo | Valor |
|---|---|
| Producto | `sauce-labs-backpack` |

## Pasos
1. Hacer clic en "Add to cart" de Sauce Labs Backpack
2. Abrir el carrito

## Resultado esperado
- Contador del carrito = 1
- El carrito contiene "Sauce Labs Backpack"

## Evidencia requerida
- Captura del carrito (`EVIDENCIAS/WEB-05_cart.png`)

## Criterio de aceptación
Contador y producto coinciden

## Postcondiciones
Carrito con 1 producto; limpiar al finalizar.
