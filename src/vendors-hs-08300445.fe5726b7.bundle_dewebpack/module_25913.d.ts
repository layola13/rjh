/**
 * Input component for Select/AutoComplete - Type Definitions
 * Handles the search input within a select dropdown with composition and keyboard support
 */

import type { Ref, ReactElement, KeyboardEvent, MouseEvent, ChangeEvent, CompositionEvent, ClipboardEvent, CSSProperties } from 'react';

/**
 * Props for the Input component
 */
export interface InputProps {
  /** CSS class prefix for BEM naming convention */
  prefixCls: string;
  
  /** Unique identifier for the input element */
  id: string;
  
  /** Custom input element to render (defaults to <input>) */
  inputElement?: ReactElement;
  
  /** Whether the input is disabled */
  disabled?: boolean;
  
  /** Tab index for keyboard navigation */
  tabIndex?: number;
  
  /** Whether to auto-focus the input on mount */
  autoFocus?: boolean;
  
  /** Autocomplete attribute value */
  autoComplete?: string;
  
  /** Whether the input is editable */
  editable: boolean;
  
  /** Current active descendant index for ARIA */
  accessibilityIndex: number;
  
  /** Current input value */
  value: string;
  
  /** Maximum length of input */
  maxLength?: number;
  
  /** Keyboard event handler */
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  
  /** Mouse down event handler */
  onMouseDown: (event: MouseEvent<HTMLInputElement>) => void;
  
  /** Change event handler */
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  
  /** Paste event handler */
  onPaste?: (event: ClipboardEvent<HTMLInputElement>) => void;
  
  /** Composition start event handler (for IME input) */
  onCompositionStart: (event: CompositionEvent<HTMLInputElement>) => void;
  
  /** Composition end event handler (for IME input) */
  onCompositionEnd: (event: CompositionEvent<HTMLInputElement>) => void;
  
  /** Whether the dropdown is open */
  open: boolean;
  
  /** Additional HTML attributes to apply to the input */
  attrs?: Record<string, unknown>;
}

/**
 * Input component for Select/AutoComplete
 * 
 * Renders an accessible search input with:
 * - Full ARIA support for combobox pattern
 * - IME composition handling
 * - Keyboard navigation
 * - Custom input element support
 * 
 * @param props - Component props
 * @param ref - Forwarded ref to the input element
 */
declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;

export default Input;