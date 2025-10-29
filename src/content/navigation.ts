import { NavigationLink, SocialLink, SocialPlatform } from '@/types';

export const mainNavigation: NavigationLink[] = [
  {
    id: 'home',
    label: 'Home',
    href: '/',
    order: 1,
    external: false,
    highlighted: false,
  },
  {
    id: 'whitepaper',
    label: 'Whitepaper',
    href: '/whitepaper',
    order: 2,
    external: false,
    highlighted: false,
  },
  {
    id: 'pitch',
    label: 'Pitch Deck',
    href: '/pitch',
    order: 3,
    external: false,
    highlighted: false,
  },
  {
    id: 'token',
    label: 'Token',
    href: '/token',
    order: 4,
    external: false,
    highlighted: false,
  },
  {
    id: 'about',
    label: 'About',
    href: '/about',
    order: 5,
    external: false,
    highlighted: false,
  },
  {
    id: 'careers',
    label: 'Careers',
    href: '/careers',
    order: 6,
    external: false,
    highlighted: false,
  },
  {
    id: 'milestones',
    label: 'Roadmap',
    href: '/milestones',
    order: 7,
    external: false,
    highlighted: false,
  },
  {
    id: 'join-presale',
    label: 'Join Presale',
    href: '/token#signup',
    order: 8,
    external: false,
    highlighted: true,
  },
];

export const socialLinks: SocialLink[] = [
  {
    platform: SocialPlatform.Twitter,
    url: process.env.NEXT_PUBLIC_TWITTER_URL || 'https://twitter.com/EveraProtocol',
    icon: 'TwitterIcon',
    label: 'Follow us on Twitter',
    displayInHeader: true,
    displayInFooter: true,
  },
  {
    platform: SocialPlatform.Discord,
    url: process.env.NEXT_PUBLIC_DISCORD_URL || 'https://discord.gg/evera',
    icon: 'DiscordIcon',
    label: 'Join our Discord community',
    displayInHeader: true,
    displayInFooter: true,
  },
  {
    platform: SocialPlatform.Telegram,
    url: process.env.NEXT_PUBLIC_TELEGRAM_URL || 'https://t.me/evera',
    icon: 'TelegramIcon',
    label: 'Join our Telegram channel',
    displayInHeader: true,
    displayInFooter: true,
  },
  {
    platform: SocialPlatform.GitHub,
    url: process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/evera-protocol',
    icon: 'GitHubIcon',
    label: 'View our GitHub repository',
    displayInHeader: false,
    displayInFooter: true,
  },
];

export const footerLinks = {
  product: [
    { label: 'Whitepaper', href: '/whitepaper' },
    { label: 'Token Economics', href: '/token' },
    { label: 'Pitch Deck', href: '/pitch' },
    { label: 'Documentation', href: '/docs' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Milestones', href: '/milestones' },
    { label: 'Blog', href: '/blog' },
  ],
  resources: [
    { label: 'FAQ', href: '/faq' },
    { label: 'Support', href: '/support' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
  community: [
    { label: 'Twitter', href: process.env.NEXT_PUBLIC_TWITTER_URL || '#' },
    { label: 'Discord', href: process.env.NEXT_PUBLIC_DISCORD_URL || '#' },
    { label: 'Telegram', href: process.env.NEXT_PUBLIC_TELEGRAM_URL || '#' },
    { label: 'GitHub', href: process.env.NEXT_PUBLIC_GITHUB_URL || '#' },
  ],
};
