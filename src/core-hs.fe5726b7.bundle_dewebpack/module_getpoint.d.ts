/**
 * 几何点获取模块
 * @module module_getPoint
 */

/**
 * 表示三维空间中的点
 */
interface Point {
  x: number;
  y: number;
  z: number;
}

/**
 * 包含几何数据和索引的实体对象
 */
interface GeometryEntity {
  /** 几何点数组 */
  geometry: Point[];
  /** 索引数组，用于引用geometry中的点 */
  indices: number[];
}

/**
 * 根据索引从几何实体中获取对应的点
 * @param entity - 包含几何数据和索引的实体对象
 * @param index - 要获取的点在indices数组中的索引位置
 * @returns 返回对应的几何点对象
 * @throws 如果索引越界可能返回undefined
 * @example
 *