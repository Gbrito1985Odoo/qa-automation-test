import type { APIRequestContext, APIResponse } from '@playwright/test';

export interface BookingDates {
  checkin: string;
  checkout: string;
}

export interface Booking {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: BookingDates;
  additionalneeds: string;
}

export interface CreatedBooking {
  bookingid: number;
  booking: Booking;
}

export const validBooking: Booking = {
  firstname: 'QA',
  lastname: 'Automation',
  totalprice: 150,
  depositpaid: true,
  bookingdates: { checkin: '2026-01-01', checkout: '2026-01-05' },
  additionalneeds: 'Breakfast',
};

export class BookerClient {
  constructor(private readonly request: APIRequestContext) {}

  async ping(): Promise<APIResponse> {
    return this.request.get('/ping');
  }

  async auth(username: string, password: string): Promise<APIResponse> {
    return this.request.post('/auth', { data: { username, password } });
  }

  async list(): Promise<APIResponse> {
    return this.request.get('/booking');
  }

  async get(id: number): Promise<APIResponse> {
    return this.request.get(`/booking/${id}`);
  }

  async create(booking: Booking = validBooking): Promise<APIResponse> {
    return this.request.post('/booking', { data: booking });
  }

  async update(id: number, token: string, booking: Booking): Promise<APIResponse> {
    return this.request.put(`/booking/${id}`, {
      data: booking,
      headers: { 'Content-Type': 'application/json', Cookie: `token=${token}` },
    });
  }

  async partialUpdate(id: number, token: string, patch: Partial<Booking>): Promise<APIResponse> {
    return this.request.patch(`/booking/${id}`, {
      data: patch,
      headers: { 'Content-Type': 'application/json', Cookie: `token=${token}` },
    });
  }

  async remove(id: number, token?: string): Promise<APIResponse> {
    return this.request.delete(`/booking/${id}`, {
      headers: token ? { Cookie: `token=${token}` } : {},
    });
  }
}
