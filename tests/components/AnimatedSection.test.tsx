/**
 * Component Test: AnimatedSection
 * 
 * This test verifies the AnimatedSection component behavior.
 * Tests MUST FAIL until the implementation is complete (TDD approach).
 */

import { renderWithProviders, screen } from '../test-utils';
import { AnimatedSection } from '@/components/shared/AnimatedSection';

// Mock IntersectionObserver
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
});
window.IntersectionObserver = mockIntersectionObserver as any;

describe('AnimatedSection Component Tests', () => {
  beforeEach(() => {
    mockIntersectionObserver.mockClear();
  });

  it('should trigger fade animation on scroll', () => {
    renderWithProviders(
      <AnimatedSection animation="fade">
        <div>Test Content</div>
      </AnimatedSection>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
    
    // Verify IntersectionObserver was set up
    expect(mockIntersectionObserver).toHaveBeenCalled();
  });

  it('should trigger slide-up animation on scroll', () => {
    renderWithProviders(
      <AnimatedSection animation="slide-up">
        <div>Test Content</div>
      </AnimatedSection>
    );

    const section = screen.getByText('Test Content').parentElement;
    expect(section).toHaveAttribute('data-animation', 'slide-up');
  });

  it('should use correct intersection observer threshold', () => {
    const customThreshold = 0.5;
    
    renderWithProviders(
      <AnimatedSection animation="fade" threshold={customThreshold}>
        <div>Test Content</div>
      </AnimatedSection>
    );

    // Verify IntersectionObserver was called with correct threshold
    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining({
        threshold: customThreshold,
      })
    );
  });

  it('should respect prefers-reduced-motion', () => {
    // Mock matchMedia to return reduced motion preference
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    renderWithProviders(
      <AnimatedSection animation="fade">
        <div>Test Content</div>
      </AnimatedSection>
    );

    const section = screen.getByText('Test Content').parentElement;
    
    // Should have data attribute indicating reduced motion
    expect(section).toHaveAttribute('data-reduced-motion', 'true');
  });

  it('should handle animation delay prop', () => {
    const customDelay = 0.5;
    
    renderWithProviders(
      <AnimatedSection animation="fade" delay={customDelay}>
        <div>Test Content</div>
      </AnimatedSection>
    );

    const section = screen.getByText('Test Content').parentElement;
    
    // Should have delay data attribute or style
    expect(
      section?.getAttribute('data-delay') === String(customDelay) ||
      section?.style.transitionDelay === `${customDelay}s`
    ).toBeTruthy();
  });

  it('should handle animation duration prop', () => {
    const customDuration = 1.5;
    
    renderWithProviders(
      <AnimatedSection animation="fade" duration={customDuration}>
        <div>Test Content</div>
      </AnimatedSection>
    );

    const section = screen.getByText('Test Content').parentElement;
    
    // Should have duration data attribute or style
    expect(
      section?.getAttribute('data-duration') === String(customDuration) ||
      section?.style.transitionDuration === `${customDuration}s`
    ).toBeTruthy();
  });

  it('should prevent re-animation when once prop is true', () => {
    const { rerender } = renderWithProviders(
      <AnimatedSection animation="fade" once={true}>
        <div>Test Content</div>
      </AnimatedSection>
    );

    // Simulate intersection (scroll into view)
    const observerCallback = mockIntersectionObserver.mock.calls[0][0];
    observerCallback([{ isIntersecting: true }]);

    // Get the section element
    const section = screen.getByText('Test Content').parentElement;
    expect(section).toHaveAttribute('data-animated', 'true');

    // Re-render (simulate scrolling out and back in)
    rerender(
      <AnimatedSection animation="fade" once={true}>
        <div>Test Content</div>
      </AnimatedSection>
    );

    // Should still show as animated (not reset)
    expect(section).toHaveAttribute('data-animated', 'true');
  });

  it('should support slide-left animation', () => {
    renderWithProviders(
      <AnimatedSection animation="slide-left">
        <div>Test Content</div>
      </AnimatedSection>
    );

    const section = screen.getByText('Test Content').parentElement;
    expect(section).toHaveAttribute('data-animation', 'slide-left');
  });

  it('should support slide-right animation', () => {
    renderWithProviders(
      <AnimatedSection animation="slide-right">
        <div>Test Content</div>
      </AnimatedSection>
    );

    const section = screen.getByText('Test Content').parentElement;
    expect(section).toHaveAttribute('data-animation', 'slide-right');
  });

  it('should support zoom animation', () => {
    renderWithProviders(
      <AnimatedSection animation="zoom">
        <div>Test Content</div>
      </AnimatedSection>
    );

    const section = screen.getByText('Test Content').parentElement;
    expect(section).toHaveAttribute('data-animation', 'zoom');
  });

  it('should wrap children correctly', () => {
    renderWithProviders(
      <AnimatedSection animation="fade">
        <h1>Title</h1>
        <p>Paragraph</p>
        <button>Button</button>
      </AnimatedSection>
    );

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Paragraph')).toBeInTheDocument();
    expect(screen.getByText('Button')).toBeInTheDocument();
  });

  it('should disconnect observer on unmount', () => {
    const disconnectMock = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: disconnectMock,
    });

    const { unmount } = renderWithProviders(
      <AnimatedSection animation="fade">
        <div>Test Content</div>
      </AnimatedSection>
    );

    unmount();

    expect(disconnectMock).toHaveBeenCalled();
  });
});
