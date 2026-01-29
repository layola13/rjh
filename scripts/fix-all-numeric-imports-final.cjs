const fs = require('fs');
const path = require('path');

// 读取重命名映射
const renameMapPath = path.join(__dirname, '../source/core/modules-rename-map.json');
const renameMap = JSON.parse(fs.readFileSync(renameMapPath, 'utf-8'));

// 创建从数字到新文件名的映射
const numericToNewName = {};

for (const [oldName, info] of Object.entries(renameMap)) {
  if (info.renamed && info.newName) {
    const numMatch = oldName.match(/(?:module_)?(\d+)\.(d\.ts|ts)$/);
    if (numMatch) {
      const number = numMatch[1];
      const newModuleName = info.newName.replace(/\.(d\.ts|ts)$/, '');
      numericToNewName[number] = newModuleName;
    }
  }
}

// 扫描所有目录，建立文件位置索引
const fileLocationIndex = {};

function buildFileIndex(dirPath, relativePath = '') {
  if (!fs.existsSync(dirPath)) return;
  
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    const relPath = relativePath ? `${relativePath}/${entry.name}` : entry.name;
    
    if (entry.isDirectory() && entry.name !== 'node_modules' && entry.name !== '.git') {
      buildFileIndex(fullPath, relPath);
    } else if (entry.isFile() && /\.(ts|d\.ts)$/.test(entry.name)) {
      const baseName = entry.name.replace(/\.(d\.ts|ts)$/, '');
      if (!fileLocationIndex[baseName]) {
        fileLocationIndex[baseName] = [];
      }
      if (Array.isArray(fileLocationIndex[baseName])) {
        fileLocationIndex[baseName].push({
          dir: path.dirname(fullPath),
          relativePath: relativePath,
          fileName: entry.name
        });
      }
    }
  }
}

console.log('构建文件索引...');
buildFileIndex(path.join(__dirname, '../source/core'));
console.log(`索引了 ${Object.keys(fileLocationIndex).length} 个文件\n`);

// 计算相对路径
function getRelativePath(fromDir, toDir) {
  const from = path.resolve(fromDir);
  const to = path.resolve(toDir);
  const rel = path.relative(from, to);
  return rel.startsWith('.') ? rel : './' + rel;
}

// 修复单个文件的导入
function fixImportsInFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    let newContent = content;
    let modified = false;
    const fileDir = path.dirname(filePath);
    
    // 匹配数字导入: from './数字'
    const importRegex = /(from\s+['"])(\.\/(\d+))(['"])/g;
    
    newContent = content.replace(importRegex, (match, prefix, fullPath, number, suffix) => {
      // 查找映射
      if (numericToNewName[number]) {
        const newModuleName = numericToNewName[number];
        
        // 在文件索引中查找目标文件的位置
        if (fileLocationIndex[newModuleName]) {
          const locations = fileLocationIndex[newModuleName];
          
          // 优先选择最近的位置
          let bestLocation = locations[0];
          let minDistance = Infinity;
          
          for (const loc of locations) {
            const relPath = getRelativePath(fileDir, loc.dir);
            const distance = relPath.split('/').length;
            if (distance < minDistance) {
              minDistance = distance;
              bestLocation = loc;
            }
          }
          
          const relativePath = getRelativePath(fileDir, bestLocation.dir);
          const newImportPath = `${relativePath}/${newModuleName}`.replace(/\\/g, '/');
          
          console.log(`  ${path.basename(filePath)}: ./${number} -> ${newImportPath}`);
          modified = true;
          return `${prefix}${newImportPath}${suffix}`;
        } else {
          console.warn(`  ⚠️  找不到文件位置: ${newModuleName}`);
        }
      } else {
        console.warn(`  ⚠️  找不到映射: ./${number}`);
      }
      
      return match;
    });
    
    if (modified) {
      fs.writeFileSync(filePath, newContent, 'utf-8');
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`错误处理 ${filePath}: ${error.message}`);
    return false;
  }
}

// 递归处理目录
function processDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) return 0;
  
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  let fixedCount = 0;
  
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    
    if (entry.isDirectory() && entry.name !== 'node_modules' && entry.name !== '.git') {
      fixedCount += processDirectory(fullPath);
    } else if (entry.isFile() && /\.(ts|tsx)$/.test(entry.name)) {
      if (fixImportsInFile(fullPath)) {
        fixedCount++;
      }
    }
  }
  
  return fixedCount;
}

// 主函数
function main() {
  const coreDir = path.join(__dirname, '../source/core');
  
  console.log('开始修复所有数字路径导入...');
  console.log(`目标目录: ${coreDir}\n`);
  
  const fixedCount = processDirectory(coreDir);
  
  console.log(`\n✓ 完成! 修复了 ${fixedCount} 个文件的导入`);
}

main();