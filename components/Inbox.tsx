import React from 'react';
import { Message } from '../types';
import { formatDate } from '../utils/date';
import { escapeHTML } from '../utils/string';
import AdsterraAd from './AdsterraAd';

interface InboxProps {
  messages: Message[];
  onSelectMessage: (id: string) => void;
}

const InboxItem: React.FC<{ message: Message; onClick: () => void }> = ({ message, onClick }) => (
    <li
        onClick={onClick}
        className={`p-4 transition-colors duration-200 cursor-pointer border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#39404a]`}
    >
        <div className="flex items-start justify-between">
            <p className={`text-sm truncate pr-2 ${!message.seen ? 'font-bold text-gray-800 dark:text-white' : 'text-gray-600 dark:text-gray-300'}`}>
                {escapeHTML(message.from.name || message.from.address)}
            </p>
            <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">{formatDate(message.createdAt)}</span>
        </div>
        <div>
            <p className={`text-sm truncate mt-1 ${!message.seen ? 'text-gray-700 dark:text-gray-200' : 'text-gray-500 dark:text-gray-400'}`}>{escapeHTML(message.subject)}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-1">{escapeHTML(message.intro)}</p>
        </div>
    </li>
);

const Inbox: React.FC<InboxProps> = ({ messages, onSelectMessage }) => {
  return (
    <div className="flex-grow flex flex-col min-h-0">
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <h2 className="font-bold text-lg text-gray-800 dark:text-white">Inbox</h2>
      </div>
      {messages.length > 0 ? (
        <ul className="no-scrollbar overflow-y-auto flex-grow">
          {messages.flatMap((message, index) => {
            const messageItem = (
              <InboxItem 
                key={message.id} 
                message={message} 
                onClick={() => onSelectMessage(message.id)} 
              />
            );

            // Show an ad after the 2nd message, and then every 5 messages after that.
            if (index === 1 || (index > 1 && (index - 1) % 5 === 0)) {
              const adItem = (
                <li key={`ad-${index}`} className="p-4 flex justify-center border-b border-gray-200 dark:border-gray-700">
                  <AdsterraAd />
                </li>
              );
              return [messageItem, adItem];
            }

            return [messageItem];
          })}
        </ul>
      ) : (
        <div className="flex-grow flex flex-col items-center justify-center text-center p-8 text-gray-500 dark:text-gray-400 min-h-[300px]">
          <span className="material-symbols-outlined text-6xl">inbox</span>
          <h3 className="text-lg font-semibold mt-4">Your inbox is empty</h3>
          <p className="text-sm">Waiting for incoming emails...</p>
        </div>
      )}
    </div>
  );
};

export default Inbox;