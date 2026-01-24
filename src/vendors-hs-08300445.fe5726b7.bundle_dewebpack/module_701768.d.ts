/**
 * Custom React hook for managing editable cell input state and interactions
 * Handles focus, keyboard navigation, and click-outside behavior
 */

/**
 * Props for the useEditableCell hook
 */
export interface UseEditableCellProps {
  /** Whether the cell is currently in edit mode */
  open: boolean;
  
  /** Current value of the input field */
  value: unknown;
  
  /** Function to check if a click occurred outside the editable area */
  isClickOutside: (element: Element | null) => boolean;
  
  /** Function to programmatically open/close the edit mode */
  triggerOpen: (open: boolean) => void;
  
  /** Function to handle forwarding keyboard events (e.g., for navigation) */
  forwardKeyDown: (event: React.KeyboardEvent) => boolean;
  
  /** Custom keydown handler */
  onKeyDown: (event: React.KeyboardEvent, markAsHandled: () => void) => void;
  
  /** Whether to cancel edit mode when focus is lost */
  blurToCancel?: boolean;
  
  /** Callback when edit is submitted, returns false to prevent default behavior */
  onSubmit: () => boolean | void;
  
  /** Callback when edit is cancelled */
  onCancel: () => void;
  
  /** Focus event handler */
  onFocus?: (event: React.FocusEvent) => void;
  
  /** Blur event handler */
  onBlur?: (event: React.FocusEvent) => void;
}

/**
 * State returned by the useEditableCell hook
 */
export interface UseEditableCellState {
  /** Whether the input currently has focus */
  focused: boolean;
  
  /** Whether the user is actively typing */
  typing: boolean;
}

/**
 * Event handlers returned by the useEditableCell hook
 */
export interface UseEditableCellHandlers {
  /** Mouse down event handler */
  onMouseDown: () => void;
  
  /** Keyboard event handler */
  onKeyDown: (event: React.KeyboardEvent) => void;
  
  /** Focus event handler */
  onFocus: (event: React.FocusEvent) => void;
  
  /** Blur event handler */
  onBlur: (event: React.FocusEvent) => void;
}

/**
 * Hook for managing editable cell behavior including focus management,
 * keyboard navigation (Enter, Tab, Esc), and click-outside detection
 * 
 * @param props - Configuration options for the editable cell
 * @returns Tuple of [event handlers, current state]
 */
export default function useEditableCell(
  props: UseEditableCellProps
): [UseEditableCellHandlers, UseEditableCellState];