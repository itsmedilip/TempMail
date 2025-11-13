import React from 'react';
import { MessageDetails } from '../types';
import { formatDate } from '../utils/date';
import { escapeHTML } from '../utils/string';

interface MessageViewProps {
  message: MessageDetails;
  onBack: () => void;
  onDelete: () => void;
  isDarkMode: boolean;
}

const MessageView: React.FC<MessageViewProps> = ({ message, onBack, onDelete, isDarkMode }) => {
  const emailHtml = message.html && message.html.length > 0 ? message.html.join('') : `<p>${escapeHTML(message.text)}</p>`;
  
  const iframeContent = `
    <html>
      <head>
        <style>
          body { 
            font-family: sans-serif; 
            color: ${isDarkMode ? '#e5e7eb' : '#111827'};
            background-color: ${isDarkMode ? '#2e333b' : '#ffffff'};
            margin: 0;
            padding: 1rem;
            line-height: 1.6;
          }
          a { color: #2ab38b; }
          img { max-width: 100%; height: auto; }
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid ${isDarkMode ? '#39404a' : '#e5e7eb'}; padding: 8px; }
        </style>
      </head>
      <body>${emailHtml}</body>
    </html>
  `;

  return (
    <div className="h-full flex flex-col w-full">
      <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
        <div className="flex items-center justify-between">
            <div className="flex items-center">
                <button onClick={onBack} className="flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white mr-2">
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <h2 className="text-lg font-bold break-words truncate">{escapeHTML(message.subject)}</h2>
            </div>
            <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors"><span className="material-symbols-outlined">download</span></button>
                <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors"><span className="material-symbols-outlined">print</span></button>
                <button onClick={onDelete} className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors"><span className="material-symbols-outlined">delete</span></button>
            </div>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400 mt-3 space-y-1">
            <div className="flex">
                <span className="w-16 font-semibold text-gray-600 dark:text-gray-500">From:</span>
                <span>{escapeHTML(message.from.name)} &lt;{escapeHTML(message.from.address)}&gt;</span>
            </div>
             <div className="flex">
                <span className="w-16 font-semibold text-gray-600 dark:text-gray-500">Date:</span>
                <span>{formatDate(message.createdAt)}</span>
            </div>
        </div>
      </div>
      <div className="flex-grow min-h-0">
        <iframe
          srcDoc={iframeContent}
          className="w-full h-full border-0"
          sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin"
          title="Email content"
        />
      </div>
    </div>
  );
};

export default MessageView;