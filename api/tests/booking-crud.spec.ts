import Ajv from 'ajv';
import { expect, test } from '@playwright/test';
import bookingSchema from '../schemas/booking.schema.json';
import { BookerClient, validBooking, type Booking, type CreatedBooking } from '../clients/BookerClient';

test.describe('Booking CRUD API-03..08', () => {
  let token = '';
  let createdId = 0;

  test.beforeEach(async ({ request }) => {
    const client = new BookerClient(request);
    const auth = await client.auth('admin', 'password123');
    const authBody = (await auth.json()) as { token: string };
    token = authBody.token;
    const created = await client.create();
    expect(created.status()).toBe(200);
    const body = (await created.json()) as CreatedBooking;
    createdId = body.bookingid;
  });

  test.afterEach(async ({ request }) => {
    if (createdId > 0) {
      await new BookerClient(request).remove(createdId, token);
    }
  });

  test('API-03 listar reservas @smoke', async ({ request }) => {
    // Caso manual: docs/manual/CASOS/API/API-03_listar_reservas.md
    const response = await new BookerClient(request).list();
    expect(response.status()).toBe(200);
    const ids = (await response.json()) as Array<{ bookingid: number }>;
    expect(Array.isArray(ids)).toBe(true);
    expect(ids.length).toBeGreaterThan(0);
    expect(ids[0]?.bookingid).toEqual(expect.any(Number));
  });

  test('API-04 get reserva @smoke', async ({ request }) => {
    // Caso manual: docs/manual/CASOS/API/API-04_get_reserva.md
    const response = await new BookerClient(request).get(createdId);
    expect(response.status()).toBe(200);
    const body = (await response.json()) as Booking;
    expect(new Ajv().compile(bookingSchema)(body)).toBe(true);
  });

  test('API-05 crear reserva @smoke @critical', async ({ request }) => {
    // Caso manual: docs/manual/CASOS/API/API-05_crear_reserva.md
    const response = await new BookerClient(request).create(validBooking);
    expect(response.status()).toBe(200);
    const body = (await response.json()) as CreatedBooking;
    expect(body.bookingid).toEqual(expect.any(Number));
    expect(new Ajv().compile(bookingSchema)(body.booking)).toBe(true);
    await new BookerClient(request).remove(body.bookingid, token);
  });

  test('API-06 put reserva @regression', async ({ request }) => {
    // Caso manual: docs/manual/CASOS/API/API-06_put_reserva.md
    const client = new BookerClient(request);
    const updated: Booking = { ...validBooking, firstname: 'Updated', totalprice: 299 };
    expect((await client.update(createdId, token, updated)).status()).toBe(200);
    const after = (await (await client.get(createdId)).json()) as Booking;
    expect(after.firstname).toBe('Updated');
    expect(after.totalprice).toBe(299);
  });

  test('API-07 patch reserva @regression', async ({ request }) => {
    // Caso manual: docs/manual/CASOS/API/API-07_patch_reserva.md
    const client = new BookerClient(request);
    expect((await client.partialUpdate(createdId, token, { firstname: 'Patched' })).status()).toBe(200);
    const after = (await (await client.get(createdId)).json()) as Booking;
    expect(after.firstname).toBe('Patched');
    expect(after.lastname).toBe(validBooking.lastname);
  });

  test('API-08 delete reserva @regression', async ({ request }) => {
    // Caso manual: docs/manual/CASOS/API/API-08_delete_reserva.md
    const client = new BookerClient(request);
    const deletedId = createdId;
    expect((await client.remove(deletedId, token)).status()).toBe(201);
    createdId = 0;
    expect((await client.get(deletedId)).status()).toBe(404);
  });
});
