import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme, isLoading } = useTheme();

  if (isLoading) {
    return (
      <div className={`w-10 h-10 rounded-lg bg-secondary-100 dark:bg-secondary-800 animate-pulse ${className}`} />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative w-10 h-10 rounded-lg
        bg-secondary-100 hover:bg-secondary-200
        dark:bg-secondary-800 dark:hover:bg-secondary-700
        border border-secondary-200 dark:border-secondary-700
        transition-all duration-300 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
        dark:focus:ring-offset-secondary-900
        group overflow-hidden
        ${className}
      `}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {/* Sun Icon */}
      <div
        className={`
          absolute inset-0 flex items-center justify-center
          transition-all duration-300 ease-in-out
          ${theme === 'light' 
            ? 'opacity-100 rotate-0 scale-100' 
            : 'opacity-0 rotate-90 scale-75'
          }
        `}
      >
        <Sun 
          className="w-5 h-5 text-accent-600 dark:text-accent-400" 
          strokeWidth={2}
        />
      </div>

      {/* Moon Icon */}
      <div
        className={`
          absolute inset-0 flex items-center justify-center
          transition-all duration-300 ease-in-out
          ${theme === 'dark' 
            ? 'opacity-100 rotate-0 scale-100' 
            : 'opacity-0 -rotate-90 scale-75'
          }
        `}
      >
        <Moon 
          className="w-5 h-5 text-primary-600 dark:text-primary-400" 
          strokeWidth={2}
        />
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-accent-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </button>
  );
};

export default ThemeToggle;
