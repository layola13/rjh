/**
 * Form error display component module
 * Handles the display and animation of form validation errors
 */

import type { ReactElement } from 'react';

/**
 * Error message item type
 */
export type ErrorMessage = ReactNode;

/**
 * Form item status type
 */
export type FormItemStatus = 'error' | 'warning' | 'success' | 'validating' | undefined;

/**
 * Props for the ErrorList component
 */
export interface ErrorListProps {
  /**
   * Array of error messages to display
   * @default []
   */
  errors?: ErrorMessage[];

  /**
   * Help text or additional guidance
   */
  help?: ReactNode;

  /**
   * Callback fired when error visibility changes
   * @param visible - Whether errors are currently visible
   */
  onDomErrorVisibleChange?: (visible: boolean) => void;
}

/**
 * Form Item Prefix Context value
 */
export interface FormItemPrefixContextValue {
  /**
   * CSS class prefix for the form item
   */
  prefixCls: string;

  /**
   * Current validation status of the form item
   */
  status?: FormItemStatus;
}

/**
 * ErrorList component
 * Displays form validation errors with enter/leave animations
 * 
 * @param props - Component props
 * @returns React element displaying animated error messages
 */
declare function ErrorList(props: ErrorListProps): ReactElement;

export default ErrorList;