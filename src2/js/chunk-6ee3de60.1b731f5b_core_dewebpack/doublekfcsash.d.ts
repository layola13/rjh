import type { Vector2d } from './vector';
import type { PolyId } from './polyId';
import type { DoubleSash, KfcSash, WinPolygon, ShapeType } from './sash';
import type { Direction } from './direction';
import type { OpenToward } from './openToward';
import type { EventBus, EventType } from './event';
import type { HardwareManager } from './hardwareManager';

/**
 * 双扇KFC推拉窗/门配置接口
 */
export interface IDoubleKfcSashJSON {
  /** 窗扇类型 */
  type: ShapeType;
  /** 多边形ID */
  polyId: Record<string, unknown>;
  /** 是否启用 */
  enabled: boolean;
  /** 偏移向量 */
  offvec: { x: number; y: number };
  /** 开启方向 */
  openToward: OpenToward;
  /** 是否为门 */
  isDoor: boolean;
  /** 子窗扇配置数组 */
  sashes: unknown[];
}

/**
 * KFC窗扇设置事件载荷
 */
export declare class KfcSashSettings {
  constructor(hardwareManager: HardwareManager, context: unknown);
}

/**
 * 双扇KFC推拉窗/门组件
 * 
 * 继承自DoubleSash，实现双扇推拉窗的创建、配置和管理功能。
 * 支持序列化/反序列化、窗扇分割、五金件配置等功能。
 * 
 * @extends DoubleSash
 */
export declare class DoubleKfcSash extends DoubleSash {
  /**
   * 多边形标识符
   */
  polyId: PolyId;

  /**
   * 是否为门类型
   * @default true
   */
  isDoor: boolean;

  /**
   * 是否带转角框
   * @default false
   */
  withTurningFrame: boolean;

  /**
   * 内部窗扇数组（包含禁用的窗扇）
   * @private
   */
  private _sashes: KfcSash[];

  /**
   * 构造函数
   * 
   * @param parent - 父级对象
   * @param polygon - 窗扇多边形
   * @param polyId - 多边形ID
   */
  constructor(parent: unknown, polygon: WinPolygon, polyId: PolyId);

  /**
   * 初始化双扇窗配置
   * @protected
   */
  protected initDoubleSash(): void;

  /**
   * 获取所有已启用的窗扇
   * @returns 已启用窗扇数组
   */
  get sashes(): KfcSash[];

  /**
   * 获取已启用窗扇数量
   * @returns 窗扇数量
   */
  get sashCount(): number;

  /**
   * 获取窗扇Z轴层级
   * 
   * 根据开启方向决定层级：
   * - 外开：0（顶层）
   * - 内开：-1（底层）
   * 
   * @returns Z轴索引值
   */
  get Zindex(): number;

  /**
   * 序列化为JSON对象
   * 
   * @returns 包含所有配置信息的JSON对象
   */
  toJSON(): IDoubleKfcSashJSON;

  /**
   * 从JSON对象反序列化
   * 
   * 恢复窗扇的所有配置，包括：
   * - 多边形ID和启用状态
   * - 偏移向量和开启方向
   * - 门类型标识
   * - 子窗扇配置
   * 
   * @param data - 序列化的JSON数据
   * @returns 当前实例（支持链式调用）
   */
  deserialize(data: IDoubleKfcSashJSON): this;

  /**
   * 创建并配置双扇窗结构
   * 
   * 执行流程：
   * 1. 沿分割点将多边形分为两部分
   * 2. 按X坐标排序（左右窗扇）
   * 3. 调整边缘对接参数
   * 4. 配置每个窗扇的五金件：
   *    - 开启方向（左/右）
   *    - 把手位置和尺寸标注
   *    - 尺寸标注显隐状态
   * 
   * @protected
   */
  protected create(): void;

  /**
   * 触发窗扇设置事件
   * 
   * 向事件总线发送窗扇配置变更事件
   * 
   * @param sash - 目标窗扇
   * @param context - 事件上下文（包含事件总线）
   */
  emitSashSetting(sash: KfcSash, context: { eventBus: EventBus }): void;

  /**
   * 计算指定索引窗扇的开启方向
   * 
   * @param index - 窗扇索引
   * @returns 开启方向
   * @protected
   */
  protected calOpenDirection(index: number): Direction;

  /**
   * 获取分割点坐标
   * 
   * @returns 分割点向量
   * @protected
   */
  protected splitPoint(): Vector2d;
}