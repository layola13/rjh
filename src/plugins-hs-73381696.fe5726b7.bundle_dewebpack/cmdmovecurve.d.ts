/**
 * 楼板编辑移动曲线命令模块
 * @module CmdMoveCurve
 */

import { HSApp } from './HSApp';

declare namespace HSFPConstants {
  /**
   * 请求类型常量
   */
  namespace RequestType {
    namespace SlabEdit {
      /**
       * 移动曲线请求类型
       */
      const MoveCurve: string | number;
    }
  }

  /**
   * 日志分组类型常量
   */
  namespace LogGroupTypes {
    /**
     * 楼板编辑日志分组
     */
    const SlabEdit: string | number;
  }
}

/**
 * 事务管理器接口
 */
interface ITransactionManager {
  /**
   * 创建请求
   * @param requestType 请求类型
   * @param data 请求数据
   * @returns 创建的请求对象
   */
  createRequest(requestType: string | number, data: unknown): unknown;
}

/**
 * 命令上下文接口
 */
interface ICommandContext {
  /**
   * 事务管理器实例
   */
  transManager: ITransactionManager;
}

/**
 * 基础移动曲线命令类
 */
declare class BaseCmdMoveCurve {
  /**
   * 命令执行上下文
   */
  protected context: ICommandContext;

  constructor(...args: unknown[]);
}

/**
 * 楼板编辑移动曲线命令类
 * @description 用于楼板编辑场景下移动边界曲线的命令
 * @extends {HSApp.ExtraordinarySketch2d.Cmd.CmdMoveCurve}
 */
export declare class CmdMoveCurve extends BaseCmdMoveCurve {
  /**
   * 构造函数
   * @param args 构造参数
   */
  constructor(...args: unknown[]);

  /**
   * 创建移动曲线请求
   * @param data 请求数据
   * @returns 创建的请求对象
   * @protected
   */
  protected _createRequest(data: unknown): unknown;

  /**
   * 获取命令描述信息
   * @returns 返回命令的中文描述
   */
  getDescription(): string;

  /**
   * 获取命令分类
   * @returns 返回命令所属的日志分组类型
   */
  getCategory(): string | number;
}

/**
 * HSApp命名空间扩展
 */
declare global {
  namespace HSApp {
    namespace ExtraordinarySketch2d {
      namespace Cmd {
        /**
         * 基础移动曲线命令类（全局定义）
         */
        class CmdMoveCurve extends BaseCmdMoveCurve {}
      }
    }
  }
}