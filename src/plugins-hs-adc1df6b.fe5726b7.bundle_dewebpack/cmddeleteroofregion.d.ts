/**
 * 删除屋顶区域命令
 * 用于删除屋顶绘制区域的命令类
 */

import { HSApp } from './HSApp';

/**
 * 事务管理器接口
 * 负责管理命令的事务和请求
 */
interface ITransactionManager {
  /**
   * 开始一个新的事务会话
   * @returns 事务会话对象
   */
  startSession(): ITransactionSession;

  /**
   * 创建请求
   * @param requestType 请求类型
   * @param params 请求参数数组
   * @returns 创建的请求对象
   */
  createRequest(requestType: string, params: unknown[]): IRequest;

  /**
   * 提交请求
   * @param request 要提交的请求
   */
  commit(request: IRequest): void;
}

/**
 * 事务会话接口
 */
interface ITransactionSession {
  /**
   * 提交当前事务会话
   */
  commit(): void;
}

/**
 * 请求对象接口
 */
interface IRequest {
  // 请求相关的属性和方法
}

/**
 * 屋顶对象接口
 */
interface IRoof {
  // 屋顶相关的属性
}

/**
 * 屋顶区域接口
 */
interface IRoofRegion {
  /**
   * 关联的屋顶对象
   */
  roof?: IRoof;
}

/**
 * 选择管理器接口
 */
interface ISelectionManager {
  /**
   * 取消所有选中状态
   */
  unselectAll(): void;
}

/**
 * 命令上下文接口
 */
interface ICommandContext {
  /**
   * 事务管理器
   */
  transManager: ITransactionManager;

  /**
   * 选择管理器
   */
  selectionManager: ISelectionManager;
}

/**
 * 命令管理器接口
 */
interface ICommandManager {
  /**
   * 完成命令执行
   * @param command 已完成的命令
   */
  complete(command: CmdDeleteRoofRegion): void;
}

/**
 * 删除屋顶区域命令类
 * 继承自HSApp的ExtraordinarySketch2d基础命令类
 */
export declare class CmdDeleteRoofRegion extends HSApp.ExtraordinarySketch2d.Cmd.CmdExBase {
  /**
   * 要删除的屋顶区域
   */
  readonly roofRegion: IRoofRegion;

  /**
   * 命令上下文
   */
  protected readonly context: ICommandContext;

  /**
   * 命令管理器
   */
  protected readonly mgr?: ICommandManager;

  /**
   * 构造函数
   * @param roofRegion 要删除的屋顶区域对象
   */
  constructor(roofRegion: IRoofRegion);

  /**
   * 执行删除请求
   * 创建并提交删除屋顶和屋顶区域的请求
   */
  protected doRequest(): void;

  /**
   * 执行命令
   * 取消所有选中状态，执行删除请求，并完成命令
   */
  onExecute(): void;

  /**
   * 获取命令描述
   * @returns 命令的文本描述
   */
  getDescription(): string;
}