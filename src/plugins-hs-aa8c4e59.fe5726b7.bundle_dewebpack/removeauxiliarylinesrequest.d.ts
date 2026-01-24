import { HSCore } from './path/to/HSCore';

/**
 * 表示移除辅助线的请求操作
 * 继承自 HSCore.Transaction.Common.StateRequest，用于处理辅助线实体的移除事务
 */
export declare class RemoveAuxiliaryLinesRequest extends HSCore.Transaction.Common.StateRequest {
  /**
   * 待移除的辅助线实体集合
   * @private
   */
  private _entitys: Array<AuxiliaryLineEntity | null | undefined>;

  /**
   * 构造函数
   * @param entitys - 需要移除的辅助线实体数组
   */
  constructor(entitys: Array<AuxiliaryLineEntity | null | undefined>);

  /**
   * 提交操作时的回调方法
   * 遍历所有实体并执行移除操作
   * @returns 空数组，表示操作完成
   */
  onCommit(): Promise<[]>;
}

/**
 * 辅助线实体接口
 * 定义了辅助线对象的基本结构
 */
export interface AuxiliaryLineEntity {
  /**
   * 移除当前实体的方法
   */
  remove(): void;
}