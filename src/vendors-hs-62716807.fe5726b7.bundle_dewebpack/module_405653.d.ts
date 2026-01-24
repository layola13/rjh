import type { ReactNode, ReactElement, CSSProperties, MouseEvent, KeyboardEvent } from 'react';

/**
 * Popconfirm 组件的按钮属性
 */
export interface ButtonProps {
  /** 按钮类型 */
  type?: 'primary' | 'default' | 'dashed' | 'text' | 'link';
  /** 按钮大小 */
  size?: 'small' | 'middle' | 'large';
  /** 按钮是否禁用 */
  disabled?: boolean;
  /** 按钮是否加载中 */
  loading?: boolean;
  /** 点击事件 */
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  /** 按钮样式 */
  style?: CSSProperties;
  /** 按钮类名 */
  className?: string;
  [key: string]: any;
}

/**
 * Popconfirm 组件属性
 */
export interface PopconfirmProps {
  /** 自定义类名前缀 */
  prefixCls?: string;
  
  /** 气泡框位置 */
  placement?: 
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
  
  /** 确认框的标题 */
  title?: ReactNode | (() => ReactNode);
  
  /** 确认框是否可见（受控） */
  visible?: boolean;
  
  /** 默认是否可见（非受控） */
  defaultVisible?: boolean;
  
  /** 显示隐藏的回调 */
  onVisibleChange?: (visible: boolean, event?: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>) => void;
  
  /** 点击确认的回调 */
  onConfirm?: (event: MouseEvent<HTMLElement>) => void;
  
  /** 点击取消的回调 */
  onCancel?: (event: MouseEvent<HTMLElement>) => void;
  
  /** 确认按钮文字 */
  okText?: ReactNode;
  
  /** 确认按钮类型 */
  okType?: 'primary' | 'danger' | 'dashed' | 'ghost' | 'default' | 'link' | 'text';
  
  /** 确认按钮属性 */
  okButtonProps?: ButtonProps;
  
  /** 取消按钮文字 */
  cancelText?: ReactNode;
  
  /** 取消按钮属性 */
  cancelButtonProps?: ButtonProps;
  
  /** 自定义图标 */
  icon?: ReactNode;
  
  /** 是否禁用 */
  disabled?: boolean;
  
  /** 触发行为 */
  trigger?: 'hover' | 'focus' | 'click' | 'contextMenu' | Array<'hover' | 'focus' | 'click' | 'contextMenu'>;
  
  /** 动画名称 */
  transitionName?: string;
  
  /** 浮层类名 */
  overlayClassName?: string;
  
  /** 浮层样式 */
  overlayStyle?: CSSProperties;
  
  /** 子元素 */
  children?: ReactElement;
  
  /** 其他属性 */
  [key: string]: any;
}

/**
 * Popconfirm 组件默认属性
 */
export interface PopconfirmDefaultProps {
  /** 默认动画名称 */
  transitionName: string;
  
  /** 默认位置 */
  placement: 'top';
  
  /** 默认触发方式 */
  trigger: 'click';
  
  /** 默认确认按钮类型 */
  okType: 'primary';
  
  /** 默认图标 */
  icon: ReactElement;
  
  /** 默认是否禁用 */
  disabled: boolean;
}

/**
 * 气泡确认框组件
 * 点击元素，弹出气泡式的确认框
 * 
 * @example
 *