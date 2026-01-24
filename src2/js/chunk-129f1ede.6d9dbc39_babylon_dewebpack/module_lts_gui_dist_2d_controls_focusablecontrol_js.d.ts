/**
 * Focusable Control Module
 * 
 * This module provides type definitions for focusable UI controls in a 2D GUI system.
 * Focusable controls are interactive elements that can receive and manage focus state,
 * typically for keyboard navigation and accessibility purposes.
 */

/**
 * Represents a focusable control in the 2D GUI system.
 * 
 * @remarks
 * This interface defines the contract for controls that can participate in focus management,
 * enabling keyboard navigation and accessibility features in the user interface.
 */
export interface FocusableControl {
  /**
   * Indicates whether the control currently has focus.
   */
  readonly isFocused: boolean;

  /**
   * Indicates whether the control can receive focus.
   * When false, the control will be skipped during focus traversal.
   */
  isFocusable: boolean;

  /**
   * Sets focus to this control.
   * 
   * @returns True if focus was successfully set, false otherwise.
   */
  focus(): boolean;

  /**
   * Removes focus from this control.
   */
  blur(): void;

  /**
   * Called when the control receives focus.
   * 
   * @param event - Optional focus event data
   */
  onFocus?(event?: FocusEvent): void;

  /**
   * Called when the control loses focus.
   * 
   * @param event - Optional blur event data
   */
  onBlur?(event?: FocusEvent): void;
}

/**
 * Configuration options for creating a focusable control.
 */
export interface FocusableControlOptions {
  /**
   * Initial focusable state of the control.
   * @defaultValue true
   */
  isFocusable?: boolean;

  /**
   * Tab index for focus traversal order.
   * @defaultValue 0
   */
  tabIndex?: number;

  /**
   * Callback invoked when the control receives focus.
   */
  onFocus?: (event?: FocusEvent) => void;

  /**
   * Callback invoked when the control loses focus.
   */
  onBlur?: (event?: FocusEvent) => void;
}

/**
 * Focus event data passed to focus-related callbacks.
 */
export interface FocusEvent {
  /**
   * The control that is gaining or losing focus.
   */
  target: FocusableControl;

  /**
   * The control that previously had focus (for focus events) or will receive focus next (for blur events).
   */
  relatedTarget?: FocusableControl | null;

  /**
   * Timestamp when the event occurred.
   */
  timestamp: number;
}

/**
 * Focus manager for handling focus traversal across multiple focusable controls.
 */
export interface FocusManager {
  /**
   * Gets the currently focused control.
   */
  readonly focusedControl: FocusableControl | null;

  /**
   * Registers a control with the focus manager.
   * 
   * @param control - The control to register
   */
  register(control: FocusableControl): void;

  /**
   * Unregisters a control from the focus manager.
   * 
   * @param control - The control to unregister
   */
  unregister(control: FocusableControl): void;

  /**
   * Moves focus to the next focusable control in the tab order.
   * 
   * @returns True if focus was moved, false otherwise
   */
  focusNext(): boolean;

  /**
   * Moves focus to the previous focusable control in the tab order.
   * 
   * @returns True if focus was moved, false otherwise
   */
  focusPrevious(): boolean;
}

/**
 * Base class for implementing focusable controls.
 * 
 * @remarks
 * This abstract class provides default implementations for focus management functionality.
 * Extend this class to create custom focusable controls.
 */
export declare abstract class BaseFocusableControl implements FocusableControl {
  /**
   * Creates a new focusable control instance.
   * 
   * @param options - Configuration options for the control
   */
  constructor(options?: FocusableControlOptions);

  readonly isFocused: boolean;
  isFocusable: boolean;

  focus(): boolean;
  blur(): void;
  onFocus?(event?: FocusEvent): void;
  onBlur?(event?: FocusEvent): void;
}