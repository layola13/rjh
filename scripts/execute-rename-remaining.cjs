#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const modulesDir = path.join(__dirname, '../source/core/modules');
const mapPath = path.join(__dirname, '../source/core/modules-rename-map.json');

// 读取重命名映射表
const renameMap = JSON.parse(fs.readFileSync(mapPath, 'utf-8'));

// 执行重命名（只处理存在的文件）
function executeRename(dryRun = true) {
  console.log(dryRun ? '🔍 DRY RUN MODE - No files will be renamed' : '🚀 EXECUTING RENAMES');
  console.log('='.repeat(80));
  
  let renamedCount = 0;
  let skippedCount = 0;
  let alreadyRenamedCount = 0;
  const errors = [];
  
  // 获取所有需要重命名且文件仍然存在的文件
  const toRename = [];
  
  for (const [oldName, info] of Object.entries(renameMap)) {
    if (info.renamed && info.newName !== oldName) {
      const oldPath = path.join(modulesDir, oldName);
      
      // 只处理源文件仍然存在的情况
      if (fs.existsSync(oldPath)) {
        toRename.push({ oldName, newName: info.newName, info });
      } else {
        // 检查目标文件是否已存在（说明已经重命名过了）
        const newPath = path.join(modulesDir, info.newName);
        if (fs.existsSync(newPath)) {
          alreadyRenamedCount++;
        }
      }
    }
  }
  
  console.log(`Total files to rename: ${toRename.length}`);
  console.log(`Already renamed: ${alreadyRenamedCount}`);
  console.log('');
  
  if (toRename.length === 0) {
    console.log('✅ No files need to be renamed. All files are already processed.');
    return true;
  }
  
  // 分批处理
  const batchSize = 50;
  for (let i = 0; i < toRename.length; i += batchSize) {
    const batch = toRename.slice(i, i + batchSize);
    console.log(`\nProcessing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(toRename.length / batchSize)} (${batch.length} files)...`);
    
    for (const { oldName, newName, info } of batch) {
      const oldPath = path.join(modulesDir, oldName);
      const newPath = path.join(modulesDir, newName);
      
      // 检查目标文件是否已存在
      if (fs.existsSync(newPath) && newPath !== oldPath) {
        errors.push(`Target file already exists: ${newName}`);
        skippedCount++;
        continue;
      }
      
      try {
        if (!dryRun) {
          fs.renameSync(oldPath, newPath);
        }
        console.log(`  ✓ ${oldName} → ${newName}`);
        if (info.description) {
          console.log(`    ${info.description.substring(0, 80)}`);
        }
        renamedCount++;
      } catch (error) {
        errors.push(`Failed to rename ${oldName}: ${error.message}`);
        skippedCount++;
      }
    }
  }
  
  console.log('\n' + '='.repeat(80));
  console.log('📊 Summary:');
  console.log(`  ✓ Successfully renamed: ${renamedCount}`);
  console.log(`  ⚪ Already renamed: ${alreadyRenamedCount}`);
  console.log(`  ⚠ Skipped: ${skippedCount}`);
  console.log(`  ✗ Errors: ${errors.length}`);
  
  if (errors.length > 0 && errors.length <= 10) {
    console.log('\n❌ Errors:');
    errors.forEach(err => console.log(`  ${err}`));
  } else if (errors.length > 10) {
    console.log(`\n❌ ${errors.length} errors occurred (too many to display)`);
  }
  
  return errors.length === 0;
}

// 主函数
function main() {
  const args = process.argv.slice(2);
  const dryRun = !args.includes('--execute');
  
  if (dryRun) {
    console.log('ℹ️  Running in DRY RUN mode. Use --execute to actually rename files.\n');
  }
  
  const success = executeRename(dryRun);
  
  if (success && dryRun && Object.keys(renameMap).some(k => {
    const info = renameMap[k];
    return info.renamed && info.newName !== k && fs.existsSync(path.join(__dirname, '../source/core/modules', k));
  })) {
    console.log('\n✅ Dry run completed successfully. Run with --execute to apply changes.');
  } else if (success) {
    console.log('\n✅ All remaining files renamed successfully!');
  } else {
    console.log('\n⚠️  Rename completed with some errors.');
  }
}

main();