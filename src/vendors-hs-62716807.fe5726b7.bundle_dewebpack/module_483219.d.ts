/**
 * Search input component with clear functionality
 * 
 * @module SearchInput
 */

import type { ChangeEvent, MouseEvent, ReactElement } from 'react';

/**
 * Props for the SearchInput component
 */
export interface SearchInputProps {
  /**
   * Placeholder text displayed when input is empty
   * @default ""
   */
  placeholder?: string;

  /**
   * Current value of the input
   */
  value?: string;

  /**
   * CSS class prefix for styling
   */
  prefixCls?: string;

  /**
   * Whether the input is disabled
   */
  disabled?: boolean;

  /**
   * Callback fired when input value changes
   * @param event - The change event from the input element
   */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;

  /**
   * Callback fired when clear button is clicked
   * @param event - The mouse event from the clear action
   */
  handleClear?: (event: MouseEvent<HTMLAnchorElement>) => void;
}

/**
 * Default export: SearchInput component
 * 
 * A controlled input component with integrated clear functionality.
 * Displays a clear icon when the input has content, otherwise shows a default icon.
 * 
 * @param props - Component properties
 * @returns React element representing the search input with action button
 */
export default function SearchInput(props: SearchInputProps): ReactElement;