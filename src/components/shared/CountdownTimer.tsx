'use client';

// T030 - Implement CountdownTimer component
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export interface CountdownTimerProps {
  targetDate: Date;
  size?: 'small' | 'medium' | 'large';
  onComplete?: () => void;
  className?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownTimer({
  targetDate,
  size = 'medium',
  onComplete,
  className = '',
}: CountdownTimerProps): JSX.Element {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [hasEnded, setHasEnded] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = (): TimeLeft => {
      const difference = targetDate.getTime() - new Date().getTime();

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    // Initial calculation
    const initialTimeLeft = calculateTimeLeft();
    setTimeLeft(initialTimeLeft);

    if (
      initialTimeLeft.days === 0 &&
      initialTimeLeft.hours === 0 &&
      initialTimeLeft.minutes === 0 &&
      initialTimeLeft.seconds === 0
    ) {
      setHasEnded(true);
      onComplete?.();
    }

    // Update every second
    const interval = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      if (
        newTimeLeft.days === 0 &&
        newTimeLeft.hours === 0 &&
        newTimeLeft.minutes === 0 &&
        newTimeLeft.seconds === 0 &&
        !hasEnded
      ) {
        setHasEnded(true);
        onComplete?.();
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate, onComplete, hasEnded]);

  const sizeClasses = {
    small: {
      container: 'gap-2',
      number: 'text-2xl',
      label: 'text-xs',
      box: 'min-w-[60px]',
    },
    medium: {
      container: 'gap-4',
      number: 'text-4xl',
      label: 'text-sm',
      box: 'min-w-[80px]',
    },
    large: {
      container: 'gap-6',
      number: 'text-6xl',
      label: 'text-base',
      box: 'min-w-[100px]',
    },
  };

  const styles = sizeClasses[size];

  if (hasEnded) {
    return (
      <div className={`text-center ${className}`}>
        <p className={`font-bold text-gold ${styles.number}`}>Ended</p>
      </div>
    );
  }

  if (!timeLeft) {
    return (
      <div className={`text-center ${className}`}>
        <p className={`font-bold text-charcoal ${styles.number}`}>Loading...</p>
      </div>
    );
  }

  const timeUnits = [
    { value: timeLeft.days, label: 'Days' },
    { value: timeLeft.hours, label: 'Hours' },
    { value: timeLeft.minutes, label: 'Minutes' },
    { value: timeLeft.seconds, label: 'Seconds' },
  ];

  return (
    <div className={`flex ${styles.container} justify-center ${className}`}>
      {timeUnits.map((unit, index) => (
        <motion.div
          key={unit.label}
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{
            duration: 0.3,
            times: [0, 0.5, 1],
          }}
          className={`flex flex-col items-center ${styles.box}`}
        >
          <div className="bg-charcoal text-gold rounded-lg p-3 shadow-lg min-w-full flex items-center justify-center">
            <motion.span
              key={unit.value}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className={`font-bold ${styles.number}`}
            >
              {String(unit.value).padStart(2, '0')}
            </motion.span>
          </div>
          <span className={`mt-2 text-charcoal font-semibold ${styles.label}`}>
            {unit.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
