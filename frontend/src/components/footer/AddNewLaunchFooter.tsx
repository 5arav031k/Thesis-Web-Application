import { Button, FieldError, Input, Label, TextField } from 'react-aria-components';
import { FooterCheckboxes } from '../checkbox/FooterCheckboxes.tsx';
import { useEffect, useRef, useState } from 'react';
import { DropdownMenu } from '../dropdown/DropdownMenu.tsx';
import styles from './addNewLaunchFooter.module.css';
import './error.css';
import * as React from 'react';

interface AddNewLaunchFooterProps {
  profiles: { value: number; label: string }[];
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultName = '//aris-all/';
const defaultTestedVersion = '99.0.0.0-SNAPSHOT';
const defaultRuntimeVersion = '2025.2.3-stable';
const defaultDevMode = false;
const defaultFromJenkins = true;

export const AddNewLaunchFooter: React.FC<AddNewLaunchFooterProps> = ({
  profiles,
  isOpen,
  setOpen,
}) => {
  const [name, setName] = useState(defaultName);
  const [testedVersion, setTestedVersion] = useState(defaultTestedVersion);
  const [runtimeVersion, setRuntimeVersion] = useState(defaultRuntimeVersion);
  const [devMode, setDevMode] = useState<boolean>(defaultDevMode);
  const [fromJenkins, setFromJenkins] = useState<boolean>(defaultFromJenkins);

  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const selectRef = useRef<any>(null);

  const [isUserEdited, setIsUserEdited] = useState(false);

  const resetToDefaults = () => {
    setName(defaultName);
    setTestedVersion(defaultTestedVersion);
    setRuntimeVersion(defaultRuntimeVersion);
    setDevMode(defaultDevMode);
    setFromJenkins(defaultFromJenkins);
    setIsUserEdited(false);
    setOpen(false);

    setSelectedItems([]);
    if (selectRef.current) {
      selectRef.current.clearValue();
    }
  };

  useEffect(() => {
    if (!isUserEdited) {
      const parts = name.split('/').filter(Boolean);
      const relevantParts = parts.slice(1).slice(-2);

      const formattedName = relevantParts.join('-');

      setTestedVersion(formattedName ? `99.0.0.0-${formattedName}-SNAPSHOT` : '99.0.0.0-SNAPSHOT');
    }
  }, [name, isUserEdited]);

  return (
    <div className={`${styles.panelFooter} ${isOpen ? styles.opened : styles.closed}`}>
      <div className={styles.panelContent}>
        <div className={styles.panelTitle}>Add new launch</div>
        <div className={styles.swapContent}>
          <TextField aria-label="Name" type="text" className={styles.footerField} isRequired>
            <Label className={styles.footerLabel}>Codeline name</Label>
            <Input
              className={styles.footerInput}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setIsUserEdited(false);
              }}
            />
            <FieldError />
          </TextField>

          <TextField
            aria-label="Tested version"
            type="text"
            className={styles.footerField}
            isRequired
          >
            <Label className={styles.footerLabel}>Tested version</Label>
            <Input
              className={styles.footerInput}
              value={testedVersion}
              onChange={(e) => {
                setTestedVersion(e.target.value);
                setIsUserEdited(true);
              }}
            />
            <FieldError />
          </TextField>

          <TextField
            aria-label="Runtime version"
            type="text"
            className={styles.footerField}
            isRequired
          >
            <Label className={styles.footerLabel}>Runtime version</Label>
            <Input
              className={styles.footerInput}
              value={runtimeVersion}
              onChange={(e) => setRuntimeVersion(e.target.value)}
            />
            <FieldError />
          </TextField>

          <div className={styles.footerCheckboxes}>
            <TextField aria-label="Development mode" className={styles.footerField}>
              <Label className={styles.footerLabel}>Development mode</Label>
              <FooterCheckboxes selected={devMode} setSelected={setDevMode} />
            </TextField>

            <TextField aria-label="Build from Jenkins" className={styles.footerField}>
              <Label className={styles.footerLabel}>Build from Jenkins</Label>
              <FooterCheckboxes selected={fromJenkins} setSelected={setFromJenkins} />
            </TextField>
          </div>

          <DropdownMenu
            labelName={'Profiles'}
            items={profiles}
            setSelectedItems={setSelectedItems}
            ref={selectRef}
          />
        </div>

        <div className={styles.actionButtons}>
          <div className={styles.buttons}>
            <Button
              className={`${styles.button} ${styles.saveButton}`}
              onPress={() => setOpen(false)}
            >
              Save
            </Button>
            <Button className={`${styles.button} ${styles.cancelButton}`} onPress={resetToDefaults}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
