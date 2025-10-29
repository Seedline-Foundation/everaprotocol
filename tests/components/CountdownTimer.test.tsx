/**
 * Component Test: CountdownTimer
 * 
 * This test verifies the CountdownTimer component behavior.
 * Tests MUST FAIL until the implementation is complete (TDD approach).
 */

import { renderWithProviders, screen, waitFor } from '../test-utils';
import { CountdownTimer } from '@/components/shared/CountdownTimer';

describe('CountdownTimer Component Tests', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should render days/hours/minutes/seconds correctly', () => {
    const futureDate = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000); // 2 days from now
    renderWithProviders(<CountdownTimer targetDate={futureDate} />);

    expect(screen.getByText(/days/i)).toBeInTheDocument();
    expect(screen.getByText(/hours/i)).toBeInTheDocument();
    expect(screen.getByText(/minutes/i)).toBeInTheDocument();
    expect(screen.getByText(/seconds/i)).toBeInTheDocument();
  });

  it('should update every second', async () => {
    const futureDate = new Date(Date.now() + 100000); // 100 seconds from now
    renderWithProviders(<CountdownTimer targetDate={futureDate} />);

    const initialSeconds = screen.getByTestId('seconds-value').textContent;

    // Advance time by 1 second
    jest.advanceTimersByTime(1000);

    await waitFor(() => {
      const updatedSeconds = screen.getByTestId('seconds-value').textContent;
      expect(updatedSeconds).not.toBe(initialSeconds);
    });
  });

  it('should fire onComplete callback at zero', async () => {
    const onComplete = jest.fn();
    const nearFutureDate = new Date(Date.now() + 2000); // 2 seconds from now

    renderWithProviders(
      <CountdownTimer targetDate={nearFutureDate} onComplete={onComplete} />
    );

    // Fast-forward time to countdown completion
    jest.advanceTimersByTime(3000);

    await waitFor(() => {
      expect(onComplete).toHaveBeenCalled();
    });
  });

  it('should handle past dates gracefully', () => {
    const pastDate = new Date(Date.now() - 100000); // 100 seconds ago
    renderWithProviders(<CountdownTimer targetDate={pastDate} />);

    // Should show "Ended" or zeros
    expect(
      screen.getByText(/ended/i) ||
      screen.getByTestId('days-value').textContent === '0'
    ).toBeTruthy();
  });

  it('should handle future dates correctly', () => {
    const futureDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000); // 5 days from now
    renderWithProviders(<CountdownTimer targetDate={futureDate} />);

    const daysValue = screen.getByTestId('days-value');
    expect(parseInt(daysValue.textContent || '0')).toBeGreaterThanOrEqual(4);
    expect(parseInt(daysValue.textContent || '0')).toBeLessThanOrEqual(5);
  });

  it('should render different size variants', () => {
    const futureDate = new Date(Date.now() + 100000);

    const { rerender } = renderWithProviders(
      <CountdownTimer targetDate={futureDate} size="small" />
    );
    
    const smallTimer = screen.getByTestId('countdown-timer');
    expect(smallTimer).toHaveClass(/small/i);

    rerender(<CountdownTimer targetDate={futureDate} size="medium" />);
    const mediumTimer = screen.getByTestId('countdown-timer');
    expect(mediumTimer).toHaveClass(/medium/i);

    rerender(<CountdownTimer targetDate={futureDate} size="large" />);
    const largeTimer = screen.getByTestId('countdown-timer');
    expect(largeTimer).toHaveClass(/large/i);
  });

  it('should display correct time units', () => {
    // Create a specific date: 2 days, 3 hours, 45 minutes, 30 seconds from now
    const now = Date.now();
    const futureDate = new Date(
      now + 
      (2 * 24 * 60 * 60 * 1000) + // 2 days
      (3 * 60 * 60 * 1000) +      // 3 hours
      (45 * 60 * 1000) +          // 45 minutes
      (30 * 1000)                 // 30 seconds
    );

    renderWithProviders(<CountdownTimer targetDate={futureDate} />);

    const days = parseInt(screen.getByTestId('days-value').textContent || '0');
    const hours = parseInt(screen.getByTestId('hours-value').textContent || '0');
    const minutes = parseInt(screen.getByTestId('minutes-value').textContent || '0');
    const seconds = parseInt(screen.getByTestId('seconds-value').textContent || '0');

    expect(days).toBe(2);
    expect(hours).toBe(3);
    expect(minutes).toBe(45);
    expect(seconds).toBeGreaterThanOrEqual(29);
    expect(seconds).toBeLessThanOrEqual(30);
  });

  it('should clean up interval on unmount', () => {
    const futureDate = new Date(Date.now() + 100000);
    const clearIntervalSpy = jest.spyOn(global, 'clearInterval');

    const { unmount } = renderWithProviders(
      <CountdownTimer targetDate={futureDate} />
    );

    unmount();

    expect(clearIntervalSpy).toHaveBeenCalled();
  });

  it('should pad single digit numbers with zeros', () => {
    // Create date with single digit values
    const futureDate = new Date(
      Date.now() + 
      (1 * 60 * 60 * 1000) +  // 1 hour
      (5 * 60 * 1000) +        // 5 minutes
      (9 * 1000)               // 9 seconds
    );

    renderWithProviders(<CountdownTimer targetDate={futureDate} />);

    const hours = screen.getByTestId('hours-value').textContent;
    const minutes = screen.getByTestId('minutes-value').textContent;
    const seconds = screen.getByTestId('seconds-value').textContent;

    // Should display with leading zeros: 01, 05, 09
    expect(hours).toMatch(/^0\d$/);
    expect(minutes).toMatch(/^0\d$/);
    expect(seconds).toMatch(/^0\d$/);
  });
});
