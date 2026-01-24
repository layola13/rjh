/**
 * 命令模块：旋转梁
 * @module CmdRotateBeam
 * @description 处理梁构件的旋转操作，支持拖拽、热键和滑块交互
 */

import { Command } from 'HSApp.Cmd';
import { TransactionManager, TransactionRequest, TransactionSession } from 'HSApp.TransactionManager';
import { HSFPConstants } from 'HSApp.Constants';

/**
 * 接收事件的数据结构
 */
interface ReceiveEventData {
  /** 旋转角度增量 */
  delta?: number;
  [key: string]: unknown;
}

/**
 * 梁对象接口
 */
interface Beam {
  // 梁的具体属性根据实际业务定义
  id?: string;
  [key: string]: unknown;
}

/**
 * 旋转梁命令类
 * @class CmdRotateBeam
 * @extends {Command}
 * @description 实现梁构件的旋转功能，支持事务管理和撤销/重做
 */
export declare class CmdRotateBeam extends Command {
  /**
   * 要旋转的梁对象
   */
  beam: Beam;

  /**
   * 是否启用捕捉功能
   * @default true
   */
  snapEnabled: boolean;

  /**
   * 事务管理器实例
   */
  transMgr: TransactionManager;

  /**
   * 当前事务会话
   * @private
   */
  private _session?: TransactionSession;

  /**
   * 当前事务请求
   * @private
   */
  private _request?: TransactionRequest;

  /**
   * 是否已执行旋转操作
   * @private
   */
  private rotated?: boolean;

  /**
   * 构造函数
   * @param beam - 要旋转的梁对象
   * @param snapEnabled - 是否启用捕捉功能，默认为 true
   */
  constructor(beam: Beam, snapEnabled?: boolean);

  /**
   * 执行命令
   * @param event - 初始事件数据（可选）
   * @description 启动事务会话并创建旋转请求
   */
  onExecute(event?: ReceiveEventData): void;

  /**
   * 接收交互事件
   * @param eventType - 事件类型
   * @param eventData - 事件数据
   * @returns 是否继续处理事件
   * @description 处理各种交互事件：鼠标拖拽、热键、滑块等
   * 
   * 支持的事件类型：
   * - `mouseup`: 鼠标释放
   * - `sliderdragend`: 滑块拖拽结束
   * - `hotkeyend`: 热键释放
   * - `sliderdragmove`: 滑块拖拽移动
   * - `dragmove`: 拖拽移动
   * - `hotkey`: 热键按下
   */
  onReceive(eventType: string, eventData: ReceiveEventData): boolean;

  /**
   * 完成命令
   * @description 提交事务请求和会话，将更改应用到模型
   */
  onComplete(): void;

  /**
   * 取消命令
   * @description 中止事务请求和会话，回滚所有更改
   */
  onCancel(): void;

  /**
   * 是否可以撤销/重做
   * @returns 始终返回 false
   * @description 该命令不支持撤销重做功能
   */
  canUndoRedo(): boolean;

  /**
   * 获取命令分类
   * @returns 日志分组类型
   * @description 返回内容操作类型，用于日志记录和分类
   */
  getCategory(): typeof HSFPConstants.LogGroupTypes.ContentOperation;
}