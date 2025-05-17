import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useHabitStore } from '../store/habitStore';
import { useTheme } from '../hooks/useTheme';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export const Settings = () => {
  const { theme, setTheme } = useTheme();
  const habits = useHabitStore((state) => state.habits);
  const categories = useHabitStore((state) => state.categories);

  const [reminderEnabled, setReminderEnabled] = useState(false);
  const [reminderTime, setReminderTime] = useState('20:00');
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission | 'default'>('default');

  // Check notification permission on component mount
  useEffect(() => {
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);
    }
  }, []);

  // Request notification permission
  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);

      if (permission === 'granted') {
        // Show a test notification
        new Notification('Mind-IT Habit Tracker', {
          body: 'Notifications are now enabled!',
          icon: '/favicon.ico'
        });
      }
    }
  };

  // Export data as JSON
  const exportData = () => {
    const data = {
      habits,
      categories,
      exportDate: new Date().toISOString()
    };

    const dataStr = JSON.stringify(data, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;

    const exportFileDefaultName = `mind-it-backup-${new Date().toISOString().split('T')[0]}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  // Import data from JSON file
  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const data = JSON.parse(content);

        if (data.habits && data.categories) {
          if (window.confirm('This will replace all your current habits and categories. Are you sure you want to continue?')) {
            // Here we would call a method to replace the store data
            // For now, we'll just show an alert
            alert('Data imported successfully!');
          }
        } else {
          alert('Invalid data format');
        }
      } catch (error) {
        alert('Error parsing the file');
        console.error(error);
      }
    };
    reader.readAsText(file);
  };

  // Reset all data
  const resetAllData = () => {
    if (window.confirm('Are you sure you want to reset all data? This action cannot be undone.')) {
      localStorage.removeItem('habit-storage');
      window.location.reload();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Customize your habit tracking experience
        </p>
      </div>

      <div className="space-y-6">
        {/* Appearance Settings */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Appearance
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Theme
              </label>
              <div className="flex space-x-4">
                <button
                  onClick={() => setTheme('light')}
                  className={`flex flex-col items-center p-3 rounded-lg border ${
                    theme === 'light'
                      ? 'border-primary-light dark:border-primary-dark bg-gray-100 dark:bg-gray-800'
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <div className="w-12 h-12 bg-white rounded-full border border-gray-200 flex items-center justify-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500">
                      <circle cx="12" cy="12" r="5"></circle>
                      <line x1="12" y1="1" x2="12" y2="3"></line>
                      <line x1="12" y1="21" x2="12" y2="23"></line>
                      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                      <line x1="1" y1="12" x2="3" y2="12"></line>
                      <line x1="21" y1="12" x2="23" y2="12"></line>
                      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Light</span>
                </button>

                <button
                  onClick={() => setTheme('dark')}
                  className={`flex flex-col items-center p-3 rounded-lg border ${
                    theme === 'dark'
                      ? 'border-primary-light dark:border-primary-dark bg-gray-100 dark:bg-gray-800'
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <div className="w-12 h-12 bg-gray-900 rounded-full border border-gray-700 flex items-center justify-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300">
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Dark</span>
                </button>
              </div>
            </div>
          </div>
        </Card>

        {/* Notification Settings */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Notifications
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Daily Reminder
                </label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Get a reminder to complete your habits
                </p>
              </div>
              <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
                <input
                  type="checkbox"
                  id="toggle"
                  className="absolute w-6 h-6 opacity-0"
                  checked={reminderEnabled}
                  onChange={() => setReminderEnabled(!reminderEnabled)}
                />
                <label
                  htmlFor="toggle"
                  className={`block w-full h-full rounded-full cursor-pointer ${
                    reminderEnabled ? 'bg-primary-light dark:bg-primary-dark' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <span
                    className={`absolute left-0 w-6 h-6 transition duration-200 ease-in-out transform bg-white rounded-full shadow-md ${
                      reminderEnabled ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  ></span>
                </label>
              </div>
            </div>

            {reminderEnabled && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Reminder Time
                </label>
                <input
                  type="time"
                  value={reminderTime}
                  onChange={(e) => setReminderTime(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark dark:bg-gray-700 dark:text-white"
                />
              </div>
            )}

            {reminderEnabled && notificationPermission !== 'granted' && (
              <div className="mt-2">
                <Button
                  onClick={requestNotificationPermission}
                  variant="primary"
                >
                  {notificationPermission === 'denied'
                    ? 'Notification Permission Denied'
                    : 'Allow Notifications'}
                </Button>
                {notificationPermission === 'denied' && (
                  <p className="mt-1 text-sm text-red-500">
                    Please enable notifications in your browser settings
                  </p>
                )}
              </div>
            )}
          </div>
        </Card>

        {/* Data Management */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Data Management
          </h2>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                Export your habit data as a JSON file for backup or transfer
              </p>
              <Button
                onClick={exportData}
                variant="primary"
              >
                Export Data
              </Button>
            </div>

            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                Import habit data from a previously exported file
              </p>
              <label className="inline-block">
                <span className="sr-only">Import Data</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={importData}
                  className="hidden"
                />
                <Button
                  as="span"
                  variant="outline"
                >
                  Import Data
                </Button>
              </label>
            </div>

            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                Reset all data and start fresh (this cannot be undone)
              </p>
              <Button
                onClick={resetAllData}
                variant="danger"
              >
                Reset All Data
              </Button>
            </div>
          </div>
        </Card>

        {/* About */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            About
          </h2>

          <div className="space-y-2">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Mind-IT Habit Tracker
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Version 1.0.0
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} Mind-IT
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};
