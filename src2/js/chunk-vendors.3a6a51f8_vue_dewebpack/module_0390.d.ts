/**
 * 计算字符串中下一个字符位置的偏移量
 * 
 * 此函数根据给定的起始位置和是否使用 Unicode 感知模式，
 * 返回下一个字符在字符串中的索引位置。
 * 
 * @module StringPositionAdvancer
 */

/**
 * 从字符串迭代器或字符获取工具中获取字符信息的函数类型
 * 当传入 true 参数时，返回支持 Unicode 完整字符（代理对）的迭代器
 * 
 * @param useUnicodeMode - 是否启用 Unicode 感知模式（支持代理对）
 * @returns 字符信息获取函数，可以返回字符的实际长度
 */
type StringIteratorFactory = (useUnicodeMode: boolean) => StringCharGetter;

/**
 * 获取指定位置字符信息的函数
 * 
 * @param str - 源字符串
 * @param position - 字符位置索引
 * @returns 包含字符长度信息的对象
 */
type StringCharGetter = (str: string, position: number) => CharInfo;

/**
 * 字符信息接口
 */
interface CharInfo {
  /** 字符的实际长度（对于 BMP 字符为 1，对于代理对为 2） */
  length: number;
}

/**
 * 计算字符串中从给定位置前进到下一个字符后的新位置
 * 
 * 在 Unicode 模式下（useUnicodeMode = true），函数会正确处理 UTF-16 代理对，
 * 确保将完整的 Unicode 字符（如 emoji）作为一个单位处理。
 * 在非 Unicode 模式下，仅简单地将位置加 1。
 * 
 * @param str - 需要处理的字符串
 * @param startPosition - 当前字符的起始位置（基于 UTF-16 代码单元）
 * @param useUnicodeMode - 是否启用 Unicode 完整字符模式
 *   - true: 将代理对视为单个字符，返回位置会跳过完整的代理对
 *   - false: 按 UTF-16 代码单元计数，每次仅前进 1 个位置
 * 
 * @returns 下一个字符的起始位置索引
 * 
 * @example
 *