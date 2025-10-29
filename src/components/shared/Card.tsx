'use client';

import { HTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'bordered';
  padding?: 'none' | 'small' | 'medium' | 'large';
  shadow?: 'none' | 'small' | 'medium' | 'large';
  clickable?: boolean;
  href?: string;
  children: React.ReactNode;
}

export function Card({
  variant = 'default',
  padding = 'medium',
  shadow = 'medium',
  clickable = false,
  href,
  children,
  className = '',
  onClick,
  ...props
}: CardProps): JSX.Element {
  const baseClasses = 'rounded-lg transition-all duration-300';
  
  const variantClasses = {
    default: 'bg-white',
    elevated: 'bg-white',
    bordered: 'bg-white border-2 border-stone',
  };
  
  const paddingClasses = {
    none: '',
    small: 'p-4',
    medium: 'p-6',
    large: 'p-8',
  };

  const shadowClasses = {
    none: '',
    small: 'shadow-sm',
    medium: 'shadow-md',
    large: 'shadow-lg',
  };
  
  const hoverClasses = clickable || href ? 'hover:shadow-xl hover:-translate-y-2 cursor-pointer' : '';
  
  const classes = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${paddingClasses[padding]}
    ${shadowClasses[shadow]}
    ${hoverClasses}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  const cardContent = (
    <motion.div
      className={classes}
      whileHover={clickable || href ? { scale: 1.02 } : {}}
      role={clickable || onClick ? 'button' : undefined}
      tabIndex={clickable || onClick ? 0 : undefined}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
