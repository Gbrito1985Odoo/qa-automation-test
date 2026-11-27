# WEB-01 — Login correcto

## Metadatos
- **ID**: WEB-01
- **Área**: Web / Autenticación
- **Prioridad**: Alta
- **Tipo**: Funcional / Positivo
- **Automatizado**: Sí (`e2e/tests/login.spec.ts::WEB-01`)
- **Tags**: @smoke @critical

## Precondiciones
- Navegador abierto en `https://www.saucedemo.com`
- Usuario `standard_user` disponible

## Datos de prueba
| Campo | Valor |
|---|---|
| Usuario | `standard_user` |
| Contraseña | `secret_sauce` |

## Pasos
1. Abrir `https://www.saucedemo.com`
2. Ingresar usuario `standard_user`
3. Ingresar contraseña `secret_sauce`
4. Hacer clic en "Login"

## Resultado esperado
- Redirección a `/inventory.html`
- Título de página: "Products"
- Menú lateral visible

## Evidencia requerida
- Captura del inventario (`EVIDENCIAS/WEB-01_inventory.png`)
- Log de consola sin errores

## Criterio de aceptación
Redirección correcta + título "Products" visible

## Postcondiciones
Sesión iniciada; cerrar sesión al finalizar.
