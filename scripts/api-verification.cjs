#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 配置
const CONFIG = {
  sourceDewebpackDir: 'source/core-hs.fe5726b7.bundle_dewebpack',
  sourceDir: 'source',
  srcDewebpackDir: 'src/core-hs.fe5726b7.bundle_dewebpack',
  batchSize: 250,
  reportFile: 'api-verification-report.json'
};

// 结果统计
const results = {
  total: 0,
  verified: 0,
  identical: 0,
  different: 0,
  missingInSource: 0,
  missingInSrc: 0,
  errors: 0,
  batches: [],
  differences: [],
  timestamp: new Date().toISOString()
};

// 提取API定义（函数、类、接口、类型等）
function extractAPIs(content, filePath) {
  const apis = {
    interfaces: [],
    classes: [],
    functions: [],
    types: [],
    enums: [],
    exports: []
  };

  try {
    // 提取接口
    const interfaceRegex = /export\s+interface\s+(\w+)/g;
    let match;
    while ((match = interfaceRegex.exec(content)) !== null) {
      apis.interfaces.push(match[1]);
    }

    // 提取类
    const classRegex = /export\s+(?:abstract\s+)?class\s+(\w+)/g;
    while ((match = classRegex.exec(content)) !== null) {
      apis.classes.push(match[1]);
    }

    // 提取函数
    const functionRegex = /export\s+(?:async\s+)?function\s+(\w+)/g;
    while ((match = functionRegex.exec(content)) !== null) {
      apis.functions.push(match[1]);
    }

    // 提取类型别名
    const typeRegex = /export\s+type\s+(\w+)/g;
    while ((match = typeRegex.exec(content)) !== null) {
      apis.types.push(match[1]);
    }

    // 提取枚举
    const enumRegex = /export\s+enum\s+(\w+)/g;
    while ((match = enumRegex.exec(content)) !== null) {
      apis.enums.push(match[1]);
    }

    // 提取export { ... }
    const exportRegex = /export\s+\{([^}]+)\}/g;
    while ((match = exportRegex.exec(content)) !== null) {
      const exports = match[1].split(',').map(e => e.trim().split(/\s+as\s+/)[0]);
      apis.exports.push(...exports);
    }

    // 提取export * from
    const exportAllRegex = /export\s+\*\s+from/g;
    if (exportAllRegex.test(content)) {
      apis.exports.push('__EXPORT_ALL__');
    }

  } catch (error) {
    console.error(`Error extracting APIs from ${filePath}:`, error.message);
  }

  return apis;
}

// 比较两个API对象
function compareAPIs(api1, api2) {
  const diffs = [];

  for (const key of Object.keys(api1)) {
    const set1 = new Set(api1[key]);
    const set2 = new Set(api2[key]);

    const onlyIn1 = [...set1].filter(x => !set2.has(x));
    const onlyIn2 = [...set2].filter(x => !set1.has(x));

    if (onlyIn1.length > 0) {
      diffs.push({ type: key, onlyInSource: onlyIn1 });
    }
    if (onlyIn2.length > 0) {
      diffs.push({ type: key, onlyInTarget: onlyIn2 });
    }
  }

  return diffs;
}

// 验证单个文件
function verifyFile(dewebpackFile) {
  const relativePath = path.relative(CONFIG.sourceDewebpackDir, dewebpackFile);
  const sourceFile = path.join(CONFIG.sourceDir, relativePath);
  const srcFile = path.join(CONFIG.srcDewebpackDir, relativePath);

  const result = {
    file: relativePath,
    status: 'unknown',
    details: null
  };

  try {
    // 检查文件是否存在
    const dewebpackExists = fs.existsSync(dewebpackFile);
    const sourceExists = fs.existsSync(sourceFile);
    const srcExists = fs.existsSync(srcFile);

    if (!dewebpackExists) {
      result.status = 'error';
      result.details = 'Dewebpack file not found';
      results.errors++;
      return result;
    }

    // 读取文件内容
    const dewebpackContent = fs.readFileSync(dewebpackFile, 'utf8');
    
    if (!sourceExists) {
      result.status = 'missing_in_source';
      result.details = 'File not found in source/';
      results.missingInSource++;
      return result;
    }

    const sourceContent = fs.readFileSync(sourceFile, 'utf8');

    // 提取API定义
    const dewebpackAPIs = extractAPIs(dewebpackContent, dewebpackFile);
    const sourceAPIs = extractAPIs(sourceContent, sourceFile);

    // 比较API
    const diffs = compareAPIs(dewebpackAPIs, sourceAPIs);

    if (diffs.length === 0) {
      result.status = 'identical';
      result.details = 'APIs are identical';
      results.identical++;
    } else {
      result.status = 'different';
      result.details = { diffs, dewebpackAPIs, sourceAPIs };
      results.different++;

      // 检查src/目录作为参考
      let referenceSource = 'dewebpack';
      if (srcExists) {
        const srcContent = fs.readFileSync(srcFile, 'utf8');
        const srcAPIs = extractAPIs(srcContent, srcFile);
        const srcDiffs = compareAPIs(dewebpackAPIs, srcAPIs);
        
        if (srcDiffs.length === 0) {
          referenceSource = 'dewebpack';
        } else {
          const sourceSrcDiffs = compareAPIs(sourceAPIs, srcAPIs);
          referenceSource = sourceSrcDiffs.length < srcDiffs.length ? 'source' : 'dewebpack';
        }
      }

      result.referenceSource = referenceSource;
      results.differences.push(result);
    }

    results.verified++;
    return result;

  } catch (error) {
    result.status = 'error';
    result.details = error.message;
    results.errors++;
    return result;
  }
}

// 批量验证
function verifyBatch(files, batchNum) {
  console.log(`\n处理批次 ${batchNum}，共 ${files.length} 个文件...`);
  
  const batchResults = {
    batchNum,
    fileCount: files.length,
    results: []
  };

  let progress = 0;
  for (const file of files) {
    const result = verifyFile(file);
    batchResults.results.push(result);
    
    progress++;
    if (progress % 50 === 0) {
      console.log(`  进度: ${progress}/${files.length} (${Math.round(progress/files.length*100)}%)`);
    }
  }

  results.batches.push(batchResults);
  return batchResults;
}

// 主函数
function main() {
  console.log('=== API 验证工具 ===');
  console.log(`开始时间: ${results.timestamp}`);
  console.log(`配置:`);
  console.log(`  - 源目录: ${CONFIG.sourceDewebpackDir}`);
  console.log(`  - 目标目录: ${CONFIG.sourceDir}`);
  console.log(`  - 参考目录: ${CONFIG.srcDewebpackDir}`);
  console.log(`  - 批次大小: ${CONFIG.batchSize}`);

  // 获取所有文件
  console.log('\n读取文件列表...');
  const fileListPath = '/tmp/source_dewebpack_files.txt';
  
  if (!fs.existsSync(fileListPath)) {
    console.error('错误: 文件列表不存在，请先运行文件扫描命令');
    process.exit(1);
  }

  const allFiles = fs.readFileSync(fileListPath, 'utf8')
    .split('\n')
    .filter(line => line.trim())
    .map(line => line.trim());

  results.total = allFiles.length;
  console.log(`共找到 ${results.total} 个文件`);

  // 分批处理
  const batches = [];
  for (let i = 0; i < allFiles.length; i += CONFIG.batchSize) {
    batches.push(allFiles.slice(i, i + CONFIG.batchSize));
  }

  console.log(`分为 ${batches.length} 个批次处理`);

  // 逐批验证
  for (let i = 0; i < batches.length; i++) {
    const batchResult = verifyBatch(batches[i], i + 1);
    
    // 显示批次摘要
    console.log(`\n批次 ${i + 1} 完成:`);
    console.log(`  - 验证: ${batchResult.fileCount} 个文件`);
    console.log(`  - 相同: ${batchResult.results.filter(r => r.status === 'identical').length}`);
    console.log(`  - 不同: ${batchResult.results.filter(r => r.status === 'different').length}`);
    console.log(`  - 缺失: ${batchResult.results.filter(r => r.status === 'missing_in_source').length}`);
    console.log(`  - 错误: ${batchResult.results.filter(r => r.status === 'error').length}`);
  }

  // 生成报告
  console.log('\n生成验证报告...');
  fs.writeFileSync(CONFIG.reportFile, JSON.stringify(results, null, 2));

  // 显示总结
  console.log('\n=== 验证完成 ===');
  console.log(`总文件数: ${results.total}`);
  console.log(`已验证: ${results.verified}`);
  console.log(`完全相同: ${results.identical} (${(results.identical/results.total*100).toFixed(2)}%)`);
  console.log(`存在差异: ${results.different} (${(results.different/results.total*100).toFixed(2)}%)`);
  console.log(`source/中缺失: ${results.missingInSource} (${(results.missingInSource/results.total*100).toFixed(2)}%)`);
  console.log(`验证错误: ${results.errors}`);
  console.log(`覆盖率: ${(results.verified/results.total*100).toFixed(2)}%`);
  console.log(`\n报告已保存到: ${CONFIG.reportFile}`);

  // 如果有差异，生成差异详情文件
  if (results.differences.length > 0) {
    const diffFile = 'api-verification-differences.json';
    fs.writeFileSync(diffFile, JSON.stringify(results.differences, null, 2));
    console.log(`差异详情已保存到: ${diffFile}`);
  }
}

// 运行
main();