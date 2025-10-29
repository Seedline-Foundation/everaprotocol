/**
 * Component Test: Card
 * 
 * This test verifies the Card component behavior.
 * Tests MUST FAIL until the implementation is complete (TDD approach).
 */

import { renderWithProviders, screen, userEvent } from '../test-utils';
import { Card } from '@/components/shared/Card';

describe('Card Component Tests', () => {
  it('should render children correctly', () => {
    renderWithProviders(
      <Card>
        <h2>Card Title</h2>
        <p>Card content goes here</p>
      </Card>
    );

    expect(screen.getByText('Card Title')).toBeInTheDocument();
    expect(screen.getByText('Card content goes here')).toBeInTheDocument();
  });

  it('should apply hover effect', async () => {
    const user = userEvent.setup();
    
    renderWithProviders(
      <Card hover>
        <div>Hoverable Card</div>
      </Card>
    );

    const card = screen.getByText('Hoverable Card').parentElement;
    expect(card).toHaveClass(/hover/i);
    
    // Simulate hover
    await user.hover(card!);
    
    // Card should have hover state (transform or shadow)
    expect(card).toHaveAttribute('data-hover', 'true');
  });

  it('should handle clickable variant navigation', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();
    
    renderWithProviders(
      <Card clickable onClick={handleClick}>
        <div>Clickable Card</div>
      </Card>
    );

    const card = screen.getByText('Clickable Card').parentElement;
    await user.click(card!);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should render with no padding variant', () => {
    renderWithProviders(
      <Card padding="none">
        <div>No Padding Card</div>
      </Card>
    );

    const card = screen.getByText('No Padding Card').parentElement;
    expect(card).toHaveClass(/p-0/i);
  });

  it('should render with small padding variant', () => {
    renderWithProviders(
      <Card padding="small">
        <div>Small Padding Card</div>
      </Card>
    );

    const card = screen.getByText('Small Padding Card').parentElement;
    expect(card).toHaveClass(/p-4/i);
  });

  it('should render with medium padding variant', () => {
    renderWithProviders(
      <Card padding="medium">
        <div>Medium Padding Card</div>
      </Card>
    );

    const card = screen.getByText('Medium Padding Card').parentElement;
    expect(card).toHaveClass(/p-6/i);
  });

  it('should render with large padding variant', () => {
    renderWithProviders(
      <Card padding="large">
        <div>Large Padding Card</div>
      </Card>
    );

    const card = screen.getByText('Large Padding Card').parentElement;
    expect(card).toHaveClass(/p-8/i);
  });

  it('should render with no shadow variant', () => {
    renderWithProviders(
      <Card shadow="none">
        <div>No Shadow Card</div>
      </Card>
    );

    const card = screen.getByText('No Shadow Card').parentElement;
    expect(card).toHaveClass(/shadow-none/i);
  });

  it('should render with small shadow variant', () => {
    renderWithProviders(
      <Card shadow="small">
        <div>Small Shadow Card</div>
      </Card>
    );

    const card = screen.getByText('Small Shadow Card').parentElement;
    expect(card).toHaveClass(/shadow-sm/i);
  });

  it('should render with medium shadow variant', () => {
    renderWithProviders(
      <Card shadow="medium">
        <div>Medium Shadow Card</div>
      </Card>
    );

    const card = screen.getByText('Medium Shadow Card').parentElement;
    expect(card).toHaveClass(/shadow-md/i);
  });

  it('should render with large shadow variant', () => {
    renderWithProviders(
      <Card shadow="large">
        <div>Large Shadow Card</div>
      </Card>
    );

    const card = screen.getByText('Large Shadow Card').parentElement;
    expect(card).toHaveClass(/shadow-lg/i);
  });

  it('should apply custom className', () => {
    renderWithProviders(
      <Card className="custom-card-class">
        <div>Custom Card</div>
      </Card>
    );

    const card = screen.getByText('Custom Card').parentElement;
    expect(card).toHaveClass('custom-card-class');
  });

  it('should render as a link when href is provided', () => {
    renderWithProviders(
      <Card href="/details">
        <div>Link Card</div>
      </Card>
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/details');
    expect(screen.getByText('Link Card')).toBeInTheDocument();
  });

  it('should have accessible cursor pointer for clickable cards', () => {
    renderWithProviders(
      <Card clickable onClick={() => {}}>
        <div>Clickable Card</div>
      </Card>
    );

    const card = screen.getByText('Clickable Card').parentElement;
    expect(card).toHaveClass(/cursor-pointer/i);
  });

  it('should support keyboard navigation for clickable cards', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();
    
    renderWithProviders(
      <Card clickable onClick={handleClick}>
        <div>Keyboard Card</div>
      </Card>
    );

    const card = screen.getByText('Keyboard Card').parentElement;
    card?.focus();
    
    // Press Enter key
    await user.keyboard('{Enter}');
    expect(handleClick).toHaveBeenCalled();
  });

  it('should render with border variant', () => {
    renderWithProviders(
      <Card border>
        <div>Bordered Card</div>
      </Card>
    );

    const card = screen.getByText('Bordered Card').parentElement;
    expect(card).toHaveClass(/border/i);
  });

  it('should render with background color variant', () => {
    renderWithProviders(
      <Card backgroundColor="stone">
        <div>Colored Card</div>
      </Card>
    );

    const card = screen.getByText('Colored Card').parentElement;
    expect(card).toHaveClass(/bg-stone/i);
  });

  it('should combine multiple variants correctly', () => {
    renderWithProviders(
      <Card
        padding="large"
        shadow="medium"
        hover
        border
        className="custom-class"
      >
        <div>Multi-variant Card</div>
      </Card>
    );

    const card = screen.getByText('Multi-variant Card').parentElement;
    expect(card).toHaveClass(/p-8/i);
    expect(card).toHaveClass(/shadow-md/i);
    expect(card).toHaveClass(/hover/i);
    expect(card).toHaveClass(/border/i);
    expect(card).toHaveClass('custom-class');
  });
});
