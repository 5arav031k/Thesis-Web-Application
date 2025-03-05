import { CodelineParameters } from '../model/CodelineParameters.ts';

export const collectCodelineParamsToXML = (params: CodelineParameters): string => {
  return `<codeline>
            <build_codeline>${params.codelineName}</build_codeline>
            <build_tested_version>${params.testedVersion}</build_tested_version>
            <build_runtime_version>${params.runtimeVersion}</build_runtime_version>
            <build_development_mode>${params.devMode}</build_development_mode>
            <build_from_jenkins>${params.fromJenkins}</build_from_jenkins>
            <build_template_selector>${params.templateSelector}</build_template_selector>
            <profilesToTest>${params.profiles.map((profile) => profile.name).join(',')}</profilesToTest>
  </codeline>`;
};
