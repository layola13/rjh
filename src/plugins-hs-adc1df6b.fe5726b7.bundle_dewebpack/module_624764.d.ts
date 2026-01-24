/**
 * PropertyBarLevel2 组件 - 属性面板二级项组件
 * 
 * 用于在属性栏中展示可折叠、可切换状态的二级配置项。
 * 支持状态开关、删除、重置功能，以及浮动项展示。
 */

import React from 'react';
import type { ReactElement, ReactNode } from 'react';

/**
 * 重置按钮配置
 */
export interface ResetItemConfig {
  /** 点击重置时的回调函数 */
  onResetClick: () => void;
  /** 重置按钮显示文本，默认为"恢复"(从ResourceManager获取) */
  text?: string;
}

/**
 * 属性项基础配置
 */
export interface PropertyItem {
  /** 属性项的唯一标识 */
  id?: string;
  /** 属性项类型，用于动态创建组件 */
  type: string;
  /** 其他属性配置 */
  [key: string]: unknown;
}

/**
 * 二级面板配置项
 */
export interface Level2Item {
  /** 面板标题 */
  label: string;
  /** 面板唯一标识 */
  id: string;
  /** 面板内包含的属性项列表 */
  items: PropertyItem[];
  /** 面板状态（是否启用），undefined 视为 true */
  status?: boolean;
  /** 状态变更回调函数 */
  onStatusChange?: (status: boolean) => void;
  /** 删除面板的回调函数 */
  onDelete?: () => void;
  /** 重置按钮配置 */
  resetItem?: ResetItemConfig;
  /** 标题栏自定义内容（在标签和操作按钮之间） */
  customizedTitleContent?: ReactNode;
  /** 是否禁用显示（为 true 时添加 hidden 类） */
  disableShow?: boolean;
}

/**
 * PropertyBarLevel2 组件的 Props
 */
export interface PropertyBarLevel2Props {
  /** 二级面板配置项 */
  item: Level2Item;
  /** 浮动项列表（显示在面板底部） */
  floatItems?: PropertyItem[];
}

/**
 * 组件内部状态
 */
interface PropertyBarLevel2State {
  /** 当前状态（是否启用） */
  status: boolean;
  /** 面板是否展开 */
  isOpened: boolean;
}

/**
 * 属性栏二级面板组件
 * 
 * @remarks
 * 该组件提供以下功能：
 * - 可折叠的二级面板
 * - 状态开关控制（Switch）
 * - 重置功能（可选）
 * - 删除功能（可选）
 * - 自定义标题内容
 * - 浮动项展示
 * 
 * @example
 *