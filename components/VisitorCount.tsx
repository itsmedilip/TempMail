import React, { useState, useEffect } from 'react';

const VisitorCount: React.FC = () => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    // Initialize with a realistic starting number to simulate a history of visits.
    const initialCount = Math.floor(15000 + Math.random() * 5000);
    setCount(initialCount);

    // Set up an interval to simulate new visitors over time.
    const intervalId = setInterval(() => {
      setCount(prevCount => (prevCount ? prevCount + Math.floor(Math.random() * 3) + 1 : initialCount));
    }, 3000); // Update every 3 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  if (count === null) {
    return (
      <div className="hidden md:flex items-center space-x-2 text-sm text-gray-300">
          <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gray-500"></span>
          </span>
          <span>... Total Visits</span>
      </div>
    );
  }

  return (
    <div className="hidden md:flex items-center space-x-2 text-sm text-gray-300">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
      </span>
      <span>{count.toLocaleString()} Total Visits</span>
    </div>
  );
};

export default VisitorCount;
