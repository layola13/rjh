/**
 * 梁构件尺寸调整命令模块
 * 
 * 该模块提供了通过拖拽Gizmo（交互控制器）调整梁构件尺寸的命令实现。
 * 继承自应用程序的基础Command类，实现了拖拽交互的完整生命周期。
 * 
 * @module CmdResizeBeam
 * @originalId 483367
 */

import { HSApp } from './518193';

/**
 * 梁构件的类型定义
 * 表示场景中的梁构件对象
 */
export interface Beam {
  // 梁构件的具体属性由实际实现定义
  [key: string]: any;
}

/**
 * 拖拽Gizmo控制器接口
 * 用于交互式调整构件尺寸的可视化控制器
 */
export interface DraggingGizmo {
  // Gizmo的具体属性由实际实现定义
  [key: string]: any;
}

/**
 * 拖拽偏移量数据
 */
export interface DragOffset {
  x?: number;
  y?: number;
  z?: number;
  [key: string]: any;
}

/**
 * 接收事件数据接口
 */
export interface ReceiveEventData {
  /** 拖拽偏移量，仅在dragmove事件中存在 */
  offset?: DragOffset;
  [key: string]: any;
}

/**
 * 事务请求接口
 * 用于封装可撤销/重做的操作请求
 */
export interface TransactionRequest {
  /**
   * 接收并处理事件
   * @param eventType - 事件类型
   * @param data - 事件数据
   * @returns 是否成功处理
   */
  receive(eventType: string, data: ReceiveEventData): boolean;
}

/**
 * 事务管理器接口
 * 负责管理可撤销/重做的操作事务
 */
export interface TransactionManager {
  /**
   * 创建事务请求
   * @param requestType - 请求类型（如ResizeBeam）
   * @param params - 请求参数数组
   * @returns 创建的事务请求对象
   */
  createRequest(requestType: string, params: any[]): TransactionRequest;

  /**
   * 提交事务请求
   * @param request - 要提交的事务请求
   */
  commit(request: TransactionRequest): void;
}

/**
 * 命令管理器接口
 * 负责命令的生命周期管理
 */
export interface CommandManager {
  /**
   * 标记命令完成
   * @param command - 完成的命令实例
   */
  complete(command: Command): void;
}

/**
 * 基础命令抽象类
 * 所有命令的基类
 */
export declare abstract class Command {
  /** 命令管理器实例 */
  mgr: CommandManager;

  /**
   * 执行命令的抽象方法
   */
  abstract onExecute(): void;

  /**
   * 接收事件的抽象方法
   * @param eventType - 事件类型
   * @param data - 事件数据
   * @returns 是否成功处理事件
   */
  abstract onReceive(eventType: string, data: ReceiveEventData): boolean;
}

/**
 * 梁构件尺寸调整命令类
 * 
 * 该命令用于处理梁构件的交互式尺寸调整操作。支持以下功能：
 * - 通过拖拽Gizmo实时调整梁的尺寸
 * - 事务化的操作（支持撤销/重做）
 * - 拖拽生命周期管理（dragmove、dragend）
 * 
 * @extends Command
 * 
 * @example
 *