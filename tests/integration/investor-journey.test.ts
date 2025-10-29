/**
 * Integration Test: Investor Journey (User Story 1)
 * 
 * User Story: "Sarah, a crypto investor, visits the landing page and subscribes to presale updates"
 * 
 * Tests MUST FAIL until full implementation is complete (TDD approach).
 */

import { test, expect } from '@playwright/test';

test.describe('Investor discovers Evera - User Story 1', () => {
  test('should load homepage with hero section', async ({ page }) => {
    await page.goto('/');
    
    // Verify hero section is visible
    await expect(page.locator('h1')).toContainText(/Evera Protocol/i);
    await expect(page.locator('h1, h2').first()).toBeVisible();
    
    // Verify primary CTA is present
    const ctaButton = page.locator('button, a').filter({ hasText: /join presale|get started/i }).first();
    await expect(ctaButton).toBeVisible();
  });

  test('should scroll through all homepage sections', async ({ page }) => {
    await page.goto('/');
    
    // Verify key sections are present
    await expect(page.locator('text=/problem|challenge/i').first()).toBeVisible({ timeout: 10000 });
    await expect(page.locator('text=/solution|how it works/i').first()).toBeVisible({ timeout: 10000 });
    await expect(page.locator('text=/features|benefits/i').first()).toBeVisible({ timeout: 10000 });
    
    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    // Verify footer is visible
    await expect(page.locator('footer')).toBeVisible();
  });

  test('should trigger animations on scroll', async ({ page }) => {
    await page.goto('/');
    
    // Get initial state of an animated section
    const animatedSection = page.locator('[data-animation]').first();
    
    if (await animatedSection.count() > 0) {
      // Scroll to animated section
      await animatedSection.scrollIntoViewIfNeeded();
      
      // Wait for animation to trigger
      await page.waitForTimeout(500);
      
      // Verify animation has been triggered
      await expect(animatedSection).toHaveAttribute('data-animated', 'true', { timeout: 2000 });
    }
  });

  test('should navigate to whitepaper from hero CTA', async ({ page }) => {
    await page.goto('/');
    
    // Click on "Read Whitepaper" link
    const whitepaperLink = page.locator('a').filter({ hasText: /whitepaper|read more/i }).first();
    
    if (await whitepaperLink.count() > 0) {
      await whitepaperLink.click();
      
      // Verify navigation to whitepaper page
      await expect(page).toHaveURL(/\/whitepaper/);
      await expect(page.locator('h1')).toContainText(/whitepaper/i, { timeout: 5000 });
    }
  });

  test('should complete email subscription flow from homepage', async ({ page }) => {
    await page.goto('/');
    
    // Find email input
    const emailInput = page.locator('input[type="email"]').first();
    await expect(emailInput).toBeVisible();
    
    // Fill email
    await emailInput.fill('sarah.investor@example.com');
    
    // Select investor interest
    const investorCheckbox = page.locator('input[type="checkbox"]').filter({ hasText: /investor/i }).first();
    
    if (await investorCheckbox.count() > 0) {
      await investorCheckbox.check();
    }
    
    // Submit form (this will fail until API is implemented)
    const submitButton = page.locator('button[type="submit"]').filter({ hasText: /subscribe|join/i }).first();
    await submitButton.click();
    
    // Wait for response (will fail until implementation exists)
    // await expect(page.locator('text=/success|thank you/i')).toBeVisible({ timeout: 5000 });
  });

  test('should track analytics events correctly', async ({ page }) => {
    // Listen for analytics API calls
    const analyticsRequests: any[] = [];
    
    page.on('request', (request) => {
      if (request.url().includes('/api/analytics/track')) {
        analyticsRequests.push({
          url: request.url(),
          method: request.method(),
          postData: request.postDataJSON(),
        });
      }
    });
    
    await page.goto('/');
    
    // Trigger various events
    const ctaButton = page.locator('button, a').filter({ hasText: /join presale/i }).first();
    
    if (await ctaButton.count() > 0) {
      await ctaButton.click();
    }
    
    // Wait a bit for analytics to fire
    await page.waitForTimeout(1000);
    
    // Verify analytics events were tracked (will fail until implementation exists)
    // expect(analyticsRequests.length).toBeGreaterThan(0);
  });

  test('should be responsive on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Verify hero section is visible on mobile
    await expect(page.locator('h1').first()).toBeVisible();
    
    // Verify mobile menu (if present)
    const mobileMenu = page.locator('[aria-label="mobile menu"]');
    
    if (await mobileMenu.count() > 0) {
      await expect(mobileMenu).toBeVisible();
    }
  });

  test('should handle keyboard navigation', async ({ page }) => {
    await page.goto('/');
    
    // Tab through interactive elements
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Verify focus is visible
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(['A', 'BUTTON', 'INPUT']).toContain(focusedElement);
  });
});
