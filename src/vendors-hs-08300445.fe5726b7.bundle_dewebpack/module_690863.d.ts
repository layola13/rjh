/**
 * SelectTrigger 组件类型定义
 * 用于 Select 组件的下拉触发器，基于 rc-trigger 封装
 */

import React from 'react';

/**
 * 方向类型
 */
export type Direction = 'ltr' | 'rtl';

/**
 * 下拉框对齐配置
 */
export interface AlignType {
  /** 对齐点，例如 ['tl', 'bl'] 表示 trigger 的 top-left 对齐 popup 的 bottom-left */
  points?: string[];
  /** 偏移量 [x, y] */
  offset?: number[];
  /** 目标偏移量 [x, y] */
  targetOffset?: number[];
  /** 溢出调整配置 */
  overflow?: {
    /** 是否在 X 轴方向自动调整 (0: 不调整, 1: 调整) */
    adjustX?: number | boolean;
    /** 是否在 Y 轴方向自动调整 (0: 不调整, 1: 调整) */
    adjustY?: number | boolean;
  };
  /** 是否使用 CSS right 属性 */
  useCssRight?: boolean;
  /** 是否使用 CSS bottom 属性 */
  useCssBottom?: boolean;
  /** 是否使用 CSS transform 属性 */
  useCssTransform?: boolean;
}

/**
 * 内置对齐位置配置映射
 */
export interface BuiltinPlacements {
  bottomLeft?: AlignType;
  bottomRight?: AlignType;
  topLeft?: AlignType;
  topRight?: AlignType;
}

/**
 * SelectTrigger 组件的属性
 */
export interface SelectTriggerProps {
  /** 组件样式前缀 */
  prefixCls: string;
  
  /** 是否禁用 */
  disabled?: boolean;
  
  /** 下拉框是否可见 */
  visible?: boolean;
  
  /** 触发器子元素 */
  children: React.ReactNode;
  
  /** 下拉框弹出内容元素 */
  popupElement: React.ReactElement;
  
  /** 容器宽度 */
  containerWidth?: number;
  
  /** 动画类名 */
  animation?: string;
  
  /** 过渡动画名称 */
  transitionName?: string;
  
  /** 下拉框自定义样式 */
  dropdownStyle?: React.CSSProperties;
  
  /** 下拉框自定义类名 */
  dropdownClassName?: string;
  
  /** 文本方向，支持 LTR 和 RTL */
  direction?: Direction;
  
  /** 下拉框宽度是否与选择器保持一致。true: 同宽, false: 自适应, number: 固定宽度 */
  dropdownMatchSelectWidth?: boolean | number;
  
  /** 自定义下拉框渲染函数 */
  dropdownRender?: (menu: React.ReactElement) => React.ReactElement;
  
  /** 下拉框对齐配置 */
  dropdownAlign?: AlignType;
  
  /** 自定义弹出容器 */
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  
  /** 是否为空状态 */
  empty?: boolean;
  
  /** 获取触发器 DOM 节点 */
  getTriggerDOMNode?: () => HTMLElement;
  
  /** 下拉框显示/隐藏的回调 */
  onPopupVisibleChange?: (visible: boolean) => void;
}

/**
 * SelectTrigger 组件实例方法
 */
export interface SelectTriggerRef {
  /** 获取弹出框元素 */
  getPopupElement: () => HTMLElement | null;
}

/**
 * SelectTrigger 组件
 * 用于处理 Select 下拉框的显示、定位和交互
 */
declare const SelectTrigger: React.ForwardRefExoticComponent<
  SelectTriggerProps & React.RefAttributes<SelectTriggerRef>
>;

export default SelectTrigger;