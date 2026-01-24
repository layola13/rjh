import type { CSSProperties, ReactNode, ReactElement } from 'react';

/**
 * Badge 组件的状态类型
 */
export type BadgeStatus = 'success' | 'processing' | 'default' | 'error' | 'warning';

/**
 * Badge 组件的尺寸类型
 */
export type BadgeSize = 'default' | 'small';

/**
 * Badge 组件的属性接口
 */
export interface BadgeProps {
  /** 自定义类名前缀 */
  prefixCls?: string;
  
  /** 滚动数字组件的类名前缀 */
  scrollNumberPrefixCls?: string;
  
  /** 子元素内容 */
  children?: ReactNode;
  
  /** Badge 的状态点样式 */
  status?: BadgeStatus;
  
  /** 状态点旁边显示的文本 */
  text?: ReactNode;
  
  /** 自定义小圆点的颜色 */
  color?: string;
  
  /** 展示的数字，大于 overflowCount 时显示为 `${overflowCount}+`，为 0 时隐藏 */
  count?: ReactNode;
  
  /** 展示封顶的数字值 */
  overflowCount?: number;
  
  /** 不展示数字，只有一个小红点 */
  dot?: boolean;
  
  /** Badge 的尺寸 */
  size?: BadgeSize;
  
  /** 鼠标悬停时显示的文字 */
  title?: string;
  
  /** 设置状态点的位置偏移，格式为 [x, y] */
  offset?: [number | string, number | string];
  
  /** 自定义样式 */
  style?: CSSProperties;
  
  /** 自定义类名 */
  className?: string;
  
  /** 当数值为 0 时，是否展示 Badge */
  showZero?: boolean;
}

/**
 * Ribbon 组件的属性接口
 */
export interface RibbonProps {
  /** 自定义类名前缀 */
  prefixCls?: string;
  
  /** 子元素内容 */
  children?: ReactNode;
  
  /** 缎带显示的文本 */
  text?: ReactNode;
  
  /** 缎带的颜色 */
  color?: string;
  
  /** 缎带的位置，start 和 end 随文字方向（RTL 或 LTR）变动 */
  placement?: 'start' | 'end';
  
  /** 自定义样式 */
  style?: CSSProperties;
  
  /** 自定义类名 */
  className?: string;
}

/**
 * Badge 徽标组件
 * 
 * 图标右上角的圆形徽标数字。
 * 
 * @example
 *