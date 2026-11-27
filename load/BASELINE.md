# Baseline de carga — Restful Booker

- Plan: `load/plan.jmx`
- Perfil: 10 usuarios virtuales, ramp-up 10 s, 6 loops (≈60 s de carga, 120 muestras)
- Endpoints: `GET /booking` y `POST /auth` (60 muestras cada uno)
- Aserciones: código HTTP 200 y tiempo de respuesta < 1500 ms por sampler
- Entorno: JMeter 5.6.3, Windows, HTTPS contra `restful-booker.herokuapp.com`
- Umbral de regresión: p95 × 1.5 sobre el valor de esta baseline (≈1155 ms)

## Resultados de la corrida de referencia (2026-11-27)

| Métrica | Valor |
|---|---|
| Muestras | 120 (60 GET + 60 POST) |
| Duración | ~11 s de ejecución activa tras ramp-up |
| Errores | 0 |
| Error rate | 0.00 % |
| Códigos HTTP | 200 (120/120) |
| Media | 201.84 ms |
| p50 | 141 ms |
| p95 | 769.95 ms |
| p99 | 1356.54 ms |
| Máximo | 1467 ms |
| Throughput | 10.74 req/s |

Desglose:

| Transacción | Muestras | Errores | Media | p95 | Máximo |
|---|---:|---:|---:|---:|---:|
| GET /booking | 60 | 0 | 274.90 ms | 846.25 ms | 1467 ms |
| POST /auth | 60 | 0 | 128.78 ms | 151.95 ms | 164 ms |

Veredicto: PASS — error rate < 1 % y p95 < 1500 ms. Informe HTML generado en `load/report/index.html` (no versionado; artefacto local/CI).
