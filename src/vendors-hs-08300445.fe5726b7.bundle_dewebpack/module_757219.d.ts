/**
 * PopupInner组件的类型定义
 * 用于渲染弹出层内容，支持对齐、动画、延迟加载等功能
 */

import type { CSSProperties, ReactNode, Ref } from 'react';
import type { AlignType, AlignResult, MonitorBufferTime } from 'rc-align';
import type { MotionStatus } from 'rc-motion';

/**
 * 弹出层对齐点的坐标
 */
export interface Point {
  /** 页面X坐标 */
  pageX: number;
  /** 页面Y坐标 */
  pageY: number;
}

/**
 * 弹出层拉伸配置
 * 用于指定弹出层是否需要拉伸以匹配目标元素的尺寸
 */
export interface StretchConfig {
  /** 最小宽度 */
  minWidth?: number | string;
  /** 最小高度 */
  minHeight?: number | string;
  /** 宽度 */
  width?: number | string;
  /** 高度 */
  height?: number | string;
}

/**
 * PopupInner组件的属性接口
 */
export interface PopupInnerProps {
  /** 是否可见 */
  visible?: boolean;
  
  /** 样式类名前缀 */
  prefixCls: string;
  
  /** 自定义类名 */
  className?: string;
  
  /** 自定义样式 */
  style?: CSSProperties;
  
  /** 子元素内容 */
  children?: ReactNode;
  
  /** z-index层级 */
  zIndex?: number;
  
  /** 是否拉伸以匹配目标元素 */
  stretch?: boolean | StretchConfig;
  
  /** 隐藏时是否销毁弹出层DOM */
  destroyPopupOnHide?: boolean;
  
  /** 是否强制渲染（即使不可见） */
  forceRender?: boolean;
  
  /** 对齐配置 */
  align?: AlignType;
  
  /** 对齐点坐标（用于跟随鼠标等场景） */
  point?: Point;
  
  /**
   * 获取根DOM节点
   * @returns 根DOM元素
   */
  getRootDomNode?: () => HTMLElement;
  
  /**
   * 根据对齐结果获取类名
   * @param align - 对齐结果对象
   * @returns 类名字符串
   */
  getClassNameFromAlign?: (align: AlignResult) => string;
  
  /**
   * 对齐完成回调
   * @param source - 源元素
   * @param align - 对齐结果
   */
  onAlign?: (source: HTMLElement, align: AlignResult) => void;
  
  /**
   * 鼠标进入事件
   * @param event - 鼠标事件
   */
  onMouseEnter?: (event: React.MouseEvent<HTMLDivElement>) => void;
  
  /**
   * 鼠标离开事件
   * @param event - 鼠标事件
   */
  onMouseLeave?: (event: React.MouseEvent<HTMLDivElement>) => void;
  
  /**
   * 鼠标按下事件（捕获阶段）
   * @param event - 鼠标事件
   */
  onMouseDown?: (event: React.MouseEvent<HTMLDivElement>) => void;
  
  /**
   * 触摸开始事件（捕获阶段）
   * @param event - 触摸事件
   */
  onTouchStart?: (event: React.TouchEvent<HTMLDivElement>) => void;
  
  /** 动画相关配置（从motion模块获取） */
  motion?: any;
  
  /** 动画名称 */
  motionName?: string;
  
  /** 出现动画结束回调 */
  onAppearEnd?: (element: HTMLElement, event: MotionStatus) => void;
  
  /** 进入动画结束回调 */
  onEnterEnd?: (element: HTMLElement, event: MotionStatus) => void;
  
  /** 离开动画结束回调 */
  onLeaveEnd?: (element: HTMLElement, event: MotionStatus) => void;
}

/**
 * PopupInner组件暴露的方法接口
 */
export interface PopupInnerRef {
  /**
   * 强制触发对齐计算
   */
  forceAlign: () => void;
  
  /**
   * 获取弹出层DOM元素
   * @returns 弹出层元素
   */
  getElement: () => HTMLElement | null;
}

/**
 * PopupInner组件
 * 
 * 核心功能：
 * - 弹出层的显示隐藏控制
 * - 与目标元素的精确对齐
 * - 进入/离开动画支持
 * - 响应式尺寸拉伸
 * - 支持销毁DOM优化性能
 * 
 * @param props - 组件属性
 * @param ref - 组件引用
 */
declare const PopupInner: React.ForwardRefExoticComponent<
  PopupInnerProps & React.RefAttributes<PopupInnerRef>
>;

export default PopupInner;