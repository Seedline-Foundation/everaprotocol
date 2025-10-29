/**
 * Component Test: Button
 * 
 * This test verifies the Button component behavior.
 * Tests MUST FAIL until the implementation is complete (TDD approach).
 */

import { renderWithProviders, screen, userEvent } from '../test-utils';
import { Button } from '@/components/shared/Button';

describe('Button Component Tests', () => {
  it('should render primary variant correctly', () => {
    renderWithProviders(<Button variant="primary">Click me</Button>);
    
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(/primary/i);
  });

  it('should render secondary variant correctly', () => {
    renderWithProviders(<Button variant="secondary">Click me</Button>);
    
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toHaveClass(/secondary/i);
  });

  it('should render outline variant correctly', () => {
    renderWithProviders(<Button variant="outline">Click me</Button>);
    
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toHaveClass(/outline/i);
  });

  it('should prevent clicks when disabled', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();
    
    renderWithProviders(
      <Button onClick={handleClick} disabled>
        Click me
      </Button>
    );
    
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeDisabled();
    
    await user.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should show loading state with spinner', () => {
    renderWithProviders(<Button isLoading>Click me</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(screen.getByTestId('spinner') || screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('should fire onClick handler', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();
    
    renderWithProviders(<Button onClick={handleClick}>Click me</Button>);
    
    const button = screen.getByRole('button', { name: /click me/i });
    await user.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should work as a navigation link with href', () => {
    renderWithProviders(<Button href="/about">Go to About</Button>);
    
    const link = screen.getByRole('link', { name: /go to about/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/about');
  });

  it('should render small size variant', () => {
    renderWithProviders(<Button size="small">Small Button</Button>);
    
    const button = screen.getByRole('button', { name: /small button/i });
    expect(button).toHaveClass(/small/i);
  });

  it('should render medium size variant', () => {
    renderWithProviders(<Button size="medium">Medium Button</Button>);
    
    const button = screen.getByRole('button', { name: /medium button/i });
    expect(button).toHaveClass(/medium/i);
  });

  it('should render large size variant', () => {
    renderWithProviders(<Button size="large">Large Button</Button>);
    
    const button = screen.getByRole('button', { name: /large button/i });
    expect(button).toHaveClass(/large/i);
  });

  it('should apply custom className', () => {
    renderWithProviders(<Button className="custom-class">Custom Button</Button>);
    
    const button = screen.getByRole('button', { name: /custom button/i });
    expect(button).toHaveClass('custom-class');
  });

  it('should render ghost variant', () => {
    renderWithProviders(<Button variant="ghost">Ghost Button</Button>);
    
    const button = screen.getByRole('button', { name: /ghost button/i });
    expect(button).toHaveClass(/ghost/i);
  });

  it('should handle keyboard navigation', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();
    
    renderWithProviders(<Button onClick={handleClick}>Keyboard Button</Button>);
    
    const button = screen.getByRole('button', { name: /keyboard button/i });
    button.focus();
    
    // Press Enter key
    await user.keyboard('{Enter}');
    expect(handleClick).toHaveBeenCalled();
  });

  it('should be accessible with proper ARIA attributes', () => {
    renderWithProviders(
      <Button aria-label="Close modal" disabled>
        X
      </Button>
    );
    
    const button = screen.getByRole('button', { name: /close modal/i });
    expect(button).toHaveAttribute('aria-label', 'Close modal');
    expect(button).toHaveAttribute('aria-disabled', 'true');
  });

  it('should open external links in new tab', () => {
    renderWithProviders(
      <Button href="https://example.com" external>
        External Link
      </Button>
    );
    
    const link = screen.getByRole('link', { name: /external link/i });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('should not allow onClick when loading', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();
    
    renderWithProviders(
      <Button onClick={handleClick} isLoading>
        Loading Button
      </Button>
    );
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should render icon with children', () => {
    renderWithProviders(
      <Button icon={<span data-testid="icon">→</span>}>
        Next
      </Button>
    );
    
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });
});
