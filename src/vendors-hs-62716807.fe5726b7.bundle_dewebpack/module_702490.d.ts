/**
 * Search Input Component
 * A text input component with search functionality and optional button
 */

import * as React from 'react';
import { InputProps } from './Input';
import { ButtonProps } from '../button';
import { SizeType } from '../config-provider/SizeContext';

export interface SearchProps extends Omit<InputProps, 'onPressEnter' | 'addonAfter'> {
  /**
   * The prefix of the component CSS class
   */
  prefixCls?: string;

  /**
   * The prefix of the input CSS class
   */
  inputPrefixCls?: string;

  /**
   * Additional CSS class name
   */
  className?: string;

  /**
   * The size of the input box
   * @default 'default'
   */
  size?: SizeType;

  /**
   * The suffix icon or element
   */
  suffix?: React.ReactNode;

  /**
   * Whether to show an enter button, or customize the enter button
   * @default false
   */
  enterButton?: React.ReactNode | boolean;

  /**
   * The element to display after the input
   */
  addonAfter?: React.ReactNode;

  /**
   * Whether the search button is in loading state
   * @default false
   */
  loading?: boolean;

  /**
   * Whether the input is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Callback function triggered when search is executed
   * @param value - The input value
   * @param event - The triggering event (mouse click or keyboard enter)
   */
  onSearch?: (value: string, event?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLInputElement>) => void;

  /**
   * Callback function triggered when input value changes
   * @param event - The change event
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Search component with built-in search button
 * Extends Input component with search-specific functionality
 */
declare const Search: React.ForwardRefExoticComponent<SearchProps & React.RefAttributes<any>> & {
  displayName?: string;
};

export default Search;