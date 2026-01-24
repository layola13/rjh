/**
 * 2D草图工具模块
 * 提供2D草图的参考点获取、捕捉等功能
 */

/**
 * 点类型枚举
 */
export enum PointType {
  /** 端点 */
  endPoint = "endPoint",
  /** 左侧点 */
  leftPoint = "leftPoint",
  /** 右侧点 */
  rightPoint = "rightPoint",
  /** 顶部点 */
  topPoint = "topPoint",
  /** 底部点 */
  bottomPoint = "bottomPoint",
  /** 圆弧中点 */
  arcMidPoint = "arcMidPoint",
  /** 线段中点 */
  lineMidPoint = "lineMidPoint",
  /** 中心点 */
  centerPoint = "centerPoint",
  /** 线上点 */
  linePoint = "linePoint",
  /** 辅助线点 */
  guideLinePoint = "guideLinePoint",
  /** 平行于X轴 */
  parallelToX = "parallelToX",
  /** 平行于Y轴 */
  parallelToY = "parallelToY",
  /** 垂足 */
  perpendicularFoot = "perpendicularFoot"
}

/**
 * 2D点接口
 */
export interface Point2d {
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
  /** 点类型 */
  type?: PointType;
}

/**
 * 边界框接口
 */
export interface Bound2d {
  /** 中心点 */
  center: Point2d;
  /** 获取中心点方法 */
  getCenter(): Point2d;
}

/**
 * 2D曲线基类接口
 */
export interface Curve2d {
  /** 起点 */
  start: Point2d;
  /** 终点 */
  end: Point2d;
  /** 遍历方法 */
  traverse(callback: (element: any) => void): void;
}

/**
 * 2D线段接口
 */
export interface Line2d extends Curve2d {
  /** 中点 */
  readonly middle: Point2d;
  /** 是否为背景线 */
  isBackground(): boolean;
}

/**
 * 2D圆接口
 */
export interface Circle2d extends Curve2d {
  /** 左侧点 */
  readonly leftPoint: Point2d;
  /** 右侧点 */
  readonly rightPoint: Point2d;
  /** 顶部点 */
  readonly topPoint: Point2d;
  /** 底部点 */
  readonly bottomPoint: Point2d;
}

/**
 * 2D圆弧接口
 */
export interface CircleArc2d extends Curve2d {
  /** 中点 */
  readonly middle: Point2d;
}

/**
 * 2D面接口
 */
export interface Face2d {
  /** 外轮廓 */
  outerLoop: {
    bound: Bound2d;
  };
  /** 是否为背景面 */
  isBackground(): boolean;
  /** 遍历方法 */
  traverse(callback: (element: any) => void): void;
}

/**
 * 多边形区域接口
 */
export interface PolygonRegion {
  /** 外轮廓 */
  outer: {
    curves: Curve2d[];
  };
  /** 内孔 */
  holes: Array<{
    curves: Curve2d[];
  }>;
}

/**
 * 2D草图背景接口
 */
export interface Sketch2dBackground {
  /** 区域集合 */
  regions: PolygonRegion[];
  /** 获取第一个外多边形 */
  getFirstPolygonOuter(): Point2d[] | undefined;
}

/**
 * 2D草图接口
 */
export interface Sketch2d {
  /** 背景 */
  background: Sketch2dBackground;
  /** 遍历方法 */
  traverse(callback: (element: any) => void): void;
}

/**
 * 2D草图工具类
 * 提供参考点获取、几何分析等功能
 */
export declare const Sketch2dUtil: {
  /**
   * 点类型定义
   */
  readonly pointTypes: {
    readonly endPoint: "endPoint";
    readonly leftPoint: "leftPoint";
    readonly rightPoint: "rightPoint";
    readonly topPoint: "topPoint";
    readonly bottomPoint: "bottomPoint";
    readonly arcMidPoint: "arcMidPoint";
    readonly lineMidPoint: "lineMidPoint";
    readonly centerPoint: "centerPoint";
    readonly linePoint: "linePoint";
    readonly guideLinePoint: "guideLinePoint";
    readonly parallelToX: "parallelToX";
    readonly parallelToY: "parallelToY";
    readonly perpendicularFoot: "perpendicularFoot";
  };

  /**
   * 可捕捉到线的点类型列表
   */
  readonly snapToLinePointTypes: readonly PointType[];

  /**
   * 获取草图的参考点
   * @param sketch - 2D草图对象
   * @param excludedElements - 需要排除的元素列表
   * @returns 参考点数组
   */
  getReferencePoints(sketch: Sketch2d, excludedElements?: any[]): Point2d[];

  /**
   * 获取背景的参考点
   * @param pointsSet - 点集合
   * @param sketch - 2D草图对象
   */
  getBackgroundReferencePoints(pointsSet: Set<Point2d>, sketch: Sketch2d): void;

  /**
   * 获取面的中心点
   * @param face - 2D面对象
   * @returns 中心点，如果无法获取则返回undefined
   */
  getFaceCenterPoint(face: Face2d): Point2d | undefined;
};