/**
 * Radio Button Card Component
 * 单选按钮卡片组件 - 用于展示一组互斥的选项
 */

import * as React from 'react';
import { RadioGroupProps } from 'antd';

/**
 * 单个按钮配置项
 */
export interface ButtonItem {
  /** 是否选中 */
  isChecked: boolean;
  /** 按钮显示文本 */
  txt: string;
}

/**
 * RadioButtonCard 组件数据配置
 */
export interface RadioButtonCardData {
  /** 卡片标题 */
  title?: string;
  /** 自定义样式类名 */
  className?: string;
  /** 按钮数组配置 */
  buttonArr?: ButtonItem[];
  /** 选中回调函数 */
  onCheck?: (index: number, selectedItem: ButtonItem) => void;
}

/**
 * RadioButtonCard 组件属性
 */
export interface RadioButtonCardProps {
  /** 组件配置数据 */
  data?: RadioButtonCardData;
}

/**
 * RadioButtonCard 组件状态
 */
export interface RadioButtonCardState {
  /** 当前按钮数组状态 */
  buttonArr: ButtonItem[];
}

/**
 * 单选按钮卡片组件
 * 
 * @example
 *