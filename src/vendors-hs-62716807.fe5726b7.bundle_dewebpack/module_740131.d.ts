/**
 * Transfer List Body Component - 穿梭框列表主体组件
 * 用于在两个列表之间穿梭选择项
 * @module TransferListBody
 */

import * as React from 'react';

/**
 * 需要从 Props 中省略的属性名称
 * 这些属性由组件内部处理，不应从外部传入
 */
export const OmitProps: readonly ['handleFilter', 'handleClear', 'checkedKeys'];

/**
 * 分页配置接口
 */
export interface PaginationConfig {
  /** 每页显示的条目数 */
  pageSize: number;
  /** 当前页码 */
  current?: number;
  /** 总条目数 */
  total?: number;
  /** 分页器大小 */
  size?: 'small' | 'default' | 'large';
  /** 是否使用简单模式 */
  simple?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
}

/**
 * 渲染项接口 - 描述列表中每一项的结构
 */
export interface RenderedItem<T = unknown> {
  /** 已渲染的 React 元素 */
  renderedEl: React.ReactNode;
  /** 已渲染的文本内容 */
  renderedText: string;
  /** 原始数据项 */
  item: TransferItem<T>;
}

/**
 * 穿梭框数据项接口
 */
export interface TransferItem<T = unknown> {
  /** 唯一标识符 */
  key: string;
  /** 显示标题 */
  title?: string;
  /** 描述信息 */
  description?: string;
  /** 是否禁用该项 */
  disabled?: boolean;
  /** 自定义数据 */
  [key: string]: T;
}

/**
 * 列表主体组件 Props 接口
 */
export interface ListBodyProps<T = unknown> {
  /** 样式类名前缀 */
  prefixCls: string;
  
  /** 已过滤的渲染项列表 */
  filteredRenderItems: Array<RenderedItem<T>>;
  
  /** 当前选中的 key 数组 */
  selectedKeys: string[];
  
  /** 是否禁用整个列表 */
  disabled?: boolean;
  
  /** 是否显示移除按钮 */
  showRemove?: boolean;
  
  /** 分页配置，可以是布尔值或详细配置对象 */
  pagination?: boolean | PaginationConfig;
  
  /**
   * 滚动事件处理器
   * @param e - 滚动事件对象
   */
  onScroll?: (e: React.UIEvent<HTMLUListElement>) => void;
  
  /**
   * 列表项选择回调
   * @param key - 被选中/取消选中的项的 key
   * @param checked - 选中状态，true 表示选中，false 表示取消选中
   */
  onItemSelect: (key: string, checked: boolean) => void;
  
  /**
   * 列表项移除回调
   * @param keys - 要移除的项的 key 数组
   */
  onItemRemove?: (keys: string[]) => void;
}

/**
 * 列表主体组件 State 接口
 */
export interface ListBodyState {
  /** 当前页码 */
  current: number;
}

/**
 * Transfer List Body 组件类
 * 负责渲染穿梭框的列表内容，支持分页、选择、移除等功能
 * 
 * @example
 *