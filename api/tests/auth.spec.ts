import Ajv from 'ajv';
import { expect, test } from '@playwright/test';
import authSchema from '../schemas/auth.schema.json';
import { BookerClient } from '../clients/BookerClient';

test.describe('Auth API-01..02', () => {
  test('API-01 auth válido @smoke @critical', async ({ request }) => {
    // Caso manual: docs/manual/CASOS/API/API-01_auth_valido.md
    const client = new BookerClient(request);
    const response = await client.auth('admin', 'password123');
    expect(response.status()).toBe(200);
    const body = (await response.json()) as { token?: string };
    const validate = new Ajv().compile(authSchema);
    expect(validate(body)).toBe(true);
  });

  test('API-02 auth inválido @critical', async ({ request }) => {
    // Caso manual: docs/manual/CASOS/API/API-02_auth_invalido.md
    const client = new BookerClient(request);
    const response = await client.auth('wrong_user', 'wrong_pass');
    expect(response.status()).toBe(200);
    const body = (await response.json()) as { reason?: string };
    expect(body.reason).toBe('Bad credentials');
  });
});
