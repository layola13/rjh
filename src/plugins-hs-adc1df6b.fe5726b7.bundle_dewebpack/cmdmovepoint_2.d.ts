import { HSApp } from './HSApp';
import { ResourceManager } from './ResourceManager';
import { HSFPConstants } from './HSFPConstants';

/**
 * 屋顶绘图模块中的移动点命令
 * 继承自 HSApp.ExtraordinarySketch2d.Cmd.CmdMovePoint
 * 用于处理屋顶编辑时移动点的操作
 */
export declare class CmdMovePoint extends HSApp.ExtraordinarySketch2d.Cmd.CmdMovePoint {
  /**
   * 构造函数
   */
  constructor();

  /**
   * 创建移动点请求
   * @param requestData - 请求数据参数
   * @returns 返回事务管理器创建的请求对象
   * @protected
   */
  protected _createRequest(requestData: unknown): unknown;

  /**
   * 获取命令描述
   * @returns 返回命令的中文描述 "屋顶编辑移动点"
   */
  getDescription(): string;

  /**
   * 获取命令所属的日志分类
   * @returns 返回屋顶绘图日志组类型
   */
  getCategory(): HSFPConstants.LogGroupTypes;

  /**
   * 获取拓扑无效时的提示信息
   * @returns 返回拓扑无效的本地化提示文本
   * @protected
   */
  protected _getToposInvalidTip(): string;
}