/**
 * Contract Test: GET /api/presale/status
 * 
 * This test verifies the API contract for the presale status endpoint.
 * Tests MUST FAIL until the implementation is complete (TDD approach).
 */

import { NextRequest } from 'next/server';
import { GET } from '@/app/api/presale/status/route';
import { PresalePhase } from '@/types';

describe('GET /api/presale/status - Contract Tests', () => {
  it('should return valid PresaleStatus object', async () => {
    const request = new NextRequest('http://localhost:3000/api/presale/status');
    
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toHaveProperty('phase');
    expect(data).toHaveProperty('totalTokens');
    expect(data).toHaveProperty('tokensAllocated');
    expect(data).toHaveProperty('tokensSold');
    expect(data).toHaveProperty('pricePerToken');
    expect(data).toHaveProperty('minPurchase');
    expect(data).toHaveProperty('maxPurchase');
  });

  it('should handle upcoming presale phase', async () => {
    const request = new NextRequest('http://localhost:3000/api/presale/status');
    
    const response = await GET(request);
    const data = await response.json();

    if (data.phase === 'upcoming') {
      expect(data).toHaveProperty('launchDate');
      expect(data).toHaveProperty('countdown');
      expect(data.countdown).toHaveProperty('days');
      expect(data.countdown).toHaveProperty('hours');
      expect(data.countdown).toHaveProperty('minutes');
      expect(data.countdown).toHaveProperty('seconds');
    }
  });

  it('should handle live presale phase', async () => {
    const request = new NextRequest('http://localhost:3000/api/presale/status');
    
    const response = await GET(request);
    const data = await response.json();

    if (data.phase === 'live') {
      expect(data).toHaveProperty('progress');
      expect(data.progress).toBeGreaterThanOrEqual(0);
      expect(data.progress).toBeLessThanOrEqual(100);
      expect(data).toHaveProperty('bonusTier');
    }
  });

  it('should handle closed presale phase', async () => {
    const request = new NextRequest('http://localhost:3000/api/presale/status');
    
    const response = await GET(request);
    const data = await response.json();

    if (data.phase === 'closed') {
      expect(data).toHaveProperty('endDate');
      expect(data).toHaveProperty('finalAmountRaised');
    }
  });

  it('should test each PresalePhase enum value', async () => {
    const phases: PresalePhase[] = [
      PresalePhase.Upcoming,
      PresalePhase.Live,
      PresalePhase.Closed,
    ];
    
    const request = new NextRequest('http://localhost:3000/api/presale/status');
    const response = await GET(request);
    const data = await response.json();

    // Current phase should be one of the valid enum values
    expect(phases).toContain(data.phase);
  });

  it('should calculate countdown timer for upcoming presale', async () => {
    const request = new NextRequest('http://localhost:3000/api/presale/status');
    
    const response = await GET(request);
    const data = await response.json();

    if (data.phase === 'upcoming' && data.countdown) {
      expect(typeof data.countdown.days).toBe('number');
      expect(typeof data.countdown.hours).toBe('number');
      expect(typeof data.countdown.minutes).toBe('number');
      expect(typeof data.countdown.seconds).toBe('number');
      
      expect(data.countdown.days).toBeGreaterThanOrEqual(0);
      expect(data.countdown.hours).toBeGreaterThanOrEqual(0);
      expect(data.countdown.hours).toBeLessThan(24);
      expect(data.countdown.minutes).toBeGreaterThanOrEqual(0);
      expect(data.countdown.minutes).toBeLessThan(60);
      expect(data.countdown.seconds).toBeGreaterThanOrEqual(0);
      expect(data.countdown.seconds).toBeLessThan(60);
    }
  });

  it('should calculate progress for live presale', async () => {
    const request = new NextRequest('http://localhost:3000/api/presale/status');
    
    const response = await GET(request);
    const data = await response.json();

    if (data.phase === 'live') {
      expect(data.progress).toBeDefined();
      
      // Progress should be calculated as (tokensSold / tokensAllocated) * 100
      const expectedProgress = (data.tokensSold / data.tokensAllocated) * 100;
      expect(data.progress).toBeCloseTo(expectedProgress, 2);
    }
  });

  it('should verify response structure matches contract', async () => {
    const request = new NextRequest('http://localhost:3000/api/presale/status');
    
    const response = await GET(request);
    const data = await response.json();

    // Core fields that should always be present
    expect(data).toMatchObject({
      phase: expect.any(String),
      totalTokens: expect.any(Number),
      tokensAllocated: expect.any(Number),
      tokensSold: expect.any(Number),
      pricePerToken: expect.any(Number),
      minPurchase: expect.any(Number),
      maxPurchase: expect.any(Number),
      allocation: expect.any(Array),
    });

    // Allocation structure
    expect(data.allocation[0]).toMatchObject({
      category: expect.any(String),
      percentage: expect.any(Number),
      tokens: expect.any(Number),
    });
  });

  it('should include caching headers for ISR (revalidate every 60 seconds)', async () => {
    const request = new NextRequest('http://localhost:3000/api/presale/status');
    
    const response = await GET(request);
    const cacheControl = response.headers.get('Cache-Control');

    // ISR should set appropriate cache headers
    expect(cacheControl).toBeDefined();
    expect(cacheControl).toContain('max-age');
    
    // Should revalidate every 60 seconds or less
    const maxAgeMatch = cacheControl?.match(/max-age=(\d+)/);
    if (maxAgeMatch) {
      const maxAge = parseInt(maxAgeMatch[1]);
      expect(maxAge).toBeLessThanOrEqual(60);
    }
  });
});
