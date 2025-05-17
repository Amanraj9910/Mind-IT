import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  percentage: number;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
  animate?: boolean;
}

export const ProgressBar = ({
  percentage,
  color,
  size = 'md',
  showLabel = false,
  className = '',
  animate = true,
}: ProgressBarProps) => {
  const [value, setValue] = useState(0);
  
  useEffect(() => {
    if (animate) {
      // Start with 0 and animate to the actual percentage
      setValue(0);
      const timeout = setTimeout(() => {
        setValue(percentage);
      }, 100);
      
      return () => clearTimeout(timeout);
    } else {
      setValue(percentage);
    }
  }, [percentage, animate]);
  
  // Size classes
  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };
  
  // Default color based on percentage
  const getDefaultColor = () => {
    if (percentage < 30) return 'bg-red-500';
    if (percentage < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };
  
  const colorClass = color ? `bg-[${color}]` : getDefaultColor();
  
  return (
    <div className={`w-full ${className}`}>
      <div className={`w-full ${sizeClasses[size]} bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden`}>
        <motion.div
          className={`${sizeClasses[size]} ${colorClass} rounded-full`}
          initial={{ width: '0%' }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
      {showLabel && (
        <div className="mt-1 text-xs text-gray-600 dark:text-gray-400 text-right">
          {Math.round(percentage)}%
        </div>
      )}
    </div>
  );
};
