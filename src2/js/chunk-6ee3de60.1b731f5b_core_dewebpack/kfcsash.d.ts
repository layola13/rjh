import { Direction, EdgeFinder } from './edge-finder';
import { EdgeJointWay } from './edge-joint';
import { FrameManager, KfcSashHardwareManager } from './managers';
import { PushSash, ShapeType, HardwareShape } from './sash';

/**
 * KFC推拉窗扇类
 * 继承自PushSash，提供KFC风格的窗扇功能
 */
export declare class KfcSash extends PushSash {
  /**
   * 框架管理器，负责管理窗扇的边框
   */
  frameManager: FrameManager;

  /**
   * 硬件管理器，负责管理KFC窗扇的五金件（把手、铰链等）
   */
  hardwareManager: KfcSashHardwareManager;

  /**
   * 是否为门类型
   */
  isDoor: boolean;

  /**
   * 是否带转角框架
   */
  withTurningFrame: boolean;

  /**
   * 内部存储：上下边框是否使用大尺寸
   */
  private _largeUpDownSize: boolean;

  /**
   * 构造函数
   * @param polygon - 窗扇的多边形形状
   * @param parent - 父级对象
   * @param options - 可选配置参数
   */
  constructor(polygon: unknown, parent: unknown, options?: unknown);

  /**
   * 初始化推拉窗扇
   * 基类方法的实现
   */
  initPushSash(): void;

  /**
   * 获取或设置上下边框是否使用大尺寸（2倍型材尺寸）
   * 当设置为true时，上边和下边的宽度将变为2倍型材尺寸
   * 当设置为false时，所有边框恢复为标准型材尺寸
   */
  get largeUpDownSize(): boolean;
  set largeUpDownSize(value: boolean);

  /**
   * 序列化为JSON对象
   * @returns 包含窗扇所有属性的JSON对象
   */
  toJSON(): KfcSashJSON;

  /**
   * 从JSON对象反序列化
   * @param data - 序列化的JSON数据
   * @returns 当前实例（支持链式调用）
   */
  deserialize(data: KfcSashJSON): this;

  /**
   * 拖动中梃（窗框中间的分隔条）
   * @param mullion - 要拖动的中梃对象
   * @param offset - 拖动的偏移量
   * @returns 是否成功拖动
   */
  dragMullion(mullion: unknown, offset: unknown): boolean;

  /**
   * 更新多边形形状
   * 内部方法，用于在属性变化后更新几何形状
   */
  protected updatePoly(): void;

  /**
   * 底部尺寸对象
   * 包含updatePoly方法用于更新底部区域的多边形
   */
  protected bottomDim: {
    updatePoly(): void;
  };

  /**
   * 型材尺寸
   * 用于计算边框宽度的基础值
   */
  protected profileSize: number;
}

/**
 * KfcSash序列化后的JSON数据结构
 */
export interface KfcSashJSON {
  /**
   * 是否为门类型
   */
  isDoor?: boolean;

  /**
   * 是否带转角框架
   */
  wtf?: boolean;

  /**
   * 上下边框是否使用大尺寸（large up-down size的缩写）
   */
  luds?: boolean;

  /**
   * 继承自PushSash的其他属性
   */
  [key: string]: unknown;
}