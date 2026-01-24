/**
 * ResizeableTextArea 组件类型定义
 * 一个支持自动调整高度的 textarea 组件
 */

import React from 'react';

/**
 * 调整大小状态枚举
 */
export enum ResizeStatus {
  /** 未调整状态 */
  NONE = 0,
  /** 正在调整中 */
  RESIZING = 1,
  /** 调整完成 */
  RESIZED = 2
}

/**
 * 自动调整大小配置
 */
export interface AutoSizeConfig {
  /** 最小行数 */
  minRows?: number;
  /** 最大行数 */
  maxRows?: number;
}

/**
 * Textarea 样式对象
 */
export interface TextAreaStyles {
  /** 最小高度 */
  minHeight?: string | number;
  /** 最大高度 */
  maxHeight?: string | number;
  /** 高度 */
  height?: string | number;
  /** 横向溢出 */
  overflowX?: 'hidden' | 'visible' | 'scroll' | 'auto';
  /** 纵向溢出 */
  overflowY?: 'hidden' | 'visible' | 'scroll' | 'auto';
}

/**
 * ResizeableTextArea 组件属性
 */
export interface ResizeableTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** 样式类名前缀，默认 'rc-textarea' */
  prefixCls?: string;
  
  /** 自动调整高度配置，可以是 boolean 或详细配置对象 */
  autoSize?: boolean | AutoSizeConfig;
  
  /** 按下回车键时的回调 */
  onPressEnter?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  
  /** 调整大小时的回调 */
  onResize?: (size: { width: number; height: number }) => void;
  
  /** 自定义样式类名 */
  className?: string;
  
  /** 是否禁用 */
  disabled?: boolean;
  
  /** 受控值 */
  value?: string;
  
  /** 默认值 */
  defaultValue?: string;
  
  /** 自定义样式 */
  style?: React.CSSProperties;
}

/**
 * ResizeableTextArea 组件状态
 */
export interface ResizeableTextAreaState {
  /** 文本域的动态样式 */
  textareaStyles: TextAreaStyles;
  
  /** 当前调整状态 */
  resizeStatus: ResizeStatus;
}

/**
 * 支持自动调整高度的 TextArea 组件
 * 
 * @example
 *