#!/usr/bin/env node

/**
 * 组织 plugins-hs-5c263204.fe5726b7.bundle_dewebpack 目录
 * 按照功能分类重组文件结构
 */

const fs = require('fs');
const path = require('path');

const SOURCE_DIR = path.join(__dirname, '../sources/plugins-hs-5c263204.fe5726b7.bundle_dewebpack');

// 文件分类映射
const FILE_CATEGORIES = {
  '01-core-entry': [
    'homegptentry',
    'activecontext',
    'homegptstateenum',
    'historymsgmanager',
    'messagemgr',
    'messagecenter',
  ],
  
  '02-geometric-operations': [
    'arcarraygizmo',
    'arcarrayparamscard',
    'arcarrayparamscardcontrol',
    'wfabase',
    'wfabox',
    'wfaselectbound',
    'wfacompsmovement',
    'wfacompsresize',
    'wfacompsrotation',
    'wfacompscoordinateaxis',
    'opmodel',
    'opviewcontrol',
    'opsavedesign',
    'coordinateaxis',
    'threedmeasureaxis',
    'contentmovement',
    'contentrotation',
    'resizecontent',
    'scalecontext',
    'multicontentselection',
  ],
  
  '03-dimension-annotations': [
    'basedimension',
    'dimensionhandler',
    'furnituredimension',
    'newfurnituredimension',
    'lightdimension',
    'lightinglocationdimension',
    'openingdimension',
    'openingcalculateddimension',
    'openingcalculateddimensionbase',
    'parametricopeningdimension',
    'parametricopeningcalculateddimension',
    'roofobstacledimension',
    'cwcontentdimension',
    'newconcealedworkdimension',
    'cutmoldingdimension',
    'contentdimension',
    'contentdimensioncontroller',
    'tubelineardimension',
    'svgdimensiontype',
  ],
  
  '04-ui-components': [
    'contentbox',
    'radiocomponent',
    'dropdown',
    'tooltipwrapper',
    'blockoptionscomponent',
    'checkboxcomponent',
    'checkboxlist',
    'linkcomponent',
    'dialogue',
    'popup',
    'ui',
    'themecontext',
    'uploader',
    'voicerecorder',
    'feedbackblock',
    'feedbackblockwrapper',
    'feedbackblocklabel',
    'feedbacktextblock',
    'feedbacktextareablock',
    'feedbacktextareaeditblock',
    'feedbackvalueblock',
    'feedbackbuttonitemblock',
    'feedbackradioblock',
    'feedbackcheckboxblock',
    'feedbackswitchblock',
    'feedbackuploaderblock',
    'feedbackuploadvideo',
    'feedbacklistrow',
    'feedbacklistrowcontent',
    'feedbacklist',
    'feedbackform',
    'feedbackentry',
    'feedbackreplycontent',
    'listviewframe',
    'historicalversionframe',
    'attachmentform',
    'favinput',
    'favgroup',
    'favlistpanel',
    'facematerialcatalog',
    'facematerialenv',
    'tutoriallist',
    'guide',
    'uguide',
    'newguidehandle',
    'userguidefinispopup',
    'globalbeginner',
  ],
  
  '05-operation-controls': [
    'baseoperation',
    'operationid',
    'opdebugselection',
    'opexitcontrol',
    'oplayoutrooms',
    'oprenameroom',
    'oprender',
    'opredocontrol',
    'opundocontrol',
    'opviewalbum',
    'opunspportedcontrol',
    'opcreatefloorplan',
    'opimageto3dmodelcontrol',
    'cmdaddmaterial',
    'cmdadddiymaterial',
    'cmdmirror',
    'tubebox',
    'tubemovement',
    'tubelift',
  ],
  
  '06-utilities': [
    'handler',
    'whitelabelhandler',
    'storage',
    'common',
    'limit',
    'alixiaomi',
    'applytypeenum',
    'blocktypeenum',
    'axiscolorenum',
    'editmodeenum',
    'stateenum',
    'webglpointmarkertype',
    'mirrorrequest',
    'applycustomizedmodelmaterialrequest',
    'applyncustomizedmodelmaterialrequest',
    'applyncustomizedmodelmoldingmaterialrequest',
    'applyncustomizedparametricbackgroundwallrequest',
    'clearcustomizedmodelmaterialrequest',
  ],
};

// 反向映射：文件名前缀 -> 目录
const categoryMap = {};
Object.keys(FILE_CATEGORIES).forEach(category => {
  FILE_CATEGORIES[category].forEach(filePrefix => {
    categoryMap[filePrefix] = category;
  });
});

/**
 * 获取文件应该归属的目录
 */
function getCategoryForFile(filename) {
  const baseName = filename.replace(/\.(ts|d\.ts|js)$/, '');
  
  // 精确匹配
  if (categoryMap[baseName]) {
    return categoryMap[baseName];
  }
  
  // 模糊匹配（处理 module_xxx 格式的文件）
  for (const prefix in categoryMap) {
    if (baseName.startsWith(prefix)) {
      return categoryMap[prefix];
    }
  }
  
  // 根据文件名模式推断
  if (baseName.includes('dimension')) {
    return '03-dimension-annotations';
  }
  if (baseName.includes('gizmo') || baseName.includes('wfa')) {
    return '02-geometric-operations';
  }
  if (baseName.includes('feedback') || baseName.includes('component') || baseName.includes('block')) {
    return '04-ui-components';
  }
  if (baseName.startsWith('op') || baseName.includes('control') || baseName.startsWith('cmd')) {
    return '05-operation-controls';
  }
  if (baseName.startsWith('module_') || baseName.includes('enum') || baseName.includes('type')) {
    return '06-utilities';
  }
  
  // 默认归类到 utilities
  return '06-utilities';
}

/**
 * 创建目录结构
 */
function createDirectories() {
  const categories = Object.keys(FILE_CATEGORIES);
  
  categories.forEach(category => {
    const categoryPath = path.join(SOURCE_DIR, category);
    if (!fs.existsSync(categoryPath)) {
      fs.mkdirSync(categoryPath, { recursive: true });
      console.log(`✓ 创建目录: ${category}`);
    }
  });
}

/**
 * 移动文件到对应目录
 */
function organizeFiles() {
  const files = fs.readdirSync(SOURCE_DIR);
  const moveLog = [];
  
  files.forEach(file => {
    const filePath = path.join(SOURCE_DIR, file);
    const stat = fs.statSync(filePath);
    
    // 跳过目录和 index.ts
    if (stat.isDirectory() || file === 'index.ts') {
      return;
    }
    
    // 只处理 .ts 和 .d.ts 文件
    if (!file.endsWith('.ts') && !file.endsWith('.js')) {
      return;
    }
    
    const category = getCategoryForFile(file);
    const targetDir = path.join(SOURCE_DIR, category);
    const targetPath = path.join(targetDir, file);
    
    try {
      fs.renameSync(filePath, targetPath);
      moveLog.push({ file, from: 'root', to: category });
      console.log(`  ${file} -> ${category}`);
    } catch (error) {
      console.error(`✗ 移动失败: ${file}`, error.message);
    }
  });
  
  return moveLog;
}

/**
 * 生成新的 index.ts 文件
 */
function generateNewIndex(moveLog) {
  const exportsByCategory = {};
  
  // 按目录分组
  moveLog.forEach(({ file, to }) => {
    if (!exportsByCategory[to]) {
      exportsByCategory[to] = [];
    }
    const moduleName = file.replace(/\.(ts|d\.ts|js)$/, '');
    exportsByCategory[to].push(moduleName);
  });
  
  // 生成新的 index.ts 内容
  let indexContent = `/**
 * plugins-hs-5c263204.bundle - Operation Tools Plugin
 * 
 * Core Purpose: Geometric operations, dimension annotation, parametric arrays, operation controls
 * Module Size: 46KB
 * 
 * Directory Structure:
 * - 01-core-entry/              Core Entry Modules (HomeGPT AI, Context Management)
 * - 02-geometric-operations/    Geometric Operation Tools (Gizmo Controls, Arrays, Transforms)
 * - 03-dimension-annotations/   Dimension Annotation System (20+ annotation modules)
 * - 04-ui-components/          UI Component Library (40+ React components)
 * - 05-operation-controls/     Operation Controls (Commands, Operations)
 * - 06-utilities/              Utility Functions & Helper Modules
 */

`;
  
  // 按目录顺序导出
  const categoryOrder = [
    '01-core-entry',
    '02-geometric-operations',
    '03-dimension-annotations',
    '04-ui-components',
    '05-operation-controls',
    '06-utilities'
  ];
  
  categoryOrder.forEach(category => {
    if (exportsByCategory[category]) {
      indexContent += `// ${category}\n`;
      exportsByCategory[category].sort().forEach(moduleName => {
        indexContent += `export * from './${category}/${moduleName}';\n`;
      });
      indexContent += '\n';
    }
  });
  
  const indexPath = path.join(SOURCE_DIR, 'index.ts');
  fs.writeFileSync(indexPath, indexContent, 'utf-8');
  console.log('\n✓ 生成新的 index.ts');
}

/**
 * 生成整理报告
 */
function generateReport(moveLog) {
  const report = {
    timestamp: new Date().toISOString(),
    totalFiles: moveLog.length,
    categoryCounts: {},
    files: moveLog
  };
  
  moveLog.forEach(({ to }) => {
    report.categoryCounts[to] = (report.categoryCounts[to] || 0) + 1;
  });
  
  const reportPath = path.join(__dirname, '../sources/plugins-hs-5c263204.fe5726b7.bundle_dewebpack/ORGANIZATION_REPORT.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf-8');
  
  console.log('\n===== 整理报告 =====');
  console.log(`总文件数: ${report.totalFiles}`);
  console.log('\n各目录文件数:');
  Object.keys(report.categoryCounts).sort().forEach(category => {
    console.log(`  ${category}: ${report.categoryCounts[category]} 个文件`);
  });
  console.log(`\n详细报告已保存到: ORGANIZATION_REPORT.json`);
}

/**
 * 主函数
 */
function main() {
  console.log('开始整理 plugins-hs-5c263204.fe5726b7.bundle_dewebpack 目录...\n');
  
  // 1. 创建目录结构
  console.log('步骤 1: 创建目录结构');
  createDirectories();
  
  // 2. 移动文件
  console.log('\n步骤 2: 移动文件到对应目录');
  const moveLog = organizeFiles();
  
  // 3. 生成新的 index.ts
  console.log('\n步骤 3: 更新 index.ts');
  generateNewIndex(moveLog);
  
  // 4. 生成报告
  console.log('\n步骤 4: 生成整理报告');
  generateReport(moveLog);
  
  console.log('\n✓ 整理完成！');
}

// 执行
main();