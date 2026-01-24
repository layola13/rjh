/**
 * Ant Design Modal Confirm Component Type Definitions
 * Provides type definitions for the modal confirmation dialog component
 */

import type { CSSProperties, ReactNode } from 'react';
import type { ButtonProps } from 'antd/lib/button';

/**
 * Modal confirmation dialog types
 */
export type ConfirmType = 'info' | 'success' | 'error' | 'warning' | 'confirm';

/**
 * Auto focus button options
 */
export type AutoFocusButton = 'ok' | 'cancel' | null;

/**
 * Button type for OK button
 */
export type OkType = 'primary' | 'ghost' | 'dashed' | 'link' | 'text' | 'default';

/**
 * Text direction for RTL/LTR support
 */
export type Direction = 'ltr' | 'rtl';

/**
 * Close function parameters
 */
export interface CloseParams {
  /** Whether the close was triggered by cancel action */
  triggerCancel?: boolean;
}

/**
 * Configuration properties for Modal Confirm component
 */
export interface ConfirmModalProps {
  /** Icon to display in the modal (ReactNode instead of icon name string) */
  icon?: ReactNode;
  
  /** Callback when cancel button is clicked */
  onCancel?: () => void;
  
  /** Callback when OK button is clicked */
  onOk?: () => void;
  
  /** Function to close the modal */
  close?: (params?: CloseParams) => void;
  
  /** z-index of the modal */
  zIndex?: number;
  
  /** Callback after modal is closed (animation finished) */
  afterClose?: () => void;
  
  /** Whether the modal is visible */
  visible?: boolean;
  
  /** Whether support press ESC to close */
  keyboard?: boolean;
  
  /** Whether to center the modal vertically */
  centered?: boolean;
  
  /** Container element for the modal */
  getContainer?: HTMLElement | (() => HTMLElement) | false;
  
  /** Style for the modal mask */
  maskStyle?: CSSProperties;
  
  /** Text for the OK button */
  okText?: ReactNode;
  
  /** Props passed to the OK button */
  okButtonProps?: ButtonProps;
  
  /** Text for the cancel button */
  cancelText?: ReactNode;
  
  /** Props passed to the cancel button */
  cancelButtonProps?: ButtonProps;
  
  /** Text direction (RTL/LTR) */
  direction?: Direction;
  
  /** Prefix class name for the modal */
  prefixCls?: string;
  
  /** Root prefix class name */
  rootPrefixCls?: string;
  
  /** Style for the modal body */
  bodyStyle?: CSSProperties;
  
  /** Whether to show close button */
  closable?: boolean;
  
  /** Custom close icon */
  closeIcon?: ReactNode;
  
  /** Custom modal render function */
  modalRender?: (node: ReactNode) => ReactNode;
  
  /** Whether to focus trigger element after close */
  focusTriggerAfterClose?: boolean;
  
  /** Type of the OK button */
  okType?: OkType;
  
  /** Whether to show cancel button */
  okCancel?: boolean;
  
  /** Width of the modal */
  width?: number | string;
  
  /** Style object for the modal */
  style?: CSSProperties;
  
  /** Whether to show mask */
  mask?: boolean;
  
  /** Whether clicking mask can close the modal */
  maskClosable?: boolean;
  
  /** Which button should be auto focused */
  autoFocusButton?: AutoFocusButton;
  
  /** CSS transition name for modal */
  transitionName?: string;
  
  /** CSS transition name for mask */
  maskTransitionName?: string;
  
  /** Additional CSS class name */
  className?: string;
  
  /** Type of the confirm modal */
  type?: ConfirmType;
  
  /** Title of the modal */
  title?: ReactNode;
  
  /** Content of the modal */
  content?: ReactNode;
}

/**
 * Renders a confirmation modal dialog
 * 
 * @param props - Configuration properties for the confirm modal
 * @returns React element representing the modal confirm dialog
 * 
 * @remarks
 * This component is used internally by Modal.confirm() and other confirm-style methods.
 * It supports customizable buttons, icons, content, and various modal behaviors.
 * 
 * @example
 *