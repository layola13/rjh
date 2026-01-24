/**
 * 剪切命令 - 用于剪切选中的平面图物品
 * @module CutCommand
 */

import { Command } from 'HSApp.Cmd';
import { Selection } from 'HSApp.Selection';

/**
 * 剪切命令构造函数参数接口
 */
export interface CutCommandOptions {
  /** 选中的物品集合 */
  selections: Selection[];
  /** 用户输入插件实例 */
  userinputPlugin: any;
  /** 平面图实例 */
  floorplan: any;
  /** 应用程序实例 */
  app: any;
}

/**
 * 剪切命令类 - 继承自 HSApp.Cmd.Command
 * 
 * 该命令执行以下操作：
 * 1. 调用复制命令保存选中物品
 * 2. 取消所有选中状态
 * 3. 删除所有支持复制粘贴的选中物品
 * 
 * @extends HSApp.Cmd.Command
 */
export default class CutCommand extends Command {
  /** 选中的物品集合 */
  private _selections: Selection[];
  
  /** 用户输入插件实例 */
  private _userinputPlugin: any;
  
  /** 平面图实例 */
  private _floorplan: any;
  
  /** 应用程序实例 */
  private _app: any;

  /**
   * 创建剪切命令实例
   * @param options - 命令配置选项
   */
  constructor(options: CutCommandOptions);

  /**
   * 执行剪切命令
   * - 开启事务会话
   * - 先执行复制操作
   * - 取消所有选中
   * - 删除支持复制粘贴的物品
   * - 提交事务
   */
  onExecute(): void;

  /**
   * 接收命令回调（空实现）
   */
  onReceive(): void;

  /**
   * 判断命令是否支持撤销/重做
   * @returns 始终返回 false，表示不支持撤销重做
   */
  canUndoRedo(): boolean;

  /**
   * 获取命令描述
   * @returns 返回 "剪切物品"
   */
  getDescription(): string;

  /**
   * 获取命令所属类别
   * @returns 返回内容操作类别常量
   */
  getCategory(): string;
}

/**
 * 检查给定类是否支持复制粘贴操作
 * @param classType - 物品类类型
 * @returns 是否支持复制粘贴
 */
declare function isCopyPasteSupported(classType: any): boolean;