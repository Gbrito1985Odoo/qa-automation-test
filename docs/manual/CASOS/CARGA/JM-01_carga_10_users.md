# JM-01 — Carga 10 usuarios / 60 s

## Metadatos
- **ID**: JM-01
- **Área**: Carga
- **Prioridad**: Alta
- **Tipo**: Carga / Baseline
- **Automatizado**: Sí (`load/plan.jmx`)
- **Tags**: @load

## Precondiciones
- JMeter 5.6.3 instalado
- Booker accesible

## Datos de prueba
| Campo | Valor |
|---|---|
| Threads | 10 |
| Ramp-up | 10 s |
| Loops | 6 |

## Pasos
1. Ejecutar `npm run jmeter:load`
2. Abrir `load/report/index.html`
3. Comparar con `load/BASELINE.md`

## Resultado esperado
- Error rate < 1 %
- p95 < 1500 ms
- ASCII/HTML generado

## Evidencia requerida
- `load/report/index.html`
- `load/BASELINE.md`

## Criterio de aceptación
Umbrales cumplidos

## Postcondiciones
Borrar `load/results.jtl` y `load/report/`.
