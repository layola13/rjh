/**
 * Tooltip 组件类型定义
 * 提供悬浮提示功能，支持多种配置选项
 */

import type React from 'react';
import type { ConfigConsumerProps } from './ConfigContext';
import type { RenderFunction, AlignType, BuildInPlacements } from './Trigger';

/**
 * 预设颜色类型
 * 支持的内置颜色值（包括 -inverse 变体）
 */
export type PresetColorType = 
  | 'pink' | 'red' | 'yellow' | 'orange' | 'cyan' | 'green' 
  | 'blue' | 'purple' | 'geekblue' | 'magenta' | 'volcano' 
  | 'gold' | 'lime'
  | `${string}-inverse`;

/**
 * Tooltip 放置位置
 */
export type TooltipPlacement =
  | 'top' | 'left' | 'right' | 'bottom'
  | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'
  | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';

/**
 * Tooltip 触发方式
 */
export type TooltipTrigger = 'hover' | 'focus' | 'click' | 'contextMenu';

/**
 * 自动调整溢出配置
 */
export interface AutoAdjustOverflow {
  /** 是否自动调整横向位置 */
  adjustX?: boolean;
  /** 是否自动调整纵向位置 */
  adjustY?: boolean;
}

/**
 * Tooltip 组件属性
 */
export interface TooltipProps {
  /** 提示文字 */
  title?: React.ReactNode;
  
  /** 卡片内容（优先级高于 title） */
  overlay?: React.ReactNode | RenderFunction;
  
  /** 是否显示 Tooltip */
  visible?: boolean;
  
  /** 默认是否显示 */
  defaultVisible?: boolean;
  
  /** 显示状态变化时的回调 */
  onVisibleChange?: (visible: boolean) => void;
  
  /** 气泡框位置 */
  placement?: TooltipPlacement;
  
  /** 触发行为 */
  trigger?: TooltipTrigger | TooltipTrigger[];
  
  /** 鼠标移入后延时多少秒显示（单位：秒） */
  mouseEnterDelay?: number;
  
  /** 鼠标移出后延时多少秒隐藏（单位：秒） */
  mouseLeaveDelay?: number;
  
  /** 箭头是否指向目标元素中心 */
  arrowPointAtCenter?: boolean;
  
  /** 气泡被遮挡时自动调整位置 */
  autoAdjustOverflow?: boolean | AutoAdjustOverflow;
  
  /** 自定义浮层类名 */
  overlayClassName?: string;
  
  /** 自定义浮层样式 */
  overlayStyle?: React.CSSProperties;
  
  /** 卡片内容区域样式 */
  overlayInnerStyle?: React.CSSProperties;
  
  /** 自定义类名前缀 */
  prefixCls?: string;
  
  /** 触发元素显示时的类名 */
  openClassName?: string;
  
  /** 浮层渲染父节点，默认渲染到 body 上 */
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  
  /** @deprecated 使用 getPopupContainer 代替 */
  getTooltipContainer?: (triggerNode: HTMLElement) => HTMLElement;
  
  /** 自定义浮层定位配置 */
  builtinPlacements?: BuildInPlacements;
  
  /** 浮层对齐配置 */
  align?: AlignType;
  
  /** 显示/隐藏动画效果名称 */
  transitionName?: string;
  
  /** 背景颜色（支持预设颜色或十六进制颜色值） */
  color?: PresetColorType | string;
  
  /** 浮层销毁后是否销毁 DOM 结构 */
  destroyTooltipOnHide?: boolean;
  
  /** 子元素 */
  children?: React.ReactElement;
  
  /** 浮层 z-index */
  zIndex?: number;
  
  /** 浮层对齐后的回调 */
  onPopupAlign?: (element: HTMLElement, align: AlignType) => void;
}

/**
 * 用于标识按钮/开关/复选框等特殊组件的内部标记
 */
export interface ComponentInternalProps {
  __ANT_BUTTON?: boolean;
  __ANT_SWITCH?: boolean;
  __ANT_CHECKBOX?: boolean;
}

/**
 * 提取样式属性的结果
 */
interface PickedStyleResult {
  /** 被提取的样式属性 */
  picked: React.CSSProperties;
  /** 剩余的样式属性 */
  omitted: React.CSSProperties;
}

/**
 * Tooltip 组件
 * 
 * @example
 *