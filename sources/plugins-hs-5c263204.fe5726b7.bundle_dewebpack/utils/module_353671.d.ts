/**
 * 反馈统计组件类型声明
 * @module FeedbackStatistics
 */

import { FC, ReactNode } from 'react';

/**
 * 单个统计数据项的接口
 */
export interface FeedbackStatisticItem {
  /** 统计项名称 */
  name: string;
  /** 统计数量 */
  count: number;
}

/**
 * 反馈统计组件的属性接口
 */
export interface FeedbackStatisticsProps {
  /** 统计数据数组 */
  data: FeedbackStatisticItem[];
}

/**
 * 反馈统计组件
 * 
 * @description 显示多个统计数据项，使用分隔线分隔各项
 * @param props - 组件属性
 * @returns 反馈统计组件
 * 
 * @example
 *