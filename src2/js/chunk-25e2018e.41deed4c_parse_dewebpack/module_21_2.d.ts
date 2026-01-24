/**
 * 编译器类 - 用于解析和计算数学表达式
 * 支持变量替换、函数调用、条件判断等功能
 */
export declare class Compiler {
  /**
   * 临时信息存储，包含帧ID和变量集合
   */
  private tmpInfo: Array<{
    frameId: string | number;
    variables: Array<{ name: string; value: any }>;
  }>;

  /**
   * 全局变量映射表（持久化）
   */
  private keyMap: Map<string, any>;

  /**
   * 自定义函数映射表
   */
  private funcMap: Map<string, (...args: any[]) => any>;

  /**
   * 临时变量映射表（可清除）
   */
  private tmpKeyMap: Map<string, any>;

  /**
   * 构造函数 - 初始化编译器并注册默认常量和函数
   */
  constructor();

  /**
   * 初始化预定义常量（如PI）
   */
  private initKey(): void;

  /**
   * 初始化预定义数学函数
   * 包括：abs, acos, asin, atan, ceil, cos, floor, max, min, pow, round, sin, sqrt, tan
   * 以及自定义函数：qz(取整), sswr(四舍五入), jw(进位), hc(弧长计算)
   */
  private initFunc(): void;

  /**
   * 从全局变量表中移除指定变量
   * @param key - 变量名
   */
  removeKey(key: string): void;

  /**
   * 批量移除全局变量
   * @param keys - 变量名数组
   */
  removeKeys(keys: string[]): void;

  /**
   * 从临时变量表中移除指定变量
   * @param key - 变量名
   */
  removeTmpKey(key: string): void;

  /**
   * 批量移除临时变量
   * @param keys - 变量名数组
   */
  removeTmpKeys(keys: string[]): void;

  /**
   * 添加变量到映射表
   * @param key - 变量名
   * @param value - 变量值
   * @param isTemporary - 是否为临时变量，默认false
   * @throws 当变量名已被自定义函数占用时抛出错误
   */
  pushKey(key: string, value: any, isTemporary?: boolean): void;

  /**
   * 添加临时变量（pushKey的便捷方法）
   * @param key - 变量名
   * @param value - 变量值
   */
  pushTmpKey(key: string, value: any): void;

  /**
   * 清空所有临时变量
   */
  clearTmpKey(): void;

  /**
   * 从tmpInfo中重新加载临时变量
   * @param frameId - 帧ID，未指定时使用第一个帧
   */
  reloadTmpInfo(frameId?: string | number): void;

  /**
   * 注册自定义函数
   * @param name - 函数名
   * @param func - 函数实现
   * @throws 当函数名已被变量占用时抛出错误
   */
  pushFunc(name: string, func: (...args: any[]) => any): void;

  /**
   * 解析字符串表达式，替换变量占位符
   * @param expression - 表达式字符串
   * @param skipEvaluation - 是否跳过求值，默认false
   * @returns 解析后的字符串或计算结果
   */
  parseString(expression: string | null, skipEvaluation?: boolean): string;

  /**
   * 解析数值表达式并返回计算结果
   * @param expression - 数值表达式字符串
   * @returns 计算结果（保留4位小数）
   * @throws 当表达式无效或结果非数值时抛出错误
   */
  parseNumber(expression: string | null): number;

  /**
   * 解析数值表达式但不求值，仅进行变量替换
   * @param expression - 数值表达式字符串
   * @returns 替换变量后的表达式字符串
   */
  parseNumberExpression(expression: string | null): string;

  /**
   * 解析条件表达式并返回布尔结果
   * @param condition - 条件表达式字符串
   * @returns 条件判断结果
   * @throws 当条件表达式无效时抛出错误
   */
  parseCondition(condition: string | null): boolean;

  /**
   * 预处理表达式：净化和规范化
   * @param expression - 原始表达式
   * @returns 处理后的表达式
   */
  private preHandle(expression: string): string;

  /**
   * 确保表达式中的变量为数值类型
   * @param expression - 表达式字符串
   * @returns 包含数值化变量的对象
   * @throws 当表达式包含占位符或解析失败时抛出错误
   */
  private ensureNumber(expression: string): Record<string, any>;

  /**
   * 获取所有变量和函数的合并对象
   * @param excludeFunctions - 是否排除函数，默认false
   * @returns 包含所有变量（和函数）的对象
   */
  private keyObj(excludeFunctions?: boolean): Record<string, any>;

  /**
   * 解析错误处理：识别未定义的变量并抛出详细错误
   * @param expression - 导致错误的表达式
   * @throws 包含未定义变量列表的错误
   */
  private parseError(expression: string): never;
}