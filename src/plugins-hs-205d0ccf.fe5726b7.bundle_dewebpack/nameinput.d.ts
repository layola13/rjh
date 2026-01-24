/**
 * NameInput Component
 * 
 * A controlled input component for editing names with validation.
 * Features:
 * - Maximum length validation (20 characters)
 * - Auto-focus on mount
 * - Click-outside to commit changes
 * - Enter key to submit
 * - Error state display for invalid input
 */

import type { FC, RefObject } from 'react';
import type { InputRef } from 'antd';

/**
 * Props for the NameInput component
 */
export interface NameInputProps {
  /**
   * Current value of the input field
   */
  value: string;

  /**
   * Callback invoked when the user commits the edited name
   * Triggered on blur or Enter key press
   * 
   * @param newName - The updated name value
   */
  commitEditingName: (newName: string) => void;
}

/**
 * NameInput Component
 * 
 * A specialized input component for editing task/item names with built-in validation.
 * 
 * @example
 *