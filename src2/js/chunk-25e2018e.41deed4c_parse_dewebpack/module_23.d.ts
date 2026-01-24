/**
 * 文本检查器类，用于处理和规范化文本中的特殊字符
 * 主要功能：将全角符号、特殊Unicode字符转换为标准ASCII符号
 */
export declare class Checker {
  /**
   * 存储字符映射关系的Map
   * key: 需要被替换的字符（全角/特殊符号）
   * value: 替换后的字符（半角/标准符号）
   */
  private keyMap: Map<string, string>;

  /**
   * 构造函数
   * 初始化Checker实例并设置字符映射表
   */
  constructor();

  /**
   * 初始化字符映射表
   * 建立全角符号到半角符号的映射关系，包括：
   * - 数学运算符（＋－×÷＝％）
   * - 标点符号（，。；！？）
   * - 括号类（（）【】《》）
   * - 引号类（''""）
   * - 比较符号（＜＞）
   * @private
   */
  private initKey(): void;

  /**
   * 净化文本内容
   * 遍历keyMap中的所有映射规则，将输入文本中的特殊字符替换为标准字符
   * 
   * @param text - 需要处理的原始文本
   * @returns 处理后的文本，所有特殊字符已被替换为标准字符
   * 
   * @example
   *