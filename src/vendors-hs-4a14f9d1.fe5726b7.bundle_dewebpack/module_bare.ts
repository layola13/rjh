function generateModuleBareCode(
  getModuleStart: () => string,
  moduleBody: string,
  getModuleExport: () => string
): string {
  const indent = (code: string): string => {
    return code.split('\n').map(line => '  ' + line).join('\n');
  };

  return [
    getModuleStart(),
    '(function() {',
    '  "use strict";',
    '',
    indent(moduleBody),
    '',
    indent(`return ${getModuleExport()};`),
    '})()'
  ].join('\n');
}