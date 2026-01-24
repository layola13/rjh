import React from 'react';
import { Switch } from 'antd'; // 假设使用 antd 的 Switch 组件

/**
 * 切换按钮组件的数据配置接口
 */
export interface ToggleButtonData {
  /** 标签文本 */
  label?: string;
  /** 选中状态显示的文本 */
  checkedChildren?: React.ReactNode;
  /** 未选中状态显示的文本 */
  unCheckedChildren?: React.ReactNode;
  /** 当前值 */
  value?: boolean;
  /** 是否禁用 */
  disable?: boolean;
  /** 自定义 CSS 类名 */
  className?: string;
  /** 值变化回调函数 */
  onValueChange?: (checked: boolean) => void;
}

/**
 * 切换按钮组件的 Props 接口
 */
export interface ToggleButtonProps {
  /** 组件唯一标识 */
  id?: string;
  /** 组件配置数据 */
  data?: ToggleButtonData;
}

/**
 * 切换按钮组件的 State 接口
 */
export interface ToggleButtonState {
  /** 当前选中状态 */
  selectedChildren: boolean;
  /** 是否禁用 */
  disable: boolean;
}

/**
 * 切换按钮组件
 * 
 * @description 提供一个带标签的开关切换按钮，支持自定义选中/未选中状态的显示文本
 * 
 * @example
 *