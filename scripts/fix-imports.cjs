const fs = require('fs');
const path = require('path');

// 读取重命名映射
const renameMapPath = path.join(__dirname, '../source/core/modules-rename-map.json');
const renameMap = JSON.parse(fs.readFileSync(renameMapPath, 'utf-8'));

// 创建从旧模块名到新文件名的映射
const moduleToNewName = {};

// 处理 .d.ts 和 .ts 文件
for (const [oldName, info] of Object.entries(renameMap)) {
  if (info.renamed && info.newName) {
    // 去掉扩展名,用于匹配导入路径
    const oldModuleName = oldName.replace(/\.(d\.ts|ts)$/, '');
    const newModuleName = info.newName.replace(/\.(d\.ts|ts)$/, '');
    moduleToNewName[oldModuleName] = newModuleName;
  }
}

console.log(`加载了 ${Object.keys(moduleToNewName).length} 个模块映射`);

// 修复单个文件的导入
function fixImportsInFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  let modified = false;
  let newContent = content;

  // 匹配所有 import/export 语句中的路径
  const importRegex = /(from\s+['"])(\.\/[^'"]+)(['"])/g;
  
  newContent = content.replace(importRegex, (match, prefix, importPath, suffix) => {
    // 提取模块名(去掉 ./ 和可能的扩展名)
    let moduleName = importPath.replace(/^\.\//, '').replace(/\.(d\.ts|ts|js)$/, '');
    
    // 检查是否需要替换
    if (moduleToNewName[moduleName]) {
      const newModuleName = moduleToNewName[moduleName];
      console.log(`  ${filePath}: ${moduleName} -> ${newModuleName}`);
      modified = true;
      return `${prefix}./${newModuleName}${suffix}`;
    }
    
    return match;
  });

  if (modified) {
    fs.writeFileSync(filePath, newContent, 'utf-8');
    return true;
  }
  
  return false;
}

// 递归处理目录
function processDirectory(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  let totalFixed = 0;

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    
    if (entry.isDirectory()) {
      totalFixed += processDirectory(fullPath);
    } else if (entry.isFile() && /\.(ts|tsx)$/.test(entry.name)) {
      if (fixImportsInFile(fullPath)) {
        totalFixed++;
      }
    }
  }

  return totalFixed;
}

// 主函数
function main() {
  const modulesDir = path.join(__dirname, '../source/core/modules');
  
  console.log('开始修复导入...');
  console.log(`目标目录: ${modulesDir}`);
  
  const fixedCount = processDirectory(modulesDir);
  
  console.log(`\n完成! 修复了 ${fixedCount} 个文件的导入`);
}

main();