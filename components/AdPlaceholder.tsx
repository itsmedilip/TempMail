import React from 'react';

interface AdPlaceholderProps {
  type: 'vertical' | 'horizontal' | 'square';
}

const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ type }) => {
  const typeClasses = {
    vertical: 'w-full h-96',
    horizontal: 'w-full h-24',
    square: 'w-full aspect-square',
  };

  const textContent = {
    vertical: '(300 x 600)',
    horizontal: '(728 x 90)',
    square: '(300 x 300)',
  };

  return (
    <div className={`
      bg-gray-200 dark:bg-gray-700 
      border border-gray-300 dark:border-gray-600 
      rounded-md flex items-center justify-center 
      text-gray-500 dark:text-gray-400
      h-full
      ${typeClasses[type]}
    `}>
      <div className="text-center">
        <p className="font-semibold">Advertisement</p>
        <p className="text-sm">{textContent[type]}</p>
      </div>
    </div>
  );
};

export default AdPlaceholder;
