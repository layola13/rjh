/**
 * 楼板编辑删除顶点命令模块
 * @module CmdDeleteVertex
 */

import { HSApp } from './HSApp';

/**
 * 2D草图构建器接口
 */
interface ISketch2DBuilder {
  // 草图构建器的具体属性和方法由实际实现定义
}

/**
 * 顶点对象接口
 */
interface IVertex {
  // 顶点的具体属性由实际实现定义
}

/**
 * 事务管理器接口
 */
interface ITransactionManager {
  /**
   * 提交请求
   * @param request - 要提交的请求对象
   */
  commit(request: unknown): void;

  /**
   * 创建请求
   * @param requestType - 请求类型
   * @param params - 请求参数数组
   */
  createRequest(requestType: string, params: unknown[]): unknown;
}

/**
 * 选择管理器接口
 */
interface ISelectionManager {
  /**
   * 取消选择所有对象
   */
  unselectAll(): void;
}

/**
 * 命令上下文接口
 */
interface ICommandContext {
  /** 事务管理器 */
  transManager: ITransactionManager;
  
  /** 选择管理器 */
  selectionManager: ISelectionManager;
}

/**
 * 楼板编辑删除顶点命令
 * 
 * 用于在2D草图编辑模式下删除选定的顶点。
 * 执行该命令会创建一个删除顶点的事务请求并提交，同时清除当前选择。
 * 
 * @extends HSApp.Cmd.Command
 */
export declare class CmdDeleteVertex extends HSApp.Cmd.Command {
  /** 2D草图构建器实例 */
  private sketch2dBuilder: ISketch2DBuilder;

  /** 要删除的顶点 */
  private vertex: IVertex;

  /** 命令执行上下文 */
  protected context: ICommandContext;

  /**
   * 创建删除顶点命令实例
   * 
   * @param sketch2dBuilder - 2D草图构建器实例
   * @param vertex - 要删除的顶点对象
   */
  constructor(sketch2dBuilder: ISketch2DBuilder, vertex: IVertex);

  /**
   * 执行命令
   * 
   * 创建删除顶点请求并提交事务，同时清除所有选择状态。
   */
  onExecute(): void;

  /**
   * 创建删除顶点的事务请求
   * 
   * @private
   * @returns 删除顶点的事务请求对象
   */
  private _createRequest(): unknown;

  /**
   * 获取命令描述
   * 
   * @returns 命令的可读描述文本
   */
  getDescription(): string;

  /**
   * 获取命令分类
   * 
   * @returns 命令所属的日志分组类型
   */
  getCategory(): string;
}

/**
 * HSFPConstants 常量命名空间
 */
declare namespace HSFPConstants {
  /** 请求类型枚举 */
  namespace RequestType {
    /** 楼板编辑相关请求类型 */
    namespace SlabEdit {
      /** 删除顶点请求类型标识 */
      const DeleteVertex: string;
    }
  }

  /** 日志分组类型枚举 */
  namespace LogGroupTypes {
    /** 楼板编辑日志分组标识 */
    const SlabEdit: string;
  }
}