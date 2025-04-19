import { DefaultButton, PrimaryButton } from '@fluentui/react';
import React, { useEffect, useRef } from 'react';
import styles from './generatedXMLMessage.module.css';
import * as monaco from 'monaco-editor';

interface GeneratedMessageProps {
  message: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSave: () => void;
}

export const GeneratedXMLMessage: React.FC<GeneratedMessageProps> = ({
  message,
  setOpen,
  onSave,
}) => {
  const editorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (editorRef.current) {
      const editor = monaco.editor.create(editorRef.current, {
        value: message,
        language: 'xml',
        theme: 'vs',
        automaticLayout: true,
        readOnly: true,
        minimap: {
          enabled: false,
        },
        lineNumbers: 'on',
        scrollBeyondLastLine: false,
      });

      return () => {
        editor.dispose();
      };
    }
  }, [message]);

  const handleSave = () => {
    handleClose();
    onSave();
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
            <div ref={editorRef} className={styles.message} />
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
