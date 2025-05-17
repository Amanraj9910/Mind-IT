import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Habit, Category } from '../../types';
import { Button } from '../ui/Button';
import { useHabitStore } from '../../store/habitStore';

interface HabitFormProps {
  habit?: Habit; // If provided, we're editing an existing habit
  onSubmit: (habit: Omit<Habit, 'id' | 'createdAt' | 'completions'>) => void;
  onCancel: () => void;
}

export const HabitForm = ({ habit, onSubmit, onCancel }: HabitFormProps) => {
  const categories = useHabitStore((state) => state.categories);
  
  const [formData, setFormData] = useState({
    name: habit?.name || '',
    description: habit?.description || '',
    categoryId: habit?.categoryId || categories[0]?.id || '',
    frequency: habit?.frequency || 'daily',
    customDays: habit?.customDays || [0, 1, 2, 3, 4, 5, 6],
  });
  
  const [errors, setErrors] = useState({
    name: '',
    categoryId: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when field is updated
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };
  
  const handleDayToggle = (day: number) => {
    setFormData((prev) => {
      const customDays = [...prev.customDays];
      const index = customDays.indexOf(day);
      
      if (index === -1) {
        customDays.push(day);
      } else {
        customDays.splice(index, 1);
      }
      
      return { ...prev, customDays };
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const newErrors = {
      name: formData.name.trim() === '' ? 'Name is required' : '',
      categoryId: formData.categoryId === '' ? 'Category is required' : '',
    };
    
    setErrors(newErrors);
    
    // If there are errors, don't submit
    if (Object.values(newErrors).some((error) => error !== '')) {
      return;
    }
    
    onSubmit({
      name: formData.name.trim(),
      description: formData.description.trim(),
      categoryId: formData.categoryId,
      frequency: formData.frequency as 'daily' | 'weekly' | 'custom',
      customDays: formData.frequency === 'custom' ? formData.customDays : undefined,
    });
  };
  
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
        {habit ? 'Edit Habit' : 'Create New Habit'}
      </h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Habit Name*
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
            errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
          }`}
          placeholder="e.g., Drink water"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name}</p>
        )}
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Description (optional)
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          placeholder="e.g., Drink at least 8 glasses of water daily"
          rows={3}
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Category*
        </label>
        <select
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
            errors.categoryId ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
          }`}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.categoryId && (
          <p className="mt-1 text-sm text-red-500">{errors.categoryId}</p>
        )}
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Frequency
        </label>
        <div className="flex flex-col space-y-2">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="frequency"
              value="daily"
              checked={formData.frequency === 'daily'}
              onChange={handleChange}
              className="text-primary-light dark:text-primary-dark focus:ring-primary-light dark:focus:ring-primary-dark"
            />
            <span className="ml-2 text-gray-700 dark:text-gray-300">Daily</span>
          </label>
          
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="frequency"
              value="weekly"
              checked={formData.frequency === 'weekly'}
              onChange={handleChange}
              className="text-primary-light dark:text-primary-dark focus:ring-primary-light dark:focus:ring-primary-dark"
            />
            <span className="ml-2 text-gray-700 dark:text-gray-300">Weekly</span>
          </label>
          
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="frequency"
              value="custom"
              checked={formData.frequency === 'custom'}
              onChange={handleChange}
              className="text-primary-light dark:text-primary-dark focus:ring-primary-light dark:focus:ring-primary-dark"
            />
            <span className="ml-2 text-gray-700 dark:text-gray-300">Custom days</span>
          </label>
        </div>
      </div>
      
      {formData.frequency === 'custom' && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Select Days
          </label>
          <div className="flex flex-wrap gap-2">
            {dayNames.map((day, index) => (
              <button
                key={day}
                type="button"
                onClick={() => handleDayToggle(index)}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  formData.customDays.includes(index)
                    ? 'bg-primary-light dark:bg-primary-dark text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      )}
      
      <div className="flex justify-end space-x-3 mt-6">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
        >
          {habit ? 'Update Habit' : 'Create Habit'}
        </Button>
      </div>
    </motion.form>
  );
};
