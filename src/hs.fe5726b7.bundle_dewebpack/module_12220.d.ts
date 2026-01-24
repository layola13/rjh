import * as React from 'react';

/**
 * 样式选择项接口
 * 表示样式选择器中的每一个可选项
 */
export interface StyleSelectorItem {
  /** 样式代码，用于唯一标识样式 */
  code: string;
  /** 显示给用户的样式名称 */
  label: string;
}

/**
 * 样式选择器组件的属性接口
 */
export interface StyleSelectorProps {
  /**
   * 样式选项数据列表
   * @default []
   */
  data?: StyleSelectorItem[];
  
  /**
   * 默认选中的样式项
   * @default ""
   */
  defaultValue?: StyleSelectorItem | string;
  
  /**
   * 提交回调函数
   * 当用户点击确认按钮时触发
   * @param selectedItem - 用户选中的样式项
   */
  onSubmit?: (selectedItem: StyleSelectorItem) => void;
  
  /**
   * 关闭回调函数
   * 当用户点击关闭按钮时触发
   */
  onClose?: () => void;
}

/**
 * 样式选择器组件的状态接口
 */
export interface StyleSelectorState {
  /** 当前选中的样式项 */
  selectedItem: StyleSelectorItem;
}

/**
 * 样式选择器组件
 * 
 * 用于展示样式选择对话框，允许用户从预定义的样式列表中选择一个样式。
 * 包含头部（标题和关闭按钮）、主体（样式选项列表）和底部（确认按钮）。
 * 
 * @example
 *