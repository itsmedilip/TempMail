import React, { useState, useEffect } from 'react';

const VisitorCount: React.FC = () => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    // Initialize with a random starting number to feel authentic
    if (count === null) {
      setCount(Math.floor(Math.random() * (350 - 150 + 1)) + 150);
    }

    const interval = setInterval(() => {
      setCount(prevCount => {
        if (prevCount === null) return null;
        // Fluctuate the count by a small random number
        const fluctuation = Math.floor(Math.random() * 5) - 2; // -2, -1, 0, 1, 2
        const newCount = prevCount + fluctuation;
        // Ensure the count doesn't drop below a minimum threshold
        return Math.max(100, newCount);
      });
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, [count]);

  if (count === null) {
    return (
      <div className="hidden md:flex items-center space-x-2 text-sm text-gray-300">
          <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gray-500"></span>
          </span>
          <span>... Live Visitors</span>
      </div>
    );
  }

  return (
    <div className="hidden md:flex items-center space-x-2 text-sm text-gray-300">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
      </span>
      <span>{count.toLocaleString()} Live Visitors</span>
    </div>
  );
};

export default VisitorCount;