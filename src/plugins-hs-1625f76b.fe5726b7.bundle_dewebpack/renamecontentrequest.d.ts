/**
 * 重命名内容请求类
 * 用于处理内容（如模型）的重命名操作，支持事务回滚
 */

import { HSCore } from './HSCore';

/**
 * 内容接口
 * 描述可被重命名的内容对象结构
 */
interface IContent {
  /** 内容的显示名称 */
  displayName: string;
}

/**
 * RenameContentRequest 类
 * 继承自 HSCore.Transaction.Common.StateRequest
 * 实现内容重命名的事务请求
 */
export class RenameContentRequest extends HSCore.Transaction.Common.StateRequest {
  /** 要重命名的内容对象 */
  private readonly _content: IContent;
  
  /** 新的名称 */
  private readonly _newName: string;

  /**
   * 构造函数
   * @param content - 要重命名的内容对象
   * @param newName - 新的名称
   */
  constructor(content: IContent, newName: string) {
    super();
    this._content = content;
    this._newName = newName;
  }

  /**
   * 提交事务时执行
   * 将内容的显示名称更新为新名称，并调用父类的 onCommit 方法
   */
  onCommit(): void {
    this._content.displayName = this._newName;
    super.onCommit([]);
  }

  /**
   * 判断字段是否可以参与事务
   * @returns 始终返回 true，表示该请求的字段可以参与事务
   */
  canTransactField(): boolean {
    return true;
  }

  /**
   * 获取操作描述
   * @returns 操作的描述文本
   */
  getDescription(): string {
    return '模型重命名';
  }

  /**
   * 获取操作分类
   * @returns 操作所属的日志组类型
   */
  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }
}

/**
 * HSFPConstants 常量声明
 * 定义日志分组类型等常量
 */
declare const HSFPConstants: {
  LogGroupTypes: {
    ContentOperation: string;
  };
};