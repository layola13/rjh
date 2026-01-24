/**
 * 穿梭框操作按钮组件
 * 提供左右移动功能的双向箭头按钮
 */

import React from 'react';

/**
 * 按钮组件属性接口（来自依赖模块）
 */
interface ButtonProps {
  type?: 'primary' | 'default' | 'dashed' | 'text' | 'link';
  size?: 'small' | 'middle' | 'large';
  disabled?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

/**
 * 按钮组件声明
 */
declare const Button: React.FC<ButtonProps>;

/**
 * 左箭头图标组件
 */
declare const LeftArrowIcon: React.FC;

/**
 * 右箭头图标组件
 */
declare const RightArrowIcon: React.FC;

/**
 * 文本方向类型
 */
type TextDirection = 'ltr' | 'rtl';

/**
 * 穿梭框操作按钮组件属性
 */
export interface TransferOperationProps {
  /**
   * 是否禁用所有按钮
   * @default false
   */
  disabled?: boolean;

  /**
   * 向左移动的回调函数
   */
  moveToLeft?: () => void;

  /**
   * 向右移动的回调函数
   */
  moveToRight?: () => void;

  /**
   * 左箭头按钮文本
   * @default ""
   */
  leftArrowText?: string;

  /**
   * 右箭头按钮文本
   * @default ""
   */
  rightArrowText?: string;

  /**
   * 左箭头按钮是否激活（可点击）
   * @default false
   */
  leftActive?: boolean;

  /**
   * 右箭头按钮是否激活（可点击）
   * @default false
   */
  rightActive?: boolean;

  /**
   * 自定义容器类名
   */
  className?: string;

  /**
   * 自定义容器样式
   */
  style?: React.CSSProperties;

  /**
   * 文本方向，影响箭头图标显示
   * @default "ltr"
   */
  direction?: TextDirection;

  /**
   * 是否为单向模式（仅显示右箭头按钮）
   * @default false
   */
  oneWay?: boolean;
}

/**
 * 穿梭框操作按钮组件
 * 用于在穿梭框组件中提供左右移动选项的操作按钮
 * 
 * @param props - 组件属性
 * @returns 渲染的操作按钮组
 * 
 * @example
 *