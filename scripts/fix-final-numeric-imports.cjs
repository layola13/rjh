const fs = require('fs');
const path = require('path');

// 最终的手动映射（基于搜索结果）
const finalMappings = {
  // material/migratemixpaint.ts
  'source/core/material/migratemixpaint.ts': {
    './12039': './migratefacegroup'  // 假设在同目录
  },
  
  // objects/base/
  'source/core/objects/base/strongeleccomp.ts': {
    './26005': './componenttypedump'
  },
  'source/core/objects/base/weakeleccomp.ts': {
    './26005': './componenttypedump'
  },
  
  // objects/opening/
  'source/core/objects/opening/unifyopeningutil.ts': {
    './82625': './faceholetype'  // 假设在同目录
  },
  
  // geometry/polygon/
  'source/core/geometry/polygon/region_2.ts': {
    './85492': '../../building/iroofloopbaseinfo'  // TgWallUtil在这里
  },
  
  // scene/geometryfactory.ts - 大量导入
  'source/core/scene/geometryfactory.ts': {
    './75806': '../objects/pattern',  // GussetGroup
    './91808': '../kernel/dextruding_io',  // DExtruding
    './61526': '../kernel/dsweep_io',  // DSweep
    './2066': '../geometry/tgfacegeometry',  // TgFaceGeometry
    './36881': '../objects/opening/windowsill',  // WindowSill
    './55944': '../objects/opening/dwindow_io',  // DWindow
    './78453': '../objects/opening/ParametricOpening',  // ParametricOpening
    './63417': '../building/iroofloopbaseinfo',  // NCustomizedFeatureModel
    './62947': '../mep/Node',  // ConcealedWork
    './90241': '../mep/TubeTree',  // ConcealedWorkTubeTree
    './49449': '../mep/TubeTree',  // ConcealedWorkTube
    './81063': '../mep/junctionbox',  // JunctionBox
    './17004': '../objects/ncpcontent',  // NCPContent
    './61602': '../objects/meshcontent'   // MeshContent
  },
  
  // scene/log.ts
  'source/core/scene/log.ts': {
    './41861': '../utils/Logger'
  }
};

function fixFile(filePath, mappings) {
  const fullPath = path.join(__dirname, '..', filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`  ⚠️  文件不存在: ${filePath}`);
    return false;
  }
  
  try {
    let content = fs.readFileSync(fullPath, 'utf-8');
    let modified = false;
    
    for (const [oldPath, newPath] of Object.entries(mappings)) {
      const regex = new RegExp(`(from\\s+['"])${oldPath.replace(/[./]/g, '\\$&')}(['"])`, 'g');
      
      if (regex.test(content)) {
        content = content.replace(regex, `$1${newPath}$2`);
        modified = true;
        console.log(`  ${path.basename(filePath)}: ${oldPath} -> ${newPath}`);
      }
    }
    
    if (modified) {
      fs.writeFileSync(fullPath, content, 'utf-8');
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`  ✗ 错误: ${filePath} - ${error.message}`);
    return false;
  }
}

function main() {
  console.log('修复最后的数字路径导入...\n');
  
  let fixedCount = 0;
  
  for (const [filePath, mappings] of Object.entries(finalMappings)) {
    if (fixFile(filePath, mappings)) {
      fixedCount++;
    }
  }
  
  console.log(`\n✓ 完成! 修复了 ${fixedCount} 个文件`);
}

main();