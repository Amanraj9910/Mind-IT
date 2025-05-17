import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  interactive?: boolean;
  elevation?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card = ({
  children,
  className = '',
  onClick,
  interactive = false,
  elevation = 'sm',
}: CardProps) => {
  // Base classes
  const baseClasses = 'rounded-lg bg-surface-light dark:bg-surface-dark overflow-hidden';
  
  // Elevation classes
  const elevationClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
  };
  
  // Interactive classes
  const interactiveClasses = interactive
    ? 'cursor-pointer transition-all hover:shadow-md active:shadow-sm active:translate-y-0.5'
    : '';
  
  return (
    <motion.div
      className={`${baseClasses} ${elevationClasses[elevation]} ${interactiveClasses} ${className}`}
      onClick={onClick}
      whileHover={interactive ? { scale: 1.02 } : {}}
      whileTap={interactive ? { scale: 0.98 } : {}}
    >
      {children}
    </motion.div>
  );
};
