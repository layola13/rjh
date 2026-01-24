/**
 * 表格列组（colgroup）生成器
 * 根据列宽配置和列定义生成 HTML colgroup 元素
 */

import type { CSSProperties, ReactElement } from 'react';

/**
 * 列的内部定义属性的键名常量
 */
export const INTERNAL_COL_DEFINE: unique symbol;

/**
 * 列定义接口
 */
export interface ColumnDefinition {
  /**
   * 列的内部定义属性
   * 包含额外的 HTML 属性（如 className, data-* 等）
   */
  [INTERNAL_COL_DEFINE]?: Record<string, unknown>;
  
  /**
   * 其他列属性
   */
  [key: string]: unknown;
}

/**
 * ColGroup 组件的属性接口
 */
export interface ColGroupProps {
  /**
   * 列宽度数组
   * 每个元素对应一列的宽度值（CSS 单位，如 '100px', '20%' 等）
   */
  colWidths: Array<string | number | undefined>;
  
  /**
   * 列配置数组
   * 包含每列的详细定义信息
   */
  columns: ColumnDefinition[];
  
  /**
   * 列数量（可选）
   * 如果未提供，则使用 columns.length
   */
  columCount?: number;
}

/**
 * 生成表格列组元素
 * 
 * 从右向左遍历列配置，为每个有效列生成 <col> 元素。
 * 只有当列宽存在、内部定义存在或之前已有有效列时才会生成。
 * 
 * @param props - 列组属性
 * @returns React colgroup 元素
 * 
 * @example
 *