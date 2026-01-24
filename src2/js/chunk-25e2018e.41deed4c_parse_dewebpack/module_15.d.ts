/**
 * 框架脚本编译模块
 * 负责编译窗框相关的型材、玻璃和配件
 */

import { Utils } from './utils';
import { CompileBars } from './compile-bars';
import { CompileComponent } from './compile-component';
import { CompileAddons, AddonCCType } from './compile-addons';
import { scriptTypeEnum, scriptPurposeEnum } from './enums';
import { CompileGlasses, GlassCCType } from './compile-glasses';

/**
 * 脚本项接口
 */
interface ScriptItem {
  /** 脚本类型 */
  script_type: scriptTypeEnum;
  /** 组件类型 */
  type: string;
  /** 脚本用途 */
  script_purpose?: scriptPurposeEnum;
  /** 边框ID */
  frameId?: string;
  /** 边框唯一标识 */
  frameUid?: string;
  /** 长度 */
  length?: number;
  /** CC值 */
  cc?: number;
  /** 规格 */
  specs?: string;
  /** 厚度 */
  thickness?: number;
  /** 是否带转向框 */
  withTurningFrame?: boolean;
  /** 宽度 */
  width?: number;
  /** 高度 */
  height?: number;
  /** 周长 */
  perimeter?: number;
  /** 位置 */
  position?: string;
  /** BOM编码 */
  bom_code?: string;
  /** 编码 */
  code?: string;
  /** 螺丝次数 */
  screwTimes?: number;
  /** 是否忽略位置类型 */
  ignorePosType?: boolean;
  /** 是否忽略侧边位置 */
  ignoreSidePosition?: boolean;
  /** 是否忽略扇分配方式 */
  ignoreSashAssignWay?: boolean;
  /** 是否忽略扇编号 */
  ignoreSashNum?: boolean;
  /** 是否忽略尺寸类型 */
  ignoreSizeType?: boolean;
}

/**
 * 型材条接口
 */
interface BarItem {
  /** 类型 */
  type: string;
  /** 边框ID */
  frameId?: string;
  /** 扇分配方式 */
  sashAssignWay?: string;
  /** 角度 */
  angle?: number;
  /** 是否属于转角 */
  belongsToCJ?: boolean;
  /** 转角编码 */
  cjCode?: string;
  /** 属于哪个扇 */
  belongsToSash?: string;
  /** 搭接数 */
  dockCount?: number;
  /** 是否滑动 */
  isSlide?: boolean;
  /** 滑动中梃数量 */
  pushSlideMulCount?: number;
  /** 推拉轨道之间 */
  betweenPushTrack?: boolean;
  /** 轨道数量 */
  trackCount?: number;
  /** 轨道编号 */
  trackNo?: number;
  /** 纱窗轨道数量 */
  screenTracksCount?: number;
  /** 安装位置 */
  installPosition?: string;
  /** 是否为门 */
  isDoor?: boolean;
  /** 是否带转向框 */
  withTurningFrame?: boolean;
  /** 是否带防盗 */
  withTheft?: boolean;
  /** 加强搭接数 */
  reinforcedDockCount?: number;
  /** 是否加强 */
  isReinforced?: boolean;
  /** 型材尺寸 */
  profileSize?: number;
  /** 是否推滑 */
  isPushSlide?: boolean;
  /** 是否推轨 */
  isPushTrack?: boolean;
  /** 截断 */
  truncate?: boolean;
  /** 截断边中梃 */
  truncateEdgeMul?: boolean;
  /** 是否有截断 */
  hasTruncation?: boolean;
  /** 连接类型 */
  braceType?: string;
  /** 分离连接数 */
  separatedJointsCount?: number;
  /** 属于固定滑动扇 */
  belongsToFixedSlideSash?: boolean;
  /** 是否双边框 */
  isDoubleSideFrame?: boolean;
  /** 固定扇宽度 */
  widthOfFixedSashes?: number;
  /** 线类型 */
  lineType?: string;
  /** 是否在中梃的扇侧 */
  isSashSideOfMul?: boolean;
  /** CC值 */
  cc?: number;
  /** 连接数 */
  connectCount?: number;
  /** 中梃搭接数 */
  mulDockCount?: number;
  /** 尺寸类型 */
  sizeType?: number;
  /** 编译结果 */
  compiledResult?: CompiledBarResult[];
}

/**
 * 编译后的型材结果
 */
interface CompiledBarResult {
  /** 编译后的CC值 */
  compiledCC: number;
  /** 螺丝次数 */
  screwTimes?: number;
  /** 属性 */
  attrs?: Record<string, unknown>;
}

/**
 * 玻璃项接口
 */
interface GlassItem {
  /** 类型 */
  type: GlassCCType;
  /** 编译结果 */
  compiledResult: CompiledGlassResult[];
  /** 规格 */
  specs?: string;
  /** 厚度 */
  thickness?: number;
  /** 扇分配方式 */
  sashAssignWay?: string;
  /** 是否带转向框 */
  withTurningFrame?: boolean;
}

/**
 * 编译后的玻璃结果
 */
interface CompiledGlassResult {
  /** 玻璃对象 */
  glass: {
    /** ID */
    id: string;
    /** 边框ID */
    frameId: string;
    /** 是否带转向框 */
    withTurningFrame?: boolean;
  };
  /** 宽度 */
  width: number;
  /** 高度 */
  height: number;
  /** 类型 */
  type?: GlassCCType;
  /** 边框ID */
  frameId?: string;
  /** 规格 */
  specs?: string;
  /** 厚度 */
  thickness?: number;
  /** 是否带转向框 */
  withTurningFrame?: boolean;
}

/**
 * 遮阳尺寸信息
 */
interface ShadeSizeInfo {
  /** ID */
  id: string;
  /** 宽度 */
  width: number;
  /** 高度 */
  height: number;
  /** 类型 */
  type: GlassCCType;
}

/**
 * 玻璃尺寸变量
 */
interface GlassSizeVar {
  /** 宽度上的加强搭接数 */
  reinforcedDockCount: {
    width: number;
    height: number;
  };
  /** 宽度上的滑动中梃数量 */
  pushSlideMulCount: {
    width: number;
    height: number;
  };
  /** 宽度上的推拉轨道之间标志 */
  betweenPushTrack: {
    width: boolean;
    height: boolean;
  };
}

/**
 * 区域项（边框或中梃）
 */
interface AreaItem {
  /** 类型 */
  type: string;
  /** 边框ID */
  frameId?: string;
  /** CC值 */
  cc?: {
    width: number;
    height: number;
  };
  /** 规格 */
  spec?: string;
}

/**
 * 图纸信息
 */
interface DrawingInfo {
  /** 边框ID */
  frameId: string;
  /** 边框唯一标识 */
  frameUid: string;
  /** 变量列表 */
  variables: Array<{
    name: string;
    value: number | string;
  }>;
}

/**
 * 边框组件
 */
interface FrameComponent {
  /** 边框ID */
  frameId: string;
  /** 边框唯一标识 */
  frameUid: string;
  /** 宽度 */
  width: number;
  /** 高度 */
  height: number;
  /** 系列 */
  series: string;
  /** 类型 */
  type: 'Frame';
}

/**
 * 固定单元格组件
 */
interface FixedCellComponent {
  /** 类型 */
  type: 'fixedCell';
  /** 宽度 */
  width: number;
  /** 高度 */
  height: number;
  /** 规格 */
  specs: string;
}

/**
 * 固定扇尺寸信息
 */
interface FixedSashSize {
  /** ID */
  id: string;
  /** 宽度 */
  width: number;
  /** 是否固定 */
  isFixed: boolean;
}

/**
 * 编译结果
 */
interface CompileResult {
  /** 型材列表 */
  bar: BarItem[];
  /** 玻璃列表 */
  glass: GlassItem[];
  /** 配件列表 */
  addon: unknown[];
  /** 附加组件列表 */
  addition: Array<FrameComponent | FixedCellComponent | ShadeSizeInfo>;
}

/**
 * ICC型材接口
 */
interface ICCBar {
  /**
   * 获取遮阳CC型材
   */
  getShadeCcBars(shades: ShadeSizeInfo[]): BarItem[];
  
  /**
   * 获取图纸信息
   */
  getDrawingInfo(): DrawingInfo[];
  
  /**
   * 默认玻璃规格
   */
  defaultGlassSpec: {
    spec: string;
  };
}

/**
 * 编译器接口
 */
interface Compiler {
  /**
   * 推送临时键值
   */
  pushTmpKey(key: string, value: string | number | boolean): void;
}

/**
 * 框架脚本编译类
 * 负责处理窗框类型的脚本编译，包括型材、玻璃和配件
 */
export declare class CompileScriptFrame extends CompileComponent {
  /** 多边形玻璃列表 */
  private polyGLass: CompiledGlassResult[];
  
  /** 型材编译器 */
  private compileBars: CompileBars;
  
  /** 玻璃编译器 */
  private compileGlasses: CompileGlasses;
  
  /** 配件编译器 */
  private compileAddons: CompileAddons;
  
  /**
   * 构造函数
   * @param compiler - 编译器实例
   * @param iccBar - ICC型材实例
   * @param glassCompileParam - 玻璃编译参数
   */
  constructor(compiler: Compiler, iccBar: ICCBar, glassCompileParam: unknown);
  
  /**
   * 编译脚本
   * @param scripts - 脚本列表
   * @param bars - 型材列表
   * @returns 编译结果
   */
  compile(scripts: ScriptItem[], bars: BarItem[]): CompileResult;
  
  /**
   * 计算遮阳尺寸
   * @param shadeGlasses - 遮阳玻璃列表
   * @returns 遮阳尺寸信息列表
   */
  private calcShadeSize(shadeGlasses: GlassItem[]): ShadeSizeInfo[];
  
  /**
   * 编译边缘配件
   * @param addonType - 配件类型
   * @param scripts - 脚本列表
   * @param bars - 型材列表
   * @returns 配件列表
   */
  private compileEdgeAddon(
    addonType: AddonCCType,
    scripts: ScriptItem[],
    bars: BarItem[]
  ): unknown[];
  
  /**
   * 编译固定转向框配件
   * @param scripts - 脚本列表
   * @param bars - 型材列表
   * @returns 配件列表
   */
  private compileFixedTurningFrameAddon(
    scripts: ScriptItem[],
    bars: BarItem[]
  ): unknown[];
  
  /**
   * 编译扇转向框配件
   * @param scripts - 脚本列表
   * @param bars - 型材列表
   * @returns 配件列表
   */
  private compileSashTurningFrameAddon(
    scripts: ScriptItem[],
    bars: BarItem[]
  ): unknown[];
  
  /**
   * 编译连接件配件
   * @param scripts - 脚本列表
   * @param bars - 型材列表
   * @returns 配件列表
   */
  private compileConnectorAddon(
    scripts: ScriptItem[],
    bars: BarItem[]
  ): unknown[];
  
  /**
   * 编译角连接件配件
   * @param scripts - 脚本列表
   * @param bars - 型材列表
   * @param allBars - 所有型材列表
   * @returns 配件列表
   */
  private compileCornerJoinerAddon(
    scripts: ScriptItem[],
    bars: BarItem[],
    allBars: BarItem[]
  ): unknown[];
  
  /**
   * 编译区域配件（玻璃、纱网、面板）
   * @param glassType - 玻璃类型
   * @param scripts - 脚本列表
   * @param glasses - 玻璃列表
   * @returns 配件列表
   */
  private compileAreaAddon(
    glassType: GlassCCType,
    scripts: ScriptItem[],
    glasses: GlassItem[]
  ): unknown[];
  
  /**
   * 加载型材变量到编译器
   * @param bar - 型材项
   */
  protected loadBarVar(bar: BarItem): void;
  
  /**
   * 加载玻璃变量到编译器
   * @param glass - 玻璃项
   */
  protected loadGlassVar(glass: GlassItem): void;
  
  /**
   * 加载玻璃宽度变量到编译器
   * @param glassVar - 玻璃尺寸变量
   */
  protected loadGlassWidthVar(glassVar: GlassSizeVar): void;
  
  /**
   * 加载玻璃高度变量到编译器
   * @param glassVar - 玻璃尺寸变量
   */
  protected loadGlassHeightVar(glassVar: GlassSizeVar): void;
  
  /**
   * 加载配件变量到编译器
   * @param addon - 区域项或型材项
   */
  protected loadAddonVar(addon: AreaItem): void;
  
  /**
   * 模拟边框区域
   * @param bars - 型材列表
   * @returns 区域项列表
   */
  private mockFrameAreas(bars: BarItem[]): AreaItem[];
  
  /**
   * 处理脚本（设置忽略标志）
   * @param scripts - 脚本列表
   * @returns 处理后的脚本列表
   */
  private handleScript(scripts: ScriptItem[]): ScriptItem[];
  
  /**
   * 计算边框组件
   * @returns 边框组件列表
   */
  private calcFrameComponent(): FrameComponent[];
  
  /**
   * 过滤边框
   * @param frames - 边框列表
   * @param onlyUids - 仅包含的UID列表
   * @param exceptUids - 排除的UID列表
   * @returns 过滤后的边框列表
   */
  private filterFrames(
    frames: FrameComponent[],
    onlyUids: string[],
    exceptUids: string[]
  ): FrameComponent[];
  
  /**
   * 获取固定单元格组件
   * @param fixedGlassBars - 固定玻璃型材列表
   * @returns 固定单元格组件列表
   */
  private fetchFixedCellComponents(
    fixedGlassBars: AreaItem[]
  ): FixedCellComponent[];
  
  /**
   * 应用轨道型材固定长度
   * @param bars - 型材列表
   * @param slideInnerSashSizes - 滑动内扇尺寸列表
   */
  private applyTrackBarFixedLength(
    bars: BarItem[],
    slideInnerSashSizes?: FixedSashSize[]
  ): void;
}