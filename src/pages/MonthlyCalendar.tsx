import { useState } from 'react';
import { motion } from 'framer-motion';
import { useHabitStore } from '../store/habitStore';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { 
  getStartOfMonth, 
  getEndOfMonth, 
  getDatesBetween, 
  formatDate, 
  getMonthName,
  getDayName
} from '../utils/dateUtils';

export const MonthlyCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedHabitId, setSelectedHabitId] = useState<string | 'all'>('all');
  
  const habits = useHabitStore((state) => state.habits);
  const categories = useHabitStore((state) => state.categories);
  
  // Get all days in the current month
  const startOfMonth = getStartOfMonth(currentMonth);
  const endOfMonth = getEndOfMonth(currentMonth);
  const daysInMonth = getDatesBetween(startOfMonth, endOfMonth);
  
  // Get the day of the week for the first day of the month (0 = Sunday, 6 = Saturday)
  const firstDayOfWeek = startOfMonth.getDay();
  
  // Create an array of blank days to fill in the calendar before the first day
  const blankDays = Array(firstDayOfWeek).fill(null);
  
  // Calculate completion rates for the selected habit or all habits
  const getCompletionRate = (date: Date) => {
    const dateStr = formatDate(date);
    
    if (selectedHabitId === 'all') {
      const totalHabits = habits.length;
      if (totalHabits === 0) return 0;
      
      const completedHabits = habits.filter(habit => habit.completions[dateStr]).length;
      return completedHabits / totalHabits;
    } else {
      const habit = habits.find(h => h.id === selectedHabitId);
      return habit?.completions[dateStr] ? 1 : 0;
    }
  };
  
  // Get color based on completion rate
  const getHeatmapColor = (completionRate: number) => {
    if (completionRate === 0) return 'bg-gray-100 dark:bg-gray-800';
    if (completionRate < 0.25) return 'bg-green-100 dark:bg-green-900';
    if (completionRate < 0.5) return 'bg-green-200 dark:bg-green-800';
    if (completionRate < 0.75) return 'bg-green-300 dark:bg-green-700';
    return 'bg-green-500 dark:bg-green-600';
  };
  
  // Navigate to previous month
  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  
  // Navigate to next month
  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  
  // Navigate to current month
  const goToCurrentMonth = () => {
    setCurrentMonth(new Date());
  };
  
  // Day names for the calendar header
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Monthly Calendar
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          View your habit completion patterns over time
        </p>
      </div>
      
      {/* Month Navigation */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <Button
            onClick={goToPreviousMonth}
            variant="outline"
            aria-label="Previous month"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </Button>
          
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {getMonthName(currentMonth)} {currentMonth.getFullYear()}
          </h2>
          
          <Button
            onClick={goToNextMonth}
            variant="outline"
            aria-label="Next month"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </Button>
        </div>
        
        <Button
          onClick={goToCurrentMonth}
          variant="secondary"
          size="sm"
        >
          Today
        </Button>
      </div>
      
      {/* Habit Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Select Habit
        </label>
        <select
          value={selectedHabitId}
          onChange={(e) => setSelectedHabitId(e.target.value)}
          className="w-full md:w-64 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark dark:bg-gray-700 dark:text-white"
        >
          <option value="all">All Habits</option>
          {habits.map((habit) => (
            <option key={habit.id} value={habit.id}>
              {habit.name}
            </option>
          ))}
        </select>
      </div>
      
      {/* Calendar */}
      <Card className="p-4">
        {/* Calendar Header */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map((day) => (
            <div key={day} className="text-center text-sm font-medium text-gray-600 dark:text-gray-400 py-2">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Blank days */}
          {blankDays.map((_, index) => (
            <div key={`blank-${index}`} className="aspect-square"></div>
          ))}
          
          {/* Month days */}
          {daysInMonth.map((day) => {
            const completionRate = getCompletionRate(day);
            const colorClass = getHeatmapColor(completionRate);
            const isToday = formatDate(day) === formatDate(new Date());
            const dateStr = formatDate(day);
            
            return (
              <motion.div
                key={dateStr}
                whileHover={{ scale: 1.05 }}
                className={`aspect-square rounded-lg flex flex-col items-center justify-center ${colorClass} ${
                  isToday ? 'ring-2 ring-primary-light dark:ring-primary-dark' : ''
                }`}
              >
                <span className="text-sm font-medium">
                  {day.getDate()}
                </span>
                {selectedHabitId === 'all' && (
                  <span className="text-xs mt-1">
                    {Math.round(completionRate * 100)}%
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>
      </Card>
      
      {/* Legend */}
      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Completion Rate
        </h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-4 h-4 rounded bg-gray-100 dark:bg-gray-800 mr-1"></div>
            <span className="text-xs">0%</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded bg-green-100 dark:bg-green-900 mr-1"></div>
            <span className="text-xs">1-25%</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded bg-green-200 dark:bg-green-800 mr-1"></div>
            <span className="text-xs">26-50%</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded bg-green-300 dark:bg-green-700 mr-1"></div>
            <span className="text-xs">51-75%</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded bg-green-500 dark:bg-green-600 mr-1"></div>
            <span className="text-xs">76-100%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
