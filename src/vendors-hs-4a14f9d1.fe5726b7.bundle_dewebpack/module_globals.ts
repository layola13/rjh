function generateModuleGlobals(): string {
  return [
    getHeader(),
    "(function(root) {",
    ' "use strict";',
    "",
    indent2(moduleBody),
    "",
    indent2(`root.${options.exportVar} = ${getExportValue()};`),
    "})(this);",
    ""
  ].join("\n");
}