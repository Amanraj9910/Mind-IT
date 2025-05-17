import { useState } from 'react';
import { motion } from 'framer-motion';
import { useHabitStore } from '../store/habitStore';
import { HabitCard } from '../components/habits/HabitCard';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Button } from '../components/ui/Button';
import { 
  getCurrentWeekDays, 
  formatShortDate, 
  getDayName, 
  formatDate 
} from '../utils/dateUtils';

export const WeeklyOverview = () => {
  const [selectedDay, setSelectedDay] = useState<Date>(new Date());
  
  const habits = useHabitStore((state) => state.habits);
  const categories = useHabitStore((state) => state.categories);
  const toggleCompletion = useHabitStore((state) => state.toggleCompletion);
  const getStreakCount = useHabitStore((state) => state.getStreakCount);
  
  // Get the days of the current week
  const weekDays = getCurrentWeekDays();
  
  // Calculate completion for each day
  const dailyCompletions = weekDays.map(day => {
    const dateStr = formatDate(day);
    const totalHabits = habits.length;
    const completedHabits = habits.filter(habit => habit.completions[dateStr]).length;
    const percentage = totalHabits > 0 ? (completedHabits / totalHabits) * 100 : 0;
    
    return {
      date: day,
      dateStr,
      completed: completedHabits,
      total: totalHabits,
      percentage
    };
  });
  
  // Calculate weekly average
  const weeklyAverage = dailyCompletions.reduce((sum, day) => sum + day.percentage, 0) / 7;
  
  const handleDaySelect = (day: Date) => {
    setSelectedDay(day);
  };
  
  const handleToggleHabit = (id: string, date: string) => {
    toggleCompletion(id, date);
  };
  
  const selectedDateStr = formatDate(selectedDay);
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Weekly Overview
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track your habits throughout the week
        </p>
      </div>
      
      {/* Weekly Progress */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200">
            Weekly Progress
          </h2>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {Math.round(weeklyAverage)}% average
          </span>
        </div>
        <ProgressBar 
          percentage={weeklyAverage} 
          size="lg"
          showLabel
        />
      </div>
      
      {/* Day Selector */}
      <div className="grid grid-cols-7 gap-2 mb-6">
        {weekDays.map((day, index) => {
          const dayData = dailyCompletions[index];
          const isSelected = formatDate(day) === formatDate(selectedDay);
          
          return (
            <motion.div
              key={formatDate(day)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`cursor-pointer rounded-lg p-3 text-center ${
                isSelected 
                  ? 'bg-primary-light dark:bg-primary-dark text-white' 
                  : 'bg-surface-light dark:bg-surface-dark hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              onClick={() => handleDaySelect(day)}
            >
              <div className="text-xs font-medium mb-1">
                {getDayName(day, true)}
              </div>
              <div className="text-lg font-bold mb-2">
                {day.getDate()}
              </div>
              <div className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-achievement-light dark:bg-achievement-dark rounded-full"
                  style={{ width: `${dayData.percentage}%` }}
                />
              </div>
              <div className="text-xs mt-1">
                {dayData.completed}/{dayData.total}
              </div>
            </motion.div>
          );
        })}
      </div>
      
      {/* Selected Day Habits */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          {formatShortDate(selectedDay)} · {getDayName(selectedDay)}
        </h2>
        
        {habits.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">
              You don't have any habits yet.
            </p>
            <Button
              onClick={() => window.location.href = '/'}
              variant="primary"
              className="mt-4"
            >
              Add Your First Habit
            </Button>
          </div>
        ) : (
          <motion.div layout className="space-y-4">
            {habits.map((habit) => {
              const category = categories.find(c => c.id === habit.categoryId) || categories[0];
              const { current } = getStreakCount(habit.id);
              
              return (
                <motion.div
                  key={habit.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <HabitCard
                    habit={habit}
                    category={category}
                    onToggle={handleToggleHabit}
                    date={selectedDateStr}
                    currentStreak={current}
                    showProgress={false}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
};
