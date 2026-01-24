/**
 * Line2Mesh - 用于创建线段网格的工具类
 * 将位置数据和颜色数据转换为可渲染的三角形网格
 */

import { 
  Mesh, 
  Vector3, 
  VertexFormat, 
  Element, 
  AttributeIndex, 
  ComponentType, 
  PrimitiveType, 
  BoundingBox, 
  IndexFormat, 
  App 
} from './engine-types';

/**
 * 默认起始点位置
 */
declare const DEFAULT_START_POSITION: readonly [0, 0, 0];

/**
 * 默认结束点位置
 */
declare const DEFAULT_END_POSITION: readonly [0, 0, 0];

/**
 * 默认起始点颜色 (RGBA)
 */
declare const DEFAULT_START_COLOR: readonly [1, 1, 1, 1];

/**
 * 默认结束点颜色 (RGBA)
 */
declare const DEFAULT_END_COLOR: readonly [1, 1, 1, 1];

/**
 * 临时起始点向量
 */
declare const tempStartVector: Vector3;

/**
 * 临时结束点向量
 */
declare const tempEndVector: Vector3;

/**
 * Line2Mesh 类
 * 继承自 Mesh，用于从位置和颜色数据创建线段网格
 */
export declare class Line2Mesh extends Mesh {
  /**
   * 从位置数组创建线段网格
   * 
   * @param positions - 顶点位置数组，每3个元素表示一个点的xyz坐标
   * @param colors - 可选的颜色数组，每3个(RGB)或4个(RGBA)元素表示一个点的颜色
   * @param meshName - 可选的网格名称，用于标识和调试
   * @returns 创建的 Line2Mesh 实例
   * 
   * @remarks
   * - 位置数组长度必须是3的倍数
   * - 颜色数组如果提供，长度应等于位置数组长度(RGB)或位置数组长度的4/3倍(RGBA)
   * - 每两个顶点构成一条线段
   * - 自动生成三角形网格以渲染线段
   * - 根据顶点数量自动选择16位或32位索引格式
   */
  static setFromPositions(
    positions: number[],
    colors?: number[],
    meshName?: string
  ): Line2Mesh;
}

/**
 * 设置单个顶点的属性数据
 * 
 * @param direction - 顶点在线段横截面上的方向 [x, y]
 * @param startPosition - 线段起始点位置 [x, y, z]
 * @param endPosition - 线段结束点位置 [x, y, z]
 * @param startDistance - 起始点沿路径的累积距离
 * @param endDistance - 结束点沿路径的累积距离
 * @param offset - 顶点偏移参数 [offsetX, offsetY]
 * @param startColor - 起始点颜色 [r, g, b, a]，可选
 * @param endColor - 结束点颜色 [r, g, b, a]，可选
 * @param vertexData - 目标顶点数据数组
 * @param dataOffset - 写入数据的起始偏移量
 * @param meshId - 网格ID，用于拾取或标识
 * 
 * @remarks
 * 顶点数据布局（按顺序）：
 * - direction: [x, y, 0] (3 floats)
 * - startPosition: [x, y, z] (3 floats)
 * - endPosition: [x, y, z] (3 floats) 
 * - startDistance: float
 * - endDistance: float
 * - offset: [x, y] (2 floats)
 * - startColor: [r, g, b, a] (4 floats, 可选)
 * - endColor: [r, g, b, a] (4 floats, 可选)
 * - meshId: float
 */
declare function setVertexAttributes(
  direction: readonly [number, number],
  startPosition: readonly [number, number, number],
  endPosition: readonly [number, number, number],
  startDistance: number,
  endDistance: number,
  offset: readonly [number, number],
  startColor: readonly [number, number, number, number] | undefined,
  endColor: readonly [number, number, number, number] | undefined,
  vertexData: Float32Array,
  dataOffset: number,
  meshId: number
): void;

/**
 * 为单条线段创建8个顶点的数据
 * 每条线段需要8个顶点来构成6个三角形，以渲染带宽度的线段
 * 
 * @param startPosition - 线段起始点位置 [x, y, z]
 * @param endPosition - 线段结束点位置 [x, y, z]
 * @param startDistance - 起始点沿路径的累积距离
 * @param endDistance - 结束点沿路径的累积距离
 * @param startColor - 起始点颜色 [r, g, b, a]
 * @param endColor - 结束点颜色 [r, g, b, a]
 * @param vertexData - 目标顶点数据数组
 * @param baseOffset - 该线段顶点数据的基础偏移量
 * @param meshId - 网格ID
 * 
 * @remarks
 * 8个顶点的布局形成一个矩形带，用于渲染线段：
 * - 顶点0-1: 起始点下方
 * - 顶点2-3: 起始点中心
 * - 顶点4-5: 结束点中心
 * - 顶点6-7: 结束点上方
 */
declare function buildLineSegmentVertices(
  startPosition: readonly [number, number, number],
  endPosition: readonly [number, number, number],
  startDistance: number,
  endDistance: number,
  startColor: readonly [number, number, number, number],
  endColor: readonly [number, number, number, number],
  vertexData: Float32Array,
  baseOffset: number,
  meshId: number
): void;