/**
 * Radio Group Component
 * Provides a group container for radio buttons with shared state management
 */

import { ForwardRefExoticComponent, RefAttributes, CSSProperties, ReactNode, MouseEvent } from 'react';
import { SizeType } from '../config-provider/SizeContext';

/**
 * Radio option configuration when using options prop
 */
export interface RadioGroupOption {
  /** Display label for the radio button */
  label: ReactNode;
  /** Value of the radio button */
  value: string | number;
  /** Whether the radio button is disabled */
  disabled?: boolean;
  /** Custom style for the radio button */
  style?: CSSProperties;
}

/**
 * Type of radio button appearance
 */
export type RadioGroupOptionType = 'default' | 'button';

/**
 * Button style variant (only applies when optionType is 'button')
 */
export type RadioGroupButtonStyle = 'outline' | 'solid';

/**
 * Change event for RadioGroup
 */
export interface RadioChangeEvent {
  target: {
    value: string | number;
  };
}

/**
 * Props for RadioGroup component
 */
export interface RadioGroupProps {
  /** Custom CSS class name */
  className?: string;
  /** Prefix for CSS classes */
  prefixCls?: string;
  /** Default selected value (uncontrolled mode) */
  defaultValue?: string | number;
  /** Current selected value (controlled mode) */
  value?: string | number;
  /** Callback when selection changes */
  onChange?: (e: RadioChangeEvent) => void;
  /** Disable all radio buttons in the group */
  disabled?: boolean;
  /** Name attribute for all radio inputs */
  name?: string;
  /** Array of radio options to render */
  options?: Array<string | number | RadioGroupOption>;
  /** Type of radio button appearance */
  optionType?: RadioGroupOptionType;
  /** Button style variant (only for button type) */
  buttonStyle?: RadioGroupButtonStyle;
  /** Size of radio buttons */
  size?: SizeType;
  /** Custom inline styles */
  style?: CSSProperties;
  /** Component ID */
  id?: string;
  /** Mouse enter event handler */
  onMouseEnter?: (e: MouseEvent<HTMLDivElement>) => void;
  /** Mouse leave event handler */
  onMouseLeave?: (e: MouseEvent<HTMLDivElement>) => void;
  /** Child radio button elements */
  children?: ReactNode;
}

/**
 * Radio Group Component
 * 
 * Manages a collection of radio buttons with shared state.
 * Supports both controlled and uncontrolled modes.
 * 
 * @example
 *