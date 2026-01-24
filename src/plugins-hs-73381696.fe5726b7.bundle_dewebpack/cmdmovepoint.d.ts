/**
 * 楼板编辑移动点命令
 * 
 * 该模块定义了楼板编辑中移动点的命令类，继承自基础的移动点命令。
 * 主要用于楼板编辑场景下的点位移动操作。
 * 
 * @module CmdMovePoint
 */

import { HSApp } from './HSApp';
import { HSFPConstants } from './HSFPConstants';

/**
 * 移动点请求参数接口
 */
interface IMovePointRequestParams {
  /** 点的唯一标识符 */
  pointId: string;
  /** 目标X坐标 */
  targetX: number;
  /** 目标Y坐标 */
  targetY: number;
  /** 可选的附加参数 */
  [key: string]: unknown;
}

/**
 * 请求对象接口
 */
interface IRequest {
  /** 请求类型 */
  type: string;
  /** 请求参数 */
  params: IMovePointRequestParams;
  /** 执行请求 */
  execute(): Promise<void>;
  /** 撤销请求 */
  undo(): Promise<void>;
}

/**
 * 事务管理器接口
 */
interface ITransactionManager {
  /**
   * 创建请求
   * @param requestType 请求类型
   * @param params 请求参数
   * @returns 返回创建的请求对象
   */
  createRequest(requestType: string, params: IMovePointRequestParams): IRequest;
}

/**
 * 命令上下文接口
 */
interface ICommandContext {
  /** 事务管理器实例 */
  transManager: ITransactionManager;
}

/**
 * 楼板编辑移动点命令类
 * 
 * 继承自基础的CmdMovePoint命令，专门用于楼板编辑场景。
 * 提供了创建移动点请求、获取命令描述和分类等功能。
 * 
 * @class CmdMovePoint
 * @extends {HSApp.ExtraordinarySketch2d.Cmd.CmdMovePoint}
 */
export class CmdMovePoint extends HSApp.ExtraordinarySketch2d.Cmd.CmdMovePoint {
  /** 命令执行上下文 */
  protected context: ICommandContext;

  /**
   * 创建移动点请求
   * 
   * 通过事务管理器创建一个楼板编辑的移动点请求。
   * 
   * @param params 移动点的参数对象，包含点ID和目标坐标等信息
   * @returns 返回创建的请求对象
   * @protected
   */
  protected _createRequest(params: IMovePointRequestParams): IRequest {
    return this.context.transManager.createRequest(
      HSFPConstants.RequestType.SlabEdit.MovePoint,
      params
    );
  }

  /**
   * 获取命令描述
   * 
   * 返回该命令的中文描述，用于日志记录和用户界面展示。
   * 
   * @returns 命令的描述文本
   * @public
   */
  public getDescription(): string {
    return "楼板编辑移动点";
  }

  /**
   * 获取命令分类
   * 
   * 返回该命令所属的日志分组类型，用于命令的分类管理和统计。
   * 
   * @returns 命令所属的分类类型
   * @public
   */
  public getCategory(): string {
    return HSFPConstants.LogGroupTypes.SlabEdit;
  }
}