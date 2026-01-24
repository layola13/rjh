/**
 * 玻璃均分优化器模块
 * 用于优化门窗分割线的均分计算，确保玻璃尺寸符合实际规格
 */

/**
 * 真实玻璃尺寸数据
 */
export interface RealGlassSize {
  /** 玻璃序列号 */
  serial: string;
  /** 玻璃宽度 */
  width: number;
  /** 玻璃高度 */
  height: number;
}

/**
 * 形状管理器接口
 */
export interface ShapeManager {
  /** 形状集合 */
  shapem: Shape[];
}

/**
 * 形状对象接口
 */
export interface Shape {
  /** 多重管理器 */
  mulManager: MulManager;
  /** 更新框架 */
  updateFrame(force: boolean): void;
  /** 绘制形状 */
  draw(view: View): void;
}

/**
 * 多重管理器接口
 */
export interface MulManager {
  /** 分割器 */
  splitter: Splitter;
  /** 玻璃集合 */
  glasses: GlassElement[];
}

/**
 * 分割器接口
 */
export interface Splitter {
  /** 均分计算回调函数 */
  equalizeForCalc?: (
    segment: Segment,
    ratios: number[],
    areas: Area[]
  ) => number[] | undefined;
  /** 是否需要二次均分 */
  twiceEqualSplitRequire: boolean;
  /** 调整均分逻辑 */
  tweakEqualSplit(): void;
  /** 分割线集合 */
  lines: SplitLine[];
}

/**
 * 分割线接口
 */
export interface SplitLine {
  /** 均分类型 */
  equalSplit: EqualSplitType;
}

/**
 * 均分类型枚举
 */
export enum EqualSplitType {
  /** 无均分 */
  None = 0,
  /** 外部均分 */
  Outter = 1
}

/**
 * 线段接口
 */
export interface Segment {
  /** 起点 */
  start: Point;
  /** 终点 */
  end: Point;
}

/**
 * 点接口
 */
export interface Point {
  /** 投影到线段 */
  projectionOn(line: Line): Point;
  /** 计算到另一点的距离 */
  distanceTo(point: Point): [number];
}

/**
 * 线接口
 */
export interface Line {
  // 线的具体属性由makerjs定义
}

/**
 * 区域接口
 */
export interface Area {
  /** 多边形 */
  polygon: Polygon;
  /** 序列号信息 */
  serial: SerialInfo;
}

/**
 * 多边形接口
 */
export interface Polygon {
  /** 包围盒 */
  box: Box;
}

/**
 * 包围盒接口
 */
export interface Box {
  /** 中心点 */
  center: Point;
}

/**
 * 序列号信息接口
 */
export interface SerialInfo {
  /** 序列号文本 */
  text: string;
}

/**
 * 玻璃元素接口
 */
export interface GlassElement {
  /** 序列号信息 */
  serial: SerialInfo;
}

/**
 * 推拉窗接口
 */
export interface PushSash {
  // 推拉窗特有属性
}

/**
 * 玻璃类接口
 */
export interface Glass {
  /** 序列号 */
  serial: string;
  /** 宽度 */
  width: number;
  /** 高度 */
  height: number;
  /** 计算序列号的静态方法 */
  calcSerial(shapes: Shape[]): void;
}

/**
 * 窗扇接口
 */
export interface Sash {
  /** 多重管理器 */
  mulManager: MulManager;
}

/**
 * 视图接口
 */
export interface View {
  /** 刷新视图 */
  refresh(): void;
}

/**
 * 控制栏接口
 */
export interface CCBar {
  /** 收集多重尺寸反射 */
  collectMulDimReflections(shape: Shape): void;
}

/**
 * 玻璃均分优化器
 * 负责优化门窗分割线的均分计算，确保分割后的玻璃尺寸符合实际生产规格
 */
export declare class EqualSplitGlassOptimizer {
  /** 形状管理器 */
  private readonly shapeManager: ShapeManager;
  
  /** 控制栏 */
  private readonly ccbar: CCBar;
  
  /** 已调整的分割器集合 */
  private adjustedSplitters: SplitLine[];
  
  /** 真实玻璃尺寸集合 */
  private realGlassSizes: RealGlassSize[];
  
  /** 视图对象 */
  private readonly view: View;

  /**
   * 构造函数
   * @param shapeManager - 形状管理器
   * @param ccbar - 控制栏
   */
  constructor(shapeManager: ShapeManager, ccbar: CCBar);

  /**
   * 根据序列号查找真实玻璃尺寸
   * @param serial - 玻璃序列号
   * @returns 真实玻璃尺寸对象，未找到则返回undefined
   */
  realGlassSize(serial: string): RealGlassSize | undefined;

  /**
   * 执行优化
   * @param glassSizes - 玻璃尺寸数组
   * @returns 优化是否成功
   */
  optimize(glassSizes: RealGlassSize[]): boolean;

  /**
   * 计算偏移量
   * @param segment - 线段
   * @param ratios - 比例数组
   * @param areas - 区域数组
   * @returns 偏移量数组，计算失败则返回undefined
   */
  private calcOffsets(
    segment: Segment,
    ratios: number[],
    areas: Area[]
  ): number[] | undefined;

  /**
   * 获取目标序列号
   * @param element - 区域或窗扇对象
   * @returns 序列号字符串
   */
  private fetchTargetSerial(element: Area | Sash): string;
}