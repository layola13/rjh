/**
 * 点数据集合模块
 * @module module_set
 * @originalId set
 */

/**
 * 点数据的类型定义
 */
export type PointData = unknown; // 需要根据实际数据结构定义

/**
 * 集合类，用于管理点数据
 */
export declare class ModuleSet {
  /**
   * 内部点数据存储
   * @private
   */
  private _pointData: PointData;

  /**
   * 设置点数据并标记为脏状态
   * @param data - 新的点数据
   */
  setPointData(data: PointData): void;

  /**
   * 标记对象为脏状态，需要重新计算或渲染
   * @protected
   */
  protected setDirty(): void;
}