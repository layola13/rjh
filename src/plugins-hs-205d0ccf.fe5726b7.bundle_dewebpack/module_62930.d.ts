/**
 * Round Input Component
 * A custom input component with clear functionality and theme support
 */

import { InputProps } from 'antd';
import { ChangeEvent, ReactNode } from 'react';

/**
 * Props for the RoundInput component
 * Extends standard Ant Design Input props with custom suffix handling
 */
export interface RoundInputProps extends Omit<InputProps, 'allowClear' | 'suffix'> {
  /**
   * Custom suffix element to display at the end of the input
   * Will be combined with the clear icon when input has value
   */
  suffix?: ReactNode;
  
  /**
   * Callback fired when input value changes
   * @param event - The change event from the input element
   */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

/**
 * RoundInput - A themed input component with integrated clear functionality
 * 
 * Features:
 * - Automatically displays a clear icon when input has value
 * - Applies theme-based styling
 * - Supports custom suffix alongside clear button
 * - Round border styling by default
 * 
 * @param props - Component props extending InputProps
 * @returns A themed input element with clear functionality
 * 
 * @example
 *