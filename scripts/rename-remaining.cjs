#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const modulesDir = path.join(__dirname, '../source/core/modules');
const mapPath = path.join(__dirname, '../source/core/modules-rename-map.json');

// 读取现有映射表
const renameMap = JSON.parse(fs.readFileSync(mapPath, 'utf-8'));

// 获取所有未重命名的文件
const notRenamed = Object.entries(renameMap)
  .filter(([_, info]) => !info.renamed)
  .map(([file, _]) => file);

console.log(`Found ${notRenamed.length} files that need better names`);

// 用于跟踪已使用的名称
const usedNames = new Set();
Object.values(renameMap).forEach(info => {
  if (info.renamed && info.newName) {
    usedNames.add(info.newName);
  }
});

// 更智能的名称推断
function inferNameFromContent(content, fileName) {
  // 检查是否有明确的函数或接口导出
  const exportDefault = content.match(/export\s+default\s+(\w+)/);
  const exportFunc = content.match(/export\s+(?:default\s+)?function\s+(\w+)/);
  const exportConst = content.match(/export\s+(?:default\s+)?const\s+(\w+)/);
  const declareFunc = content.match(/declare\s+function\s+(\w+)/);
  const mainInterface = content.match(/^interface\s+(\w+)/m);
  
  // 从注释中提取描述
  const commentMatch = content.match(/\/\*\*[\s\S]*?\*\s*([^\n*]+)/);
  const description = commentMatch ? commentMatch[1].trim().toLowerCase() : '';
  
  // 特殊文件名模式
  if (fileName === 'module_at.d.ts' && description.includes('array-like') && description.includes('at method')) {
    return 'ArrayAt';
  }
  
  if (fileName === 'module_add.ts' && content.includes('enqueue') && content.includes('Queue')) {
    return 'QueueEnqueue';
  }
  
  if (fileName === 'module_has.d.ts' && description.includes('checks if a key exists')) {
    return 'CollectionHas';
  }
  
  if (fileName === 'module_top.d.ts' && content.includes('几何数据') && content.includes('GeometryElement')) {
    return 'GeometryFilter';
  }
  
  if (fileName === 'module_f.d.ts' && content.includes('Module F')) {
    return 'ModuleF'; // 保持简单名称
  }
  
  if (fileName === 'module_value.d.ts') {
    return 'ValueExtractor';
  }
  
  // 通用模式匹配
  const patterns = [
    { regex: /array.*iterator/i, name: 'ArrayIterator' },
    { regex: /queue.*add|enqueue/i, name: 'QueueAdd' },
    { regex: /queue.*remove|dequeue/i, name: 'QueueRemove' },
    { regex: /collection.*has/i, name: 'CollectionHas' },
    { regex: /collection.*get/i, name: 'CollectionGet' },
    { regex: /collection.*set/i, name: 'CollectionSet' },
    { regex: /geometry.*filter/i, name: 'GeometryFilter' },
    { regex: /geometry.*top/i, name: 'GeometryTop' },
    { regex: /polyfill/i, name: 'Polyfill' },
    { regex: /shim/i, name: 'Shim' },
    { regex: /helper/i, name: 'Helper' },
    { regex: /util/i, name: 'Util' },
    { regex: /validator/i, name: 'Validator' },
    { regex: /parser/i, name: 'Parser' },
    { regex: /formatter/i, name: 'Formatter' },
    { regex: /converter/i, name: 'Converter' },
    { regex: /transformer/i, name: 'Transformer' },
  ];
  
  const fullText = (description + ' ' + content.substring(0, 500)).toLowerCase();
  
  for (const { regex, name } of patterns) {
    if (regex.test(fullText)) {
      return name;
    }
  }
  
  // 使用导出的名称
  if (exportDefault && exportDefault[1] && exportDefault[1].length > 2) {
    return toPascalCase(exportDefault[1]);
  }
  
  if (exportFunc && exportFunc[1] && exportFunc[1].length > 2) {
    return toPascalCase(exportFunc[1]);
  }
  
  if (exportConst && exportConst[1] && exportConst[1].length > 2) {
    return toPascalCase(exportConst[1]);
  }
  
  if (declareFunc && declareFunc[1] && declareFunc[1].length > 2) {
    return toPascalCase(declareFunc[1]);
  }
  
  if (mainInterface && mainInterface[1] && mainInterface[1].length > 2) {
    return mainInterface[1];
  }
  
  return null;
}

function toPascalCase(str) {
  return str
    .replace(/^module/, '')
    .replace(/[_-](\w)/g, (_, c) => c.toUpperCase())
    .replace(/^\w/, c => c.toUpperCase());
}

function generateUniqueName(baseName, extension) {
  if (!baseName) return null;
  
  let name = baseName + extension;
  let counter = 2;
  
  while (usedNames.has(name)) {
    name = `${baseName}${counter}${extension}`;
    counter++;
  }
  
  usedNames.add(name);
  return name;
}

// 处理每个未重命名的文件
let successCount = 0;
let stillUnnamed = 0;

notRenamed.forEach(fileName => {
  const filePath = path.join(modulesDir, fileName);
  
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const suggestedName = inferNameFromContent(content, fileName);
    
    if (suggestedName) {
      const extension = fileName.endsWith('.d.ts') ? '.d.ts' : '.ts';
      const newName = generateUniqueName(suggestedName, extension);
      
      if (newName) {
        renameMap[fileName] = {
          ...renameMap[fileName],
          newName: newName,
          renamed: true,
          reason: 'Re-analyzed with improved logic'
        };
        successCount++;
        console.log(`✓ ${fileName} → ${newName}`);
      } else {
        stillUnnamed++;
        console.log(`✗ ${fileName} - Could not generate unique name`);
      }
    } else {
      stillUnnamed++;
      console.log(`✗ ${fileName} - Could not infer name from content`);
    }
  } catch (error) {
    stillUnnamed++;
    console.error(`✗ ${fileName} - Error: ${error.message}`);
  }
});

// 保存更新的映射表
fs.writeFileSync(mapPath, JSON.stringify(renameMap, null, 2));

console.log('\n=== Re-analysis Complete ===');
console.log(`Successfully named: ${successCount}`);
console.log(`Still unnamed: ${stillUnnamed}`);
console.log(`Updated mapping saved to: ${mapPath}`);