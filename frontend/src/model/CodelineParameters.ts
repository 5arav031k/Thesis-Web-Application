export interface ProfileName {
  name: string;
}

export interface CodelineParameters {
  codelineName: string;
  testedVersion: string;
  runtimeVersion: string;
  devMode: boolean;
  fromJenkins: boolean;
  templateSelector: string;
  profiles: ProfileName[];
}
