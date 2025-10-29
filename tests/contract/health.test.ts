/**
 * Contract Test: GET /api/health
 * 
 * This test verifies the API contract for the health check endpoint.
 * Tests MUST FAIL until the implementation is complete (TDD approach).
 */

import { NextRequest } from 'next/server';
import { GET } from '@/app/api/health/route';

describe('GET /api/health - Contract Tests', () => {
  it('should return 200 status', async () => {
    const request = new NextRequest('http://localhost:3000/api/health');
    
    const response = await GET(request);

    expect(response.status).toBe(200);
  });

  it('should include version number', async () => {
    const request = new NextRequest('http://localhost:3000/api/health');
    
    const response = await GET(request);
    const data = await response.json();

    expect(data).toHaveProperty('version');
    expect(typeof data.version).toBe('string');
    expect(data.version).toMatch(/^\d+\.\d+\.\d+$/); // Semantic versioning format
  });

  it('should include server uptime', async () => {
    const request = new NextRequest('http://localhost:3000/api/health');
    
    const response = await GET(request);
    const data = await response.json();

    expect(data).toHaveProperty('uptime');
    expect(typeof data.uptime).toBe('number');
    expect(data.uptime).toBeGreaterThanOrEqual(0);
  });

  it('should verify response structure matches contract', async () => {
    const request = new NextRequest('http://localhost:3000/api/health');
    
    const response = await GET(request);
    const data = await response.json();

    expect(data).toMatchObject({
      status: expect.any(String),
      version: expect.any(String),
      uptime: expect.any(Number),
      timestamp: expect.any(String),
    });

    // Status should be 'ok'
    expect(data.status).toBe('ok');

    // Timestamp should be valid ISO 8601 format
    expect(() => new Date(data.timestamp)).not.toThrow();
  });

  it('should include environment information', async () => {
    const request = new NextRequest('http://localhost:3000/api/health');
    
    const response = await GET(request);
    const data = await response.json();

    // Optional: Include Node.js version
    if (data.nodeVersion) {
      expect(typeof data.nodeVersion).toBe('string');
    }

    // Optional: Include environment (production, development)
    if (data.environment) {
      expect(['production', 'development', 'test']).toContain(data.environment);
    }
  });

  it('should respond quickly (health checks should be fast)', async () => {
    const request = new NextRequest('http://localhost:3000/api/health');
    
    const startTime = Date.now();
    await GET(request);
    const endTime = Date.now();

    const responseTime = endTime - startTime;
    
    // Health check should respond within 100ms
    expect(responseTime).toBeLessThan(100);
  });

  it('should not require authentication', async () => {
    // Health checks should be publicly accessible
    const request = new NextRequest('http://localhost:3000/api/health', {
      headers: {}, // No auth headers
    });
    
    const response = await GET(request);

    // Should still return 200 without auth
    expect(response.status).toBe(200);
  });

  it('should return valid JSON content-type', async () => {
    const request = new NextRequest('http://localhost:3000/api/health');
    
    const response = await GET(request);
    const contentType = response.headers.get('Content-Type');

    expect(contentType).toContain('application/json');
  });
});
