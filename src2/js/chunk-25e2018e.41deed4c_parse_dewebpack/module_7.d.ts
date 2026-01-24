/**
 * 玻璃编译类型枚举
 * 定义了窗户系统中所有可用的玻璃和面板类型
 */
export enum GlassCCType {
  /** 固定玻璃 */
  fixedGlass = "fixedGlass",
  /** 固定纱网 */
  fixedNet = "fixedNet",
  /** 固定面板 */
  fixedPanel = "fixedPanel",
  /** 固定遮阳板 */
  fixedShade = "fixedShade",
  /** 平开窗玻璃 */
  sashGlass = "sashGlass",
  /** 纱窗网 */
  screenNet = "screenNet",
  /** 平开窗面板 */
  sashPanel = "sashPanel",
  /** 平开窗遮阳板 */
  sashShade = "sashShade",
  /** 装饰条 */
  decorationBar = "decorationBar"
}

/**
 * 位置类型信息
 */
export interface PositionType {
  /** 宽度位置类型 */
  width: number;
  /** 高度位置类型 */
  height: number;
}

/**
 * 尺寸信息
 */
export interface Dimension {
  /** 宽度参数 */
  width: {
    a?: number;
    b?: number;
  };
  /** 高度参数 */
  height: {
    a?: number;
    b?: number;
  };
}

/**
 * 玻璃规格信息
 */
export interface GlassSpec {
  /** 规格名称 */
  spec: string;
  /** 厚度（毫米） */
  thickness: number;
}

/**
 * 玻璃脚本配置
 */
export interface GlassScript {
  /** 玻璃类型 */
  type: string;
  /** 位置类型数组 */
  pos_type?: string[];
  /** 尺寸类型数组 */
  size_type?: string[];
  /** 条件表达式 */
  condition: string;
  /** 长度计算脚本 */
  length: string;
  /** 框架ID */
  frameId?: string;
  /** 框架唯一标识 */
  frameUid?: string;
  /** 切割样式 */
  cutStyle?: string;
  /** 窗扇分配方式 */
  sashAssignWay?: string;
  /** 是否为门 */
  isDoor?: boolean;
  /** 是否固定 */
  isFixed?: boolean;
  /** 规格 */
  specs?: string;
  /** 主规格 */
  mainSpecs?: string;
  /** 名称 */
  name?: string;
  /** 厚度 */
  thickness?: number;
  /** 附加边距 */
  additionMargin?: number;
  /** 米重 */
  meter_weight?: number;
  /** BOM ID */
  bom_id?: string;
  /** 3D圆弧半径 */
  threedArcRadius?: number;
}

/**
 * 玻璃数据模型
 */
export interface GlassData {
  /** 玻璃类型 */
  type: string;
  /** 序列号 */
  serial: string;
  /** 位置类型 */
  posType: PositionType;
  /** 尺寸信息 */
  dim: Dimension;
  /** 框架ID */
  frameId?: string;
  /** 框架唯一标识 */
  frameUid?: string;
  /** 切割样式 */
  cutStyle?: string;
  /** 窗扇分配方式 */
  sashAssignWay?: string;
  /** 是否为门 */
  isDoor?: boolean;
  /** 是否固定 */
  isFixed?: boolean;
  /** 规格 */
  spec?: string;
  /** 主规格 */
  mainSpec?: string;
  /** 名称 */
  name?: string;
  /** 厚度 */
  thickness?: number;
  /** 附加边距 */
  additionMargin?: number;
  /** 原始米重 */
  originMeterWeight?: number;
  /** BOM ID */
  bom_id?: string;
  /** 自定义属性 */
  customAttrs?: Record<string, unknown>;
  /** 3D圆弧半径 */
  threedArcRadius?: number;
}

/**
 * 编译结果项
 */
export interface CompileResultItem {
  /** 宽度数值 */
  width: number;
  /** 高度数值 */
  height: number;
  /** 宽度表达式 */
  widthExpression: string;
  /** 高度表达式 */
  heightExpression: string;
  /** 玻璃对象 */
  glass: GlassData;
}

/**
 * 编译后的玻璃脚本结果
 */
export interface CompiledGlassScript extends GlassScript {
  /** 编译结果数组 */
  compiledResult: CompileResultItem[];
  /** 框架ID */
  frameId?: string;
  /** 框架唯一标识 */
  frameUid?: string;
  /** 切割样式 */
  cutStyle?: string;
  /** 窗扇分配方式 */
  sashAssignWay?: string;
  /** 是否为门 */
  isDoor?: boolean;
  /** 是否固定 */
  isFixed?: boolean;
  /** 规格 */
  specs?: string;
  /** 主规格 */
  mainSpecs?: string;
  /** 名称 */
  name?: string;
  /** 厚度 */
  thickness?: number;
  /** 附加边距 */
  additionMargin?: number;
  /** 米重 */
  meter_weight?: number;
  /** BOM ID */
  bom_id?: string;
  /** 3D圆弧半径 */
  threedArcRadius?: number;
}

/**
 * 编译器接口
 */
export interface Compiler {
  /** 解析条件表达式 */
  parseCondition(condition: string): boolean;
  /** 解析数字 */
  parseNumber(expression: string): number;
  /** 解析数字表达式为字符串 */
  parseNumberExpression(expression: string): string;
  /** 压入临时变量 */
  pushTmpKey(key: string, value: number): void;
  /** 移除临时变量 */
  removeTmpKeys(keys: string[]): void;
}

/**
 * 组件接口
 */
export interface Component {
  /** 编译器实例 */
  compiler: Compiler;
  /** 加载玻璃变量 */
  loadGlassVar(glass: GlassData): void;
  /** 加载玻璃宽度变量 */
  loadGlassWidthVar(glass: GlassData): void;
  /** 加载玻璃高度变量 */
  loadGlassHeightVar(glass: GlassData): void;
}

/**
 * 脚本类型
 */
export type ScriptType = string;

/**
 * 玻璃编译器类
 * 负责将玻璃配置脚本编译为可执行的尺寸计算结果
 */
export declare class CompileGlasses {
  /** 组件实例 */
  private readonly comp: Component;
  
  /** 玻璃规格映射表 */
  private readonly glassSpecMap: GlassSpec[];

  /**
   * 构造函数
   * @param comp - 组件实例
   * @param glassSpecMap - 玻璃规格映射表
   */
  constructor(comp: Component, glassSpecMap: GlassSpec[]);

  /**
   * 编译玻璃脚本
   * @param glassScripts - 玻璃脚本配置数组
   * @param glassDataList - 玻璃数据列表
   * @param scriptType - 脚本类型
   * @returns 编译后的玻璃脚本结果数组
   * @throws 当缺少必需的宽度或高度脚本时抛出错误
   */
  compile(
    glassScripts: GlassScript[],
    glassDataList: GlassData[],
    scriptType: ScriptType
  ): CompiledGlassScript[];

  /**
   * 获取玻璃类型列表
   * @returns 所有支持的玻璃类型名称数组
   */
  get glassTypeList(): string[];
}