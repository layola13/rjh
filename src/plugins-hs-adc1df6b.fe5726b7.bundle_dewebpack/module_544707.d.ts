/**
 * 移动门窗命令模块
 * Module ID: 544707
 */

import { HSApp, HSCore, HSDevice } from './dependencies';

/**
 * 移动门窗操作的输出结果
 */
export interface MoveOpeningOutput {
  /** 操作的内容对象 */
  content: HSCore.Model.Opening | HSCore.Model.ParametricOpening | HSCore.Model.DOpening;
  /** 替换目标对象 */
  replaceTarget?: HSCore.Model.Opening | HSCore.Model.ParametricOpening;
}

/**
 * 命令构造参数
 */
export interface MoveOpeningCommandOptions {
  /** 原始选中对象 */
  originSelections?: Array<HSCore.Model.Opening>;
  /** 是否为方向键触发 */
  isArrowKey?: boolean;
}

/**
 * 目标尺寸参数
 */
export interface TargetSizeParams {
  x?: number;
  y?: number;
  z?: number;
}

/**
 * 调整尺寸参数
 */
export interface ResizeParams extends TargetSizeParams {
  /** 完成回调 */
  callback?: () => void;
  /** X 轴位置 */
  posx?: number;
  /** Y 轴位置 */
  posy?: number;
  /** Z 轴位置 */
  posz?: number;
  /** 忽略验证 */
  ignoreValidate?: boolean;
}

/**
 * 移动到指定位置参数
 */
export interface MoveToParams {
  /** 目标位置 */
  position: { x?: number; y?: number; z?: number } | HSCore.Math.Vector2;
  /** 是否启用吸附 */
  snap?: boolean;
}

/**
 * 移动门窗命令类
 * 负责处理门窗、参数化开口等对象的移动、调整大小和替换操作
 */
export default class MoveOpeningCommand extends HSApp.Cmd.Command {
  /** 操作的内容对象 */
  content: HSCore.Model.Opening | HSCore.Model.ParametricOpening | HSCore.Model.DOpening;
  
  /** 命令输出结果 */
  output: MoveOpeningOutput;
  
  /** 是否为方向键触发 */
  isArrowKey: boolean;

  /**
   * 构造函数
   * @param content - 要移动的开口对象
   * @param defaultPosition - 默认位置（可选）
   * @param options - 额外选项
   */
  constructor(
    content: HSCore.Model.Opening | HSCore.Model.ParametricOpening | HSCore.Model.DOpening,
    defaultPosition?: HSCore.Math.Vector2,
    options?: MoveOpeningCommandOptions
  );

  /**
   * 执行命令初始化
   */
  onExecute(): void;

  /**
   * 完成命令
   */
  completeSelf(): void;

  /**
   * 调整大小完成回调
   */
  resizeCallBack(): void;

  /**
   * 命令完成时的处理
   */
  onComplete(): void;

  /**
   * 命令取消时的处理
   */
  onCancel(): void;

  /**
   * 命令清理时的处理
   */
  onCleanup(): void;

  /**
   * 判断内容是否可拖拽
   */
  isDraggable(): boolean;

  /**
   * 接收事件处理
   * @param eventType - 事件类型
   * @param eventData - 事件数据
   * @returns 是否处理该事件
   */
  onReceive(eventType: string, eventData: any): boolean;

  /**
   * 处理键盘按下事件
   * @param position - 目标位置
   */
  handleKeyDown(position: { x: number; y: number }): void;

  /**
   * 处理键盘释放事件
   * @param eventData - 事件数据
   */
  handleKeyUp(eventData: any): void;

  /**
   * 计算移动方向
   * @param keyCode - 键盘码
   * @returns 移动方向向量
   */
  calcMoveDirection(keyCode: number): { x: number; y: number; z: number };

  /**
   * 获取移动参数
   * @param direction - 移动方向
   * @param keyCode - 键盘码
   * @returns 移动向量
   */
  getMoveParam(direction: { x: number; y: number; z: number }, keyCode: number): THREE.Vector3;

  /**
   * 查找可替换的门窗对象
   * @param currentTarget - 当前替换目标
   * @returns 新的替换目标或 undefined
   */
  findReplaceDoorOrWindow(
    currentTarget?: HSCore.Model.Opening | HSCore.Model.ParametricOpening
  ): HSCore.Model.Opening | HSCore.Model.ParametricOpening | undefined;

  /**
   * 判断命令是否可交互
   */
  isInteractive(): boolean;

  /**
   * 获取命令描述
   */
  getDescription(): string;

  /**
   * 获取命令分类
   */
  getCategory(): string;

  /**
   * 获取当前命令参数（用于日志）
   */
  getCurrentParams(): {
    activeSection: string;
    activeSectionName: string;
    clicksRatio: {
      id: string;
      name: string;
    };
  };
}