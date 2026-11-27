# Arquitectura de pruebas manuales

## 1. Capas

1. **CASOS** — qué probar: 24 casos alineados con los IDs automatizados.
2. **DATOS** — con qué probar: `users.json`, `bookings.json` y `envs.md`.
3. **PLANTILLAS** — cómo documentar: caso, bug report, evidencia y sesión exploratoria.
4. **EVIDENCIAS** — prueba de ejecución: capturas y respuestas con convención de nombres.
5. **RESULTADOS** — métricas: ejecución diaria y KPIs.

## 2. Flujo de ejecución

```
Leer caso → Preparar datos → Ejecutar pasos → Capturar evidencia →
Registrar resultado en RESULTADOS/ → Si falla: abrir bug con PLANTILLAS/bug_report.md
```

## 3. Trazabilidad

Cada caso manual declara en Metadatos el test automatizado equivalente (`ruta::ID`). La tabla completa está en [MATRIZ_MANUAL_AUTO.md](MATRIZ_MANUAL_AUTO.md). Los specs de Playwright incluyen el comentario `// Caso manual: docs/manual/CASOS/...` para la traza inversa. `npm run manual:lint` verifica que no haya casos huérfanos.

## 4. Roles (RACI)

| Actividad | QA manual | QA automation | Líder de QA |
|---|---|---|---|
| Diseñar casos | R/A | C | I |
| Ejecutar casos | R/A | I | I |
| Mantener specs | C | R/A | I |
| Registrar defectos | R/A | C | I |
| Priorizar y cerrar release | C | C | R/A |
| Métricas y mejoras | R | C | A |

R = responsable, A = aprobador, C = consultado, I = informado.

## 5. Herramientas compatibles

Los mismos archivos se pueden importar en TestRail, Xray o Zephyr. También funcionan en GitHub Projects con etiquetas `type:manual`, `status:passed`, `status:failed` y el ID en el título.

## 6. Criterio manual vs automatizado

- **Automatizar:** flujos repetitivos, estables y deterministas (login, CRUD, carrito, checkout, carga y comprobaciones de seguridad en API).
- **Manual:** exploración, revisión visual, usabilidad, casos de una sola vez y validación de evidencia antes de release.

La automatización aporta velocidad y regresión continua; la manual aporta criterio, contexto y cobertura de lo inesperado. Ambas comparten IDs para evitar duplicidad.
