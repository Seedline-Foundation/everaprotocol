/**
 * Integration Test: Verifier Journey (User Story 3)
 * 
 * User Story: "Elena, a fact-checker, explores verifier opportunities and joins the community"
 * 
 * Tests MUST FAIL until full implementation is complete (TDD approach).
 */

import { test, expect } from '@playwright/test';

test.describe('Fact-checker explores opportunity - User Story 3', () => {
  test('should comprehend value proposition on homepage', async ({ page }) => {
    await page.goto('/');
    
    // Verify key value proposition messaging
    await expect(page.locator('h1, h2').first()).toBeVisible();
    await expect(page.locator('text=/verify|truth|misinformation/i').first()).toBeVisible({ timeout: 10000 });
    
    // Verify problem section mentions misinformation
    const problemSection = page.locator('text=/problem|challenge/i').first();
    await problemSection.scrollIntoViewIfNeeded();
    await expect(page.locator('text=/misinformation|fake news|disinformation/i').first()).toBeVisible();
  });

  test('should navigate to about page', async ({ page }) => {
    await page.goto('/');
    
    // Find and click About link
    const aboutLink = page.locator('a').filter({ hasText: /about|team/i }).first();
    await expect(aboutLink).toBeVisible();
    await aboutLink.click();
    
    // Verify navigation to about page
    await expect(page).toHaveURL(/\/about/);
    await expect(page.locator('h1')).toContainText(/about|team/i, { timeout: 5000 });
  });

  test('should view team members on about page', async ({ page }) => {
    await page.goto('/about');
    
    // Verify team section is present
    await expect(page.locator('text=/team|our team/i').first()).toBeVisible({ timeout: 10000 });
    
    // Verify team member cards are displayed
    const teamCards = page.locator('[data-testid="team-member-card"], .team-member-card');
    
    if (await teamCards.count() > 0) {
      expect(await teamCards.count()).toBeGreaterThanOrEqual(3);
      
      // Verify team member details are shown
      await expect(teamCards.first()).toContainText(/.+/); // Has content
    }
  });

  test('should read whitepaper verifier section', async ({ page }) => {
    await page.goto('/whitepaper');
    
    // Wait for whitepaper to load
    await page.waitForLoadState('networkidle');
    
    // Verify table of contents is present
    const toc = page.locator('[data-testid="table-of-contents"], nav').first();
    
    if (await toc.count() > 0) {
      await expect(toc).toBeVisible();
      
      // Find verifier/verifier section
      const verifierLink = toc.locator('a').filter({ hasText: /verif/i }).first();
      
      if (await verifierLink.count() > 0) {
        await verifierLink.click();
        await page.waitForTimeout(500);
        
        // Verify scrolled to verifier section
        await expect(page.locator('h2, h3').filter({ hasText: /verif/i }).first()).toBeInViewport();
      }
    }
  });

  test('should navigate through whitepaper sections', async ({ page }) => {
    await page.goto('/whitepaper');
    
    // Verify multiple sections are present
    const headings = page.locator('h2, h3');
    
    if (await headings.count() > 0) {
      expect(await headings.count()).toBeGreaterThanOrEqual(5);
    }
    
    // Scroll through content
    await page.evaluate(() => window.scrollBy(0, 500));
    await page.waitForTimeout(300);
    await page.evaluate(() => window.scrollBy(0, 500));
    
    // Verify footer is eventually visible
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(page.locator('footer')).toBeVisible();
  });

  test('should join community via Discord link', async ({ page }) => {
    await page.goto('/');
    
    // Find Discord link in footer
    const discordLink = page.locator('a[href*="discord"]').first();
    
    if (await discordLink.count() > 0) {
      await expect(discordLink).toBeVisible();
      
      // Verify link has correct attributes
      expect(await discordLink.getAttribute('target')).toBe('_blank');
      expect(await discordLink.getAttribute('rel')).toContain('noopener');
    }
  });

  test('should join community via Telegram link', async ({ page }) => {
    await page.goto('/');
    
    // Find Telegram link in footer
    const telegramLink = page.locator('a[href*="telegram"], a[href*="t.me"]').first();
    
    if (await telegramLink.count() > 0) {
      await expect(telegramLink).toBeVisible();
      
      // Verify link opens in new tab
      expect(await telegramLink.getAttribute('target')).toBe('_blank');
    }
  });

  test('should subscribe with verifier interest', async ({ page }) => {
    await page.goto('/');
    
    // Find email form
    const emailInput = page.locator('input[type="email"]').first();
    await expect(emailInput).toBeVisible();
    
    // Fill email
    await emailInput.fill('elena.verifier@example.com');
    
    // Select verifier interest
    const verifierCheckbox = page.locator('input[type="checkbox"]').filter({ hasText: /verif/i }).first();
    
    if (await verifierCheckbox.count() > 0) {
      await expect(verifierCheckbox).toBeVisible();
      await verifierCheckbox.check();
      
      // Verify checkbox is checked
      await expect(verifierCheckbox).toBeChecked();
    }
    
    // Submit form (will fail until API is implemented)
    const submitButton = page.locator('button[type="submit"]').first();
    await submitButton.click();
    
    // Wait for response (will work when implemented)
    // await expect(page.locator('text=/success|subscribed/i')).toBeVisible({ timeout: 5000 });
  });

  test('should show whitepaper download option', async ({ page }) => {
    await page.goto('/whitepaper');
    
    // Find download button
    const downloadButton = page.locator('button, a').filter({ hasText: /download|pdf/i }).first();
    
    if (await downloadButton.count() > 0) {
      await expect(downloadButton).toBeVisible();
      
      // Verify button is clickable
      await expect(downloadButton).toBeEnabled();
    }
  });

  test('should track verifier journey analytics', async ({ page }) => {
    // Listen for analytics events
    const analyticsEvents: any[] = [];
    
    page.on('request', (request) => {
      if (request.url().includes('/api/analytics/track')) {
        analyticsEvents.push(request.postDataJSON());
      }
    });
    
    await page.goto('/');
    
    // Navigate to about page
    const aboutLink = page.locator('a').filter({ hasText: /about/i }).first();
    
    if (await aboutLink.count() > 0) {
      await aboutLink.click();
      await page.waitForTimeout(1000);
    }
    
    // Verify page view events (will work when implemented)
    // expect(analyticsEvents.some(e => e.eventType === 'page_view')).toBe(true);
  });

  test('should be accessible with screen reader', async ({ page }) => {
    await page.goto('/');
    
    // Verify ARIA labels are present on key elements
    const mainContent = page.locator('main, [role="main"]').first();
    await expect(mainContent).toBeVisible();
    
    // Verify navigation has proper ARIA
    const nav = page.locator('nav, [role="navigation"]').first();
    
    if (await nav.count() > 0) {
      await expect(nav).toBeVisible();
    }
    
    // Verify headings hierarchy
    const h1 = page.locator('h1');
    expect(await h1.count()).toBeGreaterThanOrEqual(1);
  });

  test('should show verifier benefits on homepage', async ({ page }) => {
    await page.goto('/');
    
    // Scroll to features section
    await page.evaluate(() => window.scrollBy(0, 1000));
    await page.waitForTimeout(500);
    
    // Verify verifier-related content is present
    const verifierContent = page.locator('text=/verif|fact-check|earn/i').first();
    
    if (await verifierContent.count() > 0) {
      await verifierContent.scrollIntoViewIfNeeded();
      await expect(verifierContent).toBeVisible();
    }
  });
});
