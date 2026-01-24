/**
 * 2D圆弧状态类
 * 用于表示和管理2D空间中的圆弧对象状态
 * @module Arc2DState
 */

import { State, StateField } from './State';
import { Entity } from './Entity';

/**
 * 2D点坐标接口
 */
export interface Point2D {
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
}

/**
 * 圆弧初始化数据接口
 */
export interface Arc2DInitData {
  /** 本地唯一标识符 */
  localId: string;
  /** 描述信息 */
  _des: string;
  /** 是否可编辑 */
  isEditable: boolean;
  /** 值对象，包含x、y、centerAngle的引用ID */
  value: {
    x: string;
    y: string;
    centerAngle: string;
  };
}

/**
 * 状态映射表接口
 */
export interface StateMap {
  [id: string]: State;
}

/**
 * 序列化配置选项
 */
export interface DumpOptions {
  [key: string]: unknown;
}

/**
 * 序列化后的圆弧数据
 */
export interface Arc2DDump {
  /** 状态ID */
  id: string;
  /** X坐标状态ID */
  x: string;
  /** Y坐标状态ID */
  y: string;
  /** 中心角状态ID */
  centerAngle: string;
  /** 其他继承属性 */
  [key: string]: unknown;
}

/**
 * 序列化回调函数类型
 */
export type DumpCallback = (result: Arc2DDump[], instance: Arc2DState) => void;

/**
 * 2D圆弧状态类
 * 管理圆弧的中心点坐标(x, y)和中心角度
 * 支持序列化/反序列化、状态验证和离散点计算
 */
export declare class Arc2DState extends State {
  /** 模型类标识符 */
  static readonly Class: number;

  /** 本地唯一标识符 */
  localId: string;

  /** 名称/描述 */
  name: string;

  /** 是否可编辑 */
  isEditable: boolean;

  /** 内部X坐标状态 */
  private __x: State;

  /** 内部Y坐标状态 */
  private __y: State;

  /** 内部中心角状态 */
  private __centerAngle: State;

  /**
   * X坐标（圆心横坐标）
   * @StateField 带验证装饰器
   */
  x: number;

  /**
   * Y坐标（圆心纵坐标）
   * @StateField 带验证装饰器
   */
  y: number;

  /**
   * 中心角（度数）
   * @StateField 带验证装饰器
   */
  centerAngle: number;

  /**
   * 构造函数
   * @param id - 状态唯一标识符，默认为空字符串
   * @param parent - 父状态对象
   */
  constructor(id?: string, parent?: State);

  /**
   * 初始化圆弧状态
   * @param data - 初始化数据
   * @param stateMap - 状态映射表，用于查找子状态
   */
  init(data: Arc2DInitData, stateMap: StateMap): void;

  /**
   * 计算圆弧的离散点集合
   * 根据起点、终点和中心角，沿圆弧路径生成离散采样点
   * @param startPoint - 起始点坐标
   * @param endPoint - 结束点坐标
   * @returns 离散点数组
   */
  getDiscretePoints(startPoint: Point2D, endPoint: Point2D): Point2D[];

  /**
   * 验证状态有效性
   * 检查ID、持久化标志及子状态的验证结果
   * @returns 验证是否通过
   */
  verify(): boolean;

  /**
   * 序列化前验证
   * @returns 验证是否通过
   */
  verifyBeforeDump(): boolean;

  /**
   * 序列化状态为可持久化数据
   * @param callback - 序列化完成后的回调函数
   * @param options - 序列化选项
   * @returns 序列化后的数据数组
   */
  dump(callback?: DumpCallback, options?: DumpOptions): Arc2DDump[];

  /**
   * 从序列化数据加载状态
   * @param data - 序列化的数据对象
   * @param options - 加载选项
   */
  load(data: Arc2DDump, options?: DumpOptions): void;

  /**
   * 验证数字输入
   * @param fieldName - 字段名称
   * @param value - 待验证的值
   * @returns 验证是否通过
   * @protected
   */
  protected validateNumberInput(fieldName: string, value: unknown): boolean;

  /**
   * 绑定子状态
   * @param childState - 子状态对象
   * @private
   */
  private _bindChildState(childState: State): void;

  /**
   * 触发状态变更中事件
   * @param oldValue - 旧值
   * @param newValue - 新值
   * @protected
   */
  protected dispatchValueChanging(oldValue: this, newValue: this): void;

  /**
   * 触发状态已变更事件
   * @param oldValue - 旧值
   * @param newValue - 新值
   * @protected
   */
  protected dispatchValueChanged(oldValue: this, newValue: this): void;
}