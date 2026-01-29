/**
 * 字符串工具模块
 * 提供GUID、拼音、编码转换等字符串处理功能
 */

/**
 * GUID匹配正则表达式
 * 匹配标准的UUID格式：xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
 */
declare const GUID_REGEX: RegExp;

/**
 * 字符串工具类
 * 提供常用的字符串处理方法
 */
export declare const String: {
  /**
   * 从字符串中提取GUID
   * @param input - 待匹配的字符串
   * @returns 匹配到的GUID字符串，未匹配到则返回undefined
   * @example
   * matchGUID("id: 550e8400-e29b-41d4-a716-446655440000") 
   * // => "550e8400-e29b-41d4-a716-446655440000"
   */
  matchGUID(input: string | null | undefined): string | undefined;

  /**
   * 生成随机GUID（版本4 UUID）
   * @returns 符合RFC 4122标准的UUID字符串
   * @example
   * randomGUID() // => "a3bb189e-8bf9-3888-9912-ace4e6543002"
   */
  randomGUID(): string;

  /**
   * 获取ISO 8601格式的日期时间字符串
   * @param date - 日期对象，默认为当前时间
   * @returns ISO格式的日期时间字符串
   * @example
   * getDateTimeString(new Date('2024-01-01')) // => "2024-01-01T00:00:00.000Z"
   */
  getDateTimeString(date?: Date): string;

  /**
   * 获取中文字符串的拼音首字母缩写
   * @param text - 待转换的字符串（支持中文和其他字符）
   * @returns 拼音首字母大写字符串
   * @throws {Error} 当浏览器不支持localeCompare时抛出错误
   * @example
   * getShortPinyin("中国") // => "ZG"
   * getShortPinyin("Hello世界") // => "HelloSJ"
   */
  getShortPinyin(text: string): string;

  /**
   * 字符串格式化（类似C#的String.Format）
   * @param template - 模板字符串，使用{0}, {1}, {2}等占位符
   * @param args - 替换参数，可以是数组或多个参数
   * @returns 格式化后的字符串
   * @example
   * format("Hello {0}, you are {1} years old", "Alice", 25)
   * // => "Hello Alice, you are 25 years old"
   * format("Name: {0}", ["Bob"]) // => "Name: Bob"
   */
  format(template: string, ...args: unknown[]): string;
  format(template: string, args: unknown[]): string;

  /**
   * 将字符串转换为ASCII实体编码（十六进制格式）
   * @param text - 待编码的字符串
   * @returns ASCII实体编码字符串
   * @example
   * toAscii("AB") // => "&#x0041;&#x0042;"
   */
  toAscii(text: string): string;

  /**
   * 将字符串转换为Unicode编码
   * @param text - 待编码的字符串
   * @param useBackslashFormat - 是否使用\u格式，false则使用&#格式
   * @returns Unicode编码字符串
   * @example
   * toUnicode("中", true) // => "\\u4e2d"
   * toUnicode("中", false) // => "&#20013;"
   */
  toUnicode(text: string, useBackslashFormat?: boolean): string;

  /**
   * 将Unicode编码字符串转换回普通字符串
   * 支持三种格式：\uXXXX, &#xXXXX;, &#NNNN;
   * @param encoded - Unicode编码的字符串
   * @returns 解码后的普通字符串
   * @example
   * unicodeToStr("\\u4e2d\\u56fd") // => "中国"
   * unicodeToStr("&#x4e2d;&#x56fd;") // => "中国"
   * unicodeToStr("&#20013;&#22269;") // => "中国"
   */
  unicodeToStr(encoded: string): string;

  /**
   * 计算字符串的哈希码（Java风格的hashCode算法）
   * @param text - 待计算的字符串
   * @returns 32位整数哈希值
   * @example
   * getHashCode("hello") // => 99162322
   * getHashCode("") // => 0
   */
  getHashCode(text: string): number;
};

export default String;