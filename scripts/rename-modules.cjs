#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const modulesDir = path.join(__dirname, '../source/core/modules');
const renameMap = {};
const usedNames = new Map(); // 改为 Map 来跟踪名称使用情况

// 读取文件内容并分析
function analyzeFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const fileName = path.basename(filePath);
    
    // 提取关键信息
    const lines = content.split('\n').slice(0, 100); // 看前100行
    
    // 查找export接口、类、常量等
    const exportMatches = [...content.matchAll(/export\s+(?:interface|class|const|declare\s+(?:const|class)|type|function)\s+(\w+)/g)];
    const interfaceMatches = [...content.matchAll(/interface\s+(\w+)/g)];
    const classMatches = [...content.matchAll(/class\s+(\w+)/g)];
    const moduleComment = content.match(/@module\s+(\w+)/);
    
    // 从注释中提取描述
    let description = '';
    const commentMatch = content.match(/\/\*\*\s*\n\s*\*\s*(.+?)(?:\n|\*\/)/);
    if (commentMatch) {
      description = commentMatch[1].trim();
    }
    
    // 收集所有可能的名称
    const possibleNames = [];
    
    // Export names (优先级最高)
    exportMatches.forEach(m => {
      if (m[1] && !m[1].startsWith('_') && m[1].length > 2) {
        possibleNames.push(m[1]);
      }
    });
    
    // Interface names (特别是P开头的)
    interfaceMatches.forEach(m => {
      if (m[1] && m[1].startsWith('P') && m[1].length > 2) {
        possibleNames.push(m[1]);
      }
    });
    
    // Class names
    classMatches.forEach(m => {
      if (m[1] && m[1].length > 2) {
        possibleNames.push(m[1]);
      }
    });
    
    // Module comment
    if (moduleComment && moduleComment[1]) {
      possibleNames.push(toPascalCase(moduleComment[1]));
    }
    
    // 从描述推断
    if (description) {
      const inferredName = inferNameFromDescription(description, content);
      if (inferredName) {
        possibleNames.push(inferredName);
      }
    }
    
    return {
      oldName: fileName,
      possibleNames: [...new Set(possibleNames)], // 去重
      primaryName: possibleNames[0] || null,
      description: description.substring(0, 150),
      content: content.substring(0, 500)
    };
  } catch (error) {
    console.error(`Error analyzing ${filePath}:`, error.message);
    return null;
  }
}

// 从描述和内容推断名称
function inferNameFromDescription(desc, content) {
  desc = desc.toLowerCase();
  
  // 更详细的模式匹配
  const patterns = {
    'array iterator': 'ArrayIterator',
    'iterator': 'Iterator',
    'constructor': 'IsConstructor',
    'metadata': 'Metadata',
    'property descriptor': 'PropertyDescriptor',
    'ios device': 'IosDeviceDetection',
    'rotation': 'Rotation',
    'assembly processor': 'AssemblyProcessor',
    'assembly filter': 'AssemblyFilter',
    'filter': 'Filter',
    'unscopable': 'Unscopables',
    'safe execute': 'SafeExecute',
    'whitespace': 'WhitespaceCharacters',
    'webkit': 'WebKitVersionDetector',
    'register': 'RegisterManager',
    'polyfill': 'Polyfill',
    'light calculator': 'LightCalculator',
    'light': 'LightCalculator',
    'version': 'Version',
    'dom token': 'DOMTokenList',
    'point': 'Point',
    'vector': 'Vector',
    'matrix': 'Matrix',
    'transform': 'Transform',
  };
  
  for (const [keyword, name] of Object.entries(patterns)) {
    if (desc.includes(keyword)) {
      return name;
    }
  }
  
  // 从内容中查找特定模式
  if (content.includes('export interface Point') || content.includes('interface Point2D')) {
    return 'Point2D';
  }
  if (content.includes('export interface Vector') || content.includes('class Vector')) {
    return 'Vector3D';
  }
  
  return null;
}

// 转换为PascalCase
function toPascalCase(str) {
  return str
    .replace(/[_-](\w)/g, (_, c) => c.toUpperCase())
    .replace(/^\w/, c => c.toUpperCase());
}

// 生成唯一名称，添加更有意义的后缀
function generateUniqueName(analysis, extension) {
  const { possibleNames, oldName, description, content } = analysis;
  
  if (!possibleNames || possibleNames.length === 0) {
    return null;
  }
  
  // 尝试所有可能的名称
  for (let baseName of possibleNames) {
    const fullName = baseName + extension;
    
    if (!usedNames.has(fullName)) {
      usedNames.set(fullName, [oldName]);
      return fullName;
    }
  }
  
  // 如果所有名称都冲突，使用主名称并添加描述性后缀
  const baseName = possibleNames[0];
  
  // 尝试从描述或内容中提取区分性特征
  let suffix = '';
  
  // 从描述中提取关键词
  if (description) {
    const keywords = description.toLowerCase();
    if (keywords.includes('polyfill')) suffix = 'Polyfill';
    else if (keywords.includes('prototype')) suffix = 'Prototype';
    else if (keywords.includes('helper')) suffix = 'Helper';
    else if (keywords.includes('util')) suffix = 'Util';
    else if (keywords.includes('factory')) suffix = 'Factory';
    else if (keywords.includes('builder')) suffix = 'Builder';
    else if (keywords.includes('manager')) suffix = 'Manager';
    else if (keywords.includes('handler')) suffix = 'Handler';
    else if (keywords.includes('validator')) suffix = 'Validator';
    else if (keywords.includes('detector')) suffix = 'Detector';
    else if (keywords.includes('parser')) suffix = 'Parser';
  }
  
  // 尝试使用后缀
  if (suffix) {
    const nameWithSuffix = baseName + suffix + extension;
    if (!usedNames.has(nameWithSuffix)) {
      usedNames.set(nameWithSuffix, [oldName]);
      return nameWithSuffix;
    }
  }
  
  // 最后使用数字后缀
  let counter = 2;
  let name = `${baseName}${counter}${extension}`;
  
  while (usedNames.has(name)) {
    counter++;
    name = `${baseName}${counter}${extension}`;
  }
  
  usedNames.set(name, [oldName]);
  return name;
}

// 主处理函数
function processFiles() {
  const files = fs.readdirSync(modulesDir)
    .filter(f => f.startsWith('module_') && (f.endsWith('.d.ts') || f.endsWith('.ts')))
    .sort();
  
  console.log(`Found ${files.length} module files to process`);
  
  // 先处理 .d.ts 文件
  const dtsFiles = files.filter(f => f.endsWith('.d.ts'));
  const tsFiles = files.filter(f => f.endsWith('.ts') && !f.endsWith('.d.ts'));
  
  console.log(`Processing ${dtsFiles.length} .d.ts files...`);
  
  // 第一遍：分析所有文件
  const analyses = {};
  dtsFiles.forEach(file => {
    const filePath = path.join(modulesDir, file);
    analyses[file] = analyzeFile(filePath);
  });
  
  // 第二遍：生成唯一名称
  dtsFiles.forEach(file => {
    const analysis = analyses[file];
    
    if (analysis && analysis.primaryName) {
      const newName = generateUniqueName(analysis, '.d.ts');
      renameMap[file] = {
        newName: newName || file,
        description: analysis.description,
        renamed: !!newName,
        possibleNames: analysis.possibleNames
      };
    } else {
      renameMap[file] = {
        newName: file,
        description: analysis ? analysis.description : 'Could not analyze',
        renamed: false,
        reason: 'Unable to determine meaningful name'
      };
    }
  });
  
  console.log(`Processing ${tsFiles.length} .ts files...`);
  
  // 分析 .ts 文件
  tsFiles.forEach(file => {
    const filePath = path.join(modulesDir, file);
    const analysis = analyzeFile(filePath);
    
    // 检查是否有对应的 .d.ts 文件
    const dtsFile = file.replace(/\.ts$/, '.d.ts');
    const hasDts = renameMap[dtsFile];
    
    if (hasDts && hasDts.renamed) {
      // 使用相同的基础名称
      const baseName = hasDts.newName.replace(/\.d\.ts$/, '');
      const tsName = baseName + '.ts';
      renameMap[file] = {
        newName: tsName,
        description: analysis ? analysis.description : '',
        renamed: true,
        pairedWith: dtsFile
      };
      usedNames.set(tsName, [file]);
    } else if (analysis && analysis.primaryName) {
      const newName = generateUniqueName(analysis, '.ts');
      renameMap[file] = {
        newName: newName || file,
        description: analysis.description,
        renamed: !!newName,
        possibleNames: analysis.possibleNames
      };
    } else {
      renameMap[file] = {
        newName: file,
        description: analysis ? analysis.description : 'Could not analyze',
        renamed: false,
        reason: 'Unable to determine meaningful name'
      };
    }
  });
  
  // 保存映射表
  const outputPath = path.join(__dirname, '../source/core/modules-rename-map.json');
  fs.writeFileSync(outputPath, JSON.stringify(renameMap, null, 2));
  
  // 统计信息
  const renamed = Object.values(renameMap).filter(m => m.renamed).length;
  const kept = Object.values(renameMap).filter(m => !m.renamed).length;
  
  console.log('\n=== Rename Analysis Complete ===');
  console.log(`Total files: ${files.length}`);
  console.log(`To be renamed: ${renamed}`);
  console.log(`Keep original: ${kept}`);
  console.log(`\nMapping saved to: ${outputPath}`);
  
  // 检查冲突
  const conflicts = [];
  for (const [name, sources] of usedNames.entries()) {
    if (sources.length > 1) {
      conflicts.push({ name, sources });
    }
  }
  
  if (conflicts.length > 0) {
    console.log('\n⚠️  Naming conflicts detected:');
    conflicts.forEach(c => {
      console.log(`  ${c.name}: ${c.sources.join(', ')}`);
    });
  } else {
    console.log('\n✅ No naming conflicts detected!');
  }
  
  return renameMap;
}

// 执行
processFiles();