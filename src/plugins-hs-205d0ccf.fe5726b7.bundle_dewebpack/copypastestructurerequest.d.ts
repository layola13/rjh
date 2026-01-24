/**
 * 复制粘贴结构请求类
 * 用于处理结构复制粘贴操作的事务请求
 * @module CopyPasteStructureRequest
 */

import { HSCore } from './HSCore';

/**
 * 可复制的结构接口
 */
interface ICopyableStructure {
  /**
   * 复制当前结构并返回副本
   * @returns 结构的深拷贝实例
   */
  copy(): ICopyableStructure;
}

/**
 * 复制粘贴结构请求类
 * 继承自HSCore的状态请求基类，用于管理复制粘贴操作的事务生命周期
 */
export declare class CopyPasteStructureRequest extends HSCore.Transaction.Common.StateRequest {
  /**
   * 要复制的源结构对象
   */
  from: ICopyableStructure;

  /**
   * 构造函数
   * @param from - 要复制的源结构对象
   */
  constructor(from: ICopyableStructure);

  /**
   * 提交事务时的回调方法
   * 执行实际的复制操作并返回复制后的结果
   * @returns 复制后的新结构实例
   */
  onCommit(): ICopyableStructure;

  /**
   * 判断字段是否可以参与事务
   * @returns 始终返回true，表示所有字段都可参与事务
   */
  canTransactField(): boolean;

  /**
   * 获取操作描述文本
   * @returns 返回操作的中文描述"粘贴物品"
   */
  getDescription(): string;

  /**
   * 获取操作所属的日志分类
   * @returns 返回内容操作分类标识
   */
  getCategory(): HSFPConstants.LogGroupTypes;
}

/**
 * HSFPConstants 常量命名空间
 */
declare namespace HSFPConstants {
  /**
   * 日志分组类型枚举
   */
  enum LogGroupTypes {
    /** 内容操作类型 */
    ContentOperation = 'ContentOperation'
  }
}