/**
 * Tooltip组件类型定义
 * 基于 rc-tooltip 的 TypeScript 声明文件
 */

import React from 'react';
import { TriggerProps } from 'rc-trigger';
import { AlignType, BuildInPlacements } from 'rc-trigger/lib/interface';

/**
 * 触发行为类型
 */
export type TriggerType = 'hover' | 'click' | 'focus' | 'contextMenu';

/**
 * Tooltip 放置位置
 */
export type PlacementType =
  | 'top'
  | 'left'
  | 'right'
  | 'bottom'
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight'
  | 'leftTop'
  | 'leftBottom'
  | 'rightTop'
  | 'rightBottom';

/**
 * 销毁 Tooltip 的配置
 */
export interface DestroyTooltipOptions {
  /**
   * 是否保持父级元素
   */
  keepParent?: boolean;
}

/**
 * Tooltip 组件属性
 */
export interface TooltipProps extends Omit<TriggerProps, 'popup' | 'popupClassName' | 'popupStyle'> {
  /**
   * 浮层的类名
   */
  overlayClassName?: string;

  /**
   * 触发行为，可以是数组
   * @default ['hover']
   */
  trigger?: TriggerType | TriggerType[];

  /**
   * 鼠标移入后延时多少秒显示 Tooltip，单位：秒
   * @default 0
   */
  mouseEnterDelay?: number;

  /**
   * 鼠标移出后延时多少秒隐藏 Tooltip，单位：秒
   * @default 0.1
   */
  mouseLeaveDelay?: number;

  /**
   * 浮层的样式
   */
  overlayStyle?: React.CSSProperties;

  /**
   * 类名前缀
   * @default 'rc-tooltip'
   */
  prefixCls?: string;

  /**
   * 触发元素
   */
  children?: React.ReactElement;

  /**
   * 显示隐藏的回调
   */
  onVisibleChange?: (visible: boolean) => void;

  /**
   * 显示隐藏动画完成后的回调
   */
  afterVisibleChange?: (visible: boolean) => void;

  /**
   * 动画过渡名称
   */
  transitionName?: string;

  /**
   * 动画类型
   */
  animation?: string;

  /**
   * 动画配置对象
   */
  motion?: any;

  /**
   * Tooltip 的位置
   * @default 'right'
   */
  placement?: PlacementType;

  /**
   * 对齐配置
   * @default {}
   */
  align?: AlignType;

  /**
   * 隐藏时是否销毁 Tooltip
   * @default false
   */
  destroyTooltipOnHide?: boolean | DestroyTooltipOptions;

  /**
   * 默认是否显示
   */
  defaultVisible?: boolean;

  /**
   * 浮层渲染父节点，默认渲染到 body 上
   */
  getTooltipContainer?: (triggerNode: HTMLElement) => HTMLElement;

  /**
   * 浮层内容区域的样式
   */
  overlayInnerStyle?: React.CSSProperties;

  /**
   * 箭头内容
   */
  arrowContent?: React.ReactNode;

  /**
   * 浮层内容
   */
  overlay: React.ReactNode | (() => React.ReactNode);

  /**
   * 浮层的 ID
   */
  id?: string;

  /**
   * 是否显示箭头
   * @default true
   */
  showArrow?: boolean;

  /**
   * 手动控制显示隐藏
   */
  visible?: boolean;
}

/**
 * Tooltip 组件实例引用
 */
export interface TooltipRef {
  /**
   * 强制更新位置
   */
  forcePopupAlign: () => void;
  
  /**
   * 获取 Popup 元素
   */
  getPopupDomNode: () => HTMLElement | null;
}

/**
 * Tooltip 组件
 * 用于创建简单的文字提示气泡框
 */
declare const Tooltip: React.ForwardRefExoticComponent<
  TooltipProps & React.RefAttributes<TooltipRef>
>;

export default Tooltip;

/**
 * 内置的放置位置配置
 */
export declare const placements: BuildInPlacements;