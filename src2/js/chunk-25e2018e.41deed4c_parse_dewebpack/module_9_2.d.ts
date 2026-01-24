/**
 * 内扇脚本编译模块
 * 负责编译窗扇（sash）和纱窗（screen）的尺寸、条框、玻璃和配件
 */

import { CompileBars } from './CompileBars';
import { CompileComponent } from './CompileComponent';
import { Utils } from './Utils';
import { ErrorTag, ErrorMessage } from './ErrorTag';
import { CompileAddons, AddonCCType } from './CompileAddons';
import { scriptPurposeEnum } from './Enums';
import { CompileGlasses, GlassCCType } from './CompileGlasses';

/**
 * 脚本对象接口
 */
interface Script {
  /** 脚本类型（如 'sash', 'screen' 等） */
  script_type: string;
  /** 脚本用途（尺寸/条框/玻璃/配件） */
  script_purpose: scriptPurposeEnum;
  /** 类型标识 */
  type: string;
  /** 长度表达式 */
  length?: string;
  /** 尺寸类型数组（0=宽度, 1=高度） */
  size_type?: number[];
  /** 条件表达式 */
  condition?: string;
  /** 脚本版本 */
  version?: number;
  /** 是否忽略位置类型 */
  ignorePosType?: boolean;
  /** 是否忽略侧边位置 */
  ignoreSidePosition?: boolean;
  /** 是否忽略扇分配方式 */
  ignoreSashAssignWay?: boolean;
  /** 是否忽略扇编号 */
  ignoreSashNum?: boolean;
  /** 是否忽略轨道索引 */
  ignoreTrackIndex?: boolean;
  /** 是否忽略滑动位置 */
  ignoreSlidePosition?: boolean;
  /** 尺寸计算时是否忽略位置类型 */
  ignorePosTypeForSize?: boolean;
  /** 尺寸计算时是否忽略扇分配方式 */
  ignoreSashAssignWayForSize?: boolean;
  /** 尺寸计算时是否忽略扇编号 */
  ignoreSashNumForSize?: boolean;
  /** 尺寸计算时是否忽略尺寸类型 */
  ignoreSizeTypeForSize?: boolean;
}

/**
 * 条框数据接口
 */
interface BarData {
  /** 扇ID */
  id: number;
  /** 扇编号 */
  sashNumber: number;
  /** 条框类型 */
  type: string;
  /** 尺寸类型（0=宽度, 1=高度） */
  sizeType: number;
  /** 中心到中心距离 */
  cc: number;
  /** 固定宽度 */
  fixedWidth?: number;
  /** 所有固定宽度 */
  allFixedWidth?: number;
  /** 是否水平扩展 */
  expandHorizontally: boolean;
  /** 扇分配方式 */
  sashAssignWay: string;
  /** 是否为门 */
  isDoor: boolean;
  /** 框架ID */
  frameId: number;
  /** 框架唯一标识 */
  frameUid: string;
  /** 到扇的距离 */
  distanceToSash?: number;
  /** 列数 */
  columnCount: number;
  /** 扇数量 */
  sashCount: number;
  /** 多点锁点数 */
  multiLockPoints?: number;
  /** 合页数量 */
  hingeCount?: number;
  /** 序列号 */
  serial: number;
  /** 锁位置 */
  lockPosition?: string;
  /** 是否固定扇 */
  isFixed?: boolean;
  /** 条框重叠数量 */
  barOverlapsCount: number;
  /** 扇间隙数量 */
  sashGapsCount: number;
  /** 固定扇数量 */
  fixedSashesCount?: number;
  /** 是否带转角框 */
  withTurningFrame?: boolean;
  /** 轨道数量 */
  trackCount?: number;
  /** 纱轨数量 */
  screenTracksCount?: number;
  /** 搭接数量 */
  dockCount?: number;
  /** 加强搭接数量 */
  reinforcedDockCount?: number;
}

/**
 * 扇尺寸接口
 */
interface SashSize {
  /** 扇ID */
  id: number;
  /** 扇类型 */
  type?: string;
  /** 容器类型 */
  containerType?: string;
  /** 扇编号 */
  sashNumber?: number;
  /** 扇分配方式 */
  sashAssignWay: string;
  /** 是否为门 */
  isDoor: boolean;
  /** 框架ID */
  frameId: number;
  /** 框架唯一标识 */
  frameUid?: string;
  /** 宽度（单位：mm） */
  width?: number;
  /** 宽度表达式 */
  widthExpression?: string;
  /** 高度（单位：mm） */
  height?: number;
  /** 高度表达式 */
  heightExpression?: string;
  /** 序列号 */
  serial?: number;
  /** 列数 */
  columnCount?: number;
  /** 扇数量 */
  sashCount?: number;
  /** 条框重叠数量 */
  barOverlapsCount?: number;
  /** 扇间隙数量 */
  sashGapsCount?: number;
  /** 是否带转角框 */
  withTurningFrame?: boolean;
  /** 宿主类型 */
  hostType?: string;
  /** 到扇的距离 */
  distanceToSash?: number;
  /** 多点锁点数 */
  multiLockPoints?: number;
  /** 合页数量 */
  hingeCount?: number;
  /** 锁位置 */
  lockPosition?: string;
  /** 宽度是否固定 */
  widthFixedSash?: boolean;
  /** 是否固定扇 */
  isFixed?: boolean;
  /** 重量（单位：kg） */
  weight?: number;
  /** 规格 */
  specs?: string;
  /** 厚度 */
  thickness?: number;
}

/**
 * 编译结果接口
 */
interface CompileResult {
  /** 条框列表 */
  bar: unknown[];
  /** 玻璃列表 */
  glass: GlassItem[];
  /** 配件列表 */
  addon: unknown[];
  /** 附加信息（扇尺寸、开启单元等） */
  addition: SashSize[];
  /** 配件源数据 */
  addonSource: unknown[];
}

/**
 * 玻璃项接口
 */
interface GlassItem {
  /** 玻璃类型 */
  type?: GlassCCType;
  /** 扇分配方式 */
  sashAssignWay?: string;
  /** 框架ID */
  frameId?: number;
  /** 规格 */
  specs?: string;
  /** 厚度 */
  thickness?: number;
  /** 编译结果 */
  compiledResult: Array<{
    /** 玻璃详细信息 */
    glass: {
      type: GlassCCType;
      sashAssignWay: string;
      frameId: number;
    };
  }>;
}

/**
 * 开启单元接口
 */
interface OpenCell extends SashSize {
  type: 'openCell';
  /** 宿主类型 */
  hostType: string;
}

/**
 * 内扇脚本编译器
 * 处理窗扇和纱窗的完整编译流程
 */
export declare class CompileScriptInnerSash extends CompileComponent {
  /** 条框编译器 */
  private readonly compileBars: CompileBars;
  /** 玻璃编译器 */
  private readonly compileGlasses: CompileGlasses;
  /** 配件编译器 */
  private readonly compileAddons: CompileAddons;
  /** 内扇尺寸缓存 */
  private innerSashSize: SashSize[];

  /**
   * 构造函数
   * @param compiler - 脚本编译器实例
   * @param scriptType - 脚本类型（如 'sash', 'doubleSash', 'slide' 等）
   * @param iccBar - 条框计算实例
   */
  constructor(compiler: unknown, scriptType: string, iccBar: unknown);

  /**
   * 编译主流程
   * @param scripts - 所有脚本列表
   * @param barData - 条框数据列表
   * @returns 编译结果对象，包含条框、玻璃、配件等
   * @throws {ErrorTag} 当尺寸脚本缺失或条框脚本存在但尺寸脚本为空时
   */
  compile(scripts: Script[], barData: BarData[]): CompileResult;

  /**
   * 编译内扇中梃条框
   * @param bars - 内扇条框列表
   * @param scripts - 脚本列表
   * @param result - 当前编译结果，会被直接修改
   */
  private compileInnerSashBars(
    bars: BarData[],
    scripts: Script[],
    result: CompileResult
  ): void;

  /**
   * 编译面积相关配件（玻璃/面板/纱网配件）
   * @param glassType - 玻璃类型（玻璃/面板/纱网）
   * @param scripts - 脚本列表
   * @param glassItems - 玻璃项列表
   * @returns 编译后的配件列表
   */
  private compileAreaAddon(
    glassType: GlassCCType,
    scripts: Script[],
    glassItems: GlassItem[]
  ): unknown[];

  /**
   * 处理条框脚本，设置忽略标志
   * @param scripts - 条框用途的脚本列表
   * @returns 处理后的脚本列表
   */
  private handleScript(scripts: Script[]): Script[];

  /**
   * 计算内扇尺寸
   * @param bars - 条框数据列表
   * @param sizeScripts - 尺寸脚本列表
   * @returns 计算后的内扇尺寸列表
   */
  private calcInnerSashSize(bars: BarData[], sizeScripts: Script[]): SashSize[];

  /**
   * 加载内扇尺寸计算的临时变量
   * @param barData - 条框数据
   */
  private loadInnerSizeVar(barData: BarData): void;

  /**
   * 创建自定义尺寸
   * @param sashSize - 扇尺寸对象
   * @param calculatedSize - 计算出的尺寸值
   * @param sizeExpression - 尺寸表达式
   * @param barData - 条框数据
   * @returns 更新后的扇尺寸对象
   */
  private makeCustomizedSize(
    sashSize: SashSize,
    calculatedSize: number,
    sizeExpression: string,
    barData: BarData
  ): SashSize;

  /**
   * 创建自适应尺寸
   * @param sashSize - 扇尺寸对象
   * @param calculatedSize - 计算出的尺寸值
   * @param sizeExpression - 尺寸表达式
   * @param barData - 条框数据
   * @returns 更新后的扇尺寸对象
   */
  private makeSizeSelfAdapted(
    sashSize: SashSize,
    calculatedSize: number,
    sizeExpression: string,
    barData: BarData
  ): SashSize;

  /**
   * 处理尺寸脚本，设置忽略标志
   * @param sizeScripts - 尺寸脚本列表
   * @returns 处理后的脚本列表
   */
  private handleSizeScript(sizeScripts: Script[]): Script[];

  /**
   * 计算开启单元尺寸
   * @param barData - 条框数据列表（已过滤为扇或纱窗类型）
   * @returns 开启单元列表
   */
  private calcOpenCell(barData: BarData[]): OpenCell[];

  /**
   * 计算外扇尺寸
   * @param barData - 条框数据列表
   * @param sizeScripts - 尺寸脚本列表
   * @returns 计算后的扇尺寸列表
   */
  private calcSashSize(barData: BarData[], sizeScripts: Script[]): SashSize[];

  /**
   * 获取配件类型（用于模拟扇配件）
   * @returns 默认返回玻璃配件类型
   */
  protected get addonType(): AddonCCType;

  /**
   * 模拟扇配件数据
   * @param sashSizes - 扇尺寸列表
   * @returns 返回原始扇尺寸列表作为配件源
   */
  protected mockSashAddon(sashSizes: SashSize[]): SashSize[];

  /**
   * 加载条框变量到编译器上下文
   * @param barData - 条框数据
   */
  protected loadBarVar(barData: BarData): void;

  /**
   * 加载配件变量到编译器上下文
   * @param addon - 配件数据（可能是扇尺寸或其他配件）
   */
  protected loadAddonVar(addon: SashSize): void;

  /**
   * 获取内扇类型列表
   * @returns 内扇类型数组 ['sash', 'screen']
   */
  protected get innerSashCCType(): string[];

  /**
   * 为压条设置玻璃规格
   * @param bars - 条框列表
   * @param glasses - 玻璃列表
   */
  private setSpecForBead(bars: BarData[], glasses: GlassItem[]): void;

  /**
   * 计算扇重量
   * @param bars - 条框列表
   * @param glasses - 玻璃列表
   * @param filter - 过滤函数
   * @returns 计算出的重量（单位：kg）
   */
  private sashWeight(
    bars: unknown[],
    glasses: GlassItem[],
    filter: (item: unknown) => boolean
  ): number;
}