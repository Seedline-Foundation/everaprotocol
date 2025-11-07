/**
 * Simple test to verify Resend integration works
 */

import { createSubscriber } from '@/lib/resend';
import { Interest } from '@/types';

// Mock Resend
jest.mock('resend', () => ({
  Resend: jest.fn().mockImplementation(() => ({
    contacts: {
      create: jest.fn(),
    },
    emails: {
      send: jest.fn(),
    },
  })),
}));

describe('Resend Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.RESEND_API_KEY = 'test_api_key';
    process.env.RESEND_AUDIENCE_ID = 'test_audience_id';
  });

  it('should create a subscriber successfully', async () => {
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

    const result = await createSubscriber(
      'test@example.com',
      [Interest.Investor],
      '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
      { firstName: 'John' }
    );

    expect(result).toEqual({
      subscriberId: 'contact_123',
      email: 'test@example.com',
      interests: [Interest.Investor],
    });
  });

  it('should handle duplicate email error', async () => {
    const mockResend = require('resend').Resend;
    const mockInstance = new mockResend();
    
    mockInstance.contacts.create.mockResolvedValueOnce({
      data: null,
      error: { message: 'Contact already exists' },
    });

    await expect(
      createSubscriber('existing@example.com', [Interest.Investor])
    ).rejects.toThrow('EMAIL_DUPLICATE');
  });
});