import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({
  className,
  variant = 'default',
  size = 'md',
  children,
  ...props
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50';
  
  const variants = {
    default: 'bg-blue-600 text-white hover:bg-blue-500 hover:shadow-lg transform hover:scale-105 transition-all duration-200',
    secondary: 'bg-gray-700 text-white hover:bg-gray-600 hover:text-blue-200 transform hover:scale-105 transition-all duration-200',
    outline: 'border border-gray-600 bg-gray-800 text-white hover:bg-gray-700 hover:border-blue-500 hover:text-blue-200 transition-all duration-200',
    ghost: 'text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200',
    destructive: 'bg-red-600 text-white hover:bg-red-500 hover:shadow-lg transform hover:scale-105 transition-all duration-200'
  };

  const sizes = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 py-2',
    lg: 'h-12 px-8 text-lg'
  };

  return (
    <button
      className={cn(baseClasses, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}