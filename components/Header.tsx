import React from 'react';
import VisitorCount from './VisitorCount';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <header className="bg-white dark:bg-[#2e333b] shadow-sm relative dark:bg-noise">
      <div className="container mx-auto px-4 py-3 flex items-center justify-center relative">
        <button
          onClick={toggleDarkMode}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          <span className="material-symbols-outlined">
            {isDarkMode ? 'light_mode' : 'dark_mode'}
          </span>
        </button>
        <div className="flex items-center space-x-2">
            <svg className="w-8 h-8 text-[#2ab38b]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/>
            </svg>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                TEMPMAIL
            </h1>
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <VisitorCount />
        </div>
      </div>
    </header>
  );
};

export default Header;