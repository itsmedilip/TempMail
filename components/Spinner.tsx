
import React from 'react';

interface SpinnerProps {
    className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ className = 'h-5 w-5' }) => {
    return (
        <div className={`animate-spin rounded-full border-2 border-t-transparent border-gray-600 dark:border-gray-300 ${className}`} role="status">
            <span className="sr-only">Loading...</span>
        </div>
    );
};

export default Spinner;
