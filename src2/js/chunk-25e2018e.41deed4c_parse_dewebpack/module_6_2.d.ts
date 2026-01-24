/**
 * 编译组件类型定义
 * 负责处理窗框、玻璃等组件的编译和变量加载
 */

/**
 * 单位类型
 */
type Unit = 'mm' | 'cm' | 'm' | 'inch';

/**
 * 框架ID类型
 */
type FrameId = string | number;

/**
 * 序列号类型
 */
type Serial = string | number;

/**
 * 窗扇ID类型
 */
type SashId = string | number;

/**
 * 窗扇编号类型
 */
type SashNumber = string | number;

/**
 * 尺寸信息接口
 */
interface DimensionInfo {
  /** 宽度 */
  width: number;
  /** 高度 */
  height: number;
}

/**
 * 附加边距信息接口
 */
interface AdditionMargin {
  /** 宽度边距 */
  width: number;
  /** 高度边距 */
  height: number;
}

/**
 * 窗框变量数据接口
 */
interface BarVariableData {
  /** 框架ID */
  frameId: FrameId;
  /** A尺寸（可选） */
  a?: number;
  /** B尺寸（可选） */
  b?: number;
  /** CC尺寸信息 */
  cc: number | DimensionInfo;
  /** AA尺寸信息 */
  aa: number | DimensionInfo;
  /** 玻璃规格（可选） */
  specs?: string;
  /** 玻璃厚度 */
  thickness: number;
  /** 钢筋数量（可选） */
  steelsCount?: number;
}

/**
 * 玻璃变量数据接口
 */
interface GlassVariableData {
  /** 框架ID */
  frameId: FrameId;
  /** CC尺寸信息 */
  cc: DimensionInfo;
  /** 是否带遮阳百叶 */
  withShade: boolean;
  /** 玻璃厚度 */
  thickness: number;
}

/**
 * 玻璃宽度变量数据接口
 */
interface GlassWidthVariableData {
  /** CC宽度 */
  cc: DimensionInfo;
  /** AA宽度 */
  aa: DimensionInfo;
  /** 附加边距（可选） */
  additionMargin?: AdditionMargin;
}

/**
 * 玻璃高度变量数据接口
 */
interface GlassHeightVariableData {
  /** CC高度 */
  cc: DimensionInfo;
  /** AA高度 */
  aa: DimensionInfo;
  /** 附加边距（可选） */
  additionMargin?: AdditionMargin;
}

/**
 * 附件变量数据接口
 */
interface AddonVariableData {
  /** 框架ID */
  frameId: FrameId;
  /** 玻璃厚度 */
  thickness: number;
}

/**
 * 组件类型
 */
type ComponentType = 'bead' | 'sash' | 'sashmullion' | 'frame' | string;

/**
 * 玻璃编译结果接口
 */
interface GlassCompiledResult {
  /** 玻璃ID */
  id: string | number;
  /** 玻璃序列号 */
  serial: Serial;
  /** 窗扇ID */
  isashId: SashId;
  /** 窗扇编号 */
  sashNumber: SashNumber;
  /** 玻璃规格 */
  specs: string;
  /** 玻璃厚度 */
  thickness: number;
  /** 主规格（可选） */
  mainSpecs?: string;
}

/**
 * 窗框组件接口
 */
interface BarComponent {
  /** 组件类型 */
  type: ComponentType;
  /** 序列号（可选） */
  serial?: Serial;
  /** 框架ID（可选） */
  frameId?: FrameId;
  /** 玻璃规格（可选） */
  specs?: string;
  /** 玻璃厚度（可选） */
  thickness?: number;
}

/**
 * 玻璃项编译结果接口
 */
interface GlassItemCompiledResult {
  /** 玻璃信息 */
  glass: GlassCompiledResult;
  /** 宽度 */
  width: number;
  /** 高度 */
  height: number;
}

/**
 * 窗框项编译结果接口
 */
interface BarItemCompiledResult {
  /** ID */
  id: string | number;
  /** 窗扇ID */
  isashId: SashId;
  /** 窗扇编号 */
  sashNumber: SashNumber;
  /** 编译后的CC尺寸 */
  compiledCC: number;
  /** 玻璃信息 */
  glass: GlassCompiledResult;
}

/**
 * 带编译结果的窗框项接口
 */
interface BarItemWithCompiled {
  /** 编译结果数组 */
  compiledResult: BarItemCompiledResult[];
  /** 米重 */
  meter_weight: number;
}

/**
 * 带编译结果的玻璃项接口
 */
interface GlassItemWithCompiled {
  /** 编译结果数组 */
  compiledResult: GlassItemCompiledResult[];
  /** 米重 */
  meter_weight: number;
}

/**
 * 玻璃数据接口
 */
interface GlassData {
  /** 框架ID */
  frameId: FrameId;
  /** 序列号 */
  serial: Serial;
  /** 玻璃规格 */
  specs: string;
  /** 玻璃厚度 */
  thickness: number;
  /** 主规格（可选） */
  mainSpecs?: string;
}

/**
 * 窗框数据接口
 */
interface BarData {
  /** 框架ID */
  frameId: FrameId;
  /** 玻璃厚度 */
  thickness: number;
}

/**
 * 重量计算项接口
 */
interface WeightCalculationItem {
  /** ID */
  id: string | number;
  /** 窗扇ID */
  isashId: SashId;
  /** 窗扇编号 */
  sashNumber: SashNumber;
}

/**
 * 窗框重量计算项接口
 */
interface BarWeightItem extends WeightCalculationItem {
  /** 长度 */
  length: number;
  /** 米重 */
  meter_weight: number;
  /** 数量 */
  count: number;
}

/**
 * 玻璃重量计算项接口
 */
interface GlassWeightItem extends WeightCalculationItem {
  /** 宽度 */
  width: number;
  /** 高度 */
  height: number;
  /** 米重 */
  meter_weight: number;
  /** 数量 */
  count: number;
}

/**
 * ICC窗框配置接口
 */
interface ICCBar {
  /** 单位 */
  unit: Unit;
}

/**
 * 编译器接口
 */
interface Compiler {
  /**
   * 重新加载临时信息
   * @param frameId - 框架ID
   */
  reloadTmpInfo(frameId: FrameId): void;

  /**
   * 推送临时键值对
   * @param key - 键名
   * @param value - 键值
   */
  pushTmpKey(key: string, value: number | string): void;
}

/**
 * 工具类接口
 */
interface Utils {
  /**
   * 面积转换
   * @param unit - 单位
   * @returns 转换系数
   */
  areaConvertion(unit: Unit): number;

  /**
   * 计算窗框重量
   * @param item - 窗框重量计算项
   * @param unit - 单位
   * @returns 重量值
   */
  barWeight(item: BarWeightItem, unit: Unit): number;

  /**
   * 计算玻璃重量
   * @param item - 玻璃重量计算项
   * @param unit - 单位
   * @returns 重量值
   */
  glassWeight(item: GlassWeightItem, unit: Unit): number;
}

/**
 * 编译组件类
 * 负责处理窗框、玻璃等组件的编译工作，包括变量加载、规格设置和重量计算
 */
declare class CompileComponent {
  /**
   * ICC窗框配置对象
   */
  private readonly iccBar: ICCBar;

  /**
   * 编译器实例
   */
  private readonly compiler: Compiler;

  /**
   * 构造函数
   * @param iccBar - ICC窗框配置对象
   * @param compiler - 编译器实例
   */
  constructor(iccBar: ICCBar, compiler: Compiler);

  /**
   * 加载窗框变量到编译器
   * 包括框架ID、尺寸(a/b/cc/aa)、玻璃规格、厚度、钢筋数量等
   * @param data - 窗框变量数据
   */
  loadBarVar(data: BarVariableData): void;

  /**
   * 加载玻璃变量到编译器
   * 包括框架ID、面积计算、中空百叶标识、玻璃厚度等
   * @param data - 玻璃变量数据
   */
  loadGlassVar(data: GlassVariableData): void;

  /**
   * 加载玻璃宽度相关变量到编译器
   * 包括cc宽度、aa宽度、工艺宽度间距(gykj)
   * @param data - 玻璃宽度变量数据
   */
  loadGlassWidthVar(data: GlassWidthVariableData): void;

  /**
   * 加载玻璃高度相关变量到编译器
   * 包括cc高度、aa高度、工艺高度间距(gykj)
   * @param data - 玻璃高度变量数据
   */
  loadGlassHeightVar(data: GlassHeightVariableData): void;

  /**
   * 加载附件变量到编译器
   * 包括框架ID和玻璃厚度
   * @param data - 附件变量数据
   */
  loadAddonVar(data: AddonVariableData): void;

  /**
   * 为压条(bead)、窗扇(sash)等组件设置玻璃规格
   * 根据序列号从玻璃数据中查找匹配项并设置规格和厚度
   * @param components - 组件数组
   * @param glassDataList - 玻璃数据列表
   * @param additionalGlassData - 附加玻璃数据列表（可选）
   */
  setSpecForBead(
    components: BarComponent[],
    glassDataList: GlassData[],
    additionalGlassData?: GlassData[]
  ): void;

  /**
   * 为框架(frame)组件设置玻璃厚度
   * 根据框架ID从窗框数据中查找匹配项并设置厚度
   * @param components - 组件数组
   * @param barDataList - 窗框数据列表
   * @param additionalBarData - 附加窗框数据列表（可选）
   */
  setSpecForFrame(
    components: BarComponent[],
    barDataList: BarData[],
    additionalBarData?: BarData[]
  ): void;

  /**
   * 计算窗扇总重量
   * 根据过滤条件计算符合条件的窗框和玻璃的总重量
   * @param barItems - 窗框项数组
   * @param glassItems - 玻璃项数组
   * @param filterFn - 过滤函数，用于筛选需要计算的项
   * @returns 总重量（单位取决于iccBar.unit）
   */
  sashWeight(
    barItems: BarItemWithCompiled[],
    glassItems: GlassItemWithCompiled[],
    filterFn: (item: WeightCalculationItem) => boolean
  ): number;
}

export { CompileComponent };