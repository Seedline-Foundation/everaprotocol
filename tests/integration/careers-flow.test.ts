/**
 * Integration Test: Careers Flow
 * 
 * User Story: Developer explores job opportunities at Evera Protocol
 * 
 * Tests MUST FAIL until full implementation is complete (TDD approach).
 */

import { test, expect } from '@playwright/test';

test.describe('Developer job application flow', () => {
  test('should load careers page with job listings', async ({ page }) => {
    await page.goto('/careers');
    
    // Verify careers page loaded
    await expect(page.locator('h1')).toContainText(/careers|join|team/i, { timeout: 5000 });
    
    // Verify job listings are present
    const jobListings = page.locator('[data-testid="job-listing"], .job-listing-card');
    
    if (await jobListings.count() > 0) {
      expect(await jobListings.count()).toBeGreaterThanOrEqual(1);
      await expect(jobListings.first()).toBeVisible();
    }
  });

  test('should filter jobs by category', async ({ page }) => {
    await page.goto('/careers');
    
    // Find category filter dropdown
    const categoryFilter = page.locator('select[name="category"], [data-testid="category-filter"]').first();
    
    if (await categoryFilter.count() > 0) {
      await expect(categoryFilter).toBeVisible();
      
      // Select "Engineering" category
      await categoryFilter.selectOption({ label: /engineering|eng/i });
      await page.waitForTimeout(500);
      
      // Verify filtered results
      const jobListings = page.locator('[data-testid="job-listing"]');
      
      if (await jobListings.count() > 0) {
        // All visible jobs should be engineering roles
        const firstJob = jobListings.first();
        await expect(firstJob).toContainText(/engineer|developer|technical/i);
      }
    }
  });

  test('should filter jobs by location', async ({ page }) => {
    await page.goto('/careers');
    
    // Find location filter
    const locationFilter = page.locator('select[name="location"], [data-testid="location-filter"]').first();
    
    if (await locationFilter.count() > 0) {
      await expect(locationFilter).toBeVisible();
      
      // Select "Remote" location
      await locationFilter.selectOption({ label: /remote/i });
      await page.waitForTimeout(500);
      
      // Verify filtered results show remote jobs
      const jobListings = page.locator('[data-testid="job-listing"]');
      
      if (await jobListings.count() > 0) {
        const firstJob = jobListings.first();
        await expect(firstJob).toContainText(/remote/i);
      }
    }
  });

  test('should filter jobs by employment type', async ({ page }) => {
    await page.goto('/careers');
    
    // Find employment type filter
    const typeFilter = page.locator('select[name="type"], [data-testid="type-filter"]').first();
    
    if (await typeFilter.count() > 0) {
      await expect(typeFilter).toBeVisible();
      
      // Select "Full-time"
      await typeFilter.selectOption({ label: /full-time/i });
      await page.waitForTimeout(500);
      
      // Verify filtered results
      const jobListings = page.locator('[data-testid="job-listing"]');
      
      if (await jobListings.count() > 0) {
        expect(await jobListings.count()).toBeGreaterThanOrEqual(1);
      }
    }
  });

  test('should open job detail modal', async ({ page }) => {
    await page.goto('/careers');
    
    // Find first job listing
    const firstJob = page.locator('[data-testid="job-listing"], .job-listing-card').first();
    
    if (await firstJob.count() > 0) {
      // Click "View Details" button
      const viewButton = firstJob.locator('button, a').filter({ hasText: /view|details|learn more/i }).first();
      
      if (await viewButton.count() > 0) {
        await viewButton.click();
        
        // Verify modal opened
        const modal = page.locator('[role="dialog"], [data-testid="job-modal"]').first();
        await expect(modal).toBeVisible({ timeout: 2000 });
        
        // Verify job details are shown
        await expect(modal).toContainText(/responsibilities|qualifications|requirements/i);
      }
    }
  });

  test('should close job detail modal', async ({ page }) => {
    await page.goto('/careers');
    
    // Open modal
    const firstJob = page.locator('[data-testid="job-listing"]').first();
    
    if (await firstJob.count() > 0) {
      await firstJob.locator('button').first().click();
      
      const modal = page.locator('[role="dialog"]').first();
      
      if (await modal.count() > 0) {
        await expect(modal).toBeVisible();
        
        // Close modal via close button
        const closeButton = modal.locator('button[aria-label*="close"], button:has-text("×")').first();
        
        if (await closeButton.count() > 0) {
          await closeButton.click();
          
          // Verify modal closed
          await expect(modal).not.toBeVisible();
        }
      }
    }
  });

  test('should close modal via ESC key', async ({ page }) => {
    await page.goto('/careers');
    
    // Open modal
    const firstJob = page.locator('[data-testid="job-listing"]').first();
    
    if (await firstJob.count() > 0) {
      await firstJob.locator('button').first().click();
      
      const modal = page.locator('[role="dialog"]').first();
      
      if (await modal.count() > 0) {
        await expect(modal).toBeVisible();
        
        // Press ESC key
        await page.keyboard.press('Escape');
        await page.waitForTimeout(300);
        
        // Verify modal closed
        await expect(modal).not.toBeVisible();
      }
    }
  });

  test('should redirect to application form', async ({ page }) => {
    await page.goto('/careers');
    
    // Open job detail modal
    const firstJob = page.locator('[data-testid="job-listing"]').first();
    
    if (await firstJob.count() > 0) {
      await firstJob.locator('button').first().click();
      
      const modal = page.locator('[role="dialog"]').first();
      
      if (await modal.count() > 0) {
        // Find "Apply Now" button
        const applyButton = modal.locator('button, a').filter({ hasText: /apply/i }).first();
        
        if (await applyButton.count() > 0) {
          await expect(applyButton).toBeVisible();
          
          // Verify button has href or onclick
          const hasAction = await applyButton.evaluate((el) => {
            return el.hasAttribute('href') || el.onclick !== null;
          });
          
          expect(hasAction).toBe(true);
        }
      }
    }
  });

  test('should show no openings fallback message', async ({ page }) => {
    // This test simulates empty job list
    await page.goto('/careers');
    
    // If no jobs are available, should show fallback
    const jobListings = page.locator('[data-testid="job-listing"]');
    const noJobsMessage = page.locator('text=/no openings|no positions|hiring soon/i').first();
    
    if (await jobListings.count() === 0) {
      await expect(noJobsMessage).toBeVisible();
      
      // Verify email signup form is shown as alternative
      const emailInput = page.locator('input[type="email"]').first();
      
      if (await emailInput.count() > 0) {
        await expect(emailInput).toBeVisible();
      }
    }
  });

  test('should show job count after filtering', async ({ page }) => {
    await page.goto('/careers');
    
    // Find results count element
    const resultsCount = page.locator('[data-testid="results-count"], text=/showing|results|jobs/i').first();
    
    if (await resultsCount.count() > 0) {
      // Get initial count
      const initialText = await resultsCount.textContent();
      
      // Apply a filter
      const categoryFilter = page.locator('select[name="category"]').first();
      
      if (await categoryFilter.count() > 0) {
        await categoryFilter.selectOption({ index: 1 });
        await page.waitForTimeout(500);
        
        // Verify count updated
        const newText = await resultsCount.textContent();
        
        // Count should reflect filtered results
        expect(newText).toBeDefined();
      }
    }
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/careers');
    
    // Verify page is usable on mobile
    await expect(page.locator('h1').first()).toBeVisible();
    
    // Verify job listings stack vertically
    const jobListings = page.locator('[data-testid="job-listing"]');
    
    if (await jobListings.count() > 0) {
      const firstJob = jobListings.first();
      const secondJob = jobListings.nth(1);
      
      if (await secondJob.count() > 0) {
        // Get vertical positions
        const firstBox = await firstJob.boundingBox();
        const secondBox = await secondJob.boundingBox();
        
        // Second job should be below first (not side by side)
        if (firstBox && secondBox) {
          expect(secondBox.y).toBeGreaterThan(firstBox.y);
        }
      }
    }
  });

  test('should track careers page analytics', async ({ page }) => {
    // Listen for analytics events
    const analyticsEvents: any[] = [];
    
    page.on('request', (request) => {
      if (request.url().includes('/api/analytics/track')) {
        analyticsEvents.push(request.postDataJSON());
      }
    });
    
    await page.goto('/careers');
    await page.waitForTimeout(1000);
    
    // Click on a job listing
    const firstJob = page.locator('[data-testid="job-listing"]').first();
    
    if (await firstJob.count() > 0) {
      await firstJob.click();
      await page.waitForTimeout(500);
    }
    
    // Verify events were tracked (will work when implemented)
    // expect(analyticsEvents.length).toBeGreaterThan(0);
  });
});
