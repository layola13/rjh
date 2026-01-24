/**
 * VDataTableHeaderDesktop 组件类型定义
 * 用于数据表格桌面端表头的 Vue 组件
 */

import Vue, { VNode, CreateElement } from 'vue';
import { VDataTableHeader } from './types';

/**
 * ARIA 排序属性接口
 */
interface AriaSort {
  /** ARIA 排序状态: 'none' | 'ascending' | 'descending' */
  ariaSort: 'none' | 'ascending' | 'descending';
  /** ARIA 标签文本，包含当前状态和操作提示 */
  ariaLabel: string;
}

/**
 * 表头单元格配置接口
 */
interface HeaderCellConfig {
  /** HTML 属性 */
  attrs: {
    role: string;
    scope: string;
    'aria-label': string;
    'aria-sort'?: string;
  };
  /** 样式对象 */
  style: {
    width?: string;
    minWidth?: string;
  };
  /** CSS 类名数组 */
  class: Array<string | boolean>;
  /** 事件监听器 */
  on: {
    click?: () => void;
  };
}

/**
 * 数据表格桌面端表头组件
 * 提供排序、分组、全选等功能的表头渲染
 */
declare const VDataTableHeaderDesktop: {
  name: 'v-data-table-header-desktop';

  /**
   * 组件方法
   */
  methods: {
    /**
     * 生成分组切换按钮
     * @param header - 表头列配置对象
     * @returns 分组切换的 VNode
     */
    genGroupByToggle(header: VDataTableHeader): VNode;

    /**
     * 获取表头列的 ARIA 无障碍属性
     * @param isSorted - 当前列是否处于排序状态
     * @param isDescending - 是否为降序排序
     * @returns ARIA 排序属性对象
     */
    getAria(isSorted: boolean, isDescending: boolean): AriaSort;

    /**
     * 生成单个表头单元格
     * @param header - 表头列配置对象
     * @returns 表头单元格的 VNode (th 元素)
     */
    genHeader(header: VDataTableHeader): VNode;
  };

  /**
   * 渲染函数
   * @param h - Vue 的 createElement 函数
   * @returns 表头的根 VNode (thead 元素)
   */
  render(h: CreateElement): VNode;
};

export default VDataTableHeaderDesktop;