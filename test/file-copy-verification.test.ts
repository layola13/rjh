import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('文件复制验证 - 顶层文件', () => {
  const sourceDir = 'source/core-hs.fe5726b7.bundle_dewebpack';
  const targetBase = 'source';

  it('应该验证所有顶层文件已被复制', () => {
    // 获取源目录顶层所有文件（不递归）
    const getTopLevelFiles = (dir: string): string[] => {
      const files: string[] = [];
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        if (entry.isFile()) {
          files.push(entry.name);
        }
      }
      return files;
    };

    const sourceFiles = getTopLevelFiles(sourceDir);
    let copiedCount = 0;
    let missingFiles: string[] = [];
    let contentMismatchFiles: string[] = [];

    for (const fileName of sourceFiles) {
      const sourcePath = path.join(sourceDir, fileName);
      const targetPath = path.join(targetBase, fileName);
      
      if (fs.existsSync(targetPath)) {
        copiedCount++;
        // 验证内容一致性
        const sourceContent = fs.readFileSync(sourcePath, 'utf-8');
        const targetContent = fs.readFileSync(targetPath, 'utf-8');
        if (sourceContent !== targetContent) {
          contentMismatchFiles.push(fileName);
        }
      } else {
        missingFiles.push(fileName);
      }
    }

    console.log('\n=== 顶层文件复制验证报告 ===');
    console.log(`源文件总数: ${sourceFiles.length}`);
    console.log(`已复制文件: ${copiedCount}`);
    console.log(`缺失文件: ${missingFiles.length}`);
    console.log(`内容不一致文件: ${contentMismatchFiles.length}`);

    if (missingFiles.length > 0) {
      console.log('\n缺失的文件:');
      missingFiles.slice(0, 10).forEach(f => console.log(`  - ${f}`));
      if (missingFiles.length > 10) {
        console.log(`  ... 还有 ${missingFiles.length - 10} 个文件`);
      }
    }

    if (contentMismatchFiles.length > 0) {
      console.log('\n内容不一致的文件:');
      contentMismatchFiles.forEach(f => console.log(`  - ${f}`));
    }

    expect(contentMismatchFiles.length).toBe(0);
    expect(missingFiles.length).toBeLessThanOrEqual(1); // 允许_failed_files.json缺失
  });

  it('应该验证关键文件内容完整性', () => {
    const sampleFiles = [
      'module_at.d.ts',
      'module_eq.d.ts',
      'module_ho.d.ts',
      'module_it.d.ts',
      'module_we.d.ts'
    ];

    let validatedCount = 0;
    for (const file of sampleFiles) {
      const sourcePath = path.join(sourceDir, file);
      const targetPath = path.join(targetBase, file);

      if (!fs.existsSync(sourcePath)) continue;

      expect(fs.existsSync(targetPath)).toBe(true);

      const sourceContent = fs.readFileSync(sourcePath, 'utf-8');
      const targetContent = fs.readFileSync(targetPath, 'utf-8');

      expect(targetContent).toBe(sourceContent);
      validatedCount++;
    }

    console.log(`\n验证了 ${validatedCount} 个关键文件的内容一致性`);
    expect(validatedCount).toBeGreaterThan(0);
  });

  it('应该统计文件类型分布', () => {
    const getFilesByExtension = (dir: string): Map<string, number> => {
      const stats = new Map<string, number>();
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        if (entry.isFile()) {
          const ext = path.extname(entry.name) || 'no-extension';
          stats.set(ext, (stats.get(ext) || 0) + 1);
        }
      }
      return stats;
    };

    const sourceStats = getFilesByExtension(sourceDir);
    const targetStats = getFilesByExtension(targetBase);

    console.log('\n=== 文件类型分布统计 ===');
    console.log('源目录:');
    sourceStats.forEach((count, ext) => {
      console.log(`  ${ext}: ${count} 个文件`);
    });

    console.log('\n目标目录顶层:');
    const relevantExts = ['.ts', '.d.ts', '.js', '.json'];
    relevantExts.forEach(ext => {
      const count = targetStats.get(ext) || 0;
      console.log(`  ${ext}: ${count} 个文件`);
    });

    expect(sourceStats.size).toBeGreaterThan(0);
  });

  it('应该验证文件时间戳', () => {
    const getTopLevelFiles = (dir: string): string[] => {
      const files: string[] = [];
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        if (entry.isFile() && entry.name.endsWith('.ts')) {
          files.push(entry.name);
        }
      }
      return files.slice(0, 5); // 只检查前5个文件
    };

    const sampleFiles = getTopLevelFiles(targetBase);
    const timestamps: Date[] = [];

    for (const file of sampleFiles) {
      const filePath = path.join(targetBase, file);
      if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        timestamps.push(stats.mtime);
      }
    }

    console.log('\n=== 文件时间戳验证 ===');
    if (timestamps.length > 0) {
      const avgTime = new Date(timestamps.reduce((sum, t) => sum + t.getTime(), 0) / timestamps.length);
      console.log(`平均修改时间: ${avgTime.toISOString()}`);
      console.log(`本地时间: ${avgTime.toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}`);
    }

    expect(timestamps.length).toBeGreaterThan(0);
  });

  it('应该生成最终验证报告', () => {
    const getTopLevelFiles = (dir: string): string[] => {
      const files: string[] = [];
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        if (entry.isFile()) {
          files.push(entry.name);
        }
      }
      return files;
    };

    const sourceFiles = getTopLevelFiles(sourceDir);
    const targetFiles = getTopLevelFiles(targetBase);
    
    let copiedAndMatched = 0;
    let onlyInSource = 0;
    
    for (const file of sourceFiles) {
      if (targetFiles.includes(file)) {
        copiedAndMatched++;
      } else {
        onlyInSource++;
      }
    }

    console.log('\n========================================');
    console.log('       文件复制验证最终报告');
    console.log('========================================');
    console.log(`源目录: ${sourceDir}`);
    console.log(`目标目录: ${targetBase}`);
    console.log('----------------------------------------');
    console.log(`源目录文件总数: ${sourceFiles.length}`);
    console.log(`已成功复制: ${copiedAndMatched}`);
    console.log(`未复制文件: ${onlyInSource}`);
    console.log(`复制成功率: ${((copiedAndMatched / sourceFiles.length) * 100).toFixed(2)}%`);
    console.log('----------------------------------------');
    console.log(`验证状态: ${onlyInSource <= 1 ? '✓ 通过' : '✗ 失败'}`);
    console.log('========================================\n');

    expect(copiedAndMatched).toBeGreaterThan(0);
    expect(onlyInSource).toBeLessThanOrEqual(1);
  });
});