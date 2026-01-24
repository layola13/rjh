/**
 * 材质替换命令模块
 * 用于将材质应用到相同模型的所有实例
 */

import { HSApp } from './518193';

/**
 * 实体对象接口
 */
export interface Entity {
  id?: string;
  type?: string;
  [key: string]: unknown;
}

/**
 * 材质数据映射接口
 */
export interface MaterialDataMap {
  [key: string]: unknown;
}

/**
 * 材质替换命令类
 * 继承自 HSApp.Cmd.Command，用于批量替换相同模型的材质
 */
export default class MaterialReplaceCommand extends HSApp.Cmd.Command {
  /**
   * 需要替换材质的实体列表
   */
  entities: Entity[];

  /**
   * 材质数据映射表
   */
  materialDataMap: MaterialDataMap | undefined;

  /**
   * 构造函数
   * @param entities - 实体数组，默认为空数组
   * @param materialDataMap - 材质数据映射对象
   */
  constructor(entities?: Entity[], materialDataMap?: MaterialDataMap);

  /**
   * 执行命令
   * 创建材质替换请求并提交到事务管理器
   */
  onExecute(): void;

  /**
   * 是否支持撤销/重做操作
   * @returns 返回 false，表示此命令不支持撤销/重做
   */
  canUndoRedo(): boolean;

  /**
   * 获取命令描述
   * @returns 命令的文字描述
   */
  getDescription(): string;

  /**
   * 获取命令分类
   * @returns 日志分组类型，属于内容操作类别
   */
  getCategory(): typeof HSFPConstants.LogGroupTypes.ContentOperation;
}

/**
 * HSFPConstants 命名空间声明
 */
declare namespace HSFPConstants {
  enum RequestType {
    ContentsMaterialReplaceAllRequest = 'ContentsMaterialReplaceAllRequest'
  }

  namespace LogGroupTypes {
    const ContentOperation: unique symbol;
  }
}

/**
 * 上下文接口，包含事务管理器
 */
interface Context {
  transManager: TransactionManager;
}

/**
 * 事务管理器接口
 */
interface TransactionManager {
  /**
   * 创建请求
   * @param requestType - 请求类型
   * @param params - 请求参数数组
   */
  createRequest(requestType: string, params: unknown[]): unknown;

  /**
   * 提交请求
   * @param request - 请求对象
   */
  commit(request: unknown): void;
}