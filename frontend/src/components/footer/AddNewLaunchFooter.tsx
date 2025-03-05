import { Button, FieldError, Input, Label, TextField } from 'react-aria-components';
import { FooterCheckboxes } from '../checkbox/FooterCheckboxes.tsx';
import { useEffect, useRef, useState } from 'react';
import { DropdownMenu } from '../dropdown/DropdownMenu.tsx';
import styles from './addNewLaunchFooter.module.css';
import './error.css';
import * as React from 'react';
import { useCodelineParams } from '../../utils/useCodelineParamsUtils.ts';
import { collectCodelineParamsToXML } from '../../utils/CodelineToXMLUtils.ts';

interface AddNewLaunchFooterProps {
  profiles: { value: number; label: string }[];
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddNewLaunchFooter: React.FC<AddNewLaunchFooterProps> = ({
  profiles,
  isOpen,
  setOpen,
}) => {
  const {
    params,
    setCodelineName,
    setTestedVersion,
    setRuntimeVersion,
    setDevMode,
    setFromJenkins,
    setProfiles,
    resetToDefaults,
  } = useCodelineParams();

  const [selectedItems, setSelectedItems] = useState<{ value: number; label: string }[]>([]);
  const selectRef = useRef<any>(null);

  const [isUserEdited, setIsUserEdited] = useState(false);

  const handleReset = () => {
    resetToDefaults();
    setIsUserEdited(false);
    setOpen(false);
    selectRef.current?.clearValue();
  };

  const handleSave = () => {
    const updatedProfiles = selectedItems.map((item) => ({ name: item.label }));
    setProfiles(updatedProfiles);

    //TODO: const paramsToXML =
    collectCodelineParamsToXML({
      ...params,
      profiles: updatedProfiles,
    });

    handleReset();
  };

  useEffect(() => {
    if (!isUserEdited) {
      const parts = params.codelineName.split('/').filter(Boolean);
      const relevantParts = parts.slice(1).slice(-2);

      const formattedName = relevantParts.join('-');

      setTestedVersion(formattedName ? `99.0.0.0-${formattedName}-SNAPSHOT` : '99.0.0.0-SNAPSHOT');
    }
  }, [params.codelineName, isUserEdited]);

  return (
    <div className={`${styles.panelFooter} ${isOpen ? styles.opened : styles.closed}`}>
      <div className={styles.panelContent}>
        <div className={styles.panelTitle}>Add new launch</div>
        <div className={styles.swapContent}>
          <TextField aria-label="Name" type="text" className={styles.footerField} isRequired>
            <Label className={styles.footerLabel}>Codeline name</Label>
            <Input
              className={styles.footerInput}
              value={params.codelineName}
              onChange={(e) => {
                setCodelineName(e.target.value);
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
              value={params.testedVersion}
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
              value={params.runtimeVersion}
              onChange={(e) => setRuntimeVersion(e.target.value)}
            />
            <FieldError />
          </TextField>

          <div className={styles.footerCheckboxes}>
            <TextField aria-label="Development mode" className={styles.footerField}>
              <Label className={styles.footerLabel}>Development mode</Label>
              <FooterCheckboxes selected={params.devMode} setSelected={setDevMode} />
            </TextField>

            <TextField aria-label="Build from Jenkins" className={styles.footerField}>
              <Label className={styles.footerLabel}>Build from Jenkins</Label>
              <FooterCheckboxes selected={params.fromJenkins} setSelected={setFromJenkins} />
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
            <Button className={`${styles.button} ${styles.saveButton}`} onPress={handleSave}>
              Save
            </Button>
            <Button className={`${styles.button} ${styles.cancelButton}`} onPress={handleReset}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
