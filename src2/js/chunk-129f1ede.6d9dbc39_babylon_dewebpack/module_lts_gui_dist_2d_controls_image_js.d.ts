import { Observable } from "core/Misc/observable";
import { Control } from "./control";

/**
 * Image stretch modes for controlling how images are scaled within their bounds
 */
export enum ImageStretchMode {
  /** No stretching - image maintains original size */
  STRETCH_NONE = 0,
  /** Fill entire area, ignoring aspect ratio */
  STRETCH_FILL = 1,
  /** Scale uniformly to fit, maintaining aspect ratio */
  STRETCH_UNIFORM = 2,
  /** Extend to fill while maintaining aspect ratio */
  STRETCH_EXTEND = 3,
  /** Nine-patch scaling for borders */
  STRETCH_NINE_PATCH = 4
}

/**
 * Cached image data structure for performance optimization
 */
interface ImageDataCache {
  /** Cached pixel data from canvas */
  data: Uint8ClampedArray | null;
  /** Cache key based on dimensions */
  key: string;
}

/**
 * Cache entry for tracking shared image resources
 */
interface SourceImageCacheEntry {
  /** The HTMLImageElement or canvas image */
  img: HTMLImageElement;
  /** Reference count for cache management */
  timesUsed: number;
  /** Whether the image has finished loading */
  loaded: boolean;
  /** Callbacks waiting for load completion */
  waitingForLoadCallback: Array<() => void>;
}

/**
 * Image control for displaying 2D images in the GUI system.
 * Supports various stretch modes, nine-patch scaling, sprite sheets, and SVG images.
 */
export declare class Image extends Control {
  /** Control name */
  name: string;

  /** Working canvas for opacity detection */
  private _workingCanvas: HTMLCanvasElement | null;

  /** Image load status */
  private _loaded: boolean;

  /** Current stretch mode */
  private _stretch: ImageStretchMode;

  /** Auto-scale to match image dimensions */
  private _autoScale: boolean;

  /** Source rectangle left offset */
  private _sourceLeft: number;

  /** Source rectangle top offset */
  private _sourceTop: number;

  /** Source rectangle width (0 = full width) */
  private _sourceWidth: number;

  /** Source rectangle height (0 = full height) */
  private _sourceHeight: number;

  /** SVG attributes computation completion flag */
  private _svgAttributesComputationCompleted: boolean;

  /** SVG image detection flag */
  private _isSVG: boolean;

  /** Sprite sheet cell width */
  private _cellWidth: number;

  /** Sprite sheet cell height */
  private _cellHeight: number;

  /** Active sprite cell index (-1 = not using sprite sheet) */
  private _cellId: number;

  /** Auto-extract nine-patch data from image borders */
  private _populateNinePatchSlicesFromImage: boolean;

  /** Nine-patch left slice position */
  private _sliceLeft: number;

  /** Nine-patch right slice position */
  private _sliceRight: number;

  /** Nine-patch top slice position */
  private _sliceTop: number;

  /** Nine-patch bottom slice position */
  private _sliceBottom: number;

  /** Cached image data for pointer detection */
  private _imageDataCache: ImageDataCache;

  /** The underlying DOM image element */
  private _domImage: HTMLImageElement;

  /** Image source URL */
  private _source: string | null;

  /** Original image width in pixels */
  private _imageWidth: number;

  /** Original image height in pixels */
  private _imageHeight: number;

  /** Only detect pointer events on opaque pixels */
  private _detectPointerOnOpaqueOnly: boolean;

  /** Referrer policy for image loading */
  referrerPolicy?: string;

  /**
   * Observable triggered when image finishes loading
   */
  onImageLoadedObservable: Observable<Image>;

  /**
   * Observable triggered when SVG attributes are computed
   */
  onSVGAttributesComputedObservable: Observable<Image>;

  /**
   * Global cache mapping source URLs to image elements
   */
  static SourceImgCache: Map<string, SourceImageCacheEntry>;

  /** No stretching constant */
  static readonly STRETCH_NONE: ImageStretchMode.STRETCH_NONE;
  /** Fill stretching constant */
  static readonly STRETCH_FILL: ImageStretchMode.STRETCH_FILL;
  /** Uniform stretching constant */
  static readonly STRETCH_UNIFORM: ImageStretchMode.STRETCH_UNIFORM;
  /** Extend stretching constant */
  static readonly STRETCH_EXTEND: ImageStretchMode.STRETCH_EXTEND;
  /** Nine-patch stretching constant */
  static readonly STRETCH_NINE_PATCH: ImageStretchMode.STRETCH_NINE_PATCH;

  /**
   * Creates an Image control
   * @param name - Control identifier
   * @param source - Image URL or null
   */
  constructor(name: string, source?: string | null);

  /**
   * Whether the image has finished loading
   */
  get isLoaded(): boolean;

  /**
   * Checks if the control is ready for rendering
   * @returns True if image is loaded
   */
  isReady(): boolean;

  /**
   * Only detect pointer on opaque pixels (requires canvas processing)
   */
  get detectPointerOnOpaqueOnly(): boolean;
  set detectPointerOnOpaqueOnly(value: boolean);

  /**
   * Nine-patch left slice boundary (pixels from left edge)
   */
  get sliceLeft(): number;
  set sliceLeft(value: number);

  /**
   * Nine-patch right slice boundary (pixels from left edge)
   */
  get sliceRight(): number;
  set sliceRight(value: number);

  /**
   * Nine-patch top slice boundary (pixels from top edge)
   */
  get sliceTop(): number;
  set sliceTop(value: number);

  /**
   * Nine-patch bottom slice boundary (pixels from top edge)
   */
  get sliceBottom(): number;
  set sliceBottom(value: number);

  /**
   * Source rectangle left coordinate
   */
  get sourceLeft(): number;
  set sourceLeft(value: number);

  /**
   * Source rectangle top coordinate
   */
  get sourceTop(): number;
  set sourceTop(value: number);

  /**
   * Source rectangle width (0 = use full image width)
   */
  get sourceWidth(): number;
  set sourceWidth(value: number);

  /**
   * Source rectangle height (0 = use full image height)
   */
  get sourceHeight(): number;
  set sourceHeight(value: number);

  /**
   * Original image width in pixels
   */
  get imageWidth(): number;

  /**
   * Original image height in pixels
   */
  get imageHeight(): number;

  /**
   * Automatically extract nine-patch slice data from image border pixels
   */
  get populateNinePatchSlicesFromImage(): boolean;
  set populateNinePatchSlicesFromImage(value: boolean);

  /**
   * Whether the image is SVG format
   */
  get isSVG(): boolean;

  /**
   * Whether SVG attribute computation has completed
   */
  get svgAttributesComputationCompleted(): boolean;

  /**
   * Auto-scale control to match image dimensions
   */
  get autoScale(): boolean;
  set autoScale(value: boolean);

  /**
   * Image stretch mode
   */
  get stretch(): ImageStretchMode;
  set stretch(value: ImageStretchMode);

  /**
   * The underlying DOM image element
   */
  get domImage(): HTMLImageElement;
  set domImage(value: HTMLImageElement);

  /**
   * Image source URL
   */
  get source(): string | null;
  set source(value: string | null);

  /**
   * Sprite sheet cell width
   */
  get cellWidth(): number;
  set cellWidth(value: number);

  /**
   * Sprite sheet cell height
   */
  get cellHeight(): number;
  set cellHeight(value: number);

  /**
   * Active sprite cell index (-1 = not using sprite sheet)
   */
  get cellId(): number;
  set cellId(value: number);

  /**
   * Rotate image 90 degrees (multiples allowed)
   * @param rotationCount - Number of 90-degree rotations
   * @param copyProperties - Whether to copy image properties to rotated instance
   * @returns New rotated Image instance
   */
  private _rotate90(rotationCount: number, copyProperties?: boolean): Image;

  /**
   * Handle rotation logic for SVG images
   * @param sourceImage - Original image
   * @param targetImage - Rotated image
   * @param rotationCount - Number of 90-degree rotations
   */
  private _handleRotationForSVGImage(
    sourceImage: Image,
    targetImage: Image,
    rotationCount: number
  ): void;

  /**
   * Rotate source properties for SVG images
   * @param sourceImage - Original image
   * @param targetImage - Rotated image
   * @param rotationCount - Number of 90-degree rotations
   */
  private _rotate90SourceProperties(
    sourceImage: Image,
    targetImage: Image,
    rotationCount: number
  ): void;

  /**
   * Extract nine-patch slice data from image border pixels
   */
  private _extractNinePatchSliceDataFromImage(): void;

  /**
   * Handle image load completion
   */
  private _onImageLoaded(): void;

  /**
   * Check if source is SVG and extract attributes
   * @param source - Image source URL
   * @returns Processed source URL
   */
  private _svgCheck(source: string): string;

  /**
   * Extract SVG element attributes for rendering
   * @param objectElement - SVG object element
   * @param elementId - Target SVG element ID
   */
  private _getSVGAttribs(objectElement: HTMLObjectElement, elementId: string): void;

  /**
   * Check if point is within control bounds and optionally on opaque pixel
   * @param x - X coordinate
   * @param y - Y coordinate
   * @returns True if point is contained
   */
  contains(x: number, y: number): boolean;

  /**
   * Get control type name
   * @returns "Image"
   */
  protected _getTypeName(): string;

  /**
   * Synchronize control size with image content dimensions
   */
  synchronizeSizeWithContent(): void;

  /**
   * Process measurements for layout
   * @param parentMeasure - Parent container measurements
   * @param context - Canvas rendering context
   */
  protected _processMeasures(
    parentMeasure: any,
    context: CanvasRenderingContext2D
  ): void;

  /**
   * Prepare working canvas for opaque pixel detection
   */
  private _prepareWorkingCanvasForOpaqueDetection(): void;

  /**
   * Draw image to canvas with optional working canvas copy
   * @param context - Target rendering context
   * @param sx - Source X
   * @param sy - Source Y
   * @param sw - Source width
   * @param sh - Source height
   * @param dx - Destination X
   * @param dy - Destination Y
   * @param dw - Destination width
   * @param dh - Destination height
   */
  private _drawImage(
    context: CanvasRenderingContext2D,
    sx: number,
    sy: number,
    sw: number,
    sh: number,
    dx: number,
    dy: number,
    dw: number,
    dh: number
  ): void;

  /**
   * Main draw method
   * @param context - Canvas rendering context
   */
  protected _draw(context: CanvasRenderingContext2D): void;

  /**
   * Render image using nine-patch algorithm
   * @param context - Canvas rendering context
   */
  private _renderNinePatch(context: CanvasRenderingContext2D): void;

  /**
   * Clear the global image cache
   */
  static ResetImageCache(): void;

  /**
   * Remove usage reference from cache
   * @param source - Image source URL
   */
  private _removeCacheUsage(source: string | null): void;

  /**
   * Dispose of control resources
   */
  dispose(): void;
}