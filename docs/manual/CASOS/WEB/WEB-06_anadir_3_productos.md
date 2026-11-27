# WEB-06 — Añadir 3 productos

## Metadatos
- **ID**: WEB-06
- **Área**: Web / Carrito
- **Prioridad**: Media
- **Tipo**: Funcional / Positivo
- **Automatizado**: Sí (`e2e/tests/cart.spec.ts::WEB-06`)
- **Tags**: @regression

## Precondiciones
- Sesión iniciada
- Inventario con al menos 3 productos

## Datos de prueba
| Campo | Valor |
|---|---|
| Productos | Los 3 primeros del inventario |

## Pasos
1. Añadir los 3 primeros productos
2. Abrir el carrito

## Resultado esperado
- Contador = 3
- Tres productos listados en el mismo orden

## Evidencia requerida
- Captura del carrito (`EVIDENCIAS/WEB-06_cart.png`)

## Criterio de aceptación
Tres productos añadidos correctamente

## Postcondiciones
Carrito con 3 productos; limpiar.
