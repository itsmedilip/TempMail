import React from 'react';
import { formatTime } from '../utils/date';

interface EmailDisplayProps {
  email: string | null;
  onRefresh: () => void;
  isRefreshing: boolean;
  onChange: () => void;
  onDelete: () => void;
  isLoading: boolean;
  timeLeft: number | null;
  onExtend: () => void;
  onCopy: () => void;
}

const ActionButton: React.FC<{
  onClick: () => void;
  text: string;
  icon: string;
  disabled?: boolean;
}> = ({ onClick, text, icon, disabled = false }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
  >
    <span className="material-symbols-outlined text-lg">{icon}</span>
    <span className="font-medium text-sm">{text}</span>
  </button>
);

const EmailDisplay: React.FC<EmailDisplayProps> = ({ 
  email,
  onRefresh,
  isRefreshing,
  onChange,
  onDelete,
  isLoading,
  timeLeft,
  onExtend,
  onCopy
}) => {

  return (
    <div className="bg-[#2e333b] shadow-md rounded-md p-6 relative bg-noise">
      <div className="text-center">
        
        {timeLeft !== null && (
          <div className="mb-4 pb-4 border-b border-gray-700">
            <p className="text-sm text-gray-400">Your email address will expire in:</p>
            <div className="flex items-center justify-center space-x-4 mt-2">
              <span className="text-3xl font-bold font-roboto-mono text-white">{formatTime(timeLeft)}</span>
              <button onClick={onExtend} className="flex items-center space-x-2 px-3 py-1 bg-[#39404a] hover:bg-[#4a525e] rounded-md transition-colors text-sm font-medium text-white">
                <span className="material-symbols-outlined text-base">timer</span>
                <span>Extend</span>
              </button>
            </div>
          </div>
        )}

        <p className="text-gray-400">Your Temporary Email Address</p>
        
        <div className="my-4 inline-flex items-center space-x-4 border-2 border-dashed border-gray-500 rounded-md p-3">
          {isLoading || !email ? (
            <div className="h-8 bg-gray-600 rounded w-64 animate-pulse"></div>
          ) : (
            <>
              <span className="font-roboto-mono text-2xl font-bold text-white">
                {email}
              </span>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={onCopy}
                  className="w-10 h-10 flex items-center justify-center bg-[#2ab38b] hover:bg-[#25a27c] rounded-full text-white transition-colors shadow-lg"
                >
                  <span className="material-symbols-outlined text-xl">content_copy</span>
                </button>
              </div>
            </>
          )}
        </div>
        
        <p className="text-sm text-gray-400 max-w-md mx-auto">
          Forget about spam, advertising mailings, hacking and attacking robots. Keep your real mailbox clean and secure. Temp Mail provides temporary, secure, anonymous, free, disposable email address.
        </p>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-700 flex flex-wrap items-center justify-center gap-4">
        <ActionButton
            onClick={onCopy}
            text="Copy"
            icon="content_copy"
            disabled={!email}
        />
        <ActionButton
          onClick={onRefresh}
          text={isRefreshing ? 'Refreshing...' : 'Refresh'}
          icon="refresh"
          disabled={isRefreshing || isLoading}
        />
        <ActionButton
          onClick={onChange}
          text="Change"
          icon="edit"
          disabled={isLoading}
        />
        <ActionButton
          onClick={onDelete}
          text="Delete"
          icon="delete"
          disabled={isLoading}
        />
      </div>
    </div>
  );
};

export default EmailDisplay;