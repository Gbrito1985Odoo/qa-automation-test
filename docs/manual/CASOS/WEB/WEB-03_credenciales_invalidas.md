# WEB-03 — Credenciales inválidas

## Metadatos
- **ID**: WEB-03
- **Área**: Web / Autenticación
- **Prioridad**: Alta
- **Tipo**: Funcional / Negativo
- **Automatizado**: Sí (`e2e/tests/login.spec.ts::WEB-03`)
- **Tags**: @critical

## Precondiciones
- Navegador en la página de login

## Datos de prueba
| Campo | Valor |
|---|---|
| Usuario | `wrong_user` |
| Contraseña | `wrong_pass` |

## Pasos
1. Ingresar `wrong_user`
2. Ingresar `wrong_pass`
3. Hacer clic en "Login"

## Resultado esperado
- Mensaje: "Username and password do not match any user in this service"

## Evidencia requerida
- Captura del mensaje de error (`EVIDENCIAS/WEB-03_error.png`)

## Criterio de aceptación
Mensaje exacto visible, sin redirección

## Postcondiciones
Sesión no iniciada.
