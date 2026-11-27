import { existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import path from 'node:path';

const targets: string[] = [
  'playwright-report',
  'test-results',
  'load/report',
  'load/results.jtl',
  'reports/e2e-results.json',
  'reports/api-results.json',
];

for (const target of targets) {
  if (existsSync(target)) {
    rmSync(target, { recursive: true, force: true });
    process.stdout.write(`cleanup: ${target}\n`);
  }
}

const keep = new Set(['informe-final.html', 'evolucion.log']);
mkdirSync('reports', { recursive: true });
for (const file of readdirSync('reports')) {
  if (!keep.has(file) && path.extname(file) === '.json') {
    rmSync(path.join('reports', file), { force: true });
    process.stdout.write(`cleanup: reports/${file}\n`);
  }
}
