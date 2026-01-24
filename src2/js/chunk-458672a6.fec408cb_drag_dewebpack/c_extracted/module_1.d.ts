/**
 * 正则表达式匹配结果接口
 */
interface RegExpMatchResult extends Array<string> {
  /** 匹配项在原字符串中的索引位置 */
  index: number;
  /** 原始输入字符串 */
  input: string;
  /** 命名捕获组对象 */
  groups?: Record<string, string>;
}

/**
 * 替换函数的回调类型
 */
type ReplacerFunction = (
  /** 完整匹配的子字符串 */
  match: string,
  /** 捕获组内容（可变数量参数） */
  ...args: Array<string | number | Record<string, string> | undefined>
) => string;

/**
 * 字符串替换配置选项
 */
interface ReplaceOptions {
  /** 是否全局匹配 */
  global?: boolean;
  /** 是否支持Unicode模式 */
  unicode?: boolean;
  /** 正则表达式的lastIndex位置 */
  lastIndex?: number;
}

/**
 * 执行字符串替换操作
 * 
 * @param pattern - 要匹配的正则表达式对象
 * @param replacer - 替换字符串或替换函数
 * @returns 替换后的新字符串
 * 
 * @example
 *