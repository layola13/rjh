/**
 * Typography 组件模块
 * 提供文本排版相关的 React 组件集合
 */

import type { ComponentType, ReactNode, CSSProperties, MouseEvent } from 'react';

/**
 * 基础文本组件的通用属性
 */
interface BaseTypographyProps {
  /** 子元素内容 */
  children?: ReactNode;
  /** 自定义样式类名 */
  className?: string;
  /** 行内样式 */
  style?: CSSProperties;
  /** 是否可复制 */
  copyable?: boolean;
  /** 是否可编辑 */
  editable?: boolean;
  /** 是否显示省略号 */
  ellipsis?: boolean | EllipsisConfig;
  /** 点击事件处理器 */
  onClick?: (event: MouseEvent<HTMLElement>) => void;
}

/**
 * 省略配置
 */
interface EllipsisConfig {
  /** 显示的行数 */
  rows?: number;
  /** 是否可展开 */
  expandable?: boolean;
  /** 展开的文本 */
  expandText?: string;
  /** 收起的文本 */
  collapseText?: string;
  /** 展开/收起事件 */
  onExpand?: (expanded: boolean) => void;
}

/**
 * 文本组件属性
 * 用于显示普通文本内容
 */
export interface TextProps extends BaseTypographyProps {
  /** 文本类型 */
  type?: 'secondary' | 'success' | 'warning' | 'danger';
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否标记（高亮显示） */
  mark?: boolean;
  /** 是否显示代码样式 */
  code?: boolean;
  /** 是否显示键盘样式 */
  keyboard?: boolean;
  /** 是否显示下划线 */
  underline?: boolean;
  /** 是否删除线 */
  delete?: boolean;
  /** 是否加粗 */
  strong?: boolean;
  /** 是否斜体 */
  italic?: boolean;
}

/**
 * 链接组件属性
 * 用于显示可点击的链接文本
 */
export interface LinkProps extends BaseTypographyProps {
  /** 链接地址 */
  href?: string;
  /** 链接目标 */
  target?: '_blank' | '_self' | '_parent' | '_top';
  /** 是否禁用 */
  disabled?: boolean;
}

/**
 * 标题组件属性
 * 用于显示 h1-h5 级别的标题
 */
export interface TitleProps extends BaseTypographyProps {
  /** 标题层级 (1-5) */
  level?: 1 | 2 | 3 | 4 | 5;
  /** 是否禁用 */
  disabled?: boolean;
}

/**
 * 段落组件属性
 * 用于显示段落文本
 */
export interface ParagraphProps extends BaseTypographyProps {
  /** 是否禁用 */
  disabled?: boolean;
}

/**
 * 文本组件
 * 用于显示普通文本，支持多种文本样式和交互功能
 */
export const Text: ComponentType<TextProps>;

/**
 * 链接组件
 * 用于显示可点击的链接，支持内部和外部链接
 */
export const Link: ComponentType<LinkProps>;

/**
 * 标题组件
 * 用于显示不同层级的标题文本 (h1-h5)
 */
export const Title: ComponentType<TitleProps>;

/**
 * 段落组件
 * 用于显示段落文本，自动处理段落间距和排版
 */
export const Paragraph: ComponentType<ParagraphProps>;

/**
 * Typography 主组件
 * 包含 Text、Link、Title、Paragraph 四个子组件
 */
export interface Typography extends ComponentType<BaseTypographyProps> {
  /** 文本组件 */
  Text: typeof Text;
  /** 链接组件 */
  Link: typeof Link;
  /** 标题组件 */
  Title: typeof Title;
  /** 段落组件 */
  Paragraph: typeof Paragraph;
}

/**
 * Typography 组件默认导出
 * @example
 *