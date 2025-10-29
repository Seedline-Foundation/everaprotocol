// T036 - Implement StatsSection component
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/shared/AnimatedSection';

interface Stat {
  id: string;
  value: string | number;
  label: string;
  suffix?: string;
  prefix?: string;
  animated?: boolean;
}

interface StatsSectionProps {
  headline?: string;
  stats: Stat[];
  variant?: 'light' | 'dark';
}

export function StatsSection({
  headline,
  stats,
  variant = 'dark',
}: StatsSectionProps): JSX.Element {
  const bgClass = variant === 'dark' ? 'bg-charcoal' : 'bg-white';
  const textClass = variant === 'dark' ? 'text-white' : 'text-charcoal';
  const labelClass = variant === 'dark' ? 'text-stone' : 'text-charcoal/70';

  return (
    <section className={`py-20 ${bgClass}`}>
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Headline */}
        {headline && (
          <AnimatedSection animation="fade">
            <h2
              className={`text-3xl md:text-4xl font-bold text-center mb-12 ${textClass}`}
            >
              {headline}
            </h2>
          </AnimatedSection>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <AnimatedSection
              key={stat.id}
              animation="slide-up"
              delay={index * 0.1}
            >
              <StatCard
                stat={stat}
                textClass={textClass}
                labelClass={labelClass}
              />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// Separate StatCard component for counter animation
interface StatCardProps {
  stat: Stat;
  textClass: string;
  labelClass: string;
}

function StatCard({ stat, textClass, labelClass }: StatCardProps): JSX.Element {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Animate counter if stat.animated is true
  useEffect(() => {
    if (!stat.animated || !isVisible) return;

    // Extract numeric value from stat.value
    const targetValue =
      typeof stat.value === 'number'
        ? stat.value
        : parseFloat(String(stat.value).replace(/[^0-9.]/g, ''));

    if (isNaN(targetValue)) return;

    const duration = 2000; // 2 seconds
    const startTime = Date.now();
    const step = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeOut * targetValue);

      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [stat.value, stat.animated, isVisible]);

  // Intersection Observer to trigger animation
  useEffect(() => {
    if (!stat.animated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [stat.animated]);

  const displayValue = stat.animated ? count : stat.value;

  return (
    <div ref={ref} className="text-center">
      <motion.div
        className={`text-5xl md:text-6xl font-bold mb-2 ${textClass}`}
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        {stat.prefix}
        {displayValue}
        {stat.suffix}
      </motion.div>
      <p className={`text-lg font-medium ${labelClass}`}>{stat.label}</p>
    </div>
  );
}
