/**
 * TextArea Component Type Definitions
 * 
 * A textarea component with support for:
 * - Character counting
 * - Max length validation
 * - Bordered/borderless styles
 * - Size variants (small, default, large)
 * - Clear button functionality
 */

import * as React from 'react';

/**
 * Size type for the textarea component
 */
export type SizeType = 'small' | 'default' | 'large';

/**
 * Configuration for character count display
 */
export interface ShowCountConfig {
  /**
   * Custom formatter for the count display
   * @param options - Count and max length information
   * @returns Formatted string to display
   */
  formatter: (options: { count: number; maxLength?: number }) => string;
}

/**
 * Props for the TextArea component
 */
export interface TextAreaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange' | 'value' | 'defaultValue'> {
  /**
   * Custom CSS class prefix for the component
   * @default 'ant-input'
   */
  prefixCls?: string;

  /**
   * Whether to display a border around the textarea
   * @default true
   */
  bordered?: boolean;

  /**
   * Whether to show character count and optional max length indicator
   * Can be a boolean or a configuration object with custom formatter
   * @default false
   */
  showCount?: boolean | ShowCountConfig;

  /**
   * Maximum number of characters allowed
   */
  maxLength?: number;

  /**
   * Additional CSS class name for the component
   */
  className?: string;

  /**
   * Inline styles for the component
   */
  style?: React.CSSProperties;

  /**
   * Size of the textarea
   */
  size?: SizeType;

  /**
   * Controlled value of the textarea
   */
  value?: string;

  /**
   * Default uncontrolled value
   */
  defaultValue?: string;

  /**
   * Change event handler
   * @param e - Change event from the textarea element
   */
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;

  /**
   * Whether to show a clear button
   */
  allowClear?: boolean;
}

/**
 * Focus options for the textarea focus method
 */
export interface FocusOptions {
  /**
   * Whether to move cursor to the end
   */
  cursor?: 'start' | 'end' | 'all';
}

/**
 * Ref handle exposed by the TextArea component
 */
export interface TextAreaRef {
  /**
   * Reference to the resizable textarea element
   */
  resizableTextArea?: {
    textArea: HTMLTextAreaElement;
  };

  /**
   * Programmatically focus the textarea
   * @param options - Focus behavior options
   */
  focus: (options?: FocusOptions) => void;

  /**
   * Programmatically blur the textarea
   */
  blur: () => void;
}

/**
 * TextArea Component
 * 
 * A feature-rich textarea component with character counting, max length validation,
 * and support for controlled/uncontrolled modes.
 * 
 * @example
 *