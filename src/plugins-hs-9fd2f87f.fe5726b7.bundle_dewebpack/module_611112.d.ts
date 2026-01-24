/**
 * 复制物品命令类型定义
 * @module DuplicateCommand
 */

import { HSCore } from '635589';
import { HSApp } from 'HSApp';
import { HSFPConstants } from 'HSFPConstants';
import { HSCatalog } from 'HSCatalog';
import { HSConstants } from 'HSConstants';

/**
 * 复制序列命令选项
 */
interface DuplicateSequenceOptions {
  /** 忽略捕捉偏移 */
  ignoreSnapOffset: boolean;
  /** 循环执行 */
  cyclicExecutive: boolean;
  /** 取消时完成序列 */
  completeSequenceOnCancel: boolean;
}

/**
 * 可选择的模型类型
 */
type SelectableModel = 
  | HSCore.Model.Content
  | HSCore.Model.Door
  | HSCore.Model.Window
  | HSCore.Model.CornerWindow
  | HSCore.Model.ParametricOpening
  | HSCore.Model.NgContent
  | HSCore.Model.NgSoftCloth
  | HSCore.Model.NgGroup;

/**
 * 用户输入插件接口
 */
interface UserInputPlugin {
  // 根据实际使用补充方法签名
}

/**
 * 复制物品命令类
 * 用于复制选中的模型对象（内容、门窗、软装、组等）
 * 
 * @extends {HSApp.Cmd.Command}
 */
export default class DuplicateCommand extends HSApp.Cmd.Command {
  /** 用户输入插件实例 */
  private _userinputPlugin: UserInputPlugin;
  
  /** 命令是否完成 */
  private _isComplete: boolean;

  /**
   * 构造函数
   * @param manager - 命令管理器
   */
  constructor(manager: unknown);

  /**
   * 执行命令
   * 复制当前选中的模型对象
   */
  onExecute(): void;

  /**
   * 验证选中的对象是否有效
   * @param selectedObjects - 选中的对象数组
   * @returns 是否有效（非空且所有对象类型合法）
   */
  private _isValid(selectedObjects: SelectableModel[]): boolean;

  /**
   * 是否可以撤销/重做
   * @returns false - 此命令不支持撤销重做
   */
  canUndoRedo(): false;

  /**
   * 是否可以挂起
   * @returns false - 此命令不支持挂起
   */
  canSuspend(): false;

  /**
   * 获取命令描述
   * @returns 命令描述文本
   */
  getDescription(): string;

  /**
   * 获取命令分类
   * @returns 命令所属的日志分组类型
   */
  getCategory(): HSFPConstants.LogGroupTypes;
}