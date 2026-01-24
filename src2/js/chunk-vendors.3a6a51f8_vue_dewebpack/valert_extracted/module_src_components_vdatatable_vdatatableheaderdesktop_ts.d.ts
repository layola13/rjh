/**
 * VDataTable 桌面端表头组件类型定义
 * @module VDataTableHeaderDesktop
 */

import Vue from 'vue';
import { VNode } from 'vue';

/**
 * 表头列配置接口
 */
export interface DataTableHeader {
  /** 列显示文本 */
  text?: string;
  /** 列绑定的数据字段值 */
  value: string;
  /** 列宽度（支持数字或字符串，如 '100px'） */
  width?: string | number;
  /** 文本对齐方式 */
  align?: 'start' | 'center' | 'end';
  /** 是否可排序 */
  sortable?: boolean;
  /** 是否可分组 */
  groupable?: boolean;
  /** 自定义 CSS 类名 */
  class?: string | string[];
  /** 是否显示分割线 */
  divider?: boolean;
}

/**
 * 排序选项接口
 */
export interface SortOptions {
  /** 排序字段数组 */
  sortBy: string[];
  /** 排序方向数组（true 为降序，false 为升序） */
  sortDesc: boolean[];
  /** 是否必须排序（不允许取消排序） */
  mustSort: boolean;
  /** 是否支持多列排序 */
  multiSort: boolean;
}

/**
 * ARIA 标签返回接口
 */
export interface AriaLabels {
  /** ARIA 排序状态 */
  ariaSort: 'none' | 'ascending' | 'descending';
  /** ARIA 标签文本 */
  ariaLabel: string;
}

/**
 * VDataTable 桌面端表头组件
 */
export default class VDataTableHeaderDesktop extends Vue {
  /** 组件名称 */
  readonly name: 'v-data-table-header-desktop';

  // ==================== Props ====================
  
  /** 表头列配置数组 */
  headers: DataTableHeader[];
  
  /** 排序选项 */
  options: SortOptions;
  
  /** 是否禁用排序 */
  disableSort: boolean;
  
  /** 是否显示分组功能 */
  showGroupBy: boolean;
  
  /** 是否单选模式 */
  singleSelect: boolean;

  // ==================== Methods ====================

  /**
   * 生成分组切换按钮
   * @param header - 表头列配置
   * @returns VNode 虚拟节点
   */
  genGroupByToggle(header: DataTableHeader): VNode;

  /**
   * 获取 ARIA 无障碍标签
   * @param isSorted - 是否已排序
   * @param isDescending - 是否降序
   * @returns ARIA 标签对象
   */
  getAria(isSorted: boolean, isDescending: boolean): AriaLabels;

  /**
   * 生成单个表头单元格
   * @param header - 表头列配置
   * @returns VNode 虚拟节点
   */
  genHeader(header: DataTableHeader): VNode;

  /**
   * 生成排序图标
   * @returns VNode 虚拟节点
   */
  genSortIcon(): VNode;

  /**
   * 生成全选复选框
   * @returns VNode 虚拟节点
   */
  genSelectAll(): VNode;

  /**
   * 渲染函数
   * @returns VNode 虚拟节点
   */
  render(): VNode;

  // ==================== Events ====================

  /**
   * 排序事件
   * @event sort
   * @param value - 排序字段值
   */
  $emit(event: 'sort', value: string): this;

  /**
   * 分组事件
   * @event group
   * @param value - 分组字段值
   */
  $emit(event: 'group', value: string): this;
}