import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Habit, Category } from '../../types';
import { Card } from '../ui/Card';
import { ProgressBar } from '../ui/ProgressBar';
import { formatDate } from '../../utils/dateUtils';

interface HabitCardProps {
  habit: Habit;
  category: Category;
  onToggle: (id: string, date: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  date?: string; // Optional date, defaults to today
  showProgress?: boolean;
  showStreak?: boolean;
  currentStreak?: number;
}

export const HabitCard = ({
  habit,
  category,
  onToggle,
  onEdit,
  onDelete,
  date = formatDate(new Date()),
  showProgress = true,
  showStreak = true,
  currentStreak = 0,
}: HabitCardProps) => {
  const [isCompleted, setIsCompleted] = useState(habit.completions[date] || false);
  
  const handleToggle = () => {
    const newState = !isCompleted;
    setIsCompleted(newState);
    onToggle(habit.id, date);
  };
  
  return (
    <Card 
      className="p-4 mb-3 border border-gray-100 dark:border-gray-800"
      elevation="sm"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center">
            <div 
              className="w-3 h-3 rounded-full mr-2" 
              style={{ backgroundColor: category.color }}
            />
            <h3 className="font-medium text-gray-900 dark:text-gray-100">{habit.name}</h3>
          </div>
          
          {habit.description && (
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {habit.description}
            </p>
          )}
          
          {showStreak && currentStreak > 0 && (
            <div className="mt-2 flex items-center">
              <span className="text-xs font-medium text-achievement-light dark:text-achievement-dark">
                🔥 {currentStreak} day streak
              </span>
            </div>
          )}
        </div>
        
        <div className="flex items-center">
          <motion.button
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              isCompleted 
                ? 'bg-primary-light dark:bg-primary-dark border-primary-light dark:border-primary-dark' 
                : 'border-gray-300 dark:border-gray-600'
            }`}
            onClick={handleToggle}
            whileTap={{ scale: 0.85 }}
          >
            <AnimatePresence>
              {isCompleted && (
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.path
                    d="M20 6L9 17l-5-5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  />
                </motion.svg>
              )}
            </AnimatePresence>
          </motion.button>
          
          {(onEdit || onDelete) && (
            <div className="ml-2">
              <button 
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                onClick={() => onEdit && onEdit(habit.id)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
      
      {showProgress && (
        <div className="mt-3">
          <ProgressBar 
            percentage={70} // This should be calculated based on habit completion history
            size="sm"
          />
        </div>
      )}
    </Card>
  );
};
