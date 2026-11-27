# API-02 — Auth inválido

## Metadatos
- **ID**: API-02
- **Área**: API / Autenticación
- **Prioridad**: Alta
- **Tipo**: Funcional / Negativo
- **Automatizado**: Sí (`api/tests/auth.spec.ts::API-02`)
- **Tags**: @critical

## Precondiciones
- Booker accesible

## Datos de prueba
| Campo | Valor |
|---|---|
| Usuario | `wrong_user` |
| Contraseña | `wrong_pass` |

## Pasos
1. Enviar POST `/auth` con credenciales inválidas

## Resultado esperado
- Status 200 con `{"reason":"Bad credentials"}` (comportamiento actual del API)

## Evidencia requerida
- Response guardada (`EVIDENCIAS/API-02_bad.json`)

## Criterio de aceptación
Sin token y motivo "Bad credentials"

## Postcondiciones
Sin token emitido.
