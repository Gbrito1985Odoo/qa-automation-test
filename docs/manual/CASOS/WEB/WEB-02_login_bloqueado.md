# WEB-02 — Login bloqueado

## Metadatos
- **ID**: WEB-02
- **Área**: Web / Autenticación
- **Prioridad**: Alta
- **Tipo**: Funcional / Negativo
- **Automatizado**: Sí (`e2e/tests/login.spec.ts::WEB-02`)
- **Tags**: @critical

## Precondiciones
- Navegador en la página de login
- Usuario `locked_out_user` disponible

## Datos de prueba
| Campo | Valor |
|---|---|
| Usuario | `locked_out_user` |
| Contraseña | `secret_sauce` |

## Pasos
1. Ingresar `locked_out_user`
2. Ingresar `secret_sauce`
3. Hacer clic en "Login"

## Resultado esperado
- Permanecer en la página de login
- Mensaje: "Sorry, this user has been locked out."

## Evidencia requerida
- Captura del mensaje de error (`EVIDENCIAS/WEB-02_error.png`)

## Criterio de aceptación
Mensaje exacto visible y sin acceso al inventario

## Postcondiciones
Sesión no iniciada.
