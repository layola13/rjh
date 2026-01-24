/**
 * 错误消息枚举
 * 定义了所有可能的脚本验证和计算错误代码
 */
export enum ErrorMessage {
  /** 型材脚本表达式是必需的 */
  profile_script_expression_is_required = 0,
  /** 型材脚本类型是必需的 */
  profile_script_script_type_is_required = 1,
  /** 无效的脚本类型 */
  profile_script_invalid_script_type = 2,
  /** 型材脚本用途是必需的 */
  profile_script_script_purpose_is_required = 3,
  /** 无效的脚本用途 */
  profile_script_invalid_script_purpose = 4,
  /** 型材类型是必需的 */
  profile_script_profile_type_is_required = 5,
  /** 数量是必需的 */
  profile_script_count_is_required = 6,
  /** 玻璃脚本宽度脚本是必需的 */
  glass_script_width_script_is_required = 7,
  /** 发现重复的宽度脚本 */
  glass_script_duplicate_width_scripts_found = 8,
  /** 玻璃脚本高度脚本是必需的 */
  glass_script_height_script_is_required = 9,
  /** 发现重复的高度脚本 */
  glass_script_duplicate_height_scripts_found = 10,
  /** 玻璃脚本类型是必需的 */
  glass_script_type_is_required = 11,
  /** 玻璃脚本表达式是必需的 */
  glass_script_expression_is_required = 12,
  /** 玻璃脚本数量是必需的 */
  glass_script_count_is_required = 13,
  /** 型材脚本宽度脚本是必需的 */
  profile_script_width_script_is_required = 14,
  /** 型材脚本高度脚本是必需的 */
  profile_script_height_script_is_required = 15,
  /** 型材脚本存在但尺寸脚本为空 */
  profile_scripts_exists_but_size_scripts_is_empty = 16,
  /** 脚本中存在未定义的变量 */
  undefined_variables_in_scripts = 17,
  /** 自定义变量中存在未定义的变量 */
  undefined_variables_in_custom_variables = 18,
  /** 未定义的变量 */
  undefined_variables = 19,
  /** 意外的表达式 */
  unexpected_expression = 20,
  /** 脚本中存在意外的表达式 */
  unexpected_expression_in_scripts = 21,
  /** 自定义变量中存在意外的表达式 */
  unexpected_expression_in_custom_variables = 22,
  /** 报价中存在未定义的变量 */
  undefined_variables_in_offer_price = 23,
  /** 报价中存在意外的表达式 */
  unexpected_expression_in_offer_price = 24,
  /** 无效的条件 */
  invalid_condition = 25
}

/**
 * 脚本类型
 */
export type ScriptType = 'frame' | 'sash' | 'doubleSash' | 'fold' | 'slide';

/**
 * 玻璃类型
 */
export type GlassType = 'fixedGlass' | 'fixedNet' | 'fixedPanel' | 'sashGlass' | 'screenNet' | 'sashPanel' | 'decorationBar';

/**
 * 错误参数接口
 */
export interface ErrorParams {
  /** 脚本类型 */
  scriptType?: ScriptType | string;
  /** 玻璃类型 */
  glassType?: GlassType | string;
  /** 是否为内部扇 */
  inner?: boolean | string;
  /** 其他扩展参数 */
  [key: string]: unknown;
}

/**
 * 错误解包结果接口
 */
export interface UnpackedError {
  /** 错误消息 */
  message?: string;
  /** 错误代码 */
  code?: ErrorMessage;
  /** 错误参数 */
  params?: ErrorParams;
  /** 是否中止执行 */
  abort?: boolean;
}

/**
 * 错误标签类
 * 用于创建和解析结构化的错误对象
 */
export declare class ErrorTag {
  /**
   * 创建一个带有错误代码和参数的Error对象
   * @param code - 错误消息代码
   * @param params - 错误参数对象
   * @returns 包含序列化错误信息的Error对象
   */
  static make(code: ErrorMessage, params?: ErrorParams): Error;

  /**
   * 创建一个包含多条消息的Error对象
   * @param messages - 错误消息数组
   * @param abort - 是否中止执行
   * @returns 包含序列化消息的Error对象
   */
  static messages(messages: string[], abort: boolean): Error;

  /**
   * 解析Error对象中的结构化错误信息
   * @param error - Error对象或错误消息字符串
   * @returns 解包后的错误信息对象，解析失败时返回undefined
   */
  static unpack(error: Error | string): UnpackedError | undefined;
}