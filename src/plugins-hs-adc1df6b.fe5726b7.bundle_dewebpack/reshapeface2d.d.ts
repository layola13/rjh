import { HSApp } from './path/to/HSApp';
import { HSCore } from './path/to/HSCore';

/**
 * 曲线实体信息接口
 */
interface CurveEntityInfo {
  /** 曲线类型 */
  type: string;
  /** 曲线几何数据 */
  geometry: unknown;
  /** 曲线标识符 */
  id?: string;
}

/**
 * 距离计算结果接口
 */
interface DistanceResult {
  /** 到曲线的距离 */
  distance: number;
  /** 最近点坐标 */
  closestPoint?: { x: number; y: number };
  /** 曲线上的参数 */
  parameter?: number;
}

/**
 * 草图上下文接口
 */
interface SketchContext {
  /** 辅助线集合 */
  guidelines: unknown[];
  /** 其他上下文属性 */
  [key: string]: unknown;
}

/**
 * 2D面重塑工具类
 * 继承自 ExtraordinarySketch2d.Gizmo.ReshapeFace2d
 * 用于处理2D草图中面的变形和重塑操作
 */
declare class ReshapeFace2d extends HSApp.ExtraordinarySketch2d.Gizmo.ReshapeFace2d {
  /**
   * 获取最近的曲线结果
   * @param targetEntity - 目标实体标识符
   * @param entityCollection - 实体集合
   * @param sketchContext - 草图上下文对象
   * @param additionalParam - 附加参数（用于距离计算）
   * @returns 最近的距离结果，如果未找到则返回 undefined
   */
  protected _getNearResult(
    targetEntity: unknown,
    entityCollection: Set<unknown> | unknown[],
    sketchContext: SketchContext,
    additionalParam: unknown
  ): DistanceResult | undefined;

  /**
   * 获取结构曲线信息数组
   * 从文档管理器中提取场景根层的所有全局路径曲线
   * @returns 结构曲线信息数组
   */
  getStructureCurveInfos(): CurveEntityInfo[];
}

export { ReshapeFace2d };