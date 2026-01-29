#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const modulesDir = path.join(__dirname, '../source/core/modules');
const mapPath = path.join(__dirname, '../source/core/modules-rename-map.json');

// 读取重命名映射表
const renameMap = JSON.parse(fs.readFileSync(mapPath, 'utf-8'));

// 检查冲突
function checkConflicts() {
  const newNames = {};
  const conflicts = [];
  
  for (const [oldName, info] of Object.entries(renameMap)) {
    if (info.renamed && info.newName !== oldName) {
      if (newNames[info.newName]) {
        conflicts.push({
          newName: info.newName,
          oldNames: [newNames[info.newName], oldName]
        });
      } else {
        newNames[info.newName] = oldName;
      }
    }
  }
  
  return conflicts;
}

// 执行重命名
function executeRename(dryRun = true) {
  const conflicts = checkConflicts();
  
  if (conflicts.length > 0) {
    console.error('⚠️  Found naming conflicts:');
    conflicts.forEach(c => {
      console.error(`  ${c.newName} <- ${c.oldNames.join(', ')}`);
    });
    return false;
  }
  
  console.log(dryRun ? '🔍 DRY RUN MODE - No files will be renamed' : '🚀 EXECUTING RENAMES');
  console.log('='.repeat(80));
  
  let renamedCount = 0;
  let skippedCount = 0;
  const errors = [];
  
  // 获取所有需要重命名的文件，按优先级排序
  const toRename = [];
  
  for (const [oldName, info] of Object.entries(renameMap)) {
    if (info.renamed && info.newName !== oldName) {
      toRename.push({ oldName, newName: info.newName, info });
    }
  }
  
  console.log(`Total files to rename: ${toRename.length}`);
  console.log('');
  
  // 分批处理
  const batchSize = 50;
  for (let i = 0; i < toRename.length; i += batchSize) {
    const batch = toRename.slice(i, i + batchSize);
    console.log(`\nProcessing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(toRename.length / batchSize)} (${batch.length} files)...`);
    
    for (const { oldName, newName, info } of batch) {
      const oldPath = path.join(modulesDir, oldName);
      const newPath = path.join(modulesDir, newName);
      
      // 检查源文件是否存在
      if (!fs.existsSync(oldPath)) {
        errors.push(`Source file not found: ${oldName}`);
        skippedCount++;
        continue;
      }
      
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
  console.log(`  ⚠ Skipped: ${skippedCount}`);
  console.log(`  ✗ Errors: ${errors.length}`);
  
  if (errors.length > 0) {
    console.log('\n❌ Errors:');
    errors.forEach(err => console.log(`  ${err}`));
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
  
  if (success && dryRun) {
    console.log('\n✅ Dry run completed successfully. Run with --execute to apply changes.');
  } else if (success) {
    console.log('\n✅ All files renamed successfully!');
  } else {
    console.log('\n❌ Some errors occurred during rename.');
    process.exit(1);
  }
}

main();