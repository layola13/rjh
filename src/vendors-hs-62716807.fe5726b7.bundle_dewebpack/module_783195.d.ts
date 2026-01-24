/**
 * Timeline Item Component
 * 时间轴项组件的类型声明
 */

import * as React from 'react';

/**
 * Timeline Item 组件的属性接口
 */
export interface TimelineItemProps {
  /**
   * 自定义类名前缀
   * @default 'timeline'
   */
  prefixCls?: string;

  /**
   * 自定义类名
   */
  className?: string;

  /**
   * 时间轴节点颜色
   * 可以是预设颜色 (blue, red, green, gray) 或自定义十六进制颜色值
   * @default 'blue'
   */
  color?: 'blue' | 'red' | 'green' | 'gray' | string;

  /**
   * 自定义时间轴节点
   * 当为 React 节点时，会替换默认的圆点
   */
  dot?: React.ReactNode;

  /**
   * 是否为幽灵节点（最后一个时间节点）
   * 设置为 pending 状态时，会显示加载中效果
   * @default false
   */
  pending?: boolean;

  /**
   * 节点位置（内部使用）
   */
  position?: 'left' | 'right' | 'alternate';

  /**
   * 标签文本
   * 设置标签后，会在时间轴左侧或右侧显示
   */
  label?: React.ReactNode;

  /**
   * 时间轴项的内容
   */
  children?: React.ReactNode;

  /**
   * 其他 HTML 属性
   */
  [key: string]: any;
}

/**
 * Timeline Item 组件
 * 时间轴的每一个节点
 * 
 * @example
 *