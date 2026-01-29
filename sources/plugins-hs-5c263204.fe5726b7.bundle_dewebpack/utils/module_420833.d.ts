/**
 * 组合模型翻转事务请求
 * @module module_420833
 * @original-id 420833
 */

import { Transaction } from 'HSCore';
import { LogGroupTypes } from 'HSFPConstants';

/**
 * 模型组接口
 * 表示可以执行翻转操作的模型组
 */
interface IModelGroup {
  /**
   * 翻转组内所有模型
   */
  flipAll(): void;
}

/**
 * 组合模型翻转事务请求类
 * 用于处理模型组的翻转操作，支持提交、撤销和重做
 * @extends {HSCore.Transaction.Request}
 */
declare class GroupFlipTransactionRequest extends Transaction.Request {
  /**
   * 关联的模型组
   * @private
   */
  private _group: IModelGroup;

  /**
   * 构造函数
   * @param group - 需要翻转的模型组实例
   */
  constructor(group: IModelGroup);

  /**
   * 提交事务时执行
   * 执行模型组的翻转操作
   */
  onCommit(): void;

  /**
   * 撤销事务时执行
   * 通过再次翻转恢复到原始状态
   */
  onUndo(): void;

  /**
   * 重做事务时执行
   * 再次执行翻转操作
   */
  onRedo(): void;

  /**
   * 获取事务的描述信息
   * @returns 事务描述文本
   */
  getDescription(): string;

  /**
   * 获取事务的分类
   * @returns 日志分组类型，属于内容操作类别
   */
  getCategory(): LogGroupTypes;
}

export default GroupFlipTransactionRequest;