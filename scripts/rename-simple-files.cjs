#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const modulesDir = path.join(__dirname, '../source/core/modules');
const mapPath = path.join(__dirname, '../source/core/modules-rename-map.json');

// 读取现有映射表
const renameMap = JSON.parse(fs.readFileSync(mapPath, 'utf-8'));

// 手动定义简单文件名的映射
const simpleNameMappings = {
  'module_at.d.ts': 'ArrayAt.d.ts',
  'module_at.ts': 'ArrayAt.ts',
  'module_get.d.ts': 'ObjectGet.d.ts',
  'module_get.ts': 'ObjectGet.ts',
  'module_delete.ts': 'CollectionDelete.ts',
  'module_delete.d.ts': 'CollectionDelete.d.ts',
  'module_enforce.ts': 'ValueEnforce.ts',
  'module_enforce.d.ts': 'ValueEnforce.d.ts',
  'module_run.d.ts': 'TaskRunner.d.ts',
  'module_run.ts': 'TaskRunner.ts',
  'module_has.ts': 'CollectionHas.ts',
  'module_has.d.ts': 'CollectionHas.d.ts',
  'module_add.ts': 'QueueAdd.ts',
  'module_add.d.ts': 'QueueAdd.d.ts',
  'module_f.d.ts': 'GenericFunction.d.ts',
  'module_f.ts': 'GenericFunction.ts',
  'module_top.d.ts': 'GeometryFilter.d.ts',
  'module_top.ts': 'GeometryFilter.ts',
  'module_value.d.ts': 'ValueGetter.d.ts',
  'module_value.ts': 'ValueGetter.ts',
  'module_all.d.ts': 'PromiseAll.d.ts',
  'module_all.ts': 'PromiseAll.ts',
  'module_keys.ts': 'ObjectKeys.ts',
  'module_keys.d.ts': 'ObjectKeys.d.ts',
};

// 检查已使用的名称
const usedNames = new Set();
Object.values(renameMap).forEach(info => {
  if (info.renamed && info.newName) {
    usedNames.add(info.newName);
  }
});

// 更新映射表
let updatedCount = 0;
let conflictCount = 0;

for (const [oldName, newName] of Object.entries(simpleNameMappings)) {
  if (renameMap[oldName] && !renameMap[oldName].renamed) {
    if (!usedNames.has(newName)) {
      renameMap[oldName] = {
        ...renameMap[oldName],
        newName: newName,
        renamed: true,
        reason: 'Manual mapping for simple file names'
      };
      usedNames.add(newName);
      updatedCount++;
      console.log(`✓ ${oldName} → ${newName}`);
    } else {
      conflictCount++;
      console.log(`✗ ${oldName} - Name conflict: ${newName} already used`);
    }
  }
}

// 保存更新的映射表
fs.writeFileSync(mapPath, JSON.stringify(renameMap, null, 2));

console.log('\n=== Manual Mapping Complete ===');
console.log(`Successfully mapped: ${updatedCount}`);
console.log(`Conflicts: ${conflictCount}`);
console.log(`Updated mapping saved to: ${mapPath}`);