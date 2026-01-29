#!/usr/bin/env python3
"""精确修复JSDoc注释未闭合错误"""
import sys
import re

def fix_jsdoc_comment(filepath):
    """修复单个文件的JSDoc注释"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            lines = f.readlines()
        
        modified = False
        i = 0
        while i < len(lines):
            line = lines[i]
            
            # 只匹配孤立的 * 行
            if re.match(r'^\s*\*\s*$', line):
                # 检查是否在注释块中
                in_comment = False
                for j in range(i-1, max(0, i-10), -1):
                    if '/**' in lines[j] or '/*' in lines[j]:
                        in_comment = True
                        break
                    if '*/' in lines[j]:
                        break
                
                if in_comment:
                    # 检查下一行
                    if i + 1 < len(lines):
                        next_line = lines[i+1].strip()
                        # 如果下一行不是注释行，这应该是注释块最后一行
                        if not next_line.startswith('*') or next_line.startswith('*/'):
                            indent = len(line) - len(line.lstrip())
                            lines[i] = ' ' * indent + '*/\n'
                            modified = True
            i += 1
        
        if modified:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.writelines(lines)
            return True
        return False
    
    except Exception as e:
        print(f'Error: {filepath}: {e}', file=sys.stderr)
        return False

if __name__ == '__main__':
    if len(sys.argv) > 1:
        success = fix_jsdoc_comment(sys.argv[1])
        sys.exit(0 if success else 1)