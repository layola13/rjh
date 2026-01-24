/**
 * ClipperLib 类型定义文件
 * 
 * ClipperLib 是一个用于多边形和线段裁剪、偏移和布尔运算的库。
 * 该模块将 ClipperLib 挂载到全局对象上供使用。
 * 
 * @module module_375323
 * @see {@link http://www.angusj.com/delphi/clipper.php} ClipperLib 官方文档
 */

/**
 * 二维坐标点
 */
export interface IntPoint {
  /** X 坐标 */
  X: number;
  /** Y 坐标 */
  Y: number;
}

/**
 * 多边形路径（坐标点数组）
 */
export type Path = IntPoint[];

/**
 * 多个多边形路径的集合
 */
export type Paths = Path[];

/**
 * 裁剪操作类型枚举
 */
export enum ClipType {
  /** 交集 */
  ctIntersection = 0,
  /** 并集 */
  ctUnion = 1,
  /** 差集 */
  ctDifference = 2,
  /** 异或 */
  ctXor = 3
}

/**
 * 多边形填充类型枚举
 */
export enum PolyFillType {
  /** 偶奇填充规则 */
  pftEvenOdd = 0,
  /** 非零填充规则 */
  pftNonZero = 1,
  /** 正数填充规则 */
  pftPositive = 2,
  /** 负数填充规则 */
  pftNegative = 3
}

/**
 * 路径连接类型枚举（用于偏移操作）
 */
export enum JoinType {
  /** 方形连接 */
  jtSquare = 0,
  /** 圆形连接 */
  jtRound = 1,
  /** 斜接连接 */
  jtMiter = 2
}

/**
 * 路径端点类型枚举（用于偏移操作）
 */
export enum EndType {
  /** 闭合多边形 */
  etClosedPolygon = 0,
  /** 闭合线段 */
  etClosedLine = 1,
  /** 开放端点使用方形 */
  etOpenSquare = 2,
  /** 开放端点使用圆形 */
  etOpenRound = 3,
  /** 开放端点使用对接 */
  etOpenButt = 4
}

/**
 * 裁剪器主类
 * 用于执行多边形的布尔运算和裁剪操作
 */
export class Clipper {
  /**
   * 添加路径到裁剪器
   * @param paths - 要添加的路径集合
   * @param polyType - 多边形类型（主体或裁剪路径）
   * @param closed - 路径是否闭合
   * @returns 是否成功添加
   */
  AddPaths(paths: Paths, polyType: PolyType, closed: boolean): boolean;

  /**
   * 添加单个路径到裁剪器
   * @param path - 要添加的路径
   * @param polyType - 多边形类型（主体或裁剪路径）
   * @param closed - 路径是否闭合
   * @returns 是否成功添加
   */
  AddPath(path: Path, polyType: PolyType, closed: boolean): boolean;

  /**
   * 执行裁剪操作
   * @param clipType - 裁剪类型（交集、并集、差集、异或）
   * @param solution - 输出结果路径集合
   * @param fillType - 填充类型
   * @returns 是否执行成功
   */
  Execute(
    clipType: ClipType,
    solution: Paths,
    fillType?: PolyFillType
  ): boolean;

  /**
   * 清除所有已添加的路径
   */
  Clear(): void;
}

/**
 * 多边形类型枚举
 */
export enum PolyType {
  /** 主体多边形 */
  ptSubject = 0,
  /** 裁剪多边形 */
  ptClip = 1
}

/**
 * 偏移器类
 * 用于对路径进行偏移（扩大或缩小）操作
 */
export class ClipperOffset {
  /**
   * 构造函数
   * @param miterLimit - 斜接限制（默认 2.0）
   * @param arcTolerance - 圆弧容差（默认 0.25）
   */
  constructor(miterLimit?: number, arcTolerance?: number);

  /**
   * 添加路径到偏移器
   * @param paths - 要偏移的路径集合
   * @param joinType - 连接类型
   * @param endType - 端点类型
   */
  AddPaths(paths: Paths, joinType: JoinType, endType: EndType): void;

  /**
   * 添加单个路径到偏移器
   * @param path - 要偏移的路径
   * @param joinType - 连接类型
   * @param endType - 端点类型
   */
  AddPath(path: Path, joinType: JoinType, endType: EndType): void;

  /**
   * 执行偏移操作
   * @param solution - 输出结果路径集合
   * @param delta - 偏移距离（正数扩大，负数缩小）
   */
  Execute(solution: Paths, delta: number): void;

  /**
   * 清除所有已添加的路径
   */
  Clear(): void;
}

/**
 * ClipperLib 主命名空间
 * 包含所有裁剪库相关的类、枚举和工具函数
 */
export interface ClipperLib {
  /** 裁剪器类 */
  Clipper: typeof Clipper;
  /** 偏移器类 */
  ClipperOffset: typeof ClipperOffset;
  /** 坐标点构造函数 */
  IntPoint: new (x?: number, y?: number) => IntPoint;
  /** 裁剪类型枚举 */
  ClipType: typeof ClipType;
  /** 填充类型枚举 */
  PolyFillType: typeof PolyFillType;
  /** 连接类型枚举 */
  JoinType: typeof JoinType;
  /** 端点类型枚举 */
  EndType: typeof EndType;
  /** 多边形类型枚举 */
  PolyType: typeof PolyType;

  /**
   * 简化多边形路径
   * @param paths - 要简化的路径集合
   * @param fillType - 填充类型
   * @returns 简化后的路径集合
   */
  SimplifyPolygons(paths: Paths, fillType?: PolyFillType): Paths;

  /**
   * 清理多边形路径（移除自相交）
   * @param path - 要清理的路径
   * @returns 清理后的路径集合
   */
  CleanPolygon(path: Path): Path;

  /**
   * 清理多个多边形路径
   * @param paths - 要清理的路径集合
   * @returns 清理后的路径集合
   */
  CleanPolygons(paths: Paths): Paths;
}

/**
 * 全局对象扩展
 * ClipperLib 会被挂载到全局对象上
 */
declare global {
  interface Window {
    /** ClipperLib 全局实例 */
    ClipperLib: ClipperLib;
  }

  namespace NodeJS {
    interface Global {
      /** ClipperLib 全局实例 */
      ClipperLib: ClipperLib;
    }
  }
}

/**
 * 导出 ClipperLib 模块
 * 该模块从内部模块（ID: 928435）导入 ClipperLib 并挂载到全局对象
 */
declare const clipperLib: ClipperLib;
export default clipperLib;