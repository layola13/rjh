/**
 * 2D线段模块
 * 提供2D线段的序列化/反序列化和几何操作功能
 */

import type { Curve2d, Curve2d_IO } from './Curve2d';
import type { Entity } from './Entity';
import type { Point2d } from './Point2d';
import type { Vec2, Coordinate } from './Vec2';
import type { Bound2d } from './Bound2d';

/**
 * 序列化/反序列化选项
 */
export interface IOOptions {
  [key: string]: unknown;
}

/**
 * 线段转储数据格式
 */
export interface Line2dDumpData {
  /** 起点ID */
  start?: string;
  /** 终点ID */
  end?: string;
  /** 线段节点ID数组 [startId, endId] */
  ln?: [string, string];
  [key: string]: unknown;
}

/**
 * 转储回调函数
 */
export type DumpCallback = (dumpData: unknown[], entity: Line2d) => void;

/**
 * Line2d的IO处理器
 * 负责Line2d实体的序列化和反序列化操作
 */
export declare class Line2d_IO extends Curve2d_IO {
  /** 单例实例 */
  private static _Line2d_IO_Instance?: Line2d_IO;

  /**
   * 获取Line2d_IO单例实例
   * @returns Line2d_IO实例
   */
  static instance(): Line2d_IO;

  /**
   * 将Line2d实体序列化为数据对象
   * @param entity - 要序列化的Line2d实体
   * @param callback - 序列化完成后的回调函数
   * @param includeMetadata - 是否包含元数据，默认true
   * @param options - 序列化选项
   * @returns 序列化后的数据数组
   */
  dump(
    entity: Line2d,
    callback?: DumpCallback,
    includeMetadata?: boolean,
    options?: IOOptions
  ): unknown[];

  /**
   * 从数据对象加载并填充Line2d实体
   * @param entity - 要填充的Line2d实体
   * @param data - 序列化的数据对象
   * @param options - 加载选项
   */
  load(entity: Line2d, data: Line2dDumpData, options?: IOOptions): void;
}

/**
 * 2D线段实体
 * 表示由起点和终点定义的直线段
 */
export declare class Line2d extends Curve2d {
  /** 线段起点 */
  private __start?: Point2d;

  /** 线段终点 */
  private __end?: Point2d;

  /**
   * 构造函数
   * @param id - 实体ID，默认为空字符串
   * @param parent - 父实体
   */
  constructor(id?: string, parent?: Entity);

  /**
   * 创建Line2d实例的工厂方法
   * @param start - 起点
   * @param end - 终点
   * @returns 新创建的Line2d实例
   */
  static create(start: Point2d, end: Point2d): Line2d;

  /**
   * 设置起点（内部方法）
   * @param point - 新的起点
   */
  private _setStart(point: Point2d): void;

  /**
   * 设置终点（内部方法）
   * @param point - 新的终点
   */
  private _setEnd(point: Point2d): void;

  /**
   * 线段起点
   * 使用EntityField装饰器，修改时会调用_setStart
   */
  start: Point2d;

  /**
   * 线段终点
   * 使用EntityField装饰器，修改时会调用_setEnd
   */
  end: Point2d;

  /**
   * 获取线段的所有关键点
   * @returns 包含起点和终点的数组
   */
  get points(): Coordinate[];

  /**
   * 获取起点（from别名）
   */
  get from(): Point2d;

  /**
   * 设置起点（from别名）
   */
  set from(point: Point2d);

  /**
   * 获取终点（to别名）
   */
  get to(): Point2d;

  /**
   * 设置终点（to别名）
   */
  set to(point: Point2d);

  /**
   * 获取线段长度
   * @returns 起点到终点的欧几里得距离
   */
  get length(): number;

  /**
   * 获取几何数据
   * @returns 起点和终点的几何数据数组
   */
  get geometry(): unknown[];

  /**
   * 获取线段的唯一键
   * 基于起点和终点ID生成（按字母顺序排序保证一致性）
   * @returns 格式为"Line2d-{id1}-{id2}"的字符串
   */
  get key(): string;

  /**
   * 获取线段中点
   * @returns 起点和终点的中点坐标
   */
  get middle(): Vec2 | undefined;

  /**
   * 获取线段方向向量
   * @returns 从起点指向终点的向量
   */
  get direction(): Vec2;

  /**
   * 获取离散点集合
   * @returns 线段的离散化点数组
   */
  get discretePoints(): Coordinate[];

  /**
   * 获取对应的IO处理器
   * @returns Line2d_IO实例
   */
  getIO(): Line2d_IO;

  /**
   * 转换为THREE.js的Line3对象
   * @returns THREE.Line3实例
   */
  toTHREECurve(): THREE.Line3;

  /**
   * 刷新内部边界框
   * 根据起点和终点重新计算边界
   */
  protected refreshBoundInternal(): void;

  /**
   * 偏移线段
   * @param offsetX - X方向偏移量
   * @param offsetY - Y方向偏移量
   */
  offset(offsetX: number, offsetY: number): void;

  /**
   * 创建子曲线（线段的一部分）
   * @param start - 子曲线起点或Point2d实例
   * @param end - 子曲线终点或Point2d实例
   * @returns 新的Line2d实例
   */
  createSubCurve(start: Coordinate | Point2d, end: Coordinate | Point2d): Line2d;

  /**
   * 获取指定参数处的切线向量
   * @param t - 参数值（对于直线段，该值不影响结果）
   * @returns 切线向量（即方向向量）
   */
  getTangent(t: number): Vec2;

  /**
   * 获取线段的离散点表示
   * @returns 包含起点和终点坐标的数组
   */
  getDiscretePoints(): Coordinate[];

  /**
   * 验证线段的有效性
   * 检查起点和终点是否为有效的Point2d实例且为子实体
   * @returns 验证是否通过
   */
  verify(): boolean;

  /**
   * 字段变更回调
   * 当start或end字段变化时标记几何为脏
   * @param fieldName - 变更的字段名
   * @param newValue - 新值
   * @param oldValue - 旧值
   */
  protected onFieldChanged(fieldName: string, newValue: unknown, oldValue: unknown): void;
}