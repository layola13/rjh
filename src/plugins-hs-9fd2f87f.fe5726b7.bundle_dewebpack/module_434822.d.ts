/**
 * 楼层平面图结构分析器
 * 用于计算和分析楼层平面图的边界线、轮廓和区域边界
 */

/**
 * 2D 点坐标接口
 */
export interface Point {
  x: number;
  y: number;
}

/**
 * 路径类型（点数组）
 */
export type Path = Point[];

/**
 * 轮廓数据结构
 */
export interface Contour {
  /** 外部轮廓路径 */
  outer: Path;
  /** 内部孔洞路径数组 */
  holes: Path[];
}

/**
 * 边界矩形
 */
export interface Bound {
  /** 最小 X 坐标 */
  minX: number;
  /** 最小 Y 坐标 */
  minY: number;
  /** 最大 X 坐标 */
  maxX: number;
  /** 最大 Y 坐标 */
  maxY: number;
  /** 添加点到边界计算 */
  appendPoint(point: Point): void;
}

/**
 * 内容边界信息
 */
export interface ContentBound {
  /** 中心点坐标 */
  center: Point;
  /** 宽度 */
  width: number;
  /** 高度 */
  height: number;
  /** 旋转角度（弧度） */
  rotation: number;
}

/**
 * 楼层平面图接口
 */
export interface Floorplan {
  /** 遍历所有房间 */
  forEachRoom(callback: (room: Room) => void): void;
  /** 遍历所有内容对象 */
  forEachContent(callback: (content: Content) => void): void;
}

/**
 * 房间接口
 */
export interface Room {
  /** 遍历房间内的内容对象 */
  forEachContent(callback: (content: Content) => void): void;
}

/**
 * 内容对象基类接口
 */
export interface Content {
  /** X 坐标 */
  x: number;
  /** Y 坐标 */
  y: number;
  /** 检查对象是否为指定类型的实例 */
  instanceOf(modelClass: string): boolean;
}

/**
 * 角窗路径数据
 */
export interface CornerWindowPaths {
  /** 外部路径 */
  outPath?: Path;
}

/**
 * 楼层平面图结构分析器
 * 负责计算墙体结构边界线、提取轮廓、计算内外边界
 */
export default class FloorplanStructureAnalyzer {
  /** 楼层平面图对象 */
  readonly floorplan: Floorplan;

  /** 边界线路径数组 */
  borderlinePaths: Path[];

  /** 轮廓数组 */
  contours: Contour[];

  /** 内部路径数组（孔洞） */
  innerPaths: Path[];

  /** 外部路径数组 */
  outerPaths: Path[];

  /** 内部边界 */
  innerBound: Bound | undefined;

  /** 外部边界 */
  outerBound: Bound | undefined;

  /**
   * 构造函数
   * @param floorplan - 楼层平面图对象
   */
  constructor(floorplan: Floorplan);

  /**
   * 执行结构分析
   * 计算边界线、轮廓和边界范围
   */
  eval(): void;

  /**
   * 计算路径数组的边界矩形
   * @param paths - 路径数组
   * @returns 边界矩形对象
   * @private
   */
  private _computeBound(paths: Path[]): Bound;

  /**
   * 调整外部边界，将门窗等开口的轮廓纳入边界计算
   * @param bound - 要调整的边界对象
   * @private
   */
  private _adjustOuterBound(bound: Bound): void;
}

/**
 * 工具类命名空间声明（外部依赖）
 */
declare namespace HSCore.Util {
  class BrepBound implements Bound {
    constructor(minX: number, minY: number, maxX: number, maxY: number);
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
    appendPoint(point: Point): void;
  }

  namespace Math {
    /** 获取路径的边界框 [x, y, width, height] */
    function getBounds(path: Path): [number, number, number, number] | null;
  }
}

/**
 * 工具函数命名空间声明（外部依赖）
 */
declare namespace Util {
  /** 计算墙体结构边界线 */
  function computeWallStructureBorderLines(floorplan: Floorplan): Path[];

  /** 查找轮廓 */
  function findContours(paths: Path[]): Contour[];

  /** 获取内容对象的边界 */
  function getContentBound(content: Content, includeRotation: boolean): ContentBound | undefined;

  /** 获取角窗路径 */
  function getCornerWindowPaths(content: Content): CornerWindowPaths | undefined;

  /** 计算轮廓线 */
  function computeOutline(center: Point, width: number, height: number, rotation: number): Path;
}

/**
 * 模型类常量命名空间声明（外部依赖）
 */
declare namespace HSConstants.ModelClass {
  const NgOpening: string;
  const NgCornerWindow: string;
  const NgBayWindow: string;
  const NgPOrdinaryWindow: string;
}