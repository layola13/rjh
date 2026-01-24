import type { Point, Vector, Matrix, Segment, Arc, Line } from '@flatten-js/core';

/**
 * 菱形多边形类
 * 继承自WinPolygon，提供菱形图形的创建、编辑和变换功能
 */
export declare class DiamondPoly extends WinPolygon {
  /**
   * 菱形中心点
   */
  cpt: Point;

  /**
   * 菱形宽度
   */
  width: number;

  /**
   * 菱形高度
   */
  height: number;

  /**
   * 控制尺寸标注标志
   * @returns 始终返回true，表示支持尺寸控制
   */
  get controlDimFlag(): boolean;

  /**
   * 构造函数
   * @param cpt - 菱形中心点
   * @param width - 菱形宽度
   * @param height - 菱形高度
   * @param edges - 边缘数组，如果未提供则通过create方法生成
   */
  constructor(cpt: Point, width: number, height: number, edges?: Array<Segment | Arc>);

  /**
   * 创建菱形的边缘数组
   * @param centerPoint - 中心点
   * @param width - 宽度
   * @param height - 高度
   * @returns 菱形的边缘数组
   */
  static create(centerPoint: Point, width: number, height: number): Array<Segment | Arc>;

  /**
   * 克隆当前菱形对象
   * @returns 新的菱形实例
   */
  protected _clone(): DiamondPoly;

  /**
   * 缩放菱形
   * @param scaleFactor - 缩放因子
   * @returns 缩放后的菱形实例
   */
  scale(scaleFactor: number): this;

  /**
   * 序列化为JSON对象
   * @returns 包含类型、中心点、宽度、高度等信息的JSON对象
   */
  toJSON(): {
    type: PolyType.diamond;
    cpt: PointJSON;
    width: number;
    height: number;
    [key: string]: unknown;
  };

  /**
   * 平移菱形
   * @param offset - 平移向量
   * @returns 平移后的菱形实例
   */
  translate(offset: Vector): this;

  /**
   * 旋转菱形
   * @param angle - 旋转角度（弧度）
   * @param center - 旋转中心点
   * @returns 旋转后的菱形实例
   */
  rotate(angle: number, center: Point): this;

  /**
   * 拖拽边缘进行缩放
   * @param edgeIndex - 边缘索引
   * @param offset - 拖拽偏移向量
   * @param dragPoint - 拖拽起始点，默认为原点
   * @returns 新的菱形实例
   * @throws 当拖拽方向与边缘法向相反时抛出错误
   */
  dragEdge(edgeIndex: number, offset: Vector, dragPoint?: Point): DiamondPoly;

  /**
   * 拖拽顶点调整尺寸
   * @param vertexIndex - 顶点索引
   * @param offset - 拖拽偏移向量
   * @param unused - 未使用参数
   * @param dragPoint - 拖拽起始点，默认为原点
   * @returns 新的菱形实例
   */
  dragVertex(
    vertexIndex: number,
    offset: Vector,
    unused: unknown,
    dragPoint?: Point
  ): DiamondPoly;

  /**
   * 拖拽边缘创建或编辑圆弧
   * @param edgeIndex - 边缘索引
   * @param offset - 拖拽偏移向量
   * @returns 新的菱形实例，边缘可能转换为圆弧
   */
  dragArc(edgeIndex: number, offset: Vector): DiamondPoly;

  /**
   * 初始化尺寸标注信息
   * @returns 每条边的标注信息数组，只有第一条边显示标注
   */
  initDimInfo(): Array<{
    idx: number;
    dimShow: boolean;
  }>;

  /**
   * 编辑尺寸标注时变换图形
   * @param dimIndex - 标注索引
   * @param scaleFactor - 缩放因子
   * @param unused - 未使用参数
   * @returns 变换后的菱形实例
   */
  editDim(dimIndex: number, scaleFactor: number, unused: unknown): this;
}

/**
 * WinPolygon基类（从u模块导入）
 */
declare class WinPolygon {
  edges: Array<Segment | Arc>;
  toJSON(): Record<string, unknown>;
  translate(offset: Vector): this;
  rotate(angle: number, center: Point): this;
  scale(scaleFactor: number): this;
  transform(matrix: Matrix): this;
}

/**
 * 多边形类型枚举
 */
declare enum PolyType {
  diamond = 'diamond',
}

/**
 * 点的JSON表示
 */
interface PointJSON {
  x: number;
  y: number;
}