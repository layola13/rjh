/**
 * Dropdown component module
 * Renders a list of expandable dropdown items with labels and content
 */

import React from 'react';

/**
 * Represents a single dropdown item
 */
export interface DropdownItem {
  /** Display label for the dropdown item */
  label: string;
  /** Content to display when the dropdown is expanded */
  content: string;
}

/**
 * Props for the Dropdown component
 */
export interface DropdownProps {
  /** Array of dropdown items to render */
  items: DropdownItem[];
}

/**
 * Dropdown component that displays a list of expandable items
 * Each item shows a numbered label and can be toggled to reveal content
 * 
 * @param props - Component props containing dropdown items
 * @returns React element containing the dropdown structure
 */
export declare function Dropdown(props: DropdownProps): React.ReactElement;