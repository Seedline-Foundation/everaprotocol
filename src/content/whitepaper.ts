// Whitepaper content structured for rendering
import { WhitepaperSection } from '@/components/whitepaper/WhitepaperContent';

export const whitepaperSections: WhitepaperSection[] = [
  {
    id: 'executive-summary',
    title: '1. Executive Summary',
    level: 1,
    content: [
      'In an era where misinformation spreads faster than truth, Evera Protocol introduces a decentralized infrastructure for verifiable information. By combining blockchain technology with economic incentives, we create a transparent ecosystem where content authenticity, publisher reputation, and verifier integrity are permanently recorded and publicly auditable.',
      'Evera Protocol addresses three critical problems: (1) lack of content provenance tracking, (2) unsustainable economics for quality journalism, and (3) absence of transparent verification mechanisms. Our solution empowers publishers to establish verifiable credentials, enables independent verifiers to earn rewards for fact-checking, and provides consumers with tools to assess information credibility.',
      'The EVERA token serves as the economic engine, facilitating staking for reputation, rewards for verification work, and governance rights for protocol evolution. With a capped supply of 1 billion tokens and deflationary mechanics, the tokenomics align long-term value creation with ecosystem growth.',
    ],
  },
  {
    id: 'problem-statement',
    title: '2. The Misinformation Crisis',
    level: 1,
    content: [
      'The digital information economy is fundamentally broken. Every day, billions of people consume content without knowing its origin, accuracy, or underlying biases. This information asymmetry creates fertile ground for misinformation, erodes trust in institutions, and threatens democratic discourse.',
    ],
    subsections: [
      {
        id: 'problem-provenance',
        title: '2.1 Lack of Content Provenance',
        content: [
          'Content is routinely copied, modified, and republished without attribution. Original sources are obscured through aggregation platforms and social media sharing. Consumers have no reliable way to trace information back to its origin or verify publication timestamps.',
          'This enables bad actors to manipulate narratives by altering context, fabricating sources, or presenting old content as current. The absence of immutable provenance records makes it nearly impossible to establish ground truth.',
        ],
      },
      {
        id: 'problem-economics',
        title: '2.2 Broken Economics for Quality Journalism',
        content: [
          'Traditional advertising-based revenue models incentivize clickbait over accuracy. Quality investigative journalism—expensive and time-intensive—struggles to compete with low-cost sensationalism. Publishers face declining revenues while misinformation producers thrive through attention-capture mechanisms.',
          'Micropayment systems have failed due to friction and lack of interoperability. Subscription fatigue limits consumer willingness to pay. The result: a race to the bottom where quality is sacrificed for virality.',
        ],
      },
      {
        id: 'problem-verification',
        title: '2.3 Opaque Verification Mechanisms',
        content: [
          'Existing fact-checking organizations lack transparency in their processes and funding sources. Centralized gatekeepers introduce bias and single points of failure. There is no standardized, auditable framework for verification that consumers can trust.',
          'The absence of economic incentives limits the scale of verification efforts. Fact-checkers cannot keep pace with the volume of content requiring review. Community-based verification (like Wikipedia) works for some contexts but lacks mechanisms to prevent coordinated manipulation.',
        ],
      },
    ],
  },
  {
    id: 'solution-overview',
    title: '3. Evera Protocol Solution',
    level: 1,
    content: [
      'Evera Protocol creates a decentralized infrastructure that makes information provenance transparent, verification economically sustainable, and reputation quantifiable. Our three-sided ecosystem serves publishers, verifiers, and consumers through blockchain-based coordination.',
    ],
    subsections: [
      {
        id: 'solution-publishers',
        title: '3.1 Publisher Registry',
        content: [
          'Publishers register on-chain to establish verifiable identities. Each publication receives a cryptographic signature that proves authenticity and timestamps content immutably. This creates an unforgeable audit trail from creation to consumption.',
          'Publishers stake EVERA tokens to signal commitment to accuracy. Their reputation score (0-100) evolves based on verification results, creating economic consequences for misinformation. High-reputation publishers gain visibility and preferential treatment in discovery algorithms.',
        ],
      },
      {
        id: 'solution-verifiers',
        title: '3.2 Verification Network',
        content: [
          'Independent verifiers stake tokens to participate in fact-checking work. They submit evidence-based assessments of content claims, earning rewards for accurate verdicts and losing stake for incorrect judgments. This creates skin-in-the-game accountability.',
          'A consensus mechanism aggregates individual verdicts into final verification scores. Multi-verifier requirements prevent single-point failures. Transparent criteria and evidence requirements ensure auditability. All verification work is permanently recorded on-chain.',
        ],
      },
      {
        id: 'solution-consumers',
        title: '3.3 Consumer Tools',
        content: [
          'Browser extensions and mobile apps display reputation scores and verification status inline with content. Users can drill down into verification evidence, view publisher history, and assess credibility before sharing.',
          'Consumers earn tokens for flagging suspicious content and contributing to community verification. This creates a virtuous cycle where information quality becomes a collective responsibility rather than a top-down mandate.',
        ],
      },
    ],
  },
  {
    id: 'technical-architecture',
    title: '4. Technical Architecture',
    level: 1,
    content: [
      'Evera Protocol is built on Ethereum with Layer 2 scaling solutions for cost-effective transactions. The architecture separates on-chain verification records from off-chain content storage, optimizing for both transparency and performance.',
    ],
    subsections: [
      {
        id: 'tech-smart-contracts',
        title: '4.1 Core Smart Contracts',
        content: [
          'PublisherRegistry: Manages publisher registrations, reputation scores, and staking. Implements Sybil resistance through identity verification and economic requirements.',
          'VerificationEngine: Coordinates verification work, aggregates verdicts, and distributes rewards. Implements time-bounded verification periods and dispute resolution.',
          'TokenStaking: Handles EVERA token staking for both publishers and verifiers. Implements slashing conditions for malicious behavior and reward distribution for positive contributions.',
          'GovernanceModule: Enables token-weighted voting on protocol parameters, verification criteria, and treasury allocation. Implements proposal queuing, time locks, and execution mechanisms.',
        ],
      },
      {
        id: 'tech-off-chain',
        title: '4.2 Off-Chain Components',
        content: [
          'IPFS Storage: Content metadata and verification evidence stored on IPFS for decentralized, censorship-resistant persistence. Content hashes recorded on-chain link to full data.',
          'Indexing Infrastructure: Subgraph-based indexing enables fast queries of on-chain data. Real-time updates push reputation changes and verification results to client applications.',
          'API Layer: RESTful and GraphQL APIs provide developer-friendly access to protocol data. Rate limiting and caching optimize for scalability.',
        ],
      },
      {
        id: 'tech-security',
        title: '4.3 Security Model',
        content: [
          'Multi-signature treasury controls protocol funds. Upgradeable proxy patterns enable bug fixes while preserving state. Comprehensive test coverage and formal verification for critical contracts.',
          'Economic security through staking requirements. Sybil resistance via proof-of-identity and stake-weighted participation. Slashing mechanisms deter malicious behavior. Time locks on governance changes prevent rushed decisions.',
        ],
      },
    ],
  },
  {
    id: 'tokenomics',
    title: '5. EVERA Token Economics',
    level: 1,
    content: [
      'The EVERA token is the economic coordination mechanism of the protocol. With a fixed supply of 1 billion tokens, deflationary pressure comes from burning mechanisms and long-term staking lockups.',
    ],
    subsections: [
      {
        id: 'token-utility',
        title: '5.1 Token Utility',
        content: [
          'Staking: Publishers and verifiers stake EVERA to participate. Staking requirements scale with reputation tier, creating skin-in-the-game accountability.',
          'Rewards: Verifiers earn EVERA for accurate verification work. Consumers earn tokens for flagging content and contributing evidence. Distribution is proportional to contribution value.',
          'Governance: Token holders vote on protocol parameters, verification criteria, treasury allocation, and upgrade proposals. One token equals one vote with delegation support.',
          'Access Rights: Premium features (bulk API access, priority verification, white-label solutions) require token holdings or payment in EVERA.',
        ],
      },
      {
        id: 'token-distribution',
        title: '5.2 Token Distribution',
        content: [
          'Community Rewards (35%): Distributed over 10 years to verifiers, consumers, and ecosystem contributors. Vesting schedule ensures long-term alignment.',
          'Presale (25%): Allocated to early supporters. 20% released at TGE, remaining 80% vested monthly over 10 months.',
          'Team & Advisors (15%): 4-year vesting with 1-year cliff. Ensures core team alignment through protocol maturity.',
          'Treasury (15%): Governed by token holders for grants, partnerships, and ecosystem development.',
          'Liquidity (10%): DEX liquidity provision. 50% at TGE, remaining 50% over 6 months.',
        ],
      },
      {
        id: 'token-mechanics',
        title: '5.3 Deflationary Mechanics',
        content: [
          'Verification Fees: 10% of verification rewards burned. Reduces circulating supply as ecosystem usage grows.',
          'Slashing Burns: Tokens slashed from malicious actors are burned rather than redistributed. Creates deflationary pressure proportional to bad behavior.',
          'Governance Burns: Proposals can include token burns for specific outcomes (e.g., milestone achievements, ecosystem growth targets).',
        ],
      },
    ],
  },
  {
    id: 'roadmap',
    title: '6. Development Roadmap',
    level: 1,
    content: [
      'Evera Protocol development follows a phased approach prioritizing core infrastructure, followed by ecosystem expansion and decentralization.',
    ],
    subsections: [
      {
        id: 'roadmap-q1-2024',
        title: 'Q1 2024: Foundation',
        content: [
          'Smart contract deployment on Ethereum testnet. Publisher registry and basic reputation system. Initial verifier onboarding (100 verifiers).',
        ],
      },
      {
        id: 'roadmap-q2-2024',
        title: 'Q2 2024: Alpha Launch',
        content: [
          'Mainnet deployment with audited contracts. Browser extension MVP for Chrome and Firefox. Onboard 1,000 publishers and 500 verifiers. First verification campaigns.',
        ],
      },
      {
        id: 'roadmap-q3-2024',
        title: 'Q3 2024: Ecosystem Growth',
        content: [
          'Mobile apps (iOS, Android). API launch for third-party integrations. Partnership with major news aggregators. Scale to 10,000 publishers.',
        ],
      },
      {
        id: 'roadmap-q4-2024',
        title: 'Q4 2024: Decentralization',
        content: [
          'Launch governance module. Token holder voting on first proposals. Layer 2 scaling integration for cost reduction. Open-source all client libraries.',
        ],
      },
    ],
  },
  {
    id: 'team',
    title: '7. Team & Advisors',
    level: 1,
    content: [
      'The Evera Protocol team combines expertise in blockchain engineering, journalism, cryptography, and product design. Our advisors include early Bitcoin contributors, Ethereum Foundation members, and media industry veterans.',
      'We are backed by leading blockchain VCs and strategic partners including news organizations committed to fighting misinformation. Our distributed team operates across time zones with a remote-first culture.',
    ],
  },
  {
    id: 'conclusion',
    title: '8. Conclusion',
    level: 1,
    content: [
      'Evera Protocol represents a paradigm shift in how information is verified, attributed, and valued. By aligning economic incentives with truth-seeking behavior, we create sustainable infrastructure for an informed society.',
      'The misinformation crisis demands systemic solutions, not band-aids. Evera Protocol provides the rails for a trustworthy information economy—one where transparency is built-in, verification is economically viable, and quality journalism is rewarded.',
      'Join us in building the future of verifiable truth.',
    ],
  },
];

// Table of contents data
export const whitepaperTocItems = whitepaperSections.flatMap((section) => [
  {
    id: section.id,
    title: section.title,
    level: section.level,
  },
  ...(section.subsections?.map((sub) => ({
    id: sub.id,
    title: sub.title,
    level: 2 as const,
  })) || []),
]);
