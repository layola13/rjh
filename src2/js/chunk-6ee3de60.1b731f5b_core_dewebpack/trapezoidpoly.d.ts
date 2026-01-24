import type { Point, Vector, Segment } from './geometry';
import type { Direction } from './Direction';
import type { WinPolygon } from './WinPolygon';
import type { EventBus, View } from './events';

/**
 * 梯形多边形类
 * 继承自 WinPolygon，用于创建和操作梯形窗户多边形
 */
export declare class TrapezoidPoly extends WinPolygon {
  /**
   * 梯形中心点
   */
  cpt: Point;

  /**
   * 梯形方向（上/下/左/右）
   */
  direction: Direction;

  /**
   * 梯形底边宽度
   */
  width: number;

  /**
   * 梯形左侧高度
   */
  leftHeight: number;

  /**
   * 梯形右侧高度
   */
  rightHeight: number;

  /**
   * 构造函数
   * @param cpt - 中心点坐标
   * @param direction - 梯形方向，默认为 Direction.Up
   * @param width - 底边宽度，默认为 1440
   * @param leftHeight - 左侧高度，默认为 1000
   * @param rightHeight - 右侧高度，默认为 1880
   * @param edges - 边缘线段数组，可选
   */
  constructor(
    cpt: Point,
    direction?: Direction,
    width?: number,
    leftHeight?: number,
    rightHeight?: number,
    edges?: Segment[]
  );

  /**
   * 获取切角数量
   * @returns 始终返回 1
   */
  get cutAnglesCount(): number;

  /**
   * 获取控制尺寸标志
   * @returns 始终返回 true
   */
  get controlDimFlag(): boolean;

  /**
   * 静态工厂方法：创建梯形边缘
   * @param centerPoint - 中心点
   * @param width - 宽度
   * @param leftHeight - 左侧高度
   * @param rightHeight - 右侧高度
   * @param direction - 方向
   * @returns 边缘线段数组
   */
  static create(
    centerPoint: Point,
    width: number,
    leftHeight: number,
    rightHeight: number,
    direction: Direction
  ): Segment[];

  /**
   * 根据方向获取旋转角度
   * @param direction - 方向枚举值
   * @returns 对应的旋转角度（弧度）
   */
  static angleByDirection(direction: Direction): number | undefined;

  /**
   * 将梯形旋转到指定方向
   * @param targetDirection - 目标方向
   */
  turnTo(targetDirection: Direction): void;

  /**
   * 初始化多边形控制点
   * 为 4 个顶点设置控制属性（非圆弧、端点）
   */
  initPoly(): void;

  /**
   * 初始化尺寸标注信息
   * @returns 尺寸信息数组
   */
  initDimInfo(): Array<{ dimShow: boolean; [key: string]: unknown }>;

  /**
   * 拖拽边缘线段
   * @param edgeIndex - 边缘索引（0-3）
   * @param dragVector - 拖拽向量
   * @param auxiliaryPoint - 辅助点，默认为原点
   * @returns 新的 TrapezoidPoly 实例
   */
  dragEdge(
    edgeIndex: number,
    dragVector: Vector,
    auxiliaryPoint?: Point
  ): TrapezoidPoly;

  /**
   * 拖拽顶点
   * @param vertexIndex - 顶点索引
   * @param dragVector - 拖拽向量
   * @param auxiliaryVector - 辅助向量
   * @param auxiliaryPoint - 辅助点，默认为原点
   * @returns 当前实例（不支持顶点拖拽）
   */
  dragVertex(
    vertexIndex: number,
    dragVector: Vector,
    auxiliaryVector: Vector,
    auxiliaryPoint?: Point
  ): this;

  /**
   * 编辑尺寸标注
   * @param dimensionIndex - 尺寸索引（1/2/3）
   * @param auxiliaryValue - 辅助值
   * @param offset - 偏移向量
   * @returns 新的 TrapezoidPoly 实例
   */
  editDim(
    dimensionIndex: number,
    auxiliaryValue: unknown,
    offset: Vector
  ): TrapezoidPoly;

  /**
   * 缩放梯形
   * @param scaleFactor - 缩放系数
   * @returns 缩放后的实例
   */
  scale(scaleFactor: number): this;

  /**
   * 序列化为 JSON 对象
   * @returns JSON 对象表示
   */
  toJSON(): {
    type: string;
    cpt: object;
    width: number;
    leftHeight: number;
    rightHeight: number;
    direction: Direction;
    [key: string]: unknown;
  };

  /**
   * 平移梯形
   * @param offset - 平移向量
   * @returns 当前实例
   */
  translate(offset: Vector): this;

  /**
   * 旋转梯形
   * @param angle - 旋转角度（弧度）
   * @param center - 旋转中心点
   * @returns 当前实例
   */
  rotate(angle: number, center: Point): this;

  /**
   * 克隆梯形
   * @returns 新的 TrapezoidPoly 实例
   * @private
   */
  _clone(): TrapezoidPoly;

  /**
   * 重新计算边缘交点
   * @param edges - 边缘线段数组
   * @private
   */
  private reIntersect(edges: Segment[]): void;

  /**
   * 触发框架事件
   * @param eventContext - 事件上下文对象，包含 view 属性
   */
  raiseFrameEvent(eventContext: { view: View & { eventBus: EventBus } }): void;
}