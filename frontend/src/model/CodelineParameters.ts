import { Profile } from './Profile.ts';

export interface CodelineParameters {
  codelineName: string;
  testedVersion: string;
  runtimeVersion: string;
  devMode: boolean;
  fromJenkins: boolean;
  templateSelector: string;
  profiles: Profile[];
}
