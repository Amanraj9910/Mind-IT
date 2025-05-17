import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { Habit, Category, HabitWithStats } from '../types';
import { formatDate, getDatesBetween, isSameDay } from '../utils/dateUtils';

interface HabitState {
  habits: Habit[];
  categories: Category[];
  
  // Habit Actions
  addHabit: (habit: Omit<Habit, 'id' | 'createdAt' | 'completions'>) => void;
  updateHabit: (id: string, updates: Partial<Habit>) => void;
  deleteHabit: (id: string) => void;
  toggleCompletion: (id: string, date: string) => void;
  
  // Category Actions
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  
  // Stats and Queries
  getHabitsByCategory: (categoryId: string) => Habit[];
  getHabitById: (id: string) => Habit | undefined;
  getHabitWithStats: (id: string) => HabitWithStats | undefined;
  getCompletedHabitsForDate: (date: string) => Habit[];
  getStreakCount: (id: string) => { current: number; longest: number };
  getCompletionRate: (id: string, days?: number) => number;
}

// Default categories
const defaultCategories: Category[] = [
  { id: 'health', name: 'Health', color: '#4DB792' },
  { id: 'productivity', name: 'Productivity', color: '#3B82F6' },
  { id: 'learning', name: 'Learning', color: '#8B5CF6' },
  { id: 'personal', name: 'Personal', color: '#EC4899' },
];

export const useHabitStore = create<HabitState>()(
  persist(
    (set, get) => ({
      habits: [],
      categories: defaultCategories,
      
      // Habit Actions
      addHabit: (habitData) => {
        const newHabit: Habit = {
          id: uuidv4(),
          createdAt: new Date().toISOString(),
          completions: {},
          ...habitData,
        };
        
        set((state) => ({
          habits: [...state.habits, newHabit],
        }));
      },
      
      updateHabit: (id, updates) => {
        set((state) => ({
          habits: state.habits.map((habit) => 
            habit.id === id ? { ...habit, ...updates } : habit
          ),
        }));
      },
      
      deleteHabit: (id) => {
        set((state) => ({
          habits: state.habits.filter((habit) => habit.id !== id),
        }));
      },
      
      toggleCompletion: (id, date) => {
        set((state) => {
          const habit = state.habits.find((h) => h.id === id);
          if (!habit) return state;
          
          const newCompletions = { ...habit.completions };
          newCompletions[date] = !newCompletions[date];
          
          return {
            habits: state.habits.map((h) => 
              h.id === id ? { ...h, completions: newCompletions } : h
            ),
          };
        });
      },
      
      // Category Actions
      addCategory: (categoryData) => {
        const newCategory: Category = {
          id: uuidv4(),
          ...categoryData,
        };
        
        set((state) => ({
          categories: [...state.categories, newCategory],
        }));
      },
      
      updateCategory: (id, updates) => {
        set((state) => ({
          categories: state.categories.map((category) => 
            category.id === id ? { ...category, ...updates } : category
          ),
        }));
      },
      
      deleteCategory: (id) => {
        set((state) => ({
          categories: state.categories.filter((category) => category.id !== id),
        }));
      },
      
      // Stats and Queries
      getHabitsByCategory: (categoryId) => {
        return get().habits.filter((habit) => habit.categoryId === categoryId);
      },
      
      getHabitById: (id) => {
        return get().habits.find((habit) => habit.id === id);
      },
      
      getHabitWithStats: (id) => {
        const habit = get().getHabitById(id);
        if (!habit) return undefined;
        
        const { current, longest } = get().getStreakCount(id);
        const completionRate = get().getCompletionRate(id, 30);
        
        return {
          ...habit,
          currentStreak: current,
          longestStreak: longest,
          completionRate,
        };
      },
      
      getCompletedHabitsForDate: (date) => {
        return get().habits.filter((habit) => habit.completions[date]);
      },
      
      getStreakCount: (id) => {
        const habit = get().getHabitById(id);
        if (!habit) return { current: 0, longest: 0 };
        
        // Calculate current streak
        let currentStreak = 0;
        let today = new Date();
        let checkDate = new Date(today);
        
        while (habit.completions[formatDate(checkDate)]) {
          currentStreak++;
          checkDate.setDate(checkDate.getDate() - 1);
        }
        
        // Calculate longest streak
        let longestStreak = 0;
        let currentLongest = 0;
        
        const sortedDates = Object.keys(habit.completions)
          .filter((date) => habit.completions[date])
          .sort();
        
        if (sortedDates.length > 0) {
          let prevDate: Date | null = null;
          
          for (const dateStr of sortedDates) {
            const currentDate = new Date(dateStr);
            
            if (prevDate === null) {
              currentLongest = 1;
            } else {
              const diffDays = Math.floor(
                (currentDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24)
              );
              
              if (diffDays === 1) {
                currentLongest++;
              } else {
                currentLongest = 1;
              }
            }
            
            longestStreak = Math.max(longestStreak, currentLongest);
            prevDate = currentDate;
          }
        }
        
        return { current: currentStreak, longest: longestStreak };
      },
      
      getCompletionRate: (id, days = 30) => {
        const habit = get().getHabitById(id);
        if (!habit) return 0;
        
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);
        
        const dateRange = getDatesBetween(startDate, endDate);
        let completedCount = 0;
        
        for (const date of dateRange) {
          if (habit.completions[formatDate(date)]) {
            completedCount++;
          }
        }
        
        return dateRange.length > 0 ? completedCount / dateRange.length : 0;
      },
    }),
    {
      name: 'habit-storage',
    }
  )
);
