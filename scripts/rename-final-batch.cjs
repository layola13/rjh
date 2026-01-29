#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const modulesDir = path.join(__dirname, '../source/core/modules');
const mapPath = path.join(__dirname, '../source/core/modules-rename-map.json');

// 读取现有映射表
const renameMap = JSON.parse(fs.readFileSync(mapPath, 'utf-8'));

// 获取已使用的名称
const usedNames = new Set();
Object.values(renameMap).forEach(info => {
  if (info.renamed && info.newName) {
    usedNames.add(info.newName);
  }
});

// 手动分析每个剩余文件
const manualMappings = {
  'module_11256.d.ts': 'BarrelExport44292.d.ts',
  'module_11256.ts': 'BarrelExport44292.ts',
  'module_13818.d.ts': 'ToObjectRequired.d.ts',
  'module_14890.d.ts': null, // 需要读取
  'module_20352.d.ts': null,
  'module_20431.d.ts': 'EmptyModule20431.d.ts',
  'module_20431.ts': 'EmptyModule20431.ts',
  'module_2314.d.ts': null,
  'module_23183.d.ts': 'EmptyModule23183.d.ts',
  'module_23183.ts': 'EmptyModule23183.ts',
  'module_237698.d.ts': 'ReExport857121.d.ts',
  'module_237698.ts': 'ReExport857121.ts',
  'module_30742.d.ts': 'ErrorConstructorFactory.d.ts',
  'module_35710.d.ts': null,
  'module_4012.d.ts': null, // 可能已经处理过
  'module_45424.d.ts': 'ObjectMerge.d.ts',
  'module_45573.d.ts': null,
  'module_51545.ts': null,
  'module_53250.d.ts': null,
  'module_5538.d.ts': null,
  'module_60056.d.ts': null,
  'module_60241.d.ts': 'IsDenoEnvironment.d.ts',
  'module_62016.d.ts': null,
  'module_63675.d.ts': null,
  'module_64239.d.ts': null,
  'module_66315.ts': null,
  'module_69650.d.ts': null,
  'module_73133.d.ts': null,
  'module_79248.d.ts': null,
  'module_81945.ts': null,
  'module_82745.d.ts': null,
  'module_8569.d.ts': 'ReExport20198.d.ts',
  'module_8569.ts': 'ReExport20198.ts',
  'module_87524.d.ts': null,
  'module_91006.d.ts': 'EmptyModule91006.d.ts',
  'module_91006.ts': 'EmptyModule91006.ts',
  'module_92726.d.ts': null,
  'module_92726.ts': null,
  'module_93222.d.ts': null,
  'module_96714.d.ts': 'ReExport57678.d.ts',
  'module_96714.ts': 'ReExport57678.ts',
  'module_98745.d.ts': null,
};

// 读取所有剩余文件并智能分析
function analyzeRemainingFile(fileName) {
  const filePath = path.join(modulesDir, fileName);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }
  
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // 空模块检测
    if (content.includes('export {};') && content.length < 500 && 
        (content.includes('Empty module') || content.includes('only sets the __esModule'))) {
      const moduleId = fileName.match(/module_(\w+)/)[1];
      return `EmptyModule${moduleId}`;
    }
    
    // 重导出模块检测
    const reExportMatch = content.match(/export \* from ['"]\.\/module_(\w+)['"]/);
    if (reExportMatch) {
      return `ReExport${reExportMatch[1]}`;
    }
    
    const reExportMatch2 = content.match(/Re-exports all.*from.*module[:\s]+(\d+)/i);
    if (reExportMatch2) {
      return `ReExport${reExportMatch2[1]}`;
    }
    
    // barrel export 检测
    if (content.includes('barrel export') || content.includes('aggregates and forwards')) {
      const moduleIdMatch = content.match(/module[:\s]+(\d+)/i);
      if (moduleIdMatch) {
        return `BarrelExport${moduleIdMatch[1]}`;
      }
    }
    
    // 函数功能检测
    if (content.includes('Converts a value to an object')) {
      return 'ToObjectRequired';
    }
    
    if (content.includes('Merges two objects')) {
      return 'ObjectMerge';
    }
    
    if (content.includes('Deno') && content.includes('environment')) {
      return 'IsDenoEnvironment';
    }
    
    if (content.includes('error') && content.includes('constructor')) {
      return 'ErrorConstructorFactory';
    }
    
    // 查找主要的导出
    const exportMatch = content.match(/export\s+(?:default\s+)?(?:function|const|class)\s+(\w+)/);
    if (exportMatch && exportMatch[1] && exportMatch[1].length > 3) {
      return exportMatch[1].charAt(0).toUpperCase() + exportMatch[1].slice(1);
    }
    
    const declareMatch = content.match(/declare\s+(?:function|const|class)\s+(\w+)/);
    if (declareMatch && declareMatch[1] && declareMatch[1].length > 3) {
      return declareMatch[1].charAt(0).toUpperCase() + declareMatch[1].slice(1);
    }
    
    // 如果无法确定，使用模块ID
    const moduleId = fileName.match(/module_(\w+)/)[1];
    return `Module${moduleId}`;
  } catch (error) {
    console.error(`Error analyzing ${fileName}:`, error.message);
    return null;
  }
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

// 处理所有剩余文件
let processedCount = 0;
let skippedCount = 0;

const remainingFiles = fs.readdirSync(modulesDir)
  .filter(f => f.startsWith('module_') && (f.endsWith('.d.ts') || f.endsWith('.ts')));

console.log(`Found ${remainingFiles.length} remaining files to process\n`);

remainingFiles.forEach(fileName => {
  // 检查是否已经在映射表中且已重命名
  if (renameMap[fileName] && renameMap[fileName].renamed) {
    return;
  }
  
  // 先检查手动映射
  let suggestedName = manualMappings[fileName];
  
  // 如果没有手动映射，进行智能分析
  if (!suggestedName) {
    suggestedName = analyzeRemainingFile(fileName);
  }
  
  if (suggestedName) {
    const extension = fileName.endsWith('.d.ts') ? '.d.ts' : '.ts';
    const newName = generateUniqueName(suggestedName, extension);
    
    if (newName) {
      renameMap[fileName] = {
        ...renameMap[fileName],
        newName: newName,
        renamed: true,
        reason: 'Final batch analysis'
      };
      processedCount++;
      console.log(`✓ ${fileName} → ${newName}`);
    } else {
      skippedCount++;
      console.log(`✗ ${fileName} - Could not generate unique name`);
    }
  } else {
    // 保持原名
    const extension = fileName.endsWith('.d.ts') ? '.d.ts' : '.ts';
    const moduleId = fileName.match(/module_(\w+)/)[1];
    const fallbackName = generateUniqueName(`Module${moduleId}`, extension);
    
    renameMap[fileName] = {
      ...renameMap[fileName],
      newName: fallbackName || fileName,
      renamed: !!fallbackName,
      reason: fallbackName ? 'Fallback to Module[ID] naming' : 'Unable to determine meaningful name'
    };
    
    if (fallbackName) {
      processedCount++;
      console.log(`⚠ ${fileName} → ${fallbackName} (fallback)`);
    } else {
      skippedCount++;
      console.log(`✗ ${fileName} - Kept original name`);
    }
  }
});

// 保存更新的映射表
fs.writeFileSync(mapPath, JSON.stringify(renameMap, null, 2));

console.log('\n=== Final Batch Analysis Complete ===');
console.log(`Successfully processed: ${processedCount}`);
console.log(`Skipped: ${skippedCount}`);
console.log(`Updated mapping saved to: ${mapPath}`);