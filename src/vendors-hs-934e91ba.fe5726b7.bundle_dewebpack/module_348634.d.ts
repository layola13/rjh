/**
 * 迭代器值类型
 */
interface IteratorValue<T> {
  /** 当前迭代的值 */
  value: T | undefined;
  /** 是否已完成迭代 */
  done: boolean;
}

/**
 * 二维坐标点
 */
export interface Point {
  /** X 坐标 */
  x: number;
  /** Y 坐标 */
  y: number;
}

/**
 * 路径 - 由多个点组成的数组
 */
export type Path = Point[];

/**
 * 多路径 - 由多个路径组成的数组
 */
export type Paths = Path[];

/**
 * 多边形树节点
 */
export interface PolyNode {
  /** 轮廓路径 */
  contour: Path;
  /** 子节点列表 */
  childs: PolyNode[];
  /** 是否为开放路径 */
  isOpen: boolean;
}

/**
 * 多边形填充类型枚举
 */
export enum PolyFillType {
  EvenOdd = 0,
  NonZero = 1,
  Positive = 2,
  Negative = 3
}

/**
 * 原生路径对象接口（与底层 C++ 模块交互）
 */
export interface NativePath {
  /** 删除原生对象 */
  delete(): void;
  /** 检查是否已删除 */
  isDeleted(): boolean;
}

/**
 * 原生路径集合接口
 */
export interface NativePaths extends NativePath {
  /** 路径数量 */
  length: number;
}

/**
 * Clipper 库主接口
 */
export interface ClipperLib {
  /** 原生路径类 */
  Paths: new () => NativePaths;
  
  /** 清理单个多边形 */
  cleanPolygon(path: NativePath, distance: number): void;
  
  /** 清理多个多边形 */
  cleanPolygons(paths: NativePaths, distance: number): void;
  
  /** Minkowski 差集运算 */
  minkowskiDiff(pattern: NativePath, path: NativePath, result: NativePaths): void;
  
  /** Minkowski 和运算（单路径） */
  minkowskiSumPath(pattern: NativePath, path: NativePath, result: NativePaths, pathIsClosed: boolean): void;
  
  /** Minkowski 和运算（多路径） */
  minkowskiSumPaths(pattern: NativePath, paths: NativePaths, result: NativePaths, pathIsClosed: boolean): void;
  
  /** 简化单个多边形 */
  simplifyPolygon(path: NativePath, result: NativePaths, fillType: number): void;
  
  /** 简化多个多边形（覆盖原数据） */
  simplifyPolygonsOverwrite(paths: NativePaths, fillType: number): void;
}

/**
 * 计算多边形面积
 * @param path - 多边形路径
 * @returns 面积值（正值表示顺时针，负值表示逆时针）
 */
export function area(path: Path): number;

/**
 * 清理单个多边形（移除自相交和共线点）
 * @param clipperLib - Clipper 库实例
 * @param path - 输入路径
 * @param distance - 清理距离阈值，默认 1.1415
 * @returns 清理后的路径
 */
export function cleanPolygon(clipperLib: ClipperLib, path: Path, distance?: number): Path;

/**
 * 清理多个多边形
 * @param clipperLib - Clipper 库实例
 * @param paths - 输入路径集合
 * @param distance - 清理距离阈值，默认 1.1415
 * @returns 清理后的路径集合
 */
export function cleanPolygons(clipperLib: ClipperLib, paths: Paths, distance?: number): Paths;

/**
 * 从多边形树提取所有闭合路径
 * @param polyTree - 多边形树根节点
 * @returns 闭合路径集合
 */
export function closedPathsFromPolyTree(polyTree: PolyNode): Paths;

/**
 * Minkowski 差集运算（形态学腐蚀）
 * @param clipperLib - Clipper 库实例
 * @param pattern - 模板路径
 * @param path - 目标路径
 * @returns 结果路径集合
 */
export function minkowskiDiff(clipperLib: ClipperLib, pattern: Path, path: Path): Paths;

/**
 * Minkowski 和运算（单路径，形态学膨胀）
 * @param clipperLib - Clipper 库实例
 * @param pattern - 模板路径
 * @param path - 目标路径
 * @param pathIsClosed - 路径是否闭合
 * @returns 结果路径集合
 */
export function minkowskiSumPath(clipperLib: ClipperLib, pattern: Path, path: Path, pathIsClosed: boolean): Paths;

/**
 * Minkowski 和运算（多路径）
 * @param clipperLib - Clipper 库实例
 * @param pattern - 模板路径
 * @param paths - 目标路径集合
 * @param pathIsClosed - 路径是否闭合
 * @returns 结果路径集合
 */
export function minkowskiSumPaths(clipperLib: ClipperLib, pattern: Path, paths: Paths, pathIsClosed: boolean): Paths;

/**
 * 从多边形树提取所有开放路径
 * @param polyTree - 多边形树根节点
 * @returns 开放路径集合
 */
export function openPathsFromPolyTree(polyTree: PolyNode): Paths;

/**
 * 判断多边形方向
 * @param path - 多边形路径
 * @returns true 表示逆时针，false 表示顺时针
 */
export function orientation(path: Path): boolean;

/**
 * 判断点是否在多边形内
 * @param point - 待测试点
 * @param path - 多边形路径
 * @returns 0=外部, 1=内部, -1=在边界上
 */
export function pointInPolygon(point: Point, path: Path): number;

/**
 * 将多边形树转换为路径集合
 * @param polyTree - 多边形树根节点
 * @returns 所有路径集合
 */
export function polyTreeToPaths(polyTree: PolyNode): Paths;

/**
 * 反转单个路径的顶点顺序
 * @param path - 输入路径（会被原地修改）
 */
export function reversePath(path: Path): void;

/**
 * 反转多个路径的顶点顺序
 * @param paths - 输入路径集合（会被原地修改）
 */
export function reversePaths(paths: Paths): void;

/**
 * 简化单个多边形（移除自相交）
 * @param clipperLib - Clipper 库实例
 * @param path - 输入路径
 * @param fillType - 填充规则，默认 EvenOdd
 * @returns 简化后的路径集合
 */
export function simplifyPolygon(clipperLib: ClipperLib, path: Path, fillType?: PolyFillType): Paths;

/**
 * 简化多个多边形
 * @param clipperLib - Clipper 库实例
 * @param paths - 输入路径集合
 * @param fillType - 填充规则，默认 EvenOdd
 * @returns 简化后的路径集合
 */
export function simplifyPolygons(clipperLib: ClipperLib, paths: Paths, fillType?: PolyFillType): Paths;

/**
 * 缩放单个路径
 * @param path - 输入路径
 * @param scale - 缩放因子
 * @returns 缩放后的路径
 */
export function scalePath(path: Path, scale: number): Path;

/**
 * 缩放多个路径
 * @param paths - 输入路径集合
 * @param scale - 缩放因子
 * @returns 缩放后的路径集合
 */
export function scalePaths(paths: Paths, scale: number): Paths;