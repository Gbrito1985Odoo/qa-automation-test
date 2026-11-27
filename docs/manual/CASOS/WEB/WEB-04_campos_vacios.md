# WEB-04 — Campos vacíos

## Metadatos
- **ID**: WEB-04
- **Área**: Web / Autenticación
- **Prioridad**: Media
- **Tipo**: Funcional / Negativo
- **Automatizado**: Sí (`e2e/tests/login.spec.ts::WEB-04`)
- **Tags**: @smoke

## Precondiciones
- Navegador en la página de login

## Datos de prueba
| Campo | Valor |
|---|---|
| Usuario | (vacío) |
| Contraseña | (vacío) |

## Pasos
1. Dejar ambos campos vacíos
2. Hacer clic en "Login"

## Resultado esperado
- Mensaje: "Username is required"

## Evidencia requerida
- Captura del mensaje (`EVIDENCIAS/WEB-04_error.png`)

## Criterio de aceptación
Validación de campo obligatoria visible

## Postcondiciones
Sesión no iniciada.
