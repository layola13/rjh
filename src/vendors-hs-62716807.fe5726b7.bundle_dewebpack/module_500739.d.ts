/**
 * PageHeader 组件类型定义
 * 用于页面顶部的页头组件，支持标题、副标题、面包屑、返回按钮等功能
 */

import type { ReactNode, CSSProperties, MouseEvent } from 'react';
import type { AvatarProps } from './Avatar';
import type { BreadcrumbProps } from './Breadcrumb';

/**
 * 页头组件的属性接口
 */
export interface PageHeaderProps {
  /**
   * 自定义类名前缀
   */
  prefixCls?: string;

  /**
   * 自定义样式
   */
  style?: CSSProperties;

  /**
   * 自定义类名
   */
  className?: string;

  /**
   * 标题文字
   */
  title?: ReactNode;

  /**
   * 副标题文字
   */
  subTitle?: ReactNode;

  /**
   * 标签列表区域
   */
  tags?: ReactNode;

  /**
   * 操作区域，位于页头右侧
   */
  extra?: ReactNode;

  /**
   * 返回按钮的点击事件
   * @param e - 鼠标点击事件
   */
  onBack?: (e: MouseEvent<HTMLElement>) => void;

  /**
   * 自定义返回按钮图标，如果为 false 则不显示返回按钮
   */
  backIcon?: ReactNode | false;

  /**
   * 头像配置
   */
  avatar?: AvatarProps;

  /**
   * 面包屑配置
   */
  breadcrumb?: BreadcrumbProps;

  /**
   * 页脚区域
   */
  footer?: ReactNode;

  /**
   * 子元素内容
   */
  children?: ReactNode;

  /**
   * 是否为幽灵模式（透明背景）
   * @default true
   */
  ghost?: boolean;
}

/**
 * PageHeader 页头组件
 * 
 * 用于展示页面的标题、描述、面包屑等信息，通常位于页面顶部
 * 
 * @example
 *