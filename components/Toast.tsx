import React, { useState, useEffect } from 'react';
import { ToastData } from '../types';

interface ToastProps {
  toastData: ToastData | null;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ toastData, onClose }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [currentToast, setCurrentToast] = useState<ToastData | null>(null);

  useEffect(() => {
    if (toastData) {
      setIsExiting(false);
      setCurrentToast(toastData);

      const exitTimer = setTimeout(() => {
        setIsExiting(true);
      }, 2700);

      const closeTimer = setTimeout(() => {
        onClose();
        setCurrentToast(null);
      }, 3000);

      return () => {
        clearTimeout(exitTimer);
        clearTimeout(closeTimer);
      };
    }
  }, [toastData, onClose]);

  if (!currentToast) {
    return null;
  }

  const baseClasses = "fixed bottom-5 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg shadow-xl text-white font-semibold flex items-center z-50";
  const typeClasses = {
    success: "bg-[#2ab38b]",
    error: "bg-red-600",
    info: "bg-[#34383f]",
  };
  const icon = {
    success: "check_circle",
    error: "error",
    info: "info",
  };
  const animationClass = isExiting ? 'toast-out' : 'toast-in';

  return (
    <div className={`${baseClasses} ${typeClasses[currentToast.type]} ${animationClass}`}>
      <span className="material-symbols-outlined mr-2">{icon[currentToast.type]}</span>
      {currentToast.message}
    </div>
  );
};

export default Toast;