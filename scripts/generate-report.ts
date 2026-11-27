import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';

interface JsonTest {
  status?: string;
  duration?: number;
  projectName?: string;
  error?: { message?: string };
}

interface JsonSpec {
  title?: string;
  file?: string;
  ok?: boolean;
  tags?: string[];
  tests?: JsonTest[];
}

interface JsonSuite {
  title?: string;
  specs?: JsonSpec[];
  suites?: JsonSuite[];
}

interface PlaywrightJson {
  stats?: { expected?: number; unexpected?: number; skipped?: number };
  suites?: JsonSuite[];
}

interface JmeterStat {
  transaction?: string;
  sampleCount?: number;
  errorPct?: number;
  meanResTime?: number;
  pct2ResTime?: number;
  maxResTime?: number;
}

function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function readJson<T>(file: string): T | null {
  if (!existsSync(file)) {
    return null;
  }
  try {
    return JSON.parse(readFileSync(file, 'utf8')) as T;
  } catch {
    return null;
  }
}

function walk(suites: JsonSuite[], project: string, rows: string[]): void {
  for (const suite of suites) {
    const nextProject = /^(chromium|firefox)$/.test(suite.title ?? '') ? suite.title ?? project : project;
    for (const spec of suite.specs ?? []) {
      for (const test of spec.tests ?? []) {
        const status = test.status ?? 'unknown';
        const error = (test.error?.message ?? '').split('\n')[0]?.slice(0, 500) ?? '';
        const result = status === 'expected' ? 'PASS' : status === 'skipped' ? 'SKIP' : 'FAIL';
        rows.push(
          `<tr><td>${escapeHtml(spec.title)}</td><td>${escapeHtml(nextProject)}</td>` +
            `<td>${escapeHtml((spec.tags ?? []).join(' '))}</td><td>${result}</td>` +
            `<td>${escapeHtml(test.duration ?? 0)} ms</td>` +
            `<td>${error ? `<details><summary>Ver error</summary><pre>${escapeHtml(error)}</pre></details>` : '—'}</td></tr>`,
        );
      }
    }
    walk(suite.suites ?? [], nextProject, rows);
  }
}

function section(id: string, title: string, body: string): string {
  return `<section id="${id}"><h2>${escapeHtml(title)}</h2>${body}</section>`;
}

function cards(items: Array<[string, string]>): string {
  return `<div class="cards">${items
    .map(([label, value]) => `<div class="card"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`)
    .join('')}</div>`;
}

function table(caption: string, headers: string[], rows: string[]): string {
  return `<table><caption>${escapeHtml(caption)}</caption><thead><tr>${headers
    .map((header) => `<th scope="col">${escapeHtml(header)}</th>`)
    .join('')}</tr></thead><tbody>${rows.join('')}</tbody></table>`;
}

const e2e = readJson<PlaywrightJson>('reports/e2e-results.json');
const api = readJson<PlaywrightJson>('reports/api-results.json');
const jmeterStats = readJson<Record<string, JmeterStat>>('load/report/statistics.json');
const jmeter = jmeterStats ? Object.values(jmeterStats) : null;
const e2eRows: string[] = [];
const apiRows: string[] = [];
if (e2e) {
  walk(e2e.suites ?? [], '', e2eRows);
}
if (api) {
  walk(api.suites ?? [], 'API', apiRows);
}
const totalStat = jmeter?.find((item) => item.transaction === 'Total');
const passRate = (data: PlaywrightJson | null): string => {
  if (!data?.stats) {
    return 'NO EJECUTADO';
  }
  const stats = data.stats;
  const total = (stats.expected ?? 0) + (stats.unexpected ?? 0) + (stats.skipped ?? 0);
  return total > 0 ? `${Math.round(((stats.expected ?? 0) / total) * 100)} %` : 'NO EJECUTADO';
};

const jmeterRows = (jmeter ?? []).map((item) =>
  `<tr><td>${escapeHtml(item.transaction)}</td><td>${escapeHtml(item.sampleCount ?? 0)}</td>` +
    `<td>${escapeHtml(item.errorPct ?? 0)} %</td><td>${escapeHtml(item.meanResTime ?? 0)} ms</td>` +
    `<td>${escapeHtml(item.pct2ResTime ?? 0)} ms</td><td>${escapeHtml(item.maxResTime ?? 0)} ms</td></tr>`,
);

const criteria: Array<[string, boolean]> = [
  ['E2E Chromium y Firefox', e2eRows.length > 0 && (e2e?.stats?.unexpected ?? 1) === 0],
  ['API 11 casos automatizados', (api?.stats?.expected ?? 0) >= 11],
  ['JMeter error rate < 1 %', (totalStat?.errorPct ?? 100) < 1],
  ['JMeter p95 < 1500 ms', (totalStat?.pct2ResTime ?? 99999) < 1500],
  ['Securidad con reportes HTML', existsSync('reports/security/zap-report.html') && existsSync('reports/security/dependency-check-report.html')],
  ['Evolución registrada', existsSync('reports/evolucion.log')],
];

const html = `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Informe final QA Automation</title>
<style>
:root{color-scheme:light dark;--bg:#fff;--fg:#1f2328;--mut:#59636e;--bdr:#d1d9e0;--acc:#0969da;--ok:#1a7f37;--bad:#cf222e;--card:#f6f8fa}
@media(prefers-color-scheme:dark){:root{--bg:#0d1117;--fg:#e6edf3;--mut:#9198a1;--bdr:#30363d;--acc:#4493f8;--ok:#3fb950;--bad:#f85149;--card:#161b22}}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--fg);font:16px/1.55 system-ui,-apple-system,Segoe UI,sans-serif}
header,nav,main{max-width:1100px;margin:auto;padding:1rem}nav{border-bottom:1px solid var(--bdr);display:flex;flex-wrap:wrap;gap:.8rem}
a{color:var(--acc)}h1{font-size:2rem}h2{margin-top:2.5rem;border-bottom:1px solid var(--bdr);padding-bottom:.3rem}
.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:.8rem}.card{background:var(--card);border:1px solid var(--bdr);border-radius:8px;padding:1rem}
.card span{display:block;color:var(--mut);font-size:.85rem}.card strong{font-size:1.4rem}
table{border-collapse:collapse;width:100%;display:block;overflow-x:auto}caption{text-align:left;font-weight:600;padding:.5rem 0}
th,td{border:1px solid var(--bdr);padding:.5rem;text-align:left;vertical-align:top}th{background:var(--card)}pre{white-space:pre-wrap;word-break:break-word}
.ok{color:var(--ok);font-weight:600}.bad{color:var(--bad);font-weight:600}footer{border-top:1px solid var(--bdr);margin-top:3rem;padding:1rem;color:var(--mut)}
</style></head><body>
<header><h1>Informe final — QA Automation</h1><p>Repo público: <a href="https://github.com/Gbrito1985Odoo/qa-automation-test">Gbrito1985Odoo/qa-automation-test</a> · Generado automáticamente desde artefactos reales.</p></header>
<nav aria-label="Navegación del informe"><a href="#resumen">Resumen</a><a href="#e2e">E2E</a><a href="#api">API</a><a href="#carga">Carga</a><a href="#seguridad">Seguridad</a><a href="#detalle">Detalle</a><a href="#criterios">Criterios</a></nav>
<main>
${section('resumen', 'Resumen ejecutivo', cards([
  ['E2E pass rate', passRate(e2e)],
  ['API pass rate', passRate(api)],
  ['JMeter error rate', totalStat ? `${escapeHtml(totalStat.errorPct)} %` : 'NO EJECUTADO'],
  ['JMeter p95', totalStat ? `${escapeHtml(totalStat.pct2ResTime)} ms` : 'NO EJECUTADO'],
  ['Estado global', criteria.every(([, ok]) => ok) ? 'PASS' : 'REVISAR'],
]))}
${section('e2e', 'Resultados E2E por navegador', e2eRows.length > 0 ? table('Casos E2E ejecutados', ['Test', 'Navegador', 'Tags', 'Estado', 'Duración', 'Error'], e2eRows) : '<p>NO EJECUTADO: no existe reports/e2e-results.json.</p>')}
${section('api', 'Resultados API', apiRows.length > 0 ? table('Casos API ejecutados', ['Test', 'Grupo', 'Tags', 'Estado', 'Duración', 'Error'], apiRows) : '<p>NO EJECUTADO: no existe reports/api-results.json.</p>')}
${section('carga', 'JMeter', jmeterRows.length > 0 ? table('Estadísticas de carga', ['Transacción', 'Muestras', 'Errores', 'Media', 'p95', 'Máximo'], jmeterRows) : '<p>NO EJECUTADO: no existe load/report/statistics.json.</p>')}
${section('seguridad', 'Seguridad OWASP', table('Reportes generados por CI', ['Herramienta', 'Estado', 'Enlace'], [
  `<tr><td>ZAP Baseline</td><td>${existsSync('reports/security/zap-report.html') ? 'OK' : 'NO EJECUTADO'}</td><td><a href="reports/security/zap-report.html">Ver</a></td></tr>`,
  `<tr><td>Dependency-Check</td><td>${existsSync('reports/security/dependency-check-report.html') ? 'OK' : 'NO EJECUTADO'}</td><td><a href="reports/security/dependency-check-report.html">Ver</a></td></tr>`,
]))}
${section('detalle', 'Detalle y evidencias', `<ul><li><a href="playwright-report/e2e/index.html">Reporte Playwright E2E</a></li><li><a href="playwright-report/api/index.html">Reporte Playwright API</a></li><li><a href="load/report/index.html">Reporte JMeter HTML</a></li><li><a href="load/BASELINE.md">Baseline</a></li><li><a href="reports/evolucion.log">Evolución verificada</a></li></ul>`)}
${section('criterios', 'Criterios de aceptación', table('Evaluación automática', ['Criterio', 'Estado'], criteria.map(([label, ok]) => `<tr><td>${escapeHtml(label)}</td><td class="${ok ? 'ok' : 'bad'}">${ok ? '✅ PASS' : '❌ FAIL'}</td></tr>`)))}
</main><footer>Informe generado por scripts/generate-report.ts · texto dinámico escapado · sin dependencias externas.</footer></body></html>`;

mkdirSync('reports', { recursive: true });
writeFileSync('reports/informe-final.html', html, 'utf8');
process.stdout.write(`OK reports/informe-final.html (${Buffer.byteLength(html)} bytes)\n`);
