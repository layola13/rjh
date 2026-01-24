/**
 * React context for managing radio group state and behavior.
 * Provides shared state to radio button children within a radio group.
 * 
 * @module RadioGroupContext
 */

import { Context, Provider } from 'react';

/**
 * Shape of the radio group context value.
 * Contains shared state and handlers for radio buttons within the group.
 */
export interface RadioGroupContextValue {
  /**
   * Currently selected value in the radio group.
   */
  value?: string | number | null;
  
  /**
   * Callback invoked when a radio button is selected.
   * @param value - The value of the selected radio button
   */
  onChange?: (value: string | number) => void;
  
  /**
   * Name attribute shared by all radio buttons in the group.
   */
  name?: string;
  
  /**
   * Whether the entire radio group is disabled.
   */
  disabled?: boolean;
}

/**
 * React Context for RadioGroup component.
 * Allows radio buttons to access shared group state without prop drilling.
 */
declare const RadioGroupContext: Context<RadioGroupContextValue | null>;

/**
 * Provider component for RadioGroup context.
 * Wraps radio button children to provide shared state and behavior.
 */
export declare const RadioGroupContextProvider: Provider<RadioGroupContextValue | null>;

/**
 * Default export of the RadioGroup context.
 */
export default RadioGroupContext;