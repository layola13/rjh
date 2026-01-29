#!/usr/bin/env python3
import os
import filecmp
from pathlib import Path

report_file = "batch2_verification_report.txt"
source_dir = "source/core-hs.fe5726b7.bundle_dewebpack/"
target_dir = "source/"

# 获取所有源文件
source_files = []
for root, dirs, files in os.walk(source_dir):
    for file in files:
        if file.endswith('.ts') or file.endswith('.d.ts'):
            source_files.append(os.path.join(root, file))

total = len(source_files)
success = 0
failed = 0
missing = 0
failed_files = []
missing_files = []

print(f"开始验证 {total} 个文件...")

for i, src_path in enumerate(source_files, 1):
    filename = os.path.basename(src_path)
    dest_path = os.path.join(target_dir, filename)
    
    if os.path.exists(dest_path):
        if filecmp.cmp(src_path, dest_path, shallow=False):
            success += 1
        else:
            failed += 1
            failed_files.append(filename)
    else:
        missing += 1
        missing_files.append(filename)
    
    if i % 100 == 0:
        print(f"已验证 {i}/{total} 个文件...")

# 写入报告
with open(report_file, 'a') as f:
    f.write("========================================\n")
    f.write("diff验证结果:\n")
    f.write(f"✓ 验证成功: {success} 个文件\n")
    f.write(f"✗ 内容不一致: {failed} 个文件\n")
    f.write(f"✗ 文件缺失: {missing} 个文件\n")
    f.write(f"总计: {total} 个文件\n\n")
    
    if failed_files:
        f.write("内容不一致的文件:\n")
        for fname in failed_files[:50]:  # 只列出前50个
            f.write(f"  - {fname}\n")
        if len(failed_files) > 50:
            f.write(f"  ... 还有 {len(failed_files)-50} 个文件\n")
        f.write("\n")
    
    if missing_files:
        f.write("缺失的文件:\n")
        for fname in missing_files[:50]:  # 只列出前50个
            f.write(f"  - {fname}\n")
        if len(missing_files) > 50:
            f.write(f"  ... 还有 {len(missing_files)-50} 个文件\n")
        f.write("\n")
    
    f.write("========================================\n")
    f.write(f"验证通过率: {success}/{total} ({100*success/total:.2f}%)\n")
    f.write("========================================\n")

print(f"\n验证完成!")
print(f"✓ 成功: {success}")
print(f"✗ 失败: {failed}")
print(f"✗ 缺失: {missing}")
print(f"通过率: {100*success/total:.2f}%")