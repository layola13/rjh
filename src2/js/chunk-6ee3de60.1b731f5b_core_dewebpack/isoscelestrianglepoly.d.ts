import type { Point, Vector, Segment } from './geometry';
import type { WinPolygon, PolygonCreator, PolyType } from './polygon';
import type { EventBus, EventType } from './events';

/**
 * 等腰三角形多边形类
 * 表示一个以中心点、宽度和高度定义的等腰三角形
 */
export declare class IsoscelesTrianglePoly extends WinPolygon {
  /**
   * 三角形的中心点（质心）
   */
  cpt: Point;

  /**
   * 三角形的底边宽度
   */
  width: number;

  /**
   * 三角形的高度（从顶点到底边的垂直距离）
   */
  height: number;

  /**
   * 控制尺寸标志，表示该多边形支持尺寸控制
   */
  get controlDimFlag(): boolean;

  /**
   * 构造函数
   * @param cpt - 三角形的中心点
   * @param width - 底边宽度
   * @param height - 高度
   * @param edges - 边的数组（可选，默认通过create方法生成）
   */
  constructor(cpt: Point, width: number, height: number, edges?: Segment[]);

  /**
   * 创建等腰三角形的边集合
   * @param centerPoint - 中心点
   * @param width - 底边宽度
   * @param height - 高度
   * @returns 三角形的边数组
   */
  static create(centerPoint: Point, width: number, height: number): Segment[];

  /**
   * 调整三角形高度到指定值
   * @param newHeight - 新的高度值
   * @returns 更新后的三角形实例
   */
  heightTo(newHeight: number): IsoscelesTrianglePoly;

  /**
   * 克隆当前三角形
   * @returns 新的三角形实例
   * @internal
   */
  _clone(): IsoscelesTrianglePoly;

  /**
   * 缩放三角形
   * @param scaleFactor - 缩放因子
   * @returns 缩放后的三角形实例
   */
  scale(scaleFactor: number): IsoscelesTrianglePoly;

  /**
   * 序列化为JSON对象
   * @returns 包含三角形数据的JSON对象
   */
  toJSON(): {
    type: typeof PolyType.isoscelesTriangle;
    cpt: ReturnType<Point['toJSON']>;
    width: number;
    height: number;
    [key: string]: unknown;
  };

  /**
   * 平移三角形
   * @param offset - 平移向量
   * @returns 平移后的三角形实例
   */
  translate(offset: Vector): this;

  /**
   * 旋转三角形
   * @param angle - 旋转角度（弧度）
   * @param center - 旋转中心点
   * @returns 旋转后的三角形实例
   */
  rotate(angle: number, center: Point): this;

  /**
   * 拖拽三角形的边
   * @param edgeIndex - 边的索引（0=顶边左，1=底边，2=顶边右）
   * @param dragVector - 拖拽向量
   * @param snapPoint - 吸附点（可选）
   * @returns 新的三角形实例
   */
  dragEdge(edgeIndex: number, dragVector: Vector, snapPoint?: Point): IsoscelesTrianglePoly;

  /**
   * 根据边集合重新计算三角形的宽度、高度和中心点
   * @param edges - 边的数组
   * @internal
   */
  compute(edges: Segment[]): void;

  /**
   * 拖拽三角形的顶点
   * @param vertexIndex - 顶点索引（0=顶点，1=左下顶点，2=右下顶点）
   * @param dragVector - 拖拽向量
   * @param constrainSymmetry - 是否保持对称约束
   * @param snapPoint - 吸附点（可选）
   * @returns 新的三角形实例
   */
  dragVertex(
    vertexIndex: number,
    dragVector: Vector,
    constrainSymmetry?: boolean,
    snapPoint?: Point
  ): IsoscelesTrianglePoly;

  /**
   * 拖拽三角形的弧（对于三角形等同于拖拽边）
   * @param arcIndex - 弧的索引
   * @param dragVector - 拖拽向量
   * @returns 新的三角形实例
   */
  dragArc(arcIndex: number, dragVector: Vector): IsoscelesTrianglePoly;

  /**
   * 编辑三角形的尺寸
   * @param dimensionType - 尺寸类型（0=高度，2=宽度）
   * @param ratio - 尺寸比例
   * @param adjustVector - 调整向量
   * @returns 新的三角形实例
   */
  editDim(dimensionType: number, ratio: number, adjustVector: Vector): IsoscelesTrianglePoly;

  /**
   * 触发框架事件，用于显示三角形设置界面
   * @param event - 包含视图信息的事件对象
   */
  raiseFrameEvent(event: { view: { eventBus: EventBus } }): void;
}

/**
 * 等腰三角形框架设置事件负载
 */
export declare class IsoscelesTriangleFrameSettings {
  constructor(event: unknown, view: unknown);
}