import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    const inputClasses = `
      w-full px-4 py-3 rounded-lg border-2 
      ${error ? 'border-coral' : 'border-stone'} 
      focus:outline-none focus:border-gold 
      transition-colors duration-200
      disabled:bg-stone/30 disabled:cursor-not-allowed
      ${className}
    `.trim().replace(/\s+/g, ' ');

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-semibold text-charcoal mb-2">
            {label}
          </label>
        )}
        
        <input
          ref={ref}
          className={inputClasses}
          {...props}
        />
        
        {error && (
          <p className="mt-2 text-sm text-coral" role="alert">
            {error}
          </p>
        )}
        
        {helperText && !error && (
          <p className="mt-2 text-sm text-charcoal/60">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
