import type React from 'react';
import type { CSSProperties, ReactElement, RefObject } from 'react';

/**
 * 对齐配置接口
 */
export interface AlignType {
  /** 对齐点 */
  points?: string[];
  /** 偏移量 */
  offset?: number[];
  /** 目标偏移量 */
  targetOffset?: number[];
  /** 溢出配置 */
  overflow?: {
    adjustX?: boolean;
    adjustY?: boolean;
  };
  /** 是否使用CSS right进行定位 */
  useCssRight?: boolean;
  /** 是否使用CSS bottom进行定位 */
  useCssBottom?: boolean;
  /** 是否使用CSS transform进行定位 */
  useCssTransform?: boolean;
}

/**
 * 动画配置接口
 */
export interface AnimationType {
  /** 入场动画名称 */
  appear?: string;
  /** 出场动画名称 */
  leave?: string;
}

/**
 * 运动配置接口
 */
export interface MotionType {
  /** 运动类名前缀 */
  motionName?: string;
  /** 运动出现 */
  motionAppear?: boolean;
  /** 运动进入 */
  motionEnter?: boolean;
  /** 运动离开 */
  motionLeave?: boolean;
  /** 运动离开立即 */
  motionLeaveImmediately?: boolean;
  /** 移除时销毁 */
  motionDeadline?: number;
  /** 运动结束回调 */
  onAppearEnd?: (element: HTMLElement, event: Event) => void;
  onEnterEnd?: (element: HTMLElement, event: Event) => void;
  onLeaveEnd?: (element: HTMLElement, event: Event) => void;
}

/**
 * 内置位置配置
 */
export interface BuiltinPlacements {
  [key: string]: AlignType;
}

/**
 * 坐标点接口
 */
export interface Point {
  /** 页面X坐标 */
  pageX: number;
  /** 页面Y坐标 */
  pageY: number;
}

/**
 * 移动端配置接口
 */
export interface MobileConfig {
  /** 是否禁用内联样式 */
  popupClassName?: string;
  /** 弹出层样式 */
  popupStyle?: CSSProperties;
  /** 弹出层可见性 */
  popupMotion?: MotionType;
  /** 弹出层渲染函数 */
  popupRender?: (originNode: ReactElement) => ReactElement;
}

/**
 * 触发器上下文接口
 */
export interface TriggerContextType {
  /** 弹出层鼠标按下事件处理器 */
  onPopupMouseDown: (event: React.MouseEvent) => void;
}

/**
 * 触发器组件状态接口
 */
export interface TriggerState {
  /** 上一次弹出层可见状态 */
  prevPopupVisible: boolean;
  /** 当前弹出层可见状态 */
  popupVisible: boolean;
  /** 对齐点坐标 */
  point?: Point;
}

/**
 * 触发器属性接口
 */
export interface TriggerProps {
  /** 子元素（触发器元素） */
  children: ReactElement;
  
  /** 触发行为：'hover' | 'click' | 'focus' | 'contextMenu' */
  action?: string | string[];
  
  /** 显示动作 */
  showAction?: string[];
  
  /** 隐藏动作 */
  hideAction?: string[];
  
  /** 弹出层内容 */
  popup: ReactElement | (() => ReactElement);
  
  /** 弹出层样式 */
  popupStyle?: CSSProperties;
  
  /** 样式类名前缀 */
  prefixCls?: string;
  
  /** 弹出层类名 */
  popupClassName?: string;
  
  /** 弹出层类名（从对齐方式获取） */
  getPopupClassNameFromAlign?: (align: AlignType) => string;
  
  /** 弹出层可见状态改变回调 */
  onPopupVisibleChange?: (visible: boolean) => void;
  
  /** 弹出层可见状态改变后回调 */
  afterPopupVisibleChange?: (visible: boolean) => void;
  
  /** 弹出层对齐后回调 */
  onPopupAlign?: (element: HTMLElement, align: AlignType) => void;
  
  /** 弹出层可见状态（受控） */
  popupVisible?: boolean;
  
  /** 默认弹出层可见状态 */
  defaultPopupVisible?: boolean;
  
  /** 鼠标移入延迟（秒） */
  mouseEnterDelay?: number;
  
  /** 鼠标移出延迟（秒） */
  mouseLeaveDelay?: number;
  
  /** 获得焦点延迟（秒） */
  focusDelay?: number;
  
  /** 失去焦点延迟（秒） */
  blurDelay?: number;
  
  /** 是否显示遮罩 */
  mask?: boolean;
  
  /** 点击遮罩是否关闭 */
  maskClosable?: boolean;
  
  /** 遮罩动画名称 */
  maskAnimation?: string;
  
  /** 遮罩过渡名称 */
  maskTransitionName?: string;
  
  /** 遮罩运动配置 */
  maskMotion?: MotionType;
  
  /** 弹出层对齐配置 */
  popupAlign?: AlignType;
  
  /** 弹出层位置 */
  popupPlacement?: string;
  
  /** 内置位置配置 */
  builtinPlacements?: BuiltinPlacements;
  
  /** 弹出层过渡名称 */
  popupTransitionName?: string;
  
  /** 弹出层动画名称 */
  popupAnimation?: string;
  
  /** 弹出层运动配置 */
  popupMotion?: MotionType;
  
  /** 获取弹出层容器 */
  getPopupContainer?: (triggerNode?: HTMLElement) => HTMLElement;
  
  /** 获取文档对象 */
  getDocument?: (element: HTMLElement) => Document;
  
  /** 获取触发器DOM节点 */
  getTriggerDOMNode?: (node: React.ReactInstance) => HTMLElement;
  
  /** 隐藏时销毁弹出层 */
  destroyPopupOnHide?: boolean;
  
  /** z-index层级 */
  zIndex?: number;
  
  /** 是否根据点击位置对齐 */
  alignPoint?: boolean;
  
  /** 拉伸宽度或高度以匹配目标元素 */
  stretch?: 'width' | 'height' | 'min-width' | 'min-height';
  
  /** 移动端配置 */
  mobile?: MobileConfig;
  
  /** 是否强制渲染 */
  forceRender?: boolean;
  
  /** 触发器类名 */
  className?: string;
  
  /** 自动销毁（不可见时） */
  autoDestroy?: boolean;
  
  /** 点击事件 */
  onClick?: (event: React.MouseEvent) => void;
  
  /** 鼠标按下事件 */
  onMouseDown?: (event: React.MouseEvent) => void;
  
  /** 触摸开始事件 */
  onTouchStart?: (event: React.TouchEvent) => void;
  
  /** 鼠标移入事件 */
  onMouseEnter?: (event: React.MouseEvent) => void;
  
  /** 鼠标移动事件 */
  onMouseMove?: (event: React.MouseEvent) => void;
  
  /** 鼠标移出事件 */
  onMouseLeave?: (event: React.MouseEvent) => void;
  
  /** 获得焦点事件 */
  onFocus?: (event: React.FocusEvent) => void;
  
  /** 失去焦点事件 */
  onBlur?: (event: React.FocusEvent) => void;
  
  /** 右键菜单事件 */
  onContextMenu?: (event: React.MouseEvent) => void;
}

/**
 * 触发器组件类接口
 */
export interface TriggerComponent extends React.Component<TriggerProps, TriggerState> {
  /** 弹出层引用 */
  popupRef: RefObject<PopupComponent>;
  
  /** 触发器引用 */
  triggerRef: RefObject<React.ReactInstance>;
  
  /** 门户容器 */
  portalContainer?: HTMLElement;
  
  /** 附加ID */
  attachId?: number;
  
  /** 外部点击处理器 */
  clickOutsideHandler?: { remove: () => void };
  
  /** 外部触摸处理器 */
  touchOutsideHandler?: { remove: () => void };
  
  /** 右键菜单外部处理器1 */
  contextMenuOutsideHandler1?: { remove: () => void };
  
  /** 右键菜单外部处理器2 */
  contextMenuOutsideHandler2?: { remove: () => void };
  
  /** 鼠标按下超时ID */
  mouseDownTimeout?: number;
  
  /** 焦点时间戳 */
  focusTime?: number;
  
  /** 点击前时间戳 */
  preClickTime?: number;
  
  /** 触摸前时间戳 */
  preTouchTime?: number;
  
  /** 延迟定时器ID */
  delayTimer?: number;
  
  /** 弹出层是否有鼠标按下 */
  hasPopupMouseDown?: boolean;
  
  /** 获取根DOM节点 */
  getRootDomNode(): HTMLElement | null;
  
  /** 获取弹出层DOM节点 */
  getPopupDomNode(): HTMLElement | null;
  
  /** 获取弹出层对齐配置 */
  getPopupAlign(): AlignType;
  
  /** 设置弹出层可见状态 */
  setPopupVisible(visible: boolean, event?: React.SyntheticEvent | Point): void;
  
  /** 延迟设置弹出层可见状态 */
  delaySetPopupVisible(visible: boolean, delay: number, event?: React.SyntheticEvent): void;
  
  /** 清除延迟定时器 */
  clearDelayTimer(): void;
  
  /** 清除外部处理器 */
  clearOutsideHandler(): void;
  
  /** 创建事件链 */
  createTwoChains(eventName: string): ((event: React.SyntheticEvent) => void) | undefined;
  
  /** 是否点击显示 */
  isClickToShow(): boolean;
  
  /** 是否仅右键菜单 */
  isContextMenuOnly(): boolean;
  
  /** 是否右键菜单显示 */
  isContextMenuToShow(): boolean;
  
  /** 是否点击隐藏 */
  isClickToHide(): boolean;
  
  /** 是否鼠标移入显示 */
  isMouseEnterToShow(): boolean;
  
  /** 是否鼠标移出隐藏 */
  isMouseLeaveToHide(): boolean;
  
  /** 是否获得焦点显示 */
  isFocusToShow(): boolean;
  
  /** 是否失去焦点隐藏 */
  isBlurToHide(): boolean;
  
  /** 强制对齐弹出层 */
  forcePopupAlign(): void;
  
  /** 触发事件 */
  fireEvents(eventName: string, event: React.SyntheticEvent): void;
  
  /** 关闭弹出层 */
  close(): void;
}

/**
 * 弹出层组件接口
 */
export interface PopupComponent {
  /** 获取弹出层元素 */
  getElement(): HTMLElement | null;
  
  /** 强制对齐 */
  forceAlign(): void;
}

/**
 * 生成触发器组件的工厂函数
 * @param Portal - 门户组件类
 * @returns 触发器组件类
 */
export function generateTrigger(Portal: React.ComponentType<any>): React.ComponentClass<TriggerProps, TriggerState>;

/**
 * 默认导出的触发器组件
 */
declare const Trigger: React.ComponentClass<TriggerProps, TriggerState>;

export default Trigger;