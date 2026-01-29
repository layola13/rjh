interface ModuleOptions {
  dependencies: Record<string, string>;
  exportVar: string | null;
}

interface ArrayUtils {
  map<T, R>(array: T[], callback: (item: T) => R): R[];
}

interface ObjectUtils {
  values<T>(obj: Record<string, T>): T[];
  keys<T>(obj: Record<string, T>): string[];
}

interface JsUtils {
  stringEscape(str: string): string;
}

declare const options: ModuleOptions;
declare const arrays: ArrayUtils;
declare const objects: ObjectUtils;
declare const js: JsUtils;
declare function t(): string;
declare function e(): string;
declare function indent2(content: string): string;

function generateUmdModule(): string {
  const lines: string[] = [];
  
  const dependencyPaths = objects.values(options.dependencies);
  const dependencyNames = objects.keys(options.dependencies);
  
  const amdDependenciesArray = "[" + arrays.map(dependencyPaths, (path: string) => {
    return '"' + js.stringEscape(path) + '"';
  }).join(", ") + "]";
  
  const commonjsRequires = arrays.map(dependencyPaths, (path: string) => {
    return 'require("' + js.stringEscape(path) + '")';
  }).join(", ");
  
  const factoryParams = dependencyNames.join(", ");
  
  lines.push([
    t(),
    "(function(root, factory) {",
    '  if (typeof define === "function" && define.amd) {',
    `    define(${amdDependenciesArray}, factory);`,
    '  } else if (typeof module === "object" && module.exports) {',
    `    module.exports = factory(${commonjsRequires});`
  ].join("\n"));
  
  if (options.exportVar !== null) {
    lines.push([
      "  } else {",
      `    root.${options.exportVar} = factory();`
    ].join("\n"));
  }
  
  lines.push([
    "  }",
    `})(this, function(${factoryParams}) {`,
    '  "use strict";',
    "",
    indent2(t()),
    "",
    indent2(`return ${e()};`),
    "});",
    ""
  ].join("\n"));
  
  return lines.join("\n");
}