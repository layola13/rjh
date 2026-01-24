/**
 * VDataTable RowGroup 组件类型定义
 * 用于在数据表格中渲染分组行，支持头部、内容和摘要区域
 * @module VDataTable/RowGroup
 */

import { VNode, CreateElement, RenderContext } from 'vue';

/**
 * RowGroup 组件的 Props 接口
 */
export interface RowGroupProps {
  /**
   * 控制内容行的显示/隐藏状态
   * @default true
   */
  value: boolean;

  /**
   * 分组头部行的 CSS 类名
   * @default "v-row-group__header"
   */
  headerClass: string;

  /**
   * 分组内容行的 CSS 类名
   * @default undefined
   */
  contentClass?: string;

  /**
   * 分组摘要行的 CSS 类名
   * @default "v-row-group__summary"
   */
  summaryClass: string;
}

/**
 * RowGroup 组件支持的插槽定义
 */
export interface RowGroupSlots {
  /**
   * 列模式的头部插槽，渲染为单个 tr 元素
   */
  'column.header'?: VNode[];

  /**
   * 行模式的头部插槽，渲染为多个 tr 元素
   */
  'row.header'?: VNode[];

  /**
   * 行模式的内容插槽，受 value prop 控制显示
   */
  'row.content'?: VNode[];

  /**
   * 列模式的摘要插槽，渲染为单个 tr 元素
   */
  'column.summary'?: VNode[];

  /**
   * 行模式的摘要插槽，渲染为多个 tr 元素
   */
  'row.summary'?: VNode[];
}

/**
 * RowGroup 函数式组件的上下文类型
 */
export interface RowGroupContext extends RenderContext<RowGroupProps> {
  slots(): RowGroupSlots;
}

/**
 * VDataTable RowGroup 函数式组件
 * 
 * 用于渲染表格分组结构，支持：
 * - 分组头部（column.header 或 row.header）
 * - 可折叠的分组内容（row.content）
 * - 分组摘要（column.summary 或 row.summary）
 * 
 * @example
 *