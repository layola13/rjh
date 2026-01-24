/**
 * Custom React hook for managing synchronized text value state
 * @module useTextValueSync
 */

import { useState, useEffect, useRef } from 'react';

/**
 * Props for the useTextValueSync hook
 */
interface UseTextValueSyncProps {
  /** Array of text values to synchronize with */
  valueTexts: string[];
  /** Callback function invoked when the text value changes */
  onTextChange: (text: string) => void;
}

/**
 * Return type of the useTextValueSync hook
 * @template T - The type of the text value (typically string)
 */
type UseTextValueSyncReturn = [
  /** Current text value */
  currentValue: string,
  /** Function to update the text value and trigger onChange callback */
  updateValue: (newValue: string) => void,
  /** Function to reset the value to the first item in valueTexts */
  resetValue: () => void
];

/**
 * Hook for managing text value state with external synchronization
 * 
 * This hook maintains a local text state that syncs with an array of external values.
 * When the external values change and don't match the current local value, it resets
 * to the first external value.
 * 
 * @param props - Configuration object with valueTexts and onTextChange
 * @returns Tuple containing [currentValue, updateValue, resetValue]
 * 
 * @example
 *