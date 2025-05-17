export interface Habit {
  id: string;
  name: string;
  description?: string;
  categoryId: string;
  frequency: 'daily' | 'weekly' | 'custom';
  customDays?: number[]; // 0-6 for days of week
  completions: Record<string, boolean>; // date string -> completion status
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
}

export interface HabitWithStats extends Habit {
  currentStreak: number;
  longestStreak: number;
  completionRate: number;
}

export interface DailyProgress {
  date: string;
  completedCount: number;
  totalCount: number;
  percentage: number;
}

export interface WeeklyProgress {
  startDate: string;
  endDate: string;
  days: DailyProgress[];
  completionRate: number;
}

export interface MonthlyProgress {
  month: string; // YYYY-MM
  days: Record<string, DailyProgress>; // date string -> daily progress
  completionRate: number;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  reminderEnabled: boolean;
  reminderTime: string; // HH:MM format
}

export type ThemeMode = 'light' | 'dark';
