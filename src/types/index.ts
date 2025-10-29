// Analytics event types based on data-model.md

import { z } from 'zod';

export enum EventType {
  PageView = 'page_view',
  EmailCapture = 'email_capture',
  WhitepaperDownload = 'whitepaper_download',
  PitchDownload = 'pitch_download',
  SocialShare = 'social_share',
  CTAClick = 'cta_click',
  PresaleSignup = 'presale_signup',
  ExternalLink = 'external_link',
}

export enum DeviceType {
  Desktop = 'desktop',
  Tablet = 'tablet',
  Mobile = 'mobile',
}

export interface EventMetadata {
  ctaText?: string;
  ctaPosition?: string;
  downloadFormat?: string;
  shareDestination?: string;
  externalUrl?: string;
  page?: string;
  interests?: string[];
  source?: string;
  [key: string]: unknown;
}

export interface AnalyticsEvent {
  sessionId: string;
  timestamp: Date;
  eventType: EventType;
  page: string;
  referrer?: string;
  deviceType: DeviceType;
  metadata?: EventMetadata;
}

// Email subscription types

export enum Interest {
  Investor = 'investor',
  Publisher = 'publisher',
  Verifier = 'verifier',
  Developer = 'developer',
  General = 'general',
}

export interface CommunicationPrefs {
  emailUpdates: boolean;
  presaleAlerts: boolean;
  weeklyNewsletter: boolean;
}

export interface SubscriptionMetadata {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  referralCode?: string;
  ipCountry?: string;
}

export interface EmailSubscription {
  email: string;
  source: string;
  timestamp: Date;
  interests: Interest[];
  walletAddress?: string;
  communicationPrefs: CommunicationPrefs;
  metadata?: SubscriptionMetadata;
}

// API response types

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface SubscriptionResponse {
  subscriberId: string;
  email: string;
  interests: Interest[];
}

// Presale types

export enum PresalePhase {
  Upcoming = 'upcoming',
  Live = 'live',
  Closed = 'closed',
}

export interface BonusTier {
  name: string;
  bonusPercentage: number;
  minPurchase: number;
  maxPurchase?: number;
  endsAt: Date;
}

export interface AnnouncementChannel {
  platform: 'twitter' | 'discord' | 'telegram' | 'email';
  url?: string;
  handle?: string;
}

export interface PresaleStatus {
  status: PresalePhase;
  launchDate?: Date;
  endDate?: Date;
  tokensAllocated: number;
  tokensSold: number;
  participantCount: number;
  currentPrice: number;
  bonusTier?: BonusTier;
  announcementChannels: AnnouncementChannel[];
}

// Team member types

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo: string;
  linkedin?: string;
  twitter?: string;
  github?: string;
  isFounder: boolean;
  isAdvisor: boolean;
  displayOrder: number;
}

// Navigation types

export interface NavigationLink {
  id: string;
  label: string;
  href: string;
  order: number;
  external: boolean;
  highlighted: boolean;
  icon?: string;
  mobileOnly?: boolean;
  desktopOnly?: boolean;
}

// Token economics types

export interface TokenAllocation {
  category: string;
  percentage: number;
  amount: number;
  description: string;
  color: string;
}

// Milestone types

export interface Milestone {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'planned' | 'delayed';
  targetDate: Date;
  completedDate?: Date;
  progress?: number;
  delayExplanation?: string;
  evidence?: Array<{
    type: 'github' | 'contract' | 'announcement';
    url: string;
    label: string;
  }>;
  category: 'development' | 'marketing' | 'partnerships';
}

// Job listing types

export interface JobListing {
  id: string;
  title: string;
  category: string;
  location: string;
  employmentType: 'full-time' | 'part-time' | 'contract';
  description: string;
  responsibilities: string[];
  qualifications: string[];
  compensation?: string;
  applyUrl: string;
  postedDate: Date;
}

// Pitch slide types

export interface PitchSlide {
  id: string;
  component: string;
  title: string;
  order: number;
  backgroundImage?: string;
  backgroundColor?: string;
  category: 'problem' | 'solution' | 'market' | 'product' | 'business' | 'token' | 'team' | 'investment';
}

// Social media types

export enum SocialPlatform {
  Twitter = 'twitter',
  Discord = 'discord',
  Telegram = 'telegram',
  GitHub = 'github',
  LinkedIn = 'linkedin',
  Reddit = 'reddit',
  Medium = 'medium',
}

export interface SocialLink {
  platform: SocialPlatform;
  url: string;
  icon: string;
  label: string;
  displayInHeader: boolean;
  displayInFooter: boolean;
}

// Zod Validation Schemas

export const emailSubscriptionSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address')
    .max(254, 'Email address is too long'),
  source: z
    .string()
    .regex(/^[a-z0-9-]+$/, 'Invalid source format')
    .max(50, 'Source identifier is too long'),
  interests: z
    .array(z.enum(['investor', 'publisher', 'verifier', 'developer', 'general']))
    .min(1, 'Please select at least one interest')
    .max(5, 'Please select at most 5 interests'),
  walletAddress: z
    .string()
    .regex(/^0x[a-fA-F0-9]{40}$/, 'Invalid Ethereum address format')
    .optional(),
  communicationPrefs: z
    .object({
      emailUpdates: z.boolean(),
      presaleAlerts: z.boolean(),
      weeklyNewsletter: z.boolean(),
    })
    .partial()
    .optional(),
  metadata: z
    .object({
      utmSource: z.string().optional(),
      utmMedium: z.string().optional(),
      utmCampaign: z.string().optional(),
      referralCode: z.string().optional(),
    })
    .optional(),
});

export const analyticsEventSchema = z.object({
  sessionId: z.string().uuid('Invalid session ID format'),
  eventType: z.enum([
    'page_view',
    'email_capture',
    'whitepaper_download',
    'pitch_download',
    'social_share',
    'cta_click',
    'presale_signup',
    'external_link',
  ]),
  page: z.string().startsWith('/', 'Page path must start with /'),
  metadata: z.record(z.unknown()).optional(),
});

export type EmailSubscriptionInput = z.infer<typeof emailSubscriptionSchema>;
export type AnalyticsEventInput = z.infer<typeof analyticsEventSchema>;

