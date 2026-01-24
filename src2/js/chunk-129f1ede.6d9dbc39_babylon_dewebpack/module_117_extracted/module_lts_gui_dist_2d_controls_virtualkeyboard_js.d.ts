/**
 * Module: Virtual Keyboard for Babylon.js GUI
 * Provides an on-screen keyboard for text input controls
 */

import { Observable } from "core/Misc/observable";
import { StackPanel } from "../../../lts/gui/dist/2D/controls/stackPanel";
import { Button } from "../../../lts/gui/dist/2D/controls/button";
import { InputTextArea } from "../../../lts/gui/dist/2D/controls/inputTextArea";

/**
 * Configuration properties for individual virtual keyboard keys
 */
export interface KeyPropertySet {
  /** Width of the key button */
  width?: string;
  /** Height of the key button */
  height?: string;
  /** Text color of the key */
  color?: string;
  /** Background color of the key */
  background?: string;
  /** Left padding of the key */
  paddingLeft?: string;
  /** Right padding of the key */
  paddingRight?: string;
  /** Top padding of the key */
  paddingTop?: string;
  /** Bottom padding of the key */
  paddingBottom?: string;
}

/**
 * Internal structure tracking connected input text controls
 */
interface ConnectedInputText {
  /** The input control connected to the keyboard */
  input: InputTextArea;
  /** Observer for blur events */
  onBlurObserver: Observer<InputTextArea>;
  /** Observer for focus events */
  onFocusObserver: Observer<InputTextArea>;
}

/**
 * Virtual on-screen keyboard control for GUI text input
 * Extends StackPanel to provide keyboard layout and key interaction
 */
export declare class VirtualKeyboard extends StackPanel {
  /**
   * Observable triggered when a key is pressed
   * Notifies with the key value as a string
   */
  onKeyPressObservable: Observable<string>;

  /** Default width for keyboard buttons */
  defaultButtonWidth: string;
  
  /** Default height for keyboard buttons */
  defaultButtonHeight: string;
  
  /** Default left padding for keyboard buttons */
  defaultButtonPaddingLeft: string;
  
  /** Default right padding for keyboard buttons */
  defaultButtonPaddingRight: string;
  
  /** Default top padding for keyboard buttons */
  defaultButtonPaddingTop: string;
  
  /** Default bottom padding for keyboard buttons */
  defaultButtonPaddingBottom: string;
  
  /** Default text color for keyboard buttons */
  defaultButtonColor: string;
  
  /** Default background color for keyboard buttons */
  defaultButtonBackground: string;
  
  /** Color of the shift button when active */
  shiftButtonColor: string;
  
  /** Thickness of the shift button border when selected */
  selectedShiftThickness: number;
  
  /** Current shift state (0 = off, 1 = single shift, 2 = caps lock) */
  shiftState: number;

  /** Shadow color for keyboard buttons */
  shadowColor: string;
  
  /** Shadow blur radius for keyboard buttons */
  shadowBlur: number;
  
  /** Shadow horizontal offset for keyboard buttons */
  shadowOffsetX: number;
  
  /** Shadow vertical offset for keyboard buttons */
  shadowOffsetY: number;

  /**
   * Gets the currently connected and focused input text control
   */
  get connectedInputText(): InputTextArea | null;

  /**
   * Gets the type name of this control
   * @returns "VirtualKeyboard"
   */
  _getTypeName(): string;

  /**
   * Creates a virtual keyboard key button
   * @param key - The key character or label
   * @param propertySet - Optional properties to customize the key appearance
   * @returns The created button control
   */
  _createKey(key: string, propertySet?: KeyPropertySet): Button;

  /**
   * Adds a row of keys to the keyboard
   * @param keys - Array of key characters to add
   * @param propertySets - Optional array of property sets for each key (must match keys length)
   */
  addKeysRow(keys: string[], propertySets?: KeyPropertySet[]): void;

  /**
   * Applies the current shift state to all keys in the keyboard
   * Updates key appearance and case based on shift state
   * @param shiftState - The shift state to apply (0 = off, 1 = single, 2+ = caps lock)
   */
  applyShiftState(shiftState: number): void;

  /**
   * Connects the keyboard to an input text control
   * When the input gains focus, the keyboard becomes visible
   * @param input - The input text control to connect
   */
  connect(input: InputTextArea): void;

  /**
   * Disconnects the keyboard from input text control(s)
   * @param input - Optional specific input to disconnect. If not provided, disconnects all inputs
   */
  disconnect(input?: InputTextArea): void;

  /**
   * Removes observers from a connected input text control
   * @param connectedInput - The connected input structure to clean up
   * @internal
   */
  _removeConnectedInputObservables(connectedInput: ConnectedInputText): void;

  /**
   * Disposes of the virtual keyboard and cleans up resources
   */
  dispose(): void;

  /**
   * Parses keyboard configuration from serialized content
   * @param serializedObject - The serialized keyboard data
   * @param host - The host advanced dynamic texture
   * @internal
   */
  _parseFromContent(serializedObject: any, host: any): void;

  /**
   * Creates a default QWERTY keyboard layout
   * @param name - Optional name for the keyboard
   * @returns A VirtualKeyboard instance with default layout
   */
  static CreateDefaultLayout(name?: string): VirtualKeyboard;
}