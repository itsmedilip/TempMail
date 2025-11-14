import React, { useState, useEffect } from 'react';

const VISITOR_COUNT_KEY = 'totalVisitorCount';

const VisitorCount: React.FC = () => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    // Function to initialize or get the count from localStorage
    const getInitialCount = (): number => {
      const storedCount = localStorage.getItem(VISITOR_COUNT_KEY);
      if (storedCount) {
        return parseInt(storedCount, 10);
      }
      // If no count is stored, initialize with a large, random-ish number
      const initialCount = Math.floor(50000 + Math.random() * 50000);
      localStorage.setItem(VISITOR_COUNT_KEY, String(initialCount));
      return initialCount;
    };
    
    const initialCount = getInitialCount();
    setCount(initialCount);

    // Set up an interval to increment the visitor count.
    const intervalId = setInterval(() => {
      setCount(prevCount => {
        if (prevCount === null) return initialCount;
        const increment = Math.floor(Math.random() * 3) + 1; // Increment by 1, 2, or 3
        const newCount = prevCount + increment;
        localStorage.setItem(VISITOR_COUNT_KEY, String(newCount));
        return newCount;
      });
    }, 3000); // Update every 3 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  if (count === null) {
    return (
      <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-300">
          <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gray-500"></span>
          </span>
          <span>... Total Visits</span>
      </div>
    );
  }

  return (
    <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-300">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
      </span>
      <span>{count.toLocaleString()} Total Visits</span>
    </div>
  );
};

export default VisitorCount;