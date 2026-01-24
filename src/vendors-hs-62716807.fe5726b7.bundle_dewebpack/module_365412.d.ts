/**
 * Transfer 组件的列表项组件类型定义
 * @module TransferListItem
 */

import type { ReactNode, MouseEvent } from 'react';

/**
 * Transfer 组件中的数据项接口
 */
export interface TransferItem {
  /** 项的唯一标识 */
  key: string;
  /** 项的显示文本 */
  title?: string;
  /** 项的描述信息 */
  description?: string;
  /** 是否禁用该项 */
  disabled?: boolean;
  /** 其他自定义属性 */
  [key: string]: unknown;
}

/**
 * TransferListItem 组件的属性接口
 */
export interface TransferListItemProps {
  /** 渲染的文本内容 */
  renderedText: ReactNode;
  /** 渲染的元素节点 */
  renderedEl: ReactNode;
  /** 数据项对象 */
  item: TransferItem;
  /** 是否选中状态 */
  checked: boolean;
  /** 是否禁用状态 */
  disabled: boolean;
  /** 样式类名前缀 */
  prefixCls: string;
  /** 点击事件回调 */
  onClick: (item: TransferItem) => void;
  /** 移除按钮点击回调 */
  onRemove?: (item: TransferItem) => void;
  /** 是否显示移除按钮 */
  showRemove?: boolean;
}

/**
 * Transfer 列表项组件
 * 用于渲染穿梭框中的单个可选项或已选项
 * 
 * @param props - 组件属性
 * @returns React 记忆化组件
 * 
 * @example
 *