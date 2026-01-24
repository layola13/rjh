/**
 * AntiTheft module - 防盗窗组件模块
 * 提供防盗窗的创建、管理和操作功能
 */

import type { Vector } from './vector';
import type { Shape, ShapeType, Frame, IndicatorForAntiTheft, Border } from './shape';
import type { PolyId, HitResult, DisplayUtils } from './utils';
import type { FrameManager, ShutterManager } from './managers';

/**
 * 防盗窗序列化数据接口
 */
export interface AntiTheftJSON {
  /** 形状类型 */
  type: ShapeType;
  /** 多边形ID的JSON表示 */
  polyId: unknown;
  /** 是否启用 */
  enabled: boolean;
  /** 偏移向量的JSON表示 */
  offvec: { x: number; y: number };
  /** 框架管理器数据 */
  fm: unknown;
  /** 是否显示手柄条 */
  shb: boolean;
  /** 百叶窗间隙 */
  gap?: number;
  /** 手柄宽度 */
  hdl?: number;
  /** 百叶窗方向 */
  ori?: number;
  /** 孔洞高度 */
  hh?: number;
  /** 是否可开启 */
  oe?: boolean;
}

/**
 * 防盗窗类 - 继承自Shape基类
 * 用于表示和管理门窗系统中的防盗窗组件
 */
export declare class AntiTheft extends Shape {
  /**
   * 多边形ID标识符
   */
  polyId: PolyId;

  /**
   * 内部多边形数组
   */
  innerPoly: unknown[];

  /**
   * 是否启用该防盗窗
   */
  enabled: boolean;

  /**
   * 偏移向量
   */
  offvec: Vector;

  /**
   * 偏移向量是否启用
   */
  offvecEnabled: boolean;

  /**
   * 是否显示手柄条
   */
  showHandleBars: boolean;

  /**
   * 是否可开启
   */
  openable: boolean;

  /**
   * 孔洞高度
   */
  holeHeight: number;

  /**
   * 框架管理器实例
   */
  frameManager: FrameManager;

  /**
   * 百叶窗管理器实例
   */
  shutManager: ShutterManager;

  /**
   * 边框实例
   */
  borders: Border;

  /**
   * 指示器实例
   */
  indicator: IndicatorForAntiTheft;

  /**
   * 构造函数
   * @param parent - 父容器
   * @param polygon - 多边形数据
   * @param polyId - 多边形ID
   * @param orientation - 方向参数
   */
  constructor(parent: unknown, polygon: unknown, polyId: PolyId, orientation: number);

  /**
   * 检查是否包含窗扇
   * @returns 如果包含窗扇返回true，否则返回false
   */
  readonly withSash: boolean;

  /**
   * 获取中梃型材尺寸
   * @returns 中梃型材尺寸值
   */
  readonly mullionProfileSize: number;

  /**
   * 是否允许拖拽修改
   * @returns 始终返回false，不允许拖拽修改
   */
  readonly dragModify: boolean;

  /**
   * 获取已使用的多边形数组
   * @returns 空数组
   */
  readonly usedPoly: unknown[];

  /**
   * 获取可用的多边形数组
   * @returns 空数组
   */
  readonly avaiablePoly: unknown[];

  /**
   * 获取可共存的形状类型
   * @returns 包含Sash和Screen类型的数组
   */
  readonly coexistType: ShapeType[];

  /**
   * 检查是否被选中
   * @returns 如果框架或百叶窗被选中返回true
   */
  readonly selected: boolean;

  /**
   * 检查是否为独立组件
   * @returns 如果父级是Frame类型返回true
   */
  readonly isStandalone: boolean;

  /**
   * 获取Z轴索引（渲染层级）
   * 自动排序防盗窗和窗扇的Z轴顺序
   */
  readonly Zindex: void;

  /**
   * 删除防盗窗（空实现）
   */
  delete(): void;

  /**
   * 序列化为JSON对象
   * @returns 包含所有必要属性的JSON对象
   */
  toJSON(): AntiTheftJSON;

  /**
   * 从JSON数据反序列化
   * @param data - 序列化的JSON数据
   * @returns 当前实例（支持链式调用）
   */
  deserialize(data: AntiTheftJSON): this;

  /**
   * 更新多边形数据
   * @param polygon - 新的多边形数据（可选）
   */
  updatePoly(polygon?: unknown): void;

  /**
   * 平移变换
   * @param vector - 平移向量
   */
  translate(vector: Vector): void;

  /**
   * 高亮显示
   * @param highlight - 是否高亮
   */
  highlight(highlight: boolean): void;

  /**
   * 碰撞检测
   * @param point - 检测点坐标
   * @param options - 检测选项
   * @returns 碰撞检测结果（Control/All/None）
   */
  hitBar(point: unknown, options: unknown): HitResult;

  /**
   * 更新框架
   * @param force - 是否强制更新，默认false
   */
  updateFrame(force?: boolean): void;

  /**
   * 隐藏辅助元素
   */
  hideAssist(): void;

  /**
   * 根据多边形ID查找条形组件
   * @param polyId - 多边形ID
   * @returns 找到的条形组件或undefined
   */
  findBarByPolyId(polyId: PolyId): unknown | undefined;
}