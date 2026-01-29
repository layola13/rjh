/**
 * FeedbackBlockWrapper组件 - 反馈区块包装器
 * 提供主题上下文支持的容器组件
 */

import { ReactNode, FC, useContext, createElement } from 'react';
import { ThemeContext } from './ThemeContext';

/**
 * FeedbackBlockWrapper组件的属性接口
 */
export interface FeedbackBlockWrapperProps {
  /**
   * 子元素内容
   */
  children: ReactNode;
}

/**
 * 反馈区块包装器组件
 * 
 * 该组件从ThemeContext获取当前主题，并将其应用到包装器的className中。
 * 用于统一管理反馈相关UI组件的主题样式。
 * 
 * @param props - 组件属性
 * @returns 包装了主题样式的div容器
 * 
 * @example
 *