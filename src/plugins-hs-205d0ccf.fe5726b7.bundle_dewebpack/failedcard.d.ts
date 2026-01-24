/**
 * FailedCard 组件模块
 * 用于展示渲染失败的卡片视图
 */

import type { ReactElement } from 'react';

/**
 * 卡片项数据接口
 */
export interface FailedCardItem {
  /** 分辨率比例标识 */
  resolutionRatio: string;
  [key: string]: unknown;
}

/**
 * 工具提示项接口
 */
export interface TooltipItem {
  /** 提示项标识或内容 */
  [key: string]: unknown;
}

/**
 * FailedCard 组件属性接口
 */
export interface FailedCardProps {
  /** 卡片数据项 */
  item: FailedCardItem;
  /** 卡片背景图片源地址 */
  src: string;
  /** 工具提示项列表 */
  tooltipItems: TooltipItem[];
}

/**
 * 渲染失败卡片组件
 * 
 * 显示渲染失败的项目卡片，包含：
 * - 背景图片
 * - 分辨率标识
 * - 失败状态标签
 * - 悬浮遮罩
 * - 工具提示
 * 
 * @param props - 组件属性
 * @returns React 元素
 * 
 * @example
 *