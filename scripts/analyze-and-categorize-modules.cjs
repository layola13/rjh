const fs = require('fs');
const path = require('path');

// 功能分类规则
const categoryRules = {
  lighting: [
    /light/i,
    /lamp/i,
    /illumination/i,
    /spotlight/i,
    /ceiling.*light/i,
    /flat.*light/i
  ],
  geometry: [
    /bound/i,
    /point/i,
    /vector/i,
    /polygon/i,
    /mesh/i,
    /vertex/i,
    /edge/i,
    /face/i,
    /triangle/i,
    /geometry/i,
    /coord/i,
    /transform/i
  ],
  kernel: [
    /brep/i,
    /topology/i,
    /euler/i,
    /csg/i,
    /boolean/i,
    /extrude/i,
    /sweep/i,
    /loft/i,
    /solid/i,
    /body/i,
    /loop/i,
    /coedge/i
  ],
  parametric: [
    /parametric/i,
    /passembly/i,
    /pmodel/i,
    /pmolding/i,
    /psegment/i,
    /customized/i,
    /instance/i
  ],
  utils: [
    /util/i,
    /helper/i,
    /polyfill/i,
    /shim/i,
    /compat/i,
    /support/i,
    /validator/i,
    /checker/i,
    /detect/i,
    /test/i
  ],
  types: [
    /^.*\.d\.ts$/,
    /type/i,
    /interface/i,
    /enum/i,
    /declaration/i
  ],
  rendering: [
    /render/i,
    /material/i,
    /texture/i,
    /shader/i,
    /camera/i,
    /scene/i
  ],
  algorithms: [
    /algorithm/i,
    /compute/i,
    /calculate/i,
    /filter/i,
    /sort/i,
    /search/i
  ],
  core_functions: [
    /^function\d+\.ts$/i,
    /^module\d+\.ts$/i,
    /promise/i,
    /iterator/i,
    /collection/i,
    /array/i,
    /object/i,
    /string/i,
    /number/i,
    /error/i
  ]
};

// 分析文件内容判断类别
function analyzeFileContent(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const contentLower = content.toLowerCase();
    
    // 检查导入语句中的线索
    const imports = content.match(/import.*from\s+['"]([^'"]+)['"]/g) || [];
    const importPaths = imports.map(imp => {
      const match = imp.match(/from\s+['"]([^'"]+)['"]/);
      return match ? match[1] : '';
    }).join(' ');
    
    // 检查类型定义
    const hasInterface = /interface\s+\w+/g.test(content);
    const hasType = /type\s+\w+\s*=/g.test(content);
    const hasEnum = /enum\s+\w+/g.test(content);
    const hasClass = /class\s+\w+/g.test(content);
    
    // 检查关键词频率
    const keywords = {
      light: (contentLower.match(/light/g) || []).length,
      geometry: (contentLower.match(/geometry|mesh|vertex|point|vector/g) || []).length,
      brep: (contentLower.match(/brep|topology|euler|face|edge/g) || []).length,
      parametric: (contentLower.match(/parametric|assembly|model/g) || []).length,
      render: (contentLower.match(/render|material|texture|shader/g) || []).length,
      util: (contentLower.match(/util|helper|polyfill/g) || []).length
    };
    
    return {
      imports: importPaths,
      hasInterface,
      hasType,
      hasEnum,
      hasClass,
      keywords,
      content
    };
  } catch (error) {
    return null;
  }
}

// 根据规则判断文件类别
function categorizeFile(fileName, filePath) {
  const analysis = analyzeFileContent(filePath);
  const scores = {};
  
  // 初始化分数
  for (const category in categoryRules) {
    scores[category] = 0;
  }
  
  // 根据文件名评分
  for (const [category, patterns] of Object.entries(categoryRules)) {
    for (const pattern of patterns) {
      if (pattern.test(fileName)) {
        scores[category] += 10;
      }
    }
  }
  
  // 根据内容评分
  if (analysis) {
    if (analysis.keywords.light > 5) scores.lighting += 8;
    if (analysis.keywords.geometry > 5) scores.geometry += 8;
    if (analysis.keywords.brep > 5) scores.kernel += 8;
    if (analysis.keywords.parametric > 5) scores.parametric += 8;
    if (analysis.keywords.render > 5) scores.rendering += 8;
    if (analysis.keywords.util > 5) scores.utils += 8;
    
    // 类型定义文件偏向types目录
    if (fileName.endsWith('.d.ts') && !analysis.hasClass) {
      scores.types += 5;
    }
    
    // 导入路径分析
    if (analysis.imports.includes('../lighting')) scores.lighting += 3;
    if (analysis.imports.includes('../geometry')) scores.geometry += 3;
    if (analysis.imports.includes('../kernel')) scores.kernel += 3;
    if (analysis.imports.includes('../parametric')) scores.parametric += 3;
    if (analysis.imports.includes('../utils')) scores.utils += 3;
  }
  
  // 找出最高分
  let bestCategory = 'utils'; // 默认归入utils
  let maxScore = 0;
  
  for (const [category, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score;
      bestCategory = category;
    }
  }
  
  // 如果分数太低,归入utils
  if (maxScore < 5) {
    bestCategory = 'utils';
  }
  
  return { category: bestCategory, score: maxScore, scores };
}

// 主函数
function main() {
  const modulesDir = path.join(__dirname, '../source/core/modules');
  const outputFile = path.join(__dirname, '../source/core/modules-categorization.json');
  
  const files = fs.readdirSync(modulesDir).filter(f => 
    f.endsWith('.ts') || f.endsWith('.d.ts')
  );
  
  console.log(`分析 ${files.length} 个文件...`);
  
  const categorization = {};
  const stats = {};
  
  files.forEach((file, index) => {
    const filePath = path.join(modulesDir, file);
    const result = categorizeFile(file, filePath);
    
    categorization[file] = result;
    
    if (!stats[result.category]) {
      stats[result.category] = 0;
    }
    stats[result.category]++;
    
    if ((index + 1) % 100 === 0) {
      console.log(`  进度: ${index + 1}/${files.length}`);
    }
  });
  
  // 保存结果
  fs.writeFileSync(outputFile, JSON.stringify({
    categorization,
    stats,
    timestamp: new Date().toISOString()
  }, null, 2));
  
  console.log('\n分类统计:');
  for (const [category, count] of Object.entries(stats).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${category}: ${count} 个文件`);
  }
  
  console.log(`\n结果已保存到: ${outputFile}`);
}

main();