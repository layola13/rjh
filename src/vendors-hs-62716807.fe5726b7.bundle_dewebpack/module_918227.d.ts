/**
 * Descriptions 组件的行渲染模块
 * 负责渲染描述列表中的单行内容，支持水平和垂直两种布局模式
 */

import type { ReactElement, ReactNode, CSSProperties } from 'react';

/**
 * 描述项的属性接口
 */
export interface DescriptionItemProps {
  /** 标签文本 */
  label?: ReactNode;
  /** 内容 */
  children?: ReactNode;
  /** 自定义前缀类名 */
  prefixCls?: string;
  /** 自定义样式类名 */
  className?: string;
  /** 容器样式 */
  style?: CSSProperties;
  /** 标签样式 */
  labelStyle?: CSSProperties;
  /** 内容样式 */
  contentStyle?: CSSProperties;
  /** 列跨度（占用的列数） */
  span?: number;
  /** 唯一键值 */
  key?: string | number;
}

/**
 * 行组件的属性接口
 */
export interface DescriptionsRowProps {
  /** 组件前缀类名 */
  prefixCls: string;
  /** 是否垂直布局 */
  vertical: boolean;
  /** 当前行的描述项数组 */
  row: Array<ReactElement<DescriptionItemProps>>;
  /** 行索引 */
  index: number;
  /** 是否显示边框 */
  bordered: boolean;
  /** 是否显示冒号分隔符 */
  colon?: boolean;
}

/**
 * 描述上下文配置接口
 */
export interface DescriptionsContextValue {
  /** 标签样式 */
  labelStyle?: CSSProperties;
  /** 内容样式 */
  contentStyle?: CSSProperties;
}

/**
 * 单元格渲染配置接口
 */
interface CellRenderConfig extends DescriptionsContextValue {
  /** HTML 标签类型，可以是单个标签或标签数组（用于 bordered 模式） */
  component: string | [string, string];
  /** 渲染类型：label-仅标签, content-仅内容, item-标签和内容 */
  type: 'label' | 'content' | 'item';
  /** 是否显示标签 */
  showLabel?: boolean;
  /** 是否显示内容 */
  showContent?: boolean;
}

/**
 * Descriptions 行组件
 * 
 * @remarks
 * 该组件负责渲染描述列表的单行内容，根据 vertical 属性决定布局方式：
 * - 垂直布局：生成两行 tr，分别渲染标签行和内容行
 * - 水平布局：生成一行 tr，标签和内容在同一行中
 * 
 * @param props - 行组件属性
 * @returns 渲染的行元素（Fragment 或 tr）
 */
declare function DescriptionsRow(props: DescriptionsRowProps): ReactElement;

export default DescriptionsRow;

/**
 * 渲染单元格辅助函数
 * 
 * @param items - 描述项数组
 * @param rowProps - 行属性
 * @param config - 单元格渲染配置
 * @returns 渲染的单元格数组
 * 
 * @internal
 */
declare function renderCells(
  items: Array<ReactElement<DescriptionItemProps>>,
  rowProps: Pick<DescriptionsRowProps, 'colon' | 'prefixCls' | 'bordered'>,
  config: CellRenderConfig
): Array<ReactElement | [ReactElement, ReactElement]>;