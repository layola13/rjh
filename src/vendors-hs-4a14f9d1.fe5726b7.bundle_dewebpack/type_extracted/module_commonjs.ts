interface CompilationOptions {
  dependencies: Record<string, string>;
}

interface ModuleGenerator {
  generateHeader(): string;
  generateExport(): string;
}

function generateCommonJSModule(
  options: CompilationOptions,
  generator: ModuleGenerator
): string {
  const outputLines: string[] = [];
  const dependencyNames: string[] = Object.keys(options.dependencies);
  
  const requireStatements: string[] = dependencyNames.map((dependencyName: string) => {
    const dependencyPath: string = options.dependencies[dependencyName];
    const escapedPath: string = escapeString(dependencyPath);
    return `${dependencyName} = require("${escapedPath}")`;
  });

  outputLines.push([generator.generateHeader(), "", '"use strict";', ""].join("\n"));

  if (requireStatements.length > 0) {
    outputLines.push(`var ${requireStatements.join(", ")};\n`);
    outputLines.push("");
  }

  outputLines.push([generator.generateExport(), "", `module.exports = ${generator.generateExport()};\n`, ""].join("\n"));

  return outputLines.join("\n");
}

function escapeString(input: string): string {
  return input
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\n/g, "\\n")
    .replace(/\r/g, "\\r")
    .replace(/\t/g, "\\t");
}