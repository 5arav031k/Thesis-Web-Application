import React, { useState, useEffect } from 'react';
import styles from './toast.module.css';

interface ToastProps {
  message: string;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    const hideTimer = setTimeout(() => {
      onClose();
    }, 3300);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, [message]);

  return (
    <div className={`${styles.toast} ${visible ? styles.show : ''}`}>
      <div className={styles.message}>{message}</div>
    </div>
  );
};
