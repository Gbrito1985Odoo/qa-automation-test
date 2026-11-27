import { existsSync, statSync } from 'node:fs';

const required: string[] = [
  'reports/security/zap-report.html',
  'reports/security/dependency-check-report.html',
];

let ok = true;
for (const file of required) {
  const present = existsSync(file) && statSync(file).size > 0;
  process.stdout.write(`${present ? 'OK' : 'FALTA'} ${file}\n`);
  ok = ok && present;
}
process.exitCode = ok ? 0 : 1;
