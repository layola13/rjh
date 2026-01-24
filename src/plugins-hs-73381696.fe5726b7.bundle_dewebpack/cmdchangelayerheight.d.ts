/**
 * 墙体图层高度修改命令
 * 用于修改全局墙体高度的命令类
 */

import { Command } from 'HSApp/Cmd/Command';

/**
 * 请求对象接口
 * 用于事务管理器的请求类型
 */
interface TransactionRequest {
  /** 请求类型 */
  type: HSFPConstants.RequestType;
  /** 请求参数 */
  params: unknown[];
}

/**
 * 图层接口
 * 表示可以修改高度的图层对象
 */
interface Layer {
  /** 图层当前高度 */
  height: number;
  /** 图层唯一标识 */
  id?: string;
  /** 图层名称 */
  name?: string;
}

/**
 * 事务管理器接口
 * 用于创建和提交修改请求
 */
interface TransactionManager {
  /**
   * 创建事务请求
   * @param requestType - 请求类型
   * @param params - 请求参数数组
   * @returns 事务请求对象
   */
  createRequest(requestType: HSFPConstants.RequestType, params: unknown[]): TransactionRequest;
  
  /**
   * 提交事务请求
   * @param request - 要提交的请求对象
   */
  commit(request: TransactionRequest): void;
}

/**
 * 应用程序上下文接口
 */
interface AppContext {
  /** 事务管理器实例 */
  transManager: TransactionManager;
}

/**
 * 日志参数接口
 * 用于记录操作日志的参数结构
 */
interface LogParams {
  /** 活动分组类型 */
  activeSection: HSFPConstants.LogGroupTypes;
  /** 活动分组名称 */
  activeSectionName: string;
  /** 点击统计信息 */
  clicksRatio: {
    /** 操作唯一标识 */
    id: string;
    /** 操作显示名称 */
    name: string;
  };
}

/**
 * 修改图层高度命令类
 * 继承自应用程序基础命令类，用于修改墙体图层的高度
 * 
 * @example
 *