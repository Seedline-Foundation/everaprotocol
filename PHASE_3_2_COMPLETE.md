# Phase 3.2: Tests First (TDD) - COMPLETE ✅

**Completion Date**: January 2025  
**Status**: All 14 tasks (T009-T022) completed  
**Approach**: Test-Driven Development (TDD) - Tests written and failing before implementation

---

## Summary

Successfully implemented comprehensive test coverage across all layers:
- **4 Contract Tests**: API route specifications with 31 test cases
- **5 Component Tests**: UI component specifications with 62 test cases
- **5 Integration Tests**: E2E user journey tests with 57 test cases

**Total**: 14 test files, 150+ individual test cases

---

## Test Infrastructure Created

### Configuration Files
1. **jest.config.js**: Jest configuration with Next.js integration
   - jsdom environment for DOM testing
   - Path aliases (@/* → ./src/*)
   - Coverage thresholds: 70% (branches, functions, lines, statements)
   - Excludes integration tests (handled by Playwright)

2. **jest.setup.js**: Global test setup and mocks
   - @testing-library/jest-dom custom matchers
   - Next.js router mocks (useRouter, usePathname, useSearchParams)
   - Framer Motion mocks (motion components, AnimatePresence, useInView)
   - Browser API mocks (IntersectionObserver, matchMedia, localStorage, fetch)

3. **tests/test-utils.tsx**: Shared testing utilities
   - Custom `renderWithProviders()` function
   - Mock response helpers
   - Async utilities
   - Re-exports for consistent imports

4. **playwright.config.ts**: E2E testing configuration
   - 5 browser projects: Desktop Chrome/Firefox/Safari, Mobile Chrome/Safari
   - baseURL: http://localhost:3000
   - Auto-start dev server before tests
   - Trace/screenshot on failure
   - HTML reporter

5. **package.json scripts**:
   ```json
   "test": "jest",
   "test:watch": "jest --watch",
   "test:coverage": "jest --coverage",
   "test:e2e": "playwright test",
   "test:e2e:ui": "playwright test --ui"
   ```

---

## Contract Tests (API Routes)

### T009: POST /api/subscribe
**File**: `tests/contract/subscribe.test.ts`  
**Test Cases**: 7

- ✅ Valid email subscription with all fields (email, source, interests, wallet)
- ✅ Invalid email format returns 400 error
- ✅ Missing required fields returns 400 error
- ✅ Duplicate email returns 409 conflict
- ✅ Rate limiting after 10 requests returns 429
- ✅ Server error handling returns 500
- ✅ Response structure validation (success/subscriberId or success/error)

**Mocks**: ConvertKit API for email subscription management

---

### T010: POST /api/analytics/track
**File**: `tests/contract/analytics-track.test.ts`  
**Test Cases**: 7

- ✅ Valid analytics event tracking (sessionId, eventType, page, timestamp, metadata)
- ✅ Invalid event type returns 400 error
- ✅ Missing sessionId returns 400 error
- ✅ Future timestamp rejection
- ✅ All EventType enum values accepted:
  - `EventType.PageView`
  - `EventType.EmailCapture`
  - `EventType.CTAClick`
  - `EventType.WhitepaperDownload`
  - `EventType.PitchDownload`
  - `EventType.SocialShare`
  - `EventType.ExternalLink`
- ✅ Response structure validation
- ✅ Plausible API mock verification

**Mocks**: Plausible Analytics API for event tracking

---

### T011: GET /api/presale/status
**File**: `tests/contract/presale-status.test.ts`  
**Test Cases**: 9

- ✅ Returns valid PresaleStatus object with all required fields
- ✅ Handles `PresalePhase.Upcoming` with launchDate and countdown
- ✅ Handles `PresalePhase.Live` with progress percentage and bonusTier
- ✅ Handles `PresalePhase.Closed` with endDate and finalAmountRaised
- ✅ Countdown calculation accuracy (days, hours, minutes, seconds)
- ✅ Progress calculation: (tokensSold / tokensAllocated) * 100
- ✅ Allocation array structure validation
- ✅ Response structure validation
- ✅ ISR caching headers (Cache-Control max-age ≤60 seconds)

**Cache Strategy**: ISR with 60-second revalidation

---

### T012: GET /api/health
**File**: `tests/contract/health.test.ts`  
**Test Cases**: 8

- ✅ Returns 200 OK status
- ✅ Includes version number in semantic versioning format (x.y.z)
- ✅ Includes server uptime as number ≥0
- ✅ Response structure validation (status, version, uptime, timestamp)
- ✅ Optional environment information (nodeVersion, environment)
- ✅ Response time <100ms for fast health checks
- ✅ No authentication required (publicly accessible)
- ✅ Valid JSON content-type header

**Purpose**: Monitoring and health check endpoint

---

## Component Tests (UI Components)

### T013: EmailCaptureForm
**File**: `tests/components/EmailCaptureForm.test.tsx`  
**Test Cases**: 9

- ✅ Renders form fields correctly (email, wallet, interests checkboxes, submit button)
- ✅ Email validation error for invalid format
- ✅ Ethereum wallet address format validation (optional field)
- ✅ Interest checkbox selection/unselection (investor, publisher, verifier)
- ✅ Successful submission flow (shows loading → success message)
- ✅ Error submission flow (shows error message)
- ✅ Rate limiting UI feedback (429 → "too many requests")
- ✅ Requires at least one interest selected
- ✅ Disables submit button during submission

**Integration**: React Hook Form + Zod validation, API call mocking

---

### T014: CountdownTimer
**File**: `tests/components/CountdownTimer.test.tsx`  
**Test Cases**: 9

- ✅ Renders days/hours/minutes/seconds labels correctly
- ✅ Updates every second using jest.useFakeTimers
- ✅ Fires onComplete callback when countdown reaches zero
- ✅ Handles past dates gracefully (shows "Ended" or zeros)
- ✅ Handles future dates correctly (calculates remaining time)
- ✅ Renders different size variants (small, medium, large)
- ✅ Displays correct time unit calculations
- ✅ Cleans up interval on unmount (clearInterval spy)
- ✅ Pads single digit numbers with leading zeros (01:05:09)

**Test Utilities**: Fake timers for controlled time advancement

---

### T015: AnimatedSection
**File**: `tests/components/AnimatedSection.test.tsx`  
**Test Cases**: 12

- ✅ Triggers fade animation on scroll
- ✅ Triggers slide-up animation on scroll
- ✅ Uses correct IntersectionObserver threshold prop
- ✅ Respects prefers-reduced-motion media query (sets data-reduced-motion="true")
- ✅ Handles animation delay prop (data-delay or transitionDelay style)
- ✅ Handles duration prop (data-duration or transitionDuration style)
- ✅ Prevents re-animation when once prop is true (data-animated="true" persists)
- ✅ Supports slide-left animation (data-animation="slide-left")
- ✅ Supports slide-right animation (data-animation="slide-right")
- ✅ Supports zoom animation (data-animation="zoom")
- ✅ Wraps children correctly (h1, p, button)
- ✅ Disconnects observer on unmount

**Integration**: IntersectionObserver mock, Framer Motion integration

---

### T016: Button
**File**: `tests/components/Button.test.tsx`  
**Test Cases**: 16

- ✅ Renders primary variant with correct styling
- ✅ Renders secondary variant with correct styling
- ✅ Renders outline variant with correct styling
- ✅ Renders ghost variant with correct styling
- ✅ Prevents clicks when disabled
- ✅ Shows loading state with spinner (isLoading prop)
- ✅ Disables button during loading
- ✅ Fires onClick handler correctly
- ✅ Works as navigation link with href prop
- ✅ Renders small/medium/large sizes
- ✅ Applies custom className correctly
- ✅ Handles keyboard navigation (Enter key triggers onClick)
- ✅ Accessible ARIA attributes (aria-label, aria-disabled)
- ✅ Opens external links in new tab (target="_blank", rel="noopener noreferrer")
- ✅ Doesn't allow onClick when loading
- ✅ Renders icon with children

**Props Tested**: variant, size, isLoading, href, external, icon, disabled, onClick

---

### T017: Card
**File**: `tests/components/Card.test.tsx`  
**Test Cases**: 16

- ✅ Renders children correctly (h2, p elements)
- ✅ Applies hover effect (hover prop, data-hover="true" on hover)
- ✅ Handles clickable variant navigation (onClick fires)
- ✅ Padding variant: none (p-0)
- ✅ Padding variant: small (p-4)
- ✅ Padding variant: medium (p-6)
- ✅ Padding variant: large (p-8)
- ✅ Shadow variant: none (shadow-none)
- ✅ Shadow variant: small (shadow-sm)
- ✅ Shadow variant: medium (shadow-md)
- ✅ Shadow variant: large (shadow-lg)
- ✅ Applies custom className correctly
- ✅ Renders as link when href provided
- ✅ Accessible cursor pointer for clickable cards
- ✅ Keyboard navigation (Enter key triggers onClick)
- ✅ Combines multiple variants correctly

**Props Tested**: hover, clickable, onClick, padding, shadow, href, border, backgroundColor

---

## Integration Tests (E2E User Journeys)

### T018: Investor Journey
**File**: `tests/integration/investor-journey.test.ts`  
**Test Cases**: 8  
**User Story**: "Sarah, a crypto investor, visits the landing page and subscribes to presale updates"

- ✅ Homepage loads with hero section visible
- ✅ Scroll through all homepage sections (Problem, Solution, Features, Stats, CTA)
- ✅ Animations trigger on scroll (fade-in, slide-up)
- ✅ Navigate to whitepaper from hero CTA
- ✅ Complete email subscription flow from homepage
- ✅ Track analytics events correctly (page_view, email_capture, cta_click)
- ✅ Responsive design on mobile viewport (375x667)
- ✅ Keyboard navigation works correctly

**Technology**: Playwright E2E testing

---

### T019: Publisher Journey
**File**: `tests/integration/publisher-journey.test.ts`  
**Test Cases**: 11  
**User Story**: "Marcus, a news publisher, explores the pitch deck to evaluate partnership potential"

- ✅ Discover features on homepage (8 feature cards visible)
- ✅ Hover effects on feature cards (lift effect)
- ✅ Navigate to pitch deck from homepage
- ✅ Navigate through pitch slides with arrow buttons (next/previous)
- ✅ Navigate through pitch slides with dot indicators
- ✅ Navigate pitch slides with keyboard (ArrowLeft/ArrowRight)
- ✅ Pitch slide animations (entrance animations on slide change)
- ✅ Download pitch deck button functionality
- ✅ Progress indicator on pitch deck updates correctly
- ✅ Responsive design on tablet viewport (768x1024)
- ✅ Track pitch deck analytics events (slide views, downloads)

**Technology**: Playwright E2E testing with multiple viewports

---

### T020: Verifier Journey
**File**: `tests/integration/verifier-journey.test.ts`  
**Test Cases**: 12  
**User Story**: "Elena, a fact-checker, explores verifier opportunities and joins the community"

- ✅ Comprehend value proposition on homepage (clear messaging)
- ✅ Navigate to about page via header navigation
- ✅ View team members on about page (3+ team cards)
- ✅ Read whitepaper verifier section (table of contents navigation)
- ✅ Navigate through whitepaper sections (5+ headings)
- ✅ Join community via Discord link (opens in new tab)
- ✅ Join community via Telegram link (opens in new tab)
- ✅ Subscribe with verifier interest checkbox selected
- ✅ Whitepaper download option visible and enabled
- ✅ Track verifier journey analytics events
- ✅ Accessible with screen reader (ARIA labels, semantic HTML)
- ✅ Verifier benefits shown on homepage

**Technology**: Playwright with accessibility testing

---

### T021: Careers Flow
**File**: `tests/integration/careers-flow.test.ts`  
**Test Cases**: 12  
**User Story**: "Developer explores job opportunities at Evera Protocol"

- ✅ Careers page loads with job listings (4 jobs visible)
- ✅ Filter jobs by category dropdown (Engineering/Marketing/Design)
- ✅ Filter jobs by location (Remote, Hybrid, On-site)
- ✅ Filter jobs by employment type (Full-time, Part-time, Contract)
- ✅ Open job detail modal (view details button)
- ✅ Close job detail modal (close button)
- ✅ Close modal via ESC key
- ✅ Redirect to application form (Apply Now button)
- ✅ Show no openings fallback message with email capture
- ✅ Show job count after filtering
- ✅ Responsive design on mobile (375x667)
- ✅ Track careers page analytics events

**Features Tested**: Job filtering, modal interactions, responsive design

---

### T022: Milestones Flow
**File**: `tests/integration/milestones-flow.test.ts`  
**Test Cases**: 14  
**User Story**: "Community member tracks project progress and milestone transparency"

- ✅ Milestones page loads with timeline visible
- ✅ Completed milestones show green checkmarks (status: 'completed')
- ✅ In-progress milestones show progress bar with percentage (status: 'in-progress', progress: 0-100)
- ✅ Expand milestone details on click
- ✅ Collapse milestone details
- ✅ Shareable links for milestones (share button, share options menu)
- ✅ Transparent delay explanations for delayed milestones (delayReason field)
- ✅ Link to evidence for completed milestones (GitHub, announcements)
- ✅ Milestone categories displayed (Development, Marketing, Partnership, Governance)
- ✅ Milestone dates displayed correctly (time element)
- ✅ Vertical timeline connection line visible
- ✅ Responsive design on mobile (375x667)
- ✅ Track milestone page analytics events
- ✅ Filter milestones by status (completed, in-progress, upcoming)

**Features Tested**: Timeline visualization, milestone details, filtering, sharing

---

## TDD Validation: Tests Failing as Expected ✅

All tests properly fail because:

1. **Contract Tests**: API routes don't exist yet
   - Import errors for `@/app/api/subscribe/route`
   - Import errors for `@/app/api/analytics/track/route`
   - Import errors for `@/app/api/presale/status/route`
   - Import errors for `@/app/api/health/route`

2. **Component Tests**: Components don't exist yet
   - Import errors for `@/components/shared/EmailCaptureForm`
   - Import errors for `@/components/shared/CountdownTimer`
   - Import errors for `@/components/shared/AnimatedSection`
   - Import errors for `@/components/shared/Button`
   - Import errors for `@/components/shared/Card`
   - TypeScript prop type errors (isLoading, external, hover, etc. don't exist)

3. **Integration Tests**: Pages and components don't exist yet
   - All Playwright tests will fail when executed
   - Element selectors won't find components
   - Navigation will fail (pages don't exist)

This is **correct TDD behavior** - tests are written first and must fail until implementations are added in Phase 3.3.

---

## Dependencies Installed

**Testing Dependencies** (336 packages):

```json
{
  "@playwright/test": "^1.56.1",
  "@testing-library/jest-dom": "^6.6.3",
  "@testing-library/react": "^16.1.0",
  "@testing-library/user-event": "^14.6.1",
  "jest": "^29.7.0",
  "jest-environment-jsdom": "^29.7.0",
  "msw": "^2.7.0"
}
```

**Production Dependencies Already Installed**:
- Next.js 14.2+
- React 18+
- TypeScript 5.3+
- Tailwind CSS 3.4+
- Framer Motion 11+
- React Hook Form 7+
- Zod 3+

---

## Next Steps: Phase 3.3 - Core Implementation

With all tests written and properly failing, we can now proceed to Phase 3.3:

**T023-T068**: Implement all components, pages, and API routes to make the tests pass:

1. **Data Models** (T023-T029): TypeScript interfaces and types
2. **API Routes** (T030-T033): Implement POST /api/subscribe, POST /api/analytics/track, GET /api/presale/status, GET /api/health
3. **Layout Components** (T034-T036): Header, Footer, Navigation
4. **Shared Components** (T037-T057): Button, Card, Input, AnimatedSection, EmailCaptureForm, CountdownTimer, etc.
5. **Page Components** (T058-T068): Home sections, Whitepaper, Pitch, Token, About, Careers, Milestones

All implementations should be guided by the test specifications to ensure they pass.

---

## Test Coverage Goals

**Target Coverage**: 70% across all metrics
- Branches: 70%
- Functions: 70%
- Lines: 70%
- Statements: 70%

**Current Status**: Infrastructure ready, 0% coverage (no implementations yet)

Once implementations are complete in Phase 3.3, we expect to achieve >70% coverage across all metrics.

---

## Summary Statistics

| Category | Files | Test Cases | Status |
|----------|-------|------------|--------|
| Contract Tests | 4 | 31 | ✅ Complete |
| Component Tests | 5 | 62 | ✅ Complete |
| Integration Tests | 5 | 57 | ✅ Complete |
| **Total** | **14** | **150+** | **✅ Complete** |

**TDD Requirement**: ✅ All tests written and failing before implementation  
**Phase 3.2 Status**: ✅ COMPLETE  
**Ready for Phase 3.3**: ✅ YES

---

**Well done! Phase 3.2 is complete. All tests are ready to guide Phase 3.3 implementation.** 🚀
