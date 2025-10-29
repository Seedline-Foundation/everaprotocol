# Content Update Guide

This guide is for non-technical team members who need to update website content without touching code.

## 📋 Table of Contents

- [Overview](#overview)
- [Team Members](#team-members)
- [Navigation Links](#navigation-links)
- [Homepage Features](#homepage-features)
- [Milestones & Roadmap](#milestones--roadmap)
- [Job Listings](#job-listings)
- [Presale Configuration](#presale-configuration)
- [Social Media Links](#social-media-links)

---

## 🎯 Overview

All website content is stored in files inside `src/content/` directory. These files use TypeScript but are structured as simple lists of data objects that you can edit.

### Before You Start

1. **Find the file**: Locate the content file you need to edit (see sections below)
2. **Make changes**: Edit the data following the examples
3. **Save the file**: File extension should remain `.ts`
4. **Test locally** (optional): Run `pnpm dev` to preview changes
5. **Commit changes**: Push to GitHub to deploy

---

## 👥 Team Members

**File:** `src/content/team.ts`

### Add a New Team Member

```typescript
{
  id: 'new-member',
  name: 'Jane Smith',
  role: 'Head of Marketing',
  bio: 'Jane leads our marketing efforts with 10+ years experience in blockchain marketing.',
  avatar: '/images/team/jane-smith.jpg',  // Upload image first
  social: {
    twitter: 'https://twitter.com/janesmith',
    linkedin: 'https://linkedin.com/in/janesmith',
    github: 'https://github.com/janesmith',  // Optional
  },
}
```

### Update Existing Team Member

Find the team member by `id` and edit their information:

```typescript
{
  id: 'john-doe',
  name: 'John Doe',
  role: 'NEW ROLE HERE',  // Update this
  bio: 'NEW BIO HERE',    // Update this
  avatar: '/images/team/john-doe.jpg',
  social: {
    twitter: 'https://twitter.com/johndoe',
    linkedin: 'https://linkedin.com/in/johndoe',
  },
}
```

### Remove a Team Member

Delete the entire member object (including curly braces).

---

## 🔗 Navigation Links

**File:** `src/content/navigation.ts`

### Main Navigation

```typescript
export const mainNavigation: NavigationLink[] = [
  { label: 'Whitepaper', href: '/whitepaper' },
  { label: 'Pitch Deck', href: '/pitch' },
  { label: 'Token', href: '/token' },
  { label: 'About', href: '/about' },
  { label: 'Careers', href: '/careers' },
  { label: 'Roadmap', href: '/milestones' },
];
```

**To add a new link:**
```typescript
{ label: 'New Page', href: '/new-page' },
```

**To change link order:** Move the entire line up or down

### Footer Navigation

Similar structure, edit the `footerNavigation` arrays:

```typescript
// Resources column
{ label: 'Documentation', href: '/docs', external: false },

// Community column  
{ label: 'Discord', href: 'https://discord.gg/evera', external: true },
```

**`external: true`** = Opens in new tab

---

## ✨ Homepage Features

**File:** `src/content/features.ts`

### Add a New Feature

```typescript
{
  id: 'new-feature',
  icon: '🆕',  // Use emoji or icon identifier
  title: 'New Feature Title',
  description: 'Brief description of what this feature does and why it matters.',
  benefitsFor: [Interest.Publisher, Interest.Investor],  // Who benefits
  learnMoreUrl: '/whitepaper#new-feature',  // Optional
}
```

### Available Benefit Types

- `Interest.Investor` - For investors
- `Interest.Publisher` - For publishers
- `Interest.Verifier` - For fact-checkers
- `Interest.Developer` - For developers
- `Interest.General` - For everyone

---

## 🗓️ Milestones & Roadmap

**File:** `src/content/milestones.ts`

### Add a New Milestone

```typescript
{
  id: 'q3-2025-launch',
  title: 'Mainnet Launch',
  description: 'Launch Evera Protocol mainnet with full functionality.',
  targetDate: new Date('2025-09-30'),
  status: MilestoneStatus.Planned,  // See status options below
  category: 'development',
  delayExplanation: undefined,  // Only if delayed
  evidenceLinks: [],  // Add when completed
}
```

### Milestone Status Options

```typescript
MilestoneStatus.Completed    // ✅ Finished
MilestoneStatus.InProgress   // 🔄 Currently working on
MilestoneStatus.Planned      // 📅 Future milestone
MilestoneStatus.Delayed      // ⏰ Behind schedule
```

### Mark Milestone as Complete

```typescript
{
  id: 'existing-milestone',
  status: MilestoneStatus.Completed,  // Change this
  evidenceLinks: [
    'https://github.com/evera-protocol/contracts/pull/42',
    'https://etherscan.io/address/0x...',
  ],
}
```

### Add Delay Explanation

```typescript
{
  id: 'delayed-milestone',
  status: MilestoneStatus.Delayed,
  delayExplanation: 'Security audit required additional time to ensure protocol safety.',
}
```

---

## 💼 Job Listings

**File:** `src/content/careers.ts`

### Add a New Job Opening

```typescript
{
  id: 'senior-blockchain-dev',
  title: 'Senior Blockchain Developer',
  category: 'Engineering',
  location: 'Remote',
  employmentType: 'Full-time',
  description: 'We are looking for an experienced blockchain developer...',
  responsibilities: [
    'Design and implement smart contracts',
    'Build decentralized applications',
    'Collaborate with cross-functional teams',
  ],
  qualifications: [
    '5+ years Solidity development',
    'Experience with Ethereum, Layer 2 solutions',
    'Strong understanding of blockchain security',
  ],
  compensationRange: '$120k - $180k + equity',
  applyUrl: 'https://apply.evera.network/senior-blockchain-dev',
}
```

### Close a Job Opening

Delete the entire job object or change `applyUrl`:

```typescript
{
  id: 'filled-position',
  applyUrl: undefined,  // Hides the "Apply" button
}
```

### Job Categories

- `'Engineering'`
- `'Marketing'`
- `'Design'`
- `'Operations'`
- `'Business Development'`
- `'Community'`

---

## 💰 Presale Configuration

**File:** `src/content/presale.ts`

### Update Presale Status

```typescript
export const presaleConfig = {
  startDate: new Date('2025-02-01T00:00:00Z'),
  endDate: new Date('2025-03-31T23:59:59Z'),
  currentPhase: PresalePhase.Live,  // Change this
  
  pricing: {
    tokenPrice: 0.05,  // Price per token in USD
    minPurchase: 100,  // Minimum tokens
    maxPurchase: 100000,  // Maximum tokens
  },
  
  allocation: {
    totalTokens: 10000000,
    soldTokens: 2500000,  // Update as sales progress
  },
};
```

### Presale Phases

```typescript
PresalePhase.Upcoming  // Before start date
PresalePhase.Live      // Currently active
PresalePhase.Closed    // After end date or sold out
```

### Update Progress

Only change `soldTokens` value:

```typescript
allocation: {
  totalTokens: 10000000,
  soldTokens: 3750000,  // 37.5% sold
}
```

---

## 🌐 Social Media Links

**File:** `.env.local` (Environment variables)

```env
NEXT_PUBLIC_DISCORD_URL=https://discord.gg/evera
NEXT_PUBLIC_TWITTER_URL=https://twitter.com/EveraProtocol
NEXT_PUBLIC_TELEGRAM_URL=https://t.me/evera
NEXT_PUBLIC_GITHUB_URL=https://github.com/evera-protocol
```

**To update:** Change the URL after the `=` sign

**Note:** Restart dev server after changing environment variables

---

## 🖼️ Adding Images

### Upload Images

1. **Team photos**: `public/images/team/`
2. **Feature icons**: `public/images/icons/`
3. **Hero backgrounds**: `public/images/hero/`
4. **Logos**: `public/images/logos/`

### Image Requirements

- **Format**: WebP or PNG (WebP preferred for smaller file size)
- **Team photos**: 400x400px, square, professional headshot
- **Hero images**: 1920x1080px, landscape
- **Logos**: SVG or PNG with transparent background

### Reference Images in Content

```typescript
avatar: '/images/team/firstname-lastname.jpg'
```

**Path format:** `/images/folder/filename.ext`

---

## 📝 Editing Guidelines

### Do's ✅

- Keep text concise and scannable
- Use consistent capitalization
- Test links to ensure they work
- Proofread for typos
- Keep descriptions under 200 characters
- Use action-oriented language

### Don'ts ❌

- Don't change variable names (e.g., `id`, `title`, `description`)
- Don't remove commas between objects
- Don't change file names or paths without updating references
- Don't use special characters in IDs (use `kebab-case`)
- Don't forget trailing commas after objects

---

## 🐛 Troubleshooting

### Error: Missing comma

```typescript
// ❌ Wrong
{
  title: 'First Item'
}
{
  title: 'Second Item'
}

// ✅ Correct
{
  title: 'First Item'
},
{
  title: 'Second Item'
}
```

### Error: Broken image

Check:
1. Image file exists in `public/images/`
2. Path starts with `/` (e.g., `/images/team/photo.jpg`)
3. File name matches exactly (case-sensitive)
4. File extension is correct (`.jpg`, `.png`, `.webp`)

### Error: Date not working

Use this format:
```typescript
new Date('2025-12-31T23:59:59Z')
//        YYYY-MM-DD T HH:MM:SS Z
```

---

## 💡 Tips for Success

1. **Make small changes**: Edit one thing at a time
2. **Copy existing examples**: Duplicate a similar item and modify it
3. **Save frequently**: Use version control to track changes
4. **Preview locally**: Run `pnpm dev` to see changes before deploying
5. **Ask for help**: Contact dev team if stuck

---

## 📞 Need Help?

Contact the development team:

- **Email**: dev@evera.network
- **Discord**: #content-updates channel
- **Documentation**: Check other files in `docs/` folder

---

**You've got this!** 🚀 Making content changes is easier than it looks!
