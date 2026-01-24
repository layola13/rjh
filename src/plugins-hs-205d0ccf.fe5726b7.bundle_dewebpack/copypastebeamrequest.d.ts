/**
 * 复制粘贴Beam对象的请求事务类
 * @module CopyPasteBeamRequest
 */

import { HSCore } from './HSCore';

/**
 * Beam对象接口
 */
interface IBeam {
  /** 父节点引用 */
  parent: IBeamParent;
  
  /**
   * 复制当前Beam对象
   * @returns 新的Beam实例
   */
  copy(): IBeam;
}

/**
 * Beam父节点接口
 */
interface IBeamParent {
  /**
   * 添加子节点
   * @param child - 要添加的子Beam对象
   */
  addChild(child: IBeam): void;
}

/**
 * 日志分组类型常量
 */
declare const HSFPConstants: {
  LogGroupTypes: {
    /** 内容操作类型 */
    ContentOperation: string;
  };
};

/**
 * 复制粘贴Beam对象的请求事务类
 * 继承自HSCore的StateRequest基类，用于处理Beam对象的复制粘贴操作
 */
export declare class CopyPasteBeamRequest extends HSCore.Transaction.Common.StateRequest {
  /** 源Beam对象，即要被复制的对象 */
  from: IBeam;
  
  /** 新创建的Beam对象，复制操作的结果 */
  private _newBeam?: IBeam;

  /**
   * 构造函数
   * @param from - 源Beam对象
   */
  constructor(from: IBeam);

  /**
   * 提交事务时的回调方法
   * 执行实际的复制粘贴操作：
   * 1. 复制源Beam对象
   * 2. 将新对象添加到父节点
   * @returns 新创建的Beam对象
   */
  onCommit(): IBeam;

  /**
   * 检查字段是否可以被事务处理
   * @returns 始终返回true，表示所有字段都可以被事务处理
   */
  canTransactField(): boolean;

  /**
   * 获取事务的描述信息
   * @returns 事务描述："粘贴物品"
   */
  getDescription(): string;

  /**
   * 获取事务的分类
   * @returns 返回内容操作类型的日志分组
   */
  getCategory(): string;
}