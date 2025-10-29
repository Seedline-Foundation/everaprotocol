import Link from 'next/link';
import { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';

type BaseButtonProps = {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  loading?: boolean;
  children: React.ReactNode;
};

type ButtonAsButton = BaseButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type ButtonAsLink = BaseButtonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  loading = false,
  children,
  className = '',
  ...props
}: ButtonProps): JSX.Element {
  const baseClasses = 'inline-flex items-center justify-center font-semibold transition-all duration-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-gold hover:bg-gold/90 text-charcoal shadow-md hover:shadow-lg',
    secondary: 'bg-charcoal hover:bg-charcoal/90 text-white shadow-md hover:shadow-lg',
    outline: 'border-2 border-gold text-gold hover:bg-gold hover:text-charcoal',
    ghost: 'text-charcoal hover:bg-stone',
  };
  
  const sizeClasses = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg',
  };
  
  const classes = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  // Loading spinner SVG
  const Spinner = () => (
    <svg
      className="animate-spin -ml-1 mr-2 h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  if ('href' in props && props.href) {
    const { href, ...anchorProps } = props;
    return (
      <Link href={href} className={classes} {...anchorProps}>
        {loading && <Spinner />}
        {children}
      </Link>
    );
  }

  const { disabled, ...buttonProps } = props as ButtonHTMLAttributes<HTMLButtonElement>;
  const isDisabled = disabled || loading;

  return (
    <button className={classes} disabled={isDisabled} {...buttonProps}>
      {loading && <Spinner />}
      {children}
    </button>
  );
}
