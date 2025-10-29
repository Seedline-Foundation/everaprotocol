import { PresaleStatus, PresalePhase } from '@/types';

export const presaleConfig: PresaleStatus = {
  status: PresalePhase.Upcoming,
  launchDate: new Date('2025-12-01T00:00:00Z'),
  endDate: new Date('2026-01-15T23:59:59Z'),
  tokensAllocated: 20_000_000,
  tokensSold: 0,
  participantCount: 0,
  currentPrice: 0.05,
  bonusTier: {
    name: 'Early Bird',
    bonusPercentage: 20,
    minPurchase: 500,
    maxPurchase: 10_000,
    endsAt: new Date('2025-12-07T23:59:59Z'),
  },
  announcementChannels: [
    {
      platform: 'twitter',
      handle: '@EveraProtocol',
      url: 'https://twitter.com/EveraProtocol',
    },
    {
      platform: 'discord',
      url: 'https://discord.gg/evera',
    },
    {
      platform: 'telegram',
      url: 'https://t.me/evera',
    },
    {
      platform: 'email',
    },
  ],
};

export const tokenAllocation = [
  {
    category: 'Community & Ecosystem',
    percentage: 35,
    amount: 350_000_000,
    description: 'Rewards for verifiers, validators, and community incentives',
    color: '#E4B363',
  },
  {
    category: 'Presale & Public Sale',
    percentage: 25,
    amount: 250_000_000,
    description: 'Token distribution for early supporters and public sale',
    color: '#313638',
  },
  {
    category: 'Team & Advisors',
    percentage: 15,
    amount: 150_000_000,
    description: 'Team allocation with 4-year vesting and 1-year cliff',
    color: '#E0DFD5',
  },
  {
    category: 'Treasury & Development',
    percentage: 15,
    amount: 150_000_000,
    description: 'Protocol development, partnerships, and operational costs',
    color: '#EF6461',
  },
  {
    category: 'Liquidity & Market Making',
    percentage: 10,
    amount: 100_000_000,
    description: 'DEX liquidity pools and exchange listings',
    color: '#A8DADC',
  },
];
