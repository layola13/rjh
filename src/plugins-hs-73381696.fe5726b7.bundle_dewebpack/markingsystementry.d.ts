/**
 * 评分系统入口组件
 * 用于收集用户对产品功能的评分和反馈
 */

import React from 'react';

/**
 * 评分数据项接口
 */
export interface MarkingScore {
  /** 模块名称 */
  module: string;
  /** 评分值 */
  score: number;
  /** 其他评分相关数据 */
  [key: string]: any;
}

/**
 * 评分历史记录项接口
 */
export interface MarkingHistoryItem {
  /** 模块标识 */
  module: string;
  /** 功能名称 */
  functionName?: string;
  /** 使用时间戳 */
  timestamp?: number;
  /** 其他历史数据 */
  [key: string]: any;
}

/**
 * 组件属性接口
 */
export interface MarkingSystemEntryProps {
  /** 提交评分时的回调函数 */
  onSubmit?: (scores: MarkingScore[]) => void;
  /** 关闭弹窗时的回调函数 */
  onClose?: () => void;
}

/**
 * 组件状态接口
 */
export interface MarkingSystemEntryState {
  /** 是否显示弹窗 */
  show: boolean;
  /** 提交按钮是否禁用 */
  disabled: boolean;
}

/**
 * 评分系统入口组件类
 * 负责展示评分弹窗，收集用户对多个功能模块的评分和文字反馈
 */
export declare class MarkingSystemEntry extends React.Component<
  MarkingSystemEntryProps,
  MarkingSystemEntryState
> {
  /** 用户评分数据集合 */
  scores: MarkingScore[];
  
  /** 随机选中的历史记录索引数组 */
  randomArray: number[];
  
  /** 组件状态 */
  state: MarkingSystemEntryState;

  /**
   * 构造函数
   * @param props - 组件属性
   */
  constructor(props: MarkingSystemEntryProps);

  /**
   * 生命周期：接收新属性时触发（已废弃）
   * 重置评分数据并显示弹窗
   */
  UNSAFE_componentWillReceiveProps(): void;

  /**
   * 显示评分弹窗
   * 仅当有评分历史记录且租户为非"fp"时显示
   */
  showPopup(): void;

  /**
   * 隐藏评分弹窗
   */
  hidePopup(): void;

  /**
   * 提交评分数据
   * 将评分和评论发送到后端API，并记录最后评分时间
   */
  submitMarking(): void;

  /**
   * 处理关闭按钮点击事件
   * 记录延迟时间（7天）并触发关闭回调
   */
  handleCloseClick(): void;

  /**
   * 获取待评分的功能模块项
   * 根据随机数组从历史记录中选取项目生成StarMarking组件
   * @returns React元素数组
   */
  getMarkingItems(): React.ReactElement[];

  /**
   * 更新评分数据
   * 如果同一模块已有评分则替换，否则添加新评分
   * @param score - 新的评分数据
   */
  changeMarkingScores(score: MarkingScore | null): void;

  /**
   * 从指定范围内随机选取不重复的索引
   * @param total - 总数量
   * @param count - 需要选取的数量
   * @returns 随机索引数组
   */
  getRandomItems(total: number, count: number): number[];

  /**
   * 渲染组件
   * @returns React元素或null
   */
  render(): React.ReactElement | null;
}