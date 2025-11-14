import React, { useState, useEffect, useCallback, useRef } from 'react';
import { getDomain, createAccount, getToken, getMessages, getMessage, deleteAccount } from './services/mailService';
import { Account, Message, MessageDetails, ToastData, TokenData } from './types';
import SplashScreen from './components/SplashScreen';
import EmailDisplay from './components/EmailDisplay';
import Inbox from './components/Inbox';
import MessageView from './components/MessageView';
import Toast from './components/Toast';
import { generateRandomString } from './utils/string';
import { INBOX_REFRESH_INTERVAL, TIMER_DURATION } from './constants';
import Header from './components/Header';
import Footer from './components/Footer';
import Modal from './components/Modal';
import { getPageContent } from './components/PageContent';
import InfoBox from './components/InfoBox';
import AdsterraBannerAd from './components/AdsterraBannerAd';
import AdsterraSocialBarAd from './components/AdsterraSocialBarAd';

type AppState = 'splash' | 'initializing' | 'ready' | 'error';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('splash');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [account, setAccount] = useState<Account | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<MessageDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastData | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalPage, setModalPage] = useState<string>('');

  const passwordRef = useRef<string>('');
  const inboxIntervalRef = useRef<number | null>(null);
  const timerIdRef = useRef<number | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'light') {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    } else if (savedTheme === 'dark' || prefersDark) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);
  
  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return newMode;
    });
  };
  
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ id: Date.now(), message, type });
  };

  const stopTimer = useCallback(() => {
    if (timerIdRef.current) {
      clearInterval(timerIdRef.current);
      timerIdRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    stopTimer();
    setTimeLeft(TIMER_DURATION);
    timerIdRef.current = window.setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime === null || prevTime <= 1) {
          stopTimer();
          showToast("Timer expired! Refresh or get a new email.", 'error');
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  }, [stopTimer, showToast]);

  const extendTimer = () => {
    setTimeLeft(TIMER_DURATION);
    showToast("Timer has been extended.", 'success');
  };
  
  const cleanup = useCallback(() => {
    if (inboxIntervalRef.current) clearInterval(inboxIntervalRef.current);
    stopTimer();
    setTimeLeft(null);
    setMessages([]);
    setSelectedMessage(null);
    setAccount(null);
    setToken(null);
  }, [stopTimer]);

  const handleCreateNewEmail = useCallback(async (isDelete: boolean = false) => {
    setIsLoading(true);
    if (!isDelete) {
      cleanup();
    }
    
    try {
      if (isDelete && account && token) {
        await deleteAccount(account.id, token);
        cleanup();
      }
      const domain = await getDomain();
      if (!domain) throw new Error("No domains available.");
      
      const username = generateRandomString(10);
      const address = `${username}@${domain.domain}`;
      passwordRef.current = generateRandomString(12);

      const newAccount = await createAccount(address, passwordRef.current);
      
      let tokenData: TokenData | null = null;
      let attempts = 0;
      const maxAttempts = 5;
      let backoff = 2000;

      while (!tokenData && attempts < maxAttempts) {
        attempts++;
        try {
          tokenData = await getToken(address, passwordRef.current);
        } catch (error: any) {
          // Retry on 401/404, which can indicate replication delay
          if ((error.message?.includes('401') || error.message?.includes('404')) && attempts < maxAttempts) {
            console.warn(`getToken failed (attempt ${attempts}), retrying after ${backoff}ms...`);
            await new Promise(resolve => setTimeout(resolve, backoff));
            backoff *= 2; // exponential backoff
          } else {
            throw error; // Re-throw if it's a different error or the last attempt
          }
        }
      }

      if (!tokenData) {
        throw new Error("Could not get authentication token after multiple retries.");
      }

      setAccount(newAccount);
      setToken(tokenData.token);
      startInboxCheck(tokenData.token);
      startTimer();
      setAppState('ready');
      showToast(isDelete ? "Account deleted. New email generated!" : "New temporary email generated!", 'success');
    } catch (error: any) {
      console.error("Failed to create new email:", error);
      if (error.message?.includes('429')) {
        showToast("Too many requests. Please wait a moment and try again.", 'error');
      } else if (error.message?.includes('401') || error.message.includes('authentication token')) {
         showToast("Authentication failed. Could not get a session token.", 'error');
      } else {
        showToast("Failed to create a new email. Please check your connection and try again.", 'error');
      }
      setAppState('error');
    } finally {
      setIsLoading(false);
    }
  }, [account, token, cleanup, startTimer, showToast]);

  const checkInbox = useCallback(async (currentToken: string) => {
    if (!currentToken) return;
    setIsRefreshing(true);
    try {
      const newMessages = await getMessages(currentToken);
      setMessages(prevMessages => {
        const prevIds = prevMessages.map(m => m.id).sort().join(',');
        const newIds = newMessages.map(m => m.id).sort().join(',');

        if (newIds !== prevIds) {
           if (newMessages.length > prevMessages.length && prevMessages.length > 0) {
            showToast("You've got a new mail!", 'success');
          }
          return newMessages;
        }
        return prevMessages;
      });
    } catch (error: any) {
      console.error("Failed to check inbox:", error);
      if (error.message.includes('401')) {
        showToast("Session expired. Generating a new email.", 'error');
        handleCreateNewEmail();
      }
    } finally {
      setIsRefreshing(false);
    }
  }, [handleCreateNewEmail, showToast]);


  const startInboxCheck = (currentToken: string) => {
    if (inboxIntervalRef.current) clearInterval(inboxIntervalRef.current);
    checkInbox(currentToken);
    inboxIntervalRef.current = window.setInterval(() => {
      checkInbox(currentToken);
    }, INBOX_REFRESH_INTERVAL);
  };
  
  const handleSelectMessage = async (messageId: string) => {
    if (!token) return;
    setIsLoading(true);
    try {
      const messageDetails = await getMessage(messageId, token);
      setSelectedMessage(messageDetails);
      setMessages(msgs => msgs.map(m => m.id === messageId ? {...m, seen: true} : m));
    } catch (error) {
      console.error("Failed to fetch message details:", error);
      showToast("Could not load email.", 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteMessage = () => {
    if (selectedMessage) {
      setMessages(messages.filter(m => m.id !== selectedMessage.id));
      setSelectedMessage(null);
      showToast("Message deleted locally.", 'info');
    }
  };

  const handleOpenModal = (page: string) => {
    setModalPage(page);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCopyEmail = () => {
    if (account?.address) {
        navigator.clipboard.writeText(account.address);
        showToast("Email address copied!", 'success');
    }
  };


  useEffect(() => {
    if (appState === 'initializing') {
      handleCreateNewEmail();
    }
  }, [appState, handleCreateNewEmail]);
  
  if (appState === 'splash') {
    return <SplashScreen onFinished={() => setAppState('initializing')} />;
  }
  
  return (
    <div className="min-h-screen bg-[#f2f3f7] dark:bg-[#17191f] text-gray-800 dark:text-gray-200 font-sans flex flex-col pb-20">
      <AdsterraSocialBarAd />
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <main className="container mx-auto px-4 py-8 flex-grow flex flex-col">
          <div className="w-full hidden md:flex justify-center mb-8">
            <AdsterraBannerAd />
          </div>
          <EmailDisplay 
            email={account?.address}
            onRefresh={() => token && checkInbox(token)}
            isRefreshing={isRefreshing}
            onChange={() => handleCreateNewEmail(false)}
            onDelete={() => handleCreateNewEmail(true)}
            isLoading={isLoading || appState === 'initializing'}
            timeLeft={timeLeft}
            onExtend={extendTimer}
            onCopy={handleCopyEmail}
          />
          
          <div className="mt-8 flex-grow flex flex-col min-h-0 bg-white dark:bg-[#2e333b] shadow-md rounded-md">
            {selectedMessage ? (
              <MessageView 
                message={selectedMessage}
                onBack={() => setSelectedMessage(null)}
                onDelete={handleDeleteMessage}
                isDarkMode={isDarkMode}
                showToast={showToast}
              />
            ) : (
              <Inbox 
                messages={messages} 
                onSelectMessage={handleSelectMessage}
              />
            )}
          </div>

          {!selectedMessage && (
            <div className="mt-8 flex-shrink-0">
              <InfoBox />
            </div>
          )}
      </main>
      <Footer onLinkClick={handleOpenModal} />
      <Toast toastData={toast} onClose={() => setToast(null)} />
      {isModalOpen && (
        <Modal title={getPageContent(modalPage).title} onClose={handleCloseModal}>
          {getPageContent(modalPage).content}
        </Modal>
      )}
    </div>
  );
};

export default App;