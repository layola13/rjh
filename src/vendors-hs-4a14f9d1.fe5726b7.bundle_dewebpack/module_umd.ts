interface UMDOptions {
  dependencies: Record<string, string>;
  exportVar: string | null;
}

interface ObjectUtils {
  values<T>(obj: Record<string, T>): T[];
  keys<T>(obj: Record<string, T>): string[];
}

interface ArrayUtils {
  map<T, R>(array: T[], callback: (item: T) => R): R[];
}

interface JsUtils {
  stringEscape(str: string): string;
}

declare const objects: ObjectUtils;
declare const arrays: ArrayUtils;
declare const js: JsUtils;
declare const options: UMDOptions;
declare function t(): string;
declare function e(): string;
declare function indent2(content: string): string;

function generateUMDModule(): string {
  const lines: string[] = [];
  const dependencyValues = objects.values(options.dependencies);
  const dependencyKeys = objects.keys(options.dependencies);
  
  const amdDependenciesArray = `[${arrays.map(dependencyValues, (dependency) => {
    return `"${js.stringEscape(dependency)}"`;
  }).join(", ")}]`;
  
  const commonJsRequires = arrays.map(dependencyValues, (dependency) => {
    return `require("${js.stringEscape(dependency)}")`;
  }).join(", ");
  
  const factoryParameters = dependencyKeys.join(", ");
  
  lines.push(
    t(),
    "(function(root, factory) {",
    '  if (typeof define === "function" && define.amd) {',
    `    define(${amdDependenciesArray}, factory);`,
    '  } else if (typeof module === "object" && module.exports) {',
    `    module.exports = factory(${commonJsRequires});`
  );
  
  if (options.exportVar !== null) {
    lines.push(
      "  } else {",
      `    root.${options.exportVar} = factory();`
    );
  }
  
  lines.push(
    "  }",
    `})(this, function(${factoryParameters}) {`,
    '  "use strict";',
    "",
    indent2(A),
    "",
    indent2(`return ${e()};`),
    "});",
    ""
  );
  
  return lines.join("\n");
}