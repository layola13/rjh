import { Rectangle } from "./rectangle";
import { Grid } from "./grid";
import { Control } from "./control";
import { _ScrollViewerWindow } from "./scrollViewers/scrollViewerWindow";
import { ScrollBar } from "./sliders/scrollBar";
import { ImageScrollBar } from "./sliders/imageScrollBar";
import { Observable } from "core/Misc/observable";

/**
 * Scroll viewer control that allows scrolling content that exceeds the visible area.
 * Supports both horizontal and vertical scrolling with customizable scroll bars.
 */
export declare class ScrollViewer extends Rectangle {
    /** Internal grid layout for organizing scroll bars and content window */
    private _grid: Grid;
    
    /** Horizontal scroll bar instance */
    private _horizontalBar: ScrollBar | ImageScrollBar;
    
    /** Vertical scroll bar instance */
    private _verticalBar: ScrollBar | ImageScrollBar;
    
    /** Scrollable content window */
    private _window: _ScrollViewerWindow;
    
    /** Space/background for vertical scroll bar */
    private _verticalBarSpace: Rectangle;
    
    /** Space/background for horizontal scroll bar */
    private _horizontalBarSpace: Rectangle;
    
    /** Corner space where horizontal and vertical bars meet */
    private _dragSpace: Rectangle;
    
    /** Size (width/height) of scroll bars in pixels */
    private _barSize: number;
    
    /** Whether the pointer is currently over the scroll viewer */
    private _pointerIsOver: boolean;
    
    /** Scroll sensitivity for mouse wheel (0-1 range) */
    private _wheelPrecision: number;
    
    /** Length of scroll bar thumb as ratio of total bar length (0-1) */
    private _thumbLength: number;
    
    /** Height of scroll bar thumb as ratio of bar width (0-1) */
    private _thumbHeight: number;
    
    /** General color for scroll bar thumbs */
    private _barColor?: string;
    
    /** General background color for scroll bars */
    private _barBackground?: string;
    
    /** General background image for scroll bars */
    private _barBackgroundImage?: string;
    
    /** Background image for horizontal scroll bar specifically */
    private _horizontalBarBackgroundImage?: string;
    
    /** Background image for vertical scroll bar specifically */
    private _verticalBarBackgroundImage?: string;
    
    /** General thumb image for scroll bars */
    private _barImage?: string;
    
    /** Thumb image for horizontal scroll bar specifically */
    private _horizontalBarImage?: string;
    
    /** Thumb image for vertical scroll bar specifically */
    private _verticalBarImage?: string;
    
    /** Height of bar background image as ratio (0-1) */
    private _barImageHeight: number;
    
    /** Height of horizontal bar background image as ratio (0-1) */
    private _horizontalBarImageHeight: number;
    
    /** Height of vertical bar background image as ratio (0-1) */
    private _verticalBarImageHeight: number;
    
    /** Cached width of window contents for change detection */
    private _oldWindowContentsWidth: number;
    
    /** Cached height of window contents for change detection */
    private _oldWindowContentsHeight: number;
    
    /** Whether to always show horizontal scroll bar */
    private _forceHorizontalBar: boolean;
    
    /** Whether to always show vertical scroll bar */
    private _forceVerticalBar: boolean;
    
    /** Whether to use image-based scroll bars instead of simple bars */
    private _useImageBar: boolean;
    
    /** Observer for mouse wheel events */
    private _onWheelObserver: any;

    /**
     * Creates a new ScrollViewer instance.
     * @param name - Unique name for the control
     * @param useImageBar - If true, uses ImageScrollBar; otherwise uses basic ScrollBar
     */
    constructor(name?: string, useImageBar?: boolean);

    /**
     * Gets the horizontal scroll bar control.
     */
    get horizontalBar(): ScrollBar | ImageScrollBar;

    /**
     * Gets the vertical scroll bar control.
     */
    get verticalBar(): ScrollBar | ImageScrollBar;

    /**
     * Adds a control to the scrollable content area.
     * @param control - The control to add
     * @returns This ScrollViewer instance for chaining
     */
    addControl(control: Control | null): this;

    /**
     * Removes a control from the scrollable content area.
     * @param control - The control to remove
     * @returns This ScrollViewer instance for chaining
     */
    removeControl(control: Control): this;

    /**
     * Gets all child controls within the scrollable window.
     */
    get children(): Control[];

    /**
     * Marks all descendant controls as needing matrix recalculation.
     * @internal
     */
    _flagDescendantsAsMatrixDirty(): void;

    /**
     * Gets or sets whether child controls are frozen (optimizes rendering when content doesn't change).
     */
    get freezeControls(): boolean;
    set freezeControls(value: boolean);

    /**
     * Gets the bucket width used for spatial partitioning optimization.
     */
    get bucketWidth(): number;

    /**
     * Gets the bucket height used for spatial partitioning optimization.
     */
    get bucketHeight(): number;

    /**
     * Sets the bucket dimensions for spatial partitioning of child controls.
     * @param width - Bucket width in pixels
     * @param height - Bucket height in pixels
     */
    setBucketSizes(width: number, height: number): void;

    /**
     * Gets or sets whether to force horizontal scroll bar to always be visible.
     */
    get forceHorizontalBar(): boolean;
    set forceHorizontalBar(value: boolean);

    /**
     * Gets or sets whether to force vertical scroll bar to always be visible.
     */
    get forceVerticalBar(): boolean;
    set forceVerticalBar(value: boolean);

    /**
     * Resets the window to fill 100% of available space.
     */
    resetWindow(): void;

    /**
     * Gets the type name of this control.
     * @returns "ScrollViewer"
     * @internal
     */
    _getTypeName(): string;

    /**
     * Calculates client dimensions excluding scroll bar sizes.
     * @internal
     */
    _buildClientSizes(): void;

    /**
     * Additional processing after parent processing.
     * @param parentMeasure - Parent control measurements
     * @param context - Rendering context
     * @internal
     */
    _additionalProcessing(parentMeasure: any, context: any): void;

    /**
     * Post-measurement processing to update scrollers and window position.
     * @internal
     */
    _postMeasure(): void;

    /**
     * Gets or sets the scroll sensitivity for mouse wheel events (0-1 range).
     * Lower values = finer control, higher values = faster scrolling.
     */
    get wheelPrecision(): number;
    set wheelPrecision(value: number);

    /**
     * Gets or sets the background color for scroll bar spaces.
     */
    get scrollBackground(): string;
    set scrollBackground(value: string);

    /**
     * Gets or sets the color of scroll bar thumbs.
     */
    get barColor(): string;
    set barColor(value: string);

    /**
     * Gets or sets the general thumb image for both scroll bars.
     */
    get thumbImage(): string;
    set thumbImage(value: string);

    /**
     * Gets or sets the thumb image for horizontal scroll bar only.
     */
    get horizontalThumbImage(): string;
    set horizontalThumbImage(value: string);

    /**
     * Gets or sets the thumb image for vertical scroll bar only.
     */
    get verticalThumbImage(): string;
    set verticalThumbImage(value: string);

    /**
     * Gets or sets the size (width for vertical, height for horizontal) of scroll bars in pixels.
     */
    get barSize(): number;
    set barSize(value: number);

    /**
     * Gets or sets the length of scroll bar thumb as a ratio of total bar length (0.1-1.0).
     */
    get thumbLength(): number;
    set thumbLength(value: number);

    /**
     * Gets or sets the height of scroll bar thumb as a ratio of bar width (0.1-1.0).
     */
    get thumbHeight(): number;
    set thumbHeight(value: number);

    /**
     * Gets or sets the height ratio for bar background images (0.1-1.0).
     */
    get barImageHeight(): number;
    set barImageHeight(value: number);

    /**
     * Gets or sets the height ratio for horizontal bar background image (0.1-1.0).
     */
    get horizontalBarImageHeight(): number;
    set horizontalBarImageHeight(value: number);

    /**
     * Gets or sets the height ratio for vertical bar background image (0.1-1.0).
     */
    get verticalBarImageHeight(): number;
    set verticalBarImageHeight(value: number);

    /**
     * Gets or sets the background color for scroll bars.
     */
    get barBackground(): string;
    set barBackground(value: string);

    /**
     * Gets or sets the general background image for both scroll bars.
     */
    get barImage(): string;
    set barImage(value: string);

    /**
     * Gets or sets the background image for horizontal scroll bar only.
     */
    get horizontalBarImage(): string;
    set horizontalBarImage(value: string);

    /**
     * Gets or sets the background image for vertical scroll bar only.
     */
    get verticalBarImage(): string;
    set verticalBarImage(value: string);

    /**
     * Updates the window position based on scroll bar values.
     * @param forceUpdate - If true, forces update even if dimensions haven't changed
     * @internal
     */
    _setWindowPosition(forceUpdate?: boolean): void;

    /**
     * Updates scroll bar visibility and dimensions based on content size.
     * @internal
     */
    _updateScroller(): void;

    /**
     * Links the control to a host and attaches wheel listener.
     * @param host - The GUI host
     * @internal
     */
    _link(host: any): void;

    /**
     * Adds and configures a scroll bar to the specified container.
     * @param bar - The scroll bar to add
     * @param barSpace - Container for the scroll bar
     * @param isVertical - Whether this is a vertical scroll bar
     * @param rotation - Rotation angle in radians
     * @internal
     */
    _addBar(bar: ScrollBar | ImageScrollBar, barSpace: Rectangle, isVertical: boolean, rotation: number): void;

    /**
     * Attaches mouse wheel event observer for scrolling.
     * @internal
     */
    _attachWheel(): void;

    /**
     * Renders highlight effects for this control and its grid.
     * @param context - Rendering context
     * @internal
     */
    _renderHighlightSpecific(context: CanvasRenderingContext2D): void;

    /**
     * Disposes of the control and removes event observers.
     */
    dispose(): void;
}