import React from 'react';
import VisitorCount from './VisitorCount';

const Header: React.FC = () => {
  return (
    <header className="bg-[#2e333b] shadow-sm relative bg-noise">
      <div className="container mx-auto px-4 py-3 flex items-center justify-center relative">
        <div className="flex items-center space-x-2">
            <svg className="w-8 h-8 text-[#2ab38b]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/>
            </svg>
            <h1 className="text-2xl font-bold text-white">
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