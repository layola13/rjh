import { Observable } from "core/Misc/observable";
import { Control } from "./control";
import { ValueAndUnit } from "../valueAndUnit";
import { TextWrapper } from "./textWrapper";

/**
 * Class representing a text input control for GUI
 * Extends the base Control class to provide text input functionality with features like
 * text selection, clipboard operations, cursor management, and keyboard input handling
 */
export declare class InputText extends Control {
  /** The name identifier for this input control */
  name: string;

  /** Message displayed in mobile prompt dialogs */
  promptMessage: string;

  /** Whether to disable the mobile prompt for text input */
  disableMobilePrompt: boolean;

  /** Observable triggered when the text content changes */
  onTextChangedObservable: Observable<InputText>;

  /** Observable triggered before a key is added to the input */
  onBeforeKeyAddObservable: Observable<InputText>;

  /** Observable triggered when the input gains focus */
  onFocusObservable: Observable<InputText>;

  /** Observable triggered when the input loses focus */
  onBlurObservable: Observable<InputText>;

  /** Observable triggered when text is highlighted/selected */
  onTextHighlightObservable: Observable<InputText>;

  /** Observable triggered when text is copied to clipboard */
  onTextCopyObservable: Observable<InputText>;

  /** Observable triggered when text is cut to clipboard */
  onTextCutObservable: Observable<InputText>;

  /** Observable triggered when text is pasted from clipboard */
  onTextPasteObservable: Observable<InputText>;

  /** Observable triggered after keyboard events are processed */
  onKeyboardEventProcessedObservable: Observable<InputText>;

  /**
   * Creates a new InputText control
   * @param name - The name identifier for this control
   * @param text - Initial text content (default: empty string)
   */
  constructor(name: string, text?: string);

  /**
   * Gets the maximum width as a string with units
   */
  get maxWidth(): string;

  /**
   * Sets the maximum width from a string value
   * @param value - Width value with units (e.g., "100px", "50%")
   */
  set maxWidth(value: string);

  /**
   * Gets the maximum width in absolute pixel values
   */
  get maxWidthInPixels(): number;

  /**
   * Gets the opacity of the text highlighter (0-1)
   */
  get highligherOpacity(): number;

  /**
   * Sets the opacity of the text highlighter
   * @param value - Opacity value between 0 and 1
   */
  set highligherOpacity(value: number);

  /**
   * Gets whether all text should be selected when the input gains focus
   */
  get onFocusSelectAll(): boolean;

  /**
   * Sets whether all text should be selected when the input gains focus
   * @param value - True to select all text on focus
   */
  set onFocusSelectAll(value: boolean);

  /**
   * Gets the color used for highlighted/selected text background
   */
  get textHighlightColor(): string;

  /**
   * Sets the color used for highlighted/selected text background
   * @param value - CSS color string
   */
  set textHighlightColor(value: string);

  /**
   * Gets the margin as a string with units
   */
  get margin(): string;

  /**
   * Sets the margin from a string value
   * @param value - Margin value with units
   */
  set margin(value: string);

  /**
   * Gets the margin in absolute pixel values
   */
  get marginInPixels(): number;

  /**
   * Gets whether the input automatically stretches its width to fit content
   */
  get autoStretchWidth(): boolean;

  /**
   * Sets whether the input automatically stretches its width to fit content
   * @param value - True to enable auto-stretching
   */
  set autoStretchWidth(value: boolean);

  /**
   * Gets the border thickness in pixels
   */
  get thickness(): number;

  /**
   * Sets the border thickness
   * @param value - Thickness in pixels
   */
  set thickness(value: number);

  /**
   * Gets the background color when the input is focused
   */
  get focusedBackground(): string;

  /**
   * Sets the background color when the input is focused
   * @param value - CSS color string
   */
  set focusedBackground(value: string);

  /**
   * Gets the border/text color when the input is focused
   */
  get focusedColor(): string;

  /**
   * Sets the border/text color when the input is focused
   * @param value - CSS color string
   */
  set focusedColor(value: string);

  /**
   * Gets the background color when the input is not focused
   */
  get background(): string;

  /**
   * Sets the background color when the input is not focused
   * @param value - CSS color string
   */
  set background(value: string);

  /**
   * Gets the color of the placeholder text
   */
  get placeholderColor(): string;

  /**
   * Sets the color of the placeholder text
   * @param value - CSS color string
   */
  set placeholderColor(value: string);

  /**
   * Gets the placeholder text shown when input is empty
   */
  get placeholderText(): string;

  /**
   * Sets the placeholder text shown when input is empty
   * @param value - Placeholder text string
   */
  set placeholderText(value: string);

  /**
   * Gets whether the last key pressed was a dead key (used for composing characters)
   */
  get deadKey(): boolean;

  /**
   * Sets the dead key state
   * @param value - True if last key was a dead key
   */
  set deadKey(value: boolean);

  /**
   * Gets the currently highlighted/selected text
   */
  get highlightedText(): string;

  /**
   * Sets the currently highlighted/selected text
   * @param value - The highlighted text string
   */
  set highlightedText(value: string);

  /**
   * Gets whether the next key should be added to the input
   */
  get addKey(): boolean;

  /**
   * Sets whether the next key should be added to the input
   * @param value - True to add the next key
   */
  set addKey(value: boolean);

  /**
   * Gets the current key being processed
   */
  get currentKey(): string;

  /**
   * Sets the current key being processed
   * @param value - The key string
   */
  set currentKey(value: string);

  /**
   * Gets the current text content of the input
   */
  get text(): string;

  /**
   * Sets the text content of the input
   * @param value - The new text content
   */
  set text(value: string);

  /**
   * Gets the width of the control as a string with units
   */
  get width(): string;

  /**
   * Sets the width of the control and disables auto-stretching
   * @param value - Width value with units
   */
  set width(value: string);

  /**
   * Gets whether text highlighting/selection is currently active
   */
  get isTextHighlightOn(): boolean;

  /**
   * Sets whether text highlighting/selection is active
   * @param value - True to enable text highlighting
   */
  set isTextHighlightOn(value: boolean);

  /**
   * Called when the input loses focus
   * Clears focus state, cursor position, and unregisters clipboard events
   */
  onBlur(): void;

  /**
   * Called when the input gains focus
   * Sets focus state, registers clipboard events, and optionally selects all text
   */
  onFocus(): void;

  /**
   * Programmatically sets focus to this input control
   */
  focus(): void;

  /**
   * Programmatically removes focus from this input control
   */
  blur(): void;

  /**
   * Gets the type name of this control
   * @returns "InputText"
   */
  protected _getTypeName(): string;

  /**
   * Returns controls that should maintain focus relationship with this input
   * @returns Array containing connected virtual keyboard if present, otherwise null
   */
  keepsFocusWith(): Control[] | null;

  /**
   * Processes a key press event
   * @param keyCode - The numeric key code
   * @param key - The key string value
   * @param event - Optional keyboard event object
   */
  processKey(keyCode: number, key: string | null, event?: KeyboardEvent): void;

  /**
   * Processes a full keyboard event
   * @param event - The keyboard event to process
   */
  processKeyboard(event: KeyboardEvent): void;

  /**
   * Internal method called before rendering text
   * Can be overridden to modify text before display
   * @param textWrapper - The text wrapper containing the text to render
   * @returns The processed text wrapper
   */
  protected _beforeRenderText(textWrapper: TextWrapper): TextWrapper;

  /**
   * Internal draw method to render the input control
   * @param context - The canvas 2D rendering context
   */
  protected _draw(context: CanvasRenderingContext2D): void;

  /**
   * Internal handler for pointer down events
   * @param target - The control that was clicked
   * @param coordinates - The click coordinates
   * @param pointerId - The pointer identifier
   * @param buttonIndex - The mouse button index
   * @param pointerEvent - The pointer event object
   * @returns False if event should not propagate
   */
  protected _onPointerDown(
    target: Control,
    coordinates: { x: number; y: number },
    pointerId: number,
    buttonIndex: number,
    pointerEvent: { event: PointerEvent }
  ): boolean;

  /**
   * Internal handler for pointer move events
   * @param target - The control being hovered
   * @param coordinates - The current pointer coordinates
   * @param pointerId - The pointer identifier
   * @param pointerEvent - The pointer event object
   */
  protected _onPointerMove(
    target: Control,
    coordinates: { x: number; y: number },
    pointerId: number,
    pointerEvent: PointerEvent
  ): void;

  /**
   * Internal handler for pointer up events
   * @param target - The control that was released
   * @param coordinates - The release coordinates
   * @param pointerId - The pointer identifier
   * @param buttonIndex - The mouse button index
   * @param notifyClick - Whether to notify click observers
   */
  protected _onPointerUp(
    target: Control | null,
    coordinates: { x: number; y: number },
    pointerId: number,
    buttonIndex: number,
    notifyClick: boolean
  ): void;

  /**
   * Disposes of the control and clears all observables
   */
  dispose(): void;

  /** @internal */
  protected _placeholderText: string;

  /** @internal */
  protected _background: string;

  /** @internal */
  protected _focusedBackground: string;

  /** @internal */
  protected _focusedColor: string;

  /** @internal */
  protected _placeholderColor: string;

  /** @internal */
  protected _thickness: number;

  /** @internal */
  protected _margin: ValueAndUnit;

  /** @internal */
  protected _autoStretchWidth: boolean;

  /** @internal */
  protected _maxWidth: ValueAndUnit;

  /** @internal */
  protected _isFocused: boolean;

  /** @internal */
  protected _blinkIsEven: boolean;

  /** @internal */
  protected _cursorOffset: number;

  /** @internal */
  protected _deadKey: boolean;

  /** @internal */
  protected _addKey: boolean;

  /** @internal */
  protected _currentKey: string;

  /** @internal */
  protected _isTextHighlightOn: boolean;

  /** @internal */
  protected _textHighlightColor: string;

  /** @internal */
  protected _highligherOpacity: number;

  /** @internal */
  protected _highlightedText: string;

  /** @internal */
  protected _startHighlightIndex: number;

  /** @internal */
  protected _endHighlightIndex: number;

  /** @internal */
  protected _cursorIndex: number;

  /** @internal */
  protected _onFocusSelectAll: boolean;

  /** @internal */
  protected _isPointerDown: boolean;

  /** @internal */
  protected _textWrapper: TextWrapper;

  /** @internal */
  protected _scrollLeft: number | null;

  /** @internal */
  protected _textWidth: number;

  /** @internal */
  protected _clickedCoordinate: number | null;

  /** @internal */
  protected _blinkTimeout: number;

  /** @internal */
  protected _focusedBy: string;

  /** @internal */
  protected _onClipboardObserver: unknown;

  /** @internal */
  protected _onPointerDblTapObserver: unknown;

  /** @internal */
  protected _connectedVirtualKeyboard: Control | undefined;

  /** @internal */
  protected _textHasChanged(): void;

  /** @internal */
  protected _updateValueFromCursorIndex(cursorIndex: number): void;

  /** @internal */
  protected _processDblClick(event: unknown): void;

  /** @internal */
  protected _selectAllText(): void;

  /** @internal */
  protected _onCopyText(event: ClipboardEvent): void;

  /** @internal */
  protected _onCutText(event: ClipboardEvent): void;

  /** @internal */
  protected _onPasteText(event: ClipboardEvent): void;
}