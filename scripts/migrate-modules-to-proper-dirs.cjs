const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 读取分类结果（只读取我们需要的部分）
const categorizationPath = path.join(__dirname, '../source/core/modules-categorization.json');
const fullData = JSON.parse(fs.readFileSync(categorizationPath, 'utf-8'));
const categorization = fullData.categorization;
const stats = fullData.stats;

console.log('分类统计:');
for (const [cat, count] of Object.entries(stats)) {
  console.log(`  ${cat}: ${count} 个文件`);
}
console.log('');

// 目标目录映射
const targetDirs = {
  lighting: 'source/core/lighting',
  geometry: 'source/core/geometry',
  kernel: 'source/core/kernel',
  parametric: 'source/core/parametric',
  utils: 'source/core/utils',
  types: 'source/core/types',
  rendering: 'source/core/rendering',
  algorithms: 'source/core/algorithms',
  core_functions: 'source/core/utils'  // 合并到utils
};

// 确保目标目录存在
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`✓ 创建目录: ${dirPath}`);
  }
}

// 使用git mv移动文件
function gitMoveFile(fileName, category) {
  const sourcePath = path.join('source/core/modules', fileName);
  const targetDir = targetDirs[category];
  const targetPath = path.join(targetDir, fileName);
  
  // 确保目标目录存在
  ensureDir(targetDir);
  
  // 检查目标文件是否已存在
  if (fs.existsSync(targetPath)) {
    return { moved: false, reason: 'exists', targetPath };
  }
  
  try {
    // 使用git mv保持版本历史
    execSync(`git mv "${sourcePath}" "${targetPath}"`, { stdio: 'pipe' });
    return { moved: true, targetPath };
  } catch (error) {
    // 如果git mv失败，尝试普通移动
    try {
      fs.renameSync(sourcePath, targetPath);
      return { moved: true, method: 'fs', targetPath };
    } catch (fsError) {
      return { moved: false, reason: error.message, targetPath };
    }
  }
}

// 更新文件中的导入路径
function updateImportsInFile(filePath, moveRecord) {
  try {
    let content = fs.readFileSync(filePath, 'utf-8');
    let modified = false;
    
    // 为每个被移动的文件创建路径映射
    for (const [fileName, info] of Object.entries(moveRecord)) {
      if (!info.moved) continue;
      
      const oldCategory = info.category;
      const moduleNameWithoutExt = fileName.replace(/\.(d\.ts|ts)$/, '');
      
      // 匹配多种导入格式
      const patterns = [
        // from '../modules/FileName'
        new RegExp(`(from\\s+['"])(\\.\\.\/modules\/${moduleNameWithoutExt})(['"])`, 'g'),
        // from './FileName' (如果当前文件在modules目录)
        new RegExp(`(from\\s+['"]) (\\.\/${moduleNameWithoutExt})(['"])`, 'g'),
      ];
      
      patterns.forEach(regex => {
        const newPath = `../${oldCategory}/${moduleNameWithoutExt}`;
        if (regex.test(content)) {
          content = content.replace(regex, `$1${newPath}$3`);
          modified = true;
        }
      });
    }
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf-8');
      return true;
    }
    
    return false;
  } catch (error) {
    return false;
  }
}

// 递归更新所有文件的导入
function updateAllImports(moveRecord) {
  const sourceDir = path.join(__dirname, '../source');
  let updatedCount = 0;
  
  function processDir(dirPath) {
    if (!fs.existsSync(dirPath)) return;
    
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      
      if (entry.isDirectory() && entry.name !== 'node_modules') {
        processDir(fullPath);
      } else if (entry.isFile() && /\.(ts|tsx)$/.test(entry.name)) {
        if (updateImportsInFile(fullPath, moveRecord)) {
          updatedCount++;
        }
      }
    }
  }
  
  processDir(sourceDir);
  return updatedCount;
}

// 主函数
function main() {
  console.log('开始迁移文件...\n');
  
  const moveRecord = {};
  const results = {
    moved: 0,
    skipped: 0,
    errors: 0
  };
  
  // 按分类迁移文件
  let processedCount = 0;
  for (const [fileName, info] of Object.entries(categorization)) {
    const category = info.category;
    const result = gitMoveFile(fileName, category);
    
    moveRecord[fileName] = {
      ...result,
      category
    };
    
    if (result.moved) {
      results.moved++;
      if (results.moved % 100 === 0) {
        console.log(`  进度: ${results.moved} / ${Object.keys(categorization).length}`);
      }
    } else if (result.reason === 'exists') {
      results.skipped++;
    } else {
      results.errors++;
      if (results.errors <= 5) {
        console.error(`  错误: ${fileName} - ${result.reason}`);
      }
    }
    
    processedCount++;
  }
  
  console.log('\n迁移统计:');
  console.log(`  ✓ 成功移动: ${results.moved} 个文件`);
  console.log(`  ⊘ 跳过(已存在): ${results.skipped} 个文件`);
  console.log(`  ✗ 错误: ${results.errors} 个文件`);
  
  // 保存迁移记录
  const migrationLogPath = path.join(__dirname, '../source/core/modules-migration-log.json');
  fs.writeFileSync(migrationLogPath, JSON.stringify({
    moveRecord,
    results,
    stats,
    timestamp: new Date().toISOString()
  }, null, 2));
  
  console.log(`\n✓ 迁移记录已保存到: ${migrationLogPath}`);
  
  // 更新导入路径
  console.log('\n更新导入路径...');
  const updatedCount = updateAllImports(moveRecord);
  console.log(`✓ 已更新 ${updatedCount} 个文件的导入路径`);
  
  // 检查modules目录
  const modulesDir = path.join(__dirname, '../source/core/modules');
  if (fs.existsSync(modulesDir)) {
    const remainingFiles = fs.readdirSync(modulesDir).filter(f => 
      f.endsWith('.ts') || f.endsWith('.d.ts')
    );
    
    if (remainingFiles.length === 0) {
      console.log('\n✓ modules目录已清空');
      console.log('  可以执行: git rm -r source/core/modules');
    } else {
      console.log(`\n⚠ modules目录还有 ${remainingFiles.length} 个文件:`);
      remainingFiles.slice(0, 10).forEach(f => console.log(`  - ${f}`));
    }
  }
  
  console.log('\n✓ 迁移完成!');
}

main();