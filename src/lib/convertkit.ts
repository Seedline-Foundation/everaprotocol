// ConvertKit API integration
// T067 - Create ConvertKit integration

import { Interest, SubscriptionResponse } from '@/types';

const CONVERTKIT_API_URL = 'https://api.convertkit.com/v3';
const API_KEY = process.env.CONVERTKIT_API_KEY;

interface ConvertKitSubscriberData {
  email: string;
  first_name?: string;
  fields?: Record<string, string>;
  tags?: number[];
}

interface ConvertKitError {
  message: string;
  errors?: string[];
}

// Interest to ConvertKit tag ID mapping
// Note: These would be configured in ConvertKit dashboard and mapped here
const INTEREST_TAG_MAP: Record<Interest, number> = {
  [Interest.Investor]: parseInt(process.env.CONVERTKIT_TAG_INVESTOR || '0'),
  [Interest.Publisher]: parseInt(process.env.CONVERTKIT_TAG_PUBLISHER || '0'),
  [Interest.Verifier]: parseInt(process.env.CONVERTKIT_TAG_VERIFIER || '0'),
  [Interest.Developer]: parseInt(process.env.CONVERTKIT_TAG_DEVELOPER || '0'),
  [Interest.General]: parseInt(process.env.CONVERTKIT_TAG_GENERAL || '0'),
};

/**
 * Create a new subscriber in ConvertKit
 * @param email - Email address of the subscriber
 * @param interests - Array of interests to tag subscriber with
 * @param walletAddress - Optional Ethereum wallet address
 * @returns Subscriber information
 */
export async function createSubscriber(
  email: string,
  interests: Interest[],
  walletAddress?: string,
  metadata?: Record<string, string>
): Promise<SubscriptionResponse> {
  if (!API_KEY) {
    throw new Error('ConvertKit API key is not configured');
  }

  // Convert interests to ConvertKit tag IDs
  const tags = interests
    .map((interest) => INTEREST_TAG_MAP[interest])
    .filter((tag) => tag > 0); // Filter out unmapped tags

  const subscriberData: ConvertKitSubscriberData = {
    email,
    fields: {
      wallet_address: walletAddress || '',
      interests: interests.join(','),
      ...metadata,
    },
    tags,
  };

  let attempt = 0;
  const maxAttempts = 3;

  while (attempt < maxAttempts) {
    try {
      const response = await fetch(`${CONVERTKIT_API_URL}/forms/${process.env.CONVERTKIT_FORM_ID}/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          api_key: API_KEY,
          ...subscriberData,
        }),
      });

      if (!response.ok) {
        const errorData: ConvertKitError = await response.json();
        
        // Handle duplicate email (already subscribed)
        if (response.status === 409 || errorData.message?.includes('already subscribed')) {
          throw new Error('EMAIL_DUPLICATE');
        }

        throw new Error(errorData.message || 'Failed to create subscriber');
      }

      const data = await response.json();

      return {
        subscriberId: data.subscription.subscriber.id.toString(),
        email: data.subscription.subscriber.email_address,
        interests,
      };
    } catch (error) {
      attempt++;

      // Don't retry for duplicate emails
      if (error instanceof Error && error.message === 'EMAIL_DUPLICATE') {
        throw error;
      }

      // Retry for transient failures
      if (attempt >= maxAttempts) {
        if (error instanceof Error) {
          throw new Error(`Failed to create subscriber after ${maxAttempts} attempts: ${error.message}`);
        }
        throw new Error(`Failed to create subscriber after ${maxAttempts} attempts`);
      }

      // Exponential backoff
      await new Promise((resolve) => setTimeout(resolve, 1000 * Math.pow(2, attempt)));
    }
  }

  throw new Error('Failed to create subscriber');
}

/**
 * Update subscriber preferences
 * @param subscriberId - ConvertKit subscriber ID
 * @param interests - Updated interests array
 */
export async function updateSubscriber(
  subscriberId: string,
  interests: Interest[]
): Promise<void> {
  if (!API_KEY) {
    throw new Error('ConvertKit API key is not configured');
  }

  const tags = interests
    .map((interest) => INTEREST_TAG_MAP[interest])
    .filter((tag) => tag > 0);

  try {
    const response = await fetch(`${CONVERTKIT_API_URL}/subscribers/${subscriberId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: API_KEY,
        fields: {
          interests: interests.join(','),
        },
      }),
    });

    if (!response.ok) {
      const errorData: ConvertKitError = await response.json();
      throw new Error(errorData.message || 'Failed to update subscriber');
    }

    // Add new tags
    for (const tagId of tags) {
      await fetch(`${CONVERTKIT_API_URL}/tags/${tagId}/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          api_key: API_KEY,
          email: subscriberId,
        }),
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to update subscriber: ${error.message}`);
    }
    throw new Error('Failed to update subscriber');
  }
}

/**
 * Add tags to a subscriber
 * @param email - Email address of the subscriber
 * @param tags - Array of tag IDs to add
 */
export async function addTagsToSubscriber(email: string, tags: number[]): Promise<void> {
  if (!API_KEY) {
    throw new Error('ConvertKit API key is not configured');
  }

  for (const tagId of tags) {
    try {
      await fetch(`${CONVERTKIT_API_URL}/tags/${tagId}/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          api_key: API_KEY,
          email,
        }),
      });
    } catch (error) {
      console.error(`Failed to add tag ${tagId} to subscriber:`, error);
      // Continue with other tags even if one fails
    }
  }
}
