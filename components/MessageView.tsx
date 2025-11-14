import React, { useState } from 'react';
import { MessageDetails } from '../types';
import { formatDate } from '../utils/date';
import { escapeHTML } from '../utils/string';
import { summarizeEmail } from '../services/geminiService';
import Spinner from './Spinner';

interface MessageViewProps {
  message: MessageDetails;
  onBack: () => void;
  onDelete: () => void;
  isDarkMode: boolean;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const MessageView: React.FC<MessageViewProps> = ({ message, onBack, onDelete, isDarkMode, showToast }) => {
  const [summary, setSummary] = useState<string | null>(null);
  const [isSummarizing, setIsSummarizing] = useState<boolean>(false);

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

  const handleSummarize = async () => {
    if (!message.text || message.text.trim().length === 0) {
      showToast("Email has no text content to summarize.", 'info');
      return;
    }
    setIsSummarizing(true);
    setSummary(null);
    try {
      const result = await summarizeEmail(message.text);
      setSummary(result);
    } catch (error) {
      console.error(error);
      showToast("Failed to generate summary.", 'error');
    } finally {
      setIsSummarizing(false);
    }
  };

  return (
    <div className="h-full flex flex-col w-full">
      <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
        <div className="flex items-center justify-between gap-4">
            <div className="flex items-center min-w-0">
                <button onClick={onBack} className="flex-shrink-0 flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white mr-2">
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <h2 className="text-lg font-bold truncate">{escapeHTML(message.subject)}</h2>
            </div>
            <div className="flex items-center space-x-2 flex-shrink-0">
                {!summary && !isSummarizing && (
                  <button 
                    onClick={handleSummarize} 
                    className="flex items-center space-x-1.5 px-2 py-1.5 rounded-md bg-gray-200 dark:bg-[#39404a] text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-[#4a525e] transition-colors text-xs font-medium"
                  >
                    <span className="material-symbols-outlined text-base">auto_awesome</span>
                    <span>Summarize</span>
                  </button>
                )}
                {isSummarizing && (
                  <div className="flex items-center space-x-1.5 px-2 py-1.5 text-gray-500 dark:text-gray-400 text-xs font-medium">
                    <Spinner className="h-4 w-4" />
                    <span>Summarizing...</span>
                  </div>
                )}
                <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors"><span className="material-symbols-outlined">download</span></button>
                <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors"><span className="material-symbols-outlined">print</span></button>
                <button onClick={onDelete} className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors"><span className="material-symbols-outlined">delete</span></button>
            </div>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400 mt-3 space-y-1">
            <div className="flex">
                <span className="w-16 font-semibold text-gray-600 dark:text-gray-500 flex-shrink-0">From:</span>
                <span>{escapeHTML(message.from.name)} &lt;{escapeHTML(message.from.address)}&gt;</span>
            </div>
             <div className="flex">
                <span className="w-16 font-semibold text-gray-600 dark:text-gray-500 flex-shrink-0">Date:</span>
                <span>{formatDate(message.createdAt)}</span>
            </div>
        </div>
      </div>
      
      {summary && (
        <div className="p-4 bg-gray-100 dark:bg-[#39404a] flex-shrink-0 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2 mb-2">
            <span className="material-symbols-outlined text-[#2ab38b]">auto_awesome</span>
            <h3 className="font-bold text-gray-800 dark:text-white">AI Summary</h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{summary}</p>
        </div>
      )}

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