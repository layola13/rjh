/**
 * SelectTrigger 组件类型定义
 * 用于下拉选择器的触发器和弹出层管理
 */

import React from 'react';

/**
 * 方向类型：从左到右或从右到左
 */
export type Direction = 'ltr' | 'rtl';

/**
 * 下拉框宽度匹配类型
 * - true: 宽度完全匹配选择器容器
 * - false: 不匹配，使用内容宽度
 * - number: 指定具体宽度值
 */
export type DropdownMatchSelectWidth = boolean | number;

/**
 * 弹出层对齐配置
 */
export interface AlignType {
  /** 对齐点，例如 ['tl', 'bl'] 表示触发器的top-left对齐到弹出层的bottom-left */
  points?: string[];
  /** 偏移量 [x, y] */
  offset?: [number, number];
  /** 溢出调整配置 */
  overflow?: {
    /** X轴是否自动调整: 0-不调整, 1-调整 */
    adjustX?: number;
    /** Y轴是否自动调整: 0-不调整, 1-调整 */
    adjustY?: number;
  };
}

/**
 * 内置弹出层位置配置映射
 */
export interface BuiltinPlacements {
  bottomLeft?: AlignType;
  bottomRight?: AlignType;
  topLeft?: AlignType;
  topRight?: AlignType;
}

/**
 * SelectTrigger 组件属性接口
 */
export interface SelectTriggerProps {
  /** 样式类名前缀 */
  prefixCls: string;
  
  /** 是否禁用 */
  disabled?: boolean;
  
  /** 弹出层是否可见 */
  visible?: boolean;
  
  /** 触发器子元素 */
  children?: React.ReactNode;
  
  /** 弹出层内容元素 */
  popupElement?: React.ReactElement;
  
  /** 容器宽度 */
  containerWidth?: number;
  
  /** 动画名称 */
  animation?: string;
  
  /** 过渡动画类名 */
  transitionName?: string;
  
  /** 下拉框自定义样式 */
  dropdownStyle?: React.CSSProperties;
  
  /** 下拉框自定义类名 */
  dropdownClassName?: string;
  
  /** 文本方向 */
  direction?: Direction;
  
  /** 下拉框宽度是否匹配选择器 */
  dropdownMatchSelectWidth?: DropdownMatchSelectWidth;
  
  /** 自定义下拉框渲染函数 */
  dropdownRender?: (menu: React.ReactElement) => React.ReactElement;
  
  /** 弹出层对齐配置 */
  dropdownAlign?: AlignType;
  
  /** 获取弹出层挂载容器 */
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  
  /** 是否为空状态 */
  empty?: boolean;
  
  /** 获取触发器DOM节点 */
  getTriggerDOMNode?: () => HTMLElement;
  
  /** 弹出层可见性变化回调 */
  onPopupVisibleChange?: (visible: boolean) => void;
}

/**
 * SelectTrigger 组件暴露的实例方法
 */
export interface SelectTriggerRef {
  /** 获取弹出层DOM元素 */
  getPopupElement: () => HTMLDivElement | null;
}

/**
 * SelectTrigger 下拉选择触发器组件
 * 
 * 负责管理下拉选择器的触发行为和弹出层显示逻辑，支持：
 * - 自定义弹出层位置和对齐方式
 * - 响应式宽度匹配
 * - RTL/LTR 双向文本支持
 * - 自定义渲染和样式
 * 
 * @example
 *