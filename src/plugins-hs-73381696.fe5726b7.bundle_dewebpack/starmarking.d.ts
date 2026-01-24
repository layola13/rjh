import React from 'react';

/**
 * 评分模块的数据类型
 */
export type MarkingModule = string | number;

/**
 * 评分变更事件的数据结构
 */
export interface MarkingScoreChangeData {
  /** 评分模块标识 */
  module: MarkingModule;
  /** 评分分数（1-5星） */
  score: number;
}

/**
 * StarMarking 组件的 Props 类型
 */
export interface StarMarkingProps {
  /** 模块数据/名称 */
  data: MarkingModule;
  /** 评分变更回调函数 */
  changeMarkingScores: (data: MarkingScoreChangeData) => void;
}

/**
 * StarMarking 组件的 State 类型
 */
export interface StarMarkingState {
  /** 当前点击选中的星级索引（1-5） */
  clickIndex: number;
  /** 当前鼠标悬停的星级索引（1-5，0表示未悬停） */
  hoverIndex: number;
}

/**
 * 星级评分组件
 * 
 * 提供1-5星的评分功能，支持点击选择和鼠标悬停预览
 * 
 * @example
 *