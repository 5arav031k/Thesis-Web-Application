import { DefaultButton, PrimaryButton } from '@fluentui/react';
import React from 'react';
import styles from './generatedMessage.module.css';

interface GeneratedMessageProps {
  message: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSave: () => void | Promise<void>;
}

export const GeneratedMessage: React.FC<GeneratedMessageProps> = ({ message, setOpen, onSave }) => {
  const handleSave = () => {
    onSave();
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className={styles.messageBox}>
        <div className={styles.messageContainer}>
          <div className={styles.messageHeader}>
            <span className={styles.message}>{message}</span>
          </div>
          <div className={styles.actionButtons}>
            <div className={styles.buttonContainer}>
              <PrimaryButton
                className={`${styles.button} ${styles.saveButton}`}
                onClick={handleSave}
              >
                Yes
              </PrimaryButton>
              <DefaultButton
                className={`${styles.button} ${styles.cancelButton}`}
                onClick={handleClose}
              >
                No
              </DefaultButton>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bluredBackground}></div>
    </>
  );
};
