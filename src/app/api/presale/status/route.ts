// T056 - Implement GET /api/presale/status route
import { NextResponse } from 'next/server';
import { PresalePhase } from '@/types';

// This would come from src/content/presale.ts in a real implementation
const presaleConfig = {
  launchDate: new Date('2025-02-01T00:00:00Z'),
  endDate: new Date('2025-03-01T00:00:00Z'),
  tokensAllocated: 100000000,
  currentPrice: 0.05,
};

export async function GET() {
  try {
    const now = new Date();
    const { launchDate, endDate, tokensAllocated, currentPrice } = presaleConfig;

    // Calculate current presale phase
    let status: PresalePhase;
    if (now < launchDate) {
      status = PresalePhase.Upcoming;
    } else if (now >= launchDate && now <= endDate) {
      status = PresalePhase.Live;
    } else {
      status = PresalePhase.Closed;
    }

    // Calculate countdown timer values for upcoming presale
    let timeUntilLaunch;
    if (status === PresalePhase.Upcoming) {
      const diff = launchDate.getTime() - now.getTime();
      timeUntilLaunch = {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      };
    }

    // Calculate progress for live presale (mock data)
    const tokensSold = status === PresalePhase.Live ? Math.floor(tokensAllocated * 0.35) : 0;
    const progressPercentage = (tokensSold / tokensAllocated) * 100;

    const response = {
      status,
      launchDate: status === PresalePhase.Upcoming ? launchDate.toISOString() : undefined,
      endDate: status === PresalePhase.Live ? endDate.toISOString() : undefined,
      tokensAllocated,
      tokensSold,
      participantCount: status === PresalePhase.Live ? 1247 : 0,
      currentPrice,
      progressPercentage,
      timeUntilLaunch,
      bonusTier: status === PresalePhase.Live ? {
        name: 'Early Bird',
        bonusPercentage: 20,
        minPurchase: 1000,
        maxPurchase: 50000,
        endsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      } : undefined,
      announcementChannels: [
        { platform: 'twitter' as const, url: 'https://twitter.com/EveraProtocol' },
        { platform: 'discord' as const, url: 'https://discord.gg/evera' },
        { platform: 'telegram' as const, url: 'https://t.me/evera' },
      ],
    };

    return NextResponse.json(response, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
      },
    });
  } catch (error) {
    console.error('[Presale Status API Error]', error);
    
    return NextResponse.json(
      {
        error: 'Failed to fetch presale status',
      },
      { status: 500 }
    );
  }
}

// Configure ISR: revalidate every 60 seconds
export const revalidate = 60;
