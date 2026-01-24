/**
 * Virtual keyboard control for Babylon.js GUI system.
 * Provides an on-screen keyboard for text input controls.
 */

import { Observable } from "core/Misc/observable";
import { StackPanel } from "../../../lts/gui/dist/2D/controls/stackPanel";
import { Button } from "../../../lts/gui/dist/2D/controls/button";
import { InputText } from "../../../lts/gui/dist/2D/controls/inputText";
import { InputTextArea } from "../../../lts/gui/dist/2D/controls/inputTextArea";

/**
 * Configuration properties for individual virtual keyboard keys.
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
 * Internal structure tracking connected input text controls.
 */
interface ConnectedInputText {
  /** The connected input control */
  input: InputText | InputTextArea;
  /** Observer for blur events */
  onBlurObserver: Observer<InputText | InputTextArea>;
  /** Observer for focus events */
  onFocusObserver: Observer<InputText | InputTextArea>;
}

/**
 * Virtual keyboard control for GUI.
 * Provides an interactive on-screen keyboard that can connect to InputText or InputTextArea controls.
 */
export declare class VirtualKeyboard extends StackPanel {
  /** Observable triggered when a key is pressed */
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
  /** Thickness of the border when shift is locked */
  selectedShiftThickness: number;
  /** Current shift state (0 = off, 1 = single shift, 2 = caps lock) */
  shiftState: number;

  /** Shadow color for buttons */
  shadowColor: string;
  /** Shadow blur radius for buttons */
  shadowBlur: number;
  /** Shadow horizontal offset for buttons */
  shadowOffsetX: number;
  /** Shadow vertical offset for buttons */
  shadowOffsetY: number;

  /** Gets the currently connected input text control */
  get connectedInputText(): InputText | InputTextArea | null;

  /**
   * Creates a new VirtualKeyboard instance.
   * @param name - Name of the control
   */
  constructor(name?: string);

  /**
   * Gets the class name of this control.
   * @returns The string "VirtualKeyboard"
   */
  protected _getTypeName(): string;

  /**
   * Creates a keyboard key button.
   * @param key - The character or label for the key
   * @param propertySet - Optional properties to customize the key appearance
   * @returns The created button control
   */
  protected _createKey(key: string, propertySet?: KeyPropertySet): Button;

  /**
   * Adds a row of keys to the keyboard.
   * @param keys - Array of key labels
   * @param propertySets - Optional array of property sets, one per key
   */
  addKeysRow(keys: string[], propertySets?: KeyPropertySet[]): void;

  /**
   * Applies the current shift state to all keys.
   * Updates key appearance and text case based on shift state.
   * @param shiftState - The shift state to apply (0 = off, 1 = single shift, 2 = caps lock)
   */
  applyShiftState(shiftState: number): void;

  /**
   * Connects the keyboard to an input text control.
   * The keyboard will show when the control is focused and hide when blurred.
   * @param input - The InputText or InputTextArea control to connect
   */
  connect(input: InputText | InputTextArea): void;

  /**
   * Disconnects the keyboard from an input control or all controls.
   * @param input - Optional specific input to disconnect. If not provided, disconnects all.
   */
  disconnect(input?: InputText | InputTextArea): void;

  /**
   * Removes observers from a connected input control.
   * @param connectedInput - The connected input structure to clean up
   */
  protected _removeConnectedInputObservables(connectedInput: ConnectedInputText): void;

  /**
   * Disposes of the keyboard and all its resources.
   */
  dispose(): void;

  /**
   * Creates a default QWERTY layout keyboard.
   * @param name - Optional name for the keyboard
   * @returns A new VirtualKeyboard with default layout
   */
  static CreateDefaultLayout(name?: string): VirtualKeyboard;

  /**
   * Parses keyboard configuration from serialized content.
   * @param serializedObject - The serialized keyboard data
   * @param host - The host advanced dynamic texture
   */
  protected _parseFromContent(serializedObject: any, host: any): void;

  /** Currently connected input text control */
  private _currentlyConnectedInputText: InputText | InputTextArea | null;
  /** List of all connected input controls and their observers */
  private _connectedInputTexts: ConnectedInputText[];
  /** Observer for key press events */
  private _onKeyPressObserver: Observer<string> | null;
}