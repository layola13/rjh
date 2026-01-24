/**
 * List Item 组件类型声明
 * 用于 Ant Design List 组件的 Item 子组件
 */

import * as React from 'react';
import { ColProps } from 'antd/lib/grid/col';

/**
 * List.Item.Meta 组件的属性接口
 */
export interface ListItemMetaProps {
  /**
   * 自定义类名前缀
   * @default 'ant-list'
   */
  prefixCls?: string;

  /**
   * 自定义样式类名
   */
  className?: string;

  /**
   * 列表元素的图标或头像
   */
  avatar?: React.ReactNode;

  /**
   * 列表元素的标题
   */
  title?: React.ReactNode;

  /**
   * 列表元素的描述内容
   */
  description?: React.ReactNode;
}

/**
 * List.Item 组件的属性接口
 */
export interface ListItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'className'> {
  /**
   * 自定义类名前缀
   * @default 'ant-list'
   */
  prefixCls?: string;

  /**
   * 列表项的子内容
   */
  children?: React.ReactNode;

  /**
   * 列表操作组，根据 itemLayout 的不同，位置在卡片底部或右侧
   */
  actions?: React.ReactNode[];

  /**
   * 额外内容，通常用在 itemLayout 为 vertical 的情况下，展示右侧内容
   */
  extra?: React.ReactNode;

  /**
   * 自定义样式类名
   */
  className?: string;

  /**
   * 自定义栅格列样式（当使用 grid 布局时生效）
   */
  colStyle?: React.CSSProperties;
}

/**
 * List.Item.Meta 组件
 * 用于展示列表项的元信息（头像、标题、描述）
 */
export declare const Meta: React.FC<ListItemMetaProps>;

/**
 * List.Item 组件接口
 * 用于展示列表中的单个项目
 */
export interface ListItemType extends React.FC<ListItemProps> {
  /**
   * 列表项元信息组件
   */
  Meta: typeof Meta;
}

/**
 * List.Item 组件
 * 列表项组件，支持多种布局方式和操作按钮
 * 
 * @example
 *