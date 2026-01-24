/**
 * Modal Hook Type Definitions
 * Provides type-safe modal management utilities using React hooks
 */

import { ReactElement, RefObject } from 'react';

/**
 * Configuration options for modal instances
 */
export interface ModalConfig {
  /** Modal title */
  title?: string;
  /** Modal content */
  content?: React.ReactNode;
  /** Callback fired when OK button is clicked */
  onOk?: () => void | Promise<void>;
  /** Callback fired when Cancel button is clicked */
  onCancel?: () => void;
  /** Text for OK button */
  okText?: string;
  /** Text for Cancel button */
  cancelText?: string;
  /** Whether to show mask */
  mask?: boolean;
  /** Whether modal is closable */
  closable?: boolean;
  /** Width of modal */
  width?: number | string;
  /** Whether to center modal */
  centered?: boolean;
  /** Custom class name */
  className?: string;
  /** z-index of modal */
  zIndex?: number;
}

/**
 * Modal instance control interface
 */
export interface ModalInstance {
  /** Destroy the modal instance */
  destroy: () => void;
  /** Update modal configuration */
  update: (config: Partial<ModalConfig>) => void;
}

/**
 * Modal method type that accepts optional parameters and returns a modal instance
 */
export type ModalMethod = (config?: ModalConfig) => ModalInstance;

/**
 * Modal static methods collection
 */
export interface ModalStaticMethods {
  /** Display info modal */
  info: ModalMethod;
  /** Display success modal */
  success: ModalMethod;
  /** Display error modal */
  error: ModalMethod;
  /** Display warning modal */
  warning: ModalMethod;
  /** Display confirmation modal */
  confirm: ModalMethod;
}

/**
 * Return type of useModal hook
 * @returns A tuple containing modal methods and context holder element
 */
export type UseModalReturnType = [
  /** Modal static methods for triggering modals */
  ModalStaticMethods,
  /** React element to be rendered in component tree (context holder) */
  ReactElement
];

/**
 * Custom hook for imperative modal management
 * 
 * @example
 *