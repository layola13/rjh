/**
 * 删除阳角线请求事务类
 * 用于处理阳角线删除操作的状态请求
 * @module DeleteMitreMoldingRequest
 */

import { HSCore } from './HSCore';
import { HSFPConstants } from './HSFPConstants';

/**
 * 阳角线删除请求类
 * 继承自HSCore的StateRequest基类，实现阳角线的删除事务处理
 */
export declare class DeleteMitreMoldingRequest extends HSCore.Transaction.Common.StateRequest {
  /**
   * 要删除的阳角线对象
   */
  readonly mitre: unknown;

  /**
   * 创建阳角线删除请求实例
   * @param mitre - 要删除的阳角线对象
   */
  constructor(mitre: unknown);

  /**
   * 提交事务时执行的回调
   * 从内容中移除阳角线对象并调用父类的onCommit方法
   */
  onCommit(): void;

  /**
   * 检查字段是否可以参与事务
   * @returns 始终返回true，表示所有字段都可参与事务
   */
  canTransactField(): boolean;

  /**
   * 获取操作描述信息
   * @returns 返回"删除阳角线"的描述文本
   */
  getDescription(): string;

  /**
   * 获取操作所属的日志分类
   * @returns 返回面操作类型的日志分组
   */
  getCategory(): HSFPConstants.LogGroupTypes.FaceOperation;
}