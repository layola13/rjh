interface DependencyOptions {
  dependencies: Record<string, string>;
}

interface CodeGeneratorContext {
  options: DependencyOptions;
  generateHeader: () => string;
  generateExportName: () => string;
  generateBody: () => string;
  indent: (code: string, level: number) => string;
}

function generateAMDModule(context: CodeGeneratorContext): string {
  const dependencyPaths = Object.values(context.options.dependencies);
  const dependencyNames = Object.keys(context.options.dependencies);
  
  const dependencyPathsArray = `[${dependencyPaths
    .map((path: string) => `"${escapeString(path)}"`)
    .join(", ")}]`;
  
  const dependencyParams = dependencyNames.join(", ");
  
  const moduleBody = context.generateBody();
  const exportStatement = context.generateExportName();
  
  const lines: string[] = [
    context.generateHeader(),
    `define(${dependencyPathsArray}, function(${dependencyParams}) {`,
    '  "use strict";',
    "",
    indentCode(moduleBody, 2),
    "",
    indentCode(`return ${exportStatement};`, 2),
    "});",
    ""
  ];
  
  return lines.join("\n");
}

function escapeString(str: string): string {
  return str
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\n/g, "\\n")
    .replace(/\r/g, "\\r")
    .replace(/\t/g, "\\t");
}

function indentCode(code: string, level: number): string {
  const indentation = "  ".repeat(level);
  return code
    .split("\n")
    .map((line: string) => line ? indentation + line : line)
    .join("\n");
}