interface DependencyOptions {
  dependencies: Record<string, string>;
}

interface GeneratorContext {
  options: DependencyOptions;
  t: () => string;
  e: () => string;
  A: string;
}

function generateAMDModule(this: GeneratorContext): string {
  const dependencyPaths = Object.values(this.options.dependencies);
  const dependencyNames = Object.keys(this.options.dependencies);
  
  const dependencyPathsArray = `[${dependencyPaths
    .map((path) => `"${escapeString(path)}"`)
    .join(", ")}]`;
  
  const dependencyParams = dependencyNames.join(", ");
  
  const lines: string[] = [
    this.t(),
    `define(${dependencyPathsArray}, function(${dependencyParams}) {`,
    '  "use strict";',
    "",
    indent(this.A, 2),
    "",
    indent(`return ${this.e()};`, 2),
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

function indent(text: string, spaces: number): string {
  const indentation = " ".repeat(spaces);
  return text
    .split("\n")
    .map((line) => (line ? indentation + line : line))
    .join("\n");
}