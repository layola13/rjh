/**
 * 编译变量模块
 * 负责处理自定义变量的编译和解析
 */

/**
 * 变量项配置接口
 */
interface VariableItem {
  /** 条件表达式 */
  condition: string;
  /** 值表达式（可能来自formula字段） */
  value: string;
  /** 旧版formula字段（向后兼容） */
  formula?: string;
}

/**
 * 变量定义接口
 */
interface VariableDefinition {
  /** 变量名称 */
  name: string;
  /** 变量项数组（可能来自item字段） */
  items: VariableItem[] | string;
  /** 旧版item字段（向后兼容） */
  item?: VariableItem[] | string;
}

/**
 * 已编译的变量结果
 */
interface CompiledVariable {
  /** 变量名称 */
  name: string;
  /** 计算后的值 */
  value: number;
}

/**
 * 帧变量上下文
 */
interface FrameVariables {
  /** 帧ID */
  frameId: string | number;
  /** 该帧的变量列表 */
  variables: CompiledVariable[];
}

/**
 * 编译器接口
 * 定义编译器必须实现的方法
 */
interface ICompiler {
  /** 清除临时键 */
  clearTmpKey(): void;
  
  /** 添加临时键值对 */
  pushTmpKey(name: string, value: number): void;
  
  /** 解析条件表达式 */
  parseCondition(condition: string): boolean;
  
  /** 解析数值表达式 */
  parseNumber(expression: string): number;
}

/**
 * 错误标签接口
 */
interface ErrorTag {
  /** 错误码 */
  code: string;
  /** 错误参数 */
  params: {
    variable?: string;
    expression?: string;
    keywords?: string[];
  };
}

/**
 * 错误消息枚举
 */
declare enum ErrorMessage {
  /** 未定义的变量 */
  undefined_variables = "undefined_variables",
  /** 自定义变量中存在未定义的变量 */
  undefined_variables_in_custom_variables = "undefined_variables_in_custom_variables",
  /** 意外的表达式 */
  unexpected_expression = "unexpected_expression",
  /** 自定义变量中存在意外的表达式 */
  unexpected_expression_in_custom_variables = "unexpected_expression_in_custom_variables"
}

/**
 * 变量编译器类
 * 负责编译和解析自定义变量定义
 */
export declare class CompileVariable {
  /** 编译器实例 */
  private readonly compiler: ICompiler;

  /**
   * 构造函数
   * @param compiler - 编译器实例
   */
  constructor(compiler: ICompiler);

  /**
   * 编译变量定义到多个帧上下文
   * @param definitions - 变量定义数组
   * @param frames - 帧变量上下文数组
   * @returns 编译后的帧变量数组
   * @throws {ErrorTag} 当变量定义中存在未定义的变量或意外表达式时抛出
   */
  compile(
    definitions: VariableDefinition[],
    frames: FrameVariables[]
  ): FrameVariables[];

  /**
   * 预处理变量定义
   * 标准化旧版字段（item -> items, formula -> value）
   * @param definitions - 原始变量定义数组
   * @returns 标准化后的变量定义数组
   */
  private preHandle(definitions: VariableDefinition[]): VariableDefinition[];

  /**
   * 解析变量值
   * 遍历变量项，返回第一个满足条件的项的计算值
   * @param items - 变量项数组
   * @returns 计算后的数值，如果没有满足条件的项则返回undefined
   */
  private parseValue(items: VariableItem[]): number | undefined;

  /**
   * 将变量数组推入临时键空间
   * @param variables - 已编译的变量数组
   */
  private pushTmpKeys(variables: CompiledVariable[]): void;
}