/**
 * 檐口线条格式刷策略模块
 * 实现了线条样式的吸取(suck)、应用(apply)以及撤销/重做功能
 */

import type { BaseStrategy } from './BaseStrategy';

/**
 * 线条配置数据结构
 */
export interface ProfileData {
  [key: string]: unknown;
}

/**
 * 材质数据结构
 */
export interface MaterialData {
  [key: string]: unknown;
}

/**
 * 线条参数配置
 */
export interface MoldingParameters {
  /** 线条轮廓元数据 */
  profileData: ProfileData;
  /** 材质数据 */
  materialData: MaterialData;
  /** 错误代码，-1表示无错误 */
  error: number;
}

/**
 * 格式刷目标对象
 * 包含需要应用样式的实体
 */
export interface FormatTarget {
  /** 目标实体对象 */
  entity: unknown;
}

/**
 * 撤销/重做数据结构
 */
export interface UndoRedoData {
  /** 线条参数配置 */
  moldingParameters: MoldingParameters;
}

/**
 * 檐口线条格式刷策略类
 * 继承自基础策略类，实现檐口线条的样式复制与应用
 * 
 * @extends BaseStrategy
 */
export default class CornicesStrategy extends BaseStrategy {
  /**
   * 策略类名标识
   * @returns 返回 "CornicesStrategy"
   */
  get ClassName(): string;

  /**
   * 判断目标对象是否可以被吸取样式
   * 
   * @param target - 格式刷目标对象
   * @returns 如果目标实体是檐口线条（Cornice）则返回 true
   */
  isSuckable(target: FormatTarget): boolean;

  /**
   * 从目标对象吸取样式数据
   * 提取檐口线条的轮廓元数据和材质信息
   * 
   * @param target - 格式刷目标对象
   * @returns 包含轮廓数据、材质数据的配置对象，失败返回 undefined
   */
  suck(target: FormatTarget): MoldingParameters | undefined;

  /**
   * 判断样式是否可以应用到目标对象
   * 
   * @param target - 格式刷目标对象
   * @param parameters - 要应用的线条参数
   * @returns 当目标是檐口线条且参数有效时返回 true
   */
  isAppliable(target: FormatTarget, parameters: MoldingParameters | null): boolean;

  /**
   * 将样式应用到目标对象
   * 根据参数创建新的檐口线条并添加到宿主对象
   * 
   * @param target - 格式刷目标对象
   * @param parameters - 要应用的线条参数
   * @returns 新创建的线条对象，失败返回 null
   */
  apply(target: FormatTarget, parameters: MoldingParameters): unknown | null;

  /**
   * 获取撤销操作所需的数据
   * 
   * @param target - 格式刷目标对象
   * @returns 包含当前状态的撤销数据
   */
  getUndoData(target: FormatTarget): UndoRedoData;

  /**
   * 获取重做操作所需的数据
   * 
   * @param target - 格式刷目标对象
   * @returns 包含当前状态的重做数据
   */
  getRedoData(target: FormatTarget): UndoRedoData;

  /**
   * 执行撤销操作
   * 将目标对象恢复到之前的状态
   * 
   * @param target - 格式刷目标对象
   * @param data - 撤销数据
   */
  undo(target: FormatTarget, data: UndoRedoData): void;

  /**
   * 执行重做操作
   * 将目标对象重新应用样式
   * 
   * @param target - 格式刷目标对象
   * @param data - 重做数据
   */
  redo(target: FormatTarget, data: UndoRedoData): void;

  /**
   * 内部方法：获取撤销/重做通用数据
   * 提取实体的元数据和材质数据
   * 
   * @param target - 格式刷目标对象
   * @returns 包含线条参数的数据对象
   * @private
   */
  private _getUndoRedoData(target: FormatTarget): UndoRedoData;
}