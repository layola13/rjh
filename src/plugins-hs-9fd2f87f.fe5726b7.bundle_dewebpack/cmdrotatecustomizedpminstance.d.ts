/**
 * 自由造型模型实例旋转命令
 * 用于在3D场景中旋转自定义参数化模型实例
 */

import { Vector3 } from 'three'; // 假设使用 Three.js 的 Vector3
import { HSCore } from './HSCore';

/**
 * 旋转平面类型
 */
type RotationPlane = 'xy' | 'yz' | 'xz';

/**
 * 欧拉角旋转值 [X, Y, Z]
 */
type EulerAngles = [number, number, number];

/**
 * 鼠标拖拽事件数据
 */
interface DragEventData {
  /** 旋转角度增量 */
  delta: number;
}

/**
 * 角度吸附配置
 */
interface AngleSnapConfig {
  /** 当前角度 */
  angle: number;
  /** 吸附偏移阈值 */
  offset: number;
  /** 吸附标记角度（如45度倍数） */
  mark: number;
}

/**
 * 自定义参数化模型实例接口
 */
interface ICustomizedPMInstance {
  /** X轴旋转角度（度） */
  XRotation: number;
  /** Y轴旋转角度（度） */
  YRotation: number;
  /** Z轴旋转角度（度） */
  ZRotation: number;
}

/**
 * 事务管理器会话接口
 */
interface ITransactionSession {
  /** 提交事务 */
  commit(): void;
  /** 中止事务 */
  abort(): void;
}

/**
 * 事务管理器接口
 */
interface ITransactionManager {
  /** 开始新的事务会话 */
  startSession(): ITransactionSession;
  /** 创建事务请求 */
  createRequest(type: number, args: unknown[]): unknown;
  /** 提交请求 */
  commit(request: unknown): void;
}

/**
 * 命令执行上下文
 */
interface ICommandContext {
  /** 事务管理器 */
  transManager: ITransactionManager;
}

/**
 * 命令管理器接口
 */
interface ICommandManager {
  /** 取消命令执行 */
  cancel(command: unknown): void;
  /** 完成命令执行 */
  complete(command: unknown): void;
}

/**
 * 基础命令抽象类
 */
declare abstract class Command {
  /** 命令执行上下文 */
  protected context: ICommandContext;
  /** 命令管理器 */
  protected mgr: ICommandManager;

  /**
   * 命令执行回调
   * @param data - 执行时传入的数据
   */
  abstract onExecute(data?: unknown): void;

  /**
   * 命令完成回调
   */
  abstract onComplete(): void;

  /**
   * 命令取消回调
   */
  abstract onCancel(): void;

  /**
   * 接收事件消息
   * @param event - 事件类型
   * @param data - 事件数据
   * @returns 是否继续处理
   */
  abstract onReceive(event: string, data?: unknown): boolean;

  /**
   * 获取命令描述
   */
  abstract getDescription(): string;

  /**
   * 获取命令分类
   */
  abstract getCategory(): string;
}

/**
 * 旋转自由造型模型实例命令
 * 
 * 功能：
 * - 支持在XY、YZ、XZ平面上旋转模型
 * - 支持角度吸附（如45度倍数）
 * - 支持事务管理（可撤销/重做）
 * - 响应拖拽交互事件
 * 
 * @example
 *