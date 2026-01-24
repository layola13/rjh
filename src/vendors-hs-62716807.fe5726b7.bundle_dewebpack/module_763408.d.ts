/**
 * Typography 排版组件类型定义
 * 提供基础的文本排版功能，支持多种 HTML 标签和 RTL 方向
 */

import type { ComponentType, ReactNode, Ref, HTMLAttributes, ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * 配置消费者上下文类型
 */
export interface ConfigConsumerProps {
  /**
   * 获取带前缀的 CSS 类名
   * @param suffixCls - 后缀类名
   * @param customizePrefixCls - 自定义前缀类名
   * @returns 完整的 CSS 类名
   */
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string;
  
  /**
   * 文本方向
   */
  direction?: 'ltr' | 'rtl';
}

/**
 * Typography 组件属性
 */
export interface TypographyProps extends Omit<HTMLAttributes<HTMLElement>, 'ref'> {
  /**
   * 自定义 CSS 类名前缀
   * @default 'ant-typography'
   */
  prefixCls?: string;
  
  /**
   * 渲染的 HTML 标签或 React 组件
   * @default 'article'
   */
  component?: keyof JSX.IntrinsicElements | ComponentType<any>;
  
  /**
   * 自定义 CSS 类名
   */
  className?: string;
  
  /**
   * 无障碍标签
   */
  'aria-label'?: string;
  
  /**
   * 设置内容引用（已废弃，请使用 ref）
   * @deprecated 请使用 ref 替代
   */
  setContentRef?: (node: HTMLElement | null) => void;
  
  /**
   * 子节点
   */
  children?: ReactNode;
}

/**
 * Typography 组件类型
 * 基础排版组件，用于展示文本内容
 */
export interface TypographyComponent extends ForwardRefExoticComponent<TypographyProps & RefAttributes<HTMLElement>> {
  /**
   * 组件显示名称
   */
  displayName: string;
}

/**
 * Typography 排版组件
 * 用于统一文本样式和排版规范
 */
declare const Typography: TypographyComponent;

export default Typography;