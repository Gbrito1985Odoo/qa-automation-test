# WEB-07 — Eliminar producto

## Metadatos
- **ID**: WEB-07
- **Área**: Web / Carrito
- **Prioridad**: Media
- **Tipo**: Funcional / Positivo
- **Automatizado**: Sí (`e2e/tests/cart.spec.ts::WEB-07`)
- **Tags**: @regression

## Precondiciones
- Carrito con 2 productos

## Datos de prueba
| Campo | Valor |
|---|---|
| Acción | Remove del primer producto |

## Pasos
1. Añadir 2 productos
2. Abrir el carrito
3. Hacer clic en "Remove" del primero

## Resultado esperado
- Queda 1 producto
- El contador se actualiza

## Evidencia requerida
- Captura antes/después (`EVIDENCIAS/WEB-07_remove.png`)

## Criterio de aceptación
Producto eliminado y contador coherente

## Postcondiciones
Carrito con 1 producto; limpiar.
