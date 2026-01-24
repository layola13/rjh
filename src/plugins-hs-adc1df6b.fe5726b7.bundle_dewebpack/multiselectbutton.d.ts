/**
 * Multi-select button component for property bars
 * @module MultiSelectButton
 */

import React from 'react';
import { MultiSelect } from './MultiSelect';

/**
 * Theme options for the multi-select button
 */
export type MultiSelectTheme = 'light' | 'dark' | string;

/**
 * Placement options for the dropdown menu
 */
export type MultiSelectPlacement = 
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight';

/**
 * Type/variant of the multi-select button
 */
export type MultiSelectType = 'default' | 'primary' | 'secondary' | string;

/**
 * Individual item in the multi-select list
 */
export interface MultiSelectListItem {
  /** Unique identifier for the list item */
  id: string | number;
  /** Display label */
  label: string;
  /** Current selection state */
  selected?: boolean;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Optional icon identifier */
  icon?: string;
  /** Additional item data */
  [key: string]: unknown;
}

/**
 * Configuration data for MultiSelectButton
 */
export interface MultiSelectButtonData {
  /** Type/variant of the button */
  type: MultiSelectType;
  /** List of selectable items */
  list: MultiSelectListItem[];
  /** Visual theme */
  theme?: MultiSelectTheme;
  /** Additional CSS class names */
  className?: string;
  /** Dropdown placement relative to button */
  placement?: MultiSelectPlacement;
}

/**
 * Props for the MultiSelectButton component
 */
export interface MultiSelectButtonProps {
  /** Component configuration data */
  data: MultiSelectButtonData;
  /** Unique identifier for the component instance */
  id?: string;
}

/**
 * Multi-select button component for property bar interfaces
 * Renders a button that opens a dropdown with multiple selectable options
 * 
 * @param props - Component properties
 * @returns React element containing the multi-select button
 */
export declare function MultiSelectButton(props: MultiSelectButtonProps): React.ReactElement;