/**
 * 外部区域绘制 - 删除顶点命令
 * 用于在草图编辑器中删除指定顶点
 */

import { HSApp } from './518193';

/**
 * 草图2D构建器接口
 * 负责管理2D草图的几何结构
 */
interface ISketch2DBuilder {
  // 草图构建器的具体实现由外部模块定义
}

/**
 * 顶点接口
 * 表示草图中的一个顶点节点
 */
interface IVertex {
  // 顶点的具体属性由外部模块定义
}

/**
 * 事务管理器接口
 * 负责管理命令的事务提交和回滚
 */
interface ITransactionManager {
  /**
   * 提交事务请求
   * @param request - 要提交的请求对象
   */
  commit(request: unknown): void;

  /**
   * 创建事务请求
   * @param requestType - 请求类型标识
   * @param params - 请求参数数组
   * @returns 创建的请求对象
   */
  createRequest(requestType: string, params: unknown[]): unknown;
}

/**
 * 选择管理器接口
 * 负责管理场景中对象的选中状态
 */
interface ISelectionManager {
  /**
   * 取消选中所有对象
   */
  unselectAll(): void;
}

/**
 * 命令执行上下文接口
 * 包含命令执行所需的各种管理器实例
 */
interface ICommandContext {
  /** 事务管理器 */
  transManager: ITransactionManager;
  
  /** 选择管理器 */
  selectionManager: ISelectionManager;
}

/**
 * 删除顶点命令类
 * 继承自HSApp.Cmd.Command基类
 * 用于在外部区域绘制中删除指定的顶点
 */
export declare class CmdDeleteVertex extends HSApp.Cmd.Command {
  /** 草图2D构建器实例 */
  private readonly sketch2dBuilder: ISketch2DBuilder;
  
  /** 要删除的顶点 */
  private readonly vertex: IVertex;
  
  /** 命令执行上下文 */
  protected context: ICommandContext;

  /**
   * 构造函数
   * @param sketch2dBuilder - 草图2D构建器实例
   * @param vertex - 要删除的顶点对象
   */
  constructor(sketch2dBuilder: ISketch2DBuilder, vertex: IVertex);

  /**
   * 执行命令
   * 创建删除顶点的请求并提交事务，同时清除所有选中状态
   */
  protected onExecute(): void;

  /**
   * 创建删除顶点的事务请求
   * @returns 事务请求对象
   * @private
   */
  private _createRequest(): unknown;

  /**
   * 获取命令描述信息
   * @returns 命令的中文描述
   */
  getDescription(): string;

  /**
   * 获取命令所属的日志分组类别
   * @returns 日志分组类型标识
   */
  getCategory(): string;
}