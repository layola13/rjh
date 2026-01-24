import type { ReactNode, CSSProperties, FC, ReactElement } from 'react';

/**
 * Timeline组件的位置类型
 */
export type TimelinePosition = 'left' | 'right' | 'alternate';

/**
 * Timeline组件的模式类型
 */
export type TimelineMode = '' | 'left' | 'right' | 'alternate';

/**
 * TimelineItem组件的属性接口
 */
export interface TimelineItemProps {
  /**
   * 自定义CSS类名
   */
  className?: string;
  
  /**
   * 自定义时间轴点
   */
  dot?: ReactNode;
  
  /**
   * 是否为待处理状态
   */
  pending?: boolean;
  
  /**
   * 指定该项的位置（仅在alternate模式下有效）
   */
  position?: 'left' | 'right';
  
  /**
   * 设置标签文本
   */
  label?: ReactNode;
  
  /**
   * 子节点内容
   */
  children?: ReactNode;
  
  /**
   * 自定义样式
   */
  style?: CSSProperties;
}

/**
 * Timeline组件的属性接口
 */
export interface TimelineProps {
  /**
   * 自定义CSS类名前缀
   */
  prefixCls?: string;
  
  /**
   * 自定义CSS类名
   */
  className?: string;
  
  /**
   * 指定最后一个节点为幽灵节点（表示待处理状态）
   * - 为 true 时显示默认的待处理节点
   * - 为 ReactNode 时显示自定义的待处理内容
   */
  pending?: boolean | ReactNode;
  
  /**
   * 当最后一个节点为幽灵节点时，自定义其时间轴点
   */
  pendingDot?: ReactNode;
  
  /**
   * 子节点（TimelineItem列表）
   */
  children?: ReactNode;
  
  /**
   * 是否倒序显示时间轴
   * @default false
   */
  reverse?: boolean;
  
  /**
   * 时间轴和内容的相对位置
   * - left: 内容在时间轴右侧
   * - right: 内容在时间轴左侧
   * - alternate: 内容交替出现在时间轴两侧
   * @default ''
   */
  mode?: TimelineMode;
  
  /**
   * 自定义样式
   */
  style?: CSSProperties;
}

/**
 * TimelineItem组件类型
 */
export declare const TimelineItem: FC<TimelineItemProps>;

/**
 * Timeline时间轴组件接口
 * 用于垂直展示的时间流信息
 */
export interface TimelineComponent extends FC<TimelineProps> {
  /**
   * TimelineItem子组件
   */
  Item: typeof TimelineItem;
}

/**
 * Timeline时间轴组件
 * 
 * @example
 *