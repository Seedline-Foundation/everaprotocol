export const features = [
  {
    id: 'content-attribution',
    icon: 'FileTextIcon',
    title: 'Content Attribution',
    description:
      'Immutable proof of authorship and content origin with cryptographic verification.',
    benefitsFor: ['publisher', 'investor'],
    learnMoreUrl: '/whitepaper#attribution',
  },
  {
    id: 'fact-checking',
    icon: 'CheckCircleIcon',
    title: 'Decentralized Fact-Checking',
    description:
      'Community-driven verification with economic incentives for accuracy and transparency.',
    benefitsFor: ['verifier', 'publisher', 'general'],
    learnMoreUrl: '/whitepaper#fact-checking',
  },
  {
    id: 'reputation-system',
    icon: 'AwardIcon',
    title: 'Reputation Scoring',
    description:
      'On-chain reputation for publishers and verifiers based on historical accuracy.',
    benefitsFor: ['publisher', 'verifier'],
    learnMoreUrl: '/whitepaper#reputation',
  },
  {
    id: 'content-provenance',
    icon: 'GitBranchIcon',
    title: 'Content Provenance',
    description:
      'Track content evolution and modifications with complete edit history on-chain.',
    benefitsFor: ['publisher', 'general'],
    learnMoreUrl: '/whitepaper#provenance',
  },
  {
    id: 'dispute-resolution',
    icon: 'ScaleIcon',
    title: 'Dispute Resolution',
    description:
      'Transparent arbitration system for contested claims with community governance.',
    benefitsFor: ['publisher', 'verifier'],
    learnMoreUrl: '/whitepaper#disputes',
  },
  {
    id: 'ai-resistance',
    icon: 'ShieldIcon',
    title: 'AI-Resistant Verification',
    description:
      'Multi-layered verification to combat AI-generated misinformation and deepfakes.',
    benefitsFor: ['general', 'publisher'],
    learnMoreUrl: '/whitepaper#ai-resistance',
  },
  {
    id: 'monetization',
    icon: 'DollarSignIcon',
    title: 'Publisher Monetization',
    description:
      'Earn rewards for publishing verified content and building trust reputation.',
    benefitsFor: ['publisher', 'investor'],
    learnMoreUrl: '/whitepaper#monetization',
  },
  {
    id: 'api-integration',
    icon: 'CodeIcon',
    title: 'Easy API Integration',
    description:
      'Simple REST API for publishers to integrate verification into existing workflows.',
    benefitsFor: ['publisher', 'developer'],
    learnMoreUrl: '/docs/api',
  },
];

export const stats = [
  {
    value: '$89B',
    label: 'Global misinformation economic impact annually',
    prefix: '$',
    suffix: 'B',
    animateCounter: true,
  },
  {
    value: '78%',
    label: 'Of consumers struggle to identify fake news',
    suffix: '%',
    animateCounter: true,
  },
  {
    value: '3.5B',
    label: 'People exposed to misinformation daily',
    suffix: 'B',
    animateCounter: true,
  },
  {
    value: '>90%',
    label: 'Content verification accuracy with Evera',
    prefix: '>',
    suffix: '%',
    animateCounter: false,
  },
];

export const problems = [
  {
    id: 'misinformation-spread',
    icon: 'AlertTriangleIcon',
    title: 'Rampant Misinformation',
    description:
      'Fake news and manipulated content spreads 6x faster than verified information, eroding public trust.',
    stat: '6x faster spread',
  },
  {
    id: 'no-accountability',
    icon: 'UserXIcon',
    title: 'Zero Accountability',
    description:
      'Anonymous bad actors face no consequences for spreading lies, while legitimate publishers lose credibility.',
    stat: '78% trust decline',
  },
  {
    id: 'centralized-gatekeepers',
    icon: 'LockIcon',
    title: 'Centralized Control',
    description:
      'Big tech platforms act as truth arbiters with opaque algorithms and biased moderation.',
    stat: '$89B annual cost',
  },
];

export const solution = {
  title: 'A Decentralized Solution',
  description:
    'Evera Protocol combines blockchain immutability, cryptographic proofs, and economic incentives to create a trustless information verification system.',
  architectureDiagram: '/images/architecture-diagram.svg',
  keyPoints: [
    'Publishers register content with cryptographic hashes, creating immutable attribution',
    'Decentralized verifiers stake tokens to review content, earning rewards for accuracy',
    'Reputation scores built on-chain based on historical verification accuracy',
    'Smart contracts enforce transparency and prevent manipulation',
    'Community governance for protocol upgrades and dispute resolution',
  ],
};
