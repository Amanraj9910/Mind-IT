/**
 * Format a date to YYYY-MM-DD string
 */
export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

/**
 * Get today's date formatted as YYYY-MM-DD
 */
export const getTodayFormatted = (): string => {
  return formatDate(new Date());
};

/**
 * Check if two dates are the same day
 */
export const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

/**
 * Get an array of dates between start and end (inclusive)
 */
export const getDatesBetween = (start: Date, end: Date): Date[] => {
  const dates: Date[] = [];
  const currentDate = new Date(start);
  
  while (currentDate <= end) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return dates;
};

/**
 * Get the start of the week (Sunday) for a given date
 */
export const getStartOfWeek = (date: Date): Date => {
  const result = new Date(date);
  const day = result.getDay();
  result.setDate(result.getDate() - day);
  return result;
};

/**
 * Get the end of the week (Saturday) for a given date
 */
export const getEndOfWeek = (date: Date): Date => {
  const result = new Date(date);
  const day = result.getDay();
  result.setDate(result.getDate() + (6 - day));
  return result;
};

/**
 * Get the start of the month for a given date
 */
export const getStartOfMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

/**
 * Get the end of the month for a given date
 */
export const getEndOfMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};

/**
 * Format a date to a readable string (e.g., "May 17, 2025")
 */
export const formatReadableDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

/**
 * Format a date to a short readable string (e.g., "May 17")
 */
export const formatShortDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Get the day name for a date (e.g., "Monday")
 */
export const getDayName = (date: Date, short = false): string => {
  return date.toLocaleDateString('en-US', {
    weekday: short ? 'short' : 'long',
  });
};

/**
 * Get the month name for a date (e.g., "January")
 */
export const getMonthName = (date: Date, short = false): string => {
  return date.toLocaleDateString('en-US', {
    month: short ? 'short' : 'long',
  });
};

/**
 * Get the days of the current week
 */
export const getCurrentWeekDays = (): Date[] => {
  const today = new Date();
  const startOfWeek = getStartOfWeek(today);
  return getDatesBetween(startOfWeek, getEndOfWeek(today));
};

/**
 * Get the days of the current month
 */
export const getCurrentMonthDays = (): Date[] => {
  const today = new Date();
  const startOfMonth = getStartOfMonth(today);
  return getDatesBetween(startOfMonth, getEndOfMonth(today));
};
