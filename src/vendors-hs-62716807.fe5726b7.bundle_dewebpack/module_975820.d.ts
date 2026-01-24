import React from 'react';
import { ButtonProps } from 'antd/lib/button';
import { ModalProps as RcModalProps } from 'rc-dialog';

/**
 * 模态框关闭/销毁时的回调函数列表
 * 用于存储需要在组件卸载时执行的清理函数
 */
export declare const destroyFns: Array<() => void>;

/**
 * 鼠标点击位置坐标
 * 用于模态框打开时的动画起始位置
 */
interface MousePosition {
  /** 页面横坐标 */
  x: number;
  /** 页面纵坐标 */
  y: number;
}

/**
 * 模态框按钮属性配置
 */
export interface ModalButtonProps extends ButtonProps {
  /** 按钮文本 */
  children?: React.ReactNode;
}

/**
 * 模态框组件属性
 */
export interface ModalProps extends Omit<RcModalProps, 'footer' | 'closeIcon'> {
  /**
   * 对话框是否可见
   * @default false
   */
  visible?: boolean;

  /**
   * 确定按钮加载状态
   * @default false
   */
  confirmLoading?: boolean;

  /**
   * 标题
   */
  title?: React.ReactNode;

  /**
   * 是否显示右上角的关闭按钮
   * @default true
   */
  closable?: boolean;

  /**
   * 点击确定回调
   * @param e - 鼠标事件对象
   */
  onOk?: (e: React.MouseEvent<HTMLElement>) => void;

  /**
   * 点击取消/关闭回调
   * @param e - 鼠标事件对象
   */
  onCancel?: (e: React.MouseEvent<HTMLElement>) => void;

  /**
   * 关闭后是否将焦点返回到触发元素
   * @default true
   */
  focusTriggerAfterClose?: boolean;

  /**
   * 自定义底部内容，传入 null 时不显示底部
   */
  footer?: React.ReactNode;

  /**
   * 确认按钮文字
   */
  okText?: React.ReactNode;

  /**
   * 确认按钮类型
   * @default 'primary'
   */
  okType?: 'primary' | 'default' | 'dashed' | 'text' | 'link' | 'ghost' | 'danger';

  /**
   * 取消按钮文字
   */
  cancelText?: React.ReactNode;

  /**
   * 点击蒙层是否允许关闭
   * @default true
   */
  maskClosable?: boolean;

  /**
   * 关闭时销毁 Modal 里的子元素
   * @default false
   */
  destroyOnClose?: boolean;

  /**
   * 模态框宽度
   * @default 520
   */
  width?: string | number;

  /**
   * 自定义类名前缀
   */
  prefixCls?: string;

  /**
   * 对话框外层容器的类名
   */
  wrapClassName?: string;

  /**
   * 垂直居中展示 Modal
   * @default false
   */
  centered?: boolean;

  /**
   * 指定 Modal 挂载的 HTML 节点，false 为挂载在当前 dom
   */
  getContainer?: HTMLElement | (() => HTMLElement) | false;

  /**
   * 自定义关闭图标
   */
  closeIcon?: React.ReactNode;

  /**
   * 对话框打开动画名称
   * @default 'zoom'
   */
  transitionName?: string;

  /**
   * 遮罩动画名称
   * @default 'fade'
   */
  maskTransitionName?: string;

  /**
   * 确定按钮 props
   */
  okButtonProps?: ModalButtonProps;

  /**
   * 取消按钮 props
   */
  cancelButtonProps?: ModalButtonProps;
}

/**
 * useModal Hook 返回值
 */
export interface ModalHookReturnType {
  /** 模态框实例列表 */
  0: React.ReactElement;
  /** 打开模态框的方法 */
  1: {
    destroy: () => void;
    update: (config: ModalFuncProps) => void;
  };
}

/**
 * Modal.method() 配置项
 */
export interface ModalFuncProps extends Omit<ModalProps, 'visible'> {
  /** 图标类型或自定义图标 */
  icon?: React.ReactNode;
  /** 内容 */
  content?: React.ReactNode;
  /** 按钮配置 */
  okButtonProps?: ModalButtonProps;
  cancelButtonProps?: ModalButtonProps;
}

/**
 * 模态框组件
 * 用于显示需要用户交互的对话框
 */
export interface ModalComponent extends React.FC<ModalProps> {
  /**
   * 使用 Hook 方式调用模态框
   * @returns [模态框元素, 控制方法]
   */
  useModal: () => ModalHookReturnType;

  /** 默认属性 */
  defaultProps: Partial<ModalProps>;
}

/**
 * 模态框组件默认导出
 */
declare const Modal: ModalComponent;

export default Modal;