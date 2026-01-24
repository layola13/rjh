/**
 * 情绪板布局应用命令模块
 * 提供将情绪板数据应用到房间的命令功能
 */

import { HSApp } from './518193';
import { HSCore } from './635589';
import { HSFPConstants } from './constants';

/**
 * 情绪板模型信息
 */
export interface MoodBoardModelInfo {
  /** 模型唯一标识 */
  modelId: string;
  /** 其他模型相关属性 */
  [key: string]: unknown;
}

/**
 * 情绪板数据结构
 */
export interface MoodBoardData {
  /** 模型信息列表 */
  modelInfo: MoodBoardModelInfo[];
  /** 其他情绪板相关数据 */
  [key: string]: unknown;
}

/**
 * 应用状态枚举
 */
export type ApplyStatus = 'completed' | 'failed';

/**
 * 应用状态变更事件数据
 */
export interface ApplyStatusChangedEventData {
  /** 应用状态 */
  status: ApplyStatus;
  /** 未使用的模型ID列表 */
  unusedSeekIds: string[];
  /** 情绪板数据（成功时存在） */
  moodBoardData?: MoodBoardData;
  /** 错误信息（失败时存在） */
  error?: Error;
}

/**
 * 应用情绪板布局选项
 */
export interface ApplyMoodBoardLayoutOptions {
  /** 情绪板数据 */
  moodBoardData: MoodBoardData;
  /** 目标房间 */
  room: unknown;
  /** 应用实例 */
  app: HSApp.App;
  /** 应用前是否清空 */
  clearBeforeApply: boolean;
}

/**
 * 情绪板布局应用命令类
 * 用于将情绪板数据应用到指定房间
 * @extends HSApp.Cmd.Command
 */
export declare class CmdApplyMoodBoardLayout extends HSApp.Cmd.Command {
  /** 应用实例 */
  private readonly _app: HSApp.App;
  
  /** 目标房间 */
  private readonly _room: unknown;
  
  /** 情绪板数据 */
  private readonly _moodBoardData: MoodBoardData;
  
  /** 未使用的模型ID列表 */
  private _unusedSeekIds: string[];
  
  /** 应用前是否清空现有内容 */
  private readonly _clearBeforeApply: boolean;
  
  /** 应用状态变更信号 */
  public readonly signalApplyStatusChanged: HSCore.Util.Signal<ApplyStatusChangedEventData>;

  /**
   * 构造函数
   * @param room - 目标房间对象
   * @param moodBoardData - 情绪板数据
   * @param clearBeforeApply - 应用前是否清空，默认为true
   */
  constructor(
    room: unknown,
    moodBoardData: MoodBoardData,
    clearBeforeApply?: boolean
  );

  /**
   * 执行命令
   * 应用情绪板布局到房间
   */
  onExecute(): void;

  /**
   * 获取未使用的模型ID列表
   * @returns 未应用成功的模型ID数组
   */
  getUnusedSeekIds(): string[];

  /**
   * 清理命令资源
   * 释放信号和相关资源
   */
  onCleanup(): void;

  /**
   * 判断命令是否可以挂起
   * @returns 始终返回true
   */
  canSuspend(): boolean;

  /**
   * 获取命令描述
   * @returns 命令的描述文本
   */
  getDescription(): string;

  /**
   * 获取命令分类
   * @returns 日志分组类型（内容操作）
   */
  getCategory(): HSFPConstants.LogGroupTypes.ContentOperation;
}

/**
 * 应用情绪板布局的核心函数
 * @param options - 应用选项
 * @returns Promise，resolve时返回已应用的模型ID数组
 */
export declare function applyMoodBoardLayout(
  options: ApplyMoodBoardLayoutOptions
): Promise<string[]>;