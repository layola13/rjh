/**
 * 切割线基类模块
 * 提供各种切割线类型的解析和操作功能
 */

import {
  CompoundLine,
  CompoundLineCircle,
  SimpleLine,
  SimpleInnerArc,
  SpinLine,
  SimpleHalfHexagon,
  CompoundDoubleOctagon,
  CompoundLongOctagon,
  SimpleWave,
  SemiArcPro,
  SemiArcPro2,
  SemiSegmentPro,
  SemiArc,
  HalfWheel
} from './module-30';

/**
 * 可序列化的切割线类型接口
 */
interface SerializableShape {
  deserialize(data: unknown): SerializableShape;
}

/**
 * 切割线基类
 * 用于表示和操作各种类型的切割线
 */
export declare class CutLine {
  /**
   * 内边缘索引，-1表示未设置
   */
  innerEdgeIdx: number;

  /**
   * 外边缘索引，-1表示未设置
   */
  outerEdgeIdx: number;

  /**
   * 切割线类型标识
   */
  type: string;

  /**
   * 构造函数
   * @param type - 切割线类型
   */
  constructor(type: string);

  /**
   * 拖拽顶点
   * @param vertex - 顶点对象
   * @param deltaX - X轴偏移量
   * @param deltaY - Y轴偏移量
   */
  dragVertex(vertex: unknown, deltaX: number, deltaY: number): void;

  /**
   * 拖拽内边缘
   * @param edge - 边缘对象
   * @param deltaX - X轴偏移量
   * @param deltaY - Y轴偏移量
   * @param modifier - 修饰参数
   * @returns 当前实例（支持链式调用）
   */
  dragInnerEdge(edge: unknown, deltaX: number, deltaY: number, modifier: unknown): this;

  /**
   * 拖拽弧线
   * @param arc - 弧线对象
   * @param deltaX - X轴偏移量
   * @param deltaY - Y轴偏移量
   * @returns 当前实例（支持链式调用）
   */
  dragArc(arc: unknown, deltaX: number, deltaY: number): this;

  /**
   * 通用拖拽方法
   * @param element - 被拖拽的元素
   * @param deltaX - X轴偏移量
   * @param deltaY - Y轴偏移量
   */
  drag(element: unknown, deltaX: number, deltaY: number): void;

  /**
   * 平移变换（需在子类中实现）
   * @param delta - 偏移量
   */
  translate(delta: unknown): void;

  /**
   * 是否为尺寸标注生成停靠数据
   */
  readonly generateDockDataForDim: true;

  /**
   * 尺寸标注隐藏位置列表
   */
  readonly dimHiddenPos: readonly [];

  /**
   * 解析复合线数据
   * @param data - 序列化数据
   * @returns 复合线实例
   */
  static parseCompoundLine(data: unknown): CompoundLine;

  /**
   * 解析复合圆线数据
   * @param data - 序列化数据
   * @returns 复合圆线实例
   */
  static parseCompoundLineCircle(data: unknown): CompoundLineCircle;

  /**
   * 解析简单线数据
   * @param data - 序列化数据
   * @returns 简单线实例
   */
  static parseSimpleLine(data: unknown): SimpleLine;

  /**
   * 解析简单内弧数据
   * @param data - 序列化数据
   * @returns 简单内弧实例
   */
  static parseSimpleInnerArc(data: unknown): SimpleInnerArc;

  /**
   * 解析旋转线数据
   * @param data - 序列化数据
   * @returns 旋转线实例
   */
  static parseSpinLine(data: unknown): SpinLine;

  /**
   * 解析半六边形数据
   * @param data - 序列化数据
   * @returns 半六边形实例
   */
  static parseHalfHexagon(data: unknown): SimpleHalfHexagon;

  /**
   * 解析双八边形数据
   * @param data - 序列化数据
   * @returns 双八边形实例
   */
  static parseDoubleOctagon(data: unknown): CompoundDoubleOctagon;

  /**
   * 解析长八边形数据
   * @param data - 序列化数据
   * @returns 长八边形实例
   */
  static parseLongOctagon(data: unknown): CompoundLongOctagon;

  /**
   * 解析简单弧线（波浪线）数据
   * @param data - 序列化数据
   * @returns 简单弧线实例
   */
  static parseSimpleArc(data: unknown): SimpleWave;

  /**
   * 解析半弧Pro数据
   * @param data - 序列化数据
   * @returns 半弧Pro实例
   */
  static parseSemiArcPro(data: unknown): SemiArcPro;

  /**
   * 解析半弧Pro2数据
   * @param data - 序列化数据
   * @returns 半弧Pro2实例
   */
  static parseSemiArcPro2(data: unknown): SemiArcPro2;

  /**
   * 解析半段Pro数据
   * @param data - 序列化数据
   * @returns 半段Pro实例
   */
  static parseSemiSegmentPro(data: unknown): SemiSegmentPro;

  /**
   * 解析半弧数据
   * @param data - 序列化数据
   * @returns 半弧实例
   */
  static parseSemiArc(data: unknown): SemiArc;

  /**
   * 解析半轮数据
   * @param data - 序列化数据
   * @returns 半轮实例
   */
  static parseHalfWheel(data: unknown): HalfWheel;
}