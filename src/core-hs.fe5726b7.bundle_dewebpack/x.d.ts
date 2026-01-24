/**
 * SVG路径解析与转换工具库
 * 提供路径解析、变换、边界框计算和折线提取功能
 */

/** 二维坐标点 */
interface Point {
  x: number;
  y: number;
}

/** 边界框 */
interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
  w: number;
  h: number;
  x2: number;
  y2: number;
  cx: number;
  cy: number;
}

/** 路径命令数组 */
type PathCommand = [string, ...number[]];
type PathArray = PathCommand[];

/** 缓存对象 */
interface CacheEntry {
  sleep: number;
  abs?: PathArray;
  arr?: PathArray;
  curve?: PathArray;
  bbox?: BoundingBox;
}

/** 坐标范围 */
interface CoordinateBounds {
  min: Point;
  max: Point;
}

/**
 * 获取路径的折线表示
 * @param pathArray - 规范化的路径命令数组
 * @returns 折线点集合的二维数组
 */
export declare function getPolylines(pathArray: PathArray): Point[][];

/**
 * 计算路径的边界框
 * @param path - SVG路径字符串或路径命令数组
 * @returns 包含位置、尺寸和中心点的边界框对象
 */
export declare function pathBBox(path: string | PathArray): BoundingBox;

/**
 * 使用变换矩阵变换路径
 * @param path - SVG路径字符串或路径命令数组
 * @param matrix - THREE.Matrix3变换矩阵
 * @returns 变换后的路径命令数组
 */
export declare function transformPath(
  path: string | PathArray,
  matrix: THREE.Matrix3
): PathArray;

/**
 * 对SVG路径应用平移和缩放变换
 * @param path - SVG路径字符串或路径命令数组
 * @param translation - 平移向量 {x, y}
 * @param scale - 缩放因子 {x, y}
 * @returns 变换后的路径命令数组
 */
export declare function transformSvgPath(
  path: string | PathArray,
  translation: Point,
  scale: Point
): PathArray;