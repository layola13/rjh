/**
 * 单房间选择命令模块
 * 用于在应用中选择并切换到单个房间视图
 * @module CmdSelectSingleRoom
 * @originalId 980958
 */

import { HSApp } from './HSApp';
import { HSFPConstants } from './HSFPConstants';

/**
 * 单房间选择命令类
 * 继承自HSApp命令基类，用于执行单房间选择操作
 * @extends HSApp.Cmd.Command
 */
export declare class CmdSelectSingleRoom extends HSApp.Cmd.Command {
  /**
   * 目标房间对象
   * @private
   */
  private readonly _room: unknown;

  /**
   * 构造函数
   * @param room - 要选择的房间对象
   */
  constructor(room: unknown);

  /**
   * 执行命令
   * 选择指定房间并标记命令完成
   * @override
   */
  onExecute(): void;

  /**
   * 执行房间选择逻辑
   * 获取SingleRoom插件并设置目标房间，启用单房间模式
   * @param room - 要选择的房间对象
   * @private
   */
  private _selectRoom(room: unknown): void;

  /**
   * 获取命令描述
   * @returns 命令的文字描述
   * @override
   */
  getDescription(): string;

  /**
   * 获取命令所属分类
   * @returns 日志分组类型，返回缩略图视图分类
   * @override
   */
  getCategory(): HSFPConstants.LogGroupTypes;
}