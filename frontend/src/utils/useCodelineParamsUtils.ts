import { useState } from 'react';
import { CodelineParameters } from '../model/CodelineParameters.ts';
import { BRANCH_DEFAULTS } from '../constants/Constants.ts';
import { Profile } from '../model/Profile.ts';

export const useCodelineParams = () => {
  const [params, setParams] = useState<CodelineParameters>({
    codelineName: BRANCH_DEFAULTS.name,
    testedVersion: BRANCH_DEFAULTS.testedVersion,
    runtimeVersion: BRANCH_DEFAULTS.runtimeVersion,
    devMode: BRANCH_DEFAULTS.devMode,
    fromJenkins: BRANCH_DEFAULTS.fromJenkins,
    templateSelector: BRANCH_DEFAULTS.templateSelector,
    profiles: [],
  });

  const setCodelineName = (newName: string) => {
    setParams((prev) => ({ ...prev, codelineName: newName }));
  };

  const setTestedVersion = (newVersion: string) => {
    setParams((prev) => ({ ...prev, testedVersion: newVersion }));
  };

  const setRuntimeVersion = (newVersion: string) => {
    setParams((prev) => ({ ...prev, runtimeVersion: newVersion }));
  };

  const setDevMode = (newDevMode: boolean) => {
    setParams((prev) => ({ ...prev, devMode: newDevMode }));
  };

  const setFromJenkins = (newValue: boolean) => {
    setParams((prev) => ({ ...prev, fromJenkins: newValue }));
  };

  const setProfiles = (newProfiles: Profile[]) => {
    setParams((prev) => ({ ...prev, profiles: newProfiles }));
  };

  const resetToDefaults = () => {
    setParams({
      codelineName: BRANCH_DEFAULTS.name,
      testedVersion: BRANCH_DEFAULTS.testedVersion,
      runtimeVersion: BRANCH_DEFAULTS.runtimeVersion,
      devMode: BRANCH_DEFAULTS.devMode,
      fromJenkins: BRANCH_DEFAULTS.fromJenkins,
      templateSelector: BRANCH_DEFAULTS.templateSelector,
      profiles: [],
    });
  };

  return {
    params,
    setCodelineName,
    setTestedVersion,
    setRuntimeVersion,
    setDevMode,
    setFromJenkins,
    setProfiles,
    resetToDefaults,
  };
};
