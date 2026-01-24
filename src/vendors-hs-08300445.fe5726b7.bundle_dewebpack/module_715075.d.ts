import React from 'react';
import type { CSSProperties, ReactNode, KeyboardEvent, MouseEvent } from 'react';

/**
 * 折叠面板项的可折叠配置
 * - 'header': 仅头部可点击
 * - 'disabled': 禁用折叠
 * - undefined: 整个区域可点击
 */
export type CollapsibleType = 'header' | 'disabled' | undefined;

/**
 * 展开图标渲染函数的参数
 */
export interface ExpandIconProps {
  /** 面板唯一标识 */
  panelKey: string | number;
  /** 是否处于激活状态 */
  isActive: boolean;
  /** 是否禁用 */
  disabled: boolean;
  /** 可折叠类型 */
  collapsible?: CollapsibleType;
}

/**
 * 动画配置
 */
export interface OpenMotion {
  /** 动画名称 */
  motionName?: string;
  /** 动画出现类名 */
  motionAppearActiveClassName?: string;
  /** 动画进入类名 */
  motionEnterActiveClassName?: string;
  /** 动画离开类名 */
  motionLeaveActiveClassName?: string;
  /** 动画时长(ms) */
  motionDeadline?: number;
  /** 动画离开后移除DOM */
  motionLeaveImmediately?: boolean;
}

/**
 * 折叠面板项组件属性
 */
export interface CollapseItemProps {
  /** 自定义类名 */
  className?: string;
  /** 元素ID */
  id?: string;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 样式前缀，默认 'rc-collapse' */
  prefixCls?: string;
  /** 头部内容 */
  header?: ReactNode;
  /** 头部自定义类名 */
  headerClass?: string;
  /** 面板内容 */
  children?: ReactNode;
  /** 是否激活展开 */
  isActive?: boolean;
  /** 是否显示箭头 */
  showArrow?: boolean;
  /** 非激活时是否销毁DOM */
  destroyInactivePanel?: boolean;
  /** 是否为手风琴模式 */
  accordion?: boolean;
  /** 强制渲染内容(即使未激活) */
  forceRender?: boolean;
  /** 展开/收起动画配置 */
  openMotion?: OpenMotion;
  /** 自定义展开图标 */
  expandIcon?: (props: ExpandIconProps) => ReactNode;
  /** 头部右侧额外内容 */
  extra?: ReactNode;
  /** 可折叠配置 */
  collapsible?: CollapsibleType;
  /** 面板唯一标识 */
  panelKey: string | number;
  /** 点击回调 */
  onItemClick?: (panelKey: string | number) => void;
}

/**
 * 折叠面板项组件状态(无状态组件)
 */
export interface CollapseItemState {}

/**
 * 折叠面板项组件
 * 
 * @remarks
 * 用于 Collapse 组件内部，表示单个可折叠的面板项。
 * 支持自定义展开图标、头部额外内容、动画效果等。
 * 
 * @example
 *