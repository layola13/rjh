import { Observable } from "core/Misc/observable";
import { ValueAndUnit } from "../../../lts/gui/dist/2D/valueAndUnit";
import { Control } from "../../../lts/gui/dist/2D/controls/control";

/**
 * Text wrapping modes for TextBlock control
 */
export enum TextWrapping {
    /** Clip the text when it exceeds the control bounds */
    Clip = 0,
    /** Wrap text to next line at word boundaries */
    WordWrap = 1,
    /** Show ellipsis (...) when text is clipped */
    Ellipsis = 2,
    /** Wrap text at word boundaries and show ellipsis on last line */
    WordWrapEllipsis = 3
}

/**
 * Represents a parsed line of text with its metrics
 */
interface TextLine {
    /** The text content of the line */
    text: string;
    /** The width of the line in pixels */
    width: number;
}

/**
 * Font offset metrics for text rendering
 */
interface FontOffset {
    /** Ascent value in pixels */
    ascent: number;
    /** Descent value in pixels */
    descent: number;
    /** Total height in pixels */
    height: number;
}

/**
 * A control that displays text with various formatting options
 */
export declare class TextBlock extends Control {
    /** The name of the control */
    name: string;

    /**
     * Observable that fires when the text content changes
     */
    readonly onTextChangedObservable: Observable<TextBlock>;

    /**
     * Observable that fires when the text lines are ready after processing
     */
    readonly onLinesReadyObservable: Observable<TextBlock>;

    /**
     * Gets the array of parsed text lines
     */
    readonly lines: ReadonlyArray<TextLine>;

    /**
     * Gets or sets whether the control should resize to fit its text content
     */
    resizeToFit: boolean;

    /**
     * Gets or sets the text wrapping mode
     */
    textWrapping: TextWrapping;

    /**
     * Gets or sets the text content to display
     */
    text: string;

    /**
     * Gets or sets the horizontal alignment of the text
     */
    textHorizontalAlignment: number;

    /**
     * Gets or sets the vertical alignment of the text
     */
    textVerticalAlignment: number;

    /**
     * Gets or sets the spacing between lines (as string with units)
     */
    lineSpacing: string;

    /**
     * Gets or sets the width of the text outline in pixels
     */
    outlineWidth: number;

    /**
     * Gets or sets whether to underline the text
     */
    underline: boolean;

    /**
     * Gets or sets whether to draw a line through the text
     */
    lineThrough: boolean;

    /**
     * Gets or sets the color of the text outline
     */
    outlineColor: string;

    /**
     * Gets or sets the character(s) used to divide words for wrapping
     * @default " " (space)
     */
    wordDivider: string;

    /**
     * Gets or sets whether to force width resizing even with word wrapping enabled
     */
    forceResizeWidth: boolean;

    /**
     * Optional custom function to split text into words for wrapping
     */
    wordSplittingFunction?: (text: string) => string[];

    /**
     * Gets the font size in pixels after scaling
     */
    readonly fontSizeInPixels: number;

    /**
     * Gets or sets the shadow color
     */
    shadowColor: string;

    /**
     * Gets or sets the shadow blur radius in pixels
     */
    shadowBlur: number;

    /**
     * Gets or sets the shadow horizontal offset in pixels
     */
    shadowOffsetX: number;

    /**
     * Gets or sets the shadow vertical offset in pixels
     */
    shadowOffsetY: number;

    /**
     * Gets the width of the control in pixels
     */
    readonly widthInPixels: number;

    /**
     * Gets the height of the control in pixels
     */
    readonly heightInPixels: number;

    /**
     * Creates a new TextBlock control
     * @param name - The name of the control
     * @param text - The initial text content (default: empty string)
     */
    constructor(name: string, text?: string);

    /**
     * Computes the expected height of the text based on current settings
     * @returns The expected height in pixels, or 0 if it cannot be computed
     */
    computeExpectedHeight(): number;

    /**
     * Disposes of the control and cleans up resources
     */
    dispose(): void;

    /**
     * Gets the type name of the control
     * @returns "TextBlock"
     * @internal
     */
    protected _getTypeName(): string;

    /**
     * Processes measurements and updates internal layout
     * @param parentMeasure - The parent container measurements
     * @param context - The 2D rendering context
     * @internal
     */
    protected _processMeasures(parentMeasure: any, context: CanvasRenderingContext2D): void;

    /**
     * Draws the text content to the canvas
     * @param text - The text to draw
     * @param textWidth - The width of the text in pixels
     * @param y - The y-coordinate to draw at
     * @param context - The 2D rendering context
     * @internal
     */
    protected _drawText(text: string, textWidth: number, y: number, context: CanvasRenderingContext2D): void;

    /**
     * Draws the entire control
     * @param context - The 2D rendering context
     * @internal
     */
    protected _draw(context: CanvasRenderingContext2D): void;

    /**
     * Applies rendering states to the canvas context
     * @param context - The 2D rendering context
     * @internal
     */
    protected _applyStates(context: CanvasRenderingContext2D): void;

    /**
     * Breaks text into lines based on wrapping mode and available space
     * @param width - The available width in pixels
     * @param height - The available height in pixels
     * @param context - The 2D rendering context
     * @returns Array of parsed text lines
     * @internal
     */
    protected _breakLines(width: number, height: number, context: CanvasRenderingContext2D): TextLine[];

    /**
     * Parses a single line of text without wrapping
     * @param text - The text to parse
     * @param context - The 2D rendering context
     * @returns The parsed line with metrics
     * @internal
     */
    protected _parseLine(text: string, context: CanvasRenderingContext2D): TextLine;

    /**
     * Parses a line with ellipsis truncation
     * @param text - The text to parse
     * @param width - The available width in pixels
     * @param context - The 2D rendering context
     * @returns The parsed line with ellipsis if needed
     * @internal
     */
    protected _parseLineEllipsis(text: string, width: number, context: CanvasRenderingContext2D): TextLine;

    /**
     * Parses a line with word wrapping
     * @param text - The text to parse
     * @param width - The available width in pixels
     * @param context - The 2D rendering context
     * @returns Array of wrapped lines
     * @internal
     */
    protected _parseLineWordWrap(text: string, width: number, context: CanvasRenderingContext2D): TextLine[];

    /**
     * Parses a line with word wrapping and ellipsis on last line
     * @param text - The text to parse
     * @param width - The available width in pixels
     * @param height - The available height in pixels
     * @param context - The 2D rendering context
     * @returns Array of wrapped lines with ellipsis on last line if needed
     * @internal
     */
    protected _parseLineWordWrapEllipsis(text: string, width: number, height: number, context: CanvasRenderingContext2D): TextLine[];

    /**
     * Renders all text lines to the canvas
     * @param context - The 2D rendering context
     * @internal
     */
    protected _renderLines(context: CanvasRenderingContext2D): void;

    /**
     * Computes the total height needed for a given number of lines
     * @param lineCount - The number of lines
     * @returns The computed height in pixels
     * @internal
     */
    protected _computeHeightForLinesOf(lineCount: number): number;

    /**
     * Gets the actual width from TextMetrics, accounting for different browser APIs
     * @param metrics - The TextMetrics object
     * @returns The width in pixels
     * @internal
     */
    protected _getTextMetricsWidth(metrics: TextMetrics): number;

    /**
     * Calculates how many characters to remove to fit text within width
     * @param currentWidth - The current text width
     * @param maxWidth - The maximum allowed width
     * @param totalChars - The total number of characters
     * @returns The number of characters to remove
     * @internal
     */
    protected _getCharsToRemove(currentWidth: number, maxWidth: number, totalChars: number): number;
}