import { Observable } from 'core/Misc/observable';
import { Control } from '../../../lts/gui/dist/2D/controls/control';
import { InputText } from '../../../lts/gui/dist/2D/controls/inputText';
import { ValueAndUnit } from '../../../lts/gui/dist/2D/valueAndUnit';

/**
 * Represents cursor position information within the text area
 */
interface CursorInfo {
  /** Global start position in the entire text */
  globalStartIndex: number;
  /** Global end position in the entire text */
  globalEndIndex: number;
  /** Relative start position within the current line */
  relativeStartIndex: number;
  /** Relative end position within the current line */
  relativeEndIndex: number;
  /** Index of the current line */
  currentLineIndex: number;
}

/**
 * Represents highlight cursor information for text selection
 */
interface HighlightCursorInfo {
  /** Initial start index when highlight began */
  initialStartIndex: number;
  /** Initial relative start index within the line */
  initialRelativeStartIndex: number;
  /** Initial line index where highlight started */
  initialLineIndex: number;
}

/**
 * Represents a line of text with layout information
 */
interface TextLine {
  /** The text content of the line */
  text: string;
  /** Width of the text in pixels */
  width: number;
  /** Line ending character(s) - typically " " or "\n" */
  lineEnding: string;
}

/**
 * Multi-line text input control for Babylon.js GUI
 * Extends InputText to provide text area functionality with word wrapping,
 * vertical scrolling, and multi-line text editing capabilities.
 */
export declare class InputTextArea extends InputText {
  /** Name identifier for the control */
  name: string;

  /** Observable that fires when text lines are ready after layout calculation */
  onLinesReadyObservable: Observable<InputTextArea>;

  /**
   * Gets or sets the outline width in pixels for text rendering
   */
  get outlineWidth(): number;
  set outlineWidth(value: number);

  /**
   * Gets or sets the outline color for text rendering
   */
  get outlineColor(): string;
  set outlineColor(value: string);

  /**
   * Gets or sets whether the control should automatically stretch its height
   * to fit the content
   */
  get autoStretchHeight(): boolean;
  set autoStretchHeight(value: boolean);

  /**
   * Sets the height of the control. Setting this disables autoStretchHeight.
   */
  set height(value: string | number);

  /**
   * Gets or sets the maximum height of the control
   */
  get maxHeight(): string;
  set maxHeight(value: string);

  /**
   * Gets the maximum height in pixels based on parent container
   */
  get maxHeightInPixels(): number;

  /**
   * Creates a new InputTextArea control
   * @param name - The name of the control
   * @param text - The initial text content (default: empty string)
   */
  constructor(name: string, text?: string);

  /**
   * Processes keyboard events for text editing
   * @param event - The keyboard event to process
   */
  processKeyboard(event: KeyboardEvent): void;

  /**
   * Alternative key processing method with explicit key code and key value
   * @param code - The key code (e.g., "KeyA", "Enter")
   * @param key - The key value (the character typed)
   * @param event - The original keyboard event
   */
  alternativeProcessKey(code: string, key: string, event?: KeyboardEvent): void;

  /**
   * Handles copy text operation
   * @param event - The clipboard event
   */
  protected _onCopyText(event: ClipboardEvent): void;

  /**
   * Handles cut text operation
   * @param event - The clipboard event
   */
  protected _onCutText(event: ClipboardEvent): void;

  /**
   * Handles paste text operation
   * @param event - The clipboard event
   */
  protected _onPasteText(event: ClipboardEvent): void;

  /**
   * Parses a line with word wrapping
   * @param text - The text to parse
   * @param width - The maximum width in pixels
   * @param context - The canvas rendering context for text measurement
   * @returns Array of text lines with layout information
   */
  protected _parseLineWordWrap(
    text: string,
    width: number,
    context: CanvasRenderingContext2D
  ): TextLine[];

  /**
   * Breaks text into multiple lines based on newlines and width constraints
   * @param width - The maximum width in pixels
   * @param context - The canvas rendering context for text measurement
   * @returns Array of text lines with layout information
   */
  protected _breakLines(width: number, context: CanvasRenderingContext2D): TextLine[];

  /**
   * Parses a single line without wrapping
   * @param text - The text to parse
   * @param context - The canvas rendering context for text measurement
   * @returns A text line object with layout information
   */
  protected _parseLine(text: string, context: CanvasRenderingContext2D): TextLine;

  /**
   * Pre-measurement phase before rendering
   * @param parentMeasure - The parent container measurements
   * @param context - The canvas rendering context
   */
  protected _preMeasure(
    parentMeasure: { width: number; height: number },
    context: CanvasRenderingContext2D
  ): void;

  /**
   * Computes scroll positions based on cursor location
   */
  protected _computeScroll(): void;

  /**
   * Additional processing after text measurement
   */
  protected _additionalProcessing(): void;

  /**
   * Draws the text content
   * @param text - The text to draw
   * @param textWidth - The width of the text
   * @param y - The vertical position
   * @param context - The canvas rendering context
   */
  protected _drawText(
    text: string,
    textWidth: number,
    y: number,
    context: CanvasRenderingContext2D
  ): void;

  /**
   * Main drawing method for the control
   * @param context - The canvas rendering context
   */
  protected _draw(context: CanvasRenderingContext2D): void;

  /**
   * Resets the cursor blinking timer
   */
  protected _resetBlinking(): void;

  /**
   * Applies rendering states (outline, etc.)
   * @param context - The canvas rendering context
   */
  protected _applyStates(context: CanvasRenderingContext2D): void;

  /**
   * Handles pointer down events
   * @param target - The target control
   * @param coordinates - The pointer coordinates
   * @param pointerId - The pointer identifier
   * @param buttonIndex - The mouse button index
   * @param eventType - The type of pointer event
   * @returns True if the event was handled
   */
  protected _onPointerDown(
    target: Control,
    coordinates: { x: number; y: number },
    pointerId: number,
    buttonIndex: number,
    eventType: number
  ): boolean;

  /**
   * Handles pointer move events
   * @param target - The target control
   * @param coordinates - The pointer coordinates
   * @param pointerId - The pointer identifier
   * @param eventInfo - Additional event information
   */
  protected _onPointerMove(
    target: Control,
    coordinates: { x: number; y: number },
    pointerId: number,
    eventInfo: { event: PointerEvent }
  ): void;

  /**
   * Updates cursor position based on click coordinates
   */
  protected _updateCursorPosition(): void;

  /**
   * Updates the value from the cursor index
   * @param cursorIndex - The cursor index position
   */
  protected _updateValueFromCursorIndex(cursorIndex: number): void;

  /**
   * Processes double-click events for word selection
   * @param event - The pointer event
   */
  protected _processDblClick(event: PointerEvent): void;

  /**
   * Selects all text in the text area
   */
  protected _selectAllText(): void;

  /**
   * Gets the type name of the control
   * @returns The type name "InputTextArea"
   */
  protected _getTypeName(): string;

  /**
   * Disposes of the control and cleans up resources
   */
  dispose(): void;

  // Internal properties
  protected _textHorizontalAlignment: number;
  protected _textVerticalAlignment: number;
  protected _lineSpacing: ValueAndUnit;
  protected _outlineWidth: number;
  protected _outlineColor: string;
  protected _maxHeight: ValueAndUnit;
  protected _autoStretchHeight: boolean;
  protected _lines: TextLine[];
  protected _cursorInfo: CursorInfo;
  protected _highlightCursorInfo: HighlightCursorInfo;
  protected _highlightedText: string;
  protected _isTextHighlightOn: boolean;
  protected _scrollLeft: number | null;
  protected _scrollTop: number | null;
  protected _clickedCoordinateX: number | null;
  protected _clickedCoordinateY: number | null;
  protected _isPointerDown: boolean;
  protected _availableWidth: number;
  protected _availableHeight: number;
  protected _clipTextLeft: number;
  protected _clipTextTop: number;
  protected _contextForBreakLines: CanvasRenderingContext2D;
  protected _blinkIsEven: boolean;
  protected _blinkTimeout: number;
}