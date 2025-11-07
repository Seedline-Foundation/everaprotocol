// T042 - Implement PitchSlide component
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { PitchSlide as PitchSlideType } from '@/types';

interface PitchSlideProps {
  slide: PitchSlideType;
  isActive: boolean;
}

export function PitchSlide({ slide, isActive }: PitchSlideProps): JSX.Element {
  const slideVariants = {
    enter: {
      opacity: 0,
      x: 100,
    },
    center: {
      opacity: 1,
      x: 0,
    },
    exit: {
      opacity: 0,
      x: -100,
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.1,
        duration: 0.5,
      },
    }),
  };

  // Determine text color based on background
  const getTextColor = (bgColor?: string): string => {
    if (!bgColor) return 'text-charcoal';
    
    // Light backgrounds use dark text
    const lightBackgrounds = ['#E0DFD5', '#E4B363'];
    return lightBackgrounds.includes(bgColor) ? 'text-charcoal' : 'text-white';
  };

  const textColor = getTextColor(slide.backgroundColor);

  return (
    <motion.div
      key={slide.id}
      variants={slideVariants}
      initial="enter"
      animate={isActive ? 'center' : 'exit'}
      exit="exit"
      transition={{
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
      }}
      className="absolute inset-0 flex items-center justify-center p-8 md:p-16"
      style={{
        backgroundColor: slide.backgroundColor,
      }}
    >
      {/* Background Image */}
      {slide.backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={slide.backgroundImage}
            alt=""
            fill
            className="object-cover opacity-20"
          />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Title Slide Layout */}
        {slide.component === 'TitleSlide' && (
          <div className="text-center">
            <motion.div
              custom={0}
              variants={contentVariants}
              initial="hidden"
              animate={isActive ? 'visible' : 'hidden'}
            >
              <h1 className={`text-6xl md:text-8xl lg:text-9xl font-bold mb-6 ${textColor}`}>
                {slide.title}
              </h1>
              <p className={`text-2xl md:text-3xl ${textColor} opacity-80`}>
                Verifiable Truth for the Information Age
              </p>
            </motion.div>
          </div>
        )}

        {/* Problem Slide Layout */}
        {slide.component === 'ProblemSlide' && (
          <div className="text-center">
            <motion.div
              custom={0}
              variants={contentVariants}
              initial="hidden"
              animate={isActive ? 'visible' : 'hidden'}
            >
              <h2 className={`text-5xl md:text-7xl font-bold mb-8 ${textColor}`}>
                {slide.title}
              </h2>
            </motion.div>
            <motion.div
              custom={1}
              variants={contentVariants}
              initial="hidden"
              animate={isActive ? 'visible' : 'hidden'}
              className="space-y-6"
            >
              <p className={`text-xl md:text-2xl ${textColor} opacity-90`}>
                Every day, billions of people consume information without knowing its source, accuracy, or bias.
              </p>
              <p className={`text-xl md:text-2xl ${textColor} opacity-90`}>
                This information asymmetry enables misinformation to spread, erodes trust, and threatens democracy.
              </p>
            </motion.div>
          </div>
        )}

        {/* Stat Slide Layout */}
        {slide.component === 'StatSlide' && (
          <div className="text-center">
            <motion.div
              custom={0}
              variants={contentVariants}
              initial="hidden"
              animate={isActive ? 'visible' : 'hidden'}
            >
              <h2 className={`text-4xl md:text-5xl font-bold mb-12 ${textColor}`}>
                {slide.title}
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { value: '$78B', label: 'Annual cost of fake news globally' },
                { value: '67%', label: 'Of people distrust traditional media' },
                { value: '3.2B', label: 'Social media users exposed daily' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  custom={index + 1}
                  variants={contentVariants}
                  initial="hidden"
                  animate={isActive ? 'visible' : 'hidden'}
                  className="text-center"
                >
                  <div className={`text-5xl md:text-7xl font-bold mb-4 ${textColor === 'text-white' ? 'text-gold' : 'text-coral'}`}>
                    {stat.value}
                  </div>
                  <p className={`text-lg md:text-xl ${textColor} opacity-80`}>
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Solution Slide Layout */}
        {slide.component === 'SolutionSlide' && (
          <div className="text-center">
            <motion.div
              custom={0}
              variants={contentVariants}
              initial="hidden"
              animate={isActive ? 'visible' : 'hidden'}
            >
              <h2 className={`text-5xl md:text-7xl font-bold mb-8 ${textColor}`}>
                {slide.title}
              </h2>
            </motion.div>
            <motion.div
              custom={1}
              variants={contentVariants}
              initial="hidden"
              animate={isActive ? 'visible' : 'hidden'}
            >
              <p className={`text-2xl md:text-3xl ${textColor} opacity-90 mb-12`}>
                Blockchain-powered verification infrastructure
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: '📝', title: 'Publishers', desc: 'Verifiable credentials' },
                { icon: '✅', title: 'Verifiers', desc: 'Earn for fact-checking' },
                { icon: '👥', title: 'Consumers', desc: 'Trust transparency' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  custom={index + 2}
                  variants={contentVariants}
                  initial="hidden"
                  animate={isActive ? 'visible' : 'hidden'}
                  className="p-6 bg-white/10 rounded-lg backdrop-blur-sm"
                >
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className={`text-2xl font-bold mb-2 ${textColor}`}>{item.title}</h3>
                  <p className={`${textColor} opacity-80`}>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Architecture Slide Layout */}
        {slide.component === 'ArchitectureSlide' && (
          <div className="text-center">
            <motion.div
              custom={0}
              variants={contentVariants}
              initial="hidden"
              animate={isActive ? 'visible' : 'hidden'}
            >
              <h2 className={`text-4xl md:text-6xl font-bold mb-12 ${textColor}`}>
                {slide.title}
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { step: '1', title: 'Publisher Submits', desc: 'Content creator publishes with metadata' },
                { step: '2', title: 'Network Validates', desc: 'Decentralized verification process' },
                { step: '3', title: 'Consensus Reached', desc: 'Validators stake tokens and vote' },
                { step: '4', title: 'Truth Certified', desc: 'Immutable verification record' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  custom={index + 1}
                  variants={contentVariants}
                  initial="hidden"
                  animate={isActive ? 'visible' : 'hidden'}
                  className="text-center"
                >
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gold flex items-center justify-center text-charcoal font-bold text-2xl`}>
                    {item.step}
                  </div>
                  <h3 className={`text-xl font-bold mb-2 ${textColor}`}>{item.title}</h3>
                  <p className={`text-sm ${textColor} opacity-80`}>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Market Slide Layout */}
        {slide.component === 'MarketSlide' && (
          <div className="text-center">
            <motion.div
              custom={0}
              variants={contentVariants}
              initial="hidden"
              animate={isActive ? 'visible' : 'hidden'}
            >
              <h2 className={`text-4xl md:text-6xl font-bold mb-8 ${textColor}`}>
                {slide.title}
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div
                custom={1}
                variants={contentVariants}
                initial="hidden"
                animate={isActive ? 'visible' : 'hidden'}
                className="text-center"
              >
                <div className={`text-6xl md:text-8xl font-bold mb-4 ${textColor === 'text-charcoal' ? 'text-coral' : 'text-gold'}`}>
                  $127B
                </div>
                <p className={`text-xl ${textColor} opacity-80`}>
                  Global media & information market
                </p>
              </motion.div>
              <motion.div
                custom={2}
                variants={contentVariants}
                initial="hidden"
                animate={isActive ? 'visible' : 'hidden'}
                className="text-center"
              >
                <div className={`text-6xl md:text-8xl font-bold mb-4 ${textColor === 'text-charcoal' ? 'text-coral' : 'text-gold'}`}>
                  $45B
                </div>
                <p className={`text-xl ${textColor} opacity-80`}>
                  Addressable verification market
                </p>
              </motion.div>
            </div>
          </div>
        )}

        {/* Features Slide Layout */}
        {slide.component === 'FeaturesSlide' && (
          <div className="text-center">
            <motion.div
              custom={0}
              variants={contentVariants}
              initial="hidden"
              animate={isActive ? 'visible' : 'hidden'}
            >
              <h2 className={`text-4xl md:text-6xl font-bold mb-12 ${textColor}`}>
                {slide.title}
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: '🔗', title: 'Blockchain Verification', desc: 'Immutable truth records' },
                { icon: '🎯', title: 'AI-Powered Analysis', desc: 'Smart content validation' },
                { icon: '💰', title: 'Token Incentives', desc: 'Earn for accurate verification' },
                { icon: '🌐', title: 'Global Network', desc: 'Decentralized validator nodes' },
                { icon: '📊', title: 'Transparency Dashboard', desc: 'Public verification metrics' },
                { icon: '⚡', title: 'Real-time Processing', desc: 'Instant verification results' },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  custom={index + 1}
                  variants={contentVariants}
                  initial="hidden"
                  animate={isActive ? 'visible' : 'hidden'}
                  className="p-6 bg-white/10 rounded-lg backdrop-blur-sm"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className={`text-xl font-bold mb-2 ${textColor}`}>{feature.title}</h3>
                  <p className={`${textColor} opacity-80`}>{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Use Cases Slide Layout */}
        {slide.component === 'UseCasesSlide' && (
          <div className="text-center">
            <motion.div
              custom={0}
              variants={contentVariants}
              initial="hidden"
              animate={isActive ? 'visible' : 'hidden'}
            >
              <h2 className={`text-4xl md:text-6xl font-bold mb-12 ${textColor}`}>
                {slide.title}
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { 
                  title: 'News & Journalism', 
                  desc: 'Verify breaking news, fact-check claims, establish source credibility',
                  icon: '📰'
                },
                { 
                  title: 'Social Media', 
                  desc: 'Combat misinformation, verify viral content, reward truth-tellers',
                  icon: '💬'
                },
                { 
                  title: 'Academic Research', 
                  desc: 'Validate data sources, ensure research integrity, prevent plagiarism',
                  icon: '🎓'
                },
                { 
                  title: 'Legal & Compliance', 
                  desc: 'Create tamper-proof evidence, establish document authenticity',
                  icon: '⚖️'
                },
              ].map((useCase, index) => (
                <motion.div
                  key={index}
                  custom={index + 1}
                  variants={contentVariants}
                  initial="hidden"
                  animate={isActive ? 'visible' : 'hidden'}
                  className="p-8 bg-white/10 rounded-lg backdrop-blur-sm text-left"
                >
                  <div className="text-5xl mb-4">{useCase.icon}</div>
                  <h3 className={`text-2xl font-bold mb-4 ${textColor}`}>{useCase.title}</h3>
                  <p className={`text-lg ${textColor} opacity-90`}>{useCase.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Business Model Slide Layout */}
        {slide.component === 'BusinessModelSlide' && (
          <div className="text-center">
            <motion.div
              custom={0}
              variants={contentVariants}
              initial="hidden"
              animate={isActive ? 'visible' : 'hidden'}
            >
              <h2 className={`text-4xl md:text-6xl font-bold mb-12 ${textColor}`}>
                {slide.title}
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  title: 'Verification Fees', 
                  percentage: '60%',
                  desc: 'Publishers pay for content verification services'
                },
                { 
                  title: 'Network Fees', 
                  percentage: '25%',
                  desc: 'Transaction fees from network operations'
                },
                { 
                  title: 'Premium Services', 
                  percentage: '15%',
                  desc: 'Advanced analytics and enterprise tools'
                },
              ].map((stream, index) => (
                <motion.div
                  key={index}
                  custom={index + 1}
                  variants={contentVariants}
                  initial="hidden"
                  animate={isActive ? 'visible' : 'hidden'}
                  className="text-center"
                >
                  <div className={`text-5xl md:text-6xl font-bold mb-4 ${textColor === 'text-white' ? 'text-gold' : 'text-coral'}`}>
                    {stream.percentage}
                  </div>
                  <h3 className={`text-2xl font-bold mb-4 ${textColor}`}>{stream.title}</h3>
                  <p className={`text-lg ${textColor} opacity-80`}>{stream.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Competitive Slide Layout */}
        {slide.component === 'CompetitiveSlide' && (
          <div className="text-center">
            <motion.div
              custom={0}
              variants={contentVariants}
              initial="hidden"
              animate={isActive ? 'visible' : 'hidden'}
            >
              <h2 className={`text-4xl md:text-6xl font-bold mb-12 ${textColor}`}>
                {slide.title}
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div
                custom={1}
                variants={contentVariants}
                initial="hidden"
                animate={isActive ? 'visible' : 'hidden'}
                className="text-left"
              >
                <h3 className={`text-3xl font-bold mb-6 ${textColor}`}>Competitors</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-white/5 rounded-lg">
                    <p className={`${textColor} opacity-80`}>❌ Centralized verification</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-lg">
                    <p className={`${textColor} opacity-80`}>❌ Limited transparency</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-lg">
                    <p className={`${textColor} opacity-80`}>❌ No economic incentives</p>
                  </div>
                </div>
              </motion.div>
              <motion.div
                custom={2}
                variants={contentVariants}
                initial="hidden"
                animate={isActive ? 'visible' : 'hidden'}
                className="text-left"
              >
                <h3 className={`text-3xl font-bold mb-6 ${textColor}`}>Evera Protocol</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-white/5 rounded-lg">
                    <p className={`${textColor} opacity-90`}>✅ Fully decentralized network</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-lg">
                    <p className={`${textColor} opacity-90`}>✅ Complete transparency</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-lg">
                    <p className={`${textColor} opacity-90`}>✅ Token-based rewards</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {/* Tokenomics Slide Layout */}
        {slide.component === 'TokenomicsSlide' && (
          <div className="text-center">
            <motion.div
              custom={0}
              variants={contentVariants}
              initial="hidden"
              animate={isActive ? 'visible' : 'hidden'}
            >
              <h2 className={`text-4xl md:text-6xl font-bold mb-12 ${textColor}`}>
                {slide.title}
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div
                custom={1}
                variants={contentVariants}
                initial="hidden"
                animate={isActive ? 'visible' : 'hidden'}
                className="space-y-6"
              >
                <div className="text-left">
                  <h3 className={`text-2xl font-bold mb-4 ${textColor}`}>Token Distribution</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className={`${textColor} opacity-80`}>Community & Rewards</span>
                      <span className={`font-bold ${textColor}`}>40%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={`${textColor} opacity-80`}>Development Fund</span>
                      <span className={`font-bold ${textColor}`}>25%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={`${textColor} opacity-80`}>Team & Advisors</span>
                      <span className={`font-bold ${textColor}`}>20%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={`${textColor} opacity-80`}>Public Sale</span>
                      <span className={`font-bold ${textColor}`}>15%</span>
                    </div>
                  </div>
                </div>
              </motion.div>
              <motion.div
                custom={2}
                variants={contentVariants}
                initial="hidden"
                animate={isActive ? 'visible' : 'hidden'}
                className="text-left"
              >
                <h3 className={`text-2xl font-bold mb-4 ${textColor}`}>Token Utility</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-white/10 rounded-lg">
                    <p className={`${textColor} opacity-90`}>🔹 Verification staking</p>
                  </div>
                  <div className="p-3 bg-white/10 rounded-lg">
                    <p className={`${textColor} opacity-90`}>🔹 Governance voting</p>
                  </div>
                  <div className="p-3 bg-white/10 rounded-lg">
                    <p className={`${textColor} opacity-90`}>🔹 Network fees</p>
                  </div>
                  <div className="p-3 bg-white/10 rounded-lg">
                    <p className={`${textColor} opacity-90`}>🔹 Reward distribution</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {/* Roadmap Slide Layout */}
        {slide.component === 'RoadmapSlide' && (
          <div className="text-center">
            <motion.div
              custom={0}
              variants={contentVariants}
              initial="hidden"
              animate={isActive ? 'visible' : 'hidden'}
            >
              <h2 className={`text-4xl md:text-6xl font-bold mb-12 ${textColor}`}>
                {slide.title}
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { quarter: 'Q1 2026', title: 'MVP Launch', items: ['Core protocol', 'Basic verification'] },
                { quarter: 'Q2 2026', title: 'Public Beta', items: ['Publisher onboarding', 'Validator network'] },
                { quarter: 'Q3 2026', title: 'Token Launch', items: ['Public sale', 'Mainnet deployment'] },
                { quarter: 'Q4 2026', title: 'Enterprise', items: ['API platform', 'Partnership integrations'] },
              ].map((phase, index) => (
                <motion.div
                  key={index}
                  custom={index + 1}
                  variants={contentVariants}
                  initial="hidden"
                  animate={isActive ? 'visible' : 'hidden'}
                  className="text-left p-6 bg-white/10 rounded-lg backdrop-blur-sm"
                >
                  <div className={`text-sm font-bold mb-2 ${textColor === 'text-white' ? 'text-gold' : 'text-coral'}`}>
                    {phase.quarter}
                  </div>
                  <h3 className={`text-xl font-bold mb-3 ${textColor}`}>{phase.title}</h3>
                  <ul className="space-y-1">
                    {phase.items.map((item, i) => (
                      <li key={i} className={`text-sm ${textColor} opacity-80`}>• {item}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Team Slide Layout */}
        {slide.component === 'TeamSlide' && (
          <div className="text-center">
            <motion.div
              custom={0}
              variants={contentVariants}
              initial="hidden"
              animate={isActive ? 'visible' : 'hidden'}
            >
              <h2 className={`text-4xl md:text-6xl font-bold mb-12 ${textColor}`}>
                {slide.title}
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  name: 'Alex Chen', 
                  role: 'CEO & Co-founder',
                  background: 'Former blockchain engineer at Coinbase'
                },
                { 
                  name: 'Sarah Martinez', 
                  role: 'CTO & Co-founder',
                  background: 'Ex-Google AI researcher'
                },
                { 
                  name: 'David Kim', 
                  role: 'Head of Product',
                  background: 'Former product lead at Twitter'
                },
              ].map((member, index) => (
                <motion.div
                  key={index}
                  custom={index + 1}
                  variants={contentVariants}
                  initial="hidden"
                  animate={isActive ? 'visible' : 'hidden'}
                  className="text-center"
                >
                  <div className="w-32 h-32 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                    <div className={`text-4xl ${textColor}`}>👤</div>
                  </div>
                  <h3 className={`text-xl font-bold mb-2 ${textColor}`}>{member.name}</h3>
                  <p className={`text-lg mb-2 ${textColor === 'text-white' ? 'text-gold' : 'text-coral'}`}>{member.role}</p>
                  <p className={`text-sm ${textColor} opacity-80`}>{member.background}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Advisors Slide Layout */}
        {slide.component === 'AdvisorsSlide' && (
          <div className="text-center">
            <motion.div
              custom={0}
              variants={contentVariants}
              initial="hidden"
              animate={isActive ? 'visible' : 'hidden'}
            >
              <h2 className={`text-4xl md:text-6xl font-bold mb-12 ${textColor}`}>
                {slide.title}
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { 
                  name: 'Dr. Jennifer Wu', 
                  role: 'Media Technology Advisor',
                  background: 'Former VP of Innovation at Reuters'
                },
                { 
                  name: 'Michael Rodriguez', 
                  role: 'Blockchain Advisor',
                  background: 'Co-founder of DeFi protocol with $2B TVL'
                },
              ].map((advisor, index) => (
                <motion.div
                  key={index}
                  custom={index + 1}
                  variants={contentVariants}
                  initial="hidden"
                  animate={isActive ? 'visible' : 'hidden'}
                  className="text-center p-6"
                >
                  <div className="w-24 h-24 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                    <div className={`text-3xl ${textColor}`}>👤</div>
                  </div>
                  <h3 className={`text-xl font-bold mb-2 ${textColor}`}>{advisor.name}</h3>
                  <p className={`text-lg mb-2 ${textColor === 'text-charcoal' ? 'text-coral' : 'text-gold'}`}>{advisor.role}</p>
                  <p className={`text-sm ${textColor} opacity-80`}>{advisor.background}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Traction Slide Layout */}
        {slide.component === 'TractionSlide' && (
          <div className="text-center">
            <motion.div
              custom={0}
              variants={contentVariants}
              initial="hidden"
              animate={isActive ? 'visible' : 'hidden'}
            >
              <h2 className={`text-4xl md:text-6xl font-bold mb-12 ${textColor}`}>
                {slide.title}
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { value: '15K+', label: 'Waitlist signups' },
                { value: '50+', label: 'Publisher partnerships' },
                { value: '$2.5M', label: 'Pre-seed funding' },
              ].map((metric, index) => (
                <motion.div
                  key={index}
                  custom={index + 1}
                  variants={contentVariants}
                  initial="hidden"
                  animate={isActive ? 'visible' : 'hidden'}
                  className="text-center"
                >
                  <div className={`text-5xl md:text-7xl font-bold mb-4 ${textColor === 'text-white' ? 'text-gold' : 'text-coral'}`}>
                    {metric.value}
                  </div>
                  <p className={`text-xl ${textColor} opacity-80`}>
                    {metric.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Partnerships Slide Layout */}
        {slide.component === 'PartnershipsSlide' && (
          <div className="text-center">
            <motion.div
              custom={0}
              variants={contentVariants}
              initial="hidden"
              animate={isActive ? 'visible' : 'hidden'}
            >
              <h2 className={`text-4xl md:text-6xl font-bold mb-12 ${textColor}`}>
                {slide.title}
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { 
                  category: 'Media Partners',
                  partners: ['TechCrunch', 'The Block', 'CoinDesk', 'Decrypt']
                },
                { 
                  category: 'Technology Partners',
                  partners: ['Chainlink', 'Polygon', 'The Graph', 'IPFS']
                },
              ].map((group, index) => (
                <motion.div
                  key={index}
                  custom={index + 1}
                  variants={contentVariants}
                  initial="hidden"
                  animate={isActive ? 'visible' : 'hidden'}
                  className="text-center p-6 bg-white/10 rounded-lg backdrop-blur-sm"
                >
                  <h3 className={`text-2xl font-bold mb-6 ${textColor}`}>{group.category}</h3>
                  <div className="space-y-3">
                    {group.partners.map((partner, i) => (
                      <div key={i} className="p-3 bg-white/5 rounded">
                        <span className={`${textColor} opacity-90`}>{partner}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Investment Slide Layout */}
        {slide.component === 'InvestmentSlide' && (
          <div className="text-center">
            <motion.div
              custom={0}
              variants={contentVariants}
              initial="hidden"
              animate={isActive ? 'visible' : 'hidden'}
            >
              <h2 className={`text-4xl md:text-6xl font-bold mb-8 ${textColor}`}>
                {slide.title}
              </h2>
            </motion.div>
            <motion.div
              custom={1}
              variants={contentVariants}
              initial="hidden"
              animate={isActive ? 'visible' : 'hidden'}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="text-center">
                  <div className={`text-6xl md:text-8xl font-bold mb-4 ${textColor === 'text-white' ? 'text-gold' : 'text-coral'}`}>
                    $10M
                  </div>
                  <p className={`text-2xl ${textColor} opacity-90`}>
                    Series A Target
                  </p>
                </div>
                <div className="text-center">
                  <div className={`text-6xl md:text-8xl font-bold mb-4 ${textColor === 'text-white' ? 'text-gold' : 'text-coral'}`}>
                    18-24
                  </div>
                  <p className={`text-2xl ${textColor} opacity-90`}>
                    Month Runway
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Use of Funds Slide Layout */}
        {slide.component === 'UseOfFundsSlide' && (
          <div className="text-center">
            <motion.div
              custom={0}
              variants={contentVariants}
              initial="hidden"
              animate={isActive ? 'visible' : 'hidden'}
            >
              <h2 className={`text-4xl md:text-6xl font-bold mb-12 ${textColor}`}>
                {slide.title}
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { category: 'Engineering', percentage: '50%', desc: 'Protocol development & security' },
                { category: 'Marketing', percentage: '25%', desc: 'User acquisition & partnerships' },
                { category: 'Operations', percentage: '15%', desc: 'Team expansion & infrastructure' },
                { category: 'Legal', percentage: '10%', desc: 'Compliance & regulatory' },
              ].map((fund, index) => (
                <motion.div
                  key={index}
                  custom={index + 1}
                  variants={contentVariants}
                  initial="hidden"
                  animate={isActive ? 'visible' : 'hidden'}
                  className="text-center"
                >
                  <div className={`text-4xl md:text-5xl font-bold mb-4 ${textColor === 'text-white' ? 'text-gold' : 'text-coral'}`}>
                    {fund.percentage}
                  </div>
                  <h3 className={`text-xl font-bold mb-2 ${textColor}`}>{fund.category}</h3>
                  <p className={`text-sm ${textColor} opacity-80`}>{fund.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Milestones Slide Layout */}
        {slide.component === 'MilestonesSlide' && (
          <div className="text-center">
            <motion.div
              custom={0}
              variants={contentVariants}
              initial="hidden"
              animate={isActive ? 'visible' : 'hidden'}
            >
              <h2 className={`text-4xl md:text-6xl font-bold mb-12 ${textColor}`}>
                {slide.title}
              </h2>
            </motion.div>
            <div className="space-y-6">
              {[
                { milestone: 'MVP Launch', target: '6 months', status: 'Completed' },
                { milestone: '1,000 Validators', target: '12 months', status: 'In Progress' },
                { milestone: '100K Verifications', target: '18 months', status: 'Upcoming' },
                { milestone: 'Enterprise Platform', target: '24 months', status: 'Planned' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  custom={index + 1}
                  variants={contentVariants}
                  initial="hidden"
                  animate={isActive ? 'visible' : 'hidden'}
                  className="flex items-center justify-between p-4 bg-white/10 rounded-lg backdrop-blur-sm"
                >
                  <div className="text-left">
                    <h3 className={`text-xl font-bold ${textColor}`}>{item.milestone}</h3>
                    <p className={`text-sm ${textColor} opacity-80`}>{item.target}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    item.status === 'Completed' ? 'bg-green-500 text-white' :
                    item.status === 'In Progress' ? 'bg-yellow-500 text-charcoal' :
                    'bg-gray-500 text-white'
                  }`}>
                    {item.status}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Vision Slide Layout */}
        {slide.component === 'VisionSlide' && (
          <div className="text-center">
            <motion.div
              custom={0}
              variants={contentVariants}
              initial="hidden"
              animate={isActive ? 'visible' : 'hidden'}
            >
              <h2 className={`text-4xl md:text-6xl font-bold mb-8 ${textColor}`}>
                {slide.title}
              </h2>
            </motion.div>
            <motion.div
              custom={1}
              variants={contentVariants}
              initial="hidden"
              animate={isActive ? 'visible' : 'hidden'}
              className="max-w-4xl mx-auto space-y-8"
            >
              <p className={`text-2xl md:text-3xl ${textColor} opacity-90 leading-relaxed`}>
                "A world where every piece of information comes with verifiable proof of its accuracy, 
                source, and intent."
              </p>
              <p className={`text-xl ${textColor} opacity-80`}>
                We're building the infrastructure for truth in the digital age, 
                where transparency and accuracy are rewarded, and misinformation cannot thrive.
              </p>
            </motion.div>
          </div>
        )}

        {/* CTA Slide Layout */}
        {slide.component === 'CTASlide' && (
          <div className="text-center">
            <motion.div
              custom={0}
              variants={contentVariants}
              initial="hidden"
              animate={isActive ? 'visible' : 'hidden'}
            >
              <h2 className={`text-5xl md:text-7xl font-bold mb-8 ${textColor}`}>
                {slide.title}
              </h2>
            </motion.div>
            <motion.div
              custom={1}
              variants={contentVariants}
              initial="hidden"
              animate={isActive ? 'visible' : 'hidden'}
              className="space-y-8"
            >
              <p className={`text-2xl md:text-3xl ${textColor} opacity-90 mb-12`}>
                Help us build the future of verifiable information
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button className="px-8 py-4 bg-gold text-charcoal font-bold text-xl rounded-lg hover:bg-gold/90 transition-colors">
                  Invest Now
                </button>
                <button className={`px-8 py-4 border-2 ${textColor === 'text-white' ? 'border-white text-white hover:bg-white/10' : 'border-charcoal text-charcoal hover:bg-charcoal/10'} font-bold text-xl rounded-lg transition-colors`}>
                  Schedule Demo
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Contact Slide Layout */}
        {slide.component === 'ContactSlide' && (
          <div className="text-center">
            <motion.div
              custom={0}
              variants={contentVariants}
              initial="hidden"
              animate={isActive ? 'visible' : 'hidden'}
            >
              <h2 className={`text-4xl md:text-6xl font-bold mb-12 ${textColor}`}>
                {slide.title}
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div
                custom={1}
                variants={contentVariants}
                initial="hidden"
                animate={isActive ? 'visible' : 'hidden'}
                className="text-left space-y-6"
              >
                <h3 className={`text-2xl font-bold ${textColor}`}>Investment Inquiries</h3>
                <div className="space-y-3">
                  <p className={`${textColor} opacity-90`}>📧 invest@evera.network</p>
                  <p className={`${textColor} opacity-90`}>📱 +1 (555) 123-4567</p>
                  <p className={`${textColor} opacity-90`}>🏢 San Francisco, CA</p>
                </div>
              </motion.div>
              <motion.div
                custom={2}
                variants={contentVariants}
                initial="hidden"
                animate={isActive ? 'visible' : 'hidden'}
                className="text-left space-y-6"
              >
                <h3 className={`text-2xl font-bold ${textColor}`}>Partnership Inquiries</h3>
                <div className="space-y-3">
                  <p className={`${textColor} opacity-90`}>📧 partnerships@evera.network</p>
                  <p className={`${textColor} opacity-90`}>🌐 evera.network</p>
                  <p className={`${textColor} opacity-90`}>💬 @EveraProtocol</p>
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {/* Thank You Slide Layout */}
        {slide.component === 'ThankYouSlide' && (
          <div className="text-center">
            <motion.div
              custom={0}
              variants={contentVariants}
              initial="hidden"
              animate={isActive ? 'visible' : 'hidden'}
            >
              <h2 className={`text-6xl md:text-8xl font-bold mb-8 ${textColor}`}>
                {slide.title}
              </h2>
            </motion.div>
            <motion.div
              custom={1}
              variants={contentVariants}
              initial="hidden"
              animate={isActive ? 'visible' : 'hidden'}
              className="space-y-8"
            >
              <p className={`text-2xl md:text-3xl ${textColor} opacity-90`}>
                Questions & Discussion
              </p>
              <div className="text-6xl">🙏</div>
            </motion.div>
          </div>
        )}

        {/* Default Content Layout for any missing components */}
        {![
          'TitleSlide', 'ProblemSlide', 'StatSlide', 'SolutionSlide', 'ArchitectureSlide',
          'MarketSlide', 'FeaturesSlide', 'UseCasesSlide', 'BusinessModelSlide', 'CompetitiveSlide',
          'TokenomicsSlide', 'RoadmapSlide', 'TeamSlide', 'AdvisorsSlide', 'TractionSlide',
          'PartnershipsSlide', 'InvestmentSlide', 'UseOfFundsSlide', 'MilestonesSlide',
          'VisionSlide', 'CTASlide', 'ContactSlide', 'ThankYouSlide'
        ].includes(slide.component) && (
          <div className="text-center">
            <motion.div
              custom={0}
              variants={contentVariants}
              initial="hidden"
              animate={isActive ? 'visible' : 'hidden'}
            >
              <h2 className={`text-4xl md:text-6xl font-bold mb-8 ${textColor}`}>
                {slide.title}
              </h2>
              <p className={`text-xl md:text-2xl ${textColor} opacity-80`}>
                Content for {slide.component}
              </p>
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
