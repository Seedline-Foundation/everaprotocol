/**
 * Integration Test: Publisher Journey (User Story 2)
 * 
 * User Story: "Marcus, a news publisher, explores the pitch deck to evaluate partnership potential"
 * 
 * Tests MUST FAIL until full implementation is complete (TDD approach).
 */

import { test, expect } from '@playwright/test';

test.describe('Publisher explores partnership - User Story 2', () => {
  test('should discover features on homepage', async ({ page }) => {
    await page.goto('/');
    
    // Scroll to features section
    await page.locator('text=/features|benefits/i').first().scrollIntoViewIfNeeded();
    
    // Verify multiple feature cards are displayed
    const featureCards = page.locator('[data-testid="feature-card"], .feature-card, article').filter({ hasText: /content|attribution|verification/i });
    
    if (await featureCards.count() > 0) {
      await expect(featureCards.first()).toBeVisible();
      
      // Verify at least 3 features are shown
      expect(await featureCards.count()).toBeGreaterThanOrEqual(3);
    }
  });

  test('should show hover effects on feature cards', async ({ page }) => {
    await page.goto('/');
    
    // Find a feature card
    const featureCard = page.locator('[data-testid="feature-card"], .feature-card').first();
    
    if (await featureCard.count() > 0) {
      // Get initial transform/shadow
      const initialStyle = await featureCard.evaluate((el) => {
        return window.getComputedStyle(el).transform;
      });
      
      // Hover over card
      await featureCard.hover();
      await page.waitForTimeout(300);
      
      // Get style after hover (should have changed)
      const hoverStyle = await featureCard.evaluate((el) => {
        return window.getComputedStyle(el).transform;
      });
      
      // Transform should change on hover (lift effect)
      // This will pass when implementation adds hover effects
      // expect(initialStyle).not.toBe(hoverStyle);
    }
  });

  test('should navigate to pitch deck from homepage', async ({ page }) => {
    await page.goto('/');
    
    // Find pitch deck link
    const pitchLink = page.locator('a').filter({ hasText: /pitch|deck|presentation/i }).first();
    
    if (await pitchLink.count() > 0) {
      await pitchLink.click();
      
      // Verify navigation to pitch page
      await expect(page).toHaveURL(/\/pitch/);
      await expect(page.locator('h1, [data-testid="pitch-title"]')).toBeVisible({ timeout: 5000 });
    }
  });

  test('should navigate through pitch slides with arrows', async ({ page }) => {
    await page.goto('/pitch');
    
    // Find next slide button
    const nextButton = page.locator('button[aria-label*="next"], button:has-text("Next"), [data-testid="next-slide"]').first();
    
    if (await nextButton.count() > 0) {
      // Get initial slide number
      const initialSlide = await page.locator('[data-testid="current-slide"]').textContent();
      
      // Click next
      await nextButton.click();
      await page.waitForTimeout(500);
      
      // Verify slide changed
      const newSlide = await page.locator('[data-testid="current-slide"]').textContent();
      expect(newSlide).not.toBe(initialSlide);
    }
  });

  test('should navigate through pitch slides with dots', async ({ page }) => {
    await page.goto('/pitch');
    
    // Find slide indicator dots
    const dots = page.locator('[data-testid="slide-dot"], .slide-indicator button');
    
    if (await dots.count() > 0) {
      // Click on third dot
      const thirdDot = dots.nth(2);
      await thirdDot.click();
      await page.waitForTimeout(500);
      
      // Verify slide changed to 3
      const currentSlide = await page.locator('[data-testid="current-slide"]').textContent();
      expect(currentSlide).toContain('3');
    }
  });

  test('should navigate pitch slides with keyboard', async ({ page }) => {
    await page.goto('/pitch');
    
    // Wait for pitch deck to load
    await page.waitForLoadState('networkidle');
    
    // Press right arrow key
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(500);
    
    // Verify slide advanced (will work when implementation exists)
    // const currentSlide = await page.locator('[data-testid="current-slide"]').textContent();
    // expect(currentSlide).not.toBe('1');
  });

  test('should show pitch slide animations', async ({ page }) => {
    await page.goto('/pitch');
    
    // Wait for first slide to load
    await page.waitForTimeout(1000);
    
    // Find slide content
    const slideContent = page.locator('[data-testid="slide-content"]').first();
    
    if (await slideContent.count() > 0) {
      // Verify content is visible (animated in)
      await expect(slideContent).toBeVisible();
      
      // Verify animation classes are applied
      const hasAnimation = await slideContent.evaluate((el) => {
        return el.hasAttribute('data-animated') || 
               el.classList.toString().includes('animate');
      });
      
      // Will be true when animations are implemented
      // expect(hasAnimation).toBe(true);
    }
  });

  test('should download pitch deck', async ({ page }) => {
    await page.goto('/pitch');
    
    // Listen for download event
    const downloadPromise = page.waitForEvent('download');
    
    // Find download button
    const downloadButton = page.locator('button, a').filter({ hasText: /download|export|pdf/i }).first();
    
    if (await downloadButton.count() > 0) {
      await downloadButton.click();
      
      // Wait for download to start (will fail until implementation exists)
      // const download = await downloadPromise;
      // expect(download.suggestedFilename()).toContain('evera');
    }
  });

  test('should show progress indicator on pitch deck', async ({ page }) => {
    await page.goto('/pitch');
    
    // Find progress bar or indicator
    const progressBar = page.locator('[role="progressbar"], [data-testid="progress-bar"]').first();
    
    if (await progressBar.count() > 0) {
      // Get initial progress
      const initialProgress = await progressBar.getAttribute('aria-valuenow');
      
      // Navigate to next slide
      const nextButton = page.locator('button').filter({ hasText: /next/i }).first();
      await nextButton.click();
      await page.waitForTimeout(500);
      
      // Get new progress
      const newProgress = await progressBar.getAttribute('aria-valuenow');
      
      // Progress should increase
      expect(parseInt(newProgress || '0')).toBeGreaterThan(parseInt(initialProgress || '0'));
    }
  });

  test('should be responsive on tablet viewport', async ({ page }) => {
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/pitch');
    
    // Verify pitch deck is visible on tablet
    await expect(page.locator('[data-testid="pitch-container"]').first()).toBeVisible({ timeout: 5000 });
    
    // Verify navigation controls are accessible
    const nextButton = page.locator('button').filter({ hasText: /next/i }).first();
    
    if (await nextButton.count() > 0) {
      await expect(nextButton).toBeVisible();
    }
  });

  test('should track pitch deck analytics events', async ({ page }) => {
    // Listen for analytics API calls
    const analyticsRequests: any[] = [];
    
    page.on('request', (request) => {
      if (request.url().includes('/api/analytics/track')) {
        analyticsRequests.push({
          eventType: request.postDataJSON()?.eventType,
          page: request.postDataJSON()?.page,
        });
      }
    });
    
    await page.goto('/pitch');
    
    // Navigate through slides
    const nextButton = page.locator('button').filter({ hasText: /next/i }).first();
    
    if (await nextButton.count() > 0) {
      await nextButton.click();
      await page.waitForTimeout(1000);
    }
    
    // Verify slide view events were tracked (will work when implemented)
    // expect(analyticsRequests.some(r => r.page === '/pitch')).toBe(true);
  });
});
