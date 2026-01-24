import { HSCore } from './HSCore';
import { HSApp } from './HSApp';
import { HSFPConstants } from './HSFPConstants';

/**
 * 参数化内容基础编辑命令
 * 
 * 用于编辑参数化软装内容的基础命令类，支持：
 * - 参数化浴室柜（ParametricBathroomCabinet）
 * - 参数化窗帘（ParametricCurtain）
 * - 其他参数化内容基类（ParametricContentBase）
 * 
 * @extends HSApp.Cmd.Command
 */
export declare class CmdEditParametricContentBase extends HSApp.Cmd.Command {
  /**
   * 当前编辑的参数化内容对象
   */
  private _content: HSCore.Model.ParametricContentBase;

  /**
   * 请求类型标识
   */
  private _requestType: HSFPConstants.RequestType;

  /**
   * 事务管理器请求对象
   */
  private _request: any | undefined;

  /**
   * 构造函数
   * @param content - 要编辑的参数化内容对象
   */
  constructor(content: HSCore.Model.ParametricContentBase);

  /**
   * 提交事务请求
   * 如果存在有效的请求对象，将其提交到事务管理器
   * @private
   */
  private _commitRequest(): void;

  /**
   * 命令完成时的回调
   * 提交请求并调用父类的完成处理
   */
  onComplete(): void;

  /**
   * 命令执行时的回调
   * 通过事务管理器创建编辑参数化内容的请求
   */
  onExecute(): void;

  /**
   * 接收消息的回调处理
   * 
   * @param eventType - 事件类型，如 "onReset" 等
   * @param data - 事件携带的数据
   * @returns 返回 true 表示消息已处理
   * 
   * @remarks
   * - 当事件类型为 "onReset" 时，会异步加载元数据后再接收
   * - 其他事件直接传递给请求对象处理
   */
  onReceive(eventType: string, data: any): boolean;

  /**
   * 获取命令所属的日志分类
   * 
   * @returns 根据内容类型返回对应的日志分组类型：
   * - ParametricBathroomCabinet: 参数化浴室柜
   * - ParametricCurtain: 参数化窗帘
   * - ParametricContentBase: 通用参数化内容
   */
  getCategory(): HSFPConstants.LogGroupTypes;

  /**
   * 获取命令的描述文本
   * 
   * @returns 根据内容类型返回对应的中文描述：
   * - "编辑参数化浴室柜"
   * - "编辑参数化窗帘"
   * - "编辑参数化软装"
   */
  getDescription(): string;
}