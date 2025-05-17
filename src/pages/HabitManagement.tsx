import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useHabitStore } from '../store/habitStore';
import { Habit, Category } from '../types';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { HabitForm } from '../components/habits/HabitForm';

export const HabitManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [editingHabitId, setEditingHabitId] = useState<string | null>(null);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [categoryName, setCategoryName] = useState('');
  const [categoryColor, setCategoryColor] = useState('#4DB792');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | 'all'>('all');
  
  const habits = useHabitStore((state) => state.habits);
  const categories = useHabitStore((state) => state.categories);
  const addHabit = useHabitStore((state) => state.addHabit);
  const updateHabit = useHabitStore((state) => state.updateHabit);
  const deleteHabit = useHabitStore((state) => state.deleteHabit);
  const addCategory = useHabitStore((state) => state.addCategory);
  const updateCategory = useHabitStore((state) => state.updateCategory);
  const deleteCategory = useHabitStore((state) => state.deleteCategory);
  
  // Filter habits by selected category
  const filteredHabits = selectedCategoryId === 'all' 
    ? habits 
    : habits.filter(habit => habit.categoryId === selectedCategoryId);
  
  // Handle habit form submission
  const handleSubmitHabit = (habitData: Omit<Habit, 'id' | 'createdAt' | 'completions'>) => {
    if (editingHabitId) {
      updateHabit(editingHabitId, habitData);
      setEditingHabitId(null);
    } else {
      addHabit(habitData);
    }
    setShowForm(false);
  };
  
  // Handle category form submission
  const handleSubmitCategory = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!categoryName.trim()) return;
    
    if (editingCategoryId) {
      updateCategory(editingCategoryId, { name: categoryName, color: categoryColor });
      setEditingCategoryId(null);
    } else {
      addCategory({ name: categoryName, color: categoryColor });
    }
    
    setCategoryName('');
    setCategoryColor('#4DB792');
    setShowCategoryForm(false);
  };
  
  // Handle habit deletion with confirmation
  const handleDeleteHabit = (id: string) => {
    if (window.confirm('Are you sure you want to delete this habit? This action cannot be undone.')) {
      deleteHabit(id);
    }
  };
  
  // Handle category deletion with confirmation
  const handleDeleteCategory = (id: string) => {
    const habitsUsingCategory = habits.filter(habit => habit.categoryId === id);
    
    if (habitsUsingCategory.length > 0) {
      alert(`This category is being used by ${habitsUsingCategory.length} habit(s). Please reassign or delete those habits first.`);
      return;
    }
    
    if (window.confirm('Are you sure you want to delete this category? This action cannot be undone.')) {
      deleteCategory(id);
    }
  };
  
  // Edit a category
  const handleEditCategory = (category: Category) => {
    setEditingCategoryId(category.id);
    setCategoryName(category.name);
    setCategoryColor(category.color);
    setShowCategoryForm(true);
  };
  
  // Cancel forms
  const handleCancelForm = () => {
    setShowForm(false);
    setEditingHabitId(null);
  };
  
  const handleCancelCategoryForm = () => {
    setShowCategoryForm(false);
    setEditingCategoryId(null);
    setCategoryName('');
    setCategoryColor('#4DB792');
  };
  
  // Get the editing habit
  const editingHabit = editingHabitId 
    ? habits.find(habit => habit.id === editingHabitId) 
    : undefined;
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Habit Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Create, edit, and organize your habits
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Categories Section */}
        <div className="md:col-span-1">
          <Card className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Categories
              </h2>
              <Button
                onClick={() => setShowCategoryForm(true)}
                variant="primary"
                size="sm"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                }
              >
                Add
              </Button>
            </div>
            
            {/* Category Form */}
            <AnimatePresence>
              {showCategoryForm && (
                <motion.form
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-4 overflow-hidden"
                  onSubmit={handleSubmitCategory}
                >
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Category Name
                    </label>
                    <input
                      type="text"
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark dark:bg-gray-700 dark:text-white"
                      placeholder="e.g., Health"
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Color
                    </label>
                    <div className="flex items-center">
                      <input
                        type="color"
                        value={categoryColor}
                        onChange={(e) => setCategoryColor(e.target.value)}
                        className="w-10 h-10 rounded-md border border-gray-300 dark:border-gray-600 mr-2"
                      />
                      <input
                        type="text"
                        value={categoryColor}
                        onChange={(e) => setCategoryColor(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark dark:bg-gray-700 dark:text-white"
                        placeholder="#RRGGBB"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleCancelCategoryForm}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      size="sm"
                    >
                      {editingCategoryId ? 'Update' : 'Add'} Category
                    </Button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
            
            {/* Category List */}
            <div className="space-y-2">
              <div
                className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${
                  selectedCategoryId === 'all' 
                    ? 'bg-gray-100 dark:bg-gray-700' 
                    : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
                onClick={() => setSelectedCategoryId('all')}
              >
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-gray-400 mr-2"></div>
                  <span className="font-medium">All Categories</span>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {habits.length}
                </span>
              </div>
              
              {categories.map((category) => {
                const categoryHabits = habits.filter(h => h.categoryId === category.id);
                
                return (
                  <div
                    key={category.id}
                    className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${
                      selectedCategoryId === category.id 
                        ? 'bg-gray-100 dark:bg-gray-700' 
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                    onClick={() => setSelectedCategoryId(category.id)}
                  >
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: category.color }}
                      ></div>
                      <span className="font-medium">{category.name}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">
                        {categoryHabits.length}
                      </span>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditCategory(category);
                        }}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1"
                        aria-label={`Edit ${category.name} category`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                      </button>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteCategory(category.id);
                        }}
                        className="text-gray-400 hover:text-red-500 p-1"
                        aria-label={`Delete ${category.name} category`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 6h18"></path>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
        
        {/* Habits Section */}
        <div className="md:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {selectedCategoryId === 'all' 
                ? 'All Habits' 
                : `${categories.find(c => c.id === selectedCategoryId)?.name || ''} Habits`}
            </h2>
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
          
          {/* Habits List */}
          {filteredHabits.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                {selectedCategoryId === 'all' 
                  ? "You don't have any habits yet." 
                  : "No habits in this category."}
              </p>
              <Button
                onClick={() => setShowForm(true)}
                variant="primary"
              >
                Add Your First Habit
              </Button>
            </Card>
          ) : (
            <div className="space-y-3">
              {filteredHabits.map((habit) => {
                const category = categories.find(c => c.id === habit.categoryId) || categories[0];
                
                return (
                  <Card key={habit.id} className="p-4">
                    <div className="flex justify-between">
                      <div>
                        <div className="flex items-center">
                          <div 
                            className="w-3 h-3 rounded-full mr-2" 
                            style={{ backgroundColor: category.color }}
                          ></div>
                          <h3 className="font-medium text-gray-900 dark:text-gray-100">
                            {habit.name}
                          </h3>
                        </div>
                        
                        {habit.description && (
                          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            {habit.description}
                          </p>
                        )}
                        
                        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                          <span className="mr-3">
                            Frequency: {habit.frequency === 'custom' 
                              ? 'Custom days' 
                              : habit.frequency.charAt(0).toUpperCase() + habit.frequency.slice(1)}
                          </span>
                          <span>
                            Created: {new Date(habit.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button
                          onClick={() => {
                            setEditingHabitId(habit.id);
                            setShowForm(true);
                          }}
                          variant="outline"
                          size="sm"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDeleteHabit(habit.id)}
                          variant="danger"
                          size="sm"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
      
      {/* Habit Form Modal */}
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
    </div>
  );
};
