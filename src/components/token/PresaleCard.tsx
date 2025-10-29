// T039 - Implement PresaleCard component
'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/shared/Card';
import { Button } from '@/components/shared/Button';
import { CountdownTimer } from '@/components/shared/CountdownTimer';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { PresaleStatus, PresalePhase } from '@/types';
import { trackCTAClick } from '@/lib/analytics';

interface PresaleCardProps {
  className?: string;
  showCountdown?: boolean;
  showProgress?: boolean;
  showBonusTier?: boolean;
}

export function PresaleCard({
  className = '',
  showCountdown = true,
  showProgress = true,
  showBonusTier = true,
}: PresaleCardProps): JSX.Element {
  const [presaleData, setPresaleData] = useState<PresaleStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch presale status
  useEffect(() => {
    const fetchPresaleStatus = async () => {
      try {
        const response = await fetch('/api/presale/status');
        if (!response.ok) {
          throw new Error('Failed to fetch presale status');
        }
        const data = await response.json();
        setPresaleData(data);
      } catch (err) {
        console.error('Error fetching presale status:', err);
        setError('Unable to load presale information');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPresaleStatus();
    // Refresh every 60 seconds
    const interval = setInterval(fetchPresaleStatus, 60_000);
    return () => clearInterval(interval);
  }, []);

  const handleJoinPresale = () => {
    trackCTAClick('Join Presale', 'presale-card');
    // In production, this would open presale registration modal or redirect
  };

  if (isLoading) {
    return (
      <Card padding="large" shadow="medium" className={className}>
        <div className="text-center py-12">
          <div className="inline-block w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin" />
          <p className="mt-4 text-charcoal/70">Loading presale information...</p>
        </div>
      </Card>
    );
  }

  if (error || !presaleData) {
    return (
      <Card padding="large" shadow="medium" className={className}>
        <div className="text-center py-12">
          <p className="text-coral mb-4">{error || 'Failed to load presale data'}</p>
          <Button
            variant="secondary"
            size="small"
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
        </div>
      </Card>
    );
  }

  const {
    status,
    launchDate,
    endDate,
    tokensAllocated,
    tokensSold,
    participantCount,
    currentPrice,
    bonusTier,
  } = presaleData;

  const progressPercentage = tokensAllocated > 0
    ? Math.round((tokensSold / tokensAllocated) * 100)
    : 0;

  const isUpcoming = status === PresalePhase.Upcoming;
  const isLive = status === PresalePhase.Live;
  const isClosed = status === PresalePhase.Closed;

  return (
    <AnimatedSection animation="slide-up">
      <Card
        padding="large"
        shadow="large"
        className={`relative overflow-hidden ${className}`}
      >
        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${
              isLive
                ? 'bg-gold/20 text-gold border border-gold/30'
                : isUpcoming
                ? 'bg-charcoal/10 text-charcoal border border-charcoal/20'
                : 'bg-coral/20 text-coral border border-coral/30'
            }`}
          >
            {isLive && '🔴 Live Now'}
            {isUpcoming && '⏰ Coming Soon'}
            {isClosed && '✓ Closed'}
          </span>
        </div>

        {/* Header */}
        <div className="mb-6">
          <h3 className="text-3xl font-bold text-charcoal mb-2">
            {isUpcoming && 'Presale Launching Soon'}
            {isLive && 'Presale Now Live'}
            {isClosed && 'Presale Completed'}
          </h3>
          <p className="text-charcoal/70">
            {isUpcoming && 'Be among the first to join the Evera Protocol presale'}
            {isLive && 'Join now to secure your EVERA tokens at presale price'}
            {isClosed && 'Thank you for your participation'}
          </p>
        </div>

        {/* Countdown Timer */}
        {showCountdown && isUpcoming && launchDate && (
          <div className="mb-6">
            <p className="text-sm font-semibold text-charcoal/70 mb-3 text-center">
              Presale starts in:
            </p>
            <CountdownTimer
              targetDate={launchDate}
              size="large"
              onComplete={() => window.location.reload()}
            />
          </div>
        )}

        {/* Live Presale Stats */}
        {isLive && (
          <>
            {/* Progress Bar */}
            {showProgress && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-charcoal/70">
                    Tokens Sold
                  </span>
                  <span className="text-sm font-bold text-gold">
                    {progressPercentage}%
                  </span>
                </div>
                <div className="w-full h-4 bg-stone rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-gold to-gold/80 transition-all duration-500 ease-out"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <div className="flex items-center justify-between mt-2 text-xs text-charcoal/60">
                  <span>{tokensSold.toLocaleString()} sold</span>
                  <span>{tokensAllocated.toLocaleString()} total</span>
                </div>
              </div>
            )}

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-stone/50 rounded-lg p-4">
                <p className="text-xs text-charcoal/60 mb-1">Current Price</p>
                <p className="text-2xl font-bold text-charcoal">
                  ${currentPrice.toFixed(3)}
                </p>
              </div>
              <div className="bg-stone/50 rounded-lg p-4">
                <p className="text-xs text-charcoal/60 mb-1">Participants</p>
                <p className="text-2xl font-bold text-charcoal">
                  {participantCount.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Bonus Tier */}
            {showBonusTier && bonusTier && (
              <div className="mb-6 p-4 bg-gold/10 border border-gold/30 rounded-lg">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="font-bold text-charcoal mb-1">
                      🎁 {bonusTier.name} Bonus
                    </p>
                    <p className="text-sm text-charcoal/70">
                      Get <span className="font-bold text-gold">+{bonusTier.bonusPercentage}%</span> bonus tokens
                    </p>
                    <p className="text-xs text-charcoal/60 mt-2">
                      Min: ${bonusTier.minPurchase}{bonusTier.maxPurchase ? ` • Max: $${bonusTier.maxPurchase.toLocaleString()}` : ''}
                    </p>
                  </div>
                  {bonusTier.endsAt && (
                    <div className="text-right">
                      <p className="text-xs text-charcoal/60 mb-1">Ends in:</p>
                      <CountdownTimer
                        targetDate={bonusTier.endsAt}
                        size="small"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}

        {/* Closed Presale Summary */}
        {isClosed && (
          <div className="mb-6 p-4 bg-stone/50 rounded-lg">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-charcoal/60 mb-1">Total Raised</p>
                <p className="text-xl font-bold text-charcoal">
                  ${(tokensSold * currentPrice).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-charcoal/60 mb-1">Participants</p>
                <p className="text-xl font-bold text-charcoal">
                  {participantCount.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* CTA Button */}
        <Button
          variant="primary"
          size="large"
          onClick={handleJoinPresale}
          disabled={isClosed}
          className="w-full text-lg py-4"
        >
          {isUpcoming && 'Get Notified'}
          {isLive && 'Join Presale Now'}
          {isClosed && 'Presale Closed'}
        </Button>

        {/* Additional Info */}
        <div className="mt-4 text-center text-xs text-charcoal/60">
          {isUpcoming && 'Subscribe to get notified when presale goes live'}
          {isLive && 'Secure your spot before bonus tier ends'}
          {isClosed && 'Watch for token distribution announcements'}
        </div>
      </Card>
    </AnimatedSection>
  );
}
