/**
 * 下拉数字选择器组件类型定义
 * @module DropdownNumber
 */

import React from 'react';

/**
 * 下拉数字选择器的属性接口
 */
export interface DropdownNumberProps {
  /** 组件数据配置 */
  data: {
    /** 默认选中的键值 */
    defaultKey: string | number;
    
    /** 下拉选项数组 */
    items: Array<string | number>;
    
    /** 自定义样式类名 */
    className?: string;
    
    /** 值变化时的回调函数 */
    onChange?: (value: string | number) => void;
    
    /** 单位文本（如 'px', 'rem', '%' 等） */
    unit?: string;
    
    /** 工具提示文本 */
    tooltip?: string;
    
    /** 精度位数（用于格式化显示） */
    precisionDigits?: number;
  };
}

/**
 * 下拉数字选择器组件
 * 
 * @description
 * 用于属性栏的数字下拉选择组件，支持单位显示、工具提示和精度控制。
 * 
 * @example
 *