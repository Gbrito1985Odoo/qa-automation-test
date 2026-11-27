import { existsSync, readFileSync, writeFileSync } from 'node:fs';

interface AuditVulnerabilities {
  critical?: number;
  high?: number;
  moderate?: number;
  low?: number;
  total?: number;
}

interface AuditReport {
  metadata?: { vulnerabilities?: AuditVulnerabilities };
}

function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const file = 'reports/security/npm-audit.json';
if (!existsSync(file)) {
  process.stdout.write(`FALTA ${file}\n`);
  process.exit(1);
}
let audit: AuditReport | null = null;
try {
  audit = JSON.parse(readFileSync(file, 'utf8')) as AuditReport;
} catch {
  process.stdout.write(`ERROR ${file} no es JSON válido\n`);
  process.exit(1);
}
const counts = audit?.metadata?.vulnerabilities ?? {};
const critical = counts.critical ?? 0;
const high = counts.high ?? 0;
const moderate = counts.moderate ?? 0;
const low = counts.low ?? 0;
const total = counts.total ?? critical + high + moderate + low;
const ok = critical === 0 && high === 0;
const html = `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>SCA report — npm audit</title><style>
:root{color-scheme:light dark;--bg:#fff;--fg:#1f2328;--mut:#59636e;--bdr:#d1d9e0;--ok:#1a7f37;--bad:#cf222e;--card:#f6f8fa}
@media(prefers-color-scheme:dark){:root{--bg:#0d1117;--fg:#e6edf3;--mut:#9198a1;--bdr:#30363d;--ok:#3fb950;--bad:#f85149;--card:#161b22}}
body{margin:0;background:var(--bg);color:var(--fg);font:16px/1.55 system-ui,sans-serif}main{max-width:900px;margin:auto;padding:1rem}
table{border-collapse:collapse;width:100%}th,td{border:1px solid var(--bdr);padding:.6rem;text-align:left}th{background:var(--card)}
.ok{color:var(--ok);font-weight:600}.bad{color:var(--bad);font-weight:600}code{background:var(--card);padding:.1rem .3rem;border-radius:4px}
</style></head><body><main><h1>SCA — npm audit</h1>
<p>Reporte generado desde <code>npm audit --json</code>. Umbral: 0 vulnerabilidades HIGH/CRITICAL.</p>
<table><caption>Resultado</caption><thead><tr><th>Severidad</th><th>Cantidad</th></tr></thead><tbody>
<tr><td>Critical</td><td>${escapeHtml(critical)}</td></tr><tr><td>High</td><td>${escapeHtml(high)}</td></tr>
<tr><td>Moderate</td><td>${escapeHtml(moderate)}</td></tr><tr><td>Low</td><td>${escapeHtml(low)}</td></tr>
<tr><th>Total</th><th>${escapeHtml(total)}</th></tr></tbody></table>
<p>Estado: <span class="${ok ? 'ok' : 'bad'}">${ok ? 'PASS' : 'FAIL'}</span></p>
<p>Dependency-Check no se ejecuta por defecto: la descarga inicial de NVD sin <code>NVD_API_KEY</code> supera el tiempo de CI. La job queda disponible con la variable <code>ENABLE_DEPENDENCY_CHECK=true</code>.</p>
</main></body></html>`;
writeFileSync('reports/security/sca-report.html', html, 'utf8');
process.stdout.write(`OK reports/security/sca-report.html (${Buffer.byteLength(html)} bytes, ${critical} critical, ${high} high)\n`);
process.exitCode = ok ? 0 : 1;
