import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useHabitStore } from '../store/habitStore';
import { getTodayFormatted, formatReadableDate } from '../utils/dateUtils';
import { styles } from '../styles/globalStyles';

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
  
  // Container styles
  const containerStyle = {
    ...styles.layout.container,
    maxWidth: '800px',
    padding: `${styles.spacing.lg} ${styles.spacing.lg}`,
    marginTop: styles.spacing.xl,
    marginBottom: styles.spacing.xl,
  };
  
  // Header styles
  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: styles.spacing.xl,
  };
  
  // Progress section styles
  const progressSectionStyle = {
    marginBottom: styles.spacing.xl,
  };
  
  const progressHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: styles.spacing.sm,
  };
  
  // Progress bar styles
  const progressBarContainerStyle = {
    width: '100%',
    height: '10px',
    backgroundColor: `${styles.colors.primary}20`,
    borderRadius: styles.borderRadius.md,
    overflow: 'hidden',
  };
  
  // Empty state styles
  const emptyStateStyle = {
    textAlign: 'center' as const,
    padding: `${styles.spacing.xxl} 0`,
  };
  
  // Habit card styles
  const habitCardStyle = {
    ...styles.components.card.base,
    marginBottom: styles.spacing.md,
    padding: styles.spacing.lg,
  };
  
  const habitCardHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  };
  
  const habitInfoStyle = {
    flex: 1,
  };
  
  const categoryIndicatorStyle = (color: string) => ({
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    backgroundColor: color,
    display: 'inline-block',
    marginRight: styles.spacing.sm,
  });
  
  const checkboxStyle = (isCompleted: boolean) => ({
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    border: `2px solid ${isCompleted ? styles.colors.primary : styles.colors.textSecondary}`,
    backgroundColor: isCompleted ? styles.colors.primary : 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: styles.transitions.fast,
  });
  
  const streakStyle = {
    display: 'flex',
    alignItems: 'center',
    marginTop: styles.spacing.sm,
    color: styles.colors.secondary,
    fontSize: styles.fontSizes.sm,
  };
  
  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div>
          <h1 style={styles.typography.h2}>Today's Habits</h1>
          <p style={styles.typography.body}>{formatReadableDate(todayDate)}</p>
        </div>
        
        <motion.button
          style={{ ...styles.components.button.base, ...styles.components.button.primary }}
          whileHover={{ y: -2, boxShadow: styles.shadows.md }}
          whileTap={{ y: 0 }}
          onClick={() => setShowForm(true)}
        >
          <svg 
            style={{ marginRight: styles.spacing.sm }}
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Add Habit
        </motion.button>
      </div>
      
      <div style={progressSectionStyle}>
        <div style={progressHeaderStyle}>
          <h2 style={styles.typography.h4}>Daily Progress</h2>
          <span style={styles.typography.bodySmall}>
            {completedHabits}/{totalHabits} completed
          </span>
        </div>
        <div style={progressBarContainerStyle}>
          <motion.div
            style={{
              height: '100%',
              backgroundColor: styles.colors.primary,
              borderRadius: styles.borderRadius.md,
            }}
            initial={{ width: '0%' }}
            animate={{ width: `${completionPercentage}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
        <div style={{ textAlign: 'right', marginTop: styles.spacing.xs }}>
          <span style={{ ...styles.typography.caption, color: styles.colors.textSecondary }}>
            {Math.round(completionPercentage)}%
          </span>
        </div>
      </div>
      
      <AnimatePresence>
        {showForm && (
          <motion.div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: styles.spacing.md,
              zIndex: styles.zIndices.modal,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCancelForm}
          >
            <motion.div
              style={{
                ...styles.components.card.base,
                width: '100%',
                maxWidth: '500px',
                padding: styles.spacing.xl,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 style={styles.typography.h3}>
                {editingHabit ? 'Edit Habit' : 'Create New Habit'}
              </h2>
              
              {/* Form placeholder - we'll implement this later */}
              <div style={{ marginTop: styles.spacing.xl }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: styles.spacing.md }}>
                  <motion.button
                    style={{ 
                      ...styles.components.button.base, 
                      ...styles.components.button.outline 
                    }}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                    onClick={handleCancelForm}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    style={{ 
                      ...styles.components.button.base, 
                      ...styles.components.button.primary 
                    }}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                    onClick={() => handleSubmitHabit({})}
                  >
                    {editingHabit ? 'Update' : 'Create'}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div>
        {habits.length === 0 ? (
          <div style={emptyStateStyle}>
            <p style={{ ...styles.typography.body, marginBottom: styles.spacing.lg }}>
              You don't have any habits yet. Start by adding one!
            </p>
            <motion.button
              style={{ ...styles.components.button.base, ...styles.components.button.primary }}
              whileHover={{ y: -2, boxShadow: styles.shadows.md }}
              whileTap={{ y: 0 }}
              onClick={() => setShowForm(true)}
            >
              Add Your First Habit
            </motion.button>
          </div>
        ) : (
          <motion.div layout>
            {habits.map((habit) => {
              const category = categories.find(c => c.id === habit.categoryId) || categories[0];
              const { current } = getStreakCount(habit.id);
              const isCompleted = habit.completions[today] || false;
              
              return (
                <motion.div
                  key={habit.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  style={habitCardStyle}
                  whileHover={styles.components.card.hover}
                >
                  <div style={habitCardHeaderStyle}>
                    <div style={habitInfoStyle}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={categoryIndicatorStyle(category.color)}></span>
                        <h3 style={styles.typography.h4}>{habit.name}</h3>
                      </div>
                      
                      {habit.description && (
                        <p style={styles.typography.body}>{habit.description}</p>
                      )}
                      
                      {current > 0 && (
                        <div style={streakStyle}>
                          <span style={{ marginRight: styles.spacing.xs }}>🔥</span>
                          <span>{current} day streak</span>
                        </div>
                      )}
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: styles.spacing.md }}>
                      <motion.div
                        style={checkboxStyle(isCompleted)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleToggleHabit(habit.id, today)}
                      >
                        {isCompleted && (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        )}
                      </motion.div>
                      
                      <motion.button
                        style={{ 
                          color: styles.colors.textSecondary,
                          backgroundColor: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          padding: styles.spacing.xs,
                        }}
                        whileHover={{ scale: 1.1, color: styles.colors.primary }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleEditHabit(habit.id)}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
};
