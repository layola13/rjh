/**
 * FeedbackBlockLabel 组件模块
 * 用于在反馈表单中显示带有可选必填标识的标签
 */

import React, { ReactNode, useContext } from 'react';
import { ThemeContext } from './ThemeContext';

/**
 * FeedbackBlockLabel 组件的属性接口
 */
export interface FeedbackBlockLabelProps {
  /**
   * 标签文本内容
   */
  label: string;
  
  /**
   * 是否为必填字段，如果为 true 则显示红色星号(*)
   */
  required?: boolean;
  
  /**
   * 子元素，可以包含额外的内容
   */
  children?: ReactNode;
}

/**
 * 反馈表单标签组件
 * 
 * @description
 * 显示表单字段标签，支持必填标识和主题样式。
 * 必填字段会在标签前显示红色星号，整体样式会根据当前主题上下文动态调整。
 * 
 * @example
 *