/**
 * React组件：日期/时间选择器的底部操作栏
 * 包含快速选择预设范围和确认按钮
 */

import * as React from 'react';

/**
 * 快速选择范围项配置
 */
export interface RangeItem {
  /** 显示标签 */
  label: string;
  /** 点击事件处理 */
  onClick: (event: React.MouseEvent) => void;
  /** 鼠标进入事件处理 */
  onMouseEnter?: (event: React.MouseEvent) => void;
  /** 鼠标离开事件处理 */
  onMouseLeave?: (event: React.MouseEvent) => void;
}

/**
 * 可自定义的组件映射
 */
export interface RangesComponents {
  /** 自定义范围项容器组件，默认为 span */
  rangeItem?: React.ComponentType<React.HTMLAttributes<HTMLElement>>;
  /** 自定义按钮组件，默认为 button */
  button?: React.ComponentType<React.ButtonHTMLAttributes<HTMLButtonElement>>;
}

/**
 * 国际化文案配置
 */
export interface Locale {
  /** "此刻"按钮文案 */
  now: string;
  /** "确定"按钮文案 */
  ok: string;
}

/**
 * 底部操作栏组件属性
 */
export interface RangesProps {
  /** 样式类名前缀 */
  prefixCls: string;
  
  /** 快速选择范围列表 */
  rangeList?: RangeItem[];
  
  /** 自定义组件映射 */
  components?: RangesComponents;
  
  /** 是否需要显示确认按钮 */
  needConfirmButton?: boolean;
  
  /** "此刻"按钮点击事件 */
  onNow?: (event: React.MouseEvent) => void;
  
  /** "确定"按钮点击事件 */
  onOk?: (event: React.MouseEvent) => void;
  
  /** 确定按钮是否禁用 */
  okDisabled?: boolean;
  
  /** 是否显示"此刻"按钮 */
  showNow?: boolean;
  
  /** 国际化文案 */
  locale: Locale;
}

/**
 * 日期/时间选择器底部操作栏组件
 * 支持快速选择预设范围和确认操作
 * 
 * @param props - 组件属性
 * @returns 底部操作栏 JSX 元素，如果没有内容则返回 null
 */
export default function Ranges(props: RangesProps): React.ReactElement | null;