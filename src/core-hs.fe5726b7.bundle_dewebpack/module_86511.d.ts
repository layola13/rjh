/**
 * 获取字符串的未绑定方法
 * @param method - 字符串原型上的方法名
 * @returns 未绑定的函数
 */
type GetBuiltIn = (method: string) => any;

/**
 * 将对象转换为普通对象
 * @param value - 要转换的值
 * @returns 转换后的对象
 */
type ToObject = (value: any) => object;

/**
 * 命名捕获组的映射
 */
interface NamedCaptureGroups {
  [key: string]: string | undefined;
}

/**
 * 替换函数的替换器回调
 * @param matched - 匹配到的完整字符串
 * @param substitution - 替换符号（如 $&, $`, $', $1, $2 等）
 * @returns 替换后的字符串
 */
type ReplacerCallback = (matched: string, substitution: string) => string;

/**
 * 执行正则表达式替换操作中的特殊替换模式处理
 * 
 * 支持以下替换模式：
 * - $$ : 插入一个 "$"
 * - $& : 插入匹配的子串
 * - $` : 插入匹配子串左边的内容
 * - $' : 插入匹配子串右边的内容
 * - $n : 插入第 n 个捕获组（n 为 1-99 的数字）
 * - $<Name> : 插入命名捕获组
 * 
 * @param matchedSubstring - 匹配到的子字符串
 * @param originalString - 原始完整字符串
 * @param matchPosition - 匹配位置的起始索引
 * @param captureGroups - 捕获组数组
 * @param namedCaptureGroups - 命名捕获组对象（可选）
 * @param replacementPattern - 替换模式字符串
 * @returns 处理后的替换结果字符串
 */
declare function getSubstitution(
  matchedSubstring: string,
  originalString: string,
  matchPosition: number,
  captureGroups: Array<string | undefined>,
  namedCaptureGroups: NamedCaptureGroups | undefined,
  replacementPattern: string
): string;

export = getSubstitution;