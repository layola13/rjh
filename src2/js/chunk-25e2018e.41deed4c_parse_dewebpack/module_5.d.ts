/**
 * 配置项接口 - 条形图配置
 */
interface BarConfig {
  /** 类型（如：sash、screen、antiTheft等） */
  type: string;
  /** 版本号 */
  version?: number;
  /** 是否忽略轨道索引 */
  ignoreTrackIndex?: boolean;
  /** 轨道索引数组 */
  track_index?: string[];
  /** 是否忽略滑动位置 */
  ignoreSlidePosition?: boolean;
  /** 滑动位置 */
  slide_position?: string;
  /** 是否忽略扇分配方式 */
  ignoreSashAssignWay?: boolean;
  /** 扇分配方式数组 */
  sash_assign_way: string[];
  /** 是否忽略侧面位置 */
  ignoreSidePosition?: boolean;
  /** 侧面位置数组 */
  side_position?: string[];
  /** 是否忽略扇数量 */
  ignoreSashNum?: boolean;
  /** 扇数量 */
  sash_num?: string;
  /** 是否忽略位置类型 */
  ignorePosType?: boolean;
  /** 位置类型数组 */
  pos_type?: string[];
  /** 是否忽略尺寸类型 */
  ignoreSizeType?: boolean;
  /** 尺寸类型数组 */
  size_type?: string[];
  /** 脚本类型（如：fold、doubleSash、sash） */
  script_type?: string;
  /** 条件表达式 */
  condition: string;
  /** 长度表达式 */
  length: string;
  /** 颜色 */
  color?: string;
  /** 切割角度 */
  angle?: string;
  /** 辅助条配置数组 */
  aux_bars?: AuxBarConfig[];
  /** 子条配置数组 */
  sub_bars?: SubBarConfig[];
  /** 编译结果 */
  compiledResult?: CompiledBar[];
}

/**
 * 辅助条配置接口
 */
interface AuxBarConfig {
  /** 条件表达式 */
  condition: string;
  /** 长度表达式 */
  length: string;
  /** 数量 */
  count: string;
}

/**
 * 子条配置接口
 */
interface SubBarConfig {
  /** 子条代码 */
  code: string;
  /** 颜色 */
  color: string;
}

/**
 * 条形图数据接口
 */
interface BarData {
  /** 类型 */
  type: string;
  /** 轨道索引 */
  trackIndex?: number;
  /** 扇分配方式 */
  sashAssignWay?: string;
  /** 扇数量 */
  sashNumber?: number;
  /** 尺寸类型 */
  sizeType?: number;
  /** 位置类型 */
  posType?: number;
  /** 滑动位置 */
  slidePosition?: string;
  /** 位置 */
  position?: string;
  /** 切割角度 */
  cutAngle?: string;
  /** 编译后的CC值 */
  compiledCC?: number;
  /** 长度表达式 */
  lengthExpression?: string;
  /** 编译后的颜色 */
  compiledColor?: string;
  /** 辅助条数组 */
  aux_bars?: CompiledAuxBar[];
  /** 子条数组 */
  sub_bars?: CompiledSubBar[];
  /** 子条颜色JSON字符串 */
  sub_color?: string;
}

/**
 * 编译后的条形图接口
 */
interface CompiledBar extends BarData {
  /** 编译后的CC值（长度计算结果） */
  compiledCC: number;
  /** 长度表达式 */
  lengthExpression: string;
  /** 编译后的颜色 */
  compiledColor?: string;
}

/**
 * 编译后的辅助条接口
 */
interface CompiledAuxBar extends BarData {
  /** 长度 */
  length: number;
  /** 长度表达式 */
  lengthExpression: string;
  /** 数量 */
  count: number;
}

/**
 * 编译后的子条接口
 */
interface CompiledSubBar {
  /** 子条代码 */
  code: string;
  /** 颜色 */
  color: string;
  /** 脚本类型 */
  script_type?: string;
  /** 类型 */
  type?: string;
}

/**
 * 编译器接口
 */
interface Compiler {
  /** 解析条件表达式 */
  parseCondition(condition: string): boolean;
  /** 解析数值表达式 */
  parseNumber(expression: string): number;
  /** 解析数值表达式（保留表达式字符串） */
  parseNumberExpression(expression: string): string;
  /** 解析字符串表达式 */
  parseString(expression: string): string;
  /** 压入临时变量 */
  pushTmpKey(key: string, value: unknown): void;
}

/**
 * 组件接口
 */
interface Component {
  /** 编译器实例 */
  compiler: Compiler;
  /** 加载条形图变量 */
  loadBarVar(bar: BarData): void;
}

/**
 * 条形图编译器类
 * 用于编译和处理各种类型的条形图配置
 */
export declare class CompileBars {
  /** 组件实例 */
  private readonly comp: Component;

  /**
   * 构造函数
   * @param comp - 组件实例
   */
  constructor(comp: Component);

  /**
   * 匹配内部扇尺寸
   * @param barData - 条形图数据
   * @param config - 配置项
   * @returns 是否匹配成功
   */
  matchInnerSashSize(barData: BarData, config: BarConfig): boolean;

  /**
   * 匹配扇尺寸
   * @param barData - 条形图数据
   * @param config - 配置项
   * @returns 是否匹配成功
   */
  matchSashSize(barData: BarData, config: BarConfig): boolean;

  /**
   * 判断是否允许使用尺寸类型
   * @param config - 配置项
   * @returns 是否允许
   */
  allowSizeType(config: BarConfig): boolean;

  /**
   * 匹配条形图
   * @param barData - 条形图数据
   * @param config - 配置项
   * @returns 是否匹配成功
   */
  matchBar(barData: BarData, config: BarConfig): boolean;

  /**
   * 判断两个分配方式是否相同
   * @param way1 - 分配方式1
   * @param way2 - 分配方式2
   * @returns 是否相同
   */
  sameAssignWay(way1: string, way2: string): boolean;

  /**
   * 编译条形图数组
   * @param barDataList - 条形图数据数组
   * @param configList - 配置项数组
   * @returns 编译后的配置数组
   */
  compileBars(barDataList: BarData[], configList: BarConfig[]): BarConfig[];

  /**
   * 编译辅助条
   * @param compiledBar - 编译后的条形图
   * @param config - 配置项
   */
  compileAuxbars(compiledBar: CompiledBar, config: BarConfig): void;

  /**
   * 编译子条
   * @param compiledBar - 编译后的条形图
   * @param config - 配置项
   */
  compileSubbars(compiledBar: CompiledBar, config: BarConfig): void;
}