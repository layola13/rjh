/**
 * 执行正则表达式匹配操作的辅助函数
 * 
 * 该函数确保以类型安全的方式执行正则表达式的 exec 方法，
 * 并验证返回值和接收者的类型正确性。
 * 
 * @param regexp - 要执行匹配的正则表达式对象
 * @param str - 要匹配的目标字符串
 * @returns 匹配结果数组，如果没有匹配则返回 null
 * @throws {TypeError} 当 exec 方法返回非对象/null 值时
 * @throws {TypeError} 当在非 RegExp 对象上调用时
 */
export declare function regexpExec(
  regexp: RegExp,
  str: string
): RegExpExecArray | null;

/**
 * 正则表达式匹配结果数组类型
 * 扩展自标准数组，包含匹配的额外信息
 */
export interface RegExpExecArray extends Array<string> {
  /** 匹配项在原始字符串中的索引位置 */
  index: number;
  /** 原始输入字符串 */
  input: string;
  /** 命名捕获组（如果存在） */
  groups?: Record<string, string>;
}

/**
 * 类型检查辅助函数（从模块 23c6 导入）
 * 用于获取对象的内部 [[Class]] 属性
 * 
 * @param value - 要检查类型的值
 * @returns 表示对象类型的字符串（如 "RegExp", "Object" 等）
 */
declare function classof(value: unknown): string;