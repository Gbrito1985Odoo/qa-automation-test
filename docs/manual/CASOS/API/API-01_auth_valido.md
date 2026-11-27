# API-01 — Auth válido

## Metadatos
- **ID**: API-01
- **Área**: API / Autenticación
- **Prioridad**: Alta
- **Tipo**: Funcional / Positivo
- **Automatizado**: Sí (`api/tests/auth.spec.ts::API-01`)
- **Tags**: @smoke @critical

## Precondiciones
- Booker accesible

## Datos de prueba
| Campo | Valor |
|---|---|
| Usuario | `admin` |
| Contraseña | `password123` |

## Pasos
1. Enviar POST `/auth` con credenciales válidas

## Resultado esperado
- Status 200
- JSON con `token` no vacío y válido según `auth.schema.json`

## Evidencia requerida
- Request/response guardados (`EVIDENCIAS/API-01_auth.json`)

## Criterio de aceptación
Token presente y esquema validado

## Postcondiciones
Token usado en los tests de CRUD.
