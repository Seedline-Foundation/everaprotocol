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

        {/* Default Content Layout */}
        {!['TitleSlide', 'ProblemSlide', 'StatSlide', 'SolutionSlide'].includes(slide.component) && (
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
