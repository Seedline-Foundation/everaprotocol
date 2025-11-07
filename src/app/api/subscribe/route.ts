// T054 - Implement POST /api/subscribe route
import { NextResponse } from 'next/server';
import { emailSubscriptionSchema } from '@/lib/validation';
import { createSubscriber } from '@/lib/resend';
import { Interest } from '@/types';

// In-memory rate limiting (in production, use Redis or Upstash)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 10;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const requests = rateLimitMap.get(ip) || [];
  
  // Remove old requests outside the window
  const validRequests = requests.filter((time) => now - time < RATE_LIMIT_WINDOW);
  
  if (validRequests.length >= MAX_REQUESTS) {
    return false;
  }
  
  validRequests.push(now);
  rateLimitMap.set(ip, validRequests);
  return true;
}

export async function POST(request: Request) {
  try {
    // Get IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    
    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Too many subscription attempts. Please try again in 60 minutes.',
        },
        { status: 429 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validation = emailSubscriptionSchema.safeParse(body);

    if (!validation.success) {
      const firstError = validation.error.errors[0];
      return NextResponse.json(
        {
          success: false,
          error: firstError.message,
          field: firstError.path.join('.'),
        },
        { status: 400 }
      );
    }

    const data = validation.data;

    // Validate email format (RFC 5322 compliant check is in schema)
    // Validate wallet address if provided (regex check is in schema)

    try {
      // Call ConvertKit API to create subscriber
      const result = await createSubscriber(
        data.email,
        data.interests as Interest[],
        data.walletAddress,
        {
          source: data.source,
          ...(data.metadata || {}),
        }
      );

      // Success response
      return NextResponse.json(
        {
          success: true,
          data: {
            subscriberId: result.subscriberId,
            email: result.email,
            interests: result.interests,
          },
          message: 'Successfully subscribed! Please check your email to confirm.',
        },
        { status: 201 }
      );
    } catch (error) {
      // Handle specific errors
      if (error instanceof Error) {
        if (error.message === 'EMAIL_DUPLICATE') {
          return NextResponse.json(
            {
              success: false,
              error: 'This email is already subscribed to our mailing list',
            },
            { status: 409 }
          );
        }

        // Log error for debugging
        console.error('[Subscribe API Error]', {
          email: data.email,
          error: error.message,
        });

        return NextResponse.json(
          {
            success: false,
            error: 'Failed to process subscription. Please try again later.',
          },
          { status: 500 }
        );
      }

      throw error;
    }
  } catch (error) {
    console.error('[Subscribe API Fatal Error]', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error. Please try again later.',
      },
      { status: 500 }
    );
  }
}
