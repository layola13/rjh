/**
 * 表格列过滤器组件的类型定义
 * 提供表格列的筛选功能，支持单选/多选、自定义过滤下拉菜单等
 */

import type { ReactNode, CSSProperties } from 'react';
import type { MenuProps } from 'antd/es/menu';
import type { DropdownProps } from 'antd/es/dropdown';

/**
 * 过滤器选项配置
 */
export interface FilterItem {
  /** 显示文本 */
  text: ReactNode;
  /** 过滤值 */
  value: string | number | boolean;
  /** 子过滤项（用于级联过滤） */
  children?: FilterItem[];
}

/**
 * 过滤状态
 */
export interface FilterState {
  /** 当前选中的过滤键值 */
  filteredKeys?: string[];
  /** 强制显示过滤状态（即使没有选中项） */
  forceFiltered?: boolean;
}

/**
 * 自定义过滤下拉菜单的参数
 */
export interface FilterDropdownProps {
  /** 样式前缀 */
  prefixCls: string;
  /** 设置选中的键值 */
  setSelectedKeys: (keys: string[]) => void;
  /** 当前选中的键值 */
  selectedKeys: string[];
  /** 确认过滤 */
  confirm: () => void;
  /** 清空过滤 */
  clearFilters: () => void;
  /** 过滤器配置列表 */
  filters?: FilterItem[];
  /** 下拉菜单是否可见 */
  visible: boolean;
}

/**
 * 列配置接口（部分属性）
 */
export interface ColumnType {
  /** 过滤器配置 */
  filters?: FilterItem[];
  /** 自定义过滤图标 */
  filterIcon?: ReactNode | ((filtered: boolean) => ReactNode);
  /** 自定义过滤下拉菜单 */
  filterDropdown?: ReactNode | ((props: FilterDropdownProps) => ReactNode);
  /** 过滤下拉菜单是否可见 */
  filterDropdownVisible?: boolean;
  /** 过滤下拉菜单可见状态变化回调 */
  onFilterDropdownVisibleChange?: (visible: boolean) => void;
}

/**
 * 触发过滤的参数
 */
export interface TriggerFilterParams {
  /** 列配置 */
  column: ColumnType;
  /** 列的唯一标识 */
  key: string;
  /** 过滤的键值列表 */
  filteredKeys: string[] | null;
}

/**
 * 国际化文本配置
 */
export interface FilterLocale {
  /** 过滤器空状态提示文本 */
  filterEmptyText: string;
  /** 确认按钮文本 */
  filterConfirm: string;
  /** 重置按钮文本 */
  filterReset: string;
}

/**
 * 过滤器菜单组件属性
 */
export interface FilterMenuProps {
  /** 过滤器列表 */
  filters: FilterItem[];
  /** 样式类名前缀 */
  prefixCls: string;
  /** 当前过滤的键值 */
  filteredKeys: string[];
  /** 是否支持多选 */
  filterMultiple: boolean;
  /** 国际化配置 */
  locale: FilterLocale;
}

/**
 * 过滤器组件主属性
 */
export interface FilterDropdownComponentProps {
  /** 样式类名前缀 */
  prefixCls: string;
  /** 列配置 */
  column: ColumnType;
  /** 下拉菜单样式前缀 */
  dropdownPrefixCls: string;
  /** 列的唯一标识 */
  columnKey: string;
  /** 是否支持多选过滤 */
  filterMultiple: boolean;
  /** 当前过滤状态 */
  filterState?: FilterState;
  /** 触发过滤的回调函数 */
  triggerFilter: (params: TriggerFilterParams) => void;
  /** 国际化配置 */
  locale: FilterLocale;
  /** 子节点（列标题内容） */
  children?: ReactNode;
  /** 获取弹出容器的函数 */
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
}

/**
 * 渲染过滤菜单项
 * @param props - 过滤器菜单属性
 * @returns 过滤菜单的 React 元素
 */
declare function renderFilterItems(props: FilterMenuProps): ReactNode;

/**
 * 表格列过滤器组件
 * 提供列级别的数据筛选功能，支持：
 * - 单选/多选过滤
 * - 级联过滤（子菜单）
 * - 自定义过滤下拉菜单
 * - 自定义过滤图标
 * 
 * @param props - 组件属性
 * @returns 包含过滤功能的列标题组件
 * 
 * @example
 *