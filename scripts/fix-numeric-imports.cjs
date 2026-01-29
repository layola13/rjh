const fs = require('fs');
const path = require('path');

// 读取重命名映射
const renameMapPath = path.join(__dirname, '../source/core/modules-rename-map.json');
const renameMap = JSON.parse(fs.readFileSync(renameMapPath, 'utf-8'));

// 创建从数字到新文件名的映射
const numericToNewName = {};

// 处理映射文件，提取数字部分
for (const [oldName, info] of Object.entries(renameMap)) {
  if (info.renamed && info.newName) {
    // 从 module_数字.ts 或 数字.ts 中提取数字
    const numMatch = oldName.match(/(?:module_)?(\d+)\.(d\.ts|ts)$/);
    if (numMatch) {
      const number = numMatch[1];
      const newModuleName = info.newName.replace(/\.(d\.ts|ts)$/, '');
      numericToNewName[number] = newModuleName;
    }
  }
}

// 同时扫描现有文件，建立数字文件名到实际文件名的映射
const modulesDir = path.join(__dirname, '../source/core/modules');
const existingFiles = fs.readdirSync(modulesDir).filter(f => 
  f.endsWith('.ts') || f.endsWith('.d.ts')
);

existingFiles.forEach(fileName => {
  // 匹配纯数字文件名
  const numMatch = fileName.match(/^(\d+)\.(d\.ts|ts)$/);
  if (numMatch) {
    const number = numMatch[1];
    const moduleName = fileName.replace(/\.(d\.ts|ts)$/, '');
    if (!numericToNewName[number]) {
      numericToNewName[number] = moduleName;
    }
  }
});

console.log(`加载了 ${Object.keys(numericToNewName).length} 个数字模块映射`);

// 修复单个文件的导入
function fixImportsInFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    let modified = false;
    let newContent = content;

    // 匹配所有形式：from './数字' 或 from "./数字"
    const importRegex = /(from\s+['"])(\.\/(\d+))(['"])/g;
    
    newContent = content.replace(importRegex, (match, prefix, fullPath, number, suffix) => {
      // 检查是否有映射
      if (numericToNewName[number]) {
        const newModuleName = numericToNewName[number];
        console.log(`  ${path.basename(filePath)}: ./${number} -> ./${newModuleName}`);
        modified = true;
        return `${prefix}./${newModuleName}${suffix}`;
      }
      
      // 如果没有映射，警告
      console.warn(`  ⚠️  ${path.basename(filePath)}: 找不到模块 ./${number} 的映射`);
      return match;
    });

    if (modified) {
      fs.writeFileSync(filePath, newContent, 'utf-8');
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`错误处理文件 ${filePath}: ${error.message}`);
    return false;
  }
}

// 递归处理目录
function processDirectory(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  let totalFixed = 0;
  const missingMappings = new Set();

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    
    if (entry.isDirectory()) {
      const result = processDirectory(fullPath);
      totalFixed += result.fixed;
      result.missing.forEach(m => missingMappings.add(m));
    } else if (entry.isFile() && /\.(ts|tsx)$/.test(entry.name)) {
      if (fixImportsInFile(fullPath)) {
        totalFixed++;
      }
    }
  }

  return { fixed: totalFixed, missing: missingMappings };
}

// 主函数
function main() {
  const modulesDir = path.join(__dirname, '../source/core/modules');
  
  console.log('开始修复数字导入路径...');
  console.log(`目标目录: ${modulesDir}\n`);
  
  const result = processDirectory(modulesDir);
  
  console.log(`\n完成! 修复了 ${result.fixed} 个文件的导入`);
  
  if (result.missing.size > 0) {
    console.log(`\n⚠️  警告: 以下模块没有找到映射:`);
    Array.from(result.missing).sort().forEach(m => console.log(`  - ${m}`));
  }
}

main();