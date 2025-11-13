import React, { useState, useEffect } from 'react';

interface SplashScreenProps {
  onFinished: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinished }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 1;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(onFinished, 500); 
          return 100;
        }
        return newProgress;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onFinished]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white dark:bg-[#17191f] text-gray-800 dark:text-gray-200 z-50">
      <div className="flex items-center space-x-3">
        <svg className="w-12 h-12 text-[#2ab38b]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/>
        </svg>
        <h1 className="text-5xl font-bold">
          TEMPMAIL
        </h1>
      </div>
      <div className="w-64 mt-8 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
        <div 
          className="bg-gradient-to-r from-[#2ab38b] to-green-400 h-1.5 rounded-full transition-all duration-150 ease-linear" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default SplashScreen;