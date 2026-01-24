import type { Point, Vector, Matrix, Arc, Segment } from './geometry-types';
import type { WinPolygon, PolyType, PolygonCreator } from './polygon-types';
import type { EventBus, EventType } from './event-types';
import type { Frametify, HalfCircleFrametify, ArcUtils } from './frametify-types';

/**
 * 半圆形多边形类
 * 表示由一条直边和一条半圆弧组成的多边形
 */
export declare class HalfCirclePoly extends WinPolygon {
  /**
   * 半圆的中心点
   */
  cpt: Point;

  /**
   * 半圆的半径
   */
  radius: number;

  /**
   * 底边是否隐藏
   */
  bottomHidden: boolean;

  /**
   * 创建半圆形多边形实例
   * @param centerPoint - 半圆的中心点
   * @param radius - 半圆的半径
   * @param bottomHidden - 底边是否隐藏（默认为 false）
   * @param edges - 边的数组（可选，用于内部创建）
   */
  constructor(
    centerPoint: Point,
    radius: number,
    bottomHidden?: boolean,
    edges?: Array<Segment | Arc>
  );

  /**
   * 控制尺寸标注的标志
   * @returns 始终返回 true，表示支持尺寸控制
   */
  readonly controlDimFlag: boolean;

  /**
   * 获取底边
   * @returns 多边形的第一条边（底部直边）
   */
  readonly bottomEdge: Segment;

  /**
   * 获取圆弧边
   * @returns 多边形的第二条边（半圆弧）
   */
  readonly arcEdge: Arc;

  /**
   * 创建半圆形多边形的边集合
   * @param centerPoint - 中心点
   * @param radius - 半径
   * @returns 边的数组
   */
  static create(centerPoint: Point, radius: number): Array<Segment | Arc>;

  /**
   * 缩放多边形
   * @param scaleFactor - 缩放因子
   * @returns 缩放后的多边形实例
   */
  scale(scaleFactor: number): this;

  /**
   * 将多边形转换为框架化形式
   * @param param1 - 第一个参数
   * @param param2 - 第二个参数
   * @returns 框架化结果
   */
  frametify(param1: unknown, param2: unknown): HalfCircleFrametify;

  /**
   * 克隆当前多边形
   * @returns 新的半圆形多边形实例
   * @private
   */
  _clone(): HalfCirclePoly;

  /**
   * 将多边形序列化为 JSON
   * @returns 包含多边形所有属性的 JSON 对象
   */
  toJSON(): {
    type: PolyType.halfCircle;
    cpt: Record<string, unknown>;
    radius: number;
    bottomHidden: boolean;
    [key: string]: unknown;
  };

  /**
   * 平移多边形
   * @param offset - 平移向量
   * @returns 平移后的多边形实例
   */
  translate(offset: Vector): this;

  /**
   * 旋转多边形
   * @param angle - 旋转角度（弧度）
   * @param center - 旋转中心点
   * @returns 旋转后的多边形实例
   */
  rotate(angle: number, center: Point): this;

  /**
   * 调整多边形大小
   * @param width - 新的宽度（可选）
   * @param height - 新的高度（可选）
   * @returns 调整大小后的新多边形实例
   */
  resize(width?: number, height?: number): HalfCirclePoly;

  /**
   * 拖动边以修改多边形
   * @param edgeIndex - 边的索引（0=底边, 1=圆弧）
   * @param dragOffset - 拖动偏移量
   * @param currentPoint - 当前鼠标位置（默认为原点）
   * @returns 修改后的新多边形实例
   */
  dragEdge(
    edgeIndex: number,
    dragOffset: Vector,
    currentPoint?: Point
  ): HalfCirclePoly;

  /**
   * 拖动顶点以修改多边形
   * @param vertexIndex - 顶点索引
   * @param dragOffset - 拖动偏移量
   * @param param3 - 第三个参数
   * @param currentPoint - 当前鼠标位置（默认为原点）
   * @returns 修改后的新多边形实例
   */
  dragVertex(
    vertexIndex: number,
    dragOffset: Vector,
    param3: unknown,
    currentPoint?: Point
  ): HalfCirclePoly;

  /**
   * 拖动圆弧以修改多边形
   * @param edgeIndex - 边的索引
   * @param dragOffset - 拖动偏移量
   * @returns 修改后的新多边形实例
   * @throws 当 edgeIndex 不是 0 或 1 时抛出错误
   */
  dragArc(edgeIndex: number, dragOffset: Vector): HalfCirclePoly;

  /**
   * 编辑尺寸标注
   * @param param1 - 第一个参数
   * @param scaleFactor - 缩放因子
   * @param param3 - 第三个参数
   * @returns 变换后的多边形实例
   */
  editDim(param1: unknown, scaleFactor: number, param3: unknown): this;

  /**
   * 初始化尺寸标注信息
   * @returns 尺寸标注信息数组
   */
  initDimInfo(): Array<{
    /** 边的索引 */
    idx: number;
    /** 是否显示尺寸标注 */
    dimShow: boolean;
  }>;

  /**
   * 触发框架事件
   * @param event - 包含视图和事件总线的事件对象
   */
  raiseFrameEvent(event: {
    view: {
      eventBus: EventBus;
    };
  }): void;
}

/**
 * 半圆形框架设置事件的载荷
 */
export declare class HalfCircleFrameSettings {
  /**
   * @param event - 事件对象
   * @param view - 视图对象
   */
  constructor(event: unknown, view: unknown);
}