/**
 * Component Test: EmailCaptureForm
 * 
 * This test verifies the EmailCaptureForm component behavior.
 * Tests MUST FAIL until the implementation is complete (TDD approach).
 */

import { renderWithProviders, screen, userEvent, waitFor } from '../test-utils';
import { EmailCaptureForm } from '@/components/shared/EmailCaptureForm';

// Mock fetch for API calls
global.fetch = jest.fn();

describe('EmailCaptureForm Component Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render form fields correctly', () => {
    renderWithProviders(<EmailCaptureForm source="test" />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/wallet address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/investor/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/publisher/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/verifier/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /subscribe/i })).toBeInTheDocument();
  });

  it('should display email validation error messages', async () => {
    const user = userEvent.setup();
    renderWithProviders(<EmailCaptureForm source="test" />);

    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', { name: /subscribe/i });

    // Enter invalid email and blur to trigger validation
    await user.type(emailInput, 'invalid-email');
    await user.tab(); // Move focus away to trigger validation
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
    });
  });

  it('should validate wallet address format', async () => {
    const user = userEvent.setup();
    renderWithProviders(<EmailCaptureForm source="test" />);

    const emailInput = screen.getByLabelText(/email/i);
    const walletInput = screen.getByLabelText(/wallet address/i);
    const submitButton = screen.getByRole('button', { name: /subscribe/i });

    // Enter valid email but invalid wallet address
    await user.type(emailInput, 'test@example.com');
    await user.type(walletInput, 'invalid-wallet');
    await user.tab(); // Move focus away to trigger validation
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/please enter a valid ethereum wallet address/i)).toBeInTheDocument();
    });
  });

  it('should handle interest checkbox selection', async () => {
    const user = userEvent.setup();
    renderWithProviders(<EmailCaptureForm source="test" />);

    const investorCheckbox = screen.getByLabelText(/investor/i) as HTMLInputElement;
    const publisherCheckbox = screen.getByLabelText(/publisher/i) as HTMLInputElement;

    // Initially unchecked
    expect(investorCheckbox.checked).toBe(false);
    expect(publisherCheckbox.checked).toBe(false);

    // Check investor
    await user.click(investorCheckbox);
    expect(investorCheckbox.checked).toBe(true);

    // Check publisher
    await user.click(publisherCheckbox);
    expect(publisherCheckbox.checked).toBe(true);

    // Uncheck investor
    await user.click(investorCheckbox);
    expect(investorCheckbox.checked).toBe(false);
  });

  it('should handle form submission success flow', async () => {
    const user = userEvent.setup();
    
    // Mock successful API response with delay to catch loading state
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      new Promise(resolve => 
        setTimeout(() => resolve({
          ok: true,
          status: 201,
          json: async () => ({
            success: true,
            subscriberId: 'sub_123',
          }),
        }), 100)
      )
    );

    renderWithProviders(<EmailCaptureForm source="test" />);

    const emailInput = screen.getByLabelText(/email/i);
    const investorCheckbox = screen.getByLabelText(/investor/i);
    const submitButton = screen.getByRole('button', { name: /subscribe/i });

    // Fill form
    await user.type(emailInput, 'test@example.com');
    await user.click(investorCheckbox);
    await user.click(submitButton);

    // Should show loading state
    await waitFor(() => {
      expect(screen.getByText(/subscribing/i)).toBeInTheDocument();
    });

    // Should show success message
    await waitFor(() => {
      expect(screen.getByText(/successfully subscribed/i)).toBeInTheDocument();
    }, { timeout: 3000 });

    // Verify API was called with correct data
    expect(global.fetch).toHaveBeenCalledWith(
      '/api/subscribe',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: expect.stringContaining('test@example.com'),
      })
    );
  });

  it('should handle form submission error flow', async () => {
    const user = userEvent.setup();
    
    // Mock API error response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({
        success: false,
        error: 'Internal server error',
      }),
    });

    renderWithProviders(<EmailCaptureForm source="test" />);

    const emailInput = screen.getByLabelText(/email/i);
    const investorCheckbox = screen.getByLabelText(/investor/i);
    const submitButton = screen.getByRole('button', { name: /subscribe/i });

    // Fill form
    await user.type(emailInput, 'test@example.com');
    await user.click(investorCheckbox);
    await user.click(submitButton);

    // Should show error message
    await waitFor(() => {
      expect(screen.getByText(/subscription failed/i)).toBeInTheDocument();
    });
  });

  it('should display rate limiting UI feedback', async () => {
    const user = userEvent.setup();
    
    // Mock rate limit response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 429,
      json: async () => ({
        success: false,
        error: 'Too many requests. Please try again later.',
      }),
    });

    renderWithProviders(<EmailCaptureForm source="test" />);

    const emailInput = screen.getByLabelText(/email/i);
    const investorCheckbox = screen.getByLabelText(/investor/i);
    const submitButton = screen.getByRole('button', { name: /subscribe/i });

    // Fill form
    await user.type(emailInput, 'test@example.com');
    await user.click(investorCheckbox);
    await user.click(submitButton);

    // Should show rate limit message
    await waitFor(() => {
      expect(screen.getByText(/too many requests/i)).toBeInTheDocument();
    });
  });

  it('should require at least one interest to be selected', async () => {
    const user = userEvent.setup();
    renderWithProviders(<EmailCaptureForm source="test" />);

    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', { name: /subscribe/i });

    // Fill email but no interests
    await user.type(emailInput, 'test@example.com');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/select at least one interest/i)).toBeInTheDocument();
    });
  });

  it('should disable submit button while submitting', async () => {
    const user = userEvent.setup();
    
    // Mock slow API response
    (global.fetch as jest.Mock).mockImplementationOnce(
      () => new Promise((resolve) => setTimeout(() => resolve({
        ok: true,
        status: 201,
        json: async () => ({ success: true, subscriberId: 'sub_123' }),
      }), 1000))
    );

    renderWithProviders(<EmailCaptureForm source="test" />);

    const emailInput = screen.getByLabelText(/email/i);
    const investorCheckbox = screen.getByLabelText(/investor/i);
    const submitButton = screen.getByRole('button', { name: /subscribe/i });

    await user.type(emailInput, 'test@example.com');
    await user.click(investorCheckbox);
    await user.click(submitButton);

    // Button should be disabled during submission
    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });
  });
});
