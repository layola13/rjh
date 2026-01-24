/**
 * 清除屋顶面材质请求
 * 
 * 该请求用于清除参数化屋顶选定面(face)的材质，恢复为默认材质数据。
 * 继承自 StateRequest 基类，实现事务化的材质清除操作。
 * 
 * @module ClearRoofFaceMaterialRequest
 */

import { HSCore } from './HSCore';

/**
 * 屋顶面接口
 */
interface IRoof {
  /**
   * 移除指定面的材质
   * @param faceId - 面的唯一标识符
   */
  removeFaceMaterial(faceId: string): void;

  /**
   * 根据网格键获取面标签
   * @param meshKey - 网格键
   * @returns 面标签
   */
  getFaceTagByMeshKey(meshKey: string): unknown;

  /**
   * 设置材质数据
   * @param faceTag - 面标签
   * @param materialData - 材质数据
   */
  setMaterialData(faceTag: unknown, materialData: unknown): void;

  /**
   * 获取面的默认材质数据
   * @param faceId - 面的唯一标识符
   * @returns 默认材质数据
   */
  getFaceDefaultMaterialData(faceId: string): unknown;

  /**
   * 标记几何体为脏数据，触发重新渲染
   */
  dirtyGeometry(): void;
}

/**
 * 清除屋顶面材质请求类
 * 
 * 用于批量清除屋顶指定面的材质，将其恢复为默认材质。
 * 该操作支持事务化处理，可撤销重做。
 * 
 * @extends HSCore.Transaction.Common.StateRequest
 */
export declare class ClearRoofFaceMaterialRequest extends HSCore.Transaction.Common.StateRequest {
  /**
   * 目标屋顶对象
   * @private
   */
  private readonly _roof: IRoof;

  /**
   * 需要清除材质的面ID集合
   * @private
   */
  private readonly _faceIds: string[];

  /**
   * 构造函数
   * 
   * @param roof - 屋顶对象实例
   * @param faceIds - 需要清除材质的面ID数组
   */
  constructor(roof: IRoof, faceIds: string[]);

  /**
   * 提交请求时执行的操作
   * 
   * 遍历所有指定的面ID，执行以下操作：
   * 1. 移除面的当前材质
   * 2. 获取面的标签
   * 3. 设置为默认材质数据
   * 4. 标记几何体需要更新
   * 
   * @override
   */
  onCommit(): void;

  /**
   * 获取操作描述
   * 
   * @returns 操作的中文描述文本
   * @override
   */
  getDescription(): string;

  /**
   * 判断是否可以进行字段事务处理
   * 
   * @returns 始终返回 true，表示支持字段级事务
   * @override
   */
  canTransactField(): boolean;
}