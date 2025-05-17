import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useHabitStore } from '../store/habitStore';
import { HabitCard } from '../components/habits/HabitCard';
import { HabitForm } from '../components/habits/HabitForm';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Button } from '../components/ui/Button';
import { getTodayFormatted, formatReadableDate } from '../utils/dateUtils';

export const Dashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingHabitId, setEditingHabitId] = useState<string | null>(null);
  
  const habits = useHabitStore((state) => state.habits);
  const categories = useHabitStore((state) => state.categories);
  const addHabit = useHabitStore((state) => state.addHabit);
  const updateHabit = useHabitStore((state) => state.updateHabit);
  const toggleCompletion = useHabitStore((state) => state.toggleCompletion);
  const getStreakCount = useHabitStore((state) => state.getStreakCount);
  
  const today = getTodayFormatted();
  const todayDate = new Date();
  
  // Calculate today's progress
  const totalHabits = habits.length;
  const completedHabits = habits.filter(habit => habit.completions[today]).length;
  const completionPercentage = totalHabits > 0 ? (completedHabits / totalHabits) * 100 : 0;
  
  const handleToggleHabit = (id: string, date: string) => {
    toggleCompletion(id, date);
  };
  
  const handleEditHabit = (id: string) => {
    setEditingHabitId(id);
    setShowForm(true);
  };
  
  const handleSubmitHabit = (habitData: any) => {
    if (editingHabitId) {
      updateHabit(editingHabitId, habitData);
      setEditingHabitId(null);
    } else {
      addHabit(habitData);
    }
    setShowForm(false);
  };
  
  const handleCancelForm = () => {
    setShowForm(false);
    setEditingHabitId(null);
  };
  
  const editingHabit = editingHabitId 
    ? habits.find(habit => habit.id === editingHabitId) 
    : undefined;
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Today's Habits
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {formatReadableDate(todayDate)}
          </p>
        </div>
        
        <Button
          onClick={() => setShowForm(true)}
          variant="primary"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          }
        >
          Add Habit
        </Button>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200">
            Daily Progress
          </h2>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {completedHabits}/{totalHabits} completed
          </span>
        </div>
        <ProgressBar 
          percentage={completionPercentage} 
          size="lg"
          showLabel
        />
      </div>
      
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={handleCancelForm}
          >
            <div onClick={(e) => e.stopPropagation()}>
              <HabitForm
                habit={editingHabit}
                onSubmit={handleSubmitHabit}
                onCancel={handleCancelForm}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="space-y-4">
        {habits.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              You don't have any habits yet. Start by adding one!
            </p>
            <Button
              onClick={() => setShowForm(true)}
              variant="primary"
            >
              Add Your First Habit
            </Button>
          </div>
        ) : (
          <motion.div layout>
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
                    onEdit={handleEditHabit}
                    currentStreak={current}
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
