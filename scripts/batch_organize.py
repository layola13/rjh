#!/usr/bin/env python3
import os
import shutil
from pathlib import Path

def organize_batch(batch_files, src_dir, target_base):
    """处理一批文件"""
    results = {
        'copied': [],
        'skipped': [],
        'errors': []
    }
    
    for file_path in batch_files:
        try:
            rel_path = file_path.relative_to(Path("source/core-hs.fe5726b7.bundle_dewebpack"))
            target_path = target_base / rel_path
            src_reference = src_dir / rel_path
            
            # 检查目标是否存在
            if target_path.exists():
                # 如果src目录有参考文件，跳过
                if src_reference.exists():
                    results['skipped'].append(str(rel_path))
                    continue
            
            # 创建目标目录
            target_path.parent.mkdir(parents=True, exist_ok=True)
            
            # 复制文件
            shutil.copy2(file_path, target_path)
            results['copied'].append(str(rel_path))
            
        except Exception as e:
            results['errors'].append((str(rel_path), str(e)))
    
    return results

def main():
    source_dir = Path("source/core-hs.fe5726b7.bundle_dewebpack")
    src_dir = Path("src/core-hs.fe5726b7.bundle_dewebpack")
    target_base = Path("source")
    
    # 获取所有.ts文件
    ts_files = sorted(source_dir.glob("**/*.ts"))
    total = len(ts_files)
    
    print(f"找到 {total} 个.ts文件")
    
    # 分批处理
    batch_size = 50
    for i in range(0, total, batch_size):
        batch_num = i // batch_size + 1
        batch = ts_files[i:i+batch_size]
        
        print(f"\n处理批次 {batch_num} ({len(batch)} 文件)...")
        results = organize_batch(batch, src_dir, target_base)
        
        print(f"  复制: {len(results['copied'])}")
        print(f"  跳过: {len(results['skipped'])}")
        print(f"  错误: {len(results['errors'])}")
        
        if results['errors']:
            for path, error in results['errors'][:3]:
                print(f"    错误: {path} - {error}")

if __name__ == "__main__":
    main()