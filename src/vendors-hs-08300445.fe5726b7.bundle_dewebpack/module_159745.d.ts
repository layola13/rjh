/**
 * 级联选择器菜单组件类型定义
 * @module CascaderMenus
 */

import React from 'react';

/**
 * 级联选择器选项数据结构
 */
export interface CascaderOption {
  /** 选项的唯一值 */
  value: string | number;
  /** 选项显示的标签文本 */
  label: React.ReactNode;
  /** 选项的标题（用于hover提示） */
  title?: string;
  /** 子选项列表 */
  children?: CascaderOption[];
  /** 是否为叶子节点 */
  isLeaf?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否正在加载中 */
  loading?: boolean;
  /** 其他自定义属性 */
  [key: string]: any;
}

/**
 * 字段名配置
 */
export interface FieldNames {
  /** 值字段名 */
  value?: string;
  /** 标签字段名 */
  label?: string;
  /** 子节点字段名 */
  children?: string;
}

/**
 * 默认字段名配置
 */
export interface DefaultFieldNames {
  /** 值字段名，默认 'value' */
  value: string;
  /** 标签字段名，默认 'label' */
  label: string;
  /** 子节点字段名，默认 'children' */
  children: string;
}

/**
 * 级联选择器菜单组件属性
 */
export interface CascaderMenusProps {
  /** 样式类名前缀 */
  prefixCls?: string;
  /** 可选项数据源 */
  options?: CascaderOption[];
  /** 当前选中的值 */
  value?: Array<string | number>;
  /** 当前激活的值（高亮显示） */
  activeValue?: Array<string | number>;
  /** 是否显示菜单 */
  visible?: boolean;
  /** 次级菜单的展开方式，可选 'click' 或 'hover' */
  expandTrigger?: 'click' | 'hover';
  /** 自定义展开图标 */
  expandIcon?: React.ReactNode;
  /** 自定义加载中图标 */
  loadingIcon?: React.ReactNode;
  /** 下拉菜单列的样式 */
  dropdownMenuColumnStyle?: React.CSSProperties;
  /** 自定义字段名 */
  fieldNames?: FieldNames;
  /** 默认字段名配置 */
  defaultFieldNames?: DefaultFieldNames;
  
  /**
   * 选择选项时的回调函数
   * @param option 被选中的选项
   * @param index 选项所在菜单列的索引
   */
  onSelect?: (option: CascaderOption, index: number) => void;
  
  /**
   * 双击选项时的回调函数
   * @param option 被双击的选项
   * @param index 选项所在菜单列的索引
   */
  onItemDoubleClick?: (option: CascaderOption, index: number) => void;
}

/**
 * 级联选择器菜单组件状态
 */
export interface CascaderMenusState {
  // 此组件使用类组件实现，状态在实例属性中管理
}

/**
 * 级联选择器菜单组件
 * 
 * 用于展示级联选择器的多级菜单，支持点击和悬停展开，
 * 支持异步加载、禁用选项、自定义图标等功能。
 * 
 * @example
 *