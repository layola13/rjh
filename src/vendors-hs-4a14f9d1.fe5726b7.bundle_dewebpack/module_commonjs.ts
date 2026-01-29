interface Options {
  dependencies: Record<string, string>;
}

interface StringUtility {
  stringEscape(value: string): string;
}

interface ArraysUtility {
  map<T, R>(array: T[], callback: (item: T) => R): R[];
}

interface ObjectsUtility {
  keys<T extends object>(obj: T): Array<keyof T>;
}

declare const options: Options;
declare const js: StringUtility;
declare const arrays: ArraysUtility;
declare const objects: ObjectsUtility;
declare function t(): string;
declare function e(): string;
declare const A: string;

function generateCommonJsModule(): string {
  const outputLines: string[] = [];
  const dependencyKeys = objects.keys(options.dependencies);
  const requireStatements = arrays.map(dependencyKeys, (dependencyKey) => {
    const dependencyPath = options.dependencies[dependencyKey];
    const escapedPath = js.stringEscape(dependencyPath);
    return `${dependencyKey} = require("${escapedPath}")`;
  });

  const headerContent = [t(), "", '"use strict";', ""].join("\n");
  outputLines.push(headerContent);

  if (requireStatements.length > 0) {
    outputLines.push(`var ${requireStatements.join(", ")};\n`);
    outputLines.push("");
  }

  const exportContent = [A, "", `module.exports = ${e()};\n`, ""].join("\n");
  outputLines.push(exportContent);

  return outputLines.join("\n");
}