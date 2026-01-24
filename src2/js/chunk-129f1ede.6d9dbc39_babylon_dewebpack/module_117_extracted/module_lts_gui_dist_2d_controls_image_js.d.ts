import { Observable } from "core/Misc/observable";
import { Control } from "./control";
import { Nullable } from "core/types";

/**
 * Image stretch modes enumeration
 */
export enum ImageStretchMode {
  /** No stretching, image displayed at original size */
  STRETCH_NONE = 0,
  /** Fill the entire control area */
  STRETCH_FILL = 1,
  /** Maintain aspect ratio while fitting */
  STRETCH_UNIFORM = 2,
  /** Extend to fill parent */
  STRETCH_EXTEND = 3,
  /** Nine-patch scaling */
  STRETCH_NINE_PATCH = 4
}

/**
 * Image cache entry structure
 */
interface ImageCacheEntry {
  /** Cached image element */
  img: HTMLImageElement;
  /** Number of times this image is referenced */
  timesUsed: number;
  /** Whether the image has finished loading */
  loaded: boolean;
  /** Callbacks waiting for image load completion */
  waitingForLoadCallback: Array<() => void>;
}

/**
 * Image data cache for pointer detection
 */
interface ImageDataCache {
  /** Cached image pixel data */
  data: Uint8ClampedArray | null;
  /** Cache key based on dimensions */
  key: string;
}

/**
 * GUI Image control for displaying 2D images with various stretch modes,
 * sprite sheet support, nine-patch scaling, and SVG handling
 */
export declare class Image extends Control {
  /** Image source URL to cache mapping */
  private static SourceImgCache: Map<string, ImageCacheEntry>;

  /** Control name */
  name: string;

  /** Working canvas for opacity detection */
  private _workingCanvas: Nullable<HTMLCanvasElement>;
  
  /** Whether the image has loaded */
  private _loaded: boolean;
  
  /** Image stretch mode */
  private _stretch: ImageStretchMode;
  
  /** Automatically scale control to image dimensions */
  private _autoScale: boolean;
  
  /** Source rectangle left coordinate */
  private _sourceLeft: number;
  
  /** Source rectangle top coordinate */
  private _sourceTop: number;
  
  /** Source rectangle width (0 = full width) */
  private _sourceWidth: number;
  
  /** Source rectangle height (0 = full height) */
  private _sourceHeight: number;
  
  /** Whether SVG attributes have been computed */
  private _svgAttributesComputationCompleted: boolean;
  
  /** Whether the source is an SVG image */
  private _isSVG: boolean;
  
  /** Width of a single cell in sprite sheet */
  private _cellWidth: number;
  
  /** Height of a single cell in sprite sheet */
  private _cellHeight: number;
  
  /** Current cell ID in sprite sheet (-1 = not using sprite sheet) */
  private _cellId: number;
  
  /** Automatically extract nine-patch slice data from image borders */
  private _populateNinePatchSlicesFromImage: boolean;
  
  /** Nine-patch left slice position */
  private _sliceLeft: number;
  
  /** Nine-patch right slice position */
  private _sliceRight: number;
  
  /** Nine-patch top slice position */
  private _sliceTop: number;
  
  /** Nine-patch bottom slice position */
  private _sliceBottom: number;
  
  /** Detect pointer only on opaque pixels */
  private _detectPointerOnOpaqueOnly: boolean;
  
  /** Cached image data for pointer detection */
  private _imageDataCache: ImageDataCache;
  
  /** Underlying DOM image element */
  private _domImage: HTMLImageElement;
  
  /** Image source URL */
  private _source: Nullable<string>;
  
  /** Original image width */
  private _imageWidth: number;
  
  /** Original image height */
  private _imageHeight: number;
  
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
   * Creates a new Image control
   * @param name - Control identifier
   * @param source - Image source URL
   */
  constructor(name: string, source?: Nullable<string>);

  /**
   * Gets whether the image has finished loading
   */
  get isLoaded(): boolean;

  /**
   * Checks if the image is ready for rendering
   * @returns True if loaded
   */
  isReady(): boolean;

  /**
   * Gets whether pointer detection is limited to opaque pixels
   */
  get detectPointerOnOpaqueOnly(): boolean;
  
  /**
   * Sets whether pointer detection is limited to opaque pixels
   */
  set detectPointerOnOpaqueOnly(value: boolean);

  /**
   * Gets the nine-patch left slice position
   */
  get sliceLeft(): number;
  
  /**
   * Sets the nine-patch left slice position
   */
  set sliceLeft(value: number);

  /**
   * Gets the nine-patch right slice position
   */
  get sliceRight(): number;
  
  /**
   * Sets the nine-patch right slice position
   */
  set sliceRight(value: number);

  /**
   * Gets the nine-patch top slice position
   */
  get sliceTop(): number;
  
  /**
   * Sets the nine-patch top slice position
   */
  set sliceTop(value: number);

  /**
   * Gets the nine-patch bottom slice position
   */
  get sliceBottom(): number;
  
  /**
   * Sets the nine-patch bottom slice position
   */
  set sliceBottom(value: number);

  /**
   * Gets the source rectangle left coordinate
   */
  get sourceLeft(): number;
  
  /**
   * Sets the source rectangle left coordinate
   */
  set sourceLeft(value: number);

  /**
   * Gets the source rectangle top coordinate
   */
  get sourceTop(): number;
  
  /**
   * Sets the source rectangle top coordinate
   */
  set sourceTop(value: number);

  /**
   * Gets the source rectangle width
   */
  get sourceWidth(): number;
  
  /**
   * Sets the source rectangle width
   */
  set sourceWidth(value: number);

  /**
   * Gets the source rectangle height
   */
  get sourceHeight(): number;
  
  /**
   * Sets the source rectangle height
   */
  set sourceHeight(value: number);

  /**
   * Gets the original image width
   */
  get imageWidth(): number;

  /**
   * Gets the original image height
   */
  get imageHeight(): number;

  /**
   * Gets whether nine-patch slices should be auto-extracted from image
   */
  get populateNinePatchSlicesFromImage(): boolean;
  
  /**
   * Sets whether nine-patch slices should be auto-extracted from image
   */
  set populateNinePatchSlicesFromImage(value: boolean);

  /**
   * Gets whether the source is an SVG image
   */
  get isSVG(): boolean;

  /**
   * Gets whether SVG attributes computation is complete
   */
  get svgAttributesComputationCompleted(): boolean;

  /**
   * Gets whether the control automatically scales to image size
   */
  get autoScale(): boolean;
  
  /**
   * Sets whether the control automatically scales to image size
   */
  set autoScale(value: boolean);

  /**
   * Gets the image stretch mode
   */
  get stretch(): ImageStretchMode;
  
  /**
   * Sets the image stretch mode
   */
  set stretch(value: ImageStretchMode);

  /**
   * Gets the underlying DOM image element
   */
  get domImage(): HTMLImageElement;
  
  /**
   * Sets the underlying DOM image element
   */
  set domImage(value: HTMLImageElement);

  /**
   * Gets the image source URL
   */
  get source(): Nullable<string>;
  
  /**
   * Sets the image source URL
   */
  set source(value: Nullable<string>);

  /**
   * Gets the sprite sheet cell width
   */
  get cellWidth(): number;
  
  /**
   * Sets the sprite sheet cell width
   */
  set cellWidth(value: number);

  /**
   * Gets the sprite sheet cell height
   */
  get cellHeight(): number;
  
  /**
   * Sets the sprite sheet cell height
   */
  set cellHeight(value: number);

  /**
   * Gets the current sprite sheet cell ID
   */
  get cellId(): number;
  
  /**
   * Sets the current sprite sheet cell ID
   */
  set cellId(value: number);

  /**
   * Rotates the image by 90-degree increments
   * @param quarterTurns - Number of 90-degree rotations (negative for counter-clockwise)
   * @param copyProperties - Whether to copy properties to the rotated image
   * @returns New rotated Image instance
   */
  private _rotate90(quarterTurns: number, copyProperties?: boolean): Image;

  /**
   * Handles rotation logic specific to SVG images
   * @param sourceImage - Original image
   * @param targetImage - Rotated image
   * @param quarterTurns - Number of 90-degree rotations
   */
  private _handleRotationForSVGImage(
    sourceImage: Image,
    targetImage: Image,
    quarterTurns: number
  ): void;

  /**
   * Rotates source rectangle properties for 90-degree rotation
   * @param sourceImage - Original image
   * @param targetImage - Rotated image
   * @param quarterTurns - Number of 90-degree rotations
   */
  private _rotate90SourceProperties(
    sourceImage: Image,
    targetImage: Image,
    quarterTurns: number
  ): void;

  /**
   * Extracts nine-patch slice data from image border pixels
   */
  private _extractNinePatchSliceDataFromImage(): void;

  /**
   * Callback invoked when the image finishes loading
   */
  private _onImageLoaded(): void;

  /**
   * Checks if the source URL is SVG and extracts attributes
   * @param sourceUrl - Image source URL
   * @returns Processed source URL
   */
  private _svgCheck(sourceUrl: string): string;

  /**
   * Retrieves SVG element attributes from an embedded object
   * @param svgObject - SVG object element
   * @param elementId - ID of the target SVG element
   */
  private _getSVGAttribs(svgObject: HTMLObjectElement, elementId: string): void;

  /**
   * Decrements cache usage counter and removes if unused
   * @param sourceUrl - Image source URL
   */
  private _removeCacheUsage(sourceUrl: Nullable<string>): void;

  /**
   * Checks if a point is within the control boundaries
   * @param x - X coordinate
   * @param y - Y coordinate
   * @returns True if the point is within the control
   */
  contains(x: number, y: number): boolean;

  /**
   * Gets the control type name
   * @returns "Image"
   */
  protected _getTypeName(): string;

  /**
   * Synchronizes control size with image dimensions
   */
  synchronizeSizeWithContent(): void;

  /**
   * Processes layout measurements
   * @param parentMeasure - Parent control measurements
   * @param context - Rendering context
   */
  protected _processMeasures(
    parentMeasure: any,
    context: CanvasRenderingContext2D
  ): void;

  /**
   * Prepares working canvas for opaque pixel detection
   */
  private _prepareWorkingCanvasForOpaqueDetection(): void;

  /**
   * Draws image to both render and working canvases
   * @param context - Rendering context
   * @param sx - Source X coordinate
   * @param sy - Source Y coordinate
   * @param sw - Source width
   * @param sh - Source height
   * @param dx - Destination X coordinate
   * @param dy - Destination Y coordinate
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
   * Renders the image control
   * @param context - Rendering context
   */
  protected _draw(context: CanvasRenderingContext2D): void;

  /**
   * Renders the image using nine-patch scaling
   * @param context - Rendering context
   */
  private _renderNinePatch(context: CanvasRenderingContext2D): void;

  /**
   * Disposes of the control and cleans up resources
   */
  dispose(): void;

  /**
   * Clears the global image cache
   */
  static ResetImageCache(): void;

  /** No stretching */
  static readonly STRETCH_NONE: number;
  
  /** Fill entire area */
  static readonly STRETCH_FILL: number;
  
  /** Maintain aspect ratio */
  static readonly STRETCH_UNIFORM: number;
  
  /** Extend to parent */
  static readonly STRETCH_EXTEND: number;
  
  /** Nine-patch scaling */
  static readonly STRETCH_NINE_PATCH: number;
}