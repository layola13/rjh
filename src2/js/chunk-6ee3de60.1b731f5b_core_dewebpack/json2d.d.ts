import type Flatten from '@flatten-js/core';

/**
 * 2D图形数据序列化器
 * 将图形管理器中的形状、墙体、连接件等数据转换为JSON格式
 */
export declare class Json2d {
  /** 图形管理器实例 */
  private shapeManager: ShapeManager;
  
  /** 点坐标转换矩阵 */
  private pointMatrix: Flatten.Matrix;

  /**
   * 创建Json2d序列化器实例
   * @param shapeManager - 图形管理器对象
   */
  constructor(shapeManager: ShapeManager);

  /**
   * 序列化整个图形数据
   * @returns 包含主图形、墙体和连接件的完整数据结构
   */
  serialize(): SerializedData;

  /**
   * 将连接件转换为数据对象
   * @param couple - 连接件实例（可能是CornerJoiner或其他类型）
   * @returns 包含多边形和角度信息的数据对象
   */
  private coupleToData(couple: Couple | CornerJoiner): CoupleData;

  /**
   * 将五金件管理器转换为数据对象
   * @param hardwareManager - 五金件管理器实例
   * @returns 包含把手和铰链位置信息的数据对象
   */
  private hardwareToData(
    hardwareManager: PushSashHardwareManager | FoldHardwareManager | SlideHardwareManager
  ): HardwareData;

  /**
   * 将条形件（Bar）转换为数据数组
   * @param bar - 条形件实例
   * @returns 边缘数据数组
   */
  private barToData(bar: Bar): EdgeData[];

  /**
   * 将边缘转换为数据对象（自动识别直线段或圆弧）
   * @param edge - 边缘实例（Segment或Arc）
   * @returns 线段数据或圆弧数据
   */
  private edgeToData(edge: Flatten.Segment | Flatten.Arc): SegmentData | ArcData;

  /**
   * 将线段转换为数据对象
   * @param segment - 线段实例
   * @returns 包含起点和终点的数据对象
   */
  private segmentToData(segment: Flatten.Segment): SegmentData;

  /**
   * 将圆弧转换为数据对象
   * @param arc - 圆弧实例
   * @returns 包含半径、圆心、起始角度等信息的数据对象
   */
  private arcToData(arc: Flatten.Arc): ArcData;

  /**
   * 将点转换为数据对象（应用变换矩阵）
   * @param point - 点实例
   * @returns 包含x和y坐标的数据对象
   */
  private pointToData(point: Flatten.Point): PointData;

  /**
   * 将边界框转换为数据对象
   * @param box - 边界框实例
   * @returns 包含xmin、xmax、ymin、ymax的数据对象
   */
  private boxToData(box: Flatten.Box): BoxData;
}

/**
 * 序列化后的完整数据结构
 */
export interface SerializedData {
  /** 整体边界框 */
  box: BoxData;
  /** 主图形数据数组 */
  main: MainShapeData[];
  /** 墙体数据数组 */
  walls: EdgeData[][];
  /** 连接件数据数组 */
  couples: CoupleData[];
}

/**
 * 主图形数据结构
 */
export interface MainShapeData {
  /** 框架条形件数组 */
  frame: EdgeData[];
  /** 竖梃条形件数组 */
  mullions: EdgeData[];
  /** 压条数组（每个压条包含多个边缘） */
  beads: EdgeData[][];
  /** 玻璃边缘数组 */
  glasses: EdgeData[][];
  /** 窗扇数据数组 */
  sashes: SashData[];
}

/**
 * 窗扇数据结构
 */
export interface SashData {
  /** 窗扇类型 */
  type: string;
  /** 框架条形件数组 */
  frame: EdgeData[];
  /** 竖梃条形件数组 */
  mullions: EdgeData[];
  /** 压条数组 */
  beads: EdgeData[][];
  /** 玻璃边缘数组 */
  glasses: EdgeData[][];
  /** 五金件数据 */
  hardware: HardwareData;
}

/**
 * 五金件数据结构
 */
export interface HardwareData {
  /** 把手位置（可选） */
  handle?: PointData;
  /** 铰链位置数组 */
  hinges: PointData[];
}

/**
 * 连接件数据结构
 */
export interface CoupleData {
  /** 多边形边缘数组 */
  polygon: EdgeData[];
  /** 连接角度（CornerJoiner使用skewAngle，其他默认180度） */
  angle: number;
}

/**
 * 边缘数据类型（线段或圆弧）
 */
export type EdgeData = SegmentData | ArcData;

/**
 * 线段数据结构
 */
export interface SegmentData {
  /** 起点坐标 */
  start: PointData;
  /** 终点坐标 */
  end: PointData;
}

/**
 * 圆弧数据结构
 */
export interface ArcData {
  /** 圆弧半径 */
  radius: number;
  /** 圆心坐标 */
  center: PointData;
  /** 起始角度（弧度） */
  startAngle: number;
  /** 结束角度（弧度） */
  endAngle: number;
  /** 是否逆时针方向 */
  counterClockwise: boolean;
}

/**
 * 点坐标数据结构
 */
export interface PointData {
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
}

/**
 * 边界框数据结构
 */
export interface BoxData {
  /** 最小X坐标 */
  xmin: number;
  /** 最大X坐标 */
  xmax: number;
  /** 最小Y坐标 */
  ymin: number;
  /** 最大Y坐标 */
  ymax: number;
}

/**
 * 图形管理器接口（依赖类型）
 */
export interface ShapeManager {
  shapem: Shape[];
  walls: Wall[];
  couples: (Couple | CornerJoiner)[];
  shapeBox: Flatten.Box;
}

/**
 * 形状接口
 */
export interface Shape {
  gshape?: {
    parent?: {
      getTransform(): { m: number[] };
    };
  };
  frameManager: FrameManager;
  mulManager: MullionManager;
  sashManager: SashManager;
}

/**
 * 框架管理器接口
 */
export interface FrameManager {
  bars: Bar[];
  innerPoly?: Array<{ edges: (Flatten.Segment | Flatten.Arc)[] }>;
}

/**
 * 竖梃管理器接口
 */
export interface MullionManager {
  bars: Bar[];
  glasses: Glass[];
}

/**
 * 窗扇管理器接口
 */
export interface SashManager {
  allSashes: Sash[];
}

/**
 * 窗扇接口
 */
export interface Sash {
  type: string;
  frameManager: FrameManager;
  mulManager: MullionManager;
  hardwareManager: PushSashHardwareManager | FoldHardwareManager | SlideHardwareManager;
}

/**
 * 条形件接口
 */
export interface Bar {
  polygon: {
    edges: (Flatten.Segment | Flatten.Arc)[];
  };
}

/**
 * 玻璃接口
 */
export interface Glass {
  bead?: {
    frameManager: FrameManager;
  };
}

/**
 * 墙体接口
 */
export interface Wall {
  polygon: {
    edges: (Flatten.Segment | Flatten.Arc)[];
  };
}

/**
 * 连接件接口
 */
export interface Couple {
  polygon: {
    edges: (Flatten.Segment | Flatten.Arc)[];
  };
}

/**
 * 角连接件接口
 */
export interface CornerJoiner extends Couple {
  skewAngle: number;
}

/**
 * 推拉窗扇五金件管理器
 */
export interface PushSashHardwareManager {
  handle?: HardwareOnFrame;
  hinges: Hinge[];
}

/**
 * 折叠窗五金件管理器
 */
export interface FoldHardwareManager {
  handle?: HardwareOnFrame;
  hinges: Hinge[];
}

/**
 * 推拉窗五金件管理器
 */
export interface SlideHardwareManager {
  locks: Lock[];
}

/**
 * 框架上的五金件
 */
export interface HardwareOnFrame {
  edge?: unknown;
  handlePosition: Flatten.Point;
}

/**
 * 铰链接口
 */
export interface Hinge {
  position: Flatten.Point;
}

/**
 * 锁接口
 */
export interface Lock {
  position: Flatten.Point;
}