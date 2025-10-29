'use client';

// T029 - Implement EmailCaptureForm component
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Interest } from '@/types';
import { Button } from './Button';
import { trackEmailCapture } from '@/lib/analytics';

// Validation schema
const emailCaptureSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  walletAddress: z
    .string()
    .regex(/^0x[a-fA-F0-9]{40}$/, 'Please enter a valid Ethereum wallet address')
    .optional()
    .or(z.literal('')),
  interests: z
    .array(z.nativeEnum(Interest))
    .min(1, 'Please select at least one interest'),
});

type EmailCaptureFormData = z.infer<typeof emailCaptureSchema>;

export interface EmailCaptureFormProps {
  source: string;
  onSuccess?: () => void;
  className?: string;
}

export function EmailCaptureForm({
  source,
  onSuccess,
  className = '',
}: EmailCaptureFormProps): JSX.Element {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [lastSubmitTime, setLastSubmitTime] = useState<number>(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmailCaptureFormData>({
    resolver: zodResolver(emailCaptureSchema),
    defaultValues: {
      email: '',
      walletAddress: '',
      interests: [],
    },
  });

  const onSubmit = async (data: EmailCaptureFormData) => {
    // Rate limiting: prevent submissions within 10 seconds
    const now = Date.now();
    if (now - lastSubmitTime < 10000) {
      setStatus('error');
      setErrorMessage('Please wait a moment before submitting again');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    // Retry logic with exponential backoff
    let attempt = 0;
    const maxAttempts = 3;

    while (attempt < maxAttempts) {
      try {
        const response = await fetch('/api/subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: data.email,
            source,
            interests: data.interests,
            walletAddress: data.walletAddress || undefined,
            communicationPrefs: {
              emailUpdates: true,
              presaleAlerts: true,
              weeklyNewsletter: false,
            },
          }),
        });

        const result = await response.json();

        if (!response.ok) {
          // Don't retry for client errors (400, 409, 429)
          if (response.status >= 400 && response.status < 500) {
            if (response.status === 409) {
              setErrorMessage('This email is already subscribed');
            } else if (response.status === 429) {
              setErrorMessage('Too many requests. Please try again later');
            } else {
              setErrorMessage(result.error || 'Failed to subscribe. Please try again');
            }
            setStatus('error');
            return;
          }

          // Retry for server errors (500+)
          throw new Error(result.error || 'Server error');
        }

        // Success!
        setStatus('success');
        setLastSubmitTime(now);
        
        // Track analytics event
        trackEmailCapture(source, data.interests);

        // Reset form after 3 seconds
        setTimeout(() => {
          reset();
          setStatus('idle');
          onSuccess?.();
        }, 3000);
        return;
      } catch (error) {
        attempt++;
        console.error(`Subscription attempt ${attempt} failed:`, error);

        if (attempt >= maxAttempts) {
          setStatus('error');
          setErrorMessage('Network error. Please check your connection and try again');
          return;
        }

        // Exponential backoff: 1s, 2s, 4s
        await new Promise((resolve) => setTimeout(resolve, 1000 * Math.pow(2, attempt - 1)));
      }
    }
  };

  const interestOptions = [
    { value: Interest.Investor, label: 'Investor' },
    { value: Interest.Publisher, label: 'Publisher' },
    { value: Interest.Verifier, label: 'Verifier' },
    { value: Interest.Developer, label: 'Developer' },
    { value: Interest.General, label: 'General Interest' },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`space-y-4 ${className}`}>
      {/* Email Input */}
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-charcoal mb-2">
          Email Address <span className="text-coral">*</span>
        </label>
        <input
          {...register('email')}
          type="email"
          id="email"
          placeholder="your.email@example.com"
          className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold transition-all ${
            errors.email ? 'border-coral' : 'border-stone focus:border-gold'
          }`}
          disabled={status === 'submitting'}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-coral" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Wallet Address Input (Optional) */}
      <div>
        <label htmlFor="walletAddress" className="block text-sm font-semibold text-charcoal mb-2">
          Ethereum Wallet Address <span className="text-sm text-gray-500">(Optional)</span>
        </label>
        <input
          {...register('walletAddress')}
          type="text"
          id="walletAddress"
          placeholder="0x..."
          className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold transition-all ${
            errors.walletAddress ? 'border-coral' : 'border-stone focus:border-gold'
          }`}
          disabled={status === 'submitting'}
        />
        {errors.walletAddress && (
          <p className="mt-1 text-sm text-coral" role="alert">
            {errors.walletAddress.message}
          </p>
        )}
      </div>

      {/* Interests Checkboxes */}
      <div>
        <label className="block text-sm font-semibold text-charcoal mb-2">
          I'm interested as a... <span className="text-coral">*</span>
        </label>
        <div className="space-y-2">
          {interestOptions.map((option) => (
            <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
              <input
                {...register('interests')}
                type="checkbox"
                value={option.value}
                className="w-5 h-5 text-gold border-stone rounded focus:ring-gold focus:ring-2"
                disabled={status === 'submitting'}
              />
              <span className="text-charcoal">{option.label}</span>
            </label>
          ))}
        </div>
        {errors.interests && (
          <p className="mt-1 text-sm text-coral" role="alert">
            {errors.interests.message}
          </p>
        )}
      </div>

      {/* Error Message */}
      {status === 'error' && errorMessage && (
        <div className="p-4 bg-coral/10 border-2 border-coral rounded-lg">
          <p className="text-coral text-sm">{errorMessage}</p>
        </div>
      )}

      {/* Success Message */}
      {status === 'success' && (
        <div className="p-4 bg-green-100 border-2 border-green-500 rounded-lg">
          <p className="text-green-700 font-semibold">
            ✓ Successfully subscribed! Check your email to confirm.
          </p>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="large"
        fullWidth
        loading={status === 'submitting'}
        disabled={status === 'submitting' || status === 'success'}
      >
        {status === 'submitting' ? 'Subscribing...' : 'Subscribe'}
      </Button>

      <p className="text-xs text-gray-500 text-center">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </form>
  );
}
