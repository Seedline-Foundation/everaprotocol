import { JobListing } from '@/types';

export const jobListings: JobListing[] = [
  {
    id: 'senior-blockchain-engineer',
    title: 'Senior Blockchain Engineer',
    category: 'Engineering',
    location: 'Remote',
    employmentType: 'full-time',
    description:
      'Join our core protocol team to build the future of decentralized information verification. Work on smart contracts, consensus mechanisms, and scalability challenges.',
    responsibilities: [
      'Design and implement smart contracts for content verification and attribution',
      'Build scalable blockchain infrastructure to handle high transaction volumes',
      'Optimize gas costs and transaction throughput',
      'Collaborate with research team on cryptographic proofs',
      'Write comprehensive tests and security audits',
    ],
    qualifications: [
      '5+ years of software engineering experience',
      '2+ years working with Solidity and EVM-compatible chains',
      'Deep understanding of blockchain consensus mechanisms',
      'Experience with Web3 libraries (ethers.js, web3.js)',
      'Strong testing and security mindset',
      'Open-source contributions preferred',
    ],
    compensation: '$150k - $200k + equity + tokens',
    applyUrl: 'https://jobs.evera.network/senior-blockchain-engineer',
    postedDate: new Date('2025-10-15'),
  },
  {
    id: 'frontend-engineer',
    title: 'Frontend Engineer (React/Next.js)',
    category: 'Engineering',
    location: 'Remote',
    employmentType: 'full-time',
    description:
      'Build intuitive user interfaces for publishers, verifiers, and consumers. Create seamless Web3 experiences that bridge blockchain complexity with user simplicity.',
    responsibilities: [
      'Develop publisher dashboard for content registration and analytics',
      'Build verifier portal with reputation tracking and earnings',
      'Create public-facing content verification UI',
      'Integrate wallet connections (MetaMask, WalletConnect)',
      'Optimize performance and accessibility',
    ],
    qualifications: [
      '3+ years of React development experience',
      'Proficiency with Next.js, TypeScript, and Tailwind CSS',
      'Experience with Web3 wallet integration',
      'Strong UX/UI design sensibility',
      'Responsive design and cross-browser compatibility',
      'Passion for decentralization and transparency',
    ],
    compensation: '$120k - $160k + equity + tokens',
    applyUrl: 'https://jobs.evera.network/frontend-engineer',
    postedDate: new Date('2025-10-20'),
  },
  {
    id: 'community-manager',
    title: 'Community Manager',
    category: 'Marketing',
    location: 'Remote',
    employmentType: 'full-time',
    description:
      'Be the voice of Evera Protocol. Engage with our community across Discord, Telegram, Twitter, and forums. Help grow our ecosystem of publishers and verifiers.',
    responsibilities: [
      'Manage and grow Discord, Telegram, and Twitter communities',
      'Create engaging content and respond to community questions',
      'Organize AMAs, events, and community initiatives',
      'Gather feedback and relay insights to product team',
      'Build relationships with publishers and verifiers',
    ],
    qualifications: [
      '2+ years of community management experience in Web3',
      'Active participant in crypto/blockchain communities',
      'Excellent written and verbal communication skills',
      'Familiarity with Discord, Telegram moderation tools',
      'Passion for fighting misinformation',
      'Experience with social media analytics',
    ],
    compensation: '$80k - $110k + tokens',
    applyUrl: 'https://jobs.evera.network/community-manager',
    postedDate: new Date('2025-10-25'),
  },
  {
    id: 'technical-writer',
    title: 'Technical Writer',
    category: 'Content',
    location: 'Remote',
    employmentType: 'contract',
    description:
      'Create clear, comprehensive documentation for developers, publishers, and verifiers. Make complex blockchain concepts accessible to diverse audiences.',
    responsibilities: [
      'Write API documentation and integration guides',
      'Create tutorials for publishers and verifiers',
      'Maintain developer documentation and changelog',
      'Produce blog posts explaining protocol features',
      'Collaborate with engineering on technical accuracy',
    ],
    qualifications: [
      '3+ years of technical writing experience',
      'Understanding of blockchain and smart contracts',
      'Proficiency with Markdown, Git, and documentation tools',
      'Ability to explain complex topics simply',
      'Portfolio of technical writing samples',
      'Developer background preferred',
    ],
    compensation: '$60 - $90/hour (contract)',
    applyUrl: 'https://jobs.evera.network/technical-writer',
    postedDate: new Date('2025-10-28'),
  },
];

export const jobCategories = [
  'All Positions',
  'Engineering',
  'Marketing',
  'Content',
  'Operations',
  'Design',
];

export const noOpeningsMessage = {
  title: "No open positions match your criteria",
  description:
    "We're always looking for exceptional talent. Submit your resume and we'll reach out when a suitable position opens.",
  ctaText: 'Join Our Talent Pool',
  ctaLink: 'mailto:careers@evera.network',
};
