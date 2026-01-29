#!/usr/bin/env node

/**
 * Check for duplicate exports in index.ts
 * This script validates that index.ts doesn't have conflicting type exports
 */

const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.ts');
const indexContent = fs.readFileSync(indexPath, 'utf-8');

// Extract all export statements (excluding commented lines)
const lines = indexContent.split('\n');
const exportStatements = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  
  // Skip commented lines
  if (line.startsWith('//')) {
    continue;
  }
  
  // Match export statements
  const exportPattern = /export\s+(?:\*|{[^}]+})\s+from\s+['"]([^'"]+)['"]/;
  const match = line.match(exportPattern);
  
  if (match) {
    exportStatements.push({
      line: i + 1,
      statement: match[0],
      module: match[1]
    });
  }
}

console.log(`Found ${exportStatements.length} export statements in index.ts\n`);

// Parse each .d.ts file to extract exported types
const exportedTypes = new Map(); // Map<typeName, Array<{module, file}>>

function parseDeclarationFile(filePath, modulePath) {
  if (!fs.existsSync(filePath)) {
    console.warn(`Warning: File not found: ${filePath}`);
    return [];
  }
  
  const content = fs.readFileSync(filePath, 'utf-8');
  const types = [];
  
  // Match: export interface Name, export type Name, export enum Name, export class Name
  const typePattern = /export\s+(?:interface|type|enum|class|const)\s+(\w+)/g;
  let typeMatch;
  
  while ((typeMatch = typePattern.exec(content)) !== null) {
    const typeName = typeMatch[1];
    types.push(typeName);
    
    if (!exportedTypes.has(typeName)) {
      exportedTypes.set(typeName, []);
    }
    exportedTypes.get(typeName).push({
      module: modulePath,
      file: filePath
    });
  }
  
  return types;
}

// Process each export statement
for (const exp of exportStatements) {
  const modulePath = exp.module;
  
  // Skip extracted modules that use index
  if (modulePath.includes('_extracted')) {
    continue;
  }
  
  // Try both .d.ts and .ts extensions
  let filePath = path.join(__dirname, `${modulePath}.d.ts`);
  if (!fs.existsSync(filePath)) {
    filePath = path.join(__dirname, `${modulePath}.ts`);
  }
  
  if (exp.statement.includes('export *')) {
    // Parse the file to see what it exports
    parseDeclarationFile(filePath, modulePath);
  }
}

// Find conflicts
const conflicts = [];
for (const [typeName, sources] of exportedTypes.entries()) {
  if (sources.length > 1) {
    conflicts.push({ typeName, sources });
  }
}

if (conflicts.length === 0) {
  console.log('✅ No type export conflicts found!');
  process.exit(0);
} else {
  console.log(`❌ Found ${conflicts.length} type export conflicts:\n`);
  
  for (const conflict of conflicts) {
    console.log(`  ${conflict.typeName}:`);
    for (const source of conflict.sources) {
      console.log(`    - ${source.module}`);
    }
    console.log('');
  }
  
  console.log(`Total conflicts: ${conflicts.length}`);
  process.exit(1);
}