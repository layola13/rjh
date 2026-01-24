/**
 * 删除阳角线命令模块
 * Original Module ID: 178682
 */

/**
 * 删除阳角线命令类
 * 用于处理删除阳角线（mitre molding）的操作，继承自基础命令类
 */
export declare class CmdDeleteMitreMolding extends HSApp.Cmd.Command {
  /**
   * 阳角线对象
   * 待删除的阳角线实例
   */
  private mitre: unknown;

  /**
   * 事务管理器
   * 用于管理命令的事务请求和提交
   */
  private transMgr: unknown;

  /**
   * 删除请求对象
   * 存储创建的删除阳角线事务请求
   */
  private _request: unknown;

  /**
   * 构造函数
   * @param mitre - 要删除的阳角线对象
   */
  constructor(mitre: unknown);

  /**
   * 执行命令
   * 创建删除阳角线的事务请求
   */
  onExecute(): void;

  /**
   * 接收响应
   * 处理命令执行后的响应结果
   * @param response - 响应数据
   * @param status - 响应状态
   * @returns 是否成功处理响应
   */
  onReceive(response: unknown, status: unknown): boolean;

  /**
   * 完成命令
   * 提交删除阳角线的事务请求
   */
  onComplete(): void;

  /**
   * 获取命令描述
   * @returns 命令的中文描述
   */
  getDescription(): string;

  /**
   * 获取命令分类
   * @returns 命令所属的日志分组类型
   */
  getCategory(): HSFPConstants.LogGroupTypes;
}