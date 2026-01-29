const fs = require('fs');
const path = require('path');

// 手动映射：不存在的模块名 -> 实际文件路径
const manualMappings = {
  // Logger 相关
  './module_470769': '../utils/Logger',
  './module_41861': '../utils/Logger',
  
  // Constants 相关
  './module_222293': '../../constants_2_extracted/constants',
  
  // CommonOptions 相关
  './module_22777': '../scene/commonoptions',
  
  // LightContentGroup 相关 (使用lightgroup)
  './module_71373': '../lighting/lightgroup',
  './module_50159': '../lighting/lightgroup',
  
  // ContentType (可能需要定义或从其他地方导入)
  './module_3442': './ContentType',
  
  // 其他常见的模块映射
  './72839': './IMesh',
  './79227': './Position3D',
  './50159': '../lighting/lightgroup'
};

// 修复单个文件
function fixImportsInFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    let newContent = content;
    let modified = false;

    // 替换所有映射中的导入路径
    for (const [oldPath, newPath] of Object.entries(manualMappings)) {
      // 匹配 from 'oldPath' 或 from "oldPath"
      const regex1 = new RegExp(`(from\\s+)(['"])${oldPath.replace(/\./g, '\\.')}\\2`, 'g');
      const regex2 = new RegExp(`(from\\s+)(['"])${oldPath.replace(/\./g, '\\.').replace(/\//g, '\\/')}\\2`, 'g');
      
      if (regex1.test(content) || regex2.test(content)) {
        newContent = newContent.replace(regex1, `$1$2${newPath}$2`);
        newContent = newContent.replace(regex2, `$1$2${newPath}$2`);
        modified = true;
        console.log(`  ${path.basename(filePath)}: ${oldPath} -> ${newPath}`);
      }
    }

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
  let fixedCount = 0;

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    
    if (entry.isDirectory()) {
      fixedCount += processDirectory(fullPath);
    } else if (entry.isFile() && /\.(ts|tsx)$/.test(entry.name) && !entry.name.endsWith('.d.ts')) {
      if (fixImportsInFile(fullPath)) {
        fixedCount++;
      }
    }
  }

  return fixedCount;
}

// 主函数
function main() {
  const modulesDir = path.join(__dirname, '../source/core/modules');
  
  console.log('开始修复缺失的模块导入...');
  console.log(`目标目录: ${modulesDir}\n`);
  
  const fixedCount = processDirectory(modulesDir);
  
  console.log(`\n完成! 修复了 ${fixedCount} 个文件的导入`);
}

main();