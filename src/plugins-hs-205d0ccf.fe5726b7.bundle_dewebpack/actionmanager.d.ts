/**
 * 动作管理器模块
 * 负责管理和执行各种类型的动作（AI建模、社区灵感、情绪板等）
 */

import { CommunityInspirationAction } from './CommunityInspirationAction';
import { AIModelerAction } from './AIModelerAction';
import { SpecialTopicModel } from './SpecialTopicModel';
import { ApplyAIMoodBoard } from './ApplyAIMoodBoard';

/**
 * 支持的动作类型
 */
export type ActionType =
  | 'communityInspiration'
  | 'aiModelerUpload'
  | 'aiMoodboardUpload'
  | 'aiMaterial'
  | 'applyAIMoodBoard'
  | 'specialTopicModel';

/**
 * 动作执行参数
 */
export interface ActionExecuteParams {
  actionType: ActionType;
  [key: string]: unknown;
}

/**
 * 动作基类接口
 */
export interface IAction {
  manager?: ActionManager;
  onExecute(params: ActionExecuteParams): void;
  onComplete(): void;
  onCancel(): void;
}

/**
 * 动作管理器
 * 用于创建、执行、取消和完成各种动作
 */
export declare class ActionManager {
  /**
   * 当前正在执行的动作实例
   */
  private _currentAction?: IAction;

  /**
   * 执行指定类型的动作
   * @param actionType - 动作类型
   * @param params - 动作执行参数（可选）
   */
  execute(actionType: ActionType, params?: Record<string, unknown>): void;

  /**
   * 完成当前动作
   * 调用当前动作的onComplete方法并清理动作实例
   */
  complete(): void;

  /**
   * 取消当前动作
   * 调用当前动作的onCancel方法并清理动作实例
   */
  cancel(): void;
}