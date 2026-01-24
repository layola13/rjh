/**
 * Point2DState - 表示二维空间中的点状态
 * 管理 x 和 y 坐标的状态，支持序列化/反序列化
 */

import { State, StateField } from './State';
import { Entity } from './Entity';

/**
 * 点初始化配置接口
 */
export interface Point2DInitConfig {
  /** 本地标识符 */
  localId: string;
  /** 描述信息 */
  _des: string;
  /** 是否可编辑 */
  isEditable: boolean;
  /** 坐标值引用 */
  value: {
    x: string;
    y: string;
  };
}

/**
 * 状态映射接口
 */
export interface StateMap {
  [key: string]: State;
}

/**
 * 序列化选项接口
 */
export interface DumpOptions {
  [key: string]: unknown;
}

/**
 * 序列化数据接口
 */
export interface DumpData {
  x?: string;
  y?: string;
  [key: string]: unknown;
}

/**
 * 序列化回调函数类型
 */
export type DumpCallback = (data: DumpData[], state: Point2DState) => void;

/**
 * Point2DState 类
 * 继承自 State，用于管理二维点的状态
 */
export declare class Point2DState extends State {
  /** 模型类标识 */
  static readonly Class: typeof HSConstants.ModelClass.Point2DState;

  /** X 坐标状态（装饰器字段） */
  @StateField(State, {
    validate(value: unknown): boolean {
      return this.validateNumberInput('x', value);
    }
  })
  x: number;

  /** Y 坐标状态（装饰器字段） */
  @StateField(State, {
    validate(value: unknown): boolean {
      return this.validateNumberInput('y', value);
    }
  })
  y: number;

  /** 本地标识符 */
  localId: string;

  /** 名称/描述 */
  name: string;

  /** 是否可编辑 */
  isEditable: boolean;

  /** X 坐标内部状态 */
  private __x: State;

  /** Y 坐标内部状态 */
  private __y: State;

  /** 是否可持久化 */
  private __persistable: boolean;

  /**
   * 构造函数
   * @param id - 状态标识符，默认为空字符串
   * @param parent - 父状态对象
   */
  constructor(id?: string, parent?: State);

  /**
   * 初始化点状态
   * @param config - 初始化配置对象
   * @param stateMap - 状态映射表
   */
  init(config: Point2DInitConfig, stateMap: StateMap): void;

  /**
   * 验证状态数据的有效性
   * @returns 验证是否通过
   */
  verify(): boolean;

  /**
   * 序列化前验证
   * @returns 验证是否通过
   */
  verifyBeforeDump(): boolean;

  /**
   * 序列化状态数据
   * @param callback - 序列化完成后的回调函数
   * @param options - 序列化选项
   * @returns 序列化后的数据数组
   */
  dump(callback?: DumpCallback, options?: DumpOptions): DumpData[];

  /**
   * 从序列化数据加载状态
   * @param data - 序列化的数据对象
   * @param options - 加载选项
   */
  load(data: DumpData, options?: DumpOptions): void;

  /**
   * 绑定子状态
   * @param childState - 要绑定的子状态
   */
  protected _bindChildState(childState: State): void;

  /**
   * 触发值变化中事件
   * @param oldValue - 旧值
   * @param newValue - 新值
   */
  protected dispatchValueChanging(oldValue: unknown, newValue: unknown): void;

  /**
   * 触发值已变化事件
   * @param oldValue - 旧值
   * @param newValue - 新值
   */
  protected dispatchValueChanged(oldValue: unknown, newValue: unknown): void;

  /**
   * 验证数字输入
   * @param fieldName - 字段名称
   * @param value - 待验证的值
   * @returns 验证是否通过
   */
  protected validateNumberInput(fieldName: string, value: unknown): boolean;
}

/**
 * 全局常量命名空间（外部依赖）
 */
declare namespace HSConstants {
  namespace ModelClass {
    const Point2DState: string;
  }
}