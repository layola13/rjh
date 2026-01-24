/**
 * 属性栏一级容器组件 - 类型定义
 * Module: module_541288
 * Original ID: 541288
 */

import React from 'react';

/**
 * 属性栏项目配置
 */
export interface PropertyBarItem {
  /** 项目唯一标识 */
  id: string;
  /** 显示标签 */
  label: string;
  /** 是否默认选中 */
  defaultSelect?: boolean;
  /** 是否禁用显示 */
  disableShow?: boolean;
  /** 子级项目列表 */
  items: PropertyBarSecondLevelItem[];
  /** 浮动项目列表 */
  floatItems?: PropertyBarSecondLevelItem[];
}

/**
 * 二级属性项配置（用于动态组件创建）
 */
export interface PropertyBarSecondLevelItem {
  /** 组件类型标识 */
  type: string;
  /** 组件属性配置 */
  props?: Record<string, unknown>;
  [key: string]: unknown;
}

/**
 * 属性栏一级容器组件的 Props
 */
export interface PropertyBarLevel1Props {
  /** 一级项目列表 */
  items: PropertyBarItem[];
  /** 浮动工具项列表 */
  floatItems?: PropertyBarSecondLevelItem[];
  /** 是否只读模式 */
  isReadonly?: boolean;
}

/**
 * 属性栏一级容器组件的 State
 */
export interface PropertyBarLevel1State {
  /** 当前选中的标签页ID */
  selectedTabId: string;
}

/**
 * 属性栏一级容器组件
 * 
 * 功能说明：
 * - 支持单个或多个标签页切换
 * - 自动过滤禁用显示的项目
 * - 支持浮动工具栏项
 * - 支持只读模式
 * 
 * @example
 *