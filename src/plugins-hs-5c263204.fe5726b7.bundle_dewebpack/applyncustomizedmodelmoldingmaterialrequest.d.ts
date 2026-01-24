/**
 * 应用N个自定义模型线条材质请求
 * 用于批量修改模型线条（molding）的材质数据并支持撤销/重做操作
 */

import type { HSCore } from './HSCore';

/**
 * 线条对象接口
 * 表示可以应用材质的模型线条
 */
interface Molding {
  /**
   * 材质数据
   */
  materialData?: MaterialData;
  
  /**
   * 标记几何体为脏数据，需要重新渲染
   */
  dirtyGeometry(): void;
}

/**
 * 材质数据类型
 * 描述线条的材质属性
 */
type MaterialData = unknown;

/**
 * 批量应用自定义模型线条材质的请求类
 * 继承自HSCore的事务状态请求基类，支持撤销/重做功能
 */
export declare class ApplyNCustomizedModelMoldingMaterialRequest extends HSCore.Transaction.Common.StateRequest {
  /**
   * 需要应用材质的线条对象数组
   */
  readonly moldings: Molding[];
  
  /**
   * 要应用的材质数据
   */
  readonly materialData: MaterialData;

  /**
   * 构造函数
   * @param moldings - 需要应用材质的线条对象数组
   * @param materialData - 要应用的材质数据
   */
  constructor(moldings: Molding[], materialData: MaterialData);

  /**
   * 提交操作时的回调
   * 将材质数据应用到所有线条对象并标记为需要重新渲染
   */
  onCommit(): void;

  /**
   * 撤销操作时的回调
   * 触发所有线条对象的几何体更新
   */
  onUndo(): void;

  /**
   * 重做操作时的回调
   * 触发所有线条对象的几何体更新
   */
  onRedo(): void;

  /**
   * 判断字段是否可以参与事务
   * @returns 始终返回true，表示所有字段都参与事务管理
   */
  canTransactField(): boolean;
}