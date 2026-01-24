/**
 * React component for rendering range presets and action buttons in a date/time picker.
 * Displays preset time ranges (e.g., "Last 7 days", "Last month") and optional confirmation buttons.
 * 
 * @module RangeSelector
 */

import type { ReactNode, MouseEvent } from 'react';

/**
 * Configuration for a single range preset item
 */
export interface RangeItem {
  /** Display label for the preset */
  label: string;
  /** Click handler for selecting this range */
  onClick?: (e: MouseEvent) => void;
  /** Mouse enter handler for hover effects */
  onMouseEnter?: (e: MouseEvent) => void;
  /** Mouse leave handler for hover effects */
  onMouseLeave?: (e: MouseEvent) => void;
}

/**
 * Custom component overrides for rendering parts of the range selector
 */
export interface RangeSelectorComponents {
  /** Custom component for rendering individual range items (default: 'span') */
  rangeItem?: React.ComponentType<any> | keyof JSX.IntrinsicElements;
  /** Custom component for rendering buttons (default: 'button') */
  button?: React.ComponentType<any> | keyof JSX.IntrinsicElements;
}

/**
 * Localized text labels for the range selector UI
 */
export interface RangeSelectorLocale {
  /** Label for the "now" button */
  now: string;
  /** Label for the "OK" confirmation button */
  ok: string;
}

/**
 * Props for the RangeSelector component
 */
export interface RangeSelectorProps {
  /** CSS class prefix for styling (e.g., 'rc-picker') */
  prefixCls: string;
  
  /** Array of preset range options to display */
  rangeList?: RangeItem[];
  
  /** Custom component overrides */
  components?: RangeSelectorComponents;
  
  /** Whether to show the confirmation (OK) button */
  needConfirmButton?: boolean;
  
  /** Click handler for the "Now" button */
  onNow?: (e: MouseEvent) => void;
  
  /** Click handler for the "OK" button */
  onOk?: (e: MouseEvent) => void;
  
  /** Whether the OK button should be disabled */
  okDisabled?: boolean;
  
  /** Whether to display the "Now" button */
  showNow?: boolean;
  
  /** Localized text labels */
  locale: RangeSelectorLocale;
}

/**
 * Renders a list of preset time ranges and action buttons for a date/time picker.
 * 
 * Features:
 * - Displays clickable preset ranges (e.g., "Today", "Last week")
 * - Optional "Now" button to quickly select current time
 * - Optional "OK" confirmation button
 * - Customizable components and styling
 * 
 * @param props - Component properties
 * @returns React element containing the range selector UI, or null if no content to display
 */
export default function RangeSelector(props: RangeSelectorProps): ReactNode | null;