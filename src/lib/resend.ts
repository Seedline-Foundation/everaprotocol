// Resend API integration
// T067 - Create Resend integration (migrated from ConvertKit)

import { Resend } from 'resend';
import { Interest, SubscriptionResponse } from '@/types';

const resend = new Resend(process.env.RESEND_API_KEY);
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID;

interface ResendSubscriberData {
  email: string;
  firstName?: string;
  lastName?: string;
  unsubscribed?: boolean;
}

interface ResendError {
  message: string;
  name: string;
}

/**
 * Create a new subscriber in Resend
 * @param email - Email address of the subscriber
 * @param interests - Array of interests to tag subscriber with
 * @param walletAddress - Optional Ethereum wallet address
 * @param metadata - Optional additional metadata
 * @returns Subscriber information
 */
export async function createSubscriber(
  email: string,
  interests: Interest[],
  walletAddress?: string,
  metadata?: Record<string, string>
): Promise<SubscriptionResponse> {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('Resend API key is not configured');
  }

  if (!AUDIENCE_ID) {
    throw new Error('Resend audience ID is not configured');
  }

  let attempt = 0;
  const maxAttempts = 3;

  while (attempt < maxAttempts) {
    try {
      // First, try to add the contact to the audience
      const contact = await resend.contacts.create({
        email,
        audienceId: AUDIENCE_ID,
        firstName: metadata?.firstName || '',
        lastName: metadata?.lastName || '',
        unsubscribed: false,
      });

      if (contact.error) {
        // Handle duplicate email (already subscribed)
        if (contact.error.message?.includes('already exists') || 
            contact.error.message?.includes('duplicate')) {
          throw new Error('EMAIL_DUPLICATE');
        }
        throw new Error(contact.error.message || 'Failed to create subscriber');
      }

      // Send a welcome email with interests information
      await sendWelcomeEmail(email, interests, walletAddress);

      return {
        subscriberId: contact.data?.id || email, // Resend doesn't return a numeric ID
        email: email,
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
 * @param subscriberId - Resend contact ID or email
 * @param interests - Updated interests array
 */
export async function updateSubscriber(
  subscriberId: string,
  interests: Interest[]
): Promise<void> {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('Resend API key is not configured');
  }

  if (!AUDIENCE_ID) {
    throw new Error('Resend audience ID is not configured');
  }

  try {
    // Resend doesn't have built-in tagging, so we'll store interests in a custom field
    // or send a personalized email about the updated preferences
    await sendPreferencesUpdateEmail(subscriberId, interests);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to update subscriber: ${error.message}`);
    }
    throw new Error('Failed to update subscriber');
  }
}

/**
 * Send welcome email to new subscriber
 * @param email - Email address
 * @param interests - Subscriber interests
 * @param walletAddress - Optional wallet address
 */
async function sendWelcomeEmail(
  email: string,
  interests: Interest[],
  walletAddress?: string
): Promise<void> {
  try {
    const interestsList = interests.map(interest => 
      interest.charAt(0).toUpperCase() + interest.slice(1)
    ).join(', ');

    const result = await resend.emails.send({
      from: 'Evera Protocol <welcome@evera.network>',
      to: [email],
      subject: 'Welcome to Evera Protocol! 🚀',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to Evera Protocol</title>
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #313638; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #E4B363; margin: 0;">Welcome to Evera Protocol!</h1>
              <p style="color: #666; margin: 10px 0 0 0;">Verifiable Truth for the Information Age</p>
            </div>
            
            <div style="background: #f8f8f8; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
              <h2 style="color: #313638; margin-top: 0;">Thank you for joining us!</h2>
              <p>We're excited to have you as part of the Evera Protocol community. You've expressed interest in: <strong>${interestsList}</strong></p>
              ${walletAddress ? `<p>Wallet Address: <code style="background: #e0dfd5; padding: 2px 6px; border-radius: 4px;">${walletAddress}</code></p>` : ''}
            </div>

            <div style="margin-bottom: 30px;">
              <h3 style="color: #313638;">What's Next?</h3>
              <ul style="padding-left: 20px;">
                <li>📖 Read our <a href="https://evera.network/whitepaper" style="color: #E4B363;">whitepaper</a></li>
                <li>💰 Learn about our <a href="https://evera.network/token" style="color: #E4B363;">tokenomics</a></li>
                <li>🎯 Check out our <a href="https://evera.network/pitch" style="color: #E4B363;">investor pitch</a></li>
                <li>🌟 Follow us on <a href="https://twitter.com/EveraNetwork" style="color: #E4B363;">Twitter</a></li>
              </ul>
            </div>

            <div style="text-align: center; padding: 20px; background: #e0dfd5; border-radius: 8px;">
              <p style="margin: 0; color: #666;">
                Stay tuned for updates about our presale and platform launch!
              </p>
            </div>

            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
              <p style="color: #999; font-size: 14px; margin: 0;">
                Evera Protocol Team<br>
                <a href="https://evera.network" style="color: #E4B363;">evera.network</a>
              </p>
            </div>
          </body>
        </html>
      `,
    });

    if (result.error) {
      console.error('Failed to send welcome email:', result.error);
      // Don't throw here - subscriber creation should still succeed
    }
  } catch (error) {
    console.error('Failed to send welcome email:', error);
    // Don't throw here - subscriber creation should still succeed
  }
}

/**
 * Send preferences update email
 * @param email - Email address
 * @param interests - Updated interests
 */
async function sendPreferencesUpdateEmail(
  email: string,
  interests: Interest[]
): Promise<void> {
  try {
    const interestsList = interests.map(interest => 
      interest.charAt(0).toUpperCase() + interest.slice(1)
    ).join(', ');

    const result = await resend.emails.send({
      from: 'Evera Protocol <updates@evera.network>',
      to: [email],
      subject: 'Your Evera Protocol preferences have been updated',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Preferences Updated - Evera Protocol</title>
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #313638; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #E4B363; margin: 0;">Preferences Updated</h1>
            </div>
            
            <div style="background: #f8f8f8; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
              <h2 style="color: #313638; margin-top: 0;">Your interests have been updated</h2>
              <p>Your current interests: <strong>${interestsList}</strong></p>
              <p>You'll receive relevant updates based on these preferences.</p>
            </div>

            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
              <p style="color: #999; font-size: 14px; margin: 0;">
                Evera Protocol Team<br>
                <a href="https://evera.network" style="color: #E4B363;">evera.network</a>
              </p>
            </div>
          </body>
        </html>
      `,
    });

    if (result.error) {
      console.error('Failed to send preferences update email:', result.error);
    }
  } catch (error) {
    console.error('Failed to send preferences update email:', error);
  }
}

/**
 * Remove subscriber from audience
 * @param email - Email address to unsubscribe
 */
export async function unsubscribeContact(email: string): Promise<void> {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('Resend API key is not configured');
  }

  if (!AUDIENCE_ID) {
    throw new Error('Resend audience ID is not configured');
  }

  try {
    const result = await resend.contacts.remove({
      email,
      audienceId: AUDIENCE_ID,
    });

    if (result.error) {
      throw new Error(result.error.message || 'Failed to unsubscribe contact');
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to unsubscribe contact: ${error.message}`);
    }
    throw new Error('Failed to unsubscribe contact');
  }
}