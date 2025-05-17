import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StreakCounterProps {
  current: number;
  longest: number;
  showAnimation: boolean;
}

export const StreakCounter = ({
  current,
  longest,
  showAnimation,
}: StreakCounterProps) => {
  const [prevCurrent, setPrevCurrent] = useState(current);
  const [showMilestone, setShowMilestone] = useState(false);
  
  // Check if we've reached a milestone
  useEffect(() => {
    if (current > prevCurrent) {
      // Check if current streak is a milestone (3, 7, 14, 30, 60, 90, etc.)
      const milestones = [3, 7, 14, 30, 60, 90, 180, 365];
      
      if (milestones.includes(current) && showAnimation) {
        setShowMilestone(true);
        
        // Hide milestone animation after 3 seconds
        const timeout = setTimeout(() => {
          setShowMilestone(false);
        }, 3000);
        
        return () => clearTimeout(timeout);
      }
    }
    
    setPrevCurrent(current);
  }, [current, prevCurrent, showAnimation]);
  
  return (
    <div className="relative">
      <div className="flex items-center space-x-1">
        <span className="text-achievement-light dark:text-achievement-dark">🔥</span>
        <motion.span
          key={current}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-medium"
        >
          {current} day streak
        </motion.span>
      </div>
      
      {longest > current && (
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Longest: {longest} days
        </div>
      )}
      
      <AnimatePresence>
        {showMilestone && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: -40 }}
            exit={{ opacity: 0, scale: 1.2, y: -60 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-achievement-light dark:bg-achievement-dark text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg"
          >
            🎉 {current} Day Milestone!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
