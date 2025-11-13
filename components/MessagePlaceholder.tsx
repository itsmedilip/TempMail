import React from 'react';

const MessagePlaceholder: React.FC = () => {
  return (
    <div className="w-full h-full flex-col items-center justify-center bg-[#212429] p-8 text-center hidden md:flex">
      <svg className="w-48 h-48 text-gray-700" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M85 35.5H15C13.8954 35.5 13 36.3954 13 37.5V74.5C13 75.6046 13.8954 76.5 15 76.5H85C86.1046 76.5 87 75.6046 87 74.5V37.5C87 36.3954 86.1046 35.5 85 35.5Z" stroke="currentColor" strokeWidth="2"/>
        <path d="M14.5 36.5L48.8485 58.6742C49.5701 59.1388 50.4299 59.1388 51.1515 58.6742L85.5 36.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M68 23.5H32C30.8954 23.5 30 24.3954 30 25.5V31.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
      <h2 className="mt-6 text-2xl font-semibold text-gray-300">Select a message to read</h2>
      <p className="mt-2 text-gray-500">Your screen will be updated automatically.</p>
    </div>
  );
};

export default MessagePlaceholder;