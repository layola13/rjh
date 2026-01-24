/**
 * 环境切换日志计算模块
 * 用于记录和追踪用户在不同环境之间的切换行为
 */

import { performanceDateNow } from './performance-utils';

/**
 * 环境切换参数
 */
export interface EnvironmentSwitchParams {
  /** 新环境ID */
  newEnvironmentId?: string;
  /** 旧环境ID */
  oldEnvironmentId?: string;
  /** 新环境对象 */
  env?: Environment;
  /** 旧环境对象 */
  oldEnv?: Environment;
  /** 上一个环境信息 */
  lastEnviroment?: LastEnvironmentInfo;
}

/**
 * 环境对象接口
 */
export interface Environment {
  /** 获取点击率数据的方法 */
  getClickRatioData?: (env: Environment) => ClickRatioData | null;
}

/**
 * 点击率数据
 */
export interface ClickRatioData {
  /** 点击率数据ID */
  id: string;
  /** 点击率数据名称 */
  name: string;
}

/**
 * 上一个环境信息
 */
export interface LastEnvironmentInfo {
  /** 环境ID */
  environmentId?: string;
  /** 当前时间戳 */
  currentTime?: number;
  /** 性能时间戳 */
  performanceCurrentTime?: number;
}

/**
 * 日志数据项
 */
export interface LogDataItem {
  /** 日志名称（通常为 environmentId.env） */
  name: string;
  /** 日志参数 */
  params: LogParams;
  /** 是否立即发送 */
  sendNow: boolean;
  /** 触发类型：start-开始，end-结束 */
  triggerType: 'start' | 'end';
  /** 是否启用备注 */
  enableNotes: boolean;
  /** 结束参数回调函数（可选） */
  endParamsCallback?: () => Partial<LogParams>;
  /** 当前时间戳 */
  currentTime: number;
  /** 性能当前时间戳 */
  performanceCurrentTime: number;
}

/**
 * 日志参数
 */
export interface LogParams {
  /** 描述信息 */
  description: string;
  /** 激活的环境ID（可选） */
  activeEnvironmentId?: string;
  /** 激活的环境名称（可选） */
  activeEnvironmentName?: string;
  /** 激活的区域名称（可选） */
  activeSectionName?: string;
  /** 激活的区域（可选） */
  activeSection?: string;
  /** 点击率数据（可选） */
  clicksRatio?: ClickRatioData;
}

/**
 * 日志计算器接口
 */
export interface ComputerLog {
  /**
   * 测试函数：判断是否满足此日志记录条件
   * @param params 环境切换参数
   * @returns 是否满足条件
   */
  test: (params: EnvironmentSwitchParams) => boolean;
  
  /**
   * 获取日志数据列表
   * @param params 环境切换参数
   * @returns 日志数据项数组
   */
  getLogDataList: (params: EnvironmentSwitchParams) => LogDataItem[];
}

/**
 * 环境切换日志计算器列表
 * 包含多个日志计算器，每个计算器负责处理特定的环境切换场景
 */
export declare const computerLogList: ComputerLog[];

/**
 * 获取环境名称
 * @param environmentId 环境ID
 * @returns 环境名称，如果未找到则返回环境ID本身
 */
declare function getEnvironmentName(environmentId: string): string;