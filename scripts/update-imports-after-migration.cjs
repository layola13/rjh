const fs = require('fs');
const path = require('path');

// 读取迁移记录
const migrationLogPath = path.join(__dirname, '../source/core/modules-migration-log.json');
const migrationLog = JSON.parse(fs.readFileSync(migrationLogPath, 'utf-8'));
const moveRecord = migrationLog.moveRecord;

// 创建从旧路径到新路径的映射
const pathMappings = {};

for (const [fileName, info] of Object.entries(moveRecord)) {
  if (info.moved) {
    const moduleNameWithoutExt = fileName.replace(/\.(d\.ts|ts)$/, '');
    const category = info.category;
    
    // 旧路径格式: ../modules/FileName 或 ./FileName (在modules内)
    pathMappings[`../modules/${moduleNameWithoutExt}`] = `../${category}/${moduleNameWithoutExt}`;
    pathMappings[`./${moduleNameWithoutExt}`] = `../${category}/${moduleNameWithoutExt}`;
  }
}

// 添加Point2D和Point3D的映射
pathMappings['../modules/Point2D'] = '../geometry/Point2D';
pathMappings['../modules/Point3D'] = '../geometry/Point3D';
pathMappings['./Point2D'] = '../geometry/Point2D';
pathMappings['./Point3D'] = '../geometry/Point3D';

console.log(`创建了 ${Object.keys(pathMappings).length} 个路径映射\n`);

// 更新单个文件的导入
function updateImportsInFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    let newContent = content;
    let modified = false;
    
    // 替换所有导入路径
    for (const [oldPath, newPath] of Object.entries(pathMappings)) {
      const regex = new RegExp(`(from\\s+['"])${oldPath.replace(/[./]/g, '\\$&')}(['"])`, 'g');
      
      if (regex.test(content)) {
        newContent = newContent.replace(regex, `$1${newPath}$2`);
        modified = true;
      }
    }
    
    if (modified) {
      fs.writeFileSync(filePath, newContent, 'utf-8');
      return true;
    }
    
    return false;
  } catch (error) {
    return false;
  }
}

// 递归处理目录
function processDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) return 0;
  
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  let updatedCount = 0;
  
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    
    if (entry.isDirectory() && entry.name !== 'node_modules' && entry.name !== '.git') {
      updatedCount += processDirectory(fullPath);
    } else if (entry.isFile() && /\.(ts|tsx)$/.test(entry.name)) {
      if (updateImportsInFile(fullPath)) {
        updatedCount++;
        if (updatedCount % 50 === 0) {
          console.log(`  已更新: ${updatedCount} 个文件...`);
        }
      }
    }
  }
  
  return updatedCount;
}

// 主函数
function main() {
  const sourceDir = path.join(__dirname, '../source');
  
  console.log('开始更新导入路径...');
  console.log(`扫描目录: ${sourceDir}\n`);
  
  const updatedCount = processDirectory(sourceDir);
  
  console.log(`\n✓ 完成! 更新了 ${updatedCount} 个文件的导入路径`);
}

main();