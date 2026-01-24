/**
 * Form Item Control Component Type Definitions
 * Provides type definitions for a form control component with validation status, feedback, and error handling
 */

import type { ReactNode, ReactElement, Context } from 'react';
import type { ColProps } from 'antd/es/grid/col';

/**
 * Validation status types for form items
 */
export type ValidateStatus = 'success' | 'warning' | 'error' | 'validating';

/**
 * Internal render configuration for custom rendering
 */
export interface InternalItemRender {
  /** Marker to identify the render source (e.g., 'pro_table_render') */
  mark?: string;
  /** Custom render function */
  render?: (props: FormItemControlProps, children: FormItemControlChildren) => ReactElement;
}

/**
 * Child elements structure passed to custom render functions
 */
export interface FormItemControlChildren {
  /** The main input element wrapper */
  input: ReactElement;
  /** Error list display component */
  errorList: ReactElement;
  /** Extra content element */
  extra: ReactElement | null;
}

/**
 * Form context value interface
 */
export interface FormContextValue {
  /** CSS class prefix for form components */
  prefixCls?: string;
  /** Column configuration for labels */
  labelCol?: ColProps;
  /** Column configuration for form controls */
  wrapperCol?: ColProps;
  /** Current form item status */
  status?: ValidateStatus;
  [key: string]: unknown;
}

/**
 * Form item prefix context value
 */
export interface FormItemPrefixContextValue {
  /** CSS class prefix for form components */
  prefixCls: string;
  /** Current validation status */
  status?: ValidateStatus;
}

/**
 * Props for the FormItemControl component
 */
export interface FormItemControlProps {
  /** CSS class prefix for the form item (e.g., 'ant-form') */
  prefixCls: string;
  
  /** Current validation status of the form item */
  status?: ValidateStatus;
  
  /** Column layout configuration for the wrapper */
  wrapperCol?: ColProps;
  
  /** Child content to be rendered inside the control */
  children?: ReactNode;
  
  /** Help text or description */
  help?: ReactNode;
  
  /** Array of error messages to display */
  errors?: ReactNode[];
  
  /** Callback fired when error visibility changes in DOM */
  onDomErrorVisibleChange?: (visible: boolean) => void;
  
  /** Whether to show validation feedback icon */
  hasFeedback?: boolean;
  
  /** Internal custom render configuration */
  _internalItemRender?: InternalItemRender;
  
  /** Validation status (alias/override for status) */
  validateStatus?: ValidateStatus;
  
  /** Extra content to display below the form control */
  extra?: ReactNode;
}

/**
 * Icon component map for different validation statuses
 */
export interface StatusIconMap {
  success: React.ComponentType;
  warning: React.ComponentType;
  error: React.ComponentType;
  validating: React.ComponentType;
}

/**
 * Form context instance
 */
export declare const FormContext: Context<FormContextValue>;

/**
 * Form item prefix context instance
 */
export declare const FormItemPrefixContext: Context<FormItemPrefixContextValue>;

/**
 * FormItemControl Component
 * 
 * Renders the control section of a form item with validation feedback,
 * error messages, and optional extra content.
 * 
 * @param props - Component props
 * @returns The rendered form item control component
 * 
 * @example
 *