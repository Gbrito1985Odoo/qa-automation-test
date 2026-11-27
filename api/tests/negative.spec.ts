import { expect, test } from '@playwright/test';
import { BookerClient, type CreatedBooking } from '../clients/BookerClient';

test.describe('Negativos API-09..11', () => {
  test('API-09 put sin token @critical', async ({ request }) => {
    // Caso manual: docs/manual/CASOS/API/API-09_put_sin_token.md
    const client = new BookerClient(request);
    const created = await client.create();
    const id = ((await created.json()) as CreatedBooking).bookingid;
    const response = await client.update(id, '', {
      firstname: 'Hacker',
      lastname: 'NoToken',
      totalprice: 1,
      depositpaid: false,
      bookingdates: { checkin: '2026-01-01', checkout: '2026-01-02' },
      additionalneeds: '',
    });
    expect(response.status()).toBe(403);
    await client.remove(id, (await (await client.auth('admin', 'password123')).json() as { token: string }).token);
  });

  test('API-10 get inexistente @regression', async ({ request }) => {
    // Caso manual: docs/manual/CASOS/API/API-10_get_inexistente.md
    const response = await new BookerClient(request).get(999_999_999);
    expect(response.status()).toBe(404);
  });

  test('API-11 post inválido @critical', async ({ request }) => {
    // Caso manual: docs/manual/CASOS/API/API-11_post_invalido.md
    const response = await request.post('/booking', { data: { firstname: 123, totalprice: 'NaN' } });
    expect(response.status()).toBeGreaterThanOrEqual(400);
  });
});
