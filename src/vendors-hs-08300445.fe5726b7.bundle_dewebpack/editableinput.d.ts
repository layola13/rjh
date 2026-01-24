import React from 'react';

/**
 * Arrow key codes used for incrementing/decrementing values
 */
declare const ARROW_KEYS: readonly [38, 40];

/**
 * Value object with a dynamic label key
 */
export interface ValueObject {
  [label: string]: string | number;
}

/**
 * Style configuration for EditableInput component
 */
export interface EditableInputStyles {
  /** Container wrapper styles */
  wrap?: React.CSSProperties;
  /** Input element styles */
  input?: React.CSSProperties;
  /** Label element styles */
  label?: React.CSSProperties;
}

/**
 * Props for the EditableInput component
 */
export interface EditableInputProps {
  /** Current value of the input */
  value: string | number;
  /** Label text displayed next to the input */
  label?: string;
  /** Offset value for arrow key increments/decrements */
  arrowOffset?: number;
  /** Whether the label can be dragged to change value */
  dragLabel?: boolean;
  /** Maximum value when dragging */
  dragMax?: number;
  /** Placeholder text for the input */
  placeholder?: string;
  /** Whether to hide the label */
  hideLabel?: boolean;
  /** Custom styles for the component */
  style?: EditableInputStyles;
  /** Change handler called when value updates */
  onChange?: (value: string | number | ValueObject, event: React.SyntheticEvent) => void;
}

/**
 * Internal state for EditableInput component
 */
export interface EditableInputState {
  /** Current display value */
  value: string;
  /** Value to restore on blur (when editing conflicts with external updates) */
  blurValue: string | null;
}

/**
 * Editable input component with keyboard arrow support and drag-to-change functionality.
 * Supports percentage values and provides label-based value objects for onChange callbacks.
 */
export declare class EditableInput extends React.PureComponent<EditableInputProps, EditableInputState> {
  /** Reference to the underlying input element */
  private input: HTMLInputElement | null;

  constructor(props: EditableInputProps);

  /**
   * Handles blur event - restores blurValue if it was set during editing
   */
  handleBlur: () => void;

  /**
   * Handles input change event
   * @param event - React change event from the input
   */
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * Handles arrow key down events to increment/decrement numeric values
   * @param event - React keyboard event
   */
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;

  /**
   * Handles mouse drag events to update value via dragging
   * @param event - Mouse event with movementX property
   */
  handleDrag: (event: MouseEvent) => void;

  /**
   * Initializes drag behavior on mouse down
   * @param event - React mouse event
   */
  handleMouseDown: (event: React.MouseEvent) => void;

  /**
   * Cleans up drag event listeners on mouse up
   */
  handleMouseUp: () => void;

  /**
   * Removes window-level mouse event listeners
   */
  unbindEventListeners: () => void;

  /**
   * Lifecycle: Updates state when receiving new props
   * @param nextProps - New props being received
   */
  componentWillReceiveProps(nextProps: EditableInputProps): void;

  /**
   * Lifecycle: Cleanup event listeners on unmount
   */
  componentWillUnmount(): void;

  /**
   * Creates a value object with the label as the key
   * @param value - The value to wrap
   * @returns Object with label as key and value as value
   */
  getValueObjectWithLabel(value: string | number): ValueObject;

  /**
   * Gets the arrow key offset amount, defaulting to 1
   * @returns The offset value for arrow key increments
   */
  getArrowOffset(): number;

  /**
   * Updates the component value and triggers onChange callback
   * @param value - New value to set
   * @param event - The triggering event
   */
  setUpdatedValue(value: string | number, event: React.SyntheticEvent): void;

  /**
   * Renders the editable input with optional label
   */
  render(): JSX.Element;
}

export default EditableInput;