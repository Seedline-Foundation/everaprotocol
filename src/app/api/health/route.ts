// T057 - Implement GET /api/health route
import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

// Server start time for uptime calculation
const serverStartTime = Date.now();

export async function GET() {
  try {
    // Read version from package.json
    let version = '1.0.0';
    try {
      const packageJsonPath = join(process.cwd(), 'package.json');
      const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
      version = packageJson.version || '1.0.0';
    } catch (error) {
      console.warn('[Health] Could not read package.json version');
    }

    // Calculate uptime
    const uptime = Date.now() - serverStartTime;
    const uptimeSeconds = Math.floor(uptime / 1000);
    const uptimeMinutes = Math.floor(uptimeSeconds / 60);
    const uptimeHours = Math.floor(uptimeMinutes / 60);
    const uptimeDays = Math.floor(uptimeHours / 24);

    return NextResponse.json(
      {
        status: 'healthy',
        version,
        uptime: {
          milliseconds: uptime,
          seconds: uptimeSeconds,
          minutes: uptimeMinutes,
          hours: uptimeHours,
          days: uptimeDays,
          formatted: `${uptimeDays}d ${uptimeHours % 24}h ${uptimeMinutes % 60}m ${uptimeSeconds % 60}s`,
        },
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      }
    );
  } catch (error) {
    console.error('[Health API Error]', error);
    
    return NextResponse.json(
      {
        status: 'unhealthy',
        error: 'Health check failed',
      },
      { status: 500 }
    );
  }
}
