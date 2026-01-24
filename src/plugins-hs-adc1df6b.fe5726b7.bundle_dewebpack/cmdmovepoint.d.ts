import { HSApp } from './HSApp';
import { HSFPConstants } from './HSFPConstants';
import { ResourceManager } from './ResourceManager';

/**
 * 外部区域绘制 - 移动点命令
 * 
 * 该类继承自 HSApp.ExtraordinarySketch2d.Cmd.CmdMovePoint，
 * 用于处理户外绘图场景中的点移动操作。
 * 
 * @module CmdMovePoint
 * @category OutdoorDrawing
 */
export declare class CmdMovePoint extends HSApp.ExtraordinarySketch2d.Cmd.CmdMovePoint {
  /**
   * 构造函数
   * 创建一个新的移动点命令实例
   */
  constructor();

  /**
   * 创建移动点操作的请求对象
   * 
   * @param requestData - 请求所需的数据参数
   * @returns 返回事务管理器创建的移动点请求对象
   * @protected
   */
  protected _createRequest(requestData: unknown): unknown;

  /**
   * 获取命令的描述信息
   * 
   * @returns 返回 "外部区域绘制-移动点" 的描述文本
   * @public
   */
  getDescription(): string;

  /**
   * 获取拓扑无效时的提示信息
   * 
   * @returns 从资源管理器中获取的本地化提示文本
   * @protected
   */
  protected _getToposInvalidTip(): string;

  /**
   * 获取命令所属的日志分类
   * 
   * @returns 返回户外绘图类型的日志分组标识
   * @public
   */
  getCategory(): string;

  /**
   * 上下文对象，包含事务管理器等核心服务
   * @protected
   */
  protected context: {
    /**
     * 事务管理器，用于创建和管理各类请求
     */
    transManager: {
      /**
       * 创建指定类型的请求
       * @param requestType - 请求类型标识
       * @param data - 请求数据
       */
      createRequest(requestType: string, data: unknown): unknown;
    };
  };
}