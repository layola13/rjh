import React from 'react';
import PropTypes from 'prop-types';
import { Select, Option } from 'antd'; // 假设来自 antd 库

/**
 * 样式类型项接口
 */
export interface StyleTypeItem {
  /** 样式类型代码 */
  code: string;
  /** 样式类型名称 */
  name: string;
}

/**
 * 样式类型选择器组件属性接口
 */
export interface StyleTypeSelectorProps {
  /** 当前选中的样式类型ID */
  styleTypeId?: string;
  /** 样式类型列表 */
  styleTypeList?: StyleTypeItem[];
  /** 样式类型变更通知回调函数 */
  styleTypeChangedNotify?: (value: string) => void;
}

/**
 * 样式类型选择器组件状态接口
 */
export interface StyleTypeSelectorState {
  /** 内部缓存的选择器选项 */
  _styleTypeSelectOptions?: React.ReactElement[];
}

/**
 * 样式类型选择器组件
 * 
 * 提供样式类型的下拉选择功能，支持动态更新样式列表
 * 
 * @example
 *