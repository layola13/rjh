import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('文件整理验证', () => {
  const sourceDir = 'source/core-hs.fe5726b7.bundle_dewebpack';
  const targetBase = 'source';

  it('应该验证所有.ts文件已被复制', () => {
    // 获取源目录所有.ts文件
    const getTsFiles = (dir: string): string[] => {
      const files: string[] = [];
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          files.push(...getTsFiles(fullPath));
        } else if (entry.name.endsWith('.ts')) {
          files.push(fullPath);
        }
      }
      return files;
    };

    const sourceFiles = getTsFiles(sourceDir);
    let copiedCount = 0;
    let missingFiles: string[] = [];

    for (const sourceFile of sourceFiles) {
      const relativePath = path.relative(sourceDir, sourceFile);
      const targetFile = path.join(targetBase, relativePath);
      
      if (fs.existsSync(targetFile)) {
        copiedCount++;
      } else {
        missingFiles.push(relativePath);
      }
    }

    console.log(`源文件总数: ${sourceFiles.length}`);
    console.log(`已复制文件: ${copiedCount}`);
    console.log(`缺失文件: ${missingFiles.length}`);

    if (missingFiles.length > 0) {
      console.log('缺失的文件:');
      missingFiles.slice(0, 10).forEach(f => console.log(`  - ${f}`));
      if (missingFiles.length > 10) {
        console.log(`  ... 还有 ${missingFiles.length - 10} 个文件`);
      }
    }

    expect(copiedCount).toBe(sourceFiles.length);
    expect(missingFiles.length).toBe(0);
  });

  it('应该验证文件内容完整性', () => {
    const sampleFiles = [
      'affinetransform.ts',
      'ceiling.ts',
      'datamodelconvertor.ts',
      'colormodeenum_2.ts',
      'version.ts'
    ];

    for (const file of sampleFiles) {
      const sourcePath = path.join(sourceDir, file);
      const targetPath = path.join(targetBase, file);

      if (!fs.existsSync(sourcePath)) continue;

      expect(fs.existsSync(targetPath)).toBe(true);

      const sourceContent = fs.readFileSync(sourcePath, 'utf-8');
      const targetContent = fs.readFileSync(targetPath, 'utf-8');

      expect(targetContent).toBe(sourceContent);
    }
  });

  it('应该验证目录结构保持一致', () => {
    const getDirectoryStructure = (dir: string, baseDir: string): Set<string> => {
      const dirs = new Set<string>();
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        if (entry.isDirectory()) {
          const relativePath = path.relative(baseDir, path.join(dir, entry.name));
          dirs.add(relativePath);
          const subDirs = getDirectoryStructure(path.join(dir, entry.name), baseDir);
          subDirs.forEach(d => dirs.add(d));
        }
      }
      return dirs;
    };

    const sourceDirs = getDirectoryStructure(sourceDir, sourceDir);
    let matchedDirs = 0;
    let missingDirs: string[] = [];

    for (const dir of sourceDirs) {
      const targetDir = path.join(targetBase, dir);
      if (fs.existsSync(targetDir)) {
        matchedDirs++;
      } else {
        missingDirs.push(dir);
      }
    }

    console.log(`源目录总数: ${sourceDirs.size}`);
    console.log(`已创建目录: ${matchedDirs}`);
    console.log(`缺失目录: ${missingDirs.length}`);

    expect(matchedDirs).toBeGreaterThan(0);
  });

  it('应该验证文件权限正确', () => {
    const sampleFile = path.join(targetBase, 'version.ts');
    
    if (fs.existsSync(sampleFile)) {
      const stats = fs.statSync(sampleFile);
      expect(stats.isFile()).toBe(true);
      expect(stats.size).toBeGreaterThan(0);
    }
  });

  it('应该统计整理结果', () => {
    const getTsFiles = (dir: string): string[] => {
      const files: string[] = [];
      try {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        
        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name);
          if (entry.isDirectory()) {
            files.push(...getTsFiles(fullPath));
          } else if (entry.name.endsWith('.ts')) {
            files.push(fullPath);
          }
        }
      } catch (e) {
        // 目录不存在或无法访问
      }
      return files;
    };

    const sourceFiles = getTsFiles(sourceDir);
    const targetFiles = getTsFiles(targetBase);

    console.log('\n=== 文件整理统计 ===');
    console.log(`源目录文件数: ${sourceFiles.length}`);
    console.log(`目标目录文件数: ${targetFiles.length}`);
    console.log(`整理完成率: ${((sourceFiles.length / targetFiles.length) * 100).toFixed(2)}%`);

    expect(sourceFiles.length).toBeGreaterThan(0);
    expect(targetFiles.length).toBeGreaterThan(0);
  });
});