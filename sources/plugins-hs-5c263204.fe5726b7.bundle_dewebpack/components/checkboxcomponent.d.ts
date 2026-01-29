/**
 * Checkbox 组件模块
 * 
 * 提供一个受控的复选框组，支持多选功能
 */

import React from 'react';
import { Checkbox } from 'antd';

/**
 * 复选框选项配置
 */
export interface CheckboxOption {
  /** 选项的唯一值 */
  value: string | number;
  /** 选项显示的文本标签 */
  label: string;
}

/**
 * CheckboxComponent 组件属性
 */
export interface CheckboxComponentProps {
  /** 当前选中的值（初始值） */
  value: string | number;
  /** 可选项列表 */
  options: CheckboxOption[];
  /** 选中值变化时的回调函数 */
  onChange: (checkedValues: Array<string | number>) => void;
}

/**
 * 复选框组组件
 * 
 * 使用 Ant Design 的 Checkbox.Group 实现多选功能，
 * 内部维护选中状态，并在变化时触发外部回调
 * 
 * @param props - 组件属性
 * @returns React 元素
 */
export declare const CheckboxComponent: React.FC<CheckboxComponentProps>;