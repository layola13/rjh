function generateModuleGlobals(
  t: () => string,
  indent2: (content: string) => string,
  A: string,
  options: { exportVar: string },
  e: () => string
): string {
  return [
    t(),
    "(function(root) {",
    ' "use strict";',
    "",
    indent2(A),
    "",
    indent2(`root.${options.exportVar} = ${e()};`),
    "})(this);",
    ""
  ].join("\n");
}