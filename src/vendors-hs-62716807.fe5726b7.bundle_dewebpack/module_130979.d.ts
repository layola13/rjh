import type { ReactNode, ReactElement } from 'react';
import type { ColProps } from 'antd/es/grid/col';

/**
 * 表单标签对齐方式
 */
export type LabelAlign = 'left' | 'right';

/**
 * 必填标记样式类型
 */
export type RequiredMark = 'optional' | boolean;

/**
 * 工具提示配置类型
 */
export interface TooltipConfig {
  /** 工具提示标题内容 */
  title?: ReactNode;
  /** 自定义工具提示图标 */
  icon?: ReactElement;
  /** 其他传递给 Tooltip 组件的属性 */
  [key: string]: unknown;
}

/**
 * 表单上下文配置
 */
export interface FormContextValue {
  /** 是否为垂直布局 */
  vertical?: boolean;
  /** 标签对齐方式 */
  labelAlign?: LabelAlign;
  /** 标签列布局配置 */
  labelCol?: ColProps;
  /** 是否显示冒号 */
  colon?: boolean;
}

/**
 * 表单标签组件属性接口
 */
export interface FormItemLabelProps {
  /** 样式类名前缀 */
  prefixCls: string;
  /** 标签文本内容 */
  label?: ReactNode;
  /** 关联的表单控件 id */
  htmlFor?: string;
  /** 标签列布局配置，优先级高于 Form 的 labelCol */
  labelCol?: ColProps;
  /** 标签文本对齐方式，优先级高于 Form 的 labelAlign */
  labelAlign?: LabelAlign;
  /** 是否显示冒号，优先级高于 Form 的 colon */
  colon?: boolean;
  /** 是否必填 */
  required?: boolean;
  /** 必填标记样式，'optional' 表示显示可选标记 */
  requiredMark?: RequiredMark;
  /** 工具提示配置，可以是字符串、ReactNode 或配置对象 */
  tooltip?: ReactNode | TooltipConfig;
}

/**
 * 表单标签组件
 * 
 * @description
 * 用于渲染表单项的标签部分，支持以下特性：
 * - 标签文本对齐（左对齐/右对齐）
 * - 必填标记显示
 * - 可选标记显示（当 requiredMark 为 'optional' 且非必填时）
 * - 工具提示功能
 * - 自动处理冒号显示（根据标签文本和布局自动添加或移除冒号）
 * - 响应式布局支持
 * 
 * @param props - 组件属性
 * @returns React 元素或 null（当无标签时）
 * 
 * @example
 *