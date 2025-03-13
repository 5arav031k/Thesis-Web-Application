import { CodelineParameters } from '../model/CodelineParameters.ts';
import xmlFormatter from 'xml-formatter';

export const collectCodelineParamsToXML = (params: CodelineParameters): string => {
  const xml = `<codeline>
    <build_codeline>${params.codelineName}</build_codeline>
    <build_tested_version>${params.testedVersion}</build_tested_version>
    <build_runtime_version>${params.runtimeVersion}</build_runtimeVersion>
    <build_development_mode>${params.devMode}</build_development_mode>
    <build_from_jenkins>${params.fromJenkins}</build_from_jenkins>
    <build_template_selector>${params.templateSelector}</build_template_selector>
    <build_dev_label/>
    <profilesToTest>${params.profiles.map((profile) => profile.name).join(',')}</profilesToTest>
  </codeline>`;

  return xmlFormatter(xml, { indentation: '  ', collapseContent: true });
};
