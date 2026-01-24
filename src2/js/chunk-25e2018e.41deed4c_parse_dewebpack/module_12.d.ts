/**
 * 匹配类型枚举
 * 定义报价项的计算方式
 */
export enum MatchType {
  /** 按单个目标分别计算 */
  Per = "per",
  /** 所有目标汇总计算 */
  All = "all"
}

/**
 * 匹配目标枚举
 * 定义可匹配的构件类型
 */
export enum MatchTarget {
  /** 外框 */
  Frame = "frame",
  /** 玻璃扇 */
  GlassSash = "glassSash",
  /** 对开扇 */
  DoubleSash = "doubleSash",
  /** 纱扇 */
  ScreenSash = "screenSash",
  /** 防盗框 */
  AntiTheft = "antiTheft",
  /** 扇玻璃 */
  SashGlass = "sashGlass",
  /** 固定玻璃 */
  FixedGlass = "fixedGlass",
  /** 转角 */
  CornerJoiner = "cornerJoiner",
  /** 连接件 */
  Connector = "connector",
  /** 固定位 */
  FixedCell = "fixedCell",
  /** 开启位 */
  OpenCell = "openCell",
  /** 固定百叶 */
  FixedShade = "fixedShade",
  /** 扇百叶 */
  SashShade = "sashShade",
  /** 装饰格条 */
  DecorationBar = "decorationBar"
}

/**
 * 值类型枚举
 * 定义计算基于长度还是面积
 */
export enum ValueType {
  /** 长度 */
  Length = "length",
  /** 面积 */
  Area = "area"
}

/**
 * 规格价格配置
 */
export interface SpecPrice {
  /** 规格名称 */
  spec: string;
  /** 单价 */
  price: number;
}

/**
 * 报价项配置
 */
export interface OfferPriceItem {
  /** 报价项唯一标识 */
  id: string;
  /** 报价项名称 */
  name: string;
  /** 备注说明 */
  note?: string;
  /** 计量单位 */
  unit?: string;
  /** 数量（可为数字或表达式字符串） */
  count: number | string;
  /** 单价（可为数字或表达式字符串） */
  price: number | string;
  /** 生效条件表达式 */
  condition?: string;
  /** 匹配目标类型 */
  match_target?: MatchTarget;
  /** 匹配计算方式 */
  match_type?: MatchType;
  /** 最小尺寸限制 */
  min_size?: number;
  /** 是否按数量计算（而非尺寸） */
  asQuantity?: boolean;
}

/**
 * 编译后的报价项
 * 包含计算结果
 */
export interface CompiledOfferPriceItem extends OfferPriceItem {
  /** 编译后的单价列表 */
  compiledPrices: number[];
  /** 编译后的数量列表 */
  compiledCounts: number[];
  /** 总金额 */
  compiledSum: number;
  /** 计算表达式（用于展示） */
  compiledExpression: string;
  /** 多个计算步骤的表达式列表 */
  compiledExpressions?: string[];
}

/**
 * 目标构件对象
 */
export interface Target {
  /** 构件类型 */
  type: MatchTarget;
  /** 宽度 */
  width: number;
  /** 高度 */
  height: number;
  /** 长度（用于长度类构件） */
  length?: number;
  /** 原始面积（优先使用） */
  originArea?: number;
  /** 规格参数 */
  specs?: string;
}

/**
 * 目标尺寸信息
 */
export interface TargetSize {
  /** 计算尺寸（长度或面积） */
  size: number;
  /** 数量 */
  quantity: number;
  /** 关联的目标构件（可能为空） */
  target?: Target;
}

/**
 * 编译器接口
 * 提供表达式解析能力
 */
export interface Compiler {
  /**
   * 解析字符串表达式
   * @param expression - 要解析的表达式
   * @returns 解析后的字符串结果
   */
  parseString(expression: string): string;

  /**
   * 解析数字表达式
   * @param expression - 要解析的表达式
   * @returns 计算后的数字结果
   */
  parseNumber(expression: string): number;

  /**
   * 解析条件表达式
   * @param condition - 条件表达式
   * @returns 布尔值结果
   */
  parseCondition(condition?: string): boolean;

  /**
   * 临时添加变量到上下文
   * @param key - 变量名
   * @param value - 变量值
   */
  pushTmpKey(key: string, value: unknown): void;
}

/**
 * ICC Bar 接口
 * 提供构件数据和单位转换
 */
export interface ICCBar {
  /** 计量单位 */
  unit: string;

  /**
   * 模拟生成报价用的目标构件列表
   * @returns 模拟的目标构件数组
   */
  mockTargetsForOfferPrice(): Target[];
}

/**
 * 结果基础编译器抽象类
 */
export abstract class ResultBasedCompile {
  /**
   * 值类型映射表
   * 将匹配目标映射到对应的值类型（长度/面积）
   */
  protected valueTypeMap: Map<MatchTarget, ValueType>;

  /**
   * 构造函数
   * @param compiler - 表达式编译器实例
   */
  constructor(compiler: Compiler);

  /**
   * 推送图纸信息到编译上下文
   * @param target - 可选的目标构件
   */
  protected pushDrawingInfos(target?: Target): void;

  /**
   * 推送目标构件的变量到上下文
   * @param target - 目标构件
   */
  protected pushVariablesForTarget(target: Target): void;

  /**
   * 获取用于计算的目标构件列表
   * @param matchTarget - 匹配目标类型
   * @param drawingInfo - 图纸信息
   * @returns 目标构件数组
   */
  protected fetchCalcTargets(matchTarget: MatchTarget, drawingInfo: unknown): Target[];
}

/**
 * 报价编译器类
 * 负责编译报价项配置，计算最终报价
 */
export class CompileOfferPrice extends ResultBasedCompile {
  /** ICC Bar 实例 */
  private readonly iccBar: ICCBar;

  /** 表达式编译器实例 */
  private readonly compiler: Compiler;

  /** 规格单价映射表 */
  private readonly specPriceMap: Map<string, number>;

  /**
   * 变量名映射表
   * 将匹配目标映射到中文变量名
   */
  private readonly variableNameMap: ReadonlyMap<MatchTarget, string>;

  /**
   * 构造函数
   * @param iccBar - ICC Bar 实例
   * @param compiler - 表达式编译器实例
   */
  constructor(iccBar: ICCBar, compiler: Compiler);

  /**
   * 设置规格价格配置
   * @param specPrices - 规格价格配置数组
   */
  setSpecPrices(specPrices: SpecPrice[]): void;

  /**
   * 预编译单个报价项
   * 解析表达式，准备编译上下文
   * @param item - 报价项配置
   * @param variables - 额外的变量上下文
   */
  private preCompile(item: OfferPriceItem, variables: Record<string, unknown>): void;

  /**
   * 编译报价项列表
   * @param items - 报价项配置数组
   * @param targets - 目标构件数组
   * @param variables - 变量上下文
   * @returns 编译后的报价项数组
   * @throws {ErrorTag} 当表达式解析失败时抛出标记错误
   */
  compile(
    items: OfferPriceItem[],
    targets: Target[],
    variables: Record<string, unknown>
  ): CompiledOfferPriceItem[];

  /**
   * 普通编译（非自动匹配）
   * 直接计算单价×数量
   * @param item - 报价项配置
   */
  private normalCompile(item: OfferPriceItem): void;

  /**
   * 自动匹配编译
   * 根据匹配目标自动计算每个构件的报价
   * @param item - 报价项配置
   * @param targets - 目标构件数组
   * @param variables - 变量上下文
   * @param mockTargets - 模拟目标构件数组
   * @returns 编译后的报价项数组（可能拆分为多项）
   */
  private autoCompile(
    item: OfferPriceItem,
    targets: Target[],
    variables: Record<string, unknown>,
    mockTargets: Target[]
  ): CompiledOfferPriceItem[];

  /**
   * 推送尺寸相关变量到上下文
   * @param size - 计算尺寸
   * @param target - 目标构件
   * @param item - 报价项配置
   */
  private pushVariablesOfSize(size: number, target: Target | undefined, item: OfferPriceItem): void;

  /**
   * 获取目标构件的尺寸信息列表
   * @param matchTarget - 匹配目标类型
   * @param matchType - 匹配计算方式
   * @param targets - 目标构件数组
   * @param mockTargets - 模拟目标构件数组
   * @returns 目标尺寸信息数组
   */
  private fetchTargetSizes(
    matchTarget: MatchTarget,
    matchType: MatchType,
    targets: Target[],
    mockTargets: Target[]
  ): TargetSize[];

  /**
   * 数字格式化
   * 保留两位小数
   * @param value - 要格式化的数字
   * @returns 格式化后的数字
   */
  private num(value: number): number;
}