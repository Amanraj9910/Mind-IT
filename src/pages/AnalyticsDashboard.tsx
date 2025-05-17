import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useHabitStore } from '../store/habitStore';
import { Card } from '../components/ui/Card';
import { StreakCounter } from '../components/habits/StreakCounter';
import { 
  formatDate, 
  getDatesBetween, 
  getStartOfMonth, 
  getEndOfMonth,
  getMonthName
} from '../utils/dateUtils';

export const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');
  const [selectedHabitId, setSelectedHabitId] = useState<string | 'all'>('all');
  
  const habits = useHabitStore((state) => state.habits);
  const categories = useHabitStore((state) => state.categories);
  const getStreakCount = useHabitStore((state) => state.getStreakCount);
  
  // Get data for the selected time range
  const getTimeRangeData = () => {
    const today = new Date();
    let startDate: Date;
    
    switch (timeRange) {
      case 'week':
        startDate = new Date(today);
        startDate.setDate(today.getDate() - 7);
        break;
      case 'year':
        startDate = new Date(today);
        startDate.setFullYear(today.getFullYear() - 1);
        break;
      case 'month':
      default:
        startDate = new Date(today);
        startDate.setMonth(today.getMonth() - 1);
        break;
    }
    
    return { startDate, endDate: today };
  };
  
  // Calculate completion data for charts
  const getCompletionData = () => {
    const { startDate, endDate } = getTimeRangeData();
    const dateRange = getDatesBetween(startDate, endDate);
    
    return dateRange.map(date => {
      const dateStr = formatDate(date);
      let completedCount = 0;
      let totalCount = 0;
      
      if (selectedHabitId === 'all') {
        totalCount = habits.length;
        completedCount = habits.filter(habit => habit.completions[dateStr]).length;
      } else {
        const habit = habits.find(h => h.id === selectedHabitId);
        if (habit) {
          totalCount = 1;
          completedCount = habit.completions[dateStr] ? 1 : 0;
        }
      }
      
      const completionRate = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
      
      return {
        date: dateStr,
        displayDate: timeRange === 'year' 
          ? new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) 
          : new Date(date).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' }),
        completionRate,
        completed: completedCount,
        total: totalCount
      };
    });
  };
  
  // Get category distribution data
  const getCategoryDistribution = () => {
    const categoryMap = new Map<string, number>();
    
    habits.forEach(habit => {
      const category = categories.find(c => c.id === habit.categoryId);
      if (category) {
        const count = categoryMap.get(category.name) || 0;
        categoryMap.set(category.name, count + 1);
      }
    });
    
    return Array.from(categoryMap.entries()).map(([name, count]) => ({
      name,
      value: count,
      color: categories.find(c => c.name === name)?.color || '#4DB792'
    }));
  };
  
  // Get streak data
  const getStreakData = () => {
    return habits.map(habit => {
      const { current, longest } = getStreakCount(habit.id);
      const category = categories.find(c => c.id === habit.categoryId) || categories[0];
      
      return {
        id: habit.id,
        name: habit.name,
        currentStreak: current,
        longestStreak: longest,
        category
      };
    }).sort((a, b) => b.currentStreak - a.currentStreak);
  };
  
  // Calculate overall statistics
  const calculateOverallStats = () => {
    const { startDate, endDate } = getTimeRangeData();
    const dateRange = getDatesBetween(startDate, endDate);
    
    let totalPossibleCompletions = 0;
    let totalActualCompletions = 0;
    
    dateRange.forEach(date => {
      const dateStr = formatDate(date);
      
      if (selectedHabitId === 'all') {
        totalPossibleCompletions += habits.length;
        totalActualCompletions += habits.filter(habit => habit.completions[dateStr]).length;
      } else {
        const habit = habits.find(h => h.id === selectedHabitId);
        if (habit) {
          totalPossibleCompletions += 1;
          totalActualCompletions += habit.completions[dateStr] ? 1 : 0;
        }
      }
    });
    
    const completionRate = totalPossibleCompletions > 0 
      ? (totalActualCompletions / totalPossibleCompletions) * 100 
      : 0;
    
    return {
      totalPossibleCompletions,
      totalActualCompletions,
      completionRate
    };
  };
  
  const completionData = getCompletionData();
  const categoryDistribution = getCategoryDistribution();
  const streakData = getStreakData();
  const overallStats = calculateOverallStats();
  
  // Colors for charts
  const COLORS = ['#4DB792', '#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981'];
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Analytics Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track your progress and visualize your habit data
        </p>
      </div>
      
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Time Range
          </label>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as 'week' | 'month' | 'year')}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark dark:bg-gray-700 dark:text-white"
          >
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
            <option value="year">Last 12 Months</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Habit
          </label>
          <select
            value={selectedHabitId}
            onChange={(e) => setSelectedHabitId(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark dark:bg-gray-700 dark:text-white"
          >
            <option value="all">All Habits</option>
            {habits.map((habit) => (
              <option key={habit.id} value={habit.id}>
                {habit.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Completion Rate
          </h3>
          <div className="flex items-end">
            <span className="text-3xl font-bold text-primary-light dark:text-primary-dark">
              {Math.round(overallStats.completionRate)}%
            </span>
            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
              ({overallStats.totalActualCompletions}/{overallStats.totalPossibleCompletions})
            </span>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {timeRange === 'week' ? 'Last 7 days' : timeRange === 'month' ? 'Last 30 days' : 'Last 12 months'}
          </p>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Total Habits
          </h3>
          <div className="flex items-end">
            <span className="text-3xl font-bold text-primary-light dark:text-primary-dark">
              {habits.length}
            </span>
            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
              across {categories.length} categories
            </span>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {habits.length > 0 
              ? `Most recent: ${habits.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0].name}` 
              : 'No habits created yet'}
          </p>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Best Streak
          </h3>
          {streakData.length > 0 ? (
            <>
              <div className="flex items-end">
                <span className="text-3xl font-bold text-achievement-light dark:text-achievement-dark">
                  {streakData[0].currentStreak}
                </span>
                <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                  days
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {streakData[0].name}
              </p>
            </>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              No streaks yet
            </p>
          )}
        </Card>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Completion Rate Chart */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Completion Rate Over Time
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={completionData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis 
                  dataKey="displayDate" 
                  tick={{ fontSize: 12 }}
                  interval={timeRange === 'year' ? 30 : timeRange === 'month' ? 3 : 0}
                />
                <YAxis 
                  domain={[0, 100]} 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip 
                  formatter={(value: number) => [`${value.toFixed(0)}%`, 'Completion Rate']}
                  labelFormatter={(label) => `Date: ${label}`}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="completionRate" 
                  name="Completion Rate" 
                  stroke="#4DB792" 
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
        
        {/* Category Distribution Chart */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Habits by Category
          </h3>
          {categoryDistribution.length > 0 ? (
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} habits`, 'Count']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-80 flex items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400">
                No data available
              </p>
            </div>
          )}
        </Card>
      </div>
      
      {/* Streak Leaderboard */}
      <Card className="p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Streak Leaderboard
        </h3>
        {streakData.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Habit</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Category</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Current Streak</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Longest Streak</th>
                </tr>
              </thead>
              <tbody>
                {streakData.map((habit) => (
                  <tr key={habit.id} className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">{habit.name}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full mr-2" 
                          style={{ backgroundColor: habit.category.color }}
                        ></div>
                        <span className="text-sm text-gray-800 dark:text-gray-200">{habit.category.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <span className="text-achievement-light dark:text-achievement-dark mr-1">🔥</span>
                        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{habit.currentStreak} days</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">{habit.longestStreak} days</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center py-8">
            No streak data available yet. Start tracking your habits!
          </p>
        )}
      </Card>
    </div>
  );
};
