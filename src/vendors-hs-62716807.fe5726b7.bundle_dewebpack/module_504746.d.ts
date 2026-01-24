/**
 * React Modal component with imperative handle support.
 * Provides a configurable modal dialog with internationalization and close management.
 */

import { ReactElement, ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * Modal configuration options
 */
export interface ModalConfig {
  /** Text for the OK button */
  okText?: string;
  /** Text for the Cancel button */
  cancelText?: string;
  /** Whether to show the cancel button */
  okCancel?: boolean;
  /** Callback when cancel button is clicked */
  onCancel?: () => void;
  /** Additional modal configuration properties */
  [key: string]: any;
}

/**
 * Component props for the Modal wrapper
 */
export interface ModalWrapperProps {
  /** Callback invoked after modal is fully closed */
  afterClose?: () => void;
  /** Modal configuration object */
  config: ModalConfig;
}

/**
 * Imperative methods exposed via ref
 */
export interface ModalRef {
  /** Closes and destroys the modal instance */
  destroy: () => void;
  /** Updates modal configuration dynamically */
  update: (config: Partial<ModalConfig>) => void;
}

/**
 * Locale/internationalization text for modal buttons
 */
export interface ModalLocale {
  /** Default OK button text */
  okText: string;
  /** OK button text when cancel is also shown */
  justOkText: string;
  /** Default Cancel button text */
  cancelText: string;
}

/**
 * Context configuration from ConfigProvider
 */
export interface ConfigContext {
  /** Text direction (ltr/rtl) */
  direction?: 'ltr' | 'rtl';
  /** Function to get prefixed CSS class names */
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string;
}

/**
 * Forward ref component that renders a modal dialog with imperative controls.
 * 
 * @example
 *