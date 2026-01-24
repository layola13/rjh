/**
 * 模块：期间项组件
 * 提供教学能力相关的期间项展示功能
 */

import React from 'react';

/**
 * 文章项数据结构
 */
export interface Article {
  /** 文章唯一标识 */
  id: string | number;
  /** 文章标题 */
  title: string;
  /** 文章内容或摘要 */
  content?: string;
  /** 其他文章相关属性 */
  [key: string]: unknown;
}

/**
 * 期间项组件属性
 */
export interface PeriodItemProps {
  /** 来源标识 */
  from: string;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 期间名称 */
  period: string;
  /** 文章列表 */
  articles: Article[];
  /** 是否显示NEW标记 */
  isNew?: boolean;
  /** 是否显示"更多"按钮 */
  showMore?: boolean;
  /** "更多"按钮点击回调 */
  onMoreClick?: (event: React.MouseEvent<HTMLSpanElement>) => void;
}

/**
 * 期间项组件
 * 用于展示特定时期的教学能力文章列表
 * 
 * @param props - 组件属性
 * @returns 期间项React元素
 */
export default function PeriodItem(props: PeriodItemProps): React.ReactElement;

/**
 * NEW标记组件
 * 内部使用，用于显示"NEW"标签
 * 
 * @returns NEW标记React元素
 */
declare function NewBadge(): React.ReactElement;