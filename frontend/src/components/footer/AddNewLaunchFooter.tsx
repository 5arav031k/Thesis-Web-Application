import { FooterCheckboxes } from '../checkbox/FooterCheckboxes.tsx';
import { useEffect, useRef, useState } from 'react';
import { DropdownMenu } from '../dropdown/DropdownMenu.tsx';
import styles from './addNewLaunchFooter.module.css';
import './error.css';
import * as React from 'react';
import { useCodelineParams } from '../../utils/useCodelineParamsUtils.ts';
import { collectCodelineParamsToXML } from '../../utils/CodelineToXMLUtils.ts';
import { DefaultButton, Label, PrimaryButton, TextField } from '@fluentui/react';
import { ProfileOptionType } from '../../model/ProfileOptionType.ts';
import { GeneratedMessage } from '../message/GeneratedMessage.tsx';

interface AddNewLaunchFooterProps {
  profiles: ProfileOptionType[];
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
    setProfiles,
    resetToDefaults,
  } = useCodelineParams();

  const [selectedItems, setSelectedItems] = useState<{ value: number; label: string }[]>([]);
  const selectRef = useRef<any>(null);

  const [isUserEdited, setIsUserEdited] = useState(false);

  const [resultXML, setResultXML] = useState<string>('');
  const [isResultOpened, setResultOpened] = useState<boolean>(false);

  const handleClose = () => {
    resetToDefaults();
    setIsUserEdited(false);
    setOpen(false);
    selectRef.current?.clearValue();
  };

  const handleSave = () => {
    const updatedProfiles = selectedItems.map((item) => ({ name: item.label }));
    setProfiles(updatedProfiles);

    setResultXML(
      collectCodelineParamsToXML({
        ...params,
        profiles: updatedProfiles,
      }),
    );
  };

  const confirmXML = (resultXML: string) => {
    console.log(resultXML);
    handleClose();
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
    <>
      <div className={`${styles.panelFooter} ${isOpen ? styles.opened : styles.closed}`}>
        <div className={styles.panelContent}>
          <div className={styles.panelTitle}>Add new launch</div>
          <div className={styles.swapContent}>
            <TextField
              label="Codeline name"
              required
              className={styles.footerField}
              value={params.codelineName}
              onChange={(_, newValue) => {
                setCodelineName(newValue || '');
                setIsUserEdited(false);
              }}
            />

            <TextField
              label="Tested version"
              required
              className={styles.footerField}
              value={params.testedVersion}
              onChange={(_, newValue) => {
                setTestedVersion(newValue || '');
                setIsUserEdited(true);
              }}
            />

            <TextField
              label="Runtime version"
              required
              className={styles.footerField}
              value={params.runtimeVersion}
              onChange={(_, newValue) => setRuntimeVersion(newValue || '')}
            />

            <div className={styles.footerField}>
              <Label className={styles.footerLabel}>Development mode</Label>
              <FooterCheckboxes selected={params.devMode} setSelected={setDevMode} />
            </div>

            <DropdownMenu
              labelName={'Profiles'}
              items={profiles}
              setSelectedItems={setSelectedItems}
              ref={selectRef}
            />
          </div>

          <div className={styles.actionButtons}>
            <div className={styles.buttonContainer}>
              <div className={styles.buttons}>
                <PrimaryButton
                  className={`${styles.button} ${styles.saveButton}`}
                  onClick={() => {
                    handleSave();
                    handleClose();
                  }}
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
              <div className={styles.showResult}>
                <PrimaryButton
                  className={`${styles.button} ${styles.saveButton}`}
                  onClick={() => {
                    handleSave();
                    setResultOpened(true);
                  }}
                >
                  Show generated XML
                </PrimaryButton>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isResultOpened ? (
        <GeneratedMessage
          message={resultXML}
          setOpen={setResultOpened}
          confirmMessage={confirmXML}
        />
      ) : null}
    </>
  );
};
