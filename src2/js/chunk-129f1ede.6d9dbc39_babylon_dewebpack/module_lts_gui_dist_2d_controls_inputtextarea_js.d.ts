import { Observable } from "core/Misc/observable";
import { Control } from "./control";
import { ValueAndUnit } from "./valueAndUnit";
import { InputText } from "./inputText";

/**
 * Cursor position information for text editing
 */
interface CursorInfo {
  /** Global start index in the entire text */
  globalStartIndex: number;
  /** Global end index in the entire text */
  globalEndIndex: number;
  /** Relative start index within the current line */
  relativeStartIndex: number;
  /** Relative end index within the current line */
  relativeEndIndex: number;
  /** Index of the current line */
  currentLineIndex: number;
}

/**
 * Cursor information for text highlighting
 */
interface HighlightCursorInfo {
  /** Initial start index when highlighting began */
  initialStartIndex: number;
  /** Initial relative start index within the line */
  initialRelativeStartIndex: number;
  /** Initial line index when highlighting began */
  initialLineIndex: number;
}

/**
 * Represents a line of text with layout information
 */
interface TextLine {
  /** The text content of the line */
  text: string;
  /** The measured width of the line in pixels */
  width: number;
  /** Line ending character(s) */
  lineEnding: string;
}

/**
 * Multi-line text input control with support for text editing, selection, and scrolling.
 * Extends InputText to provide textarea-like functionality.
 */
export declare class InputTextArea extends InputText {
  /** Control name */
  name: string;

  /**
   * Observable fired when text lines are ready after layout calculation
   */
  onLinesReadyObservable: Observable<InputTextArea>;

  /**
   * Gets or sets the outline width for the text
   */
  outlineWidth: number;

  /**
   * Gets or sets the outline color for the text
   * @default "white"
   */
  outlineColor: string;

  /**
   * Gets or sets whether the control should automatically stretch its height to fit content
   */
  autoStretchHeight: boolean;

  /**
   * Sets the height of the control
   * Note: Setting height disables autoStretchHeight
   */
  height: string | number;

  /**
   * Gets or sets the maximum height constraint
   */
  maxHeight: string;

  /**
   * Gets the maximum height in pixels
   */
  readonly maxHeightInPixels: number;

  /**
   * Creates a new InputTextArea control
   * @param name - The name of the control
   * @param text - Initial text content (default: "")
   */
  constructor(name: string, text?: string);

  /**
   * Processes keyboard events for text editing
   * @param event - The keyboard event
   */
  processKeyboard(event: KeyboardEvent): void;

  /**
   * Alternative method to process keyboard input
   * @param code - The key code
   * @param key - The key value
   * @param event - The keyboard event (optional)
   */
  alternativeProcessKey(code: string, key: string, event?: KeyboardEvent): void;

  /**
   * Handles text copy operation
   * @param event - The clipboard event
   */
  protected _onCopyText(event: ClipboardEvent): void;

  /**
   * Handles text cut operation
   * @param event - The clipboard event
   */
  protected _onCutText(event: ClipboardEvent): void;

  /**
   * Handles text paste operation
   * @param event - The clipboard event
   */
  protected _onPasteText(event: ClipboardEvent): void;

  /**
   * Handles pointer down events
   * @param target - The target control
   * @param coordinates - The pointer coordinates
   * @param pointerId - The pointer identifier
   * @param buttonIndex - The mouse button index
   * @param pi - Additional pointer info
   */
  protected _onPointerDown(
    target: Control,
    coordinates: { x: number; y: number },
    pointerId: number,
    buttonIndex: number,
    pi: unknown
  ): boolean;

  /**
   * Handles pointer move events
   * @param target - The target control
   * @param coordinates - The pointer coordinates
   * @param pointerId - The pointer identifier
   * @param pi - Additional pointer info with event data
   */
  protected _onPointerMove(
    target: Control,
    coordinates: { x: number; y: number },
    pointerId: number,
    pi: { event: { movementX: number; movementY: number } }
  ): void;

  /**
   * Handles double-click for word selection
   * @param event - The pointer event info
   */
  protected _processDblClick(event: unknown): void;

  /**
   * Selects all text in the control
   */
  protected _selectAllText(): void;

  /**
   * Updates cursor position based on click coordinates
   */
  protected _updateCursorPosition(): void;

  /**
   * Updates the text value based on cursor index
   * @param cursorIndex - The cursor index
   */
  protected _updateValueFromCursorIndex(cursorIndex: number): void;

  /**
   * Parses a line with word wrapping
   * @param text - The text to parse
   * @param width - The available width
   * @param context - The 2D rendering context
   * @returns Array of text lines
   */
  protected _parseLineWordWrap(
    text: string,
    width: number,
    context: CanvasRenderingContext2D
  ): TextLine[];

  /**
   * Breaks text into multiple lines based on available width
   * @param width - The available width
   * @param context - The 2D rendering context
   * @returns Array of text lines
   */
  protected _breakLines(width: number, context: CanvasRenderingContext2D): TextLine[];

  /**
   * Parses a single line without wrapping
   * @param text - The text to parse
   * @param context - The 2D rendering context
   * @returns A single text line object
   */
  protected _parseLine(text: string, context: CanvasRenderingContext2D): TextLine;

  /**
   * Pre-measurement calculations before rendering
   * @param parentMeasure - The parent control's measurements
   * @param context - The 2D rendering context
   */
  protected _preMeasure(
    parentMeasure: { width: number; height: number },
    context: CanvasRenderingContext2D
  ): void;

  /**
   * Computes scroll position for text clipping
   */
  protected _computeScroll(): void;

  /**
   * Additional processing after text layout
   */
  protected _additionalProcessing(): void;

  /**
   * Draws text on the canvas
   * @param text - The text to draw
   * @param textWidth - The width of the text
   * @param y - The y-coordinate
   * @param context - The 2D rendering context
   */
  protected _drawText(
    text: string,
    textWidth: number,
    y: number,
    context: CanvasRenderingContext2D
  ): void;

  /**
   * Main drawing method for the control
   * @param context - The 2D rendering context
   */
  protected _draw(context: CanvasRenderingContext2D): void;

  /**
   * Resets the cursor blinking animation
   */
  protected _resetBlinking(): void;

  /**
   * Applies rendering states to the canvas context
   * @param context - The 2D rendering context
   */
  protected _applyStates(context: CanvasRenderingContext2D): void;

  /**
   * Gets the type name of the control
   * @returns "InputTextArea"
   */
  protected _getTypeName(): string;

  /**
   * Disposes of the control and cleans up resources
   */
  dispose(): void;
}