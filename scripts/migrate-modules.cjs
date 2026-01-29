const fs = require('fs');
const path = require('path');

// 读取分类结果
const categorizationPath = path.join(__dirname, '../source/core/modules-categorization.json');
const { categorization, stats } = JSON.parse(fs.readFileSync(categorizationPath, 'utf-8'));

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
  core_functions: 'source/core/utils' // core_functions 合并到 utils
};

// 确保目标目录存在
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`创建目录: ${dirPath}`);
  }
}

// 移动文件
function moveFile(fileName, category) {
  const sourcePath = path.join(__dirname, '../source/core/modules', fileName);
  const targetDir = path.join(__dirname, '..', targetDirs[category]);
  const targetPath = path.join(targetDir, fileName);
  
  // 确保目标目录存在
  ensureDir(targetDir);
  
  // 检查目标文件是否已存在
  if (fs.existsSync(targetPath)) {
    console.log(`  跳过(已存在): ${fileName} -> ${targetDirs[category]}`);
    return { moved: false, reason: 'exists' };
  }
  
  try {
    // 复制文件(先复制再删除,更安全)
    fs.copyFileSync(sourcePath, targetPath);
    fs.unlinkSync(sourcePath);
    return { moved: true };
  } catch (error) {
    console.error(`  错误: ${fileName} - ${error.message}`);
    return { moved: false, reason: error.message };
  }
}

// 更新文件中的导入路径
function updateImportsInFile(filePath, movedFiles) {
  try {
    let content = fs.readFileSync(filePath, 'utf-8');
    let modified = false;
    
    // 匹配 import/export 语句
    const importRegex = /(from\s+['"])(\.\.\/modules\/([^'"]+))(['"])/g;
    
    content = content.replace(importRegex, (match, prefix, fullPath, fileName, suffix) => {
      // 去掉可能的扩展名
      const cleanFileName = fileName.replace(/\.(d\.ts|ts)$/, '');
      const possibleNames = [
        `${cleanFileName}.ts`,
        `${cleanFileName}.d.ts`
      ];
      
      // 查找这个文件被移到哪里了
      for (const name of possibleNames) {
        if (movedFiles[name]) {
          const newCategory = movedFiles[name];
          const newPath = `../${newCategory}/${cleanFileName}`;
          modified = true;
          return `${prefix}${newPath}${suffix}`;
        }
      }
      
      return match;
    });
    
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
function updateAllImports(movedFiles) {
  const sourceDir = path.join(__dirname, '../source');
  let updatedCount = 0;
  
  function processDir(dirPath) {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      
      if (entry.isDirectory() && entry.name !== 'node_modules' && entry.name !== 'modules') {
        processDir(fullPath);
      } else if (entry.isFile() && /\.(ts|tsx)$/.test(entry.name)) {
        if (updateImportsInFile(fullPath, movedFiles)) {
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
  
  const movedFiles = {};
  const results = {
    moved: 0,
    skipped: 0,
    errors: 0
  };
  
  // 按分类统计
  console.log('迁移统计:');
  for (const [category, count] of Object.entries(stats).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${category}: ${count} 个文件`);
  }
  console.log('');
  
  // 执行迁移
  for (const [fileName, info] of Object.entries(categorization)) {
    const category = info.category;
    const result = moveFile(fileName, category);
    
    if (result.moved) {
      results.moved++;
      movedFiles[fileName] = category;
      if (results.moved % 50 === 0) {
        console.log(`  已迁移: ${results.moved} 个文件...`);
      }
    } else if (result.reason === 'exists') {
      results.skipped++;
    } else {
      results.errors++;
    }
  }
  
  console.log('\n迁移完成:');
  console.log(`  成功移动: ${results.moved} 个文件`);
  console.log(`  跳过(已存在): ${results.skipped} 个文件`);
  console.log(`  错误: ${results.errors} 个文件`);
  
  // 保存迁移记录
  const migrationLogPath = path.join(__dirname, '../source/core/modules-migration-log.json');
  fs.writeFileSync(migrationLogPath, JSON.stringify({
    movedFiles,
    results,
    timestamp: new Date().toISOString()
  }, null, 2));
  
  console.log(`\n迁移记录已保存到: ${migrationLogPath}`);
  
  // 更新导入路径
  console.log('\n开始更新导入路径...');
  const updatedCount = updateAllImports(movedFiles);
  console.log(`已更新 ${updatedCount} 个文件的导入路径`);
  
  // 检查modules目录是否为空
  const modulesDir = path.join(__dirname, '../source/core/modules');
  const remainingFiles = fs.readdirSync(modulesDir).filter(f => 
    f.endsWith('.ts') || f.endsWith('.d.ts')
  );
  
  if (remainingFiles.length === 0) {
    console.log('\nmodules目录已清空,可以安全删除');
  } else {
    console.log(`\nmodules目录还有 ${remainingFiles.length} 个文件未迁移`);
  }
}

main();