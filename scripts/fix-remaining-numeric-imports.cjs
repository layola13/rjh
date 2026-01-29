const fs = require('fs');
const path = require('path');

// 手动映射：从导入搜索结果得出的映射关系
const manualMappings = {
  // material 目录
  './17947': '../rendering/material/PaintService',
  
  // objects/base 目录
  './15770': './treecomp',
  
  // objects/opening 目录
  './73858': '../../scene/ncustomizedstructre_io',
  './41464': '../../rendering/pano',  // Wall
  './69747': './outdoordrawingsketch2dbuilder',  // 重新导出
  
  // scene 目录
  './62193': '../objects/base/spaceinfo',  // Layer
  './1316': '../types/ContentType',  // Scene
  './13264': '../types/HoleParameter',  // Hole
  './99856': '../objects/structural/wallmolding_io',  // WallMolding
  './79668': '../building/opening/types',  // Pocket
  './17123': '../objects/opening/cornerwindow',  // CornerWindow
  './50265': '../types/LineSegment',  // Content
  './81634': '../lighting/customizedmodellightband',  // CustomizedModel
};

// 修复单个文件
function fixImportsInFile(filePath, mappingsForThisFile) {
  try {
    let content = fs.readFileSync(filePath, 'utf-8');
    let modified = false;
    
    for (const [oldPath, newPath] of Object.entries(mappingsForThisFile)) {
      const regex = new RegExp(`(from\\s+['"])${oldPath.replace(/[./]/g, '\\$&')}(['"])`, 'g');
      
      if (regex.test(content)) {
        content = content.replace(regex, `$1${newPath}$2`);
        modified = true;
        console.log(`  ${path.basename(filePath)}: ${oldPath} -> ${newPath}`);
      }
    }
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf-8');
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`错误: ${filePath} - ${error.message}`);
    return false;
  }
}

// 主函数
function main() {
  let fixedCount = 0;
  
  console.log('开始修复剩余的数字路径导入...\n');
  
  // 定义需要修复的文件及其对应的映射
  const filesToFix = [
    {
      path: 'source/core/material/paintservice.ts',
      mappings: { './17947': '../rendering/material/PaintService' }
    },
    {
      path: 'source/core/objects/base/strongeleccomp.ts',
      mappings: { './15770': './treecomp' }
    },
    {
      path: 'source/core/objects/base/weakeleccomp.ts',
      mappings: { './15770': './treecomp' }
    },
    {
      path: 'source/core/objects/opening/unifyopeningutil.ts',
      mappings: {
        './73858': '../../scene/ncustomizedstructre_io',
        './41464': '../../rendering/pano'
      }
    },
    {
      path: 'source/core/objects/opening/outdoordrawingsketch2dbuilder.ts',
      mappings: { './69747': './outdoordrawingsketch2dbuilder' }
    },
    {
      path: 'source/core/scene/geometryfactory.ts',
      mappings: {
        './62193': '../objects/base/spaceinfo',
        './1316': '../types/ContentType',
        './13264': '../types/HoleParameter',
        './99856': '../objects/structural/wallmolding_io',
        './79668': '../building/opening/types',
        './17123': '../objects/opening/cornerwindow',
        './50265': '../types/LineSegment',
        './81634': '../lighting/customizedmodellightband',
        './97088': '../parametric/CustomizedPMModel',
        './96482': '../parametric/PMolding',
        './69712': '../parametric/PSegmentLoft',
        './99044': '../parametric/PExtruding',
        './79699': '../parametric/PBox',
        './36851': '../parametric/PContent',
        './2164': '../parametric/PAssembly',
        './44540': '../objects/soft/SoftCloth',
        './47391': '../objects/DContent',
        './7782': '../objects/opening/Window',
        './21766': '../objects/opening/DHole'
      }
    }
  ];
  
  for (const fileInfo of filesToFix) {
    const fullPath = path.join(__dirname, '..', fileInfo.path);
    if (fs.existsSync(fullPath)) {
      if (fixImportsInFile(fullPath, fileInfo.mappings)) {
        fixedCount++;
      }
    } else {
      console.log(`  ⚠️  文件不存在: ${fileInfo.path}`);
    }
  }
  
  console.log(`\n✓ 完成! 修复了 ${fixedCount} 个文件`);
}

main();