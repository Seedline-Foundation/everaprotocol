// Validation utilities with Zod schemas
// T068 - Create validation utilities

import { z } from 'zod';
import { EventType, Interest, PresalePhase, DeviceType } from '@/types';

// Email validation schema
export const emailSchema = z.string().email('Please enter a valid email address');

// Ethereum wallet address validation (0x followed by 40 hex characters)
export const walletAddressSchema = z
  .string()
  .regex(/^0x[a-fA-F0-9]{40}$/, 'Please enter a valid Ethereum wallet address')
  .optional();

// Email subscription schema
export const emailSubscriptionSchema = z.object({
  email: emailSchema,
  source: z.string().min(1, 'Source is required'),
  interests: z.array(z.nativeEnum(Interest)).min(1, 'Please select at least one interest'),
  walletAddress: walletAddressSchema,
  communicationPrefs: z
    .object({
      emailUpdates: z.boolean().default(true),
      presaleAlerts: z.boolean().default(true),
      weeklyNewsletter: z.boolean().default(false),
    })
    .optional(),
  metadata: z
    .object({
      utmSource: z.string().optional(),
      utmMedium: z.string().optional(),
      utmCampaign: z.string().optional(),
      referralCode: z.string().optional(),
      ipCountry: z.string().optional(),
    })
    .optional(),
});

// Analytics event schema
export const analyticsEventSchema = z.object({
  sessionId: z.string().uuid('Invalid session ID'),
  eventType: z.nativeEnum(EventType, {
    errorMap: () => ({ message: 'Invalid event type' }),
  }),
  page: z.string().min(1, 'Page is required'),
  referrer: z.string().optional(),
  deviceType: z.nativeEnum(DeviceType).optional(),
  timestamp: z.coerce
    .date()
    .refine((date) => date <= new Date(), 'Timestamp cannot be in the future'),
  metadata: z.record(z.unknown()).optional(),
});

// Presale status schema
export const presaleStatusSchema = z.object({
  status: z.nativeEnum(PresalePhase),
  launchDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  tokensAllocated: z.number().min(0),
  tokensSold: z.number().min(0),
  participantCount: z.number().min(0),
  currentPrice: z.number().min(0),
  bonusTier: z
    .object({
      name: z.string(),
      bonusPercentage: z.number().min(0).max(100),
      minPurchase: z.number().min(0),
      maxPurchase: z.number().min(0).optional(),
      endsAt: z.coerce.date(),
    })
    .optional(),
  announcementChannels: z.array(
    z.object({
      platform: z.enum(['twitter', 'discord', 'telegram', 'email']),
      url: z.string().url().optional(),
      handle: z.string().optional(),
    })
  ),
});

// Helper function: Validate email format
export function validateEmail(email: string): boolean {
  const result = emailSchema.safeParse(email);
  return result.success;
}

// Helper function: Validate Ethereum wallet address
export function validateWalletAddress(address: string): boolean {
  if (!address) return true; // Optional field
  const result = walletAddressSchema.safeParse(address);
  return result.success;
}

// Helper function: Format Zod validation errors for user display
export function formatZodError(error: z.ZodError): string {
  const firstError = error.errors[0];
  return firstError.message;
}

// Helper function: Format multiple Zod errors
export function formatZodErrors(error: z.ZodError): Record<string, string> {
  const formattedErrors: Record<string, string> = {};
  
  error.errors.forEach((err) => {
    const path = err.path.join('.');
    formattedErrors[path] = err.message;
  });
  
  return formattedErrors;
}

// Custom refinement: Check if date is in the future
export const futureDateRefinement = z.coerce.date().refine(
  (date) => date > new Date(),
  'Date must be in the future'
);

// Custom refinement: Check if date is in the past
export const pastDateRefinement = z.coerce.date().refine(
  (date) => date <= new Date(),
  'Date must be in the past or present'
);

// Type exports for TypeScript inference
export type EmailSubscriptionInput = z.infer<typeof emailSubscriptionSchema>;
export type AnalyticsEventInput = z.infer<typeof analyticsEventSchema>;
export type PresaleStatusInput = z.infer<typeof presaleStatusSchema>;
