// T055 - Implement POST /api/analytics/track route
import { NextResponse } from 'next/server';
import { analyticsEventSchema } from '@/lib/validation';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = analyticsEventSchema.safeParse(body);

    if (!validation.success) {
      const firstError = validation.error.errors[0];
      return NextResponse.json(
        {
          success: false,
          error: firstError.message,
        },
        { status: 400 }
      );
    }

    const event = validation.data;

    // Validate timestamp is not in the future (already done in schema)
    
    // Log event for debugging
    console.log('[Analytics Event]', {
      type: event.eventType,
      page: event.page,
      sessionId: event.sessionId,
      metadata: event.metadata,
    });

    // In production, send to Plausible Analytics API
    if (process.env.PLAUSIBLE_API_KEY && process.env.NEXT_PUBLIC_SITE_URL) {
      try {
        await fetch('https://plausible.io/api/event', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.PLAUSIBLE_API_KEY}`,
          },
          body: JSON.stringify({
            name: event.eventType,
            url: `${process.env.NEXT_PUBLIC_SITE_URL}${event.page}`,
            domain: process.env.PLAUSIBLE_DOMAIN || new URL(process.env.NEXT_PUBLIC_SITE_URL).hostname,
            props: event.metadata || {},
          }),
        });
      } catch (plausibleError) {
        // Log but don't fail the request
        console.error('[Plausible API Error]', plausibleError);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Event tracked successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[Analytics Track API Error]', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to track event',
      },
      { status: 500 }
    );
  }
}
