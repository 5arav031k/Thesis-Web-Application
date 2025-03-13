import { DefaultButton, PrimaryButton, TextField } from '@fluentui/react';
import React, { useState } from 'react';
import styles from './generatedMessage.module.css';

interface GeneratedMessageProps {
  message: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  confirmMessage: (newMessage: string) => void;
}

export const GeneratedMessage: React.FC<GeneratedMessageProps> = ({
  message,
  setOpen,
  confirmMessage,
}) => {
  const [newMessage, setNewMessage] = useState<string>(message);

  const handleSave = () => {
    handleClose();
    confirmMessage(newMessage);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className={styles.messageBox}>
        <div className={styles.messageContainer}>
          <div className={styles.messageHeader}>Generated XML</div>
          <div className={styles.dialog}>
            <TextField
              ariaLabel="Without visible label"
              multiline
              autoAdjustHeight
              resizable={false}
              className={styles.message}
              value={newMessage}
              spellCheck={false}
              onChange={(_, newValue) => setNewMessage(newValue || message)}
            />
          </div>
          <div className={styles.actionButtons}>
            <div className={styles.buttonContainer}>
              <PrimaryButton
                className={`${styles.button} ${styles.saveButton}`}
                onClick={handleSave}
              >
                Add
              </PrimaryButton>
              <DefaultButton
                className={`${styles.button} ${styles.cancelButton}`}
                onClick={handleClose}
              >
                Cancel
              </DefaultButton>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bluredBackground}></div>
    </>
  );
};
