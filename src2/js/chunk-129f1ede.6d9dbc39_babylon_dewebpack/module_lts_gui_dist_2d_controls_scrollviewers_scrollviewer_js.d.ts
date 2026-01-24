import { Observable } from "core/Misc/observable";
import { Rectangle } from "../../../lts/gui/dist/2D/controls/rectangle";
import { Grid } from "../../../lts/gui/dist/2D/controls/grid";
import { Control } from "../../../lts/gui/dist/2D/controls/control";
import { _ScrollViewerWindow } from "../../../lts/gui/dist/2D/controls/scrollViewers/scrollViewerWindow";
import { ScrollBar } from "../../../lts/gui/dist/2D/controls/sliders/scrollBar";
import { ImageScrollBar } from "../../../lts/gui/dist/2D/controls/sliders/imageScrollBar";

/**
 * Scroll viewer control that provides scrollable content area with horizontal and vertical scroll bars
 */
export declare class ScrollViewer extends Rectangle {
  /**
   * Gets the horizontal scroll bar
   */
  readonly horizontalBar: ScrollBar | ImageScrollBar;

  /**
   * Gets the vertical scroll bar
   */
  readonly verticalBar: ScrollBar | ImageScrollBar;

  /**
   * Gets the list of children controls
   */
  readonly children: Control[];

  /**
   * Gets or sets whether the controls are frozen (optimizes performance when true)
   */
  freezeControls: boolean;

  /**
   * Gets the bucket width for spatial partitioning optimization
   */
  readonly bucketWidth: number;

  /**
   * Gets the bucket height for spatial partitioning optimization
   */
  readonly bucketHeight: number;

  /**
   * Gets or sets whether to force display of horizontal scroll bar even when content fits
   */
  forceHorizontalBar: boolean;

  /**
   * Gets or sets whether to force display of vertical scroll bar even when content fits
   */
  forceVerticalBar: boolean;

  /**
   * Gets or sets the mouse wheel scroll precision (0-1 range, clamped)
   * Lower values = finer scrolling control
   */
  wheelPrecision: number;

  /**
   * Gets or sets the background color of the scroll bar track area
   */
  scrollBackground: string;

  /**
   * Gets or sets the color of the scroll bar thumb
   */
  barColor: string;

  /**
   * Gets or sets the image used for both scroll bar thumbs
   */
  thumbImage: string;

  /**
   * Gets or sets the image used for horizontal scroll bar thumb
   */
  horizontalThumbImage: string;

  /**
   * Gets or sets the image used for vertical scroll bar thumb
   */
  verticalThumbImage: string;

  /**
   * Gets or sets the size (width/height in pixels) of the scroll bars
   */
  barSize: number;

  /**
   * Gets or sets the length of the scroll bar thumb (0.1-1.0 range, clamped)
   * Represents the proportion of visible content
   */
  thumbLength: number;

  /**
   * Gets or sets the height/thickness of the scroll bar thumb (0.1-1.0 range, clamped)
   */
  thumbHeight: number;

  /**
   * Gets or sets the height of the scroll bar background image (0.1-1.0 range, clamped)
   */
  barImageHeight: number;

  /**
   * Gets or sets the height of the horizontal scroll bar background image (0.1-1.0 range, clamped)
   */
  horizontalBarImageHeight: number;

  /**
   * Gets or sets the height of the vertical scroll bar background image (0.1-1.0 range, clamped)
   */
  verticalBarImageHeight: number;

  /**
   * Gets or sets the background color of the scroll bars
   */
  barBackground: string;

  /**
   * Gets or sets the background image for both scroll bars
   */
  barImage: string;

  /**
   * Gets or sets the background image for horizontal scroll bar
   */
  horizontalBarImage: string;

  /**
   * Gets or sets the background image for vertical scroll bar
   */
  verticalBarImage: string;

  /**
   * Observable triggered when mouse wheel is scrolled over the control
   */
  readonly onWheelObservable: Observable<Vector2>;

  /**
   * Observable triggered when the control becomes dirty and needs redraw
   */
  readonly onDirtyObservable: Observable<ScrollViewer>;

  /**
   * Observable triggered when pointer enters the control bounds
   */
  readonly onPointerEnterObservable: Observable<ScrollViewer>;

  /**
   * Observable triggered when pointer leaves the control bounds
   */
  readonly onPointerOutObservable: Observable<ScrollViewer>;

  /**
   * Creates a new ScrollViewer
   * @param name - Name identifier for the control
   * @param isImageBased - Whether to use image-based scroll bars instead of solid color bars
   */
  constructor(name?: string, isImageBased?: boolean);

  /**
   * Adds a control to the scrollable content area
   * @param control - The control to add
   * @returns This ScrollViewer instance for chaining
   */
  addControl(control: Control | null): this;

  /**
   * Removes a control from the scrollable content area
   * @param control - The control to remove
   * @returns This ScrollViewer instance for chaining
   */
  removeControl(control: Control): this;

  /**
   * Sets the bucket sizes for spatial partitioning optimization
   * @param width - Bucket width in pixels
   * @param height - Bucket height in pixels
   */
  setBucketSizes(width: number, height: number): void;

  /**
   * Resets the scrollable window dimensions to 100%
   */
  resetWindow(): void;

  /**
   * Disposes the ScrollViewer and cleans up resources
   */
  dispose(): void;
}

/**
 * 2D vector with x and y coordinates (for wheel events)
 */
interface Vector2 {
  x: number;
  y: number;
}