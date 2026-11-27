import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';

const root = path.join('docs', 'manual');
const caseDirs = [
  path.join(root, 'CASOS', 'WEB'),
  path.join(root, 'CASOS', 'API'),
  path.join(root, 'CASOS', 'CARGA'),
  path.join(root, 'CASOS', 'SEGURIDAD'),
];
const requiredSections = [
  'Metadatos',
  'Precondiciones',
  'Pasos',
  'Resultado esperado',
  'Evidencia requerida',
  'Criterio de aceptación',
];
const automatedIds: string[] = [];
for (let index = 1; index <= 10; index += 1) {
  automatedIds.push(`WEB-${String(index).padStart(2, '0')}`);
}
for (let index = 1; index <= 11; index += 1) {
  automatedIds.push(`API-${String(index).padStart(2, '0')}`);
}

const errors: string[] = [];
const foundIds = new Set<string>();
let count = 0;

for (const dir of caseDirs) {
  if (!existsSync(dir)) {
    errors.push(`FALTA directorio ${dir}`);
    continue;
  }
  for (const file of readdirSync(dir).filter((name) => name.endsWith('.md'))) {
    const full = path.join(dir, file);
    const content = readFileSync(full, 'utf8');
    const fileId = file.split('_')[0] ?? '';
    const meta = content.match(/\*\*ID\*\*:\s*([^\s]+)/);
    const metaId = meta?.[1] ?? '';
    count += 1;
    if (fileId !== metaId) {
      errors.push(`${full}: ID del archivo (${fileId}) != metadato (${metaId})`);
    }
    foundIds.add(fileId);
    for (const section of requiredSections) {
      if (!content.includes(`## ${section}`)) {
        errors.push(`${full}: falta sección ${section}`);
      }
    }
  }
}

for (const id of automatedIds) {
  if (!foundIds.has(id)) {
    errors.push(`Caso automatizado ${id} sin caso manual`);
  }
}

if (errors.length > 0) {
  for (const error of errors) {
    process.stdout.write(`ERROR ${error}\n`);
  }
  process.exitCode = 1;
} else {
  const coreCount = count - (foundIds.has('SEC-03') ? 1 : 0);
  process.stdout.write(
    `OK: ${coreCount} casos manuales validados, 0 huérfanos (${count} archivos; SEC-03 es complementario)\n`,
  );
}
