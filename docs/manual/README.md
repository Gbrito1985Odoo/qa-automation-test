# QA manual — índice y guía de uso

Esta carpeta contiene una suite manual reproducible por cualquier QA **sin leer el código**. Cada caso indica precondición, datos, pasos, resultado esperado, evidencia requerida y criterio de aceptación. Hay 24 casos núcleo más SEC-03 (checklist complementario de OWASP API): 25 archivos validados.

## Índice

- [ARQUITECTURA.md](ARQUITECTURA.md) — capas, flujo, trazabilidad y roles.
- [PLAN_MANUAL.md](PLAN_MANUAL.md) — alcance, entornos, estrategia, defectos y KPIs.
- [MATRIZ_MANUAL_AUTO.md](MATRIZ_MANUAL_AUTO.md) — correspondencia con la automatización.
- [CASOS/WEB/](CASOS/WEB/) — 10 casos web.
- [CASOS/API/](CASOS/API/) — 11 casos API.
- [CASOS/CARGA/](CASOS/CARGA/) — 1 caso de carga.
- [CASOS/SEGURIDAD/](CASOS/SEGURIDAD/) — 3 casos de seguridad.
- [PLANTILLAS/](PLANTILLAS/) — caso, bug, evidencia y sesión exploratoria.
- [DATOS/](DATOS/) — usuarios, payloads y entornos.
- [EVIDENCIAS/README.md](EVIDENCIAS/README.md) — convención de nombres y almacenamiento.
- [RESULTADOS/](RESULTADOS/) — ejecución y métricas.

## Cómo ejecutar un caso

1. Leer el caso y verificar precondiciones.
2. Preparar los datos desde `DATOS/` (sin copiar secretos al repo).
3. Ejecutar los pasos exactamente en el orden indicado.
4. Capturar la evidencia requerida con la convención de `EVIDENCIAS/README.md`.
5. Registrar PASS/FAIL en `RESULTADOS/ejecucion_YYYY-MM-DD.md`.
6. Si falla, abrir un bug con `PLANTILLAS/bug_report.md` y enlazar la evidencia.

## Convención de nombres

`ID_titulo_corto.md`, por ejemplo `WEB-01_login_correcto.md`. El `ID` del nombre debe coincidir con el metadato `ID` del caso; `npm run manual:lint` lo comprueba.

## Plantillas y evidencias

Usar siempre `PLANTILLAS/caso_prueba.md` para casos nuevos. Las capturas no se versionan: se enlazan desde `EVIDENCIAS/README.md` o se adjuntan a un Issue/Project.
