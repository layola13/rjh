import type { Handle, HardwareShape } from './Handle';
import type { ToolType } from './ToolType';
import type { Edge } from './Edge';
import type { Polygon, ORIENTATION } from './Polygon';
import type { Vector } from './Vector';

/**
 * 商业门把手硬件处理类
 * 用于管理商业门上把手的形状、方向和几何属性
 */
export declare class CommercialHandle extends Handle {
  /**
   * 硬件形状类型，固定为商业门把手
   */
  readonly hardwareShape: HardwareShape.CommercialHandle;

  /**
   * 编辑工具类型，用于修改该门把手
   */
  readonly editTool: ToolType.editCommercialHandle;

  /**
   * 是否忽略弧形边缘
   * @internal
   */
  protected _ignoreArcEdge: boolean;

  /**
   * 获取硬件形状的长度
   * 计算为边缘长度的一半
   */
  get hardwareShapeLength(): number;

  /**
   * 计算硬件形状的方向向量
   * 根据多边形的方向（顺时针/逆时针）确定切线方向
   * @returns 硬件形状的方向向量
   */
  hardwareShapeDirection(): Vector;

  /**
   * 从另一个CommercialHandle实例克隆属性
   * @param source - 源CommercialHandle实例
   * @returns 当前实例（支持链式调用）
   */
  cloneFrom(source: CommercialHandle): this;

  /**
   * 创建当前实例的副本
   * @returns 新的CommercialHandle实例，包含相同的属性
   */
  recreate(): CommercialHandle;
}

/**
 * Handle基类的相关接口
 */
export interface Handle {
  /** 管理器实例 */
  manager: unknown;
  /** 关联的边缘对象 */
  edge: Edge;
  /** 关联的多边形对象 */
  polygon: Polygon;
  /** 从另一个Handle克隆 */
  cloneFrom(source: Handle): this;
}

/**
 * 边缘对象接口
 */
export interface Edge {
  /** 边缘长度 */
  length: number;
  /** 获取起始点的切线向量 */
  tangentInStart(): Vector;
}

/**
 * 多边形对象接口
 */
export interface Polygon {
  /** 多边形方向（顺时针或逆时针） */
  orientation: ORIENTATION;
}

/**
 * 向量对象接口
 */
export interface Vector {
  /** 反转向量方向 */
  invert(): Vector;
}

/**
 * 多边形方向枚举
 */
export enum ORIENTATION {
  /** 逆时针方向 */
  CCW = 'CCW',
  /** 顺时针方向 */
  CW = 'CW'
}