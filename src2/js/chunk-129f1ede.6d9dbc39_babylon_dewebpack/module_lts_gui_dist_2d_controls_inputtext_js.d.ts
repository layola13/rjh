import { Observable } from "core/Misc/observable";
import { Control } from "../../../lts/gui/dist/2D/controls/control.js";
import { ValueAndUnit } from "../../../lts/gui/dist/2D/valueAndUnit.js";
import { TextWrapper } from "../../../lts/gui/dist/2D/controls/textWrapper.js";
import { PointerInfoBase, PointerEventTypes, ClipboardEventTypes } from "core/Events/pointerEvents";

/**
 * Interface representing clipboard event data
 */
interface ClipboardEvent {
  type: ClipboardEventTypes;
  event: Event;
}

/**
 * Interface representing pointer event data
 */
interface PointerEvent {
  type: PointerEventTypes;
  event: PointerEvent;
}

/**
 * InputText control for accepting user text input
 * Extends the base Control class with text editing capabilities
 */
export declare class InputText extends Control {
  /** The name of the control */
  name: string;

  /** Message displayed when prompting for text on mobile */
  promptMessage: string;

  /** If true, disables the mobile text input prompt */
  disableMobilePrompt: boolean;

  /** Observable triggered when text content changes */
  onTextChangedObservable: Observable<InputText>;

  /** Observable triggered before a key is added to the text */
  onBeforeKeyAddObservable: Observable<InputText>;

  /** Observable triggered when the control gains focus */
  onFocusObservable: Observable<InputText>;

  /** Observable triggered when the control loses focus */
  onBlurObservable: Observable<InputText>;

  /** Observable triggered when text is highlighted */
  onTextHighlightObservable: Observable<InputText>;

  /** Observable triggered when text is copied */
  onTextCopyObservable: Observable<InputText>;

  /** Observable triggered when text is cut */
  onTextCutObservable: Observable<InputText>;

  /** Observable triggered when text is pasted */
  onTextPasteObservable: Observable<InputText>;

  /** Observable triggered when a keyboard event is processed */
  onKeyboardEventProcessedObservable: Observable<InputText>;

  /**
   * Gets or sets the maximum width of the control
   * @returns The maximum width as a string with units
   */
  get maxWidth(): string;
  set maxWidth(value: string);

  /**
   * Gets the maximum width in pixels
   * @returns The maximum width in pixels
   */
  get maxWidthInPixels(): number;

  /**
   * Gets or sets the opacity of the text highlighter
   * @returns The highlighter opacity (0-1)
   */
  get highligherOpacity(): number;
  set highligherOpacity(value: number);

  /**
   * Gets or sets whether all text should be selected when the control gains focus
   * @returns True if text should be selected on focus
   */
  get onFocusSelectAll(): boolean;
  set onFocusSelectAll(value: boolean);

  /**
   * Gets or sets the color of highlighted text background
   * @returns The highlight color as a CSS color string
   */
  get textHighlightColor(): string;
  set textHighlightColor(value: string);

  /**
   * Gets or sets the margin around the text
   * @returns The margin as a string with units
   */
  get margin(): string;
  set margin(value: string);

  /**
   * Gets the margin in pixels
   * @returns The margin in pixels
   */
  get marginInPixels(): number;

  /**
   * Gets or sets whether the width should automatically stretch to fit content
   * @returns True if auto-stretching is enabled
   */
  get autoStretchWidth(): boolean;
  set autoStretchWidth(value: boolean);

  /**
   * Gets or sets the thickness of the border
   * @returns The border thickness in pixels
   */
  get thickness(): number;
  set thickness(value: number);

  /**
   * Gets or sets the background color when focused
   * @returns The focused background color as a CSS color string
   */
  get focusedBackground(): string;
  set focusedBackground(value: string);

  /**
   * Gets or sets the text/border color when focused
   * @returns The focused color as a CSS color string
   */
  get focusedColor(): string;
  set focusedColor(value: string);

  /**
   * Gets or sets the background color when not focused
   * @returns The background color as a CSS color string
   */
  get background(): string;
  set background(value: string);

  /**
   * Gets or sets the color of placeholder text
   * @returns The placeholder color as a CSS color string
   */
  get placeholderColor(): string;
  set placeholderColor(value: string);

  /**
   * Gets or sets the placeholder text displayed when input is empty
   * @returns The placeholder text
   */
  get placeholderText(): string;
  set placeholderText(value: string);

  /**
   * Gets or sets whether a dead key was pressed (for composite characters)
   * @returns True if a dead key is active
   */
  get deadKey(): boolean;
  set deadKey(value: boolean);

  /**
   * Gets or sets the currently highlighted text
   * @returns The highlighted text substring
   */
  get highlightedText(): string;
  set highlightedText(value: string);

  /**
   * Gets or sets whether the next key should be added to the text
   * @returns True if keys should be added
   */
  get addKey(): boolean;
  set addKey(value: boolean);

  /**
   * Gets or sets the current key being processed
   * @returns The current key string
   */
  get currentKey(): string;
  set currentKey(value: string);

  /**
   * Gets or sets the text content of the input
   * @returns The current text value
   */
  get text(): string;
  set text(value: string);

  /**
   * Gets or sets the width of the control
   * Disables autoStretchWidth when set
   * @returns The width as a string with units
   */
  get width(): string;
  set width(value: string);

  /**
   * Gets or sets whether text highlighting is currently active
   * @returns True if text is being highlighted
   */
  get isTextHighlightOn(): boolean;
  set isTextHighlightOn(value: boolean);

  /**
   * Creates a new InputText control
   * @param name - The name identifier for the control
   * @param text - The initial text content (default: "")
   */
  constructor(name: string, text?: string);

  /**
   * Called when the control loses focus
   * Clears cursor state and unregisters clipboard events
   */
  onBlur(): void;

  /**
   * Called when the control gains focus
   * Registers clipboard events and starts cursor blinking
   */
  onFocus(): void;

  /**
   * Programmatically gives focus to this control
   */
  focus(): void;

  /**
   * Programmatically removes focus from this control
   */
  blur(): void;

  /**
   * Returns the type name of this control
   * @returns "InputText"
   */
  protected _getTypeName(): string;

  /**
   * Returns controls that should maintain focus relationship
   * @returns Array containing connected virtual keyboard if present
   */
  keepsFocusWith(): Control[] | null;

  /**
   * Processes a key press event
   * @param keyCode - The key code of the pressed key
   * @param key - The key string representation
   * @param event - The keyboard event object (optional)
   */
  processKey(keyCode: number, key: string | null, event?: KeyboardEvent): void;

  /**
   * Processes a keyboard event
   * @param event - The keyboard event to process
   */
  processKeyboard(event: KeyboardEvent): void;

  /**
   * Disposes of the control and clears all observables
   */
  dispose(): void;

  /**
   * Internal method called when text has changed
   * Marks the control as dirty and notifies observers
   * @internal
   */
  protected _textHasChanged(): void;

  /**
   * Internal method to update cursor position based on index
   * @param cursorIndex - The target cursor index
   * @internal
   */
  protected _updateValueFromCursorIndex(cursorIndex: number): void;

  /**
   * Internal method to handle double-click for word selection
   * @param event - The pointer event
   * @internal
   */
  protected _processDblClick(event: PointerEvent): void;

  /**
   * Internal method to select all text
   * @internal
   */
  protected _selectAllText(): void;

  /**
   * Internal method called when text is copied
   * @param event - The clipboard event
   * @internal
   */
  protected _onCopyText(event: ClipboardEvent): void;

  /**
   * Internal method called when text is cut
   * @param event - The clipboard event
   * @internal
   */
  protected _onCutText(event: ClipboardEvent): void;

  /**
   * Internal method called when text is pasted
   * @param event - The clipboard event
   * @internal
   */
  protected _onPasteText(event: ClipboardEvent): void;

  /**
   * Internal drawing method for rendering the control
   * @param context - The 2D canvas rendering context
   * @internal
   */
  protected _draw(context: CanvasRenderingContext2D): void;

  /**
   * Internal method called on pointer down
   * @param target - The control that was clicked
   * @param coordinates - The pointer coordinates
   * @param pointerId - The unique pointer identifier
   * @param buttonIndex - The mouse button index
   * @param pointerInfo - Additional pointer information
   * @returns True if the event was handled
   * @internal
   */
  protected _onPointerDown(
    target: Control,
    coordinates: { x: number; y: number },
    pointerId: number,
    buttonIndex: number,
    pointerInfo: PointerInfoBase
  ): boolean;

  /**
   * Internal method called on pointer move
   * @param target - The control under the pointer
   * @param coordinates - The pointer coordinates
   * @param pointerId - The unique pointer identifier
   * @param pointerInfo - Additional pointer information
   * @internal
   */
  protected _onPointerMove(
    target: Control,
    coordinates: { x: number; y: number },
    pointerId: number,
    pointerInfo: PointerInfoBase
  ): void;

  /**
   * Internal method called on pointer up
   * @param target - The control that was released
   * @param coordinates - The pointer coordinates
   * @param pointerId - The unique pointer identifier
   * @param buttonIndex - The mouse button index
   * @param notifyClick - Whether to notify click observers
   * @internal
   */
  protected _onPointerUp(
    target: Control,
    coordinates: { x: number; y: number },
    pointerId: number,
    buttonIndex: number,
    notifyClick: boolean
  ): void;

  /**
   * Hook method called before rendering text
   * Can be overridden to modify text before display
   * @param textWrapper - The text wrapper to process
   * @returns The processed text wrapper
   * @internal
   */
  protected _beforeRenderText(textWrapper: TextWrapper): TextWrapper;
}