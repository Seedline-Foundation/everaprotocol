/**
 * Contract Test: POST /api/subscribe
 * 
 * This test verifies the API contract for the email subscription endpoint.
 * Tests MUST FAIL until the implementation is complete (TDD approach).
 */

import { NextRequest } from 'next/server';
import { POST } from '@/app/api/subscribe/route';

// Mock Resend API
jest.mock('resend', () => ({
  Resend: jest.fn().mockImplementation(() => ({
    contacts: {
      create: jest.fn(),
      remove: jest.fn(),
    },
    emails: {
      send: jest.fn(),
    },
  })),
}));

// Also mock fetch for any remaining fetch calls
global.fetch = jest.fn();

describe('POST /api/subscribe - Contract Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Set up environment variables for tests
    process.env.RESEND_API_KEY = 'test_api_key';
    process.env.RESEND_AUDIENCE_ID = 'test_audience_id';
  });

  it('should accept valid email subscription with all fields', async () => {
    // Mock Resend API success response
    const mockResend = require('resend').Resend;
    const mockInstance = new mockResend();
    mockInstance.contacts.create.mockResolvedValueOnce({
      data: { id: 'contact_123' },
      error: null,
    });
    mockInstance.emails.send.mockResolvedValueOnce({
      data: { id: 'email_123' },
      error: null,
    });

    const request = new NextRequest('http://localhost:3000/api/subscribe', {
      method: 'POST',
      body: JSON.stringify({
        email: 'test@example.com',
        source: 'homepage-hero',
        interests: ['investor', 'publisher'],
        walletAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data).toHaveProperty('success', true);
    expect(data).toHaveProperty('subscriberId');
  });

  it('should return 400 for invalid email format', async () => {
    const request = new NextRequest('http://localhost:3000/api/subscribe', {
      method: 'POST',
      body: JSON.stringify({
        email: 'not-an-email',
        source: 'homepage-hero',
        interests: ['investor'],
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toHaveProperty('success', false);
    expect(data).toHaveProperty('error');
    expect(data.error).toContain('email');
  });

  it('should return 400 for missing required fields', async () => {
    const request = new NextRequest('http://localhost:3000/api/subscribe', {
      method: 'POST',
      body: JSON.stringify({
        email: 'test@example.com',
        // Missing source field
        interests: ['investor'],
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toHaveProperty('success', false);
    expect(data).toHaveProperty('error');
  });

  it('should return 409 for duplicate email', async () => {
    // Mock Resend API duplicate error
    const mockResend = require('resend').Resend;
    const mockInstance = new mockResend();
    mockInstance.contacts.create.mockResolvedValueOnce({
      data: null,
      error: { message: 'Contact already exists' },
    });

    const request = new NextRequest('http://localhost:3000/api/subscribe', {
      method: 'POST',
      body: JSON.stringify({
        email: 'existing@example.com',
        source: 'homepage-hero',
        interests: ['investor'],
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(409);
    expect(data).toHaveProperty('success', false);
    expect(data).toHaveProperty('error');
  });

  it('should return 429 for rate limiting', async () => {
    // Simulate multiple rapid requests from same IP
    const requests = Array(11).fill(null).map(() => 
      new NextRequest('http://localhost:3000/api/subscribe', {
        method: 'POST',
        headers: { 'x-forwarded-for': '192.168.1.1' },
        body: JSON.stringify({
          email: 'test@example.com',
          source: 'homepage-hero',
          interests: ['investor'],
        }),
      })
    );

    // Mock Resend success for first 10 requests
    const mockResend = require('resend').Resend;
    const mockInstance = new mockResend();
    mockInstance.contacts.create.mockResolvedValue({
      data: { id: 'contact_123' },
      error: null,
    });
    mockInstance.emails.send.mockResolvedValue({
      data: { id: 'email_123' },
      error: null,
    });

    // First 10 should succeed, 11th should be rate limited
    for (let i = 0; i < 10; i++) {
      const response = await POST(requests[i]);
      expect(response.status).not.toBe(429);
    }

    const rateLimitedResponse = await POST(requests[10]);
    const data = await rateLimitedResponse.json();

    expect(rateLimitedResponse.status).toBe(429);
    expect(data).toHaveProperty('success', false);
    expect(data).toHaveProperty('error');
    expect(data.error).toContain('rate limit');
  });

  it('should return 500 for server errors', async () => {
    // Mock Resend API server error
    const mockResend = require('resend').Resend;
    const mockInstance = new mockResend();
    mockInstance.contacts.create.mockRejectedValueOnce(
      new Error('Network error')
    );

    const request = new NextRequest('http://localhost:3000/api/subscribe', {
      method: 'POST',
      body: JSON.stringify({
        email: 'test@example.com',
        source: 'homepage-hero',
        interests: ['investor'],
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data).toHaveProperty('success', false);
    expect(data).toHaveProperty('error');
  });

  it('should verify response structure matches contract', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      status: 201,
      json: async () => ({ subscription: { id: 'sub_123' } }),
    });

    const request = new NextRequest('http://localhost:3000/api/subscribe', {
      method: 'POST',
      body: JSON.stringify({
        email: 'test@example.com',
        source: 'homepage-hero',
        interests: ['investor'],
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    // Success response contract
    expect(data).toMatchObject({
      success: expect.any(Boolean),
      subscriberId: expect.any(String),
    });

    // Error response contract (test with invalid email)
    const errorRequest = new NextRequest('http://localhost:3000/api/subscribe', {
      method: 'POST',
      body: JSON.stringify({
        email: 'invalid',
        source: 'test',
        interests: ['investor'],
      }),
    });

    const errorResponse = await POST(errorRequest);
    const errorData = await errorResponse.json();

    expect(errorData).toMatchObject({
      success: false,
      error: expect.any(String),
    });
  });
});
