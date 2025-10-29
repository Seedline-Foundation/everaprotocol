# Deployment Guide

This guide covers deploying the Evera Protocol landing page to production.

## 🎯 Deployment Platforms

### Vercel (Recommended)

Vercel is the recommended platform for deploying Next.js applications, offering:
- Zero-configuration deployments
- Automatic SSL certificates
- Global CDN distribution
- Preview deployments for pull requests
- Built-in analytics

### Alternative Platforms

- **Netlify**: Similar to Vercel with good Next.js support
- **AWS Amplify**: Good for AWS ecosystem integration
- **Self-hosted**: Docker container deployment

---

## 🚀 Deploying to Vercel

### Prerequisites

- GitHub repository with your code
- Vercel account (sign up at [vercel.com](https://vercel.com))
- Environment variables ready

### Step 1: Install Vercel CLI

```bash
pnpm install -g vercel
```

### Step 2: Link Project

```bash
cd evera-landing
vercel login
vercel
```

Follow the prompts:
- Set up and deploy? **Yes**
- Which scope? Select your account
- Link to existing project? **No** (first time)
- Project name? **evera-landing**
- Directory? **./evera-landing**
- Override settings? **No**

### Step 3: Configure Environment Variables

In Vercel Dashboard:

1. Go to **Project Settings** → **Environment Variables**
2. Add the following variables for **Production**, **Preview**, and **Development**:

```env
# Required
CONVERTKIT_API_KEY=your_api_key_here
PLAUSIBLE_DOMAIN=evera.network
NEXT_PUBLIC_SITE_URL=https://evera.network

# Optional
NEXT_PUBLIC_DISCORD_URL=https://discord.gg/evera
NEXT_PUBLIC_TWITTER_URL=https://twitter.com/EveraProtocol
NEXT_PUBLIC_TELEGRAM_URL=https://t.me/evera
NEXT_PUBLIC_GITHUB_URL=https://github.com/evera-protocol
```

### Step 4: Deploy to Production

```bash
vercel --prod
```

Your site will be available at: `https://your-project.vercel.app`

---

## 🌐 Custom Domain Setup

### Add Domain in Vercel

1. Go to **Project Settings** → **Domains**
2. Click **Add** and enter your domain: `evera.network`
3. Vercel will provide DNS configuration instructions

### Configure DNS Records

For **Apex Domain** (evera.network):

```
Type: A
Name: @
Value: 76.76.21.21
TTL: 300
```

For **WWW Subdomain** (www.evera.network):

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 300
```

### Wait for DNS Propagation

- Typically takes 5-30 minutes
- Can take up to 48 hours
- Check with: `dig evera.network` or `nslookup evera.network`

### Enable SSL

Vercel automatically provisions SSL certificates via Let's Encrypt.
- No configuration needed
- Certificates auto-renew
- HTTPS enforced by default

---

## 🔧 Build Configuration

### next.config.mjs

```javascript
const nextConfig = {
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.evera.network',
      },
    ],
  },
  
  // Performance optimization
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Enable compression
  compress: true,
  swcMinify: true,
};
```

### Build Command

Vercel automatically runs:
```bash
pnpm build
```

Which executes:
```bash
next build
```

### Output

- Static pages: Pre-rendered at build time
- API routes: Serverless functions
- ISR pages: Incremental Static Regeneration (token page: 60s revalidation)

---

## 📊 Vercel Analytics

### Enable Vercel Analytics

1. Go to **Analytics** tab in project dashboard
2. Click **Enable Analytics**
3. View real-time metrics:
   - Page views
   - Top pages
   - Top referrers
   - Devices (mobile/desktop)
   - Countries

### Web Vitals

Vercel tracks Core Web Vitals:
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

---

## 🔄 Deployment Workflow

### Automatic Deployments

**Main Branch** → Production
- Push to `main` branch
- Automatic deployment to production
- `https://evera.network`

**Feature Branches** → Preview
- Push to any branch
- Automatic preview deployment
- `https://evera-landing-git-feature-username.vercel.app`

**Pull Requests** → Preview
- Preview deployment for each PR
- Comment added to PR with preview URL
- Automatic updates on new commits

### Manual Deployments

```bash
# Deploy current branch to preview
vercel

# Deploy to production
vercel --prod

# Rollback to previous deployment
vercel rollback
```

---

## 🧪 Pre-Deployment Checklist

### Before Deploying

- [ ] All tests pass: `pnpm test`
- [ ] Build succeeds locally: `pnpm build`
- [ ] Lint passes: `pnpm lint`
- [ ] Environment variables configured
- [ ] No console.log statements in code
- [ ] Images optimized (WebP format)
- [ ] Lighthouse score > 90

### Test Production Build Locally

```bash
# Build
pnpm build

# Start production server
pnpm start

# Open http://localhost:3000
# Test all pages and functionality
```

---

## 🔍 Troubleshooting

### Build Fails

**Error: Module not found**
```bash
# Clear cache and reinstall
rm -rf .next node_modules
pnpm install
pnpm build
```

**Error: Out of memory**
```bash
# Increase Node.js memory limit
NODE_OPTIONS="--max_old_space_size=4096" pnpm build
```

### Environment Variables Not Working

- Ensure variables are set in **Vercel Dashboard**
- Restart deployment after adding variables
- `NEXT_PUBLIC_*` variables are embedded at build time
- Regular variables only available server-side

### Custom Domain Not Working

- Check DNS records are correct
- Wait for DNS propagation (up to 48 hours)
- Verify domain ownership in Vercel
- Check domain registrar settings

### Performance Issues

- Check Lighthouse report
- Optimize images (convert to WebP)
- Enable caching headers
- Use Next.js Image component
- Minimize JavaScript bundles

---

## 📈 Monitoring

### Vercel Deployment Logs

View logs in Vercel Dashboard:
1. Go to **Deployments**
2. Click on a deployment
3. View **Build Logs** and **Function Logs**

### Real-Time Logs

```bash
vercel logs
```

### Error Tracking

Integrate error tracking (optional):
- **Sentry**: error-evera.sentry.io
- **LogRocket**: Session replay
- **Datadog**: Full-stack monitoring

---

## 🔐 Security

### Headers

Vercel automatically adds security headers:
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `X-XSS-Protection: 1; mode=block`

### Rate Limiting

Implement rate limiting in API routes:
```typescript
// In-memory rate limiting (use Redis in production)
const rateLimit = new Map<string, number[]>();
```

### Environment Variables

- Never commit `.env.local` to git
- Use Vercel dashboard for production secrets
- Rotate API keys regularly

---

## 📞 Support

### Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Support](https://vercel.com/support)

### Contact

- Email: dev@evera.network
- Discord: [Join community](https://discord.gg/evera)

---

**Deployment complete!** 🎉 Your site is now live at **https://evera.network**
