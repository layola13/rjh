/**
 * SelectContext Module
 * 
 * Provides a React context for managing select component state and behavior.
 * This context allows child components to access and interact with the parent
 * select component's state without prop drilling.
 */

import { Context, createContext } from 'react';

/**
 * The value type for SelectContext.
 * Contains state and methods needed by select components.
 */
export interface SelectContextValue {
  /** Currently selected value(s) */
  value?: string | string[] | null;
  
  /** Callback fired when selection changes */
  onChange?: (value: string | string[] | null) => void;
  
  /** Whether the select is in multiple selection mode */
  multiple?: boolean;
  
  /** Whether the select is disabled */
  disabled?: boolean;
  
  /** Whether the select dropdown is open */
  open?: boolean;
  
  /** Callback to toggle the dropdown open state */
  onToggle?: () => void;
  
  /** Callback to close the dropdown */
  onClose?: () => void;
  
  /** Currently focused option value */
  focusedValue?: string | null;
  
  /** Callback to update focused option */
  onFocusChange?: (value: string | null) => void;
}

/**
 * React Context for Select component state management.
 * 
 * This context provides access to select component state and actions
 * to all descendant components in the select component tree.
 * 
 * @example
 *