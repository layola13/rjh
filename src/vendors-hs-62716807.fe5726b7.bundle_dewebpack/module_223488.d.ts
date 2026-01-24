/**
 * 小尺寸选择器组件
 * 
 * 这是一个预配置了 size="small" 的 Select 组件包装器。
 * 它简化了创建小尺寸选择器的过程，同时保留了原始 Select 组件的所有功能。
 */

import React from 'react';
import type { SelectProps } from 'antd/es/select';
import { Select } from 'antd';

/**
 * 小尺寸选择器组件的属性类型
 * 继承自 Select 组件的所有属性
 */
export interface SmallSelectProps extends Omit<SelectProps, 'size'> {
  /**
   * 尺寸固定为 small，但允许覆盖
   */
  size?: 'small' | 'middle' | 'large';
}

/**
 * 小尺寸选择器组件
 * 
 * @description 
 * 默认使用 small 尺寸的 Select 组件。
 * 适用于需要紧凑布局的场景。
 * 
 * @example
 *